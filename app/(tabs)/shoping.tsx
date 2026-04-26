import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function ShoppingScreen() {
  const [item, setItem] = useState('');
  const [list, setList] = useState<string[]>([]);

  const addItem = () => {
    if (!item.trim()) return;

    setList([...list, item]);
    setItem('');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>
        Lista zakupów
      </Text>

      <TextInput
        placeholder="Dodaj produkt"
        value={item}
        onChangeText={setItem}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Button title="Dodaj" onPress={addItem} />

      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 10, fontSize: 18 }}>
            • {item}
          </Text>
        )}
      />
    </View>
  );
}