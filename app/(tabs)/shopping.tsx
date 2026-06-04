import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import ShoppingItem from "../../components/ShoppingItem";
import { useShopping } from "../../context/ShoppingContext";

export default function ShoppingScreen() {
  const [editingText, setEditingText] = useState("");
  const { list, removeProduct, toggleProduct, editProduct } = useShopping();
  // Przechowujemy aktualnie edytowany element.
  // Pozwala to wyświetlić pole edycji tylko dla jednej pozycji listy.
  const [editingItem, setEditingItem] = useState<{
    id: string;
    name: string;
    done: boolean;
  } | null>(null);

  // Tryb sortowania zmienia sposób wyświetlania danych
  // bez modyfikowania listy zapisanej w pamięci.
  const [sortMode, setSortMode] = useState<"default" | "asc" | "desc">(
    "default",
  );
  // Przełączamy sposób prezentacji danych.
  // Sortowanie nie zmienia zapisanej listy, a jedynie kolejność wyświetlania.
  const toggleSort = () => {
    setSortMode((prev) => {
      if (prev === "default") return "asc";
      if (prev === "asc") return "desc";
      return "default";
    });
  };

  const toggleItem = (itemToToggle: {
    id: string;
    name: string;
    done: boolean;
  }) => {
    Haptics.selectionAsync();

    toggleProduct(itemToToggle);
  };

  const removeItem = async (itemToRemove: {
    id: string;
    name: string;
    done: boolean;
  }) => {
    // Wibracja informuje użytkownika o usunięciu elementu.
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    removeProduct(itemToRemove);
  };
  // Rozpoczynamy edycję wybranego produktu.
  // Zapamiętujemy element oraz jego aktualną nazwę.
  const startEditing = (item: { id: string; name: string; done: boolean }) => {
    setEditingItem(item);
    setEditingText(item.name);
  };
  // Zapisujemy zmodyfikowaną nazwę produktu
  // i kończymy tryb edycji.
  const saveEdit = () => {
    if (!editingText.trim() || !editingItem) return;

    editProduct(editingItem, editingText.trim());

    setEditingItem(null);
    setEditingText("");
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
        <Text style={{ fontSize: 24 }}>{"Sortowanie"}</Text>

        {/* Ikona sortowania  */}
        <TouchableOpacity onPress={toggleSort}>
          <FontAwesome name="sort" size={24} color="black" />
        </TouchableOpacity>
      </View>

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShoppingItem
            item={item}
            isEditing={editingItem?.id === item.id}
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
