import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

const todosCollection = collection(FIREBASE_DB, "todos");

export async function fetchTodos(uid: string) {
  const todosQuery = query(todosCollection, where("id", "==", uid));
  return await getDocs(todosQuery);
}
