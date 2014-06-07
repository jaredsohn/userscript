// ==UserScript==
// @name           sunsolve.sun.com Bug ID Linkifier
// @description    Converts plain text bug IDs on sunsolve.sun.com into bug tracker links. Based on Mikado's "replace" script.
// @include        http://sunsolve.sun.com/search/document.do*
// ==/UserScript==

var BASEURL = 'http://bugs.opensolaris.org/bugdatabase/view_bug.do?bug_id=';
var RE = new RegExp("([0-9]{7})");

for (var tx = document.evaluate('//text()[normalize-space(.)!=""]', document, null, 6, null), t, i = 0; t = tx.snapshotItem(i); i++) {
	var before =  t.textContent, st, matched = false;
	if (['STYLE', 'SCRIPT', 'A'].indexOf(t.parentNode.tagName) != -1) continue;
	while ((st = before.search(RE)) != -1) {
		t.parentNode.insertBefore(document.createTextNode(before.substr(0, st)), t);
		with (t.parentNode.insertBefore(document.createElement('a'), t))
			textContent = RegExp.lastMatch,
			href = BASEURL + RegExp.$1;
		matched = true;
		before = before.substr(st + RegExp.lastMatch.length);
	}
	if (matched) t.textContent = before;
}
