// ==UserScript==
// @name          ALT Tooltips
// @namespace     http://www.arantius.com/article/arantius/alt+tooltips+for+firefox/
// @description	  For all images with an alt and no title, copy the alt to the title, to make them visible as tooltips.
// @include       *
// ==/UserScript==

//
// Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
//
// If possible, please contact me regarding new features, bugfixes
// or changes that I could integrate into the existing code instead of
// creating a different script.  Thank you
//

dump('===== Load ALT Tooltips =====\n');

(function () {
var res = document.evaluate("//area|//img", 
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var i, el;
for (i=0; el=res.snapshotItem(i); i++) {
	if (''==el.title && ''!=el.alt) el.title=el.alt;
}
})();