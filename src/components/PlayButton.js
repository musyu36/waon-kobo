import React from "react";
import "../styles/PlayButton.css";
import Triangle from "./Triangle";

const PlayButton = ({ playChords }) => {
  return (
    <div className="play-button">
      <button
        className="btn-play-chords"
        variant="outlined"
        onClick={playChords}
      >
        <Triangle />
      </button>
    </div>
  );
};

export default PlayButton;
