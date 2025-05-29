import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

export default function HomeScreen({ navigation }) {
    const { darkMode } = useTheme();
    const { t } = useLanguage();

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
            <Text style={styles.text}>{t('5')}</Text>
            <Button
                title={t('6')}
                onPress={() => navigation.navigate('Gyms')}
            />
            <Button
                title={t('7')}
                onPress={() => navigation.navigate('Map')}
            />
        </View>
    );
}
