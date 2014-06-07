// ==UserScript==
// @name           Highrise: Hide upgrade links
// @namespace      http://userscripts.org/scripts/show/98215
// @description    Hide upgrade links in 37signals Highrise
// @include        http://*.highrisehq.com/*
// @include        https://*.highrisehq.com/*
// ==/UserScript==

GM_addStyle(
	"#upgrade_bar { display:none; }"
);