import * as firebase from "firebase";
firebase.initializeApp({
  apiKey: "AIzaSyBPkxsMDm1Zv_-dnSDPMyLT2bwkf5ipvRk",
  authDomain: "quiz-48638.firebaseapp.com",
  databaseURL: "https://quiz-48638.firebaseio.com",
  projectId: "quiz-48638",
  storageBucket: "quiz-48638.appspot.com",
  messagingSenderId: "707023688800",
  appId: "1:707023688800:web:cdc53b01fb69d408dddf05",
  measurementId: "G-JPTW2RNV25",
});
const credentials = () => {
  return firebase;
};
export default credentials;
