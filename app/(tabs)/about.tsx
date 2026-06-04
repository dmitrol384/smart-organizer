import { Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>O aplikacji</Text>

      <Text>
        Smart Organizer to aplikacja umożliwiająca tworzenie i zarządzanie listą
        zakupów. Dane są przechowywane lokalnie przy użyciu AsyncStorage.
      </Text>
    </View>
  );
}
