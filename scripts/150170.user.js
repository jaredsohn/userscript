// ==UserScript==
// @name        WordQQs1
// @author		NotARealDev
// @license		GPL 2.0+
// @namespace   AA
// @description Hides users registration from Recent Changes
// @include     http://wiki.armagetronad.org/index.php/Special:RecentChanges
// @version     1
// ==/UserScript==

var xp = document.evaluate('//*[@title="Special:Log/newusers"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (xp.length == 0) return false;
for (var i = 0; i < xp.snapshotLength; i++) {
	xp.snapshotItem(i).parentNode.style.display = 'none';
}
return true;