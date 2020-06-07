import React, { useContext, useEffect, useState } from "react";
import "../styles/ChordButtons.css";
import ButtonSet from "./ButtonSet.js";
import PlayButton from "./PlayButton.js";
import ShuffleButton from "./ShuffleButton.js";
import PlayButtonPushed from "./PlayButtonPushed.js";
import notes from "../notes/Notes.js";
import diatonicChords from "./DiatonicChords.js";

import AppContext from "../contexts/AppContext";

var id = null;
var currentChordsDic = {
  1: [0, 4, 7],
  2: [0, 4, 7],
  3: [0, 4, 7],
  4: [0, 4, 7],
};

const scaleStrings = ["major"];

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

  //コードシャッフル
  const shuffleChords = () => {
    const randomScaleNum = Math.floor(Math.random() * 1);
    const randomRootNum = Math.floor(Math.random() * 12);
    const randomDiatonic = [
      Math.floor(Math.random() * 7 + 1),
      Math.floor(Math.random() * 7 + 1),
      Math.floor(Math.random() * 7 + 1),
      Math.floor(Math.random() * 7 + 1),
    ];

    var randomScale = scaleStrings[randomScaleNum];
    var randomDiatonicSet = [];

    randomDiatonic.map((value) => {
      var rootNum = null;
      switch (randomScale) {
        // メジャースケール
        case "major":
          switch (value) {
            // IM7
            case 1:
              rootNum = randomRootNum + 0;
              // [選ばれたキーの音 + キーの音からルート音がどれだけ離れているか, コードの種類]
              randomDiatonicSet.push([
                rootNum,
                diatonicChords[randomScale][value],
              ]);
              break;
            // IIm7
            case 2:
              rootNum = randomRootNum + 2;
              randomDiatonicSet.push([
                rootNum,
                diatonicChords[randomScale][value],
              ]);
              break;
            // IIIm7
            case 3:
              rootNum = randomRootNum + 4;
              randomDiatonicSet.push([
                rootNum,
                diatonicChords[randomScale][value],
              ]);
              break;
            // IVM7
            case 4:
              rootNum = randomRootNum + 5;
              randomDiatonicSet.push([
                rootNum,
                diatonicChords[randomScale][value],
              ]);
              break;
            // V7
            case 5:
              rootNum = randomRootNum + 7;
              randomDiatonicSet.push([
                rootNum,
                diatonicChords[randomScale][value],
              ]);
              break;
            // VI7
            case 6:
              rootNum = randomRootNum + 9;
              randomDiatonicSet.push([
                rootNum,
                diatonicChords[randomScale][value],
              ]);
              break;
            // VII7
            case 7:
              rootNum = randomRootNum + 11;
              randomDiatonicSet.push([
                rootNum,
                diatonicChords[randomScale][value],
              ]);
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    });
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
      <ShuffleButton shuffleChords={shuffleChords} />
    </>
  );
};

export default ChordButtons;
