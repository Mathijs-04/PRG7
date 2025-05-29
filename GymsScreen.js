import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
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
            backgroundColor: darkMode ? '#222' : '#FFFFFF',
        },
        text: {
            color: darkMode ? '#FFF' : '#1C1C1E',
            padding: 12,
            fontSize: 16,
        },
        gymRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: darkMode ? '#333' : '#F2F2F7',
        },
        header: {
            fontSize: 24,
            fontWeight: '700',
            color: darkMode ? '#FFF' : '#1C1C1E',
            padding: 16,
            backgroundColor: darkMode ? '#333' : '#FFFFFF',
        },
        favoriteButton: {
            backgroundColor: '#FF9500',
            padding: 8,
            borderRadius: 20,
        },
    });

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large"/>
            ) : (
                <FlatList
                    ListHeaderComponent={<Text style={styles.header}>Gyms</Text>}
                    data={gyms}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.gymRow}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Map', {gym: item})}
                                style={{flex: 1}}
                            >
                                <Text style={styles.text}>{item.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => toggleFavorite(item.id)}
                                style={[
                                    styles.favoriteButton,
                                    !favorites.includes(item.id) && {backgroundColor: darkMode ? '#444' : '#E4E4E6'}
                                ]}
                            >
                                <Text
                                    style={{color: favorites.includes(item.id) ? '#FFF' : darkMode ? '#888' : '#8E8E93'}}>
                                    {favorites.includes(item.id) ? "★" : "☆"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}
