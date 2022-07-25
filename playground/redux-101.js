import { createStore } from "redux";

//Action
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy,
});

const resetCount = ({ resetBy = 0 } = {}) => ({
  type: "RESET",
  resetBy,
});

const setCount = ({ setBy = 101 } = {}) => ({
  type: "SET",
  setBy,
});
//Reducer
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.incrementBy };
    case "DECREMENT":
      return { count: state.count - action.decrementBy };
    case "RESET":
      return { count: action.resetBy };
    case "SET":
      return { count: action.setBy };
    default:
      return state;
  }
};
//Store
const store = createStore(reducer);
//Subscribe
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
//Dispatch
store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(resetCount({ resetBy: 0 }));
store.dispatch(setCount({ setBy: 101 }));
