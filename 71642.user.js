// ==UserScript==
// @name           playing.se refresh
// @namespace      nooo
// @include        http*playing.se*
// ==/UserScript==

if (document.body.innerHTML.indexOf("Could not find database table or another error occured.") > -1)
{
	location.reload();
}