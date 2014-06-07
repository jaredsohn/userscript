// ==UserScript==
// @name           Turkish Hotmail Page Fix
// @namespace      http://www.burakkalkan.com
// @include        http://loginnet.passport.com/*
// @include        https://loginnet.passport.com/*
// ==/UserScript==

var dilKoduIndex = window.location.href.indexOf('&lc=') + 4;
var dilKodu = window.location.href.slice(dilKoduIndex, dilKoduIndex + 4);

if (dilKodu != '1055')
{
	var fixedUrl = window.location.href.slice(0, dilKoduIndex) + '1055' + window.location.href.slice(dilKoduIndex + 4);
	window.location = fixedUrl;
}