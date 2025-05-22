import { Light, primaryColor, SemiBold } from "@/constants";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { FileSearch } from "lucide-react-native";

const { width } = Dimensions.get("window");

const Carousel = () => {
    const scrollRef = useRef<ScrollView>(null);
    const [index, setIndex] = useState(0);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setIndex(newIndex);
    };

    const totalSlides = 3;

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         let nextIndex = (index + 1) % totalSlides;
    //         scrollRef.current?.scrollTo({
    //             x: nextIndex * width,
    //             animated: true,
    //         });
    //         setIndex(nextIndex);
    //     }, 5000);

    //     return () => clearInterval(interval); // cleanup on unmount
    // }, [index]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>How It Works?</Text>
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {/* Slide 1 */}
                <View style={styles.slide}>
                    <FileSearch size={30} strokeWidth={1.5} />
                    <Text style={styles.textInstruction}>You Scan</Text>
                </View>

                {/* Slide 2 */}
                <View style={styles.slide}>
                    <Text style={styles.textInstruction}>We Analyze</Text>
                    <Text>See its nutritional info and ingredients</Text>
                </View>

                {/* Slide 3 */}
                <View style={styles.slide}>
                    <Text style={styles.textInstruction}>You Decide</Text>
                    <Text>Track and make healthier food choices</Text>
                </View>
            </ScrollView>

            <View style={styles.dotsContainer}>
                {[...Array(totalSlides)].map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            { backgroundColor: i === index ? "#000" : "#bbb" },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: Dimensions.get("window").height / 3,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        // iOS shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,

        // Android shadow
        elevation: 5,
    },
    label: {
        fontFamily: Light,
        fontSize: 20,
    },
    slide: {
        width: width - 30,
        height: 225,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "white",
        borderRadius: 10,
        margin: 15,
    },
    textInstruction: {
        fontSize: 16,
        fontFamily: SemiBold,
        color: primaryColor,
    },
    dotsContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    dot: {
        width: 30,
        height: 2.5,
        borderRadius: 5,
        marginHorizontal: 4,
    },
});
