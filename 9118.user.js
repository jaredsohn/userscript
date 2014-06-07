// ==UserScript==

// @name           Dan.co.il form fixer

// @namespace      http://userscripts.org/users/605

// @description    Fixes the display of the search form at dan.co.il

// @include        http://www.dan.co.il/*

// ==/UserScript==

selects = document.getElementsByTagName('select');
i = 0;
while(elm=selects.item(i++)) {
	if (elm.getAttributeNode('class').value=='sel') {
		elm.style.fontSize = '12px';
		elm.style.overflow = 'scroll';
	}
}