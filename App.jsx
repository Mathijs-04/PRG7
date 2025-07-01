import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GymsScreen from './GymsScreen';
import MapScreen from './MapScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './ThemeContext';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function MainTabs() {
    const { t } = useLanguage();
    const { darkMode } = useTheme();

    return (
        <Tab.Navigator
            id={1}
            screenOptions={{
                tabBarActiveTintColor: '#FF9500',
                tabBarInactiveTintColor: darkMode ? '#888' : '#8E8E93',
                tabBarStyle: {
                    backgroundColor: darkMode ? '#222' : '#FFFFFF',
                    borderTopWidth: 0,
                    elevation: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
                headerStyle: {
                    backgroundColor: darkMode ? '#222' : '#FFFFFF',
                },
                headerTintColor: darkMode ? '#FF9500' : '#FF9500',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tab.Screen
                name={t('1')}
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name={t('2')}
                component={GymsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name={t('3')}
                component={MapScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name={t('4')}
                component={SettingScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <NavigationContainer>
                    <MainTabs />
                </NavigationContainer>
            </LanguageProvider>
        </ThemeProvider>
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
