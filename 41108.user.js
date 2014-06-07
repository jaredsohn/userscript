// ==UserScript==
// @name          Amazon Affiliate Killer
// @namespace     http://nabolog.seesaa.net/
// @description   Sanitize Amazon affiliate and tracking links!
// @date          2009-11-03
// @version       0.4.1
// @include       http://*
// @include       https://*
// ==/UserScript==

(function() {
var allLinks = document.getElementsByTagName("a");

for (i = 0; i < allLinks.length; i++)
{
	var href = allLinks[i].href;
	if(href.match(/\.amazon\./))
	{
		var hoge = href.replace(/([?&]tag=|\/)([\w-]+)-(20|22)/,'').replace('/ref=nosim','/').replace(/&(creative.*|camp|linkCode|s|n|o)=([\w-]+)/g,'').replace(/[?&]+$/,'').replace('%3A',':');
		allLinks[i].setAttribute("href", hoge);
	}
}
})();
