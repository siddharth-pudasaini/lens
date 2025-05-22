import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>("back");

    const [scanData, setScanData] = useState<string | null>(null);
    const [mode, setMode] = useState("barcode");
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);

    const handleBarcodeScanned = (result: { data: string }) => {
        router.replace({
            pathname: "/result",
            params: { upcCode: result.data },
        });
    };

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Camera */}
            <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                facing={facing}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "ean13", "code128"],
                }}
                onBarcodeScanned={handleBarcodeScanned}
            />

            {/* Barcode Box */}
            {mode === "barcode" && (
                <View style={styles.barcodeBox}>
                    <Text style={styles.overlayText}>
                        Align barcode within the box
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    message: {
        textAlign: "center",
        paddingBottom: 10,
    },
    topControls: {
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        color: "white",
        marginHorizontal: 8,
    },
    bottomControls: {
        position: "absolute",
        bottom: 50,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
    },
    controlButton: {
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: "white",
        backgroundColor: "rgba(255,255,255,0.2)",
        marginHorizontal: 10,
    },
    barcodeBox: {
        position: "absolute",
        top: "25%",
        left: "15%",
        width: "70%",
        height: "40%",
        borderWidth: 3,
        borderColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    overlayText: {
        color: "white",
        marginTop: 10,
        fontSize: 14,
    },
});
