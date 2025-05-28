import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";

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

  // Додаємо метод для збереження типу користувача
  static async saveUserType(uid, type) {
    try {
      await setDoc(doc(db, "users", uid), { type }, { merge: true });
    } catch (error) {
      console.error("Error saving user type:", error.message);
      throw new Error(error.message);
    }
  }

  // Додаємо метод для отримання типу користувача
  static async getUserType(uid) {
    try {
      const docSnap = await getDoc(doc(db, "users", uid));
      if (docSnap.exists()) {
        return docSnap.data().type;
      }
      return "user";
    } catch (error) {
      console.error("Error getting user type:", error.message);
      return "user";
    }
  }
}

export default FirebaseService;