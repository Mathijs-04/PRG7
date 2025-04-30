import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import { useTheme } from './ThemeContext';

export default function GymsScreen({navigation}) {
    const { darkMode } = useTheme();
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
    });

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large"/>
            ) : (
                <FlatList
                    data={gyms}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Map', {gym: item})}>
                            <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}
