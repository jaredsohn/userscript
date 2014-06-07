// ==UserScript==
// @name           Simplify AOL Radio Player
// @namespace      http://www.example.com/
// @description    Removes fluff from AOL Radio Player
// @include        http://player.play.it/player/aolPlayer.html*
// ==/UserScript==

window.addEventListener("load", function(e) {
	if (!document.getElementById) return;
	var cont = document.getElementById('container');
	var box;
	for (var i = 0; i < cont.childNodes.length; ++i) {
		if (cont.childNodes[i].className == 'outerBox') {
			box = cont.childNodes[i];
		} else if (cont.childNodes[i].tagName != undefined) {
			cont.removeChild(cont.childNodes[i]);
		}
	}
	for (var i = 0; i < box.childNodes.length; ++i) {
		if (box.childNodes[i].id != 'flashcontent' && box.childNodes[i].tagName != undefined) {
			box.removeChild(box.childNodes[i]);
		}
	}
	box.style.position = 'absolute';
	box.style.left = '0';
	box.style.top = '0';
	box.style.margin = '0 0 0 0';
	box.style.width = '494px';
	box.style.height = '468px';
	var flash = document.getElementById('flashcontent');
	flash.style.padding = '0 0 0 0';
	cont.style.width = '0';
	cont.style.height = '0';
}, false);