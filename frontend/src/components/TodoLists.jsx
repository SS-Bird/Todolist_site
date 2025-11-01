// src/components/TodoLists.jsx
import { useEffect, useState } from "react";
import { getLists, addList } from "../api";
import ListCard from "./ListCard";
import AddButton from "./AddButton";

function TodoLists({ user }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (!user) return;

    async function fetchLists() {
      try {
        const data = await getLists();
        setLists(data);
      } catch (err) {
        console.error("Failed to fetch lists:", err);
      }
    }

    fetchLists();
  }, [user]);

  async function handleAddList() {
    const name = prompt("Enter new list name:");
    if (!name) return;
    try {
      const newList = await addList(name);
      setLists((prev) => [...prev, newList]);
    } catch (err) {
      console.error("Failed to add list:", err);
    }
  }

  if (!user) return null;

  return (
    <div className="flex gap-4 flex-wrap">
      {lists.map((list) => (
        <ListCard key={list.id} list={list} />
      ))}
      <AddButton onClick={handleAddList} label="+ Add List" />
    </div>
  );
}

export default TodoLists;