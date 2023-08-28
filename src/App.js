import { useState } from "react";

import Logo from "./component/Logo.component";

import Form from "./Form.component";

import PackingList from "./PackingList.component";
import Stat from "./component/Stat.component";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Jackets", quantity: 24, packed: false },
//   { id: 4, description: "Hats", quantity: 12, packed: false },
// ];

export default function App() {
  //state add new item to the array, we need the sate update also in the packing list so we need to state up to the closest common comoponent.
  const [items, setItems] = useState([]);
  // console.log(items);

  //the handleadditems adds item to the item array base on the current item
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // delete item from items array base on the current items when the item.id is not the id
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  //handele the toggle input
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirm = window.confirm(
      "Warning ⛔ You're about to clear all your packing list."
    );
    if (confirm) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearlist={handleClearList}
      />
      <Stat items={items} />
    </div>
  );
}
