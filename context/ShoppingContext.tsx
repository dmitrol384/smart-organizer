import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ShoppingItem = {
  name: string;
  done: boolean;
};

type ShoppingContextType = {
  list: ShoppingItem[];
  addProduct: (name: string) => void;
  removeProduct: (item: ShoppingItem) => void;
  toggleProduct: (item: ShoppingItem) => void;
  editProduct: (item: ShoppingItem, newName: string) => void;
};

const ShoppingContext = createContext<ShoppingContextType | null>(null);

export function ShoppingProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<ShoppingItem[]>([]);

  // Wczytujemy dane przy uruchomieniu aplikacji.
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem("shoppingList");

        if (data) {
          setList(JSON.parse(data));
        }
      } catch (e) {
        console.log("Błąd odczytu", e);
      }
    };

    loadData();
  }, []);

  // Zapisujemy dane po każdej zmianie listy.
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("shoppingList", JSON.stringify(list));
      } catch (e) {
        console.log("Błąd zapisu", e);
      }
    };

    saveData();
  }, [list]);

  const addProduct = (name: string) => {
    setList((prev) => [{ name, done: false }, ...prev]);
  };

  const removeProduct = (itemToRemove: ShoppingItem) => {
    setList((prev) => prev.filter((item) => item !== itemToRemove));
  };

  const toggleProduct = (itemToToggle: ShoppingItem) => {
    setList((prev) =>
      prev.map((item) =>
        item === itemToToggle ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const editProduct = (itemToEdit: ShoppingItem, newName: string) => {
    setList((prev) =>
      prev.map((item) =>
        item === itemToEdit ? { ...item, name: newName } : item,
      ),
    );
  };

  return (
    <ShoppingContext.Provider
      value={{
        list,
        addProduct,
        removeProduct,
        toggleProduct,
        editProduct,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShopping() {
  const context = useContext(ShoppingContext);

  if (!context) {
    throw new Error("useShopping musi być używany wewnątrz ShoppingProvider");
  }

  return context;
}
