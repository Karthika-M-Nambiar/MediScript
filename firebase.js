// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

export const firebaseConfig = {
  apiKey: "AIzaSyAJ_hdNLzlGro8SQAQQT-hKJYWS8LuUVwU",
  authDomain: "mediscript-6cb21.firebaseapp.com",
  projectId: "mediscript-6cb21",
  storageBucket: "mediscript-6cb21.firebasestorage.app",
  messagingSenderId: "512317598152",
  appId: "1:512317598152:web:322560e2b9a47bfeff38fd"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Export auth so login.js and register.js can use it
const db = getFirestore(app);

const storage = getStorage(app);

export { auth, db, storage };

