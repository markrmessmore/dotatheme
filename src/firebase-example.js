import firebase from 'firebase'
import Vue from 'vue'

Vue.use(firebase)

var config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_DOMAIN",
    databaseURL: "YOUR_URL",
    projectId: "YOUR_ID",
    storageBucket: "YOUR_BUCKET"
  };

let app = firebase.initializeApp(config)
let db = app.database()
