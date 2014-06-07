// ==UserScript==
// @name        Backlot Social Box Closer
// @namespace   http://userscripts.org/users/parolles/
// @description Closes the annoying social media box on thebacklot.com articles
// @include     http://www.thebacklot.com/*
// @version     2
// @grant       none
// ==/UserScript==
setTimeout(function() {
    var elems = document.getElementsByTagName("div");
    for(var i in elems) {
        if(elems[i].className == "article_share_close_button") {
            elems[i].click();
        }
    }
}, 1000);
