// ==UserScript==
// @name           Prisjakt link to properties, not prices
// @namespace      
// @description    Changes product links on {www.}prisjakt.[nu|se] to point to product information, not prices
// @include        http://www.prisjakt.se/*
// @include        http://prisjakt.se/*
// @include        http://www.prisjakt.nu/*
// @include        http://prisjakt.nu/*
// ==/UserScript==

(function ()
{
	// Don't change links from the other product tabs
	if (window.location.href.indexOf('produkt.php') == -1){
		var a, link, href;
		a = document.evaluate(
			'//a[contains(@href, \'produkt.php\')]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var j = 0; j < a.snapshotLength; j++) {
			link = a.snapshotItem(j);
			href = link.href;
			if (href = href.replace(/produkt\.php\?p=/gi, 'produkt.php?e=')){
				link.href = href;
			}
	
		}
	}
})();

