import { useState } from "react";
import Item from "./component/List/Item.component";

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
export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearlist,
}) {
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
