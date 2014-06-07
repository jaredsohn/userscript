// ==UserScript==
// @name           iGoogle deFooter
// @namespace      iGoogle
// @description    Remove the footer links
// @include        *google.com/ig*
// ==/UserScript==

GM_addStyle("#footerwrap a, #footerwrap p { display: none !important; }");
