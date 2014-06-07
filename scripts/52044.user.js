// ==UserScript==
// @name           TC Stocks & Air+
// @namespace      http://userscripts.org/users/65879
// @description    adds linko into main menu to stock market
// @include        http://ww*.torn.com/* 
// @include        http://torn.com/* 
// ==/UserScript==


var allLinks, thisLink;
allLinks = document.evaluate(
'//a[@href]',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	hrefas = thisLink.href;
	if (hrefas.match("/events.php") && thisLink.target == "_self") {
		var elem=document.createElement('span');
		elem.innerHTML='<a title="Stock Market - Buy and sell shares" target="_self" href="/stockexchange.php">Stock Market</a> | <a title="Your portfolio" href="/stockexchange.php?step=portfolio">Portfolio</a><br> &#8226; <a title="Travel Agency" href="/airstrip.php">Travel X</a> |<a title="Travel to Mexico" href="/airstrip.php?step=mexico">MX</a> | <a title="Travel to Canada" href="/airstrip.php?step=canada">CA</a> | <a title="Travel to United Kingdom" href="/airstrip.php?step=uk">UK</a><br> &#8226; ';
		thisLink.parentNode.insertBefore(elem, thisLink);
	}
	if (hrefas.match("/awards.php") && hrefas.title != "undefined") {
		var elem2=document.createElement('span');		
		elem2.innerHTML=' | <a title="View personal stats" target="_self" href="/personalstats.php">My stats</a>';
		thisLink.parentNode.insertBefore(elem2, thisLink.nextSibling);
	}
}