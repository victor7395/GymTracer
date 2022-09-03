import React, { useEffect, useState } from "react";
import Routes from "./src/routes/routes";
import { ExerciseProvider } from "./src/contexts/ExerciseContext";
import { createTableWorkout } from "./src/services/WorkoutService";
import { WorkoutProvider } from "./src/contexts/WorkoutContext";
import { createTableExercise } from "./src/services/ExerciseService";
import { GeneralProvider } from "./src/contexts/GeneralContext";
import Toast from 'react-native-toast-message';
import ToastConfig from "./src/screens/components/ToastConfig";

export default function App() {
  useEffect(() => {
    createTables();
  }, []);

  async function createTables() {
    await createTableWorkout();
    await createTableExercise();
  }

  return (
    <>
      <GeneralProvider>
        <WorkoutProvider>
          <ExerciseProvider>
            <Routes />
          </ExerciseProvider>
        </WorkoutProvider>
      </GeneralProvider>
      <Toast config={ToastConfig}/>
    </>
  );
}