import { initializeApp } from "firebase/app";
import {getMessaging} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBND1Y_PEQ2MNk68sYQym8WR5UZH6VROR8",
  authDomain: "healmate-6b3b6.firebaseapp.com",
  projectId: "healmate-6b3b6",
  storageBucket: "healmate-6b3b6.firebasestorage.app",
  messagingSenderId: "870788450265",
  appId: "1:870788450265:web:b883c61c80c1cae8787bc8",
  measurementId: "G-V22LS2VPE5"
};
// api key to connect our react app with firebase 

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
