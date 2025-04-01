import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView from "react-native-maps";

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <Text>Map Screen</Text>
            <MapView
                style={styles.map}
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
    map: {
        width: '100%',
        height: '50%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

// Fetch https://github.com/Mathijs-04/PRG7-JSON/blob/main/gyms.json
