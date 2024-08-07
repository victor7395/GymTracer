import { db } from "./SQLiteConnection";

export function createTableExercise() {
    db.transaction((transaction) => {
        transaction.executeSql("" +
            "CREATE TABLE IF NOT EXISTS " +
            "Exercise" +
            "(" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "name TEXT," +
            "series INTEGER," +
            "repeat INTEGER," +
            "weight REAL," +
            "extraWeight REAL," +
            "rest INTEGER," +
            "obs TEXT, " +
            "workoutId INTEGER " +
            ");"
        );
        console.info("Tabela Exercise Criada");
    });
}

//Alteração feita para feature/1 de inclusão de foto
export async function alterTableExercise(){
    db.transaction((transaction) => {
        transaction.executeSql("" +
            "ALTER TABLE " +
            "Exercise " +
            "ADD COLUMN " +
            "photo TEXT"
        );
        console.info("Tabela Exercise Modificada");
    });
}

export async function newExercise(exercise) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("" +
                "INSERT INTO Exercise ( " +
                "name, " +
                "series, " +
                "repeat, " +
                "weight, " +
                "extraWeight, " +
                "rest, " +
                "obs, " +
                "workoutId, " +
                "photo " +
                ") " +
                "VALUES " +
                "(?, ?, ?, ?, ?, ?, ?, ?, ?);",
                [exercise.name, exercise.series, exercise.repeat, exercise.weight, exercise.extraWeight, exercise.rest, exercise.obs, exercise.workoutId, exercise.photo],
                () => {
                    resolve("Exercicio adicionado com sucesso.");
                    console.log("Exercicio adicionado com sucesso.");
                }, (error) => {
                    console.log("Erro ao adicionar exercício.");
                    console.error(error);
                });
        });
    });
}

export async function editExercise(exercise) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("" +
                "UPDATE Exercise SET " +
                "name = ?, " +
                "series = ?, " +
                "repeat = ?, " +
                "weight = ?, " +
                "extraWeight = ?, " +
                "rest = ?, " +
                "obs = ?, " +
                "photo = ? " +
                "WHERE " +
                "id = ?;",
                [exercise.name, exercise.series, exercise.repeat, exercise.weight, exercise.extraWeight, exercise.rest, exercise.obs, exercise.photo, exercise.id ],
                () => {
                    resolve("Exercicio atualizado com sucesso.");
                    console.log("Exercicio atualizado com sucesso.");
                }, (error) => {
                    console.log("Erro ao atualizar o exercício.");
                    console.error(error);
                });
        });
    });
}

export async function removeExercise(exercise) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("" +
                "DELETE FROM Exercise " +
                "WHERE " +
                "id = ?;",
                [exercise.id],
                () => {
                    resolve("Exercicio deletado com sucesso.");
                });
        });
    });
}

export async function getExercise(workout) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("" +
                "SELECT * FROM Exercise " +
                "WHERE workoutId = ?;",
                [workout.id],
                (transaction, resultado) => {
                    let temp = [];
                    for (let i = 0; i < resultado.rows.length; ++i) {
                        temp.push(resultado.rows.item(i));
                    }
                    resolve(temp);
                }, (error) => {
                    console.error(error);
                });
        });
    });
}