import { useEffect, useReducer } from "react";
import Button from "./Button";
import Display from "./Display";

const MAX_DIGITS = 12;

const BUTTONS = [
  { label: "C", ariaLabel: "Clear", variant: "function", type: "CLEAR" },
  { label: "⌫", ariaLabel: "Backspace", variant: "function", type: "DELETE" },
  { label: "%", ariaLabel: "Percent", variant: "function", type: "PERCENT" },
  { label: "÷", ariaLabel: "Divide", variant: "operator", type: "OPERATOR", payload: "÷" },

  { label: "7", type: "DIGIT", payload: "7" },
  { label: "8", type: "DIGIT", payload: "8" },
  { label: "9", type: "DIGIT", payload: "9" },
  { label: "×", ariaLabel: "Multiply", variant: "operator", type: "OPERATOR", payload: "×" },

  { label: "4", type: "DIGIT", payload: "4" },
  { label: "5", type: "DIGIT", payload: "5" },
  { label: "6", type: "DIGIT", payload: "6" },
  { label: "−", ariaLabel: "Subtract", variant: "operator", type: "OPERATOR", payload: "−" },

  { label: "1", type: "DIGIT", payload: "1" },
  { label: "2", type: "DIGIT", payload: "2" },
  { label: "3", type: "DIGIT", payload: "3" },
  { label: "+", ariaLabel: "Add", variant: "operator", type: "OPERATOR", payload: "+" },

  { label: "0", wide: true, type: "DIGIT", payload: "0" },
  { label: ".", ariaLabel: "Decimal point", type: "DECIMAL" },
  { label: "=", ariaLabel: "Equals", variant: "operator", type: "EQUALS" },
];

const initialState = {
  current: "0", // number shown on the main display
  previous: null, // first number of the pending calculation
  operator: null, // pending operator: + − × ÷
  expression: "", // small line above the main display
  overwrite: false, // true = next digit starts a new number
  awaiting: false, // true = operator just pressed, waiting for 2nd number
  error: false,
};

const divideByZeroState = {
  ...initialState,
  current: "Error",
  expression: "Cannot divide by zero",
  error: true,
};

// Rounds away floating-point noise, e.g. 0.1 + 0.2 -> 0.3
function formatNumber(value) {
  return String(parseFloat(value.toPrecision(12)));
}

// Returns the result, or null when dividing by zero
function calculate(a, b, operator) {
  const x = parseFloat(a);
  const y = parseFloat(b);

  switch (operator) {
    case "+":
      return x + y;
    case "−":
      return x - y;
    case "×":
      return x * y;
    case "÷":
      return y === 0 ? null : x / y;
    default:
      return y;
  }
}

// Converts a keyboard key into a calculator action (or null if not supported)
function getActionFromKey(key) {
  if (/^[0-9]$/.test(key)) return { type: "DIGIT", payload: key };

  switch (key) {
    case ".":
      return { type: "DECIMAL" };
    case "+":
      return { type: "OPERATOR", payload: "+" };
    case "-":
      return { type: "OPERATOR", payload: "−" };
    case "*":
      return { type: "OPERATOR", payload: "×" };
    case "/":
      return { type: "OPERATOR", payload: "÷" };
    case "%":
      return { type: "PERCENT" };
    case "Enter":
    case "=":
      return { type: "EQUALS" };
    case "Escape":
      return { type: "CLEAR" };
    case "Backspace":
      return { type: "DELETE" };
    default:
      return null;
  }
}

function reducer(state, action) {
  // While showing an error, only Clear and starting a new number work
  if (
    state.error &&
    action.type !== "CLEAR" &&
    action.type !== "DIGIT" &&
    action.type !== "DECIMAL"
  ) {
    return state;
  }

  switch (action.type) {
    case "CLEAR":
      return initialState;

    case "DIGIT": {
      const base = state.error ? initialState : state;
      const digit = action.payload;

      if (base.overwrite) {
        return {
          ...base,
          current: digit,
          overwrite: false,
          awaiting: false,
          expression: base.operator ? base.expression : "",
        };
      }

      const digitCount = base.current.replace(/[-.]/g, "").length;
      if (digitCount >= MAX_DIGITS) return base;

      if (base.current === "0") return { ...base, current: digit };
      if (base.current === "-0") return { ...base, current: "-" + digit };
      return { ...base, current: base.current + digit };
    }

    case "DECIMAL": {
      const base = state.error ? initialState : state;

      if (base.overwrite) {
        return {
          ...base,
          current: "0.",
          overwrite: false,
          awaiting: false,
          expression: base.operator ? base.expression : "",
        };
      }

      if (base.current.includes(".")) return base;
      return { ...base, current: base.current + "." };
    }

    case "OPERATOR": {
      const operator = action.payload;

      // Operator pressed twice in a row: just change the operator
      if (state.awaiting) {
        return {
          ...state,
          operator,
          expression: `${state.previous} ${operator}`,
        };
      }

      // Leading minus sign for a negative first number
      if (
        operator === "−" &&
        state.operator === null &&
        state.current === "0" &&
        !state.overwrite
      ) {
        return { ...state, current: "-0" };
      }

      let left;
      if (state.operator !== null && state.previous !== null) {
        // Chained calculation: 5 + 5 + ... calculates 5 + 5 first
        const result = calculate(state.previous, state.current, state.operator);
        if (result === null) return divideByZeroState;
        left = formatNumber(result);
      } else {
        left = formatNumber(parseFloat(state.current));
      }

      return {
        ...initialState,
        current: left,
        previous: left,
        operator,
        expression: `${left} ${operator}`,
        overwrite: true,
        awaiting: true,
      };
    }

    case "EQUALS": {
      if (state.operator === null || state.awaiting) return state;

      const result = calculate(state.previous, state.current, state.operator);
      if (result === null) return divideByZeroState;

      return {
        ...initialState,
        current: formatNumber(result),
        expression: `${state.previous} ${state.operator} ${formatNumber(
          parseFloat(state.current)
        )} =`,
        overwrite: true,
      };
    }

    case "DELETE": {
      if (state.overwrite) return state;

      const next = state.current.slice(0, -1);
      return {
        ...state,
        current: next === "" || next === "-" ? "0" : next,
      };
    }

    case "PERCENT": {
      if (state.awaiting) return state;

      const shown = formatNumber(parseFloat(state.current));
      return {
        ...state,
        current: formatNumber(parseFloat(state.current) / 100),
        expression: state.operator ? state.expression : `${shown} %`,
        overwrite: true,
      };
    }

    default:
      return state;
  }
}

function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Let browser shortcuts like Ctrl+R or Ctrl+C work normally
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const action = getActionFromKey(event.key);
      if (!action) return;

      // Stops "/" opening Firefox quick find, and stops Enter from
      // also clicking a button that currently has focus
      event.preventDefault();
      dispatch(action);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      role="group"
      aria-label="Calculator"
      className="w-full max-w-sm rounded-3xl bg-slate-800 p-3 shadow-2xl sm:p-4 md:max-w-md md:p-6 lg:max-w-lg"
    >
      <Display expression={state.expression} value={state.current} />

      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {BUTTONS.map((button) => (
          <Button
            key={button.label}
            label={button.label}
            ariaLabel={button.ariaLabel}
            variant={button.variant}
            wide={button.wide}
            onClick={() =>
              dispatch({ type: button.type, payload: button.payload })
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Calculator;