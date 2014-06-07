// ==UserScript==
// @name           Fedora Wiki - Distinguish visited links
// @namespace      http://allenhasley.dyndns.org
// @description    Add CSS rule to distinguish visited links using a different color
// @include        http://fedoraproject.org/wiki/*
// ==/UserScript==

GM_addStyle("a:visited {color: purple !important;}");