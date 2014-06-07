// ==UserScript==
// @name           postcounter
// @namespace      http://userscripts.org/users/33073
// @description    postzahl wird neben [PM] angezeigt
// @include        http://forum.mods.de/bb/thread.php*
// ==/UserScript==

(function() {
	var trs = document.evaluate("//a[contains(@href, 'rcpt') and text() = 'pm']", document, null, 6, null), tr, i = 0;
	while (tr = trs.snapshotItem(i++)) {
		var count = document.createElement("strong");
			count.textContent = "#"+i;
		tr.parentNode.appendChild(count);
	}
}());