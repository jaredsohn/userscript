// ==UserScript==
// @name           403 Reload (all sites)
// @namespace      http://userscripts.org/users/133663
// @description    Script "Error 403 reload", modified for all sites.
// @include        http://*
// ==/UserScript==

if (/Error 403/.test(document.title)){
	window.location.href = window.location.href;
}

if (/403 Forbidden/.test(document.title)){
	window.location.href = window.location.href;
}