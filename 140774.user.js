// ==UserScript==
// @name        Jokakoti.fi parannuksia
// @namespace   http://gm.taistelumarsu.org/
// @include     http://www.jokakoti.fi/kohde/*
// @include     http://jokakoti.fi/kohde/*
// @version     1
// ==/UserScript==

function clickTheRightOne(className) {
	elems = document.getElementsByClassName(className);
	for (i in elems) {
		elem = elems[i];
		if (elem.tagName.toUpperCase() == 'A') {
			elem.click();
			return;
		}
	}
}

window.addEventListener('keyup', function(e) {
	switch (e.keyCode) {
		case 37:
			clickTheRightOne('left');
			break;
		case 39:
			clickTheRightOne('right');
			break;
		default:
			break;
	}
});