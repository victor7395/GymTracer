import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default ToastConfig = {
    showEditInfo: ({ text2 }) => (
        <View style={styles.modal}>
            <Text style={styles.messageText}>{text2}</Text>
        </View>
    ),

    showInfo: ({ text1, text2 }) => (
        <View style={styles.modal}>
            <Text style={styles.titleText}>{text1}</Text>
            <Text style={styles.messageText}>{text2}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    modal: {
        borderRadius: 25,
        backgroundColor: 'rgba(42, 42, 42, 0.9)',
        borderColor: 'rgba(32, 32, 32, 0.9)',
        borderWidth: 2.5,
        alignContent: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 7,        
    },
    messageText: {
        fontSize: 14,
        alignSelf: "center",
        color: 'rgba(255, 255, 255, 0.9)',
    },
    titleText: {
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: "center",
        color: 'rgba(255, 255, 255, 0.9)',
    }
});