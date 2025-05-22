import { useLocalSearchParams } from "expo-router";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ResultScreen() {
    const { upcCode } = useLocalSearchParams();
    const [expandedIngredients, setExpandedIngredients] = useState<number[]>(
        []
    );
    const [expandedNutrition, setExpandedNutrition] = useState<number[]>([]);

    const imageUrl =
        "https://californiaranchmarket.com/cdn/shop/products/001540_d5f9f0d1-cd3d-486f-9355-c57d28c192e4.jpg?v=1639158823";

    const toggleIngredient = (index: number) => {
        setExpandedIngredients((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const toggleNutrition = (index: number) => {
        setExpandedNutrition((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
        >
            <View style={styles.card}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>DIET COKE</Text>

                <View style={styles.tagRow}>
                    <Text style={styles.tagYellow}>
                        No Significant nutrition
                    </Text>
                    <Text style={styles.tagGreen}>Highly Consumed</Text>
                    <Text style={styles.tagGrey}>No Bans</Text>
                </View>

                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.summaryText}>
                    The product contains 3 ingredients that are banned in
                    Australia & EU, 1 ingredients classified by WHO as a known
                    carcinogens however WHO has recommended 40mg/kg of body
                    weight as safe.
                </Text>
                <Text style={styles.summaryText}>
                    The product does not provide any nutritional advantage.
                </Text>

                <View style={styles.chartContainer}>
                    <Text style={styles.chartText}>protein 0g</Text>
                    <Text style={styles.chartText}>vitamin 0g</Text>
                    <Text style={styles.chartText}>carbs 0g</Text>
                </View>

                <Text style={styles.sectionTitle}>Ingredients</Text>
                {["Medium Risk", "Low Risk", "High Risk"].map((risk, index) => (
                    <View key={index} style={styles.ingredientBox}>
                        <View style={styles.rowBetween}>
                            <View>
                                <Text style={styles.ingredientText}>
                                    Aspartamate
                                </Text>
                                <Text style={styles.riskText}>{risk}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => toggleIngredient(index)}
                            >
                                {expandedIngredients.includes(index) ? (
                                    <ChevronUp size={30} color="black" />
                                ) : (
                                    <ChevronDown size={30} color="black" />
                                )}
                            </TouchableOpacity>
                        </View>
                        {expandedIngredients.includes(index) && (
                            <Text style={styles.expandedText}>
                                Aspartamate is an artificial sweetener used in
                                diet drinks. Risk levels vary by exposure and
                                health conditions.
                            </Text>
                        )}
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Nutrition</Text>
                {["Protein", "Aspartamate", "Aspartamate"].map(
                    (item, index) => (
                        <View key={index} style={styles.ingredientBox}>
                            <View style={styles.rowBetween}>
                                <View>
                                    <Text style={styles.ingredientText}>
                                        {item}
                                    </Text>
                                    <Text style={styles.nutritionValue}>
                                        0g 2%
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => toggleNutrition(index)}
                                >
                                    {expandedNutrition.includes(index) ? (
                                        <ChevronUp size={30} color="black" />
                                    ) : (
                                        <ChevronDown size={30} color="black" />
                                    )}
                                </TouchableOpacity>
                            </View>
                            {expandedNutrition.includes(index) && (
                                <Text style={styles.expandedText}>
                                    {item} contributes minimally to daily values
                                    in this product.
                                </Text>
                            )}
                        </View>
                    )
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    card: {
        margin: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    image: {
        width: "100%",
        height: 180,
        alignSelf: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 8,
    },
    tagRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
    },
    tagYellow: {
        backgroundColor: "#fcd34d",
        padding: 6,
        borderRadius: 6,
        fontSize: 12,
    },
    tagGreen: {
        backgroundColor: "#6ee7b7",
        padding: 6,
        borderRadius: 6,
        fontSize: 12,
    },
    tagGrey: {
        backgroundColor: "#d1d5db",
        padding: 6,
        borderRadius: 6,
        fontSize: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 8,
    },
    summaryText: {
        fontSize: 14,
        color: "#4b5563",
        marginBottom: 6,
    },
    chartContainer: {
        backgroundColor: "#f3f4f6",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    chartText: {
        fontSize: 13,
        color: "#374151",
    },
    ingredientBox: {
        backgroundColor: "#f9fafb",
        padding: 12,
        borderRadius: 8,
        marginVertical: 4,
    },
    ingredientText: {
        fontSize: 14,
        fontWeight: "500",
    },
    riskText: {
        fontSize: 13,
        color: "#ef4444",
    },
    nutritionValue: {
        fontSize: 13,
        color: "#9ca3af",
    },
    expandedText: {
        fontSize: 13,
        marginTop: 8,
        color: "#6b7280",
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
