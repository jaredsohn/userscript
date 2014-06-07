// ==UserScript==
// @name          Geody Clear Button
// @namespace     http://labs.geody.com/greasemonkey/
// @description   adds a clear button to Geody search result pages
// @author	      GeodyWorks
// @include       http://www.geody.*/geo*
// ==/UserScript==

var target = document.getElementById('hf');
if (target) {
	var button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('value', 'Clear');
	button.setAttribute('style', 'margin-left:0.25em');
	button.setAttribute('onclick', "var el=document.forms['qinp'].q;el.value='';el.focus()");
	target.parentNode.insertBefore(button, target.nextSibling);
}