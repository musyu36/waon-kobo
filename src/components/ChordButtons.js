import React, { useContext, useEffect, useState } from "react";
import "../styles/ChordButtons.css";
import ButtonSet from "./ButtonSet.js";
import PlayButton from "./PlayButton.js";
import PlayButtonPushed from "./PlayButtonPushed.js";
import notes from "../notes/Notes.js";

import AppContext from "../contexts/AppContext";

var id = null;
var currentChordsDic = {
  1: [0, 4, 7],
  2: [0, 4, 7],
  3: [0, 4, 7],
  4: [0, 4, 7],
};

const ChordButtons = () => {
  const { setCurrentKey, currentChords } = useContext(AppContext);
  // 再生ボタン押下時，どのボタンが再生されているか
  const [state, setState] = useState(0);
  // 再生ボタン表示管理
  var [playButton, setPlayButton] = useState();

  useEffect(() => {
    currentChordsDic = currentChords;
  }, [currentChords]);

  // 再生
  const playChords = () => {
    const tm = 2000;
    var i = 2;
    const fn = function () {
      if (i > 4) {
        clearInterval(id);
        id = null;
        setState(0);
        return;
      }
      if (i < 5) {
        currentChordsDic[i].map((value) => {
          notes[value].currentTime = 0;
          notes[value].play();
        });
        setCurrentKey(currentChordsDic[i]);
      }
      setState(i);
      i++;
    };
    if (!id) {
      currentChordsDic[1].map((value) => {
        notes[value].currentTime = 0;
        notes[value].play();
      });
      setCurrentKey(currentChordsDic[1]);
      id = setInterval(fn, tm);
      setState(1);
    }
  };

  useEffect(() => {
    if (state === 0) {
      setPlayButton(<PlayButton playChords={playChords} />);
    } else {
      setPlayButton(<PlayButtonPushed />);
    }
  }, [state]);

  return (
    <>
      <div className="chord-buttons">
        <ButtonSet btnNum={1} playingNum={state} />
        <ButtonSet btnNum={2} playingNum={state} />
        <ButtonSet btnNum={3} playingNum={state} />
        <ButtonSet btnNum={4} playingNum={state} />
      </div>
      {playButton}
    </>
  );
};

export default ChordButtons;
