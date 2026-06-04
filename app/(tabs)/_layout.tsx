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
        }}
      />

      <Tabs.Screen
        name="add-product"
        options={{
          title: "Dodaj Produkt",
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "O aplikacji",
        }}
      />
    </Tabs>
  );
}
