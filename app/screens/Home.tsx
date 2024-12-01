import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Button, Icon, Text } from "react-native-paper";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { createTodoTask } from "../firebase/create";
import { fetchTodos } from "../firebase/read";
import TodoItem, { TodoItemProps } from "../todo/TodoItem";
import EmptyList from "../todo/EmptyList";
import { useFocusEffect } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

const Home = () => {
  const user = getAuth(FIREBASE_APP).currentUser;
  const [tasks, setTasks] = useState<TodoItemProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  async function addTodo() {
    if (todo.length < 3) {
      return;
    }

    try {
      if (user) {
        setLoading(true);
        const addedTask = await createTodoTask({
          todo,
          id: user.uid,
          status: "Pendente",
          comment: "",
        });

        const todoItem = {
          status: "Pendente",
          todo,
          comment: "",
          id: user?.uid,
          docId: addedTask.id,
        };
        setTasks((tasks) => [...tasks, todoItem]);
        setTodo("");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  async function getTodos() {
    if (user) {
      const result = await fetchTodos(user.uid);
      const todos: TodoItemProps[] = result.docs.map((d) => ({
        docId: d.id,
        ...d.data(),
      })) as TodoItemProps[];
      setTasks(todos);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getTodos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.newTodoContainer}>
        <TextInput
          maxLength={40}
          style={styles.textInput}
          value={todo}
          placeholder="Vamos adicionar algo novo..."
          onChangeText={(text) => setTodo(text)}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={addTodo}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator animating={loading} color={"white"} />
          ) : (
            <Icon source="plus" size={30} color="white" />
          )}
        </TouchableOpacity>
      </View>

      <Text variant="bodyLarge" style={{ fontWeight: "700" }}>
        Filtre por status
      </Text>

      <View style={styles.filterBtnGroup}>
        <Button
          children="Todas"
          mode="contained"
          buttonColor="#989494"
          textColor="#000"
          compact
          style={styles.filterBtn}
          onPress={() => setSelectedStatus("")}
        />
        <Button
          children="Pendente"
          mode="contained"
          buttonColor="#DDB771"
          textColor="#000"
          compact
          style={styles.filterBtn}
          onPress={() => setSelectedStatus("Pendente")}
        />
        <Button
          children="Em andamento"
          mode="contained"
          buttonColor="#778DA9"
          textColor="#000"
          compact
          style={styles.filterBtn}
          onPress={() => setSelectedStatus("Em andamento")}
        />
        <Button
          children="Concluída"
          mode="contained"
          buttonColor="#6BBF59"
          textColor="#000"
          compact
          style={styles.filterBtn}
          onPress={() => setSelectedStatus("Concluída")}
        />
      </View>

      <FlatList
        data={
          selectedStatus?.length > 0
            ? tasks.filter((t) => t.status === selectedStatus)
            : tasks
        }
        renderItem={({ item }) => (
          <TodoItem data={item} key={item.docId} onDelete={() => getTodos()} />
        )}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  newTodoContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    borderColor: "#888",
    borderWidth: 0.5,
    borderRadius: 5,
    width: "80%",
    height: 45,
    padding: 10,
  },
  addBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    height: 45,
    width: "18%",
    borderRadius: 8,
    marginLeft: 5,
  },
  filterBtnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  filterBtn: {
    borderRadius: 5,
  },
  content: {
    marginTop: 15,
    paddingBottom: 40,
  },
});
