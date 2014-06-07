// ==UserScript==
// @name           WordPress.com Bar Remover
// @description    Removes the WordPress.com upper navigation bar
// @include        http://*wordpress.com/*
// ==/UserScript==

removeBar();

function removeBar()
{
    GM_addStyle("#wpcombar {display: none;}");
	GM_addStyle("body {padding-top: 0;}")
}