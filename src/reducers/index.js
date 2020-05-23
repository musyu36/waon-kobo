import { UPDATE_CHORD } from "../actions";

const events = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CHORD:
      const chord = action.chord;
      //   const length = state.length;
      //   const id = length === 0 ? 1 : state[length - 1].id + 1;
      // キー値と変数名が同じなら省略可能
      //   return [...state, { id: id, ...event }];
      return chord;
    default:
      return state;
  }
};

export default events;
