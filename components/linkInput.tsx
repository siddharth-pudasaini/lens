import { Link2,Search } from "lucide-react-native";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { fontColor, Light, primaryColor } from "@/constants";

interface URLInputProps {
    value: string;
    onChangeText: (text: string) => void;
    onSubmitEditing: () => void;
    placeholder?: string;
}

const URLInput: React.FC<URLInputProps> = ({
    value,
    onChangeText,
    onSubmitEditing,
    placeholder = "Product or Ingredient",
}) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Search style={styles.linkIcon} size={24} strokeWidth={2.5} color={primaryColor} />
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    placeholder={placeholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="search"
                    keyboardType="url"
                    textContentType="URL"
                    placeholderTextColor="#aaa"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: "10%",
        backgroundColor: primaryColor,
    },
    container: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        width: "92%",
        borderRadius: 11,
        alignSelf: "center",
        position: "relative",
        top: 30,
    },
    input: {
        height: 50,
        paddingHorizontal: 12,
        fontSize: 16,
        width: "80%",
        color: fontColor,
        fontFamily: Light,
    },
    linkIcon: {
        marginLeft: 10,
    },
});

export default URLInput;
