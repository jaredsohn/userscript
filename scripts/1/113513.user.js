// ==UserScript==
// @name          Mantis colorchange
// @description   Changes the colors indicating the current ticket status to the old ones used i.a. in "Mantis v1.1.0".
// @include       https://mantis.gameforge.com/*
// ==/UserScript==

//Colorchange
var lines;
lines = document.evaluate(
    '//tr[@bgcolor] | //td[@bgcolor]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for(var i = 0; i < lines.snapshotLength; i++) {
	var currentline = lines.snapshotItem(i);
	switch(currentline.getAttribute('bgcolor')) {
		case '#ffcd85': { //acknowledged (yellow)
			currentline.setAttribute('bgcolor', '#ffd850');
			break;
		}
		case '#e3b7eb': { //feedback (purple)
			currentline.setAttribute('bgcolor', '#ff50a8');
			break;
		}
		case '#d2f5b0': { //resolved (green)
			currentline.setAttribute('bgcolor', '#cceedd');
			break;
		}
		case '#fcbdbd': { //new (pink)
			currentline.setAttribute('bgcolor', '#ffa0a0');
			break;
		}
		case '#c9ccc4': { //closed (gray)
			currentline.setAttribute('bgcolor', '#e8e8e8');
			break;
		}
		case '#fff494': { //confirmed (light yellow)
			currentline.setAttribute('bgcolor', '#ffffb0');
			break;
		}
		case '#c2dfff': { //assigned (light gray)
			currentline.setAttribute('bgcolor', '#c8c8ff');
			break;
		}
	}
}