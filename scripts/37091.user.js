// ==UserScript==
// @name           text umbruch zeilen dings zu lang of doom
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @include        http://forum.mods.de/bb/thread.php*
// ==/UserScript==

var names = document.evaluate("//td[@align='left' and @vAlign='top']//b/a[@onclick or @onClick and starts-with(@href, 'javascript:')][string-length(.) > 18]", document, null, 6, null), i;
for (i=0; i<names.snapshotLength; i++) {
	names.snapshotItem(i).innerHTML = names.snapshotItem(i).innerHTML.slice(0, 19) + "<br/>" + names.snapshotItem(i).innerHTML.slice(19);
}