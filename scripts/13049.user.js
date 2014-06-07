// ==UserScript==
// @name           Wondermark Enhancer
// @namespace      http://freecog.net/2007/
// @description    Places the title text underneath the comic., adds navigation hotkeys (b for previous comic, n for next comic), and optionally scales up the comic (press + to activate, - to deactivate).
// @include        http://wondermark.com/*
// ==/UserScript==

var LETTERS = 'abcdefghijklmnopqrstuvwxyz';
var NUMBERS = '01234567890';
var ALPHA_NUMERIC = LETTERS + LETTERS.toUpperCase() + NUMBERS;

// Capitalize the first letter in the string.  If there is a number
// before any letter, NOOP.
function capitalize(s) {
	for (var i = 0; i < s.length; i++) {
		if (ALPHA_NUMERIC.indexOf(s[i]) > -1) {
			return s.slice(0, i) + s[i].toUpperCase() + s.slice(i + 1);
		}
	}
	return s;
}

var comic_container = document.getElementById("comic");
var comic = (comic_container) ? comic_container.getElementsByTagName("img")[0] : null;
if (comic) {
	var title = document.createElement("p");
	var title_text = capitalize(comic.title);
	title_text = title_text.replace(/\si('m|'ll|'d)?\s/g, capitalize);
	title_text = title_text.replace(/[\.\?]\s+[^\d\s]+(\s|$)/g, capitalize);
	title.appendChild(document.createTextNode(title_text));
	with (title.style) {
		margin = '4px 70px 0 70px';
		padding = '4px';
		textAlign = 'left';
		fontStyle = 'italic';
		minHeight = '2.3em';
		if (GM_getValue("scale_up", false)) {
			fontSize = "2em";
		}
	}
	comic.parentNode.appendChild(title);
	comic.title = '';
	
	// resize image
	if (GM_getValue("scale_up", false)) {
		comic.width *= 2;
		comic.height *= 2;
	}
}

window.addEventListener("keypress", function(evt) {
	var url = document.location.href;
	if (evt.charCode == 'b'.charCodeAt(0)) {
		document.location.href = url.replace(/\/(\d+)\/$/, function(s) {
			return '/' + (parseInt(s, 10) - 1) + '/';
		});
	} else if (evt.charCode == 'n'.charCodeAt(0)) {
		document.location.href = url.replace(/\/(\d+)\/$/, function(s) {
			unsafeWindow.console.log('%o', arguments);
			return '/' + (parseInt(s, 10) + 1) + '/';
		});
	} else if (evt.charCode == '='.charCodeAt(0)) {
		GM_setValue("scale_up", true);
		document.location.reload();
	} else if (evt.charCode == '-'.charCodeAt(0)) {
		GM_setValue("scale_up", false);
		document.location.reload();
	}
}, false);
