import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Prosta walidacja demonstracyjna
    if (!login.trim() || !password.trim()) {
      return;
    }

    router.replace("/(tabs)/shopping");
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 28, marginBottom: 20 }}>Smart Organizer</Text>

      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 8,
        }}
      />

      <Button title="Zaloguj" onPress={handleLogin} />
    </View>
  );
}
