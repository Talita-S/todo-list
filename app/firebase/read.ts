import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

const todosCollection = collection(FIREBASE_DB, "todos");

export async function fetchTodos(uid: string, status?: string) {
  let todosQuery = query(todosCollection, where("id", "==", uid));

  if (status) {
    todosQuery = query(todosQuery, where("status", "==", status));
  }

  return await getDocs(todosQuery);
}
