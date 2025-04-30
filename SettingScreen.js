import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Switch} from 'react-native';

export default function SettingScreen({navigation}) {
    const [darkMode, setDarkMode] = useState(false);

    const storeData = async (darkMode) => {
        try {
            const jsonValue = JSON.stringify(darkMode);
            await AsyncStorage.setItem('mode', jsonValue);
        } catch (e) {
            console.log(e);
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('mode');
            const mode = jsonValue != null ? JSON.parse(jsonValue) : false;
            setDarkMode(mode);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        storeData(darkMode);
    }, [darkMode]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: darkMode ? '#222' : '#FFF',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <Text>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={(value) => setDarkMode(value)}/>
        </View>
    );
}


