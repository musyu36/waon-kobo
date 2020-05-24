import React from "react";
import "../styles/App.css";
import AppHeader from "./AppHeader.js";
import AppBody from "./AppBody.js";

const App = () => {
  return (
    <div className="App">
      <AppHeader />
      <AppBody />
    </div>
  );
};

export default App;
