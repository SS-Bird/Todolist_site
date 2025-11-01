// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { getLists, addList } from "../api";
import ListCard from "../components/ListCard";
import AddButton from "../components/AddButton";
import PageTemplate from "./PageTemplate";

function HomePage({ user }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchLists() {
      try {
        const data = await getLists();
        setLists(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
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
      console.error(err);
    }
  }

  if (!user) {
    return (
      <PageTemplate title="Welcome!">
        <p>Please log in or sign up to access your todo lists.</p>
      </PageTemplate>
    );
  }

  // Replace spinner with nothing for now
  if (loading) return null;

  return (
    <PageTemplate
      title="Your Todo Lists"
      breadcrumbs={[{ label: "Home", link: "/" }]}
    >
      <div className="flex gap-4 flex-wrap">
        {lists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
        <AddButton onClick={handleAddList} label="+ Add List" />
      </div>
    </PageTemplate>
  );
}

export default HomePage;