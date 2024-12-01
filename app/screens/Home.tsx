import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Icon,
  IconButton,
  Text,
} from "react-native-paper";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { NavigationProp } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { DataContext } from "../utils/Context";
import { createTodoTask } from "../firebase/create";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
  const user = getAuth(FIREBASE_APP).currentUser;
  const { tasks, setTasks } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState("");

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
        setTasks(() => [todoItem, ...tasks]);
        setTodo("");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

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
        />
        <Button
          children="Pendente"
          mode="contained"
          buttonColor="#DDB771"
          textColor="#000"
          compact
          style={styles.filterBtn}
        />
        <Button
          children="Em andamento"
          mode="contained"
          buttonColor="#778DA9"
          textColor="#000"
          compact
          style={styles.filterBtn}
        />
        <Button
          children="Concluída"
          mode="contained"
          buttonColor="#6BBF59"
          textColor="#000"
          compact
          style={styles.filterBtn}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
});
