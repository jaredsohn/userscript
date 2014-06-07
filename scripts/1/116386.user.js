// ==UserScript==
// @name          ml-class-code-css
// @namespace     motus/ml-class-code-css
// @version       1.2
// @description   Sets font style to monospace for `code` sections on ml-class.org forums.
// @include       http://www.ml-class.org/*
// @copyright     2011 Sergiy Matusevych, Henning Otte
// ==/UserScript==

GM_addStyle("code { font-family: monospace; } pre code { display: block; padding: 0.5em; padding-left: 3em; background: #F0F0F0; }");

