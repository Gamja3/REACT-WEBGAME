const React = require("react");
const ReactDom = require("react-dom/client");

// const WordRelay = require("./WordRelay");
// const { default: ResponseCheck } = require("./ResponseCheck");
import RSP from "./RSP";

ReactDom.createRoot(document.querySelector("#root")).render(<RSP />);
