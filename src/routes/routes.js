import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditWorkout from "../screens/components/EditWorkout";
import AppRoutes from "./AppRoutes";
import WorkoutRoutes from "./workoutRoutes/workoutRoutes";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="AppRoutes" component={AppRoutes} options={{ headerShown: false }} />
                <Stack.Screen name="Workout" component={WorkoutRoutes} options={{ headerShown: false }} />
                <Stack.Screen name="Edit Workout" component={EditWorkout} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}