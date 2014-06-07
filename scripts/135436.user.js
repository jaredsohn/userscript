// ==UserScript==
// @name          Nyx navigation
// @namespace     name.peterka.nyx
// @description   Umožňuje procházet příspěvky na nyx.cz pomocí šipek vlevo a vpravo.
// @include       http://www.nyx.cz/*
// ==/UserScript==

var posts = document.getElementsByClassName("w");
var seq = 0;

function gotoW() {
	if (typeof posts[seq] == "undefined") {
		seq = 0;	
	}
	document.location.hash = posts[seq].id
	return false;
}

document.onkeydown = function(e) {
    if (e.target.tagName != "BODY") {
       return true;
    }
    if (e.keyCode == 37) { //left
		return gotoW(seq--);
    }
    if (e.keyCode == 39) { //right
	   return gotoW(seq++);
    }
}