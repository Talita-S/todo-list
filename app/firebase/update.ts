import { collection, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { TodoItemProps } from "../todo/TodoItem";

const todosCollection = collection(FIREBASE_DB, "todos");

export async function updateTodoTask(
  docId: string,
  updatedData: Partial<TodoItemProps>
) {
  const todoRef = doc(todosCollection, docId);
  await updateDoc(todoRef, updatedData);
}
