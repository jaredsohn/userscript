// ==UserScript==
// @name           Youtube Uglyforest Proxy
// @namespace      Youtube Uglyforest Proxy
// @description    Simple  Youtube redirect around m86 webfilters. Current version using Https://www.Uglyforest.com/beach. Not for video watching, all scripts automatically turn off in ugly forest at the moment and i am working on a download the videos trough this proxy as it gets blocked by m86 i shall update both to another one.
// @include        http://youtube.com/*
// @include        http://www.youtube.com/*
// ==/UserScript==

var url = window.location.href;

function beginsWithStr(s1,s2)
{
	return s1.slice(0,s2.length) == s2;
}


if (!beginsWithStr(url,'https://www.uglyforest.com/beach/'))
{
	location.href = location.href.replace(url, 'https://www.uglyforest.com/beach/browse.php?u=Bg6wbWq49v%2F3WaafqfkLtpt3&b=29&f=norefer' );
}