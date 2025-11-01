// src/components/AddButton.jsx
function AddButton({ onClick, label = "+" }) {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {label}
    </button>
  );
}

export default AddButton;