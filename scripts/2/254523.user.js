// ==UserScript==
// @name           TAU 12h to 24h change
// @date           07/01/2014
// @namespace      http://www.tauniverse.com
// @description    Changes TA Universe time from 12-hour to 24-hour clock
// @include        http*://*.tauniverse.*
// @grant          none
// @version        0.1
// @creator        Rime <plobex@gmail.com>
// ==/UserScript==

function nf(x)
{
	if (x < 10) {
		return "0" + x;
	} else {
		return x;
	}
}

function getTextNodes(oNode, aText)
{
	for (var i = 0; i < oNode.childNodes.length; i++) {
		var oChild = oNode.childNodes.item(i);
		switch(oChild.nodeType) {
		case 1:
			getTextNodes(oChild, aText);
			break;
		case 3:
			aText.push(oChild);
			break;
		}
	}
}

var text = [];
getTextNodes(document, text);

for (var i = 0; i < text.length; i++) {
	var elem = text[i];
	var str = elem.nodeValue;
	var timestr = str.match(/(\d{1,2}):(\d{2})\s+([AP]M)/);
	if (timestr != null) {
		var newtimestr = nf((parseInt(timestr[1]) + (timestr[3] == 'PM' ? 12 : 0))) + ':' + timestr[2];
		elem.nodeValue = str.replace(timestr[0], newtimestr);
	}
}