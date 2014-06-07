// ==UserScript==
// @name           Lemonfont Keys
// @namespace      http://userscripts.org/users/ilwaz
// @description    Navigate lemonfont's greatest series with your arrow keys.
// @include        http://www.lemonfont.com/SS_*
// @include        http://www.lemonfont.com/DD_*
// ==/UserScript==

var nextButton, prevButton;

function init() {
	var table = document.getElementsByTagName("table")[0],
		tds = table.getElementsByTagName("td");

	prevButton = tds[1].getElementsByTagName("a")[0];
	nextButton = tds[3].getElementsByTagName("a")[0];

	document.onkeyup = keyHandle;
}

function keyHandle(e) {
	if (e.keyCode == 39) { //right key
		nextButton.click();
	} else if (e.keyCode == 37) { //left key
		prevButton.click();
	}
}

init();