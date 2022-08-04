import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WorkoutRoutes from "./src/routes/workoutRoutes/workoutRoutes";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function App() {
  const Tab = createBottomTabNavigator();

  return <>
    <NavigationContainer>
      {/* <ScrollView> */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor:'#E1E1E1'},
          headerTitleAlign: 'center',
          tabBarIcon: () => {
            return <FontAwesome5 name={'dumbbell'} brand size={18} color='#0A0909' />;
          },
          headerShown: false
        })}
      >
        <Tab.Screen name="Treino A" component={WorkoutRoutes} initialParams={{ routeParam: 'A' }} />
        <Tab.Screen name="Treino B" component={WorkoutRoutes} initialParams={{ routeParam: 'B' }} />
        <Tab.Screen name="Treino C" component={WorkoutRoutes} initialParams={{ routeParam: 'C' }} />
      </Tab.Navigator>
      {/* </ScrollView> */}
    </NavigationContainer>
  </>
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center'
  }
})