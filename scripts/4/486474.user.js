// ==UserScript==
// @name           gray background v1 
// @description    This change background color to gray.
// @version        1.0.20140503               
// ==/UserScript==

document.getElementsByTagName("body")[0].style.backgroundColor = "#dddddd";

var x = document.getElementsByTagName("div"); 

for(var i=0; i<x.length; i++) {
	
	x[i].style.backgroundColor = "#dddddd";
}