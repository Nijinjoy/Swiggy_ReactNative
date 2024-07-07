import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes

SplashScreen
