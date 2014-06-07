// ==UserScript==
// @name          Flyertalk Adremove
// @namespace     http://www.stud.ntnu.no/~aase/
// @include       http://*flyertalk.com/forum/showthread.php*
// @description	  Removes Sponsored Links ads in threads on Flyertalk
// ==/UserScript==

(function() {
	var xpath = '//tr[td="Sponsored Links"]/ancestor::div[@align="center"]';
	var ads = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var ad;
	var i;
	for(i=0;(ad=ads.snapshotItem(i));i++) {
		ad.style.display = 'none';
	}
})();