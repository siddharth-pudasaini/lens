import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ResultScreen() {
    const { upcCode } = useLocalSearchParams();

    return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
