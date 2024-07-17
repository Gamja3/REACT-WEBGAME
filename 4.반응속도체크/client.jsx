const React = require("react");
const ReactDom = require("react-dom");

// const WordRelay = require("./WordRelay");
// const { default: ResponseCheck } = require("./ResponseCheck");
import ResponseCheck from "./ResponseCheck";

ReactDom.render(<ResponseCheck />, document.querySelector("#root"));
