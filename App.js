import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GymsScreen from './GymsScreen';
import MapScreen from './MapScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider, useLanguage } from './LanguageContext';

const Tab = createBottomTabNavigator();

function MainTabs() {
    const { t } = useLanguage();
    return (
        <Tab.Navigator id={1}>
            <Tab.Screen name={t('1')} component={HomeScreen} />
            <Tab.Screen name={t('2')} component={GymsScreen} />
            <Tab.Screen name={t('3')} component={MapScreen} />
            <Tab.Screen name={t('4')} component={SettingScreen} />
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
