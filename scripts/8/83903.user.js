// ==UserScript==
// @name	Logout in der Sidebar
// @author	homerbond005
// @include	http://www.schuelervz.net/*
// @exclude	http://www.schuelervz.net/Plauderkasten
// ==/UserScript==

//altes raus hier
var menu = document.getElementById("Grid-Page-Center-Top-Navigation");
var raus_hier = menu.getElementsByTagName("a")[6];
//neues raus hier
var newli = document.createElement("li");
var newa = document.createElement("a");
var newlinktext = document.createTextNode("Raus hier");
var li = document.getElementById("Grid-Navigation-Main").appendChild(newli);
var link = li.appendChild(newa);
link.setAttribute("rel",raus_hier.getAttribute("rel"));
link.setAttribute("class",raus_hier.getAttribute("class"));
link.setAttribute("title",raus_hier.getAttribute("title"));
link.setAttribute("href",raus_hier.getAttribute("href"));
link.appendChild(newlinktext);