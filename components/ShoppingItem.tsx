import { AntDesign } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity } from "react-native";
// Typ danych przekazywanych do komponentu pojedynczego elementu listy zakupów.
type ShoppingItemProps = {
  item: {
    id: string;
    name: string;
    done: boolean;
  };
  isEditing: boolean;
  editingText: string;
  onChangeEditingText: (text: string) => void;
  onToggle: () => void;
  onDelete: () => void;
  onStartEdit: () => void;
  onSaveEdit: () => void;
};

export default function ShoppingItem({
  item,
  isEditing,
  editingText,
  onChangeEditingText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
}: ShoppingItemProps) {
  return (
    // Kliknięcie zmienia status produktu (kupiony/niekupiony),
    // a dłuższe przytrzymanie uruchamia tryb edycji.
    <TouchableOpacity
      onPress={onToggle}
      onLongPress={onStartEdit}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        marginTop: 3,
        marginBottom: 10,
        backgroundColor: item.done ? "#e0e0e0" : "#f2f2f2",
        borderRadius: 10,
        elevation: 2,
      }}
    >
      {/* W trybie edycji wyświetlamy pole tekstowe do zmiany nazwy produktu. */}
      {isEditing ? (
        <TextInput
          value={editingText}
          onChangeText={onChangeEditingText}
          onBlur={onSaveEdit}
          autoFocus
          style={{
            fontSize: 18,
            flex: 1,
          }}
        />
      ) : (
        /* W normalnym trybie wyświetlamy nazwę produktu. */
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            textDecorationLine: item.done ? "line-through" : "none",
            color: item.done ? "gray" : "black",
            flex: 1,
          }}
        >
          {item.name}
        </Text>
      )}
      {/* Przycisk usuwania produktu z listy zakupów. */}
      <TouchableOpacity onPress={onDelete}>
        <AntDesign name="close-circle" size={24} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
