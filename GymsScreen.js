import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from './ThemeContext';

export default function GymsScreen({navigation}) {
    const {darkMode} = useTheme();
    const [gyms, setGyms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getGyms();
        loadFavorites();
    }, []);

    async function getGyms() {
        setLoading(true);
        const url = "https://raw.githubusercontent.com/Mathijs-04/PRG7-JSON/main/gyms.json";
        try {
            const response = await fetch(url, {
                headers: {'Accept': 'application/json'}
            });
            if (!response.ok) throw new Error(`Response status: ${response.status}`);
            const data = await response.json();
            setGyms(data);
            await AsyncStorage.setItem('gymsCache', JSON.stringify(data));
        } catch (error) {
            try {
                const cached = await AsyncStorage.getItem('gymsCache');
                if (cached) {
                    setGyms(JSON.parse(cached));
                } else {
                    setGyms([]);
                }
            } catch (e) {
                setGyms([]);
            }
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function loadFavorites() {
        try {
            const favs = await AsyncStorage.getItem('favoriteGyms');
            setFavorites(favs ? JSON.parse(favs) : []);
        } catch (e) {
            console.log(e);
        }
    }

    async function toggleFavorite(gymId) {
        let newFavorites;
        if (favorites.includes(gymId)) {
            newFavorites = favorites.filter(id => id !== gymId);
        } else {
            newFavorites = [...favorites, gymId];
        }
        setFavorites(newFavorites);
        await AsyncStorage.setItem('favoriteGyms', JSON.stringify(newFavorites));
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
            padding: 8,
        },
        gymRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 4,
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
                        <View style={styles.gymRow}>
                            <TouchableOpacity onPress={() => navigation.navigate('Map', {gym: item})}>
                                <Text style={styles.text}>{item.name}</Text>
                            </TouchableOpacity>
                            <Button
                                title={favorites.includes(item.id) ? "★" : "☆"}
                                onPress={() => toggleFavorite(item.id)}
                                color={favorites.includes(item.id) ? "#FFD700" : "#888"}
                            />
                        </View>
                    )}
                />
            )}
        </View>
    );
}
