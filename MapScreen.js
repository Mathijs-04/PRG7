import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNetInfo} from "@react-native-community/netinfo";
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {useTheme} from './ThemeContext';

export default function MapScreen({route}) {
    const {darkMode} = useTheme();
    const {gym} = route.params || {};
    const [gyms, setGyms] = useState([]);
    const [region, setRegion] = useState(null);
    const netInfo = useNetInfo();

    useEffect(() => {
        let subscription;
        async function getCurrentLocation() {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: gym ? 0.05 : 0.005,
                longitudeDelta: gym ? 0.05 : 0.005,
            });
        }
        getCurrentLocation();
        (async () => {
            subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 2000,
                },
                (location) => {
                    setRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: gym ? 0.05 : 0.005,
                        longitudeDelta: gym ? 0.05 : 0.005,
                    });
                }
            );
        })();
        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, [gym]);

    useEffect(() => {
        if (!gym) {
            getGyms();
        }
    }, []);

    async function getGyms() {
        const url = `https://raw.githubusercontent.com/Mathijs-04/PRG7-JSON/main/gyms.json?timestamp=${new Date().getTime()}`;
        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
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
    });

    const mapRegion = gym
        ? {
            latitude: gym.latitude,
            longitude: gym.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }
        : region;

    if (netInfo.isConnected === false) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No internet connection. Map is disabled.</Text>
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
        </View>
    );
}
