// ==UserScript==
// @name           4Chan Remove [Return]
// @namespace      http://userscripts.org/
// @include        http://*.4chan.org/*/res/*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace('[<a href="../imgboard.html" accesskey="a">Return</a>]', '');