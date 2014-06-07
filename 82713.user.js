// ==UserScript==
// @name           Proxy Flickr on Tunisia
// @namespace      Proxy Flickr on Tunisia
// @description    Proxy Flickr on Tunisia
// @author	   MGM
// @include        http://*.flickr.com/*
// @version        2.0 1-Nov-2010
// ==/UserScript==

function beginsWithStr(s1,s2)
{
	return s1.slice(0,s2.length) == s2;
}


if (beginsWithStr(location.href,'http://www.flickr.com') )
{
	location.href = location.href.replace(/www.flickr.com/, 'www1.flickr.com');
}
