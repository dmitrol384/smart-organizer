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
  const [list, setList] = useState<string[]>([]);

  const addItem = () => {
    if (!item.trim()) return;

    setList([...list, item]);
    setItem("");
  };

  const removeItem = (index: number) => {
    const newList = list.filter((_, i) => i !== index);
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
          <TouchableOpacity onPress={() => removeItem(index)}>
            <Text style={{ padding: 10, fontSize: 18 }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
