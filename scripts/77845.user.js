// ==UserScript==
// @name           reddit.com SFW
// @namespace      
// @description    Makes reddit.com completely SFW
// @include        http://www.reddit.com/*
// ==/UserScript==

var l = document.getElementsByClassName('over18');
while (l.length > 0) {
    l[0].parentNode.removeChild(l[0])
}