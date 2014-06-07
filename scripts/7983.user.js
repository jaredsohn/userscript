// ==UserScript==
// @name WarpMyMind Hide paid scripts
// @namespace http://cbwhiz.blamethepixel.com/greasemonkey
// @version 0.1
// @author CBWhiz
// @description Hides scripts you must pay for on warpmymind.com
// @include http://*warpmymind.com/modules.php?name=Files*
// ==/UserScript==

function xp(x, s) {
	if (s == undefined) {
		s = document;
	}
	return document.evaluate(x, s, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xplen(xp) {
	return xp.snapshotLength;
}
function xpget(xp, i) {
	return xp.snapshotItem(i);
}

(function() {
		q = xp("//tr/td/form/b//text()[contains(.,'$')]/../../../.. | //tr/td/     b//text()[contains(.,'$')]/../../..");
		for(n = 0; n < xplen(q); n++) {
			cur = xpget(q, n);
			//cur is <tr> tag
			if (cur) {
				if (cur.style) {
    					cur.style.display='none';
				}
			}
		}
})();