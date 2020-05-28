import React from "react";
import "../styles/ChordButtons.css";
import ButtonSet from "./ButtonSet.js";
import KeyBoard from "./KeyBoard.js";

const ChordButtons = () => {
  return (
    <>
      <div className="chord-buttons">
        <ButtonSet />
        <ButtonSet />
        <ButtonSet />
        <ButtonSet />
      </div>
      <div className="key-board">
        <KeyBoard />
      </div>
    </>
  );
};

export default ChordButtons;
