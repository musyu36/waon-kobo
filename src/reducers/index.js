import { UPDATE_CHORD } from "../actions";

const events = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CHORD:
      const chord = action.chord;
      return chord;
    default:
      return state;
  }
};

export default events;
