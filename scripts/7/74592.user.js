// ==UserScript==
// @name           UserScript css bugfix
// @namespace      userscriptscss
// @version        0.8
// @include        http://userscripts.org/*
// @require        http://usocheckup.dune.net/74592.js?method=install
// ==/UserScript==

//Scripts description
GM_addStyle("#full_description {clear:both;float:none;min-height:300px;padding:15px}");

//search input
GM_addStyle("#header #script_search input[type='text'] {border:1px solid #FF7700;height:12px;line-height:16px;margin-top:0;width:180px;-moz-border-radius: 3px}");

//footer
GM_addStyle(".postactions {float:none;}");

//facebook floating window
GM_addStyle("#facebox .tl, #facebox .tr, #facebox .bl, #facebox .br {width:9px}#facebox td {border:medium none}");

GM_addStyle("h3 { margin-bottom:0;margin-top:1em;}");

GM_addStyle("#right input {border:1px solid #666666;-moz-border-radius: 3px}");

GM_addStyle("body.wide #content { overflow-x: inherit;} ");