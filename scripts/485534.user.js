// ==UserScript==
// @name           Facebook - Ghost Trappers Words with ghosts (Chrome Supported)
// @namespace      Leonardo
// @description    Words With Ghosts notification. Fully functional with chrome without any additional extensions.
// @include        http://www.ghost-trappers.com/fb/*
// @version        1.00
// @history        1.00 - Words with ghost 
// ==/UserScript==
	
if(document.getElementsByClassName("logText")[1].innerHTML.indexOf("Words with ghosts") != -1) {
		if ( document.getElementById("special_text")) {
		document.getElementById("special_text").innerHTML = "<EMBED SRC=\"http:\/\/dl.dropboxusercontent.com\/u\/60631200\/LetterFound.mp3\" hidden=true>";
		}
}