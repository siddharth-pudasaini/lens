import { Stack } from "expo-router";
import { primaryColor } from "../constants";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true, // Show the header
                headerTitle: "Food Lens", // Set the title
                headerStyle: { backgroundColor: primaryColor, }, // Header background color
                headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: "semibold",
                    color: "white",
                }
            }}
        />
    );
}
