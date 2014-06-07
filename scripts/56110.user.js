// ==UserScript==
// @name           Always watch in english
// @namespace      spde2en
// @include        http://www.southpark.de/*
// ==/UserScript==

if(location.href.indexOf('lang=en') == -1)  {
	if(location.href.indexOf('?')== -1)
		location.href = location.href + '?lang=en';
	else
		location.href = location.href + '&lang=en';
}