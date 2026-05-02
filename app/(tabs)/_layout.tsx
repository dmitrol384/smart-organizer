import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    // Używamy Tabs do stworzenia głównej nawigacji aplikacji
    <Tabs>
      <Tabs.Screen name="shopping" options={{ title: "Zakupy" }} />
    </Tabs>
  );
}
