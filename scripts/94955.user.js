// ==UserScript==
// @name           Rena recept
// @author         Dwoo
// @version        2012-05-28
// @namespace      http://userscripts.org/94955
// @description    Rensar upp recept för utskrift
// @include        http://www.alltommat.se/recept/*/print
// ==/UserScript==

GM_addStyle('.image, .adtag, .vvbox, #ccolflow, div#page script + div { display: none; } '+
	'#page { width: auto !important; } ' +
	'.left { margin-right: 20pt; } '+
	'.right { float: none !important; width: auto !important; }');