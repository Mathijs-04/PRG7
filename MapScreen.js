import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function MapScreen({route}) {
    const {gym} = route.params || {};
    const [gyms, setGyms] = useState([]);

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

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: gym ? gym.latitude : 52.1326,
                    longitude: gym ? gym.longitude : 5.2913,
                    latitudeDelta: gym ? 0.05 : 4.0,
                    longitudeDelta: gym ? 0.05 : 4.0,
                }}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
