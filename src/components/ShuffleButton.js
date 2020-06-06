import React from "react";
import "../styles/ShuffleButton.css";
import ShuffleIcon from "./ShuffleIcon";

const ShuffleButton = () => {
  return (
    <div className="shuffle-button">
      <button className="btn-shuffle-chords" variant="outlined">
        <ShuffleIcon />
      </button>
    </div>
  );
};

export default ShuffleButton;
