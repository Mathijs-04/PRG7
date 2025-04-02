import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView from "react-native-maps";
import {useState, useEffect} from "react";

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
            console.log(gyms);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Map Screen</Text>
            <MapView
                style={styles.map}
            />
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
        height: '50%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
