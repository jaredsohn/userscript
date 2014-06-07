// ==UserScript==
// @name           Simple Machines notifications only
// @namespace      http://userscripts.org/scripts/show/125492
// @description    Leaves only notifications on Simple Machines forums.
// @include        */index.php?action=profile;area=notification*
// ==/UserScript==
GM_addStyle(".content, .botslice, .topslice, .cat_bar, .windowbg.description, #header, #left_admsection{ display: none !important; }");