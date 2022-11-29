import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebase_config = {
    apiKey: 'AIzaSyD-_hE68aD0vX_WHGuODFGteln--5ZNHzI',
    authDomain: "weighty-opus-333311.firebaseapp.com",
    databaseURL: "https://weighty-opus-333311-default-rtdb.firebaseio.com",
    projectId: "weighty-opus-333311",
    storageBucket: "weighty-opus-333311.appspot.com",
    messagingSenderId: "572378838232",
    appId: "1:572378838232:web:d3aa88423351c67dcb13ad", 
    measurementId: "G-70C9YW0J9H"
}

const app = firebase.initializeApp(firebase_config);
export const db = getFirestore(app);

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        if (!auth.currentUser) {
            await auth.signInWithEmailAndPassword(email, password);
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const sendPasswordReset = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const logout = () => {
    auth.signOut(auth);
};