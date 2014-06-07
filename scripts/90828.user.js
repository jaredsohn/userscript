// ==UserScript==
// @name           Always Be Autocompletin'
// @namespace      net.miell.abac
// @description    Disable the autocomplete="off" attribute on all form controls, everywhere.
// @include        *
// ==/UserScript==

(function ()
{
	var l = document.evaluate("//input[@autocomplete='off']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < l.snapshotLength; i++) {
		l.snapshotItem(i).setAttribute("autocomplete", "on");
	}
})();
