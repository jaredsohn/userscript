// ==UserScript==
// @name	New York Times Convert Popups
// @namespace	http://www.kentd.com/greasemonkey/
// @description	Rewrites New York Times links to convert javascript popups to regular links; derived from neugierig.org version
// @include	*nytimes.com*
// ==/UserScript==

(function() {
  var xpath = "//a[contains(@href,'javascript:pop_me_up2(')]";
  var res = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;
  for (i = 0; link = res.snapshotItem(i); i++) {
	var singleQuotes = new Array();
	var index=0;
	for(z=0; z<2; z++) {
		index = link.href.indexOf("'", index + 1);
		singleQuotes[z] = index;
	}
    link.href = link.href.substring(singleQuotes[0]+1, singleQuotes[1]);
	add = 0;
  }
})();