import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    // Tabs odpowiadają za główne sekcje aplikacji.
    // Dzięki nim użytkownik może szybko przełączać się między funkcjami.
    <Tabs>
      <Tabs.Screen
        name="shopping"
        options={{
          title: "Lista",
          tabBarIcon: () => <FontAwesome name="list" size={24} color="black" />,
        }}
      />

      <Tabs.Screen
        name="add-product"
        options={{
          title: "Dodaj Produkt",
          tabBarIcon: () => <FontAwesome name="plus" size={24} color="black" />,
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "O aplikacji",
          tabBarIcon: () => (
            <FontAwesome name="info-circle" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
