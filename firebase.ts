import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyD2UMTrGhKFLvjQHR24wW-dswEjVBTni1Y",
  authDomain: "pr-comp-react-tasks.firebaseapp.com",
  projectId: "pr-comp-react-tasks",
  storageBucket: "pr-comp-react-tasks.firebasestorage.app",
  messagingSenderId: "405544617494",
  appId: "1:405544617494:web:eb149ed5144f4652059737"
};

export const firebase = initializeApp(firebaseConfig);
