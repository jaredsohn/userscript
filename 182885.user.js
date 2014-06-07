// ==UserScript==
// @name       Filmovizija + Adblock
// @namespace  http://nemanjan00.com/
// @version    0.5
// @description  Filmovizija + Adblock
// @include     http://*.filmovizija.com/*
// @copyright  2014, nemanjan00
// ==/UserScript==

window.onload = function () {
	var divs= document.getElementsByTagName('div');
	var change = true;
	while(change){
		change = false;

		for (var i = 0, len = divs.length; i < len; ++i) {
			if(divs[i] != undefined){
				if(divs[i].innerHTML.indexOf("AdBlock") != -1 || divs[i].style.getPropertyValue("opacity") == 0.7) {
					divs[i].parentNode.removeChild(divs[i]);
					change = true;
				}
			}
		}
	}
}