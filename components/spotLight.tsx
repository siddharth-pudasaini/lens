import { Light, primaryColor, SemiBold } from "@/constants";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const SpotLight = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>Spotlight</Text>
            <View style={styles.container}>
                <Text style={styles.containerLabel}>AI Chat</Text>
                <ScrollView style={styles.scroll}>
                    <Text style={styles.description}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                </ScrollView>
            </View>
        </View>
    );
};

export default SpotLight;

const styles = StyleSheet.create({
    wrapper: {
        width: width,
        marginLeft: "5%",
        marginTop: 30,
    },
    label: {
        fontFamily: Light,
        fontSize: 20,
    },
    container: {
        backgroundColor: primaryColor,
        borderRadius: 11,
        width: "90%",
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        maxHeight: Dimensions.get("window").height / 5, // adjust height for scrollable area
    },
    containerLabel: {
        fontFamily: SemiBold,
        color: "white",
        fontSize: 16,
        marginBottom: 5,
    },
    scroll: {
        maxHeight: 140, // ensures scrollView area is confined
    },
    description: {
        color: "white",
        fontFamily: Light,
        fontSize: 14,
    },
});
