import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBv1fJVpVesEglR1bZ2KRZFQTq35h1-RDY",
  authDomain: "zakrni.firebaseapp.com",
  databaseURL: "https://zakrni.firebaseio.com",
  projectId: "zakrni",
  storageBucket: "zakrni.appspot.com",
  messagingSenderId: "211815943758",
  appId: "1:211815943758:web:3e4f212680a534b907fd1f",
  measurementId: "G-09WX3VKWXF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
