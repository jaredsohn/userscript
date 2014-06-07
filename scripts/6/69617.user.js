// ==UserScript==
// @name           Bong Bong
// @namespace      net.miell.bongbong
// @description    Boing Boing without the idiots
// @include        http://*boingboing.net/*
// ==/UserScript==

(function ()
{
	// The main posts
	var x = "//a[contains(@href,'xeni-jardin') or contains(@href, 'cory-doctorow')]/ancestor::div[@class='post']";
	// Features on the sidebar
	x += "|//div[@class='caption' and (contains(., 'By Xeni Jardin') or contains(., 'By Cory Doctorow'))]/parent::div[@class='featured']"
	// Self-promotion on the sidebar
	x += "|//p[@class='headline' and (contains(., 'Xeni') or contains(., 'Cory'))]//parent::div[@class='card']";
	var l = document.evaluate(x, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < l.snapshotLength; i++) {
		l.snapshotItem(i).parentNode.removeChild(l.snapshotItem(i));
	}
})();
