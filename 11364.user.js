// ==UserScript==
// @name add alt to images without alt
// @autor pojo(pojo@o2.pl)
// @site http://userscripts.org/scripts/show/11364
// @date Mon Aug 13 2007 03:32:21 GMT+0200
// @include *
// ==/UserScript==

(function () {

list = document.evaluate(
    "//img[string-length(@alt)<1]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < list.snapshotLength; i++) {
	var next = list.snapshotItem(i);
	next.setAttribute('alt','image' + (i+1) + ' description');
	//next.setAttribute('alt',next.src);
}

})();
