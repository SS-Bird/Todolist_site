// src/components/ListCard.jsx
import { useNavigate } from "react-router-dom";

function ListCard({ list }) {
  const navigate = useNavigate();

  return (
    <div
      className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
      onClick={() => navigate(`/lists/${list.id}`)}
    >
      <h2 className="font-bold">{list.name}</h2>
      <p>{list.tasks?.length || 0} top-level tasks</p>
    </div>
  );
}

export default ListCard;