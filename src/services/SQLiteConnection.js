import {openDatabase} from 'react-native-sqlite-storage';

function openConnection(){
    const database = openDatabase('db.db');
    return database;
}

export const db = openConnection();