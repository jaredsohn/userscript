// ==UserScript==
// @name          Highlight warning points in the postbit
// @namespace 	  http://www.thestudentroom.co.uk/
// @include       http://www.thestudentroom.co.uk/showthread.php*
// @include       http://www.thestudentroom.co.uk/showpost.php*
// ==/UserScript==

var warnings = /\b(Warning points\S\s(\d)+)\b/;

for (var tx = document.evaluate('//text()[normalize-space(.)!=""]', document, null, 6, null), t, i = 0; t = tx.snapshotItem(i); i++) {
	var before =  t.textContent, st, matched = false;
	if (t.parentNode.tagName == 'STYLE' || t.parentNode.tagName == 'SCRIPT') continue;
	while ((st = before.search(warnings)) != -1) {
		t.parentNode.insertBefore(document.createTextNode(before.substr(0, st)), t);
		with (t.parentNode.insertBefore(document.createElement('span'), t))
			textContent = RegExp.$1,
			style.cssText = 'color: #FF0000;';
		matched = true;
		before = before.substr(st + RegExp.$1.length);
	}
	if (matched) t.textContent = before;
}
