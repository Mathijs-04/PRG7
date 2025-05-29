import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

export default function SettingScreen({ navigation }) {
    const { darkMode, toggleDarkMode } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [authenticated, setAuthenticated] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        (async () => {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (!hasHardware || !isEnrolled) {
                Alert.alert(t('9'), 'Your device does not support biometric authentication.');
                setChecking(false);
                return;
            }
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: t('Authenticate to access settings'),
                fallbackLabel: t('Enter passcode'),
            });
            setAuthenticated(result.success);
            setChecking(false);
            if (!result.success) {
                Alert.alert(t('Authentication failed'), t('You cannot access the settings.'));
                navigation.goBack && navigation.goBack();
            }
        })();
    }, [t]);

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
        langRow: {
            flexDirection: 'row',
            marginBottom: 20,
        },
        langButton: {
            padding: 10,
            marginHorizontal: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#888',
        },
        langButtonSelected: {
            backgroundColor: '#007AFF',
            borderColor: '#007AFF',
        },
        langButtonText: {
            color: '#000',
        },
        langButtonTextSelected: {
            color: '#FFF',
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
            <Text style={styles.text}>{t('8')}</Text>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
            <Text style={styles.text}>{t('11')} </Text>
            <View style={styles.langRow}>
                {[
                    { label: 'English', value: 'en' },
                    { label: 'Nederlands', value: 'nl' },
                    { label: 'Deutsch', value: 'de' },
                ].map((lang) => (
                    <TouchableOpacity
                        key={lang.value}
                        style={[
                            styles.langButton,
                            language === lang.value && styles.langButtonSelected,
                        ]}
                        onPress={() => setLanguage(lang.value)}
                    >
                        <Text
                            style={[
                                styles.langButtonText,
                                language === lang.value && styles.langButtonTextSelected,
                            ]}
                        >
                            {lang.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
