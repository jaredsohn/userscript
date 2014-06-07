// ==UserScript==
// @name           Youtube Frogtunnel Proxy
// @namespace      Youtube Frogtunnel Proxy
// @description    Youtube Frogtunnel Proxy
// @include        http://youtube.com/*
// @include        http://www.youtube.com/*
// @include        http://www.youtube.com/watch*
// ==/UserScript==

var url = window.location.href;

function beginsWithStr(s1,s2)
{
	return s1.slice(0,s2.length) == s2;
}


if (!beginsWithStr(url,'http://www.frogtunnel.com'))
{
	location.href = location.href.replace(url, 'http://frogtunnel.com/images/vajdngq.php?u=' + url);
}
