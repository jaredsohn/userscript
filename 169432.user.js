// ==UserScript==
// @name        Show broken images placeholders
// @namespace   http://userscripts.org/ewolfman
// @include     http://*
// @version     1
// ==/UserScript==

GM_addStyle("@-moz-document url-prefix(http), url-prefix(file) {img:-moz-broken{-moz-force-broken-image-icon:1;width:24px;height:24px;}}");