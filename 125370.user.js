// ==UserScript==
// @name           Slingbox Player Shoutcuts
// @description 
// @author         Kai Lin
// @include        newwatch.slingbox.com/*
// @version        2012.10
// ==/UserScript==

var btnFullscrn = document.getElementById('fullscreen');

function KeyCheck(e) {
	switch (e.keyCode) {
		case 27:  //Esc
			btnFullscrn.click();
  			break;
		case 13:  //Enter
			btnFullscrn.click();
			break;
		case 70:  //F
			btnFullscrn.click();
			break;
	};
}

window.addEventListener('keydown', KeyCheck, true);