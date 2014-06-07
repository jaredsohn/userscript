// ==UserScript==
// @name           hb ban beta
// @namespace      vladislav
// @description    Убирает с главной страницы футбольных блогов следы жизнедеятельности флудеров. Список флудеров надо редактировать в самом скрипте.
// @include        http://football.hiblogger.net/



var flooders = new Object();
var flooders;


flooders[1] = 'fdfnjh';
flooders[2] = 'rbwz';

function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}


    for ( keyVar in flooders ) {
$x("//div/a[contains(@href,'"+flooders[keyVar]+"/profile')]").forEach(function(img) {
	var entry = img.parentNode.parentNode.parentNode;
	entry.parentNode.removeChild(entry);		
});
}





// ==/UserScript==