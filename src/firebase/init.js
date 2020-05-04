import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCYVp8AXTlCbZuDGQSLeQY1HicHwg66500",
  authDomain: "simply-chat20.firebaseapp.com",
  databaseURL: "https://simply-chat20.firebaseio.com",
  projectId: "simply-chat20",
  storageBucket: "simply-chat20.appspot.com",
  messagingSenderId: "540682042737",
  appId: "1:540682042737:web:d8352bd684f32d5dad8ad0"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export { db };
