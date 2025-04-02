import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

export default function GymsScreen() {
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
            console.log(data);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <View style={styles.container}>
            <Text>Gyms Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
