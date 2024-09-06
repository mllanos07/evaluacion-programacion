import React from 'react';
import './App.css';
import UserList from "./components/UserList.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <UserList />
    </div>
  );
}

export default App;
