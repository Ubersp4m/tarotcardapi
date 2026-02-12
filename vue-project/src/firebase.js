// firebase.js or main.js
import { initializeApp } from 'firebase/app';
// import other services you need
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {firebaseConfig} from './firebaseConfig';

//  const firebaseConfig = {
 
//  };

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize other services
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);