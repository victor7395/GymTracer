import React from "react";
import { createContext, useState } from "react";

export const GeneralContext = createContext({});

export function GeneralProvider({children}){
    const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
    const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
return (
    <GeneralContext.Provider value={
        {
            workoutModalVisible,
            setWorkoutModalVisible,
            exerciseModalVisible,
            setExerciseModalVisible
        }
    }>
        {children}
    </GeneralContext.Provider>
);
}