// ==UserScript==
// @name			Google SERP Click Tracking Disabler
// @namespace		googleSERPClickTrackingDisabler
// @include			http*://*.google.tld/search?*
// @datecreated		2010-01-29
// @lastupdated		2010-01-29
// @version			0.1
// @author			Erik Vergobbi Vold
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript disables Google's click tracking for search results.
// ==/UserScript==

(function(doc){
	var results = doc.evaluate("//h3[contains(@class,'r')]/a[contains(@class,'l')]",doc,null,6,null),
		r;
	for(var i=results.snapshotLength-1;i>-1;i--){
		r = results.snapshotItem(i);
		r.removeAttribute('onmousedown');
		r.parentNode.replaceChild(r.cloneNode(true),r);
	}
})(document);