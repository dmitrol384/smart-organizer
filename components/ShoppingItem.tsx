import { AntDesign } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity } from "react-native";

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

      <TouchableOpacity onPress={onDelete}>
        <AntDesign name="close-circle" size={24} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
