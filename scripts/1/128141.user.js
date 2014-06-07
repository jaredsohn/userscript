// ==UserScript==
// @name           UGC externes Forum
// @namespace      007
// @description    UGC externes Forum
// @include        http://de*.grepolis.*
// ==/UserScript==

var neuB = document.createElement("a");
var neuBText = document.createTextNode("Externes Forum");
neuB.href = "http://s1.grepoforen.de/574/index.php";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);