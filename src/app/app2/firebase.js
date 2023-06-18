import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyCG-8m86VO_aB9kJPkI4xIaa8SMGCYHTCg",
    authDomain: "dbsensors.firebaseapp.com",
    databaseURL: "https://dbsensors-default-rtdb.firebaseio.com",
    projectId: "dbsensors",
    storageBucket: "dbsensors.appspot.com",
    messagingSenderId: "1013519019759",
    appId: "1:1013519019759:web:75e854d8032128304e751a",
    measurementId: "G-YD2HFMLCKP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)