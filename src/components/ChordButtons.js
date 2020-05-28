import React from "react";
import "../styles/ChordButtons.css";
import ButtonSet from "./ButtonSet.js";

const ChordButtons = () => {
  return (
    <div className="chord-buttons">
      <ButtonSet />
      <ButtonSet />
      <ButtonSet />
      <ButtonSet />
    </div>
  );
};

export default ChordButtons;
