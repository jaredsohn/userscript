// ==UserScript==
// @name Editable Wikipedia Titles
// @namespace     http://www.shortcipher.com/scripts
// @description Fix misspellings and go to different articles by editing titles inline.
// @include       http://en.wikipedia.org/wiki/*
// ==/UserScript==

(function(){
var staticTitle = document.getElementsByTagName("h1")[0];

var editableTitle = document.createElement("input");
editableTitle.type = "text";

editableTitle.id = "editable-title";
editableTitle.style.width = "100%";
editableTitle.style.fontSize = "x-large";
editableTitle.style.backgroundColor = "transparent";
editableTitle.style.borderStyle = "none";
editableTitle.style.borderBottomStyle = "solid";
editableTitle.style.borderBottomWidth = "1px";

editableTitle.value = staticTitle.childNodes[0].nodeValue;

editableTitle.addEventListener("change", function() {
 document.location.href="http://en.wikipedia.org/wiki/" + document.getElementById("editable-title").value;
}, false);

editableTitle.addEventListener("focus", function() {
 document.getElementById("editable-title").style.backgroundColor = "#ddf";
}, false);

editableTitle.addEventListener("blur", function() {
 document.getElementById("editable-title").style.backgroundColor = "transparent";
}, false);

editableTitle.addEventListener("keypress", function(evt) {
 if (evt.keyCode == 13) {
  document.getElementById("editable-title").blur();
 }
}, false);

staticTitle.parentNode.replaceChild(editableTitle, staticTitle);
})()