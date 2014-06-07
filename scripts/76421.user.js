// ==UserScript==
// @name           Yesterdays Google
// @namespace      420MuNkEy
// @description    Simple script that rewrites the language parameter in the url to 'all'. For some reason this parameter still uses the old/better style.
// @include        *.google.tld/*
// ==/UserScript==

// I am aware that the navigation bar at the top is slightly different.
// This is a quick hack to exploit the fact that Google hasn't yet raped the style.
// Google might decide to "update" this. When/if they do, this won't work and it won't be updated.

//V2 - Added 'else' statement that will append the language parameter if absent from a url.

if (location.href.match(/.*[\?&]hl=(?!all)/i)) {
	location.href = location.href.replace(/(.*[\?&]hl=)[a-z]+(.*)/i, '$1all$2');
}
else if (location.href.match(/^.*\?(?:(?!hl=).)*$/i)) {
	location.href = location.href.replace(/^(.*\?(?:(?!hl=).)*)$/i, '$1&hl=all');
}