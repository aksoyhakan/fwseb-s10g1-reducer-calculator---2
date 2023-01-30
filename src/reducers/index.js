import {
  WRITING_NUMBER,
  OPERATION_CHANGING,
  CALCULATION,
  CLEAR_DISPLAY,
  M_P,
  M_R,
  M_C,
} from "../actions";

export const initialState = {
  firstNumber: 0,
  secondNumber: 0,
  total: 0,
  operation: "",
  memory: 0,
};

const calculateResult = (num1, num2, operation) => {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "*":
      return num1 * num2;
    case "-":
      return num1 - num2;
    default:
      return;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case WRITING_NUMBER: {
      if (state.operation === "") {
        if (state.firstNumber === 0) {
          return { ...state, firstNumber: action.payload };
        } else {
          return { ...state, firstNumber: state.firstNumber + action.payload };
        }
      } else {
        if (state.secondNumber === 0) {
          return { ...state, secondNumber: action.payload };
        } else {
          return {
            ...state,
            secondNumber: state.secondNumber + action.payload,
          };
        }
      }
    }
    case OPERATION_CHANGING:
      return { ...state, operation: action.payload };

    case CALCULATION: {
      if (state.firstNumber === 0) {
        return state;
      } else {
        return {
          ...state,
          total: calculateResult(
            Number(state.firstNumber),
            Number(state.secondNumber),
            state.operation
          ),
          firstNumber: calculateResult(
            Number(state.firstNumber),
            Number(state.secondNumber),
            state.operation
          ),
          secondNumber: 0,
        };
      }
    }

    case CLEAR_DISPLAY:
      return {
        ...state,
        firstNumber: 0,
        secondNumber: 0,
        total: 0,
        operation: "",
      };

    case M_P:
      return { ...state, memory: state.total };

    case M_R:
      return { ...state, total: state.memory };

    case M_C:
      return { ...state, memory: 0 };

    default:
      return state;
  }
};

export default reducer;
