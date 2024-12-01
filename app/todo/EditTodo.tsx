import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { Text, Button, IconButton } from "react-native-paper";
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
      console.error(error);
    }
  }

  async function cancelChanges() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleSmall" style={styles.title}>
        Tarefa
      </Text>
      <TextInput
        style={styles.input}
        value={updatedTodo}
        onChangeText={setUpdatedTodo}
      />
      <Text variant="titleSmall" style={styles.title}>
        Comentário
      </Text>
      <TextInput
        style={styles.comment}
        value={updatedComment}
        onChangeText={setUpdatedComment}
      />
      <Text variant="titleSmall" style={styles.title}>
        Status
      </Text>
      <Text variant="bodySmall">{updatedStatus}</Text>
      <View style={styles.statusContainer}>
        <IconButton
          icon="clock-outline"
          containerColor="#DDB771"
          style={[
            styles.btnStatus,
            updatedStatus === "Pendente" && styles.selectedStatus,
          ]}
          onPress={() => setUpdatedStatus("Pendente")}
        />
        <IconButton
          icon="dots-horizontal"
          containerColor="#778DA9"
          style={[
            styles.btnStatus,
            updatedStatus === "Em andamento" && styles.selectedStatus,
          ]}
          onPress={() => setUpdatedStatus("Em andamento")}
        />
        <IconButton
          icon="checkbox-outline"
          containerColor="#6BBF59"
          style={[
            styles.btnStatus,
            updatedStatus === "Concluída" && styles.selectedStatus,
          ]}
          onPress={() => setUpdatedStatus("Concluída")}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          mode="outlined"
          textColor="#000"
          onPress={cancelChanges}
          style={{ width: "50%", marginRight: 5 }}
        >
          Cancelar
        </Button>
        <Button
          mode="contained"
          buttonColor="#000"
          onPress={saveChanges}
          style={{ width: "50%" }}
        >
          Salvar
        </Button>
      </View>
    </View>
  );
};

export default EditTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: "bold",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
  },
  comment: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    height: 80,
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  btnStatus: {
    borderRadius: 5,
    width: 80,
  },
  selectedStatus: {
    borderWidth: 1,
    borderColor: "#000",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
});
