// ==UserScript==
// @name           Gulli:Board - Neue Posts
// @namespace      http://fortytwo.redio.de/
// @description     Fügt zur Seitenleiste im G:B zwei Einträge hinzu, um neue Beiträge anzuzeigen; ohne Börse bzw. nur Börse
// @include        http://board.gulli.com/*
// ==/UserScript==

var element = document.getElementById("navbuttonlist").getElementsByTagName("li")[5];
if (element) {
    // create li-elements
    var newSearchA = document.createElement("li");
    var newSearchB = document.createElement("li");
    // create the links
    newSearchA.innerHTML = '<a href="http://board.gulli.com/search.php?do=getnew&include=51,123,6,94,32,99,173,101,100,27,184,13,79,73,74,64,157,158,80,82,96,120,179,75,10,35,168,34,170,176,88,22,90,29,181,7,188,39,140,141,142,162,18,9,89,124,57,26,43,84,85,87,11,12,108,180,81,19,14,131,187,122,20,58,156,93,129,5,31,16,92,3,70,30,91,114,83" accesskey="2" rel="nofollow">Neues (Allgemein)</a>'
    newSearchB.innerHTML = '<a href="http://board.gulli.com/search.php?do=getnew&include=42,109,130,103,63,41,106,102,23,72,185,15,186,66,68,116,117,67,132,111,177,169,174,1,148,149,150,151,159,172,133,33,171,152,153,165,155,164,166,154,76,4,160,178" accesskey="2" rel="nofollow">Neues (Börse)</a>';
    // write to document
    element.parentNode.insertBefore(newSearchB, element.nextSibling);
    element.parentNode.insertBefore(newSearchA, element.nextSibling);
}