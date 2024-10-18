import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAc4O_9PRar1xyr5n6ndgfglPqO2XZaX30",
  authDomain: "sl-todolist.firebaseapp.com",
  projectId: "sl-todolist",
  storageBucket: "sl-todolist.appspot.com",
  messagingSenderId: "376448801127",
  appId: "1:376448801127:web:1e2c66696bf110681877c2",
  measurementId: "G-QNW2GNGM63"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };