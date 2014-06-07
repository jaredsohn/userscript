// ==UserScript==
// @name           xhamsterProfiles
// @namespace      http://userscripts.org/user
// @description    xHamster show user profiles
// @include        http://xhamster.com/user/*
// @exclude        http://xhamster.com/user/*new-1.html
// ==/UserScript==

window.addEventListener('load', function() {
   var firstPart = 'http://xhamster.com/user/';
   var lastPart = window.location.href.match(/user\/(.*)/)[1];
   window.location.href = firstPart + 'video/' + lastPart + '/new-1.html';
}, false);