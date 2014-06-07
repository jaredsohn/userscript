// ==UserScript==
// @name           Grepolis-Externes Forum
// @author         smokieruff
// @namespace      smokieruff_Grepolis-Externes Forum
// @include        http://de*.grepolis.*
// @description    Externes Forum für Grepolis
// ==/UserScript==


var neuB = document.createElement("a");
var neuBText = document.createTextNode("  WdN-Forum");
neuB.href = "http://s1.grepoforen.de/160/index.php";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);



