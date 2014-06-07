// ==UserScript==
// @name           Engadget - Fix Title
// @namespace      http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Remove the www.engadget.com from the <title>
// @include        http://engadget.com/*
// @include        http://*.engadget.com/*
// ==/UserScript==

document.title = document.title.replace(/ - www\.engadget\.com/, "");


