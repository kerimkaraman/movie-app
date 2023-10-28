import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAlyXPjGqJ_KCHTuDrcI9pHcaRc21lRKF8",
  authDomain: "movie-app-bdbd9.firebaseapp.com",
  projectId: "movie-app-bdbd9",
  storageBucket: "movie-app-bdbd9.appspot.com",
  messagingSenderId: "638037452354",
  appId: "1:638037452354:web:33633449236611eff2afdb",
  databaseURL:
    "https://movie-app-bdbd9-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const AUTH = getAuth(app);
export const DATABASE = getDatabase(app);
