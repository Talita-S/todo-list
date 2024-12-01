import { collection, deleteDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

const todosCollection = collection(FIREBASE_DB, "todos");

export async function deleteTodoItem(docId: string) {
  const docRef = doc(todosCollection, docId);
  return await deleteDoc(docRef);
}
