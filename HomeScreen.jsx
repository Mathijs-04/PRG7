import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useTheme} from './ThemeContext';
import {useLanguage} from './LanguageContext';

export default function HomeScreen({navigation}) {
    const {darkMode} = useTheme();
    const {t} = useLanguage();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: darkMode ? '#222' : '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        },
        text: {
            color: darkMode ? '#FFF' : '#1C1C1E',
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 30,
        },
        buttonContainer: {
            width: '80%',
            marginVertical: 12,
            borderRadius: 12,
            overflow: 'hidden',
        },
        button: {
            backgroundColor: '#FF9500',
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
        },
        buttonText: {
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: '600',
        },
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('./assets/logo.png')}
                style={{width: 200, height: 200, marginBottom: 20}}
                resizeMode="contain"
            />
            <Text style={styles.text}>{t('5')}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Gyms')}
                >
                    <Text style={styles.buttonText}>{t('6')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Map')}
                >
                    <Text style={styles.buttonText}>{t('7')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
