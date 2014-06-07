// ==UserScript==
// @name           Facebook Share Bar Killer
// @namespace      http://www.pjtrix.com/
// @description    Kill the Facebook Share Bar
// @include        http://*facebook.com/ext/share.php*
// ==/UserScript==

var t = document.getElementById('page_table');
if (!!t){
	var findPattern = "//table[1]//tbody//tr//td//div[3]//a[1]";
	var links = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	if (typeof(links.snapshotItem(0).href) === 'string'){
		location.replace(links.snapshotItem(0).href);
	}
}
