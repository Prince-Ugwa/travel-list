import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Jackets", quantity: 24, packed: false },
  { id: 4, description: "Hats", quantity: 12, packed: false },
];

export default function App() {
  //state add new item to the array, we need the sate update also in the packing list so we need to state up to the closest common comoponent.
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} />
      <Stat />
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
function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.ids} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stat() {
  return (
    <footer className="stats">
      <em>You have x items on your list and you have packed x (x%)</em>
    </footer>
  );
}
