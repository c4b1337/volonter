import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const saveUserData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    throw new Error(error.message);
  }
};