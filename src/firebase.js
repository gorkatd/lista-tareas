import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDxSbUEqerP3_hirhtll-CNYuXgD4DckSk",
    authDomain: "prueba-gorkatd.firebaseapp.com",
    databaseURL: "https://prueba-gorkatd.firebaseio.com",
    projectId: "prueba-gorkatd",
    storageBucket: "prueba-gorkatd.appspot.com",
    messagingSenderId: "317518955859",
    appId: "1:317518955859:web:a34941b1cabcb408034da6"
});

export const db = firebaseApp.firestore();