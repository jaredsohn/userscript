// ==UserScript==
// @name           Social Me Popup Fixer
// @namespace      http://mathemaniac.org
// @description    Fixes the popup info-boxes on the People page
// @include        http://apps.facebook.tld/socialme/list/*
// ==/UserScript==

GM_addStyle((<r><![CDATA[
	td.pop_border, td.pop_topleft, td.pop_topright, td.pop_bottomleft, td.pop_bottomright {
		display: none
	}                   
  ]]></r>).toString());
  
var il = document.evaluate('//table[contains(@class,"pop_dialog_table")]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var i = il.iterateNext();
var boxes = new Array();
while (i) { ni = il.iterateNext(); boxes.push(i); i = ni; }

for (var i = 0; i < boxes.length; i++) {
	var box = boxes[i];
	var sib = box.nextSibling;
	
	box.parentNode.removeChild(box);
	
	var div = document.createElement('div');
	div.className = "popcontent_advanced";
	div.setAttribute('style', 'width: 240px');
	box.setAttribute('style', 'width: 240px');
	
	div.appendChild(box);
	
	sib.parentNode.insertBefore(div, sib);
}