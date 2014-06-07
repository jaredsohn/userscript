// ==UserScript==
// @name           Ben Hyde - Fix Title
// @namespace      http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Remove the 'Blog Archive Â» ' from the title
// @include        http://enthusiasm.cozy.org/*
// ==/UserScript==

document.title = document.title.replace(/Blog Archive Â» /, "");


