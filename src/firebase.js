import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBAHq26FqDhOSmvcZ4s8oSRZsISLM2ef64",
    authDomain: "react-firestore-60dfd.firebaseapp.com",
    projectId: "react-firestore-60dfd",
    storageBucket: "react-firestore-60dfd.appspot.com",
    messagingSenderId: "673450552907",
    appId: "1:673450552907:web:97cd989a9a9c5b4ba067ce"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();