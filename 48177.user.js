// ==UserScript==
// @name           LA - Autofill ClanBank
// @namespace      Legendarena
// @include        *legendarena.com/clan.php?action=clanbank
// ==/UserScript==

var a,s,money;
allLinks = document.evaluate(
	'//td[@class="stats"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
	s=allLinks.snapshotItem(1).innerHTML;
	a=s.indexOf(":");
	money=parseInt(s.substring(a+1,s.length));
	
allLinks = document.evaluate(
	'//input[@name="howmuch"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
	allLinks.snapshotItem(0).value=money;