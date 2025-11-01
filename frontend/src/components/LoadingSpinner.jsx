// src/components/LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div className="text-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-2 text-sm text-gray-600">Loading...</p>
    </div>
  );
}