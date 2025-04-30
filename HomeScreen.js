import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Welcome to [App Name]</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
