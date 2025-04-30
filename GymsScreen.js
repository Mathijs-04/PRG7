import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

export default function GymsScreen() {
    const [gyms, setGyms] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getGyms();
    }, []);

    async function getGyms() {
        setLoading(true);
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
            setLoading(false);
            setGyms(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large"/>
            ) : (
                <FlatList
                    data={gyms}
                    renderItem={({item}) => (
                        <Text>{item.name}</Text>
                    )}
                />
            )}
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
