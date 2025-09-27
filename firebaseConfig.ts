import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6OqcrB9l_3rMwyivDE37lV63c1gdUot8",
  authDomain: "swadeshi-d6820.firebaseapp.com", // Required for Web SDK
  projectId: "swadeshi-d6820",
  storageBucket: "swadeshi-d6820.appspot.com",
  messagingSenderId: "784860317115",
  appId: "1:784860317115:android:f42c31efda2baf2f3af09e",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
