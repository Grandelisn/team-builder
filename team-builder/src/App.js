import React from "react";
import Form from "./Form.js";
import "./App.css";

export default function App() {
  return (
    <div className="App container">
      <div className="form-card">
        <div className="char-page">
          <h1>Legends of Warhammer</h1>
          <h3>World's 53rd Warhammer fanpage</h3>
        </div>
        <Form />
      </div>
    </div>
  );
}
