// ==UserScript==
// @name           ifileit auto request download ticket
// @namespace      ifileitautoticket
// @include        http://ifile.it/*
// ==/UserScript==

function click(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
	elm.dispatchEvent(evt);
}

function clickTheButton() {
	var requestBtn = document.getElementById('requestBtn');
	if(requestBtn) {
		click(requestBtn);
	} else {
		click(document.getElementById('downloadBtn'));
	}
}

setTimeout(clickTheButton, 600);