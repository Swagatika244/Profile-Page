import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBd2aXX2NCC-jGZCV_JxSABD5Yk65eC4FY',
  authDomain: 'profile-page-e239f.firebaseapp.com',
  projectId: 'profile-page-e239f',
  storageBucket: 'profile-page-e239f.appspot.com',
  messagingSenderId: '435864892546',
  appId: '1:435864892546:web:243b27e90f8bbc724e709b',
};

// Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export default firebase.firestore();
