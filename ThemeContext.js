import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('mode');
                if (savedTheme !== null) {
                    setDarkMode(JSON.parse(savedTheme));
                }
            } catch (e) {
                console.log('Error loading theme', e);
            }
        };
        loadTheme();
    }, []);

    useEffect(() => {
        const saveTheme = async () => {
            try {
                await AsyncStorage.setItem('mode', JSON.stringify(darkMode));
            } catch (e) {
                console.log('Error saving theme', e);
            }
        };
        saveTheme();
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
