// ==UserScript==
// @id             google_link
// @name           Google link
// @version        1.0
// @namespace      google_link
// @author         SEGnosis
// @description    Links the google logo
// @include        *.google.*
// @run-at         document-end
// ==/UserScript==


if(document.getElementById("gbqlw") != undefined)
	document.getElementById("gbqlw").innerHTML = "<a href=\"http://www.google.com/\"><span id=\"gbql\"></span></a>";

if(document.getElementById("hplogo") != undefined)
	document.getElementById("hplogo").parentNode.innerHTML = "<a href=\"http://www.google.com/\">" + document.getElementById("hplogo").parentNode.innerHTML + "</a>";