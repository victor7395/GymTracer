import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { ExerciseContext } from "../../contexts/ExerciseContext";
import { WorkoutContext } from "../../contexts/WorkoutContext";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function EditWorkout() {
    const { selectedWorkout } = useContext(WorkoutContext);
    const [imageUri, setImageUri] = useState(null);

    const {
        selectedExercise,
        setSelectedExercise,
        addExercise,
        modifyExercise,
        searchExercises,
        deleteExercise,
        actualExerciseId,
        actualExerciseName,
        actualExerciseSeries,
        actualExerciseRepeat,
        actualExerciseWeight,
        actualExerciseExtraWeight,
        actualExerciseRest,
        actualExerciseObs,
        actualPhoto,
        setActualExerciseName,
        setActualExerciseSeries,
        setActualExerciseRepeat,
        setActualExerciseWeight,
        setActualExerciseExtraWeight,
        setActualExerciseRest,
        setActualExerciseObs,
        setActualPhoto,
        populateActualExercise,
        cleanActualExercise
    } = useContext(ExerciseContext);

    useEffect(() => {
        populateScreen();
    }, [selectedExercise]);

    function populateScreen() {
        if (selectedExercise) {
            populateActualExercise();
            console.log(actualPhoto  + " actual footootootooto");
        } else {
            cleanScreen();
        }
    }

    const styles = stylesFunction();
    const navigation = useNavigation();

    function saveExercise() {
        if (actualExerciseId) {
            const newExerciseToEdit = {
                id: actualExerciseId,
                name: actualExerciseName,
                series: actualExerciseSeries,
                repeat: actualExerciseRepeat,
                weight: actualExerciseWeight,
                extraWeight: actualExerciseExtraWeight,
                rest: actualExerciseRest,
                obs: actualExerciseObs,
                photo: actualPhoto
            };
            try {
                modifyExercise(newExerciseToEdit);
            } catch {
                console.log('erro ao editar')
            }
            searchExercises(selectedWorkout);
        } else {
            const newExerciseToAdd = {
                name: actualExerciseName,
                series: actualExerciseSeries,
                repeat: actualExerciseRepeat,
                weight: actualExerciseWeight,
                extraWeight: actualExerciseExtraWeight,
                rest: actualExerciseRest,
                obs: actualExerciseObs,
                workoutId: selectedWorkout.id,
                photo: actualPhoto
            };
            try {
                addExercise(newExerciseToAdd);
                searchExercises(selectedWorkout);
            } catch {
                console.log('erro ao adicionar')
            }
        }
        cleanScreen();
        navigation.goBack();
    }

    function removeExercise() {
        deleteExercise(selectedExercise);
        searchExercises(selectedWorkout);
        cleanScreen();
        navigation.goBack();
    }

    function cancelEdit() {
        cleanScreen();
        navigation.goBack();
    }

    function cleanScreen() {
        cleanActualExercise();
        setSelectedExercise({});
    }
    
    const takePicture = async () => {
        launchCamera({ mediaType: 'photo', includeBase64: true }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setActualPhoto(response.assets[0].base64);
                setImageUri(response.assets[0].uri);
            }
          });
      };

      const takeFromGalery = async () => {
        launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setActualPhoto(response.assets[0].base64);
                setImageUri(response.assets[0].uri);
            }
          });
      };

    return <View style={styles.box}>
        <Text style={styles.line}>Exercício:</Text>
        <TextInput style={styles.lineInputExercise} value={actualExerciseName} onChangeText={(name) => { setActualExerciseName(name) }} />
        <View style={styles.column}>
            <View style={styles.row1}>
                <Text style={styles.line}>Série:</Text>
                <TextInput style={styles.lineInput} keyboardType={'decimal-pad'} onChangeText={(series) => { setActualExerciseSeries(series) }} >{actualExerciseSeries}</TextInput>
                <Text style={styles.line}>Carga:</Text>
                <TextInput style={styles.lineInput} keyboardType={'decimal-pad'} onChangeText={(weight) => { setActualExerciseWeight(weight) }}>{actualExerciseWeight}</TextInput>
                <Text style={styles.line}>Descanso:</Text>
                <TextInput style={styles.lineInput} keyboardType={'decimal-pad'} onChangeText={(rest) => { setActualExerciseRest(rest) }} >{actualExerciseRest}</TextInput>
            </View>
            <View style={styles.row2}>
                <Text style={styles.line}>Repetições:</Text>
                <TextInput style={styles.lineInput} keyboardType={'decimal-pad'} onChangeText={(repeat) => { setActualExerciseRepeat(repeat) }} >{actualExerciseRepeat}</TextInput>
                <Text style={styles.line}>Carga Extra:</Text>
                <TextInput style={styles.lineInput} keyboardType={'decimal-pad'} onChangeText={(extraWeight) => { setActualExerciseExtraWeight(extraWeight) }} >{actualExerciseExtraWeight}</TextInput>
            </View>
        </View>
        <View>
            <Text style={styles.line}>Obs:</Text>
            <TextInput style={styles.lineInputLarge} multiline maxLength={45} textBreakStrategy={'simple'} numberOfLines={2} value={actualExerciseObs} onChangeText={(obs) => { setActualExerciseObs(obs) }} />
        </View>
        
        <View style={styles.buttomPhoto}>
            <TouchableOpacity 
                style={styles.buttomDark}
                onPress={() => {
                    takePicture()
                    }}>
                <Text style={styles.buttomTextWhite}>Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttomDark}
                onPress={() => {
                    takeFromGalery()
                    }}>
                <Text style={styles.buttomTextWhite}>Galeria</Text>
            </TouchableOpacity>
        </View>
        <Image
            source={{ uri: `data:image/jpeg;base64,${actualPhoto}` }}
            style={styles.photo}
        />

        <View style={styles.buttonsContainer}>
            <TouchableOpacity
                style={styles.buttomDark}
                onPress={() => {
                    saveExercise()
                }}>
                <Text style={styles.buttomTextWhite}>Salvar</Text>
            </TouchableOpacity>
            {actualExerciseId && <TouchableOpacity style={styles.buttomRed} onPress={() => removeExercise()}>
                <Text style={styles.buttomTextWhite}>Excluir</Text>
            </TouchableOpacity>}
            <TouchableOpacity
                style={styles.buttomDark}
                onPress={() =>
                    cancelEdit()
                }>
                <Text style={styles.buttomTextWhite}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const stylesFunction = () =>
    StyleSheet.create({
        column: {
            flexDirection: 'row',
        },
        row1: {
            flex: 1,
        },
        row2: {
            flex: 1,
        },
        row3: {
            marginEnd: 15,
        },
        line: {
            color: 'white',
            fontSize: 16,
            lineHeight: 25,
            marginStart: 15,
            fontFamily: 'OpenSans-Regular'
        },
        lineInput: {
            color: 'black',
            fontSize: 16,
            lineHeight: 25,
            backgroundColor: 'white',
            alignSelf: 'auto',
            height: 40,
            borderRadius: 5,
            marginEnd: 15,
            marginStart: 15,
            textAlign: 'center',
            fontFamily: 'OpenSans-Regular'
        },
        lineInputExercise: {
            color: 'black',
            fontSize: 16,
            lineHeight: 25,
            backgroundColor: 'white',
            alignSelf: 'auto',
            height: 40,
            borderRadius: 5,
            marginEnd: 15,
            marginStart: 15,
            fontFamily: 'OpenSans-SemiBold'
        },
        lineInputLarge: {
            color: 'black',
            fontSize: 16,
            lineHeight: 25,
            backgroundColor: 'white',
            borderRadius: 5,
            textAlignVertical: 'top',
            marginHorizontal: 15,
            fontFamily: 'OpenSans-Regular'
        },
        box: {
            backgroundColor: "#757575",
            paddingHorizontal: 7,
            paddingVertical: 8,
            height: Dimensions.get('window').height,
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginHorizontal: 15,
            marginTop: 20
        },
        buttomTextWhite: {
            textAlign: "center",
            fontSize: 16,
            fontWeight: '600',
            color: 'white',
            fontFamily: 'OpenSans-Regular'
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
        buttomPhoto:{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 15,
        },
        photo: {
            width: 350,
            height: 350,
            textAlign: 'center',
            alignSelf: 'center',
            margin: 10,
        },
    });