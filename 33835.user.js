// ==UserScript==
// @name           Bugzilla.Mozilla Linkifier
// @namespace      http://userscripts.org/forums/2/topics/9141
// @description    Converts plain-text 'Bug 123456' references into Bugzilla.Mozilla.org clickable links; idea thanks to RazorXL, script thanks to 'Mikado'
// ==/UserScript==

var RE = /bug (\d+)/i;

for (var tx = document.evaluate('//text()[normalize-space(.)!=""]', document, null, 6, null), t, i = 0; t = tx.snapshotItem(i); i++) {
	var before =  t.textContent, st, matched = false;
	if (['STYLE', 'SCRIPT', 'A'].indexOf(t.parentNode.tagName) != -1) continue;
	while ((st = before.search(RE)) != -1) {
		t.parentNode.insertBefore(document.createTextNode(before.substr(0, st)), t);
		with (t.parentNode.insertBefore(document.createElement('a'), t))
			textContent = RegExp.lastMatch,
			href = 'https://bugzilla.mozilla.org/show_bug.cgi?id=' + RegExp.$1;
		matched = true;
		before = before.substr(st + RegExp.lastMatch.length);
	}
	if (matched) t.textContent = before;
}

