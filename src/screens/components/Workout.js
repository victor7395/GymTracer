import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import useWorkout from "../../hooks/useWorkout";
import ExerciseBox from "./ExerciseBox";


export default function Workout({ typeOfWorkout }) {

    const [workoutType, workout] = useWorkout({ typeOfWorkout });

    return <>
        <Text style={styles.title}>{workoutType}</Text>
        <FlatList
            data={workout}
            renderItem={({ item }) => <ExerciseBox {...item} />}
            key={(item) => { workout.name }}
        />
    </>
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        textTransform: "uppercase",
        fontSize: 22,
        fontWeight: 'bold',
        paddingVertical: 15,
        borderRadius: 7,
        elevation: 5,
    }
})