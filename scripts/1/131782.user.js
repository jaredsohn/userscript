// ==UserScript==
// @name        Reddit Sticky Navigation Top Bar
// @namespace   http://use.i.E.your.homepage/
// @version     0.2
// @description Keep the subreddit navigation bar in one place! 
// @include       http://www.reddit.com/r/*
// @run-at      document-end
// ==/UserScript==


(function() {
    var navBar = document.getElementById('sr-header-area');
    var header = document.getElementById('header');
    console.log(navBar);
    navBar.setAttribute('style','z-index:99999;position:fixed;top:0;left:0;right:0;');
    header.setAttribute('style','margin-top:19px;');
    
})();