import React, { useContext, useState, useEffect } from "react";
import "../styles/ButtonSet.css";
import HammerIcon from "./HammerIcon";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AppContext from "../contexts/AppContext";

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
    backgroundColor: "#e6f0fa",
    borderTop: "2px solid #16acde",
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
    color: "#16acde",
    border: "1px solid #16acde",
    "&:hover": {
      color: "#1184ab",
      border: "1px solid #1184ab",
    },
  },
  btnOk: {
    backgroundColor: "#16acde",
    color: "#e6f0fa",
    border: "1px solid #16acde",
    "&:hover": {
      backgroundColor: "#1184ab",
      color: "e6f0fa",
      border: "1px solid #1184ab",
    },
  },
}));

const ButtonsSet = ({
  btnNum,
  playingNum,
  currentChords,
  setCurrentChords,
  randomChord,
  deleteDisplayScaleAndKey,
}) => {
  const initialState = [0, 4, 7];

  const [state, setState] = useState(initialState);

  const { setCurrentKey } = useContext(AppContext);

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
    { name: "m(♭5)", value: 16, checked: false },
    { name: "(♯5)", value: 17, checked: false },
    { name: "M7(♯5)", value: 18, checked: false },
  ];

  // ルート音
  const [notesStrings, setNotesStrings] = useState(initialNotesState);
  const [currentNote, setCurrentNote] = useState("C");

  // 構成
  const [chordStrings, setChordStrings] = useState(initialChordState);
  const [currentChord, setCurrentChord] = useState("maj");

  // モーダル管理
  const [openChordModal, setOpenChordModal] = useState(false);

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  // propsで渡されたrandomChordを使ってここのボタン情報を更新する
  useEffect(() => {
    shuffleRootRadio(randomChord[0]);
    shuffleChordRadio(randomChord[1]);
  }, [randomChord]);

  useEffect(() => {
    shuffleChord(randomChord);
  }, [notesStrings, chordStrings]);

  // useEffect内で更新を行わないと，currentChordsが正しく更新されない
  useEffect(() => {
    setCurrentChords({ ...currentChords, [btnNum]: state });
  }, [state]);

  const handleOpenChordModal = () => {
    setOpenChordModal(true);
  };

  const handleCloseChordModal = () => {
    setOpenChordModal(false);
  };

  // コードシャッフル
  const shuffleRootRadio = (randomChordRootNum) => {
    const value = notesStrings.map((item) => {
      return {
        name: item.name,
        value: item.value,
        checked: item.value === randomChordRootNum ? true : false,
      };
    });
    setNotesStrings(value);
  };

  const shuffleChordRadio = (randomChordName) => {
    const value = chordStrings.map((item) => {
      return {
        name: item.name,
        value: item.value,
        checked: item.name === randomChordName ? true : false,
      };
    });
    setChordStrings(value);
  };

  // コード選択
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
    deleteDisplayScaleAndKey();
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
    deleteDisplayScaleAndKey();
  };

  // 再生
  const playChord = () => {
    setCurrentKey(state);
    state.map((value) => {
      notes[value].currentTime = 0;
      notes[value].play();
    });
  };

  const updateChord = () => {
    var rootNum = 0;
    var chordType = "";

    // trueの物を探す
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
      case "m(♭5)":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 3);
        nextChord.push(rootNum + 6);
        break;
      case "(♯5)":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 4);
        nextChord.push(rootNum + 6);
        break;
      case "M7(♯5)":
        nextChord.push(rootNum);
        nextChord.push(rootNum + 4);
        nextChord.push(rootNum + 6);
        nextChord.push(rootNum + 11);
        break;
      default:
        break;
    }
    setState(nextChord);
  };

  // コードの選択
  const selectChord = (e) => {
    e.preventDefault();
    updateChord();
    handleCloseChordModal();
  };

  // コードのランダム選択
  const shuffleChord = () => {
    updateChord();
  };

  const bodyChord = (
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
      <h4 className="modal-title modal-title-structure">構成</h4>
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
          onClick={selectChord}
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

  var playButton = null;
  if (btnNum === playingNum) {
    playButton = (
      <button className="btn-play-pushed" variant="outlined">
        {currentNote}
        {displayChord}
      </button>
    );
  } else {
    playButton = (
      <button className="btn-play" variant="outlined" onClick={playChord}>
        {currentNote}
        {displayChord}
      </button>
    );
  }

  return (
    <div className="btn-set">
      {playButton}
      <button className="btn-select" onClick={handleOpenChordModal}>
        <HammerIcon />
      </button>
      <Modal open={openChordModal} onClose={handleCloseChordModal}>
        {bodyChord}
      </Modal>
    </div>
  );
};

export default ButtonsSet;
