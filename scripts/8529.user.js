// ==UserScript==
// @name           Binsearch Functions
// @namespace      http://madmax.wash.st/~scott/userscripts
// @description    Adds some buttons to binsearch
// @include        *binsearch.info/?*
// @include        *binsearch.info/browse.php?*
// @include        *binsearch.info/index.php?*
// ==/UserScript==


setAllRows = function(check) {
	var cb = document.evaluate("//tr//input[@type='checkbox']",	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<cb.snapshotLength; i++) {
		if (check ^ cb.snapshotItem(i).checked) {
			var mouseClick = document.createEvent("MouseEvents");
				mouseClick.initMouseEvent("click", true, true, window,
				0,0,0,0,0, false, false, false, false, 0, null);
			cb.snapshotItem(i).dispatchEvent(mouseClick);
		}
	}
}

selectAll = function() { setAllRows(true); }
selectNone = function() { setAllRows(false); }

function addButtons() {
	var buttons = document.evaluate("//tbody/tr/td//input[@type='button']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var b = buttons.snapshotItem(0);

	if (b) {
		btnAll = document.createElement('input');
		btnAll.setAttribute('type', 'button');
		btnAll.setAttribute('value', 'Select All');
		btnAll.className = 'b';
		btnNone = document.createElement('input');
		btnNone.setAttribute('type', 'button');
		btnNone.setAttribute('value', 'Select None');
		btnNone.className = 'b';
	
		b.parentNode.insertBefore(btnAll, b);
		b.parentNode.insertBefore(btnNone, b);
		b.parentNode.insertBefore(document.createTextNode(' '), btnNone);
		b.parentNode.insertBefore(document.createTextNode(' '), b);
	
		btnAll.addEventListener('click', selectAll, true);
		btnNone.addEventListener('click', selectNone, true);
	}
}

addButtons();
