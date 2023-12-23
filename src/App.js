import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching Todo List
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setTodos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        userId: 1,
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const editTodo = (id, editedTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editedTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filteredSuggestions = todos.filter((todo) =>
      todo.title.toLowerCase().includes(term.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <div className="app">
      <h1 className="header">Todo App</h1>

      {/* Add Todo */}
      <div className="add-todo">
        <input
          type="text"
          className="input"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="button" onClick={addTodo}>
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <div className="todo-list">
        <h2 className="list-header">Todo List</h2>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <ul className="todo-items">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <span className="todo-title">{todo.title}</span>
                <button
                  className="edit-button"
                  onClick={() =>
                    editTodo(todo.id, prompt("Enter new title:", todo.title))
                  }
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search and Suggestions */}
      <div>
        <input
          type="text"
          className="search-input"
          placeholder="Search todos"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul className="suggestions-list">
          {suggestions.map((todo) => (
            <li key={todo.id} className="suggestion">
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
