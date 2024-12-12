// firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXHJ4EelkgO3juvDbcWpE6gglakC99V0Y",
  authDomain: "sewarproject-7bc35.firebaseapp.com",
  projectId: "sewarproject-7bc35",
  storageBucket: "sewarproject-7bc35.appspot.com",
  messagingSenderId: "678152537682",
  appId: "1:678152537682:android:7f26d7c9165343d2d7018b",
  measurementId: "YOUR_MEASUREMENT_ID"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);

export { storage };

