// ==UserScript==
// @name           sukanah2
// @namespace      http://userscripts.org/users/23652
// @description    Used as a filler for a little bug on the Greasemonkey script list
// ==/UserScript==

function randomize(oradio,idx)
{
	var radios = document.getElementsByName("btn1");
	var r = Math.floor(Math.random() * 8); 
	radios[r].checked = true;	
}
randomize(oradio,idx);