import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ExerciseContext } from "../../contexts/ExerciseContext";
import Toast from 'react-native-toast-message';
import CheckBox from "@react-native-community/checkbox";

export default function ExerciseBox({
    id,
    name,
    series,
    repeat,
    weight,
    extraWeight,
    rest,
    obs,
    photo
}) {

    let hasExtraWeight = extraWeight > 0;
    const styles = stylesFunction();
    const navigation = useNavigation();
    const { setSelectedExercise, selectedExercise, populateActualExercise } = useContext(ExerciseContext);
    const [isSelected, setSelection] = useState(false);

    function navigateToEdit() {
        setSelectedExercise({
            id,
            name,
            series,
            repeat,
            weight,
            extraWeight,
            rest,
            obs,
            photo
        });
        populateActualExercise();
        navigation.navigate('Edit Workout');
    }

    function showInfo() {
        Toast.show({
            type: 'showEditInfo',
            text2: 'Segure para editar',
            position: 'bottom',
            autoHide: true,
            visibilityTime: 1300
          });
    }

    return <TouchableOpacity onLongPress={() => navigateToEdit()} onPress={() => showInfo()} >
        <View style={styles.box}>
            <Text style={styles.exercise}>{name}</Text>
            <View style={styles.column}>
                <View style={styles.row0}>
                        <Text style={styles.line}>Série: {series}</Text>
                        {hasExtraWeight && <Text style={styles.line}>Carga: {weight} + {extraWeight}</Text>}
                        {!hasExtraWeight && <Text style={styles.line}>Carga: {weight}</Text>}
                </View>
                <View style={styles.row1}>
                        <Text style={styles.line}>Repetições: {repeat}</Text>
                        <Text style={styles.line}>Descanso: {rest} segundos</Text>
                </View>
                <View style={styles.row2}>
                    <CheckBox 
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkBox}
                        tintColors={{ true: '#071A28', false: '#071A28' }}
                    />
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
        row0: {
            flex: 1,
        },
        row1: {
            flex: 2,
        },
        row2: {
            flex: 3,
            maxWidth: '10%',
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
        },
    });