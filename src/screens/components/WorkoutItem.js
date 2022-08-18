import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GeneralContext } from "../../contexts/GeneralContext";
import { WorkoutContext } from "../../contexts/WorkoutContext";

export default function WorkoutItem(item) {
    const workout = item;
    const navigation = useNavigation();
    const { setSelectedWorkout, setActualWorkoutName, selectedWorkout } = useContext(WorkoutContext);
    const { setWorkoutModalVisible } = useContext(GeneralContext);

    const styles = stylesFunction();

    function navigateToWorkout() {
        setSelectedWorkout(workout)
        navigation.navigate('Workout');
    }

    function openEditModal(){
        setWorkoutModalVisible(true);
        setSelectedWorkout(workout);
        setActualWorkoutName(workout.workoutName);
    }

    return <TouchableOpacity
        style={styles.boxes}
        onPress={() =>
            navigateToWorkout()
        }
        onLongPress={() => openEditModal()
        }
    >
        <Text style={styles.text}>{workout.workoutName}</Text>
    </TouchableOpacity>
}

const stylesFunction = () =>
    StyleSheet.create({
        boxes: {
            flex: 1,
            width: Dimensions.get('window').width / 2,
            height: 90,
            backgroundColor: "#757575",
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            margin: 4,
        },
        text: {
            fontSize: 20,
            textTransform: 'uppercase',
            color: 'white',
            fontFamily: 'OpenSans-SemiBold',
        },    
    });
