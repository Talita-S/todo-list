import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Divider, MD3Colors, Text } from "react-native-paper";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const List = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoutBtn}>
        <Button
          children="Sair"
          icon="logout"
          textColor={MD3Colors.error50}
          onPress={() => FIREBASE_AUTH.signOut()}
        />
      </View>

      <Text variant="bodyLarge" style={{ fontWeight: "700" }}>
        Filtre por status
      </Text>

      <View style={styles.filterBtnGroup}>
        <Button
          children="Todas"
          mode="contained"
          buttonColor="#989494"
          compact
          style={styles.filterBtn}
        />
        <Button
          children="Pendente"
          mode="contained"
          buttonColor="#DDB771"
          compact
          style={styles.filterBtn}
        />
        <Button
          children="Em andamento"
          mode="contained"
          buttonColor="#778DA9"
          compact
          style={styles.filterBtn}
        />
        <Button
          children="Concluída"
          mode="contained"
          buttonColor="#6BBF59"
          compact
          style={styles.filterBtn}
        />
      </View>

      <Text variant="titleLarge" style={{ marginTop: 20, fontWeight: "bold" }}>
        Tarefas
      </Text>

      <Text variant="titleSmall" style={{ marginTop: 10, fontWeight: "bold" }}>
        Nenhum resultado encontrado
      </Text>
      <Text variant="bodySmall">Que tal adicionar a primeira tarefa?</Text>

      <Divider style={{ marginTop: 10, marginBottom: 20 }} />

      <Button
        children="Adicionar Tarefa"
        mode="contained"
        buttonColor="#000"
        style={{ marginTop: 10, borderRadius: 5 }}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logoutBtn: {
    alignItems: "flex-end",
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
