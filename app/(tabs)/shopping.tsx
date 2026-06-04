import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import ShoppingItem from "../../components/ShoppingItem";

export default function ShoppingScreen() {
  const [editingText, setEditingText] = useState("");
  const [editingItem, setEditingItem] = useState<{
    name: string;
    done: boolean;
  } | null>(null);
  const [list, setList] = useState<{ name: string; done: boolean }[]>([]);
  // 3 tryby sortowania: default, A-Z, Z-A
  const [sortMode, setSortMode] = useState<"default" | "asc" | "desc">(
    "default",
  );
  // Klik ikony zmienia tryb sortowania
  const toggleSort = () => {
    setSortMode((prev) => {
      if (prev === "default") return "asc";
      if (prev === "asc") return "desc";
      return "default";
    });
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

  const startEditing = (item: { name: string; done: boolean }) => {
    setEditingItem(item);
    setEditingText(item.name);
  };
  const saveEdit = () => {
    if (!editingText.trim() || !editingItem) return;

    const newList = list.map((item) =>
      item === editingItem ? { ...item, name: editingText } : item,
    );

    setList(newList);
    setEditingItem(null);
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
        <Text style={{ fontSize: 24 }}>{"Lista zakupów"}</Text>

        {/* Ikona sortowania  */}
        <TouchableOpacity onPress={toggleSort}>
          <FontAwesome name="sort" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Button
        title="Nowy produkt"
        onPress={() => router.push("/add-product" as const)}
      />

      <FlatList
        data={
          sortMode === "asc"
            ? [...list].sort((a, b) =>
                a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
              )
            : sortMode === "desc"
              ? [...list].sort((a, b) =>
                  b.name.toLowerCase().localeCompare(a.name.toLowerCase()),
                )
              : [
                  // Najpierw niekupione (na górze)
                  ...list.filter((item) => !item.done),

                  // Potem kupione (na dole)
                  ...list.filter((item) => item.done),
                ]
        }
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ShoppingItem
            item={item}
            isEditing={editingItem === item}
            editingText={editingText}
            onChangeEditingText={setEditingText}
            onToggle={() => toggleItem(item)}
            onDelete={() => removeItem(item)}
            onStartEdit={() => startEditing(item)}
            onSaveEdit={saveEdit}
          />
        )}
      />
    </View>
  );
}
