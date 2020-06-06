import React, { useState } from "react";
import "../styles/AppBody.css";
import ChordButtons from "./ChordButtons.js";
import KeyBoard from "./KeyBoard.js";
import AppContext from "../contexts/AppContext";

const AppBody = () => {
  const initialCurrentChords = {
    1: [0, 4, 7],
    2: [0, 4, 7],
    3: [0, 4, 7],
    4: [0, 4, 7],
  };
  const [currentKey, setCurrentKey] = useState([]);
  const [currentChords, setCurrentChords] = useState({
    ...initialCurrentChords,
  });
  return (
    <AppContext.Provider
      value={{ currentKey, setCurrentKey, currentChords, setCurrentChords }}
    >
      <ChordButtons />
      <KeyBoard />
    </AppContext.Provider>
  );
};

export default AppBody;
