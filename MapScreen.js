import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function MapScreen() {
    const [gyms, setGyms] = useState([]);

    useEffect(() => {
        getGyms();
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
            <Text>Map Screen</Text>
            <MapView
                style={styles.map}
                region={{
                    latitude: 52.1326,
                    longitude: 5.2913,
                    latitudeDelta: 4.0,
                    longitudeDelta: 4.0,
                }}
            >
                {gyms.map(gym => (
                    <Marker
                        key={gym.id}
                        coordinate={{latitude: gym.latitude, longitude: gym.longitude}}
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
