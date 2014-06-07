// ==UserScript==
// @name           everything-niwatori-egg
// @namespace      https://twitter.com/niwatori_egg
// @include        https://twitter.com/*
// ==/UserScript==

function hasClass(elm, className) {
    var c;
    if (c = elm.getAttribute("class")) {
        var classes = c.split(" ");
        for(var i = 0; i < classes.length; i++) {
            if(classes[i] == className) {
                return true;
            }
        }
        return false;
    }
}

function runOnTweets(callback) {
    var elems = document.getElementsByClassName("stream-item");
    for(var i = 0; i < elems.length; i++) {
        callback(elems[i]);
    }
    document.addEventListener("DOMNodeInserted", function(e) {
        if(hasClass(e.target, "stream-item")) {
            callback(e.target);
        }
    }, true);
}

window.addEventListener("load", function() {
    runOnTweets(function(tweet) {
        var twimg = tweet.getElementsByTagName("img")[0];
        twimg.src = "http://a0.twimg.com/profile_images/1541207078/l_02_normal.jpg";
    });
}, false);
