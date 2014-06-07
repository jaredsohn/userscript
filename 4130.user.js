// ==UserScript==
// @name          Select-InputBox
// @namespace     http://patraulea.com/gm/
// @description   Press Ctrl-/ to select the first input box on a page
// @include       *
// ==/UserScript==

// Author: Bogdan Harjoc <patraule@gmail.com>

function selectInput(ev)
{
	if (! (ev.charCode == 47 /* ord('/') */ && ev.ctrlKey))
		return;

	var texts = document.evaluate("//input[@type='text']", document, 
		null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	texts.snapshotItem(0).focus();
}
	
window.addEventListener("keypress", selectInput, true);	

