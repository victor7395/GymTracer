import React from "react";
import { createContext, useState } from "react";
import { editWorkout, newWorkout, removeWorkout } from "../services/WorkoutService";

export const WorkoutContext = createContext({});

export function WorkoutProvider({ children }) {
    const [selectedWorkout, setSelectedWorkout] = useState({});
    const [actualWorkoutName, setActualWorkoutName] = useState();

    async function alterWorkout(workoutToEdit) {
        await editWorkout(workoutToEdit);
    }

    async function deleteWorkout(workout){
        await removeWorkout(workout);
    }

    async function addWorkout(workoutToAdd){
        await newWorkout(workoutToAdd);
    }

    return (
        <WorkoutContext.Provider value={
            {
                selectedWorkout,
                setSelectedWorkout,
                actualWorkoutName,
                setActualWorkoutName,
                addWorkout,
                alterWorkout,
                deleteWorkout,
            }
        }>
            {children}
        </WorkoutContext.Provider>
    );
}