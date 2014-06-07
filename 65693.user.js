// ==UserScript==
// @name           Socjum GTFO for uiq3.eu
// @namespace      d_s
// @description    Skrypt usuwa denerwujące reklamy i przerwy w wątkach między postami. Używać razem z AdBlockiem.
// @author         dark_skeleton
// @include        http://www.uiq3.eu/viewtopic.php?*
// @version        1.0
// @date           2010-01-04
// ==/UserScript==

(function() {
var glupieReklamy = document.evaluate("//body/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/center", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = glupieReklamy.snapshotLength - 1; i >= 0; i--) {
		var elm = glupieReklamy.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		elm.parentNode.removeChild(elm);
	}
})();