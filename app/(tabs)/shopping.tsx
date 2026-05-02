import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
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

  const [isLoaded, setIsLoaded] = useState(false);

  //Zapisujemy listę za każdym razem, gdy coś się zmienia
  // AsyncStorage działa jak lokalna baza danych na urządzeniu
  // Zapisujemy dane, żeby użytkownik nie stracił listy po zamknięciu aplikacji
  useEffect(() => {
    if (!isLoaded) return;
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("shoppingList", JSON.stringify(list));
        console.log("ZAPIS:", list);
      } catch (e) {
        console.log("Błąd zapisu", e);
      }
    };

    saveData();
  }, [list, isLoaded]);

  // Wczytujemy dane przy starcie aplikacji
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem("shoppingList");
        console.log("ODCZYT:", data);
        if (data !== null) {
          setList(JSON.parse(data));
        }
        setIsLoaded(true);
      } catch (e) {
        console.log("Błąd odczytu", e);
      }
    };

    loadData();
  }, []);

  // Zmieniamy po obiekcie, nie po indeksie
  const toggleItem = (itemToToggle: { name: string; done: boolean }) => {
    const newList = list.map((item) =>
      item === itemToToggle ? { ...item, done: !item.done } : item,
    );

    setList(newList);
  };

  const removeItem = (itemToRemove: { name: string; done: boolean }) => {
    const newList = list.filter((item) => item !== itemToRemove);
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
        data={[
          // Najpierw niekupione (na górze)
          ...list.filter((item) => !item.done),

          // Potem kupione (na dole)
          ...list.filter((item) => item.done),
        ]}
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
            <TouchableOpacity onPress={() => toggleItem(item)}>
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

            <TouchableOpacity onPress={() => removeItem(item)}>
              <AntDesign name="close-circle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
