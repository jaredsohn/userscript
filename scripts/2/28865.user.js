// ==UserScript==
// @name           oldStyle
// @namespace      http://userscripts.org/users/33073/scripts
// @description    alternierende farben für posts
// @include        http://forum.mods.de/bb/thread.php*
// ==/UserScript==

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, 6, null);
	for (i=0; item=xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

var rows = $x("//tr[@bgcolor = '#394e63']");
rows.forEach(function(row, i) {
	row.style.backgroundColor = (i%2) ? "#222E3A" : "#394e63";
});