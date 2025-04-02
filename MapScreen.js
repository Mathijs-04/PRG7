import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
    const [gyms, setGyms] = useState([]);

    useEffect(() => {
        getGyms();
    }, []);

    async function getGyms() {
        const url = "https://raw.githubusercontent.com/Mathijs-04/PRG7-JSON/main/gyms.json";
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
            <Text>Map Screen</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 51.9225,
                    longitude: 4.479,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {gyms.map(gym => (
                    <Marker
                        key={gym.id}
                        coordinate={{ latitude: gym.latitude, longitude: gym.longitude }}
                        title={gym.name}
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
