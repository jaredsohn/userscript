// ==UserScript==
// @name           Channel 9 - Fix Title
// @namespace      http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Replace the '(Logged in as: ___)' with '(Channel 9)' in the title
// @include        http://channel9.msdn.com/*
// ==/UserScript==

document.title = document.title.replace(/\(Logged in as: [a-z]*\)/, "(Channel 9)");


