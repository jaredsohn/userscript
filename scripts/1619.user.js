// ==UserScript==
// @name           Signal vs. Noise - Fix Title
// @namespace      http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Remove the '(by 37signals)' from the <title>
// @include        http://37signals.com/*
// @include        http://*.37signals.com/*
// ==/UserScript==

document.title = document.title.replace(/ \(by 37signals\)/, "");


