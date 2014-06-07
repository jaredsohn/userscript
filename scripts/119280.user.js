// ==UserScript==
// @name          erepublik daily order helper
// @namespace     erepublik daily order helper
// @description   avoid worng side
// @include        http://www.erepublik.com/en
// ==/UserScript==
var allLinks,thisLink,battleid,flag,i;
allLinks = document.evaluate(
	'//a[@href][@class="blue_beauty"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thisLink=allLinks.snapshotItem(0);
battleid=thisLink.getAttribute('href').split('/')[4];
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://api.erepublik.com/v2/feeds/battles/'+battleid,
	headers: {
	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(responseDetails) {
		var parser = new DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText,
		"application/xml");
		var entries = dom.getElementsByTagName('is-resistance');
		title = entries[0].textContent;
		if(title=='true')
		{
		thisLink.href='http://www.erepublik.com/en/military/battlefield-choose-side/'+battleid+'/14';
	}
	}
});