import { Stack } from "expo-router";
import { ShoppingProvider } from "../context/ShoppingContext";

export default function RootLayout() {
  return (
    // Provider udostępnia globalny stan listy zakupów
    // wszystkim ekranom aplikacji.
    <ShoppingProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ShoppingProvider>
  );
}
