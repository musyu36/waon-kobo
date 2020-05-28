import React, { useContext } from "react";
import "../styles/KeyBoard.css";
import AppContext from "../contexts/AppContext";

const KeyBoard = () => {
  const { currentKey } = useContext(AppContext);

  return (
    <div className="keyboard">
      <div className="key">
        {currentKey.includes(0) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
        {currentKey.includes(1) ? (
          <div className="black_key active"></div>
        ) : (
          <div className="black_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(2) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
        {currentKey.includes(3) ? (
          <div className="black_key active"></div>
        ) : (
          <div className="black_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(4) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(5) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
        {currentKey.includes(6) ? (
          <div className="black_key active"></div>
        ) : (
          <div className="black_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(7) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
        {currentKey.includes(8) ? (
          <div className="black_key active"></div>
        ) : (
          <div className="black_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(9) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
        {currentKey.includes(10) ? (
          <div className="black_key active"></div>
        ) : (
          <div className="black_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(11) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(12) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
        {currentKey.includes(13) ? (
          <div className="black_key active"></div>
        ) : (
          <div className="black_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(14) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
        {currentKey.includes(15) ? (
          <div className="black_key active"></div>
        ) : (
          <div className="black_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(16) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(17) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
        {currentKey.includes(18) ? (
          <div className="black_key active"></div>
        ) : (
          <div className="black_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(19) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
        {currentKey.includes(20) ? (
          <div className="black_key active"></div>
        ) : (
          <div className="black_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(21) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
        {currentKey.includes(22) ? (
          <div className="black_key active"></div>
        ) : (
          <div className="black_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(23) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(24) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
        {currentKey.includes(25) ? (
          <div className="black_key active"></div>
        ) : (
          <div className="black_key"></div>
        )}
      </div>
      <div className="key">
        {currentKey.includes(26) ? (
          <div className="white_key active"></div>
        ) : (
          <div className="white_key"></div>
        )}
      </div>
    </div>
  );
};

export default KeyBoard;
