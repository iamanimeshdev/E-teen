// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDoghwMhCIuFTWF6_diOeZGHX12vDtBydc",
    authDomain: "e-teen-9879d.firebaseapp.com",
    projectId: "e-teen-9879d",
    storageBucket: "e-teen-9879d.firebasestorage.app",
    messagingSenderId: "257068173810",
    appId: "1:257068173810:web:64567580843877bf70436b",
    measurementId: "G-7KDFFN7MR5"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
