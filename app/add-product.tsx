import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function AddProductScreen() {
  const [name, setName] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Dodawanie produktu</Text>

      <TextInput
        placeholder="Nazwa produktu"
        value={name}
        onChangeText={setName}
      />

      <Button title="Powrót" onPress={() => router.back()} />
    </View>
  );
}
