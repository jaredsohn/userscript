// ==UserScript==
// @name           bleis-shinku
// @namespace      https://twitter.com/bleis
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
        if (twimg.getAttribute("data-user-id") == '18864444') {
            twimg.src = "http://a1.twimg.com/profile_images/1479592511/favorite--irotoridorinosekai--shinku_normal.png";
        }
    });
}, false);
