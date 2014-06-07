// ==UserScript==
// @name           Basecamp: Hide upgrade messages
// @namespace      http://userscripts.org/scripts/show/81205
// @description    Hide upgrade messages for free accounts
// @include        http://*.basecamphq.com/*
// @include        https://*.basecamphq.com/*
// ==/UserScript==

GM_addStyle(
	"#upgrade_from_free, .free_pitch { display:none; }"
);