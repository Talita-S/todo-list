import { addDoc, collection, Timestamp } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

interface ITodoItem {
  id: string;
  todo: string;
  comment: string;
  status: string;
}

const todosCollection = collection(FIREBASE_DB, "todos");

export async function createTodoTask(data: ITodoItem) {
  const dbData = {
    createdAt: Timestamp.now(),
    completedAt: "",
    ...data,
  };
  return await addDoc(todosCollection, dbData);
}
