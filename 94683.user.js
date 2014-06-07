// ==UserScript==
// @name           Minethings Blue Items
// @namespace      xelab
// @include        http://*.minethings.com/*
// ==/UserScript==

GM_addStyle((<><![CDATA[
td.item-blue a { color: #0040ff; }
td.item-blue a:hover { color: #0000ff; }
]]></>).toString());