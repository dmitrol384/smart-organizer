import { router } from "@/.expo/types/router";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useShopping } from "../../context/ShoppingContext";

export default function AddProductScreen() {
  const [name, setName] = useState("");
  const { addProduct } = useShopping();
  // Zapisujemy nowy produkt w pamięci urządzenia.
  // Dzięki temu ekran listy może odczytać go po powrocie.
  // Dodajemy produkt do globalnego stanu aplikacji.
  // Context automatycznie zapisze dane do AsyncStorage.
  const saveProduct = async () => {
    if (!name.trim()) return;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    addProduct(name);

    setName("");
    router.back();
  };
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#7c7272",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
      }}
    >
      <TextInput
        placeholder="Nazwa produktu"
        value={name}
        onChangeText={setName}
      />

      <Button title="Dodaj produkt" onPress={saveProduct} />
    </View>
  );
}
