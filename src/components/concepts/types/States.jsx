import React, { useState, useEffect } from 'react';

export default function States() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(response => response.json())
      .then(data => {
        setTodos(data.todos);   
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setLoading(false);
      });
  }, []);2

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // ✅ Build table rows manually using forEach
  const rows = [];
  todos.forEach(todo => {
    rows.push(
      <tr key={todo.id}>
        <td>{todo.id}</td>
        <td>{todo.todo}</td>
        <td>{todo.completed ? 'Yes' : 'No'}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Todo List</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Todo</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {rows} 
        </tbody>
      </table>
    </div>
  );
}