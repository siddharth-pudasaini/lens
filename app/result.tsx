import { Light, Medium, primaryColor } from "@/constants";
import { useLocalSearchParams } from "expo-router";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Image,
    LayoutAnimation,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
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
    riskLevel: string;
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
    summary_text: string;
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

const wellCasedString = (string: string) => {
    return (
        string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() + " Risk"
    );
};

const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
        case "low":
            return { color: primaryColor }; // green
        case "medium":
            return { color: "#FB8C00" }; // amber
        case "high":
            return { color: "#E9413B" }; // red
        default:
            return { color: "#000000" }; // gray
    }
};

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ResultScreen() {
    const { upcCode } = useLocalSearchParams();
    const [expandedIngredients, setExpandedIngredients] = useState<number[]>(
        []
    );
    const [expandedNutrition, setExpandedNutrition] = useState<number[]>([]);
    const [data, setData] = useState<ProductDetails | null>(null);
    const [scrollEnabled, setScrollEnabled] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://18.234.52.230/api/gulo-approved/${upcCode}`
                );
                if (!response.ok) throw new Error("Failed to fetch");
                const json = await response.json();
                setData(json.data as ProductDetails);
            } catch (error) {
                console.error("API error:", error);
            }
        };

        fetchData();
    }, []);

    const toggleIngredient = (index: number) => {
        const isExpanded = expandedIngredients.includes(index);

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIngredients((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
        // Re-enable scroll after animation
        setTimeout(() => setScrollEnabled(true), 300);
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
            scrollEnabled={scrollEnabled}
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
                <Text style={styles.summaryText}>{data.summary_text}</Text>
            </View>

            <View style={{ marginTop: 20, marginBottom: 8 }}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                <View style={styles.underline} />
            </View>
            {data.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientBox}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.ingredientText}>
                            {ingredient.name}
                        </Text>

                        <Text
                            style={[
                                styles.riskLevel,
                                getRiskColor(ingredient.riskLevel),
                            ]}
                        >
                            {wellCasedString(ingredient.riskLevel)}
                        </Text>
                        <TouchableOpacity
                            style={styles.upDownButton}
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
                        <View style={styles.expandedBox}>
                            <Text style={styles.infoLabel}>
                                Why is it here?
                            </Text>
                            <Text style={styles.expandedText}>
                                {ingredient.why_present}
                            </Text>
                            <Text style={styles.infoLabel}>
                                Why is {wellCasedString(ingredient.riskLevel)} ?
                            </Text>
                            <Text style={styles.expandedText}>
                                {ingredient.risk_reason}
                            </Text>
                            <Text style={styles.infoLabel}>Banned ?</Text>

                            <Text style={styles.expandedText}>
                                {ingredient.banned_regions}
                            </Text>
                            <Text style={styles.infoLabel}>
                                WHO and Agency Recommendations
                            </Text>
                            <Text style={styles.expandedText}>
                                {ingredient.org_guidance}
                            </Text>
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    upDownButton: {
        marginLeft: 10,
    },
    riskLevel: {
        fontFamily: Light,
        fontSize: 12,
    },
    expandedBox: {
        marginVertical: 20,
    },
    infoLabel: {
        fontFamily: Medium,
        color: primaryColor,
        marginVertical: 10,
        fontSize: 14,
    },
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
        width: 90,
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
        padding: 16,
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
        lineHeight: 24,
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
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 3,
    },
    ingredientText: {
        fontFamily: Light,
        fontSize: 16,
        width: "60%",
    },

    nutritionValue: {
        fontSize: 13,
        color: "#9ca3af",
    },
    expandedText: {
        fontSize: 14,
        color: "#6b7280",
        padding: 10,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});
