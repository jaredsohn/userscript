// ==UserScript==
// @name           RedHotPawn.com-cleanup
// @namespace      http://localhost/
// @description    Remove annoying navigation, ads
// @include        http://www.redhotpawn.com/core/playchess.php?*
// @include        http://www.redhotpawn.com/myhome/myhome.php
// ==/UserScript==

var item_to_replace  = $x("//body[@id='docbody_id']")[0];
var replace_with     = $x("//body[@id='docbody_id']/div[@id='clubsTabMenu']/following-sibling::div[1]/following-sibling::div[1]")[0];

var stuff_to_remove = [
	"//div[@id='footer']",
	"//h1[@class='consoletitle']/parent::div[@class='consolecontent']/parent::div/parent::td",
	"//h2[@class='sectiontitle' and contains(text(), 'Recent Messages')]/following::*",
	"//h2[@class='sectiontitle' and contains(text(), 'Recent Messages')]",

];


function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

item_to_replace.parentNode.replaceChild(replace_with, item_to_replace);

stuff_to_remove.forEach(
	function(xpath) {
		$x(xpath).forEach(
			function(item) {
				item.parentNode.removeChild(item);
			}
		);
	}
);