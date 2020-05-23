import React, { useReducer } from "react";
import "../styles/ButtonSet.css";
import Button from "@material-ui/core/Button";
import { UPDATE_CHORD } from "../actions";
import reducer from "../reducers";

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
  const initialState = [0, 4, 7];
  const [state, dispatch] = useReducer(reducer, initialState);

  const notes = [];
  notes.push(new Audio(C)); // 0
  notes.push(new Audio(CS)); // 1
  notes.push(new Audio(D)); // 2
  notes.push(new Audio(DS)); // 3
  notes.push(new Audio(E)); // 4
  notes.push(new Audio(F)); // 5
  notes.push(new Audio(FS)); // 6
  notes.push(new Audio(G)); // 7
  notes.push(new Audio(GS)); //8
  notes.push(new Audio(A)); // 9
  notes.push(new Audio(AS)); // 10
  notes.push(new Audio(B)); // 11

  const playChord = () => {
    state.map((value) => {
      notes[value].play();
    });
  };

  const selectRoot = () => {
    dispatch({ type: UPDATE_CHORD, chord: [2, 6, 9] });
  };
  const selectChord = () => {};
  return (
    <div className="button-set">
      <Button className="chord-button" variant="outlined" onClick={playChord}>
        C
      </Button>
      <Button onClick={selectRoot}>基音</Button>
      <Button onClick={selectChord}>構成</Button>
    </div>
  );
};

export default ButtonsSet;
