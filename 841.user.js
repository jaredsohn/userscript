// ==UserScript==
// @name          Bloglines FeedBurner Ads Remover
// @namespace     http://sharedobject.org/greasemonkey
// @include       http://bloglines.com/*
// @include       http://www.bloglines.com/*

// ==/UserScript==

(function() {

    var imgs = document.getElementsByTagName("img");
    for(var i = 0; i < imgs.length; i++) {
        if(imgs[i].src.indexOf("feeds.feedburner.com/~a/") != -1) {
            imgs[i].style["display"] = "none";
        }
    }

})();