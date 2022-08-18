import React, { useContext, useEffect, useState } from "react";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getWorkout } from "../services/WorkoutService";
import WorkoutItem from "../screens/components/WorkoutItem";
import { Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GeneralContext } from "../contexts/GeneralContext";
import { WorkoutContext } from "../contexts/WorkoutContext";

export default function AppRoutes() {
    const [workouts, setWorkouts] = useState([]);
    const { workoutModalVisible, setWorkoutModalVisible } = useContext(GeneralContext);
    const { selectedWorkout, setSelectedWorkout, actualWorkoutName, setActualWorkoutName, addWorkout, alterWorkout, deleteWorkout } = useContext(WorkoutContext);

    useEffect(() => {
        setTimeout(() => {
            getAllWorkouts();
        }, 500);
    }, []);

    async function getAllWorkouts() {
        const workoutData = await getWorkout();
        setWorkouts(workoutData);
    }

    const styles = stylesFunction();

    function openAddModal() {
        setSelectedWorkout({});
        setActualWorkoutName('');
        setWorkoutModalVisible(true);
    }

    function editWorkout() {
        const newWorkoutToEdit = {
            id: selectedWorkout.id,
            workoutName: actualWorkoutName
        }
        alterWorkout(newWorkoutToEdit);
        setSelectedWorkout({});
        setWorkoutModalVisible(false);
        getAllWorkouts();
    }

    function removeWorkout() {
        deleteWorkout(selectedWorkout);
        setSelectedWorkout({});
        setWorkoutModalVisible(false);
        getAllWorkouts();
    }

    function newWorkout() {
        const newWorkoutToAdd = {
            workoutName: actualWorkoutName
        }
        addWorkout(newWorkoutToAdd);
        setWorkoutModalVisible(false);
        getAllWorkouts();
    }

    function addOrEditWorkout() {
        if (selectedWorkout.id) {
            editWorkout();
        } else {
            newWorkout();
        }
    }

    return <View style={styles.viewContainer}>
        <View>
            <FlatList
                data={workouts}
                renderItem={
                    (workout) => <WorkoutItem {...workout.item} />
                }
                key={(item) => { item.id }}
                contentContainerStyle={styles.boxesContainer}
                numColumns={2}
            >
            </FlatList>
        </View>
        <View style={styles.buttomContainer}>
            <TouchableOpacity
                style={styles.buttom}
                onPress={() => { openAddModal() }
                }
            >
                <FontAwesome5 name={'plus'} size={26} color='white' style={styles.icons} />
            </TouchableOpacity>
        </View>

        <Modal animationType="slide"
            transparent={true}
            visible={workoutModalVisible}
            onRequestClose={() => { openModal() }
            }
        >
            <View style={styles.centralizaModal}>
                <ScrollView>
                    <View style={styles.modal}>
                        <Text style={styles.labelText}>Criar novo treino</Text>
                        <TextInput style={styles.textInput} value={actualWorkoutName} onChangeText={(name) => { setActualWorkoutName(name) }}></TextInput>
                        <View style={styles.buttomContainer}>
                            <TouchableOpacity
                                style={styles.buttomDark}
                                onPress={() => {
                                    addOrEditWorkout();
                                }}
                            >
                                <Text style={styles.buttomTextWhite}>Salvar</Text>
                            </TouchableOpacity>
                            {selectedWorkout.id && <TouchableOpacity style={styles.buttomRed} onPress={() => removeWorkout()}>
                                <Text style={styles.buttomTextWhite}>Excluir</Text>
                            </TouchableOpacity>}
                            <TouchableOpacity
                                style={styles.buttomDark}
                                onPress={() => {
                                    setWorkoutModalVisible(false);
                                }}
                            >
                                <Text style={styles.buttomTextWhite}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    </View>
}

const stylesFunction = () =>
    StyleSheet.create({
        buttom: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#7ED957',
            position: 'absolute',
            right: 15,
            marginTop: 5,
            justifyContent: 'center',
        },
        viewContainer: {
            height: Dimensions.get('window').height,
            backgroundColor: '#171616',
        },
        buttomContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
        },
        icons: {
            alignSelf: 'center',
        },
        centralizaModal: {
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end",
        },
        modal: {
            backgroundColor: "#757575",
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 32,
            marginTop: 8,
            marginHorizontal: 16,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 15,
            marginTop: 20,
        },
        buttomTextWhite: {
            textAlign: "center",
            fontSize: 16,
            fontWeight: '600',
            color: 'white',
            fontFamily: 'OpenSans-Regular'
        },
        buttomTextBlack: {
            textAlign: "center",
            fontSize: 16,
            fontWeight: '600',
            color: 'black'
        },
        buttomText: {
            textAlign: "center",
            fontSize: 16,
            fontWeight: '600',
            color: 'black'
        },
        buttomDark: {
            borderRadius: 5,
            width: 80,
            height: 35,
            alignSelf: 'center',
            backgroundColor: '#071A28',
            justifyContent: 'center'
        },
        buttomRed: {
            borderRadius: 5,
            width: 80,
            height: 35,
            alignSelf: 'center',
            backgroundColor: '#E03E1E',
            justifyContent: 'center'
        },
        textInput: {
            backgroundColor: '#F9F5EB',
            borderRadius: 6,
            marginVertical: 7,
            fontFamily: 'OpenSans-Regular'

        },
        labelText: {
            fontSize: 18,
            fontWeight: '500',
            color: 'white',
            fontFamily: 'OpenSans-Regular'
        }
    });
