import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDAG3cI15yGbXoB5Sj4JhAzbw_xtNKtCj8",
  authDomain: "musicapp22-d3ab9.firebaseapp.com",
  projectId: "musicapp22-d3ab9",
  storageBucket: "musicapp22-d3ab9.appspot.com",
  messagingSenderId: "21967098226",
  appId: "1:21967098226:web:66daa0e627f64ef2f24deb",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const userCollection = db.collection("users");

export { auth, db, userCollection };
