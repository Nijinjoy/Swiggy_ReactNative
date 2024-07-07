import { View, Image, Dimensions, Animated, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import colors from '../consants/Colors';
import { applogo } from '../assets/images';
import { useNavigation } from '@react-navigation/native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const SplashScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }
        ).start();
    }, [fadeAnim]);

    const navigateToWelcomeScreen = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }
        ).start(() => {
            navigation.replace('WelcomeScreen');
        });
    };

    useEffect(() => {
        // Start navigating to WelcomeScreen after the initial animation completes
        const timer = setTimeout(navigateToWelcomeScreen, 2000); // Wait for 2000 ms before starting the fade-out animation
        return () => clearTimeout(timer);
    }, [navigateToWelcomeScreen]);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Image
                source={applogo}
                style={styles.logo}
                resizeMode='contain'
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.violet,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: WIDTH * 0.4,
        height: WIDTH * 0.4
    }
});

export default SplashScreen;
