// ==UserScript==
// @name        Lazy browsing
// @namespace   http://bcome.nl/
// @include     http://www.cheerupemokid.com/comic/*
// @description Enables you to use the cursor keys to navigate to the next or previous image
// @version     1.0.2
// ==/UserScript==
function KeyCheck(e)
{
	switch(e.keyCode) {
		case 37:
			window.location.replace(document.getElementsByClassName('pref')[0].href);
			break;
		case 39:
			window.location.replace(document.getElementsByClassName('next')[0].href);
			break;
	}
}

window.addEventListener('keydown', KeyCheck, true);