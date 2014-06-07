// ==UserScript==
// @name           nocats
// @namespace      nocats
// @include        http://ask.metafilter.com/
// @include    http://ask.metafilter.com/index.cfm*
// ==/UserScript==

 
 

(function () {
     
    var xpath = "//div[@class='copy']";

    var candidates = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
		if(cand.innerHTML.indexOf('my cat') > 0) {
			cand.style.display = 'none';
		} 
    }

})();
