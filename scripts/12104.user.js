// ==UserScript==
// @name           deviantART: Shadow Killer
// @author         Glue
// @version        0.1
// @namespace      http://glue.deviantart.com/
// @description    Flattens deviantART.
// @include        http://*.deviantart.com*
// ==/UserScript==

// shadows come from http://sh.deviantart.com/shadow/

(function() {

var shadows = document.evaluate('//span[@class="shadow"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for ( var i = 0; i < shadows.snapshotLength; i++ ) {
	shadows.snapshotItem(i).style.setProperty("background-image", "none", "important");
	shadows.snapshotItem(i).style.setProperty("padding", "0", "important");
}

})();