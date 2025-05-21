import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontColor,primaryColor } from "@/constants";

interface BottomNavigationProps {
    onNavigate: (screen: string) => void; // Callback to handle navigation
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onNavigate }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.navItem}
                onPress={() => onNavigate("Home")}
            >
                <Ionicons name="home" size={28} color={primaryColor} />
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.scan}
                onPress={() => onNavigate("Scan")}
            >
                <Ionicons name="scan" size={80} color={primaryColor} />
                <Text style={styles.scanText}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.navItem}
                onPress={() => onNavigate("Profile")}
            >
                <Ionicons name="chatbubbles" size={24} color={primaryColor} />
                <Text style={styles.navText}>Ask AI</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "fixed",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    navItem: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 12,
    },
    navText: {
        fontSize: 14,
        color: fontColor,
        marginLeft: 4,
    },
    scan: {
        flexDirection: "column",
        alignItems: "center",
    },
    scanText: {
        fontSize: 14,
        color: fontColor,
        marginTop: 4,
    },
});

export default BottomNavigation;
