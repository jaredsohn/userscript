// ==UserScript==
// @name twitter-filter
// @namespace http://naonie.com/projects/twitter-filter.html
// @description filter noise from foursquare, instagram, etc
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require http://documentcloud.github.com/underscore/underscore-min.js
// @include https://twitter.com/*
// @version 0.1.1
// ==/UserScript==

/*
hard to do:

while we are processing tweet text, the expand url haven't happened, have to
record the insert event, and replay it after url is ready.
*/
var TwitterFilter = {
    init: function(e) {
        var $tweet = $(e.target),
            that = e.data.that,
            is_tweet = $tweet.hasClass("js-stream-item");

        if (is_tweet) {
            that.tweet_handler($tweet, e.data);
        }
    },

    filters: [
        "instagr.am",
        "4sq.com",
    ],

    opitons: {
    },

    set_tweet_id_cache: function(key) {
        /* to filter multiple modify event, only process tweet once */
        $.data(document.body, key, 1);
    },

    is_tweet_in_cache: function(key) {
        return _.has($.data(document.body), key);
    },

    tweet_handler: function($tweet, d) {
        var tweet_nodes = $tweet.find(".js-tweet-text").contents(),
            tweet_id = $tweet.attr("data-item-id"), text;

        if (!d.that.is_tweet_in_cache(tweet_id)) {
            text = d.that.tweet_text(tweet_nodes);
            d.that.set_tweet_id_cache(tweet_id);
            if (d.that.is_hide_tweet(text)) {
                $tweet.hide();
            }
        }
    },

    tweet_text: function(tweet_nodes) {
        var len = tweet_nodes.length,
            texts = [], i, tmp, $child, text;

        for (i = 0; i < len; i++) {
            $child = $(tweet_nodes[i]);
            tmp = $child.text();
            texts.push(tmp);
        }

        text = texts.join("");
        return text.toLowerCase();
    },

    is_hide_tweet: function(text) {
        var i = this.filters.length,
            filter;

        while (i--) {
            filter = this.filters[i];
            if (text.indexOf(filter) !== -1) {
                return true;
            }
        }

        return false;
    }
}

$(window).on("DOMAttrModified", "", {"that": TwitterFilter},
    TwitterFilter.init);

