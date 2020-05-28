import React, { useState } from "react";
import "../styles/AppBody.css";
import ChordButtons from "./ChordButtons.js";
import KeyBoard from "./KeyBoard.js";
import AppContext from "../contexts/AppContext";

const AppBody = () => {
  const [currentKey, setCurrentKey] = useState([]);
  return (
    <AppContext.Provider value={{ currentKey, setCurrentKey }}>
      <ChordButtons />
      <KeyBoard />
    </AppContext.Provider>
  );
};

export default AppBody;
