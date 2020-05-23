import React from "react";
import "../styles/ButtonSet.css";
import Button from "@material-ui/core/Button";

import C from "../notes/C.mp3";
import CS from "../notes/C-s.mp3";
import D from "../notes/D.mp3";
import DS from "../notes/D-s.mp3";
import E from "../notes/E.mp3";
import F from "../notes/F.mp3";
import FS from "../notes/F-s.mp3";
import G from "../notes/G.mp3";
import GS from "../notes/G-s.mp3";
import A from "../notes/A.mp3";
import AS from "../notes/A-s.mp3";
import B from "../notes/B.mp3";

const ButtonsSet = () => {
  const note1 = new Audio(C);
  const note2 = new Audio(E);
  const note3 = new Audio(G);

  const playChord = () => {
    note1.play();
    note2.play();
    note3.play();
  };
  return (
    <div className="button-set">
      <Button variant="outlined" onClick={playChord}>
        C
      </Button>
      <Button>選択</Button>
    </div>
  );
};

export default ButtonsSet;
