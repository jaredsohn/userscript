// Greek and Latin dictionary helper
// version 0.1
// 2007-03-29
// Copyright (c) 2007, Daniel Muenter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          Greek and Latin dictionary helper
// @namespace     http://gainsford.tripod.com/dict.htm
// @description   Combo-box and Field Default Value.
// @include       http://gainsford.tripod.com/dict.htm
// ==/UserScript==
//
// -----------------------------------------------------------------------------

var select = xpath("//select[@name='type']").snapshotItem(0);
select.firstChild.selected = false;
var selectoptions = select.childNodes;
for(var i=0;i<selectoptions.length;i++) {
	if(selectoptions[i].value == 'exact') selectoptions[i].selected = true;
}
select = xpath("//select[@name='lang']").snapshotItem(0);
select.firstChild.selected = false;
selectoptions = select.childNodes;
for(var i=0;i<selectoptions.length;i++) {
	if(selectoptions[i].value == 'la') selectoptions[i].selected = true;
}

var input = xpath("//input[@name='lookup']").snapshotItem(0);
input.value = "s";
input.focus();

function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

