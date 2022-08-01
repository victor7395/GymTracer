import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function ExerciseBox({
    name,
    series,
    repeat,
    weight,
    extraWeight,
    rest,
    obs }) {
    return <View style={styles.box}>
        <View>
            <Text style={styles.exercise}>{name}</Text>
            <View style={styles.row}>
                <Text style={styles.line}>Série: {series}</Text>
                <Text style={styles.line}>Repetições: {repeat}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.line}>Carga: {weight} + {extraWeight}</Text>
                <Text style={styles.line}>Descanso: {rest} segundos</Text>
            </View>
            <Text style={styles.line}>Obs: {obs}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    exercise: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#0A0909'
    },
    row: {
        flexDirection: 'row',
    },
    line: {
        marginRight: 55,
        color: '#0A0909'
    },
    box: {
        backgroundColor: "#E6E6E6",
        marginTop: 10,
        marginHorizontal: 7,
        paddingHorizontal: 7,
        paddingVertical: 4,
        elevation: 5,
        borderRadius: 3,
    }
});