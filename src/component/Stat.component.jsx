export default function Stat({ items }) {
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
