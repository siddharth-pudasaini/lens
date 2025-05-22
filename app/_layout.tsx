import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {
    Black,
    Bold,
    ExtraBold,
    ExtraLight,
    Light,
    Medium,
    primaryColor,
    Regular,
    SemiBold,
    Thin,
} from "../constants";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        [Thin]: require("../assets/fonts/Spartan-Thin.ttf"),
        [ExtraLight]: require("../assets/fonts/Spartan-ExtraLight.ttf"),
        [Light]: require("../assets/fonts/Spartan-Light.ttf"),
        [Regular]: require("../assets/fonts/Spartan-Regular.ttf"),
        [Medium]: require("../assets/fonts/Spartan-Medium.ttf"),
        [SemiBold]: require("../assets/fonts/Spartan-SemiBold.ttf"),
        [Bold]: require("../assets/fonts/Spartan-Bold.ttf"),
        [ExtraBold]: require("../assets/fonts/Spartan-ExtraBold.ttf"),
        [Black]: require("../assets/fonts/Spartan-Black.ttf"),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTitle: "Food Lens",
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: primaryColor,
                },
                headerTitleStyle: {
                    fontFamily: Medium,
                    fontSize: 25,
                    color: "white",
                },
                headerBackTitle: "Back",
                headerTintColor: "white",
            }}
        />
    );
}
