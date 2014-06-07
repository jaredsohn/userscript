// ==UserScript==
// @name           Expand Digg Short URL
// @namespace      http://the-blair.com/greasemonkey
// @description    Eliminates all of the Digg style short URLs.
// @include        http://*
// ==/UserScript==

function gen_decode_url(shorturl)
{
	return 'http://services.digg.com/url/short' + 
		shorturl + '?appkey=http://dongola7.github.com/2009/04/13/remove-digg-bar.html&type=json';
}

function gen_cache_key(shorturl)
{
	return 'cache:' + shorturl;
}

function replace_link(link)
{
	var cacheKey = gen_cache_key(link.pathname);
	
	var cacheValue = GM_getValue(cacheKey, '');
	if(cacheValue == '')
	{
		var request = gen_decode_url(link.pathname);
		GM_xmlhttpRequest({method: "GET", url:request,
			onload:function(response) {
				response = eval('(' + response.responseText + ')');
				GM_setValue(cacheKey, response.shorturls[0].link);
				link.setAttribute('href', response.shorturls[0].link);
			}});
	}
	else
	{
		link.setAttribute('href', cacheValue);
	}
}

var regex = /d1[0-9a-zA-Z]{4}/
var links = document.getElementsByTagName('a');
for(i = 0; i < links.length; i++)
{
	var link = links[i];
	if(!link.hasAttribute('href'))
		continue;
		
	if(!regex.test(link.pathname))
		continue;
	
	replace_link(link);
}
