import { fireEvent, render } from "@testing-library/react-native";
import ShoppingItem from "../components/ShoppingItem";

describe("ShoppingItem", () => {
  it("wyświetla nazwę produktu", () => {
    const { getByText } = render(
      <ShoppingItem
        item={{
          id: "1",
          name: "Mleko",
          done: false,
        }}
        isEditing={false}
        editingText=""
        onChangeEditingText={() => {}}
        onToggle={() => {}}
        onDelete={() => {}}
        onStartEdit={() => {}}
        onSaveEdit={() => {}}
      />,
    );

    expect(getByText("Mleko")).toBeTruthy();
  });
});

it("pokazuje TextInput podczas edycji", () => {
  const { getByDisplayValue } = render(
    <ShoppingItem
      item={{
        id: "1",
        name: "Mleko",
        done: false,
      }}
      isEditing={true}
      editingText="Mleko"
      onChangeEditingText={() => {}}
      onToggle={() => {}}
      onDelete={() => {}}
      onStartEdit={() => {}}
      onSaveEdit={() => {}}
    />,
  );

  expect(getByDisplayValue("Mleko")).toBeTruthy();
});

it("wywołuje onToggle po kliknięciu", () => {
  const onToggle = jest.fn();

  const { getByText } = render(
    <ShoppingItem
      item={{
        id: "1",
        name: "Mleko",
        done: false,
      }}
      isEditing={false}
      editingText=""
      onChangeEditingText={() => {}}
      onToggle={onToggle}
      onDelete={() => {}}
      onStartEdit={() => {}}
      onSaveEdit={() => {}}
    />,
  );

  fireEvent.press(getByText("Mleko"));

  expect(onToggle).toHaveBeenCalled();
});
it("wyświetla przekazaną nazwę produktu", () => {
  const { getByText } = render(
    <ShoppingItem
      item={{ id: "1", name: "Chleb", done: false }}
      isEditing={false}
      editingText=""
      onChangeEditingText={() => {}}
      onToggle={() => {}}
      onDelete={() => {}}
      onStartEdit={() => {}}
      onSaveEdit={() => {}}
    />,
  );

  expect(getByText("Chleb")).toBeTruthy();
});

it("wywołuje onStartEdit po długim przytrzymaniu", () => {
  const onStartEdit = jest.fn();

  const { getByText } = render(
    <ShoppingItem
      item={{ id: "1", name: "Mleko", done: false }}
      isEditing={false}
      editingText=""
      onChangeEditingText={() => {}}
      onToggle={() => {}}
      onDelete={() => {}}
      onStartEdit={onStartEdit}
      onSaveEdit={() => {}}
    />,
  );

  fireEvent(getByText("Mleko"), "longPress");

  expect(onStartEdit).toHaveBeenCalled();
});
