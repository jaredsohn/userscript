// ==UserScript==
// @name        iHate4sq&Instagram
// @namespace   https://twitter.com/number23_cn
// @description Filters twitter.com tweets from FourSquare and Instagram
// @include https://twitter.com/*
// @include http://twitter.com/*
// @version     2010.11.11
// ==/UserScript==

// Copyright (c) 2010 number23_cn
// https://twitter.com/number23_cn

(function() {
    var filter = function(tweet) {
        var contentDOM = tweet.getElementByClass("tweet-text");
        var content = (contentDOM.length > 0) ? contentDOM[0].textContent : "";
        if (content == null || content.length == 0)
            content = "";
        if (content.indexOf("http://4sq.com") != -1 || content.indexOf("http://instagr.am") != -1)
            tweet.style.display = "none";
    };

    document.addEventListener("DOMNodeInserted", function(event) {
        var element = event.target;
        var tweets = element.getElementsByClassName("stream-item");
        for (var i = tweets.length - 1; i >= 0; i -= 1) {
            filter(tweets[i]);
        }
    }, false);
})();
