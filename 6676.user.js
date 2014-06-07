// ==UserScript==
// @name           Search
// @description    hack
// @include http://www.google.com/firefox*
// ==/UserScript==

alert('here');
var ifl=document.createElement("INPUT");
ifl.setAttribute("type","submit");
ifl.setAttribute("name","hs-but2");
ifl.setAttribute("value","Bug");

var queryBox=document.getElementById("sf");
var wholeCell=queryBox.parentNode;
wholeCell.appendChild(ifl);

var styles = '<style type="text/css">input {margin: 3px 5px 0 0;}</style>';
document.body.innerHTML += styles;



