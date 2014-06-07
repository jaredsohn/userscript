// ==UserScript==
// @name           reddit SFW
// @include        http://*reddit.com/*
// ==/UserScript==

window.addEventListener('load', function() {
    unsafeWindow.jQuery('img[src*="nsfw"]').attr('src', 'http://i.imgur.com/pwvLR.jpg');
},
false );