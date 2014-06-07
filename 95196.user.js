// ==UserScript==
// @name           Youtube DaveProxy
// @namespace      Youtube DaveProxy
// @description    Youtube DaveProxy
// @include        http://youtube.com/*
// @include        http://www.youtube.com/*
// @include        http://www.youtube.com/watch*
// ==/UserScript==

var url = window.location.href;

function beginsWithStr(s1,s2)
{
	return s1.slice(0,s2.length) == s2;
}


if (!beginsWithStr(url,'http://nextfab.fr/proxy/'))
{
	location.href = location.href.replace(url, 'http://nextfab.fr/proxy/index.php?q=' + url);
}