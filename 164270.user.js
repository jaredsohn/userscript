// ==UserScript==
// @name        DX AU Currency
// @description Sets the currency to AUD
// @include     http*://*dx.com/*
// @version     1
// @run-at	document-start
// ==/UserScript==


if (document.cookie.indexOf('currency=AUD') === -1) {
	document.cookie = 'DXGlobalization=lang=en&locale=en-US&currency=AUD; domain=.dx.com; path=/';
}