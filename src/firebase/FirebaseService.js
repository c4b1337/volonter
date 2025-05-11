import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

class FirebaseService {
  static async registerUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error during registration:", error.message);
      throw new Error(error.message);
    }
  }

  static async loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async saveData(collectionName, data) {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log("Document written with ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document:", error.message);
      throw new Error(error.message);
    }
  }
}

export default FirebaseService;