import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ResultScreen() {
    const { upcCode } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text>{upcCode}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
