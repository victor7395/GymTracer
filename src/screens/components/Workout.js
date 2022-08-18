import React, { useContext, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import ExerciseBox from "./ExerciseBox";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { WorkoutContext } from "../../contexts/WorkoutContext";
import { useNavigation } from "@react-navigation/native";
import { ExerciseContext } from "../../contexts/ExerciseContext";

export default function Workout() {
    const { selectedWorkout } = useContext(WorkoutContext);
    const { setSelectedExercise, exerciseList, searchExercises } = useContext(ExerciseContext);
    const navigation = useNavigation();

    useEffect(() => {
        searchExercises(selectedWorkout);
        setSelectedExercise({});
    }, [exerciseList.length]);

    function navigateToAdd() {
        setSelectedExercise({});
        navigation.navigate('Edit Workout');
    }

    return <View>
        <View style={styles.backgroundTheme}>
            <View style={styles.titleContaier}>
                <View>
                    <Text style={styles.title}>{selectedWorkout.workoutName}</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => {
                            navigateToAdd();
                        }}>
                        <FontAwesome5 name={'plus-square'} size={16} color='white' style={styles.icons} />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={exerciseList}
                renderItem={
                    ({ item }) => <ExerciseBox {...item} />
                }
                key={exercise => exercise}
            />

            <View style={styles.buttomContainer}>
                <TouchableOpacity
                    style={styles.buttomBack}
                    onPress={() => { navigation.goBack() }
                    }
                >
                    <FontAwesome5 name={'long-arrow-alt-left'} size={26} color='white' style={styles.icons} />
                </TouchableOpacity>
            </View>

        </View>
    </View>
}

const styles = StyleSheet.create({
    title: {
        textTransform: "uppercase",
        fontSize: 22,
        fontFamily: 'OpenSans-Bold',
        textAlign: 'center',
        color: 'white',
    },
    titleContaier: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderRadius: 7,
        elevation: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: '#757575'
    },
    iconsContainer: {
        flexDirection: 'row'
    },
    icons: {
        marginHorizontal: 5,
    },
    buttons: {
        justifyContent: 'center'
    },
    backgroundTheme: {
        backgroundColor: '#171616',
        height: Dimensions.get('window').height,
    },
    buttomContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        position: 'absolute',
    },
    buttomBack: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#171616',
        top: 50,
        marginTop: Dimensions.get('window').height - 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#757575',
        opacity: 0.7,
    },
})