import firebase from 'firebase/app';
import { firebaseConfig } from '../../config';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
// const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
// const storage = firebaseApp.storage();

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
  window.location.reload();
};
export const signInWithFacebook = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  await auth.signInWithPopup(provider);
  window.location.reload();
};
export const signInWithTwitter = async () => {
  const provider = new firebase.auth.TwitterAuthProvider();
  await auth.signInWithPopup(provider);
  window.location.reload();
};
export const signInUserWithEmail = async (email, password) => {
  let promise;
  try {
    promise = await auth.signInWithEmailAndPassword(email, password);
  } catch (e) {
    if (e.code === 'auth/wrong-password') {
      return 'incorrectPassword';
    } else if (e.code === 'auth/user-not-found') {
      return 'userNotFound';
    } else if (e.code === '"auth/too-many-requests"') {
      return 'tooManyAttempts';
    }
  }
  window.location.reload();

  return promise;
};
export const createUserWithEmail = async (email, password) => {
  let promise;
  try {
    promise = await auth.createUserWithEmailAndPassword(email, password);
    firebase.auth().onAuthStateChanged((user) => {
      return user;
    });
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return 'userAlreadyExists';
    } else {
      alert(error.message);
    }
  }
  return promise;
};

export const sendResetPassword = async (emailAddress) => {
  try {
    auth.sendPasswordResetEmail(emailAddress).then(() => {
      // Email sent.
      $('#resetPassword').css('display', 'flex');
    });
  } catch (error) {
    alert(error.message);
  }
};

export const signInAnonymously = async () => {
  await firebase.auth().signInAnonymously();
  // firebase.auth().onAuthStateChanged((user) => {

  // });
  window.location.reload();
};

export const signOut = async () => {
  await auth.signOut();
  window.location.reload();
};

export const checkAuth = (cb) => {
  return auth.onAuthStateChanged(cb);
};
