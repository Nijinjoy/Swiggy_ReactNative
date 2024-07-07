import { View, Text, FlatList, Image, TouchableOpacity, Animated, Dimensions, StyleSheet } from 'react-native';
import React, { useRef, useState, useMemo, useCallback } from 'react';
import { car, mapmarker, youngman } from '../assets/images';
import colors from '../consants/Colors';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const welcomeFlatlist = [
    {
        id: 1,
        icon: youngman,
        title: 'Get Food Delivered to Your Doorstep',
        text: "Our food delivery app makes it easy to order from your favourite restaurants and have your meals delivered at your doorstep."
    },
    {
        id: 2,
        icon: mapmarker,
        title: 'Discover New Restaurants and Cuisines with Our App',
        text: "Our food delivery app makes it easy to order from your favourite restaurants and have your meals delivered at your doorstep."
    },
    {
        id: 3,
        icon: car,
        title: 'Experienced Convenient and Fast Food Delivery with Our App',
        text: "Our food delivery app makes it easy to order from your favourite restaurants and have your meals delivered at your doorstep."
    },
];

const Pagination = React.memo(({ scrollX }) => {
    const inputRange = [0, WIDTH, WIDTH * 2];
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [0, WIDTH * 0.1, WIDTH * 0.2],
        extrapolate: 'clamp'
    });

    return (
        <View style={styles.paginationContainer}>
            <Animated.View style={[styles.paginationIndicator, { transform: [{ translateX }] }]} />
        </View>
    );
});

const WelcomeScreen = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    const viewabilityConfig = useMemo(() => ({
        viewAreaCoveragePercentThreshold: 50,
    }), []);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const renderItem = useCallback(({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Image source={item.icon} style={styles.itemImage} resizeMode='contain' />
            <Text style={styles.itemText}>{item.text}</Text>
        </View>
    ), []);

    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={welcomeFlatlist}
                contentContainerStyle={styles.flatListContent}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                overScrollMode='never'
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                renderItem={renderItem}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
            />
            <Pagination scrollX={scrollX} />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    {currentIndex === welcomeFlatlist.length - 1 ? 'Explore' : 'Next'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF0F0"
    },
    flatListContent: {
        paddingVertical: HEIGHT * 0.1
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: "center",
        width: WIDTH
    },
    itemTitle: {
        fontSize: 28,
        width: WIDTH * 0.9,
        color: colors.violet,
        fontWeight: 'bold',
        marginBottom: HEIGHT * 0.02
    },
    itemImage: {
        width: WIDTH,
        height: HEIGHT * 0.4
    },
    itemText: {
        width: WIDTH * 0.9,
        textAlign: 'justify',
        lineHeight: HEIGHT * 0.04,
        marginTop: HEIGHT * 0.02
    },
    paginationContainer: {
        flexDirection: 'row',
        marginBottom: HEIGHT * 0.13,
        position: 'absolute',
        bottom: HEIGHT * 0.05,
        alignSelf: 'center',
        borderWidth: 1,
        width: WIDTH * 0.309,
        borderRadius: WIDTH,
        backgroundColor: colors.violet
    },
    paginationIndicator: {
        width: WIDTH * 0.1,
        height: HEIGHT * 0.008,
        borderRadius: WIDTH,
        backgroundColor: colors.white
    },
    button: {
        marginBottom: HEIGHT * 0.08,
        borderWidth: 1,
        padding: WIDTH * 0.02,
        backgroundColor: colors.violet,
        borderRadius: WIDTH * 0.02
    },
    buttonText: {
        color: colors.white,
        fontSize: 18
    }
});

export default WelcomeScreen;

