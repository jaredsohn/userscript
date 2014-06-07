// ==UserScript==
// @name           swinguru_forum_links
// @namespace      http://night.fears.org/swinguru
// @description    fixes swinguru's main page
// @include        http://www.forum.swinguru.co.il/
// @include        http://forum.swinguru.co.il/
// @include        http://www.forum.swinguru.co.il/?*
// @include        http://forum.swinguru.co.il/?*
// @include        http://www.forum.swinguru.co.il/index.php*
// @include        http://forum.swinguru.co.il/index.php*
// ==/UserScript==
(function () {	var xpath = "//a[@class='forumlink']/preceding-sibling::*[1]/self::a";
	var preAs = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);	
	for(var i=0; i<preAs.snapshotLength; i++) {
		var preA = preAs.snapshotItem(i);		preA.nextSibling.href = preA.href;	}})();