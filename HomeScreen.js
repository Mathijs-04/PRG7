import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from './ThemeContext';

export default function HomeScreen({ navigation }) {
    const { darkMode } = useTheme();

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
            <Text style={styles.text}>Welcome to [App Name]</Text>
            <Button
                title={'Browse all gyms'}
                onPress={() => navigation.navigate('Gyms')}
            />
            <Button
                title={'View the map'}
                onPress={() => navigation.navigate('Map')}
            />
        </View>
    );
}
