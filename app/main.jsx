//main.js

var React = require("react");
var ReactDOM = require("react-dom");
var Notes = require("./components/notes.jsx");
const app_root 		 = "/"
var axios 			 = require("axios")

 //console.log(notes)
function render(){
    ReactDOM.render(<Notes />, document.getElementById("container"));
}
render();
