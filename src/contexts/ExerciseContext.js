import React from "react";
import { createContext, useState } from "react";
import { editExercise, getExercise, newExercise, removeExercise } from "../services/ExerciseService";

export const ExerciseContext = createContext({});

export function ExerciseProvider({ children }) {
    const [selectedExercise, setSelectedExercise] = useState({});
    const [exerciseList, setExerciseList] = useState([]);

    const [actualExerciseId, setActualExerciseId] = useState();
    const [actualExerciseName, setActualExerciseName] = useState();
    const [actualExerciseSeries, setActualExerciseSeries] = useState();
    const [actualExerciseRepeat, setActualExerciseRepeat] = useState();
    const [actualExerciseWeight, setActualExerciseWeight] = useState();
    const [actualExerciseExtraWeight, setActualExerciseExtraWeight] = useState();
    const [actualExerciseRest, setActualExerciseRest] = useState();
    const [actualExerciseObs, setActualExerciseObs] = useState();
    const [actualPhoto, setActualPhoto] = useState();

    async function addExercise(newExerciseToAdd) {
        await newExercise(newExerciseToAdd);
    }

    async function modifyExercise(newExerciseToEdit) {
        await editExercise(newExerciseToEdit);
    }

    async function searchExercises(selectedWorkout) {
        const getExercises = await getExercise(selectedWorkout);
        setExerciseList(getExercises);
    }

    async function deleteExercise(exerciseToDelete) {
        await removeExercise(exerciseToDelete);
    }

    function populateActualExercise() {
        setActualExerciseId(selectedExercise.id);
        setActualExerciseName(selectedExercise.name);
        setActualExerciseSeries(selectedExercise.series);
        setActualExerciseRepeat(selectedExercise.repeat);
        setActualExerciseWeight(selectedExercise.weight);
        setActualExerciseExtraWeight(selectedExercise.extraWeight);
        setActualExerciseRest(selectedExercise.rest);
        setActualExerciseObs(selectedExercise.obs);
        setActualPhoto(selectedExercise.photo);
    }

    function cleanActualExercise() {
        setActualExerciseId('');
        setActualExerciseName('');
        setActualExerciseSeries('');
        setActualExerciseRepeat('');
        setActualExerciseWeight('');
        setActualExerciseExtraWeight('');
        setActualExerciseRest('');
        setActualExerciseObs('');
        setActualPhoto('');
    }

    return (
        <ExerciseContext.Provider value={
            {
                selectedExercise,
                setSelectedExercise,
                exerciseList,
                setExerciseList,
                searchExercises,
                addExercise,
                modifyExercise,
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
                cleanActualExercise,
            }
        }>
            {children}
        </ExerciseContext.Provider>
    );
}