// ==UserScript==
// @namespace     example.com
// @name          Convert Amazon.* to Amazon.co.uk
// @description   Convert Amazon links from all other countries to United Kingdom
// @include       *
// @exclude       *.amazon.*
// @exclude       *.google.*
// ==/UserScript==


function getSearch(key,url)
{
	if(url==''||url==undefined||url=='undefined'){url=windon.location.search}
	url=unescape(url.replace('?','&'))
	l1=url.indexOf('&'+key+'=')+key.length+2
	l2=(url.substr(l1)+'&').indexOf('&')
	return url.substr(l1,l2)
}

var a = document.getElementsByTagName("a");
for (var i=0;i<a.length;i++)
{
	if(a[i].href.indexOf('www.amazon')!==-1||a[i].href.indexOf('http://amazon')!==-1)
	{
		creativeasin=getSearch('creativeASIN',a[i].href)
		keywords=getSearch('keywords',a[i].href)
		tag='metasearch03-21'
		if(creativeasin!==''||creativeasin!==undefined||creativeasin!=='undefined')
		{
			a[i].href='http://www.amazon.co.uk/exec/obidos/redirect?tag='+tag+'&path=ASIN/'+creativeasin
		}
		else if(keywords!==''||keywords!==undefined||keywords!=='undefined')
		{
			{a[i].href='http://www.amazon.co.uk/gp/search?ie=UTF8&index=aps&tag='+tag+'&keywords='+keywords}
		}
	}
}
