// ==UserScript==
// @name           Disable Focus on Window Load
// @namespace      http://userscripts.org/
// @description    Counteract onload=element.focus()
// @include        http://weather.yahoo.com/*
// ==/UserScript==

function disableFocus(evt) {
	if (evt.target.nodeName == "#document") {
		var input_elements = document.getElementsByTagName('input');
		for (var i = 0; i < input_elements.length; i++) { 
    		input_elements[i].blur();
   		}
	}
}

window.addEventListener('load', disableFocus, true);
