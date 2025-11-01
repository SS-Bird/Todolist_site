// src/components/Breadcrumbs.jsx
import { Link } from "react-router-dom";

function Breadcrumbs({ path = [] }) {
  return (
    <nav className="text-sm mb-4">
      {path.map((p, i) => (
        <span key={i}>
          <Link to={p.link} className="text-blue-600 underline">
            {p.label}
          </Link>
          {i < path.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;