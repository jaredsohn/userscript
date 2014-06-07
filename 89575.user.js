// ==UserScript==
// @name           Youtube - Proxy
// @namespace      Youtube - Proxy
// @description    Youtube - Proxy
// @include        http://*
// @include        https://*
// ==/UserScript==

var url = window.location.href;

function beginsWithStr(s1,s2)
{
	return s1.slice(0,s2.length) == s2;
}


if (!beginsWithStr(url,'https://www.sneakme.net'))
{
	location.href = location.href.replace(url, 'https://www.sneakme.net/browse.php?u=' + url);
}
