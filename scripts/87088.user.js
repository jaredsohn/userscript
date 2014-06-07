// ==UserScript==
// @name           Remove MSNBC bottom toolbar
// @namespace      msnbcRemoveToolbar
// @include        *msnbc.msn.com*
// @include        *.msnbc.com*
// ==/UserScript==

GM_addStyle("#toolbar, #tbcontainer {display:none !important; visibility:hidden !important;}");