import React from "react";
import "../styles/PlayButtonPushed.css";

import Triangle from "./Triangle";

const PlayButtonPushed = () => {
  return (
    <div className="play-button-pushed">
      <button className="btn-play-chords-pushed" variant="outlined">
        <Triangle />
      </button>
    </div>
  );
};

export default PlayButtonPushed;
