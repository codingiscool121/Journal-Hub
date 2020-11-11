import firebase from 'firebase';
// require("@firebase/firestore")


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB4eHNpQ4R6xeS306jhuDWRckRwq78W7Os",
    authDomain: "story-hub-9476e.firebaseapp.com",
    databaseURL: "https://story-hub-9476e.firebaseio.com",
    projectId: "story-hub-9476e",
    storageBucket: "story-hub-9476e.appspot.com",
    messagingSenderId: "845733921308",
    appId: "1:845733921308:web:040b76654b3c83572a55d9"
  };




  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default  firebase.firestore()                                  