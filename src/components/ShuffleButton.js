import React from "react";
import "../styles/ShuffleButton.css";
import ShuffleIcon from "./ShuffleIcon";

const ShuffleButton = ({ shuffleChords }) => {
  return (
    <div className="shuffle-button">
      <button
        className="btn-shuffle-chords"
        variant="outlined"
        onClick={shuffleChords}
      >
        <ShuffleIcon />
      </button>
    </div>
  );
};

export default ShuffleButton;
