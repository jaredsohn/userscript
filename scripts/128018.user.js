// ==UserScript==
// @name        Browsershots.org Auto-extend (fixed)
// @description Extends the time periodically, until all screenshots are generated.
// @namespace   http://userscripts.org/users/88482
// @include     http://browsershots.org/http://*
// ==/UserScript==

var statusBox = document.getElementsByClassName('status_box')[0];

// Find the first text node child of .status_box > p
var textNode = statusBox.getElementsByTagName('p')[0].firstChild;
while(textNode.nodeType !== Node.TEXT_NODE) {
	textNode = textNode.nextSibling;
}

var match = textNode.nodeValue.match (/Expires in ([0-9]+) minutes/);
var button = statusBox.getElementsByClassName('extend')[0];

if (match && button) {
	var minutes = parseInt(match[1]);		
	if (button.disabled) {
		window.setTimeout (function () { window.location.reload(); }, 60000);
	} else {
		window.setInterval(function() {
			minutes--;
			textNode.nodeValue = textNode.nodeValue.replace(/(Expires in )[0-9]+( minutes)/, '$1'+minutes+'$2');
			
			if(minutes < 10) {
				var e = document.createEvent("HTMLEvents");
				e.initEvent("click", true, true);
				button.dispatchEvent(e);
			}
			
		}, 60000);
	}
}