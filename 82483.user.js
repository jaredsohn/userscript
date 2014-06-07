// ==UserScript==
// @name           NoUglyNavigatorMenu
// @namespace      http://egoldal.net/
// @include        http://www.autonavigator.hu/*
// ==/UserScript==

window.onload = disableuglymenu();

function disableuglymenu() {
	var divs = document.getElementsByTagName('div');
	for (var i=0;i<divs.length;i++) {
		if (divs[i].className=='kismenu') {
			divs[i].style.display = 'none';
		}
	}
}

