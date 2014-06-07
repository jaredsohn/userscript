//CC-BY, any version. blah blah blah.
//
// ==UserScript==
// @name           deviantDestroyer
// @namespace      http://lirodon.deviantart.com
// @description    gets rid of the idiotic footer of massive proportions of DAV6
// @include        http:/*.deviantart.com/*
// @exclude        http:/chat.deviantart.com/*
// ==/UserScript==

var footer = document.getElementById('depths');
if (footer) {
    footer.parentNode.removeChild(footer);
}