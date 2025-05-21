import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { fontColor, primaryColor } from "@/constants";

interface URLInputProps {
    label?: string; // Optional label for the input
    onChangeText: (text: string) => void; // Callback when the text changes
    placeholder?: string; // Optional placeholder text
}

const URLInput: React.FC<URLInputProps> = ({
    label = "Website URL",
    onChangeText,
    placeholder = "Add a Url",
}) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Ionicons
                    name="link"
                    style={styles.linkIcon}
                    size={24}
                    color={primaryColor}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="url"
                    textContentType="URL"
                    placeholderTextColor="#aaa"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    wrapper:{
        height:'10%',
        backgroundColor:primaryColor
    },

    container: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        width: "92%",
        borderRadius: 11,
        alignSelf: "center",
        position:"relative",
        top:35
    },
    input: {
        height: 60,
        paddingHorizontal: 12,
        fontSize: 16,
        width: "80%",
        color: fontColor,
    },
    linkIcon: {
        marginLeft: 10,
    },
});

export default URLInput;
