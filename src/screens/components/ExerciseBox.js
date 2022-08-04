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

    let hasExtraWeight = extraWeight > 0;

    return <View style={styles.box}>
        <Text style={styles.exercise}>{name}</Text>
        <View style={styles.column}>
            <View style={styles.row1}>
                <Text style={styles.line}>Série: {series}</Text>
                {hasExtraWeight && <Text style={styles.line}>Carga: {weight} + {extraWeight}</Text>}
                {!hasExtraWeight && <Text style={styles.line}>Carga: {weight}</Text>}
            </View>
            <View style={styles.row2}>
                <Text style={styles.line}>Repetições: {repeat}</Text>
                <Text style={styles.line}>Descanso: {rest} segundos</Text>
            </View>
        </View>
        <Text style={styles.line}>Obs: {obs ? obs : "-" }</Text>
    </View>
}

const styles = StyleSheet.create({
    exercise: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#0A0909',
        fontSize: 16,
        lineHeight: 25
    },
    column: {
        flexDirection: 'row'
    },
    row1: {
        flex: 1,
    },
    row2: {
        flex: 2,
    },
    line: {
        color: '#0A0909',
        fontSize: 16,
        lineHeight: 25
    },
    box: {
        backgroundColor: "#E6E6E6",
        marginVertical: 5,
        marginHorizontal: 7,
        paddingHorizontal: 7,
        paddingVertical: 8,
        elevation: 5,
        borderRadius: 3,
    }
});