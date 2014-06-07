// ==UserScript==
// @name           Nexusmods old links->new links redirector
// @namespace      http://userscripts.org/users/gensmeta/
// @description    Converts legacy mod links, which are often found in outdated descriptions from other mods etc, into new - currently accepted - link URLs.
// @include        http://*.nexusmods.com/*
// ==/UserScript==

if(window.location.href.search("mods/file.php?id=")>=0)
	window.location=window.location.href.replace("mods/file.php?id=","mods/");