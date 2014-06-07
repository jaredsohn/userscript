// ==UserScript==
// @name           forum.privet.com ugly userinfo fix
// @namespace      http://www.fruit6.com
// @description    Adjusts content of 'postdetails' spans that do not have line breaks.
// @include        http://forum.privet.com/*
// @include        https://forum.privet.com/*
// ==/UserScript==

window.addEventListener('load', function()
{	
function fixPrivet() {
	var aSpans = document.getElementsByTagName("span");

	for(i = 0; i < aSpans.length; i++) {
		var aClass = aSpans[i].className;
		if (aClass == "postdetails") {
			var innerValue = aSpans[i].innerHTML;
			var indicator = '</b>';
			var adjustment = indicator.length; // lenght of '</b>'
			var lastB = innerValue.lastIndexOf(indicator);
			if (lastB == -1) {
				continue;
			}
			var firstPart = innerValue.substring(0, lastB + adjustment);
			var lastPart = innerValue.substring(lastB + adjustment);

			var transformed = splitPart(lastPart);
			
			aSpans[i].innerHTML = firstPart + transformed;
		}
	}
}

function splitPart(value) {
	var step = 19;
	var result = '';
	var first = 0;
	var delimeter = ' ';

	while (first < value.length) {
		var portion = value.substring(first, first + step);
		portion = portion.replace("-", " -");
		portion = portion.replace("&gt;", "&gt; ");
		if (portion.lastIndexOf(' ') == -1) {
			portion += delimeter;
		}
		result += portion;
		first += step;
	}
	
	return result;
}

fixPrivet();

   
}, true);