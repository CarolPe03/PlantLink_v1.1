
var firebaseConfig = {
    apiKey: "AIzaSyCG-8m86VO_aB9kJPkI4xIaa8SMGCYHTCg",
    authDomain: "dbsensors.firebaseapp.com",
    databaseURL: "https://dbsensors-default-rtdb.firebaseio.com",
    projectId: "dbsensors",
    storageBucket: "dbsensors.appspot.com",
    messagingSenderId: "1013519019759",
    appId: "1:1013519019759:web:75e854d8032128304e751a",
    measurementId: "G-YD2HFMLCKP"
    };
  
    firebase.initializeApp(firebaseConfig);

    var db = firebase.firestore();