const React = require("react");
const ReactDom = require("react-dom");

const WordRelay = require("./WordRelay");
const { default: NumberBaseball } = require("./NumberBaseball");
import RenderTest from "./RenderTest";

ReactDom.render(<NumberBaseball />, document.querySelector("#root"));
