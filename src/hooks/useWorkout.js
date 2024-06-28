import { useEffect, useState } from "react";
import { loadTreinoA, loadTreinoB, loadTreinoC } from '../services/loadData'

export default function useWorkout({ typeOfWorkout }) {
    const [workoutType, setWorkoutType] = useState('');
    const [workout, setWorkout] = useState([]);

    let data = [];

    useEffect(() => {
        try {            
            if (typeOfWorkout == 'Treino A') {
                data = loadTreinoA();
            } else if (typeOfWorkout == 'Treino B') {
                data = loadTreinoB();
            } else if (typeOfWorkout == 'Treino C'){
                data = loadTreinoC();
            }else {
                //console.log('pane no sitema');
            }            
            setWorkoutType(data.workoutType);
            setWorkout(data.workout);
        } catch (error) {
            console.log('Erro ao carregar dados mockados: ' + error.message);
        }

    }, [{ typeOfWorkout }]);

    return [workoutType, workout];
}