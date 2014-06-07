// ==UserScript==
// @name       YouTube: Click a username and see their videos!
// @namespace  http://github.com/epitron/
// @version    0.1
// @description  When you click a username, instead of seeing that lame youtube user's "summary" page, you get their actual list of videos (sorted by date).
// @include     http://*.youtube.com/*
// @include     https://*.youtube.com/*
// @copyright  2013 epitron
// ==/UserScript==

(function() {
    
    var mergeNodes = function(a, b) {
        return [].slice.call(a).concat([].slice.call(b));
    };

    var links1 = document.getElementsByClassName("yt-user-name");
    var links2 = document.getElementsByClassName("related-channel");
    
    var userlinks = mergeNodes(links1, links2);
    
    for (var i = 0; i < userlinks.length; i++) {
        userlinks[i].pathname  += "/videos";
    }
    
})();