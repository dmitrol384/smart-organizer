import { Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text>
        Smart Organizer to aplikacja umożliwiająca tworzenie i zarządzanie listą
        zakupów. Dane są przechowywane lokalnie przy użyciu AsyncStorage.
      </Text>
    </View>
  );
}
