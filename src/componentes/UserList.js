import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList( {onDelete, userData} ) {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });
  const handleChange = event => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleDelete = id => {
    axios
      .delete(`http://localhost:3000/usuarios/${id}`)
      .then(function (response) {
        console.log(`Se borró el usuario con el id: ${id}`);
        onDelete();
      })
      .catch(function (error) {
        console.log("No se pudo borrar", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error("error al buscar usuario:", error));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/users", newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({
          name: "",
          email: "",
        });
      })
      .catch(error => console.error("Error adding user:", error));
  };
    
  
    const search = (event) => {
      setText(event.target.value);
    };
  
    const filteredUsers = userData.filter((user) =>
      user.nombre.toLowerCase().startsWith(text.toLowerCase())
    );
  

  return (
    <div>
        <div>
      <input onChange={search} value={text} placeholder="Buscar" />
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <li key={user.id}>{user.nombre}</li>)) : (<p>Sin Resultados</p>)}
      </ul>
    </div>
      <h2>Lista de Usuarios</h2>
      <table>
        <head>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </head>
        <body>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </body>
      </table>

      <h3>Añadir Usuario</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleChange}
          nombre="Nombre"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          email="Email"
        />
        <button onClick={handleSubmit}>Añadir</button>
      </form>
    </div>
  );
}
export default UserList;
