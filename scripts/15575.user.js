// ==UserScript==
// @name          Ncix_linkstrip
// @description   Strips the JS link warning on the NCIX forums
// @include       http://forum.ncix.com/*
// @include       http://forums.ncix.com/*
// ==/UserScript==

var alinks = document.body.getElementsByTagName("A");


for (i = 1; i < alinks.length; i++)
{
	if (alinks[i].href.match(/javascript:if/i))
	{
		var url = alinks[i].href.match(/link=http:?.*',''/i);
		url = String(url).replace(/link=/gi, "");
		url = String(url).replace(/',''/gi, "");
		alinks[i].href = unescape(url);
	}
	else if (alinks[i].href.match(/productdetail2.php\?/i))
      	{
      		var url = alinks[i].href.match(/sku=?.*',''/i);
      		url = String(url).replace(/',''/gi, "");
      		alinks[i].href = unescape('http://www.ncix.com/products/index.php?' + url);
      	}
}