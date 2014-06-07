// ==UserScript==
// @name           Tweet this Flickr
// @description    Adds "Tweet this" to the button bar, and its own section in the "Share This" menu. Should work in Google Chrome, too.
// @author         dcxxcd
// @version        0.1
// @namespace      tweet_this_flickr
// @include        http://www.flickr.com/photos/*
// @include        http://flickr.com/photos/*
// ==/UserScript==
// Base58 decoder from Mark Whitaker (bitrot) http://bitrot.net/ 
//     http://userscripts.org/scripts/show/56364
(function() {
    var version = '0.1';
    // some photos don't have this <link rev="canonical"> tag
    // if it's not there, compute it: http://www.flickr.com/groups/api/discuss/72157616713786392/
    var xpath = "//link[@rev='canonical']";
    var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var theUrl = "";
    if (res.snapshotLength > 0) {
        theUrl = res.snapshotItem(0).href;
    } else {
        var m = window.location.href.match(/^https?:\/\/[^/]*\bflickr\.com\/photos\/[^/]+\/(\d+)/i);
        if (m.length && m[1]) {
            var base58alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
            theUrl = "http://flic.kr/p/" + (function(num) {
                if (typeof num !== "number") num = parseInt(num);
                var enc = "";
                var div = num;
                var mod = 0;
                while (num >= 58) {
                    div = num / 58;
                    mod = (num - (58 * Math.floor(div)));
                    enc = "" + base58alphabet.substr(mod, 1) + enc;
                    num = Math.floor(div);
                }
                return (div ? ("" + base58alphabet.substr(div, 1) + enc) : enc);
            })(m[1]);
        }
    }
    
    var tweeter = null;
    xpath = "//ul[@id='ShareOptions']";
    res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    // some pictures don't have a "Share This" widget
    if (res.snapshotLength > 0) {
        tweeter = document.createElement('li');
        tweeter.setAttribute('id', 'SharingTweetIt');
        tweeter.setAttribute('class', 'share_options');
        tweeter.innerHTML = '<div class="sharing_options_header">Tweet it</div><div class="sharing_options_inner"><a href="http://twitter.com/home?status=Nice%20picture:%20' + theUrl + '"><img src="http://img255.imageshack.us/img255/8625/shareicontwitter.gif" height="16"/>Tweet</a></div>';
        res.snapshotItem(0).appendChild(tweeter);
    }
    xpath = "//div[@id='button_bar']";
    res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    tweeter = document.createElement('a');
    tweeter.setAttribute('href', 'http://twitter.com/home?status=Nice%20picture:%20' + theUrl);
    tweeter.style.background = "white";
    tweeter.innerHTML = '<img src="http://img255.imageshack.us/img255/8625/shareicontwitter.gif"/>';
    res.snapshotItem(0).appendChild(tweeter);
})();