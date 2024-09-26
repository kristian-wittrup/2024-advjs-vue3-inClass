import { 
  getFirestore, 
  collection, 
} from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

// Import the functions you need from the SDKs you need ( STEP FIREBASE )
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app)

// step 3.5 : Create a reference to the movies collection in Firebase
const moviesFirebaseCollectionRef = 'movies';
const moviesCollection = collection(db, moviesFirebaseCollectionRef);

// Actor collection
const actorsFirebaseCollectionRef = 'actors';
const actorsCollection = collection(db, actorsFirebaseCollectionRef);

export { auth, db, moviesCollection, moviesFirebaseCollectionRef, actorsFirebaseCollectionRef, actorsCollection };