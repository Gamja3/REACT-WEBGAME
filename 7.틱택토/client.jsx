const React = require("react");
const ReactDom = require("react-dom/client");

// const WordRelay = require("./WordRelay");
// const { default: ResponseCheck } = require("./ResponseCheck");
import TicTacToe from "./TicTacToe";

ReactDom.createRoot(document.querySelector("#root")).render(<TicTacToe />);
