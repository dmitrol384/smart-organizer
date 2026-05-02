import { useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ShoppingScreen() {
  const [item, setItem] = useState("");
  // Każdy element ma nazwę i status (zrobione/niezrobione)
  const [list, setList] = useState<{ name: string; done: boolean }[]>([]);

  const addItem = () => {
    if (!item.trim()) return;
    // Dodajemy obiekt zamiast samego stringa
    setList([...list, { name: item, done: false }]);
    setItem("");
  };

  //Zmienia status elementu (kupione/niekupione)
  const toggleItem = (index: number) => {
    const newList = [...list];
    // Przełączamy status "done" dla danego elementu
    newList[index].done = !newList[index].done;
    setList(newList);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Lista zakupów</Text>

      <TextInput
        placeholder="Dodaj produkt"
        value={item}
        onChangeText={setItem}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Button title="Dodaj" onPress={addItem} />

      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => toggleItem(index)}>
            <Text
              style={{
                padding: 10,
                fontSize: 18,
                textDecorationLine: item.done ? "line-through" : "none",
                color: item.done ? "gray" : "black",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
