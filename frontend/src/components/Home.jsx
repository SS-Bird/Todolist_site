import TodoLists from "./TodoLists";

function Home({ user }) {
  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
        <p>Please log in or sign up to access your todo lists.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <TodoLists user={user} />
    </div>
  );
}

export default Home;