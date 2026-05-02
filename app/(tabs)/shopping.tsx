import { AntDesign, FontAwesome } from "@expo/vector-icons";
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
  const [list, setList] = useState<{ name: string; done: boolean }[]>([]);

  const addItem = () => {
    if (!item.trim()) return;

    setList([...list, { name: item, done: false }]);
    setItem("");
  };

  const toggleItem = (index: number) => {
    const newList = [...list];
    newList[index].done = !newList[index].done;
    setList(newList);
  };

  const removeItem = (index: number) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  return (
    <View style={{ padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 24 }}>Lista zakupów</Text>

        {/* Ikona sortowania - na razie bez logiki */}
        <FontAwesome name="sort" size={24} color="black" />
      </View>

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
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
            }}
          >
            <TouchableOpacity onPress={() => toggleItem(index)}>
              <Text
                style={{
                  fontSize: 18,
                  textDecorationLine: item.done ? "line-through" : "none",
                  color: item.done ? "gray" : "black",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removeItem(index)}>
              <AntDesign name="close-circle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
