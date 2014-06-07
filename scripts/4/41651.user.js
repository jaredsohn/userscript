// ==UserScript==
// @name           Download tabs
// @namespace      dtab
// @description    Download tabs
// @include        http://www.grattable.fr
// ==/UserScript==
//
//   v 1.0 2008Sep11 - initial release
//
// Replace http://www.grattable.com/index.php?page=tablature&id_tab=1529 
// by http://www.grattable.com/index.php?down=1529


var search = 'page=tablature&id_tab';  
var replace = 'changed=1&down';	


var allImgs, alinks;
allImgs = document.evaluate(
    '//div[@class="b_box_contenu"]//a',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allImgs.snapshotLength; i++) {
    alinks = allImgs.snapshotItem(i);
    if (alinks.href.match(search)) {
		alinks.href = alinks.href.replace(search, replace);
}
}
