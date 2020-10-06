import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB_bS56_QVNUzEzb1R4pBbNu9DUmO6-DzI",
    authDomain: "todo-app-901ca.firebaseapp.com",
    databaseURL: "https://todo-app-901ca.firebaseio.com",
    projectId: "todo-app-901ca",
    storageBucket: "todo-app-901ca.appspot.com",
    messagingSenderId: "951505254878",
    appId: "1:951505254878:web:756d4fd105ef3ce100854f",
    measurementId: "G-EM21FZZ60Q"
});

const db = firebase.firestore();

export default db;
