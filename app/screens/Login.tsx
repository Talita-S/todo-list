import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";

import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error(error);
      alert("Falha ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Cadastro realizado com sucesso!");
    } catch (error: any) {
      console.error(error);
      alert("Falha ao fazer cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text variant="displaySmall" style={styles.title}>
          Todo List
        </Text>

        <TextInput
          style={styles.input}
          mode="outlined"
          activeOutlineColor="#000"
          value={email}
          label="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          activeOutlineColor="#000"
          value={password}
          label="Senha"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <HelperText type="info">
          A senha deve conter pelo menos 6 caracteres
        </HelperText>

        {loading ? (
          <ActivityIndicator size="large" color="#333" />
        ) : (
          <>
            <Button
              style={{ marginTop: 20, marginBottom: 20 }}
              mode="contained"
              buttonColor="#000"
              children="Entrar"
              onPress={signIn}
            ></Button>
            <Button
              mode="outlined"
              textColor="#000"
              children="Criar conta"
              onPress={signUp}
            ></Button>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    marginVertical: 20,
  },
  input: {
    marginVertical: 10,
  },
});
