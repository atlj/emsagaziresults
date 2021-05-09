import firebase from "firebase/app";
import "firebase/firebase-database";

const firebaseConfig = {
    apiKey: "AIzaSyD8d9_jFxFqLcCd63GonhHjpNmvgmhkYyc",
    authDomain: "emsa-gazi-votes.firebaseapp.com",
    databaseURL:
        "https://emsa-gazi-votes-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "emsa-gazi-votes",
    storageBucket: "emsa-gazi-votes.appspot.com",
    messagingSenderId: "49758157570",
    appId: "1:49758157570:web:bd2bf4b2e8f44e3c6ae01b",
    measurementId: "G-4ZN5H22R8K",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
