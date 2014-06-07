// ==UserScript==
// @name           CS2 Planet Info Jump Links
// @namespace      CS
// @include        http*://*.chosenspace.com/index.php?go=planet_info&planet_id=*
// ==/UserScript==
alltags=document.evaluate("//a[contains(@href,'view=sector&system_id=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	var resys=/&system_id=\d*/;
	var resec=/&sector_id=\d*/;
	var url=thistag.getAttribute('href');
	var sys=resys.exec(url);
	var sec=resec.exec(url);
	var span=document.createElement('span');
	span.appendChild(document.createTextNode(' - ['));
	var newlink=document.createElement('a');
	newlink.setAttribute('href','functions/hyperjump.php?'+sys+sec+'&grid_id=190');
	newlink.textContent="HJ";
	span.appendChild(newlink);
	span.appendChild(document.createTextNode('] - ['));
	var newlink=document.createElement('a');
	newlink.setAttribute('href','functions/lightspeed.php?'+sys+sec+'&grid_id=190');
	newlink.textContent="LS";
	span.appendChild(newlink);
	span.appendChild(document.createTextNode(']'));
	thistag.parentNode.insertBefore(span,thistag.nextSibling);
}