import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, ActivityIndicator, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useTheme } from './ThemeContext';

export default function SettingScreen({ navigation }) {
    const { darkMode, toggleDarkMode } = useTheme();
    const [authenticated, setAuthenticated] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        (async () => {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (!hasHardware || !isEnrolled) {
                Alert.alert('Biometrics not available', 'Your device does not support biometric authentication.');
                setChecking(false);
                return;
            }
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate to access settings',
                fallbackLabel: 'Enter passcode',
            });
            setAuthenticated(result.success);
            setChecking(false);
            if (!result.success) {
                Alert.alert('Authentication failed', 'You cannot access the settings.');
                navigation.goBack && navigation.goBack();
            }
        })();
    }, []);

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

    if (checking) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!authenticated) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>
    );
}
