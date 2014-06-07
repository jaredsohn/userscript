// ==UserScript==
// @name           Reddit Link Mover
// @namespace      http://arantius.com/misc/greasemonkey/
// @description    Move the save/hide/report links in reddit to the left, to maintain position.
// @include        http://reddit.com/
// @include        http://reddit.com/recommended
// @include        http://reddit.com/hot
// @include        http://reddit.com/new
// @include        http://reddit.com/browse
// ==/UserScript==

function xpath(p, context) {
	if (!context) context=document;
	var arr=[];
	var xpr=document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i=0;item=xpr.snapshotItem(i);i++){ arr.push(item); }
	return arr;
}

try {
	var linkCells=xpath('//td[@class="wide little"]');
} catch (e) {
	alert(e);
}

var x;
for (var i=0, cell=null; cell=linkCells[i]; i++) {
	x=cell.getElementsByTagName('form')[0];
	x.parentNode.insertBefore(x, x.parentNode.firstChild);

	x=cell.getElementsByTagName('span')[1];
	x.parentNode.insertBefore(x, x.parentNode.firstChild);

	x=cell.getElementsByTagName('span')[2];
	x.parentNode.insertBefore(x, x.parentNode.firstChild.nextSibling);
}
