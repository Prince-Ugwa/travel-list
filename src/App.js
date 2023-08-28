import { useState } from "react";

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

function Logo() {
  return (
    <div>
      {" "}
      <h1> 🌴Far away 💼</h1>
    </div>
  );
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // //this state add new item to the array, we need the sate update also in the packing list so we need to state up to the closest common comoponent.
  // const [items, setItems] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  function handleChange(e) {
    setQuantity(+e.target.value);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want for your 🥰 trip?</h3>
      <select value={quantity} onChange={handleChange}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="item...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

// function PackingList() {
//   return (
//     <div className="list">
//       <ul>
//         {initialItems.map((item) => (
//           <Item item={item} key={item.id} />
//         ))}
//       </ul>
//     </div>
//   );
// }

//updated
function PackingList({ items, onDeleteItem, onToggleItem, onClearlist }) {
  ///////////////////////////////
  //sorting method on the packing list
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => +a.packed - +b.packed);

  ///////////////////////////////////////////

  return (
    <div className="list">
      <ul>
        {/*items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))*/}

        {/*maping using the sort items  */}
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input"> sort by input</option>
          <option value="description"> sort by description</option>
          <option value="packed"> sort by packed status</option>
        </select>

        <button onClick={onClearlist}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stat({ items }) {
  if (items.length === 0)
    return (
      <p className="stats">
        <em> Start adding to your packing list 🚀</em>
      </p>
    );

  ////only if an item exits then the following operation will work else it will be ignored

  const numItems = items.length;
  const numPackedItem = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPackedItem / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? (
          "You got everything ready to go! ✈"
        ) : (
          <em>
            You have {numItems} items on your list and you have packed{" "}
            {numPackedItem} ({percentage}%)
          </em>
        )}
      </em>
    </footer>
  );
}
