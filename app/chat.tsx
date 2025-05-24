import { primaryColor } from "@/constants";
import { useNavigation } from "expo-router";
import { FolderPlus, Menu, SendHorizonal } from "lucide-react-native";
import React, { useLayoutEffect, useState } from "react";

import {
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Message {
    id: string;
    text: string;
    fromMe: boolean;
}

export default function ChatScreen() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const navigation = useNavigation();

    const handleMenu = () => {
        console.log("Menu clicked from inside ChatScreen");
        // perform your action here
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={handleMenu}
                    style={{ marginRight: 15 }}
                >
                    <Menu size={24} color="white" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const sendMessage = () => {
        if (!input.trim()) return;
        const newMessage: Message = {
            id: Date.now().toString(),
            text: input,
            fromMe: true,
        };
        setMessages([newMessage, ...messages]);
        setInput("");
    };

    return (
        <KeyboardAwareScrollView
            style={styles.wrapper}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={50}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item.id}
                        inverted
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View
                                style={[
                                    styles.message,
                                    item.fromMe
                                        ? styles.myMessage
                                        : styles.theirMessage,
                                ]}
                            >
                                <Text style={styles.messageText}>
                                    {item.text}
                                </Text>
                            </View>
                        )}
                    />

                    <View style={styles.inputArea}>
                        <TouchableOpacity onPress={sendMessage}>
                            <FolderPlus
                                size={36}
                                strokeWidth={2}
                                color={primaryColor}
                            />
                        </TouchableOpacity>
                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            placeholder="Type a message"
                            multiline
                            textAlignVertical="top"
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={sendMessage}>
                            <SendHorizonal
                                size={36}
                                strokeWidth={2}
                                color={primaryColor}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flexGrow: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    message: {
        padding: 10,
        marginVertical: 4,
        borderRadius: 10,
        maxWidth: "80%",
    },
    myMessage: {
        backgroundColor: "#dcf8c6",
        alignSelf: "flex-end",
    },
    theirMessage: {
        backgroundColor: "#e5e5ea",
        alignSelf: "flex-start",
    },
    messageText: {
        fontSize: 16,
    },
    inputArea: {
        flexDirection: "row",
        alignItems: "flex-end",
        borderColor: "#ddd",
        backgroundColor: "#fff",
        marginBottom: 40,
        marginTop: 10,
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        backgroundColor: "#f1f1f1",
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 16,
        textAlignVertical: "top",
        height: 60,
        maxHeight: 120,
        lineHeight: 24,
        borderRadius: 11,
    },
    sendBtn: {
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: primaryColor,
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    sendText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
