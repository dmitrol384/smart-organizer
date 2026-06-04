import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { ShoppingProvider, useShopping } from "../context/ShoppingContext";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

function TestComponent() {
  const { list, addProduct, removeProduct, toggleProduct, editProduct } =
    useShopping();

  return (
    <>
      <Text testID="count">{list.length}</Text>

      <Text testID="add" onPress={() => addProduct("Mleko")}>
        Add
      </Text>

      {list.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}

      {list.length > 0 && (
        <>
          <Text testID="remove" onPress={() => removeProduct(list[0])}>
            Remove
          </Text>

          <Text testID="toggle" onPress={() => toggleProduct(list[0])}>
            Toggle
          </Text>

          <Text testID="edit" onPress={() => editProduct(list[0], "Chleb")}>
            Edit
          </Text>

          <Text testID="done">{list[0].done ? "true" : "false"}</Text>
        </>
      )}
    </>
  );
}

describe("ShoppingContext", () => {
  it("dodaje produkt", () => {
    const { getByTestId, getByText } = render(
      <ShoppingProvider>
        <TestComponent />
      </ShoppingProvider>,
    );

    fireEvent.press(getByTestId("add"));

    expect(getByText("Mleko")).toBeTruthy();
  });

  it("usuwa produkt", () => {
    const { getByTestId, queryByText } = render(
      <ShoppingProvider>
        <TestComponent />
      </ShoppingProvider>,
    );

    fireEvent.press(getByTestId("add"));
    fireEvent.press(getByTestId("remove"));

    expect(queryByText("Mleko")).toBeNull();
  });

  it("zmienia status done", () => {
    const { getByTestId } = render(
      <ShoppingProvider>
        <TestComponent />
      </ShoppingProvider>,
    );

    fireEvent.press(getByTestId("add"));

    expect(getByTestId("done").props.children).toBe("false");

    fireEvent.press(getByTestId("toggle"));

    expect(getByTestId("done").props.children).toBe("true");
  });

  it("edytuje nazwę produktu", () => {
    const { getByTestId, getByText } = render(
      <ShoppingProvider>
        <TestComponent />
      </ShoppingProvider>,
    );

    fireEvent.press(getByTestId("add"));
    fireEvent.press(getByTestId("edit"));

    expect(getByText("Chleb")).toBeTruthy();
  });
});
