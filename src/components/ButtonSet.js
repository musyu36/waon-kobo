import React, { useReducer, useState } from "react";
import "../styles/ButtonSet.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

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
import CH from "../notes/C-h.mp3";
import CSH from "../notes/C-sh.mp3";
import DH from "../notes/D-h.mp3";
import DSH from "../notes/D-sh.mp3";
import EH from "../notes/E-h.mp3";
import FH from "../notes/F-h.mp3";
import FSH from "../notes/F-sh.mp3";
import GH from "../notes/G-h.mp3";
import GSH from "../notes/G-sh.mp3";
import AH from "../notes/A-h.mp3";

function getModalStyle() {
  const top = 20;
  const left = 30;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "auto",
    backgroundColor: "#f2ebbf",
    borderTop: "2px solid #f06060",
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
  btnCancel: {
    marginRight: 8,
    color: "#8cbeb2",
    border: "1px solid #8cbeb2",
  },
  btnOk: {
    backgroundColor: "#8cbeb2",
    color: "#f2ebbf",
    border: "1px solid #8cbeb2",
  },
}));

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
  notes.push(new Audio(CH)); // 12
  notes.push(new Audio(CSH)); // 13
  notes.push(new Audio(DH)); // 14
  notes.push(new Audio(DSH)); // 15
  notes.push(new Audio(EH)); // 16
  notes.push(new Audio(FH)); // 17
  notes.push(new Audio(FSH)); // 18
  notes.push(new Audio(GH)); // 19
  notes.push(new Audio(GSH)); // 20
  notes.push(new Audio(AH)); // 21

  // const notesString = [
  //   "C",
  //   "C♯",
  //   "D",
  //   "D♯",
  //   "E",
  //   "F",
  //   "F♯",
  //   "G",
  //   "G♯",
  //   "A",
  //   "A♯",
  //   "B",
  // ];

  const initialNotesState = [
    { name: "C", value: 0, checked: true },
    { name: "C♯", value: 1, checked: false },
    { name: "D", value: 2, checked: false },
    { name: "D♯", value: 3, checked: false },
    { name: "E", value: 4, checked: false },
    { name: "F", value: 5, checked: false },
    { name: "F♯", value: 6, checked: false },
    { name: "G", value: 7, checked: false },
    { name: "G♯", value: 8, checked: false },
    { name: "A", value: 9, checked: false },
    { name: "A♯", value: 10, checked: false },
    { name: "B", value: 11, checked: false },
  ];

  // ルート音
  const [notesStrings, setNotesStrings] = useState(initialNotesState);
  const [currentNote, setCurrentNote] = useState("C");
  // 構成
  const [chordStrings, setChordStrings] = useState();
  const [currentChord, setCurrentChord] = useState("maj");

  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRootRadioClick = (e) => {
    e.preventDefault();
    var name = e.target.name;
    var value = notesStrings.map((item) => {
      return {
        name: item.name,
        value: item.value,
        checked: item.name === name ? true : false,
      };
    });
    setNotesStrings(value);
  };

  const playChord = () => {
    state.map((value) => {
      notes[value].play();
    });
  };

  const selectRoot = (e) => {
    e.preventDefault();
    var rootNum = 0;

    // 選択中のルート音を更新
    notesStrings.map((note, index) => {
      if (note.checked) {
        rootNum = note.value;
        return setCurrentNote(note.name);
      }
    });

    var nextChord = [];
    switch (currentChord) {
      case "maj":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 4);
        nextChord.push(rootNum + 7);
        break;
      default:
        break;
    }
    dispatch({ type: UPDATE_CHORD, chord: nextChord });
    handleClose();
  };

  const selectChord = () => {};

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h4>基音</h4>
      <div className="modal-notes">
        <form action="">
          {notesStrings.map((note, index) => (
            <label key={index} style={{ marginRight: "8px" }}>
              <input
                type="radio"
                name={note.name}
                value={note.value}
                checked={note.checked}
                onChange={handleRootRadioClick}
              />
              {note.name}
            </label>
          ))}
        </form>
      </div>
      <div className="btn-set">
        <Button
          onClick={handleClose}
          className={classes.btnCancel}
          variant="outlined"
        >
          キャンセル
        </Button>
        <Button
          onClick={selectRoot}
          className={classes.btnOk}
          variant="contained"
        >
          決定
        </Button>
      </div>
    </div>
  );

  return (
    <div className="button-set">
      <Button className="chord-button" variant="outlined" onClick={playChord}>
        {currentNote}
      </Button>
      <Button onClick={handleOpen}>基音</Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
      <Button onClick={selectChord}>構成</Button>
    </div>
  );
};

export default ButtonsSet;
