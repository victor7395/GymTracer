import React, { useEffect, useState } from "react";
import Routes from "./src/routes/routes";
import { ExerciseProvider } from "./src/contexts/ExerciseContext";
import { createTableWorkout, getWorkout } from "./src/services/WorkoutService";
import { WorkoutProvider } from "./src/contexts/WorkoutContext";
import { createTableExercise } from "./src/services/ExerciseService";
import { GeneralProvider } from "./src/contexts/GeneralContext";

export default function App() {
  const [setWorkouts] = useState([]);

  useEffect(() => {
    createTables();
  }, []);

  async function createTables() {
    await createTableWorkout();
    await createTableExercise();
  }

  return (
    <GeneralProvider>
      <WorkoutProvider>
        <ExerciseProvider>
          <Routes />
        </ExerciseProvider>
      </WorkoutProvider>
    </GeneralProvider>
  );
}