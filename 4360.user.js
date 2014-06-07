// ==UserScript==
// @name           BlogListViewer
// @namespace      http://wangii.life365.com
// @description    View life365's blog list correctly
// @include        http://*life365.com/php/lifebook/iframe_blog_main.php*
// ==/UserScript==
//
// Yes, life365's blog list is sh*t in Firefox. Here is a easy fix.
// Blame bosses!
//

function XPathQuery(query){
	return document.evaluate(
		query,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
}

var divs=XPathQuery('//a/div/div');

for(var i=0;i<divs.snapshotLength;i++){
	var div=divs.snapshotItem(i);
	div.parentNode.parentNode.innerHTML=div.innerHTML;
}
