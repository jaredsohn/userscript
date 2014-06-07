// ==UserScript==
// @name           Unclutter mymathforum
// @namespace      http://userscripts.org/crg4
// @include        http://mymathforum.com/*
// ==/UserScript==

if (window.location.href.match(/mymathforum.com(\/(index\.php)?)?$/)) {
	GM_addStyle('dl dt, dl dt * {font-size: 1px !important; color: transparent !important}\n' +
	'dl dt a.forumtitle {font-size: 15pt !important; color: #105289 !important}\n');
}

GM_addStyle('#page-header {display: none}');