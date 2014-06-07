// ==UserScript==
// @name           AnimeStatic Clean Up
// @namespace      animestatic.com
// @description    Cleans up ads and space around videos. Coming Soon: Auto-start embedded video.
// @include        http://www.animestatic.com/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @grant          GM_xmlhttpRequest
// ==/UserScript==

$(document).ready(function()
{
	removeElem('discovery');
	removeClass('span4');
});

function removeElem(id)
{
	document.removeChild( document.getElementById(id) );
}
function removeClass(className)
{
	document.removeChild( document.getElementsByClassName(className)[0] );
}