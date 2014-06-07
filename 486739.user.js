// ==UserScript==
// @name        FeedsPortal ad skipper
// @namespace   http://userscripts.org/users/ablauch
// @description FeedsPortal automatic ad skipper
// @include     http://da.feedsportal.com/*
// @grant       none
// @version     1
// ==/UserScript==

var ifram = document.getElementsByTagName('iframe');

if (ifram && ifram.length > 0) {
    window.location = ifram[0].src;
}

var links = document.getElementsByTagName('a')

if (links.length > 0 && links[0].text == 'click here to continue to article') {
    window.location = links[0].href;
}
