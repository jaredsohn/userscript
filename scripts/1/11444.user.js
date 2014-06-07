// ==UserScript==
// @name           Poxnora Trade Options Cleaner
// @namespace      http://www.dp.cx.com/userscripts
// @include        http://www.poxnora.com/trader/*
// ==/UserScript==

var oldOfferingFunction = unsafeWindow.addToOffering;

function addToOffering(type,id) {
	var rl = document.getElementById('runesList');
	var curR = rl.options[rl.selectedIndex];
	if (curR.text.match(/\((\d+)\)/)) {
		var numcount = RegExp.$1;
		if (numcount > 1) {
			numcount--;
			curR.text = curR.text.replace(/^(.*?) \(\d+\)$/, "$1 (" + numcount + ")");
		} else {
			rl.options[rl.selectedIndex] = null;
		}
	}
    return oldOfferingFunction(type,id);
}

unsafeWindow.addToOffering = addToOffering;