import React from "react";
import Workout from "../../screens/components/Workout";

export default function WorkoutRoutes({ route }) {
    return <Workout typeOfWorkout={route.params.routeParam} />
}