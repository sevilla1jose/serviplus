import firebase from 'firebase/app'

require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');
require('firebase/functions');

var config = {
  apiKey: "AIzaSyBXBACdaWUU4ErG0nRQezGTwSbCWck6OPQ",
  authDomain: "fumigacion-express.firebaseapp.com",
  databaseURL: "https://fumigacion-express.firebaseio.com",
  projectId: "fumigacion-express",
  storageBucket: "fumigacion-express.appspot.com",
  messagingSenderId: "104148587274",
  appId: "1:104148587274:web:86f88a06cbb3d634dea0f3",
  measurementId: "G-E7LLYPPGVE"
};

firebase.initializeApp(config);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()

export {
  firebase,
  db,
  auth,
  storage,
  functions
}
