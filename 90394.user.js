// ==UserScript==
// @name		Google preview killer
// @namespace		inactivist & Cthulhu
// @description		Removes google preview popup window
// @include		http://*.google.*
// @include		https://*.google.*
// ==/UserScript==

var del = 0;
var fprw = document.getElementsByTagName('div');
for (var i=0; i<fprw.length; i++) {
	if (fprw[i].id == 'vspb') fprw[i].innerHTML='';
}

// 
// Kill preview buttons
var td = document.evaluate("//*[contains(@class,'vspib')]", 
	document, 
	null, 
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
	null);

for (var i=0; i<td.snapshotLength; i++) {
	var item = td.snapshotItem(i);
	item.style.display='none';
	item.style.visibility='hidden';
	item.display='none';
	item.visibility='hidden';
}