import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, Image} from 'react-native';
import {useNetInfo} from "@react-native-community/netinfo";
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {useTheme} from './ThemeContext';

const {width} = Dimensions.get('window');

function getBearing(lat1, lon1, lat2, lon2) {
    const toRad = deg => deg * Math.PI / 180;
    const toDeg = rad => rad * 180 / Math.PI;
    const dLon = toRad(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(toRad(lat2));
    const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
        Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
    let brng = Math.atan2(y, x);
    brng = toDeg(brng);
    return (brng + 360) % 360;
}

export default function MapScreen({route}) {
    const {darkMode} = useTheme();
    const {gym} = route.params || {};
    const [gyms, setGyms] = useState([]);
    const [region, setRegion] = useState(null);
    const [heading, setHeading] = useState(0);
    const [userLocation, setUserLocation] = useState(null);
    const netInfo = useNetInfo();
    const compassAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let positionSub, headingSub;

        async function getCurrentLocation() {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;
            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: gym ? 0.05 : 0.005,
                longitudeDelta: gym ? 0.05 : 0.005,
            });
            setUserLocation(location.coords);
        }

        getCurrentLocation();
        (async () => {
            positionSub = await Location.watchPositionAsync(
                {accuracy: Location.Accuracy.High, timeInterval: 2000},
                (location) => {
                    setRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: gym ? 0.05 : 0.005,
                        longitudeDelta: gym ? 0.05 : 0.005,
                    });
                    setUserLocation(location.coords);
                }
            );
            headingSub = await Location.watchHeadingAsync((h) => {
                setHeading(h.trueHeading || h.magHeading || 0);
            });
        })();
        return () => {
            if (positionSub) positionSub.remove();
            if (headingSub) headingSub.remove();
        };
    }, [gym]);

    useEffect(() => {
        if (!gym) getGyms();
    }, []);

    async function getGyms() {
        const url = `https://raw.githubusercontent.com/Mathijs-04/PRG7-JSON/main/gyms.json?timestamp=${new Date().getTime()}`;
        try {
            const response = await fetch(url, {headers: {'Accept': 'application/json'}});
            if (!response.ok) throw new Error(`Response status: ${response.status}`);
            const data = await response.json();
            setGyms(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: darkMode ? '#222' : '#FFF',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            color: darkMode ? '#FFF' : '#000',
        },
        map: {
            width: '100%',
            height: '100%',
        },
        compassContainer: {
            position: 'absolute',
            top: 40,
            left: width / 2 - 30,
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
        },
        arrowImage: {
            width: 40,
            height: 40,
            resizeMode: 'contain',
        },
    });

    const mapRegion = gym
        ? {
            latitude: gym.latitude,
            longitude: gym.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }
        : region;

    let bearing = 0;
    if (gym && userLocation) {
        bearing = getBearing(
            userLocation.latitude,
            userLocation.longitude,
            gym.latitude,
            gym.longitude
        );
    }
    const targetRotation = gym && userLocation ? (bearing - heading) : 0;

    useEffect(() => {
        Animated.timing(compassAnim, {
            toValue: targetRotation,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [targetRotation]);

    const rotation = compassAnim.interpolate({
        inputRange: [-360, 360],
        outputRange: ['-360deg', '360deg'],
    });

    if (netInfo.isConnected === false) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{t('10')} </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={mapRegion}
                showsUserLocation={true}
                followsUserLocation={true}
            >
                {(gym ? [gym] : gyms).map(g => (
                    <Marker
                        key={g.id}
                        coordinate={{latitude: g.latitude, longitude: g.longitude}}
                        title={g.name}
                    />
                ))}
            </MapView>
            {gym && userLocation && (
                <View style={styles.compassContainer}>
                    <Animated.View style={{transform: [{rotate: rotation}]}}>
                        <Image
                            source={require('./assets/arrow.png')}
                            style={styles.arrowImage}
                        />
                    </Animated.View>
                </View>
            )}
        </View>
    );
}
