import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { updateTodoTask } from "../firebase/update";

interface EditTodoProps {
  route: RouteProp<any, any>;
  navigation: any;
}

const EditTodo = ({ route, navigation }: EditTodoProps) => {
  const { todo, docId, status, comment } = route.params as {
    todo: string;
    docId: string;
    status: string;
    comment: string;
  };
  const [updatedTodo, setUpdatedTodo] = useState(todo);
  const [updatedStatus, setUpdatedStatus] = useState(status);
  const [updatedComment, setUpdatedComment] = useState(comment);

  async function saveChanges() {
    try {
      await updateTodoTask(docId, {
        todo: updatedTodo,
        status: updatedStatus,
        comment: updatedComment,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={updatedTodo}
        onChangeText={setUpdatedTodo}
        placeholder="Tarefa"
      />
      <TextInput
        style={styles.input}
        value={updatedStatus}
        onChangeText={setUpdatedStatus}
        placeholder="Status"
      />
      <TextInput
        style={styles.input}
        value={updatedComment}
        onChangeText={setUpdatedComment}
        placeholder="Comentário"
      />
      <Button mode="contained" onPress={saveChanges}>
        Salvar
      </Button>
    </View>
  );
};

export default EditTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
  },
});
