import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import Carousel from "@/components/animatedCard";
import BottomNavigation from "@/components/bottomNavigation";
import URLInput from "@/components/linkInput";
import Spotlight from "@/components/spotLight";

export default function Index() {
    const [URL, setURL] = useState<string>("");

    const handleSearchSubmit = () => {
        console.log(URL);
        setURL("");
    };

    const onNavigate = (screen: string) => {
        switch (screen) {
            case "/":
                router.replace("/");
                break;
            case "/scan":
                router.push("/scan");
                break;
            case "/ai-chat":
                router.push("/chat");
                break;
            default:
                router.replace("/");
        }
    };

    return (
        <SafeAreaView style={HomeStyle.homeContainer}>
            <URLInput
                value={URL}
                onChangeText={setURL}
                onSubmitEditing={handleSearchSubmit}
            />
            <View style={HomeStyle.contentView}>
                <Carousel />
                <Spotlight/>
            </View>
            <BottomNavigation onNavigate={onNavigate} />
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
    spotlight:{

    }
});
