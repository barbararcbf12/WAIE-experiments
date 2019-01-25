import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
  