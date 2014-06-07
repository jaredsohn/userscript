// ==UserScript==
// @id             steamcommunity.com-4a86da1a-f077-4c1b-b68f-f7b89d96db42@scriptish
// @name           Steam Firefox Menu Fix
// @version        0.1
// @namespace      http://crct.de
// @include        http://steamcommunity.com/*
// @include        https://steamcommunity.com/*
// @author         kshade
// @description    Makes the invite links (and others) work in Firefox again. No more [Object object]!
// @run-at         document-end
// ==/UserScript==

var links = document.getElementsByTagName('a');
for (var i=0; i<links.length; i++) {
    var ahref = links[i].getAttribute('href');
    if (ahref.startsWith('javascript:')) {
        links[i].setAttribute('onclick', ahref.substr(11));
        links[i].removeAttribute('href');
    }
}