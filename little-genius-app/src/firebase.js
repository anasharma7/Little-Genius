import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPFoIra-YUsBPRgJjFX6pdbENBJDtdINA",
  authDomain: "little-genius-67ad1.firebaseapp.com",
  projectId: "little-genius-67ad1",
  storageBucket: "little-genius-67ad1.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "41486192735",
  appId: "1:41486192735:web:665946847a9316f5be0bea",
  measurementId: "G-2NQH1PD8JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Function to sign in anonymously
export const signInUser = async () => {
  try {
    const result = await signInAnonymously(auth);
    console.log('✅ Signed in anonymously:', result.user.uid);
    return result.user;
  } catch (error) {
    console.error('❌ Error signing in:', error);
    return null;
  }
};

// Function to get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Function to listen to auth state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Add error handling for development
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase initialized in development mode');
}

export default app; 