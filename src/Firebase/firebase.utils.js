import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const Config = {
  apiKey: "AIzaSyCTvUu5YdbMQiO7THWvNiWe4gpPF7K-NcU",
  authDomain: "treinaflix-app-d3190.firebaseapp.com",
  databaseURL: "https://treinaflix-app-d3190.firebaseio.com",
  projectId: "treinaflix-app-d3190",
  storageBucket: "",
  messagingSenderId: "9603818471",
  appId: "1:9603818471:web:a04a9774525bf9f13e5342",
};

export const CreateUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log(`${error} User Can't be registered`);
    }
  }
  return userRef;
};

firebase.initializeApp(Config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
