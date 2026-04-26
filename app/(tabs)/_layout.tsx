import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="shopping" options={{ title: 'Zakupy' }} />
      <Tabs.Screen name="todo" options={{ title: 'Todo' }} />
      <Tabs.Screen name="notes" options={{ title: 'Notatki' }} />
    </Tabs>
  );
}