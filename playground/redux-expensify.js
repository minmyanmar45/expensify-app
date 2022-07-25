import { createStore, combineReducers } from "redux";
import { v4 as uuid } from "uuid";

//ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: { id: uuid(), description, note, amount, createdAt },
});

//UPDATE_EXPENSE
const updateExpense = (id, updates) => ({
  type: "UPDATE_EXPENSE",
  id,
  updates,
});

//REMOVE_EXPENSE
const removeExpense = (id) => ({
  type: "REMOVE_EXPENSE",
  id,
});

//SET_TEXT
const setText = (text) => ({
  type: "SET_TEXT",
  text,
});

//SORT_BY
const sortBy = (sortBy) => ({
  type: "SORT_BY",
  sortBy,
});

//SET_START_DATE
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});

//SET_END_DATE
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

///////////////////////////////////////////////////////////////////////////
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "UPDATE_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return { ...expense, ...action.updates };
        } else {
          return expense;
        }
      });
    case "REMOVE_EXPENSE":
      return state.filter((expense) => expense.id !== action.id);
    default:
      return state;
  }
};
const filtersReducerDefaultState = {
  text: "",
  sortBy: "",
  startDate: undefined,
  endDate: undefined,
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT":
      return { ...state, text: action.text };
    case "SORT_BY":
      return { ...state, sortBy: action.sortBy };
    case "SET_START_DATE":
      return { ...state, startDate: action.startDate };
    case "SET_END_DATE":
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////
/*const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt <= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.created >= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());
      return textMatch && startDateMatch && endDateMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};*/

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt <= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt >= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return textMatch && startDateMatch && endDateMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
///////////////////////////////////////////////////////////////////////////
/*const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);*/

const store = createStore(
  combineReducers({ expenses: expensesReducer, filters: filtersReducer })
);
///////////////////////////////////////////////////////////////////////////
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});
///////////////////////////////////////////////////////////////////////////
const expenseOne = store.dispatch(
  addExpense({
    description: "coffee",
    note: "i like coffee",
    amount: 300,
    createdAt: 1000,
  })
);
const expenseTwo = store.dispatch(
  addExpense({
    description: "juice",
    note: "i like juice",
    amount: 200,
    createdAt: 2000,
  })
);
const expenseThree = store.dispatch(
  addExpense({
    description: "ice-cream",
    note: "i like ice-cream",
    amount: 100,
    createdAt: 3000,
  })
);
///////////////////////////////////////////////////////////////////////////
store.dispatch(
  updateExpense(expenseOne.expense.id, {
    note: "i like ice-coffee more boz it is cool",
  })
);
///////////////////////////////////////////////////////////////////////////
//store.dispatch(removeExpense(expenseThree.expense.id));
///////////////////////////////////////////////////////////////////////////
//store.dispatch(setText("coffee"));
store.dispatch(sortBy("date"));
//store.dispatch(setStartDate(2000));
//store.dispatch(setEndDate(2000));
