// ==UserScript==
// @name           URL de-uglifier
// @namespace      skayleen.deviantart.com
// @description    Fixes ugly URLs.
// @version        0.1a
// @include        http://*.deviantart.com/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

$('.shadow a').each(function () {
	this.href = $(this).attr('href').replace(/\?q\=.*/, '#');
});