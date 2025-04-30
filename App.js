import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import GymsScreen from './GymsScreen';
import MapScreen from './MapScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator id={1}>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Gyms" component={GymsScreen}/>
                <Tab.Screen name="Map" component={MapScreen}/>
                <Tab.Screen name="Settings" component={SettingScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
