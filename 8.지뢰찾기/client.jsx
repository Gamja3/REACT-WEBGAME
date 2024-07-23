const React = require("react");
const ReactDom = require("react-dom/client");

// const WordRelay = require("./WordRelay");
// const { default: ResponseCheck } = require("./ResponseCheck");
import MineSearch from "./MineSearch";

ReactDom.createRoot(document.querySelector("#root")).render(<MineSearch />);
