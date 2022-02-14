import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD54QhkbzPb08JAZUpitIzVoMrs1xusIwU",
  authDomain: "todo-c1987.firebaseapp.com",
  databaseURL: "https://todo-c1987-default-rtdb.firebaseio.com",
  projectId: "todo-c1987",
  storageBucket: "todo-c1987.appspot.com",
  messagingSenderId: "531712538829",
  appId: "1:531712538829:web:8799ea7165d6566c1cd184"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);