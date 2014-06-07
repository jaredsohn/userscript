// ==UserScript==
// @name          UserScript Source+
// @namespace     http://userscripts.org/users/50149
// @description   Increases the font size for the source code at userscripts.org
// @include       http://userscripts.org/scripts/review/*
// @include       http://www.userscripts.org/scripts/review/*
// ==/UserScript==

var biggerfont_class = ".sh_sourceCode {font-size: 14px;}";
var new_style = document.createElement("style");
new_style.type = "text/css";
new_style.innerHTML = biggerfont_class;
document.body.appendChild(new_style);