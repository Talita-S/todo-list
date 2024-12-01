import { useNavigation } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Divider, Icon } from "react-native-paper";

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
  const { todo, status, docId, comment } = data;
  const navigation = useNavigation<any>();

  const statusColors: { [key: string]: string } = {
    Pendente: "#DDB771",
    "Em andamento": "#778DA9",
    Concluída: "#6BBF59",
  };

  const statusColor = statusColors[status];

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.row}
        onPress={() =>
          navigation.navigate("Editar", { todo, status, docId, comment })
        }
      >
        <View style={styles.icon}>
          {status === "Pendente" ? (
            <Icon source="clock-outline" size={30} />
          ) : status === "Em andamento" ? (
            <Icon source="dots-horizontal" size={30} />
          ) : (
            <Icon source="checkbox-outline" size={30} />
          )}
        </View>

        <View style={styles.container}>
          <Text style={styles.todo}>{todo}</Text>
          <Text style={{ color: statusColor }}>{status}</Text>
        </View>
      </TouchableOpacity>
      <Divider style={{ marginTop: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  todo: {
    fontWeight: "600",
    fontSize: 16,
  },
  icon: {
    padding: 5,
    backgroundColor: "rgba(200, 200, 200, 0.5)",
    borderRadius: 20,
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
});
