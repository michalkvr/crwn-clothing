// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBfzZR-SklRLSPcUtTneEyXGRXQvDuAG7I',
  authDomain: 'crwn-clothing-db-d0317.firebaseapp.com',
  projectId: 'crwn-clothing-db-d0317',
  storageBucket: 'crwn-clothing-db-d0317.appspot.com',
  messagingSenderId: '229156673374',
  appId: '1:229156673374:web:be071f9b2f71e68b91e1cf',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // This gives me document reference
  const userDocRef = doc(db, 'users', userAuth.uid);

  // This gives me snapshot of user document which may or may not exist
  const userSnapshot = await getDoc(userDocRef);

  // Reference exist but maybe not in the database so i called userSnapshot.exists()
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error while creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};
