import { createContext } from "react";
import { TodoItemProps } from "../todo/TodoItem";

interface DataContextProps {
  tasks: TodoItemProps[];
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

export const DataContext = createContext<DataContextProps>({
  setTasks: () => {},
  tasks: [],
});
