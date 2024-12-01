import { Timestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { DataContext } from "../utils/Context";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export interface TodoItemProps {
  createdAt?: Timestamp;
  completedAt?: Timestamp | string;
  docId: string;
  todo: string;
  comment: string;
  status: string;
  id: string;
}

export default function TodoItem({ data }: { data: TodoItemProps }) {
  const { todo, comment, status, docId } = data;
  const [currentStatus, setCurrentStatus] = useState(status);

  const { tasks, setTasks } = useContext(DataContext);

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.row}>
        <Text style={styles.todo}>{todo}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  todo: {},
});
