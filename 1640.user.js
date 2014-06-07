Ã¯Â»Â¿// ==UserScript==
// @name           Hackaday - Fix Title
// @namespace      http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Remove the 'www.hackaday.com' from the title
// @include        http://www.hackaday.com/*
// @include        http://hackaday.com/*
// ==/UserScript==

document.title = document.title.replace(/ - www.hackaday.com _/, "");