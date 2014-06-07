// ==UserScript==
// @name           DotNgalih & ImgRapid Bypasser
// @namespace      ceefour
// @description    Bypass dot.ngalih.com and imgrapid.com waiting time.
// @include        http://dot.ngalih.com/*
// @include        http://www.imgrapid.com/*
// ==/UserScript==

if (typeof(unsafeWindow.downloadlink) == 'string')
	location.href = unsafeWindow.downloadlink;
