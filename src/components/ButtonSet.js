import React, { useReducer, useState } from "react";
import "../styles/ButtonSet.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import { UPDATE_CHORD } from "../actions";
import reducer from "../reducers";

import notes from "../notes/Notes.js";

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
  btnChord: {
    marginBottom: 8,
    textTransform: "none",
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

  const initialChordState = [
    { name: "maj", value: 0, checked: true },
    { name: "min", value: 1, checked: false },
    { name: "7", value: 2, checked: false },
    { name: "M7", value: 3, checked: false },
    { name: "m7", value: 4, checked: false },
    { name: "mM7", value: 5, checked: false },
    { name: "dim", value: 6, checked: false },
    { name: "sus4", value: 7, checked: false },
    { name: "7sus4", value: 8, checked: false },
    { name: "aug", value: 9, checked: false },
    { name: "m7(♭5)", value: 10, checked: false },
    { name: "6", value: 11, checked: false },
    { name: "add9", value: 12, checked: false },
    { name: "9", value: 13, checked: false },
    { name: "7(♭9)", value: 14, checked: false },
    { name: "7(♯9)", value: 15, checked: false },
  ];

  // ルート音
  const [notesStrings, setNotesStrings] = useState(initialNotesState);
  const [currentNote, setCurrentNote] = useState("C");
  // 構成
  const [chordStrings, setChordStrings] = useState(initialChordState);
  const [currentChord, setCurrentChord] = useState("maj");

  // モーダル管理
  const [openRootModal, setOpenRootModal] = useState(false);
  const [openChordModal, setOpenChordModal] = useState(false);

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpenRootModal = () => {
    setOpenRootModal(true);
  };

  const handleCloseRootModal = () => {
    setOpenRootModal(false);
  };

  const handleOpenChordModal = () => {
    setOpenChordModal(true);
  };

  const handleCloseChordModal = () => {
    setOpenChordModal(false);
  };

  const handleRootRadioClick = (e) => {
    const name = e.target.name;
    const value = notesStrings.map((item) => {
      return {
        name: item.name,
        value: item.value,
        checked: item.name === name ? true : false,
      };
    });
    setNotesStrings(value);
  };

  const handleChordRadioClick = (e) => {
    const selectedValue = e.target.value;

    const value = chordStrings.map((item) => {
      return {
        name: item.name,
        value: item.value,
        checked: item.value === Number(selectedValue) ? true : false,
      };
    });
    setChordStrings(value);
  };

  // 再生
  const playChord = () => {
    state.map((value) => {
      notes[value].currentTime = 0;
      notes[value].play();
    });
  };

  const selectRoot = (e) => {
    e.preventDefault();
    var rootNum = 0;
    var chordType = "";

    notesStrings.map((note) => {
      if (note.checked) {
        rootNum = note.value;
        return setCurrentNote(note.name);
      }
    });

    chordStrings.map((chord) => {
      if (chord.checked) {
        chordType = chord.name;
        return setCurrentChord(chord.name);
      }
    });

    const nextChord = [];
    switch (chordType) {
      case "maj":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 4);
        nextChord.push(rootNum + 7);
        break;
      case "min":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 3);
        nextChord.push(rootNum + 7);
        break;
      case "7":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 4);
        nextChord.push(rootNum + 7);
        nextChord.push(rootNum + 10);
        break;
      case "M7":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 4);
        nextChord.push(rootNum + 7);
        nextChord.push(rootNum + 11);
        break;
      case "m7":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 3);
        nextChord.push(rootNum + 7);
        nextChord.push(rootNum + 10);
        break;
      case "mM7":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 3);
        nextChord.push(rootNum + 7);
        nextChord.push(rootNum + 11);
        break;
      case "dim":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 3);
        nextChord.push(rootNum + 6);
        nextChord.push(rootNum + 9);
        break;
      case "sus4":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 5);
        nextChord.push(rootNum + 7);
        break;
      case "7sus4":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 5);
        nextChord.push(rootNum + 7);
        nextChord.push(rootNum + 10);
        break;
      case "aug":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 4);
        nextChord.push(rootNum + 8);
        break;
      case "m7(♭5)":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 3);
        nextChord.push(rootNum + 6);
        nextChord.push(rootNum + 10);
        break;
      case "6":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 4);
        nextChord.push(rootNum + 7);
        nextChord.push(rootNum + 9);
        break;
      case "add9":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 4);
        nextChord.push(rootNum + 7);
        nextChord.push(rootNum + 14);
        break;
      case "9":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 4);
        nextChord.push(rootNum + 7);
        nextChord.push(rootNum + 10);
        nextChord.push(rootNum + 14);
        break;
      case "7(♭9)":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 4);
        nextChord.push(rootNum + 7);
        nextChord.push(rootNum + 10);
        nextChord.push(rootNum + 13);
        break;
      case "7(♯9)":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 4);
        nextChord.push(rootNum + 7);
        nextChord.push(rootNum + 10);
        nextChord.push(rootNum + 15);
        break;
      default:
        break;
    }
    dispatch({ type: UPDATE_CHORD, chord: nextChord });
    handleCloseRootModal();
    handleCloseChordModal();
  };

  const bodyRoot = (
    <div style={modalStyle} className={classes.paper}>
      <h4 className="modal-title">基音</h4>
      <div className="modal-notes">
        <form action="">
          {notesStrings.map((note, index) => (
            <label key={index} style={{ marginRight: "8px" }}>
              <span className="radio-set">
                <input
                  type="radio"
                  name={note.name}
                  value={note.value}
                  checked={note.checked}
                  onChange={handleRootRadioClick}
                />
                {note.name}
              </span>
            </label>
          ))}
        </form>
      </div>
      <div className="modal-btn-set">
        <Button
          onClick={handleCloseRootModal}
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

  const bodyChord = (
    <div style={modalStyle} className={classes.paper}>
      <h4 className="modal-title">構成</h4>
      <div className="modal-notes">
        <form action="">
          {chordStrings.map((chord, index) => (
            <label key={index} style={{ marginRight: "8px" }}>
              <span className="radio-set">
                <input
                  type="radio"
                  name={chord.name}
                  value={chord.value}
                  checked={chord.checked}
                  onChange={handleChordRadioClick}
                />
                {chord.name}
              </span>
            </label>
          ))}
        </form>
      </div>
      <div className="modal-btn-set">
        <Button
          onClick={handleCloseChordModal}
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

  var displayChord = "";

  switch (currentChord) {
    case "maj":
      displayChord = "";
      break;
    case "min":
      displayChord = "m";
      break;
    case "7":
      displayChord = "7";
      break;
    default:
      displayChord = currentChord;
      break;
  }

  return (
    <div className="btn-set">
      <button className="btn-play" variant="outlined" onMouseDown={playChord}>
        {currentNote}
        {displayChord}
      </button>
      <button className="btn-select" onClick={handleOpenRootModal}>
        基音
      </button>
      <Modal open={openRootModal} onClose={handleCloseRootModal}>
        {bodyRoot}
      </Modal>
      <button className="btn-select" onClick={handleOpenChordModal}>
        構成
      </button>
      <Modal open={openChordModal} onClose={handleCloseChordModal}>
        {bodyChord}
      </Modal>
    </div>
  );
};

export default ButtonsSet;
