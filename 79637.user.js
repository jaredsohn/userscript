// ==UserScript==
// @name           TabStop to WhiteSpace Replacer
// @namespace      http://userscripts.org/users/allen0960
// @description    Replace [TabStop] in <PRE> with [WhiteSpace] characters
// @include        *
// ==/UserScript==

(function() {
	var a = document.evaluate("//pre/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<a.snapshotLength; i++) {
		var t = a.snapshotItem(i);
		if (t.data.search(/\t/g) != -1) {
			t.data = t.data.replace(/\t/g, "    ");
		}
	}
})();
