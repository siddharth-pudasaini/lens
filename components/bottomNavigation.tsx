import { Home, MessageCirclePlus, ScanLine } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontColor, Light, primaryColor } from "@/constants";

interface BottomNavigationProps {
    onNavigate: (screen: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onNavigate }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.navItem}
                onPress={() => onNavigate("/")}
            >
                <Home size={28} color={primaryColor} />
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.scan}
                onPress={() => onNavigate("/scan")}
            >
                <ScanLine size={70} strokeWidth={1} color={primaryColor} />
                <Text style={styles.scanText}>Scan</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => onNavigate("/ai-chat")}
            >
                <MessageCirclePlus size={24} color={primaryColor} />
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
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 12,
    },
    navText: {
        fontSize: 14,
        fontFamily: Light,
        color: fontColor,
        marginLeft: 4,
    },
    scan: {
        flexDirection: "column",
        alignItems: "center",
    },
    scanText: {
        fontSize: 14,
        fontFamily: Light,
        color: fontColor,
        marginTop: 4,
    },
});

export default BottomNavigation;
