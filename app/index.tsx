import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import BottomNavigation from "@/components/bottomNavigation";
import URLInput from "@/components/linkInput";

export default function Index() {
    const [URL, setURL] = useState<string>("");

    return (
        <SafeAreaView style={HomeStyle.homeContainer}>
            <URLInput onChangeText={setURL} />
            <View style={HomeStyle.contentView}></View>
            <BottomNavigation onNavigate={() => console.log("Navigated")} />
        </SafeAreaView>
    );
}

const HomeStyle = StyleSheet.create({
    homeContainer: {
        height: "100%",
    },
    contentView: {
        flexGrow: 1,
    },
    bottomNavigation: {
        position: "fixed",
        bottom: 10,
    },
});
