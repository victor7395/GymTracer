import { Alert } from "react-native";
import { db } from "./SQLiteConnection";

export function createTableWorkout() {
    db.transaction((transaction) => {
        transaction.executeSql("" +
            "CREATE TABLE IF NOT EXISTS " +
            "Workout" +
            "(" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "workoutName TEXT" +
            ");"
        );
        console.info("Tabela Workout Criada");
    });
}

export async function newWorkout(workout) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("" +
                "INSERT INTO Workout ( " +
                "workoutName" +
                ") " +
                "VALUES " +
                "(?);",
                [workout.workoutName],
                () => {
                    resolve("Treino adicionado com sucesso.");
                    console.log("Treino adicionado com sucesso.");
                }, (error) => {
                    console.log("Erro ao adicionar treino");
                    console.error(error);
                });
        });
    });
}

export async function editWorkout(workout) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("" +
                "UPDATE Workout SET " +
                "workoutName = ? " +
                "WHERE " +
                "id = ?;",
                [workout.workoutName, workout.id],
                () => {
                    resolve("Treino atualizado com sucesso.");
                    console.log("Treino atualizado com sucesso.");
                }, (error) => {
                    console.log("Erro ao atualizar o treino");
                    console.error(error);
                });
        });
    });
}

export async function removeWorkout(workout) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("" +
                "DELETE FROM Workout " +
                "WHERE " +
                "id = ?;",
                [workout.id],
                () => {
                    resolve("Treino deletado com sucesso.");
                    console.log("Treino deletado com sucesso.");
                }, (error) => {
                    console.log("Erro ao deletar treino.");
                    console.error(error);
                });
        });
    });
}

export async function getWorkout() {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("" +
                "SELECT * FROM Workout;",
                [],
                (transaction, resultado) => {
                    let temp = [];
                    for (let i = 0; i < resultado.rows.length; ++i) {
                        temp.push(resultado.rows.item(i));
                    }
                    resolve(temp);
                    console.log("Selected");
                }, (error) => {
                    console.log("Erro ao procurar 'Workout'");
                    console.error(error);
                });
        });
    });
}

export async function removeAllWorkout() {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("" +
                "DELETE FROM Workout;" +
                [],
                () => {
                    resolve("Treinos deletados com sucesso.");
                });
        });
    });
}