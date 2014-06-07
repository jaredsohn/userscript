// ==UserScript==
// @name           My Typeing winner
// @namespace      no
// @include        no
// ==/UserScript==

setInterval(function() { 
	document.getElementById("wordinput").value = document.getElementById("word").innerHTML + " ";
},200);