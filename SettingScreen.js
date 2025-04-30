import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from './ThemeContext';

export default function SettingScreen() {
    const { darkMode, toggleDarkMode } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: darkMode ? '#222' : '#FFF',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            color: darkMode ? '#FFF' : '#000',
            marginBottom: 20,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>
    );
}
