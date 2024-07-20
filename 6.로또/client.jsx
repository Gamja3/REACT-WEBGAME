const React = require("react");
const ReactDom = require("react-dom/client");

// const WordRelay = require("./WordRelay");
// const { default: ResponseCheck } = require("./ResponseCheck");
import Lotto from "./Lotto";

ReactDom.createRoot(document.querySelector("#root")).render(<Lotto />);
