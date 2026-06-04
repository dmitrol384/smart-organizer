import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function AddProductScreen() {
  const [name, setName] = useState("");
  // Zapisujemy nowy produkt w pamięci urządzenia.
  // Dzięki temu ekran listy może odczytać go po powrocie.
  const saveProduct = async () => {
    if (!name.trim()) return;

    try {
      const data = await AsyncStorage.getItem("shoppingList");

      const currentList = data ? JSON.parse(data) : [];

      const updatedList = [{ name, done: false }, ...currentList];

      await AsyncStorage.setItem("shoppingList", JSON.stringify(updatedList));

      router.back();
    } catch (e) {
      console.log("Błąd zapisu", e);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Dodawanie produktu</Text>

      <TextInput
        placeholder="Nazwa produktu"
        value={name}
        onChangeText={setName}
      />

      <Button title="Dodaj produkt" onPress={saveProduct} />
    </View>
  );
}
