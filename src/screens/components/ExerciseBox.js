import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ExerciseContext } from "../../contexts/ExerciseContext";

export default function ExerciseBox({
    id,
    name,
    series,
    repeat,
    weight,
    extraWeight,
    rest,
    obs
}) {

    let hasExtraWeight = extraWeight > 0;
    const styles = stylesFunction();
    const navigation = useNavigation();
    const { setSelectedExercise, selectedExercise, populateActualExercise } = useContext(ExerciseContext);

    function navigateToEdit() {
        setSelectedExercise({
            id,
            name,
            series,
            repeat,
            weight,
            extraWeight,
            rest,
            obs
        });
        populateActualExercise();
        navigation.navigate('Edit Workout');
    }

    return <TouchableOpacity onLongPress={() => navigateToEdit()}>
        <View style={styles.box}>
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
            <Text style={styles.line}>Obs: {obs ? obs : "-"}</Text>
        </View>
    </TouchableOpacity>
}

const stylesFunction = () =>
    StyleSheet.create({
        exercise: {
            textTransform: 'uppercase',
            color: 'white',
            fontSize: 16,
            lineHeight: 25,
            fontFamily: 'OpenSans-Bold'
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
            color: 'white',
            fontSize: 16,
            lineHeight: 25,
            fontFamily: 'OpenSans-Regular'
        },
        box: {
            backgroundColor: "#757575",
            marginVertical: 5,
            marginHorizontal: 7,
            paddingHorizontal: 7,
            paddingVertical: 8,
            elevation: 5,
            borderRadius: 3,
        }
    });