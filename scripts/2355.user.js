// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Titan Mouse Over", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Titan Mouse Over
// @namespace     http://www.math.tamu.edu/~wmoreira
// @description   Remove the actions for mouseover in TitanTV
// @include       http://*titantv.com*
// ==/UserScript==

(function () {
    var thiselt;
    var alla = document.evaluate('//table[@class="gridTable"]//a[@onmouseover]',
                                 document, null,
                                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i=0; i<alla.snapshotLength; i++) {
	thiselt = alla.snapshotItem(i);
        thiselt.setAttribute('onmousedown', thiselt.getAttribute('onmouseover'));
        thiselt.removeAttribute('onmouseover');
    }
})();
