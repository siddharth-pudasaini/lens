import { Light, primaryColor } from "@/constants";
import { useLocalSearchParams } from "expo-router";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Ingredient {
    name: string;
    id: string;
    percent_estimate: number;
    vegan?: "yes" | "no" | "maybe";
    vegetarian?: "yes" | "no" | "maybe";
    banned_regions: string;
    org_guidance: string;
    risk_reason: string;
    why_present: string;
}

interface DailyValues {
    energy_pct: number;
    protein_pct: number;
    total_fat_pct: number;
    sat_fat_pct: number;
    carbs_pct: number;
    sugars_pct: number;
    fiber_pct: number;
    sodium_pct: number;
}

interface Nutrition {
    energy_kcal: number;
    protein_g: number;
    total_fat_g: number;
    sat_fat_g: number;
    carbs_g: number;
    sugars_g: number;
    fiber_g: number;
    sodium_mg: number;
    dv: DailyValues;
}

interface ProductDetails {
    barcode: string;
    name: string;
    brand: string;
    quantity: string;
    serving_size: string;
    process_text: string;
    images: {
        front: string;
        ingredients: string;
        nutrition: string;
    };
    ingredients: Ingredient[];
    vegan_flag: "yes" | "no" | "maybe";
    vegetarian_flag: "yes" | "no" | "maybe";
    nova_group: number;
    nutriscore_grade: string;
    ecoscore_grade: string;
    nutrition: Nutrition;
}

export default function ResultScreen() {
    const { upcCode } = useLocalSearchParams();
    const [expandedIngredients, setExpandedIngredients] = useState<number[]>(
        []
    );
    const [expandedNutrition, setExpandedNutrition] = useState<number[]>([]);
    const [data, setData] = useState<ProductDetails | null>(null);

    useEffect(() => {
        import("../test/upcData.json").then((module) => {
            setData(module.default as ProductDetails);
        });
    }, []);

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
    if (!data) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2563eb" />
                <Text style={styles.loadingText}>Loading product...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            <Image
                source={{ uri: data.images.front }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>{data.name.toUpperCase()}</Text>

            <View style={{ marginTop: 20, marginBottom: 8 }}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <View style={styles.underline} />
                <Text style={styles.summaryText}>{data.process_text}</Text>
            </View>

            <View style={{ marginTop: 20, marginBottom: 8 }}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                <View style={styles.underline} />
            </View>
            {data.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientBox}>
                    <View style={styles.rowBetween}>
                        <View>
                            <Text style={styles.ingredientText}>
                                {ingredient.name}
                            </Text>
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
                        <View>
                            <Text style={styles.riskText}>
                                {ingredient.risk_reason}
                            </Text>
                            <Text style={styles.expandedText}>
                                {ingredient.why_present}
                            </Text>
                            <Text style={styles.expandedText}>
                                Vegan: {ingredient.vegan || "Unknown"}
                            </Text>
                            <Text style={styles.expandedText}>
                                Vegetarian:
                                {ingredient.vegetarian || "Unknown"}
                            </Text>
                            <Text style={styles.expandedText}>
                                Banned Regions:{" "}
                                {Array.isArray(ingredient.banned_regions)
                                    ? ingredient.banned_regions.join(", ")
                                    : ingredient.banned_regions}
                            </Text>
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    underline: {
        height: 2,
        backgroundColor: primaryColor,
        marginTop: 1, // Adjust distance from text
        width: 120,
        marginBottom: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#374151",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding:16
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
        fontFamily: Light,
        fontSize: 24,
        color: primaryColor,
        marginTop: 20,
    },
    summaryText: {
        fontSize: 16,
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
        fontFamily: Light,
        fontSize: 16,
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
