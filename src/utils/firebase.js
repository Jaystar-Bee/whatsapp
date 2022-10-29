// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCsEHVz_tsWR6bzda_8U_NniyKtswy23Tk",
    authDomain: "whatsapp-jaystar.firebaseapp.com",
    databaseURL: "https://whatsapp-jaystar-default-rtdb.firebaseio.com",
    projectId: "whatsapp-jaystar",
    storageBucket: "whatsapp-jaystar.appspot.com",
    messagingSenderId: "403290531524",
    appId: "1:403290531524:web:225dbb6393368cd4904b91",
    measurementId: "G-F8CFM2LRMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export default app