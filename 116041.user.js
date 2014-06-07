// ==UserScript==
// @name          FacebookAction Remover
// @description   Remove actions panel in chat on fb
// @include     	http://*.facebook.com/*
// @include             https://*.facebook.com/*
// @version       2011.10.21
// ==/UserScript==

function $(id) {
	return document.getElementById(id);
}

$( 'pagelet_ticker' ).style.display = 'none';