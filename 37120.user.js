// ==UserScript==
// @name           UDBrain Frame Fix
// @namespace      http://userscripts.org/users/72447
// @description    Removes the broken UDBrain #revive_frame from Urban Dead pages.
// @include        http://www.urbandead.com/map.cgi*
// @include        http://urbandead.com/map.cgi*
// ==/UserScript==

setTimeout(function()
{
	var el = document.getElementById('revive_frame');
	el.parentNode.removeChild(el);
}, 10);
