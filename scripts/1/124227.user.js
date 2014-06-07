// ==UserScript==
// @name twitter-url
// @namespace http://naonie.com/projects/twitter_expand_url.html
// @description expand shorten twitter short links in tweet body
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version 0.2
// @include https://twitter.com/*
// ==/UserScript==

var TwitterUrl = {

    set_cache: function(short_url, full_url) {
        $.data(document.body, short_url, full_url);
    },

    get_cache: function(short_url) {
        return $.data(document.body, short_url);
    },

    search_links: function($tweet_text) {
        /* used only in conversion */
        var i, short_url, short_url_in_cache, full_url, $link,
            links = $tweet_text.find(".twitter-timeline-link"),
            len = links.length;

        for (i=0; i<len; i++) {
            $link = $(links[i]);
            /* link has no protocol name */
            short_url = $link.html();

            /* cache used for pane out short url lookup */
            short_url_in_cache = this.get_cache(short_url);
            if (short_url_in_cache) {
                /* dealt with attr event, which twitter try to resolve all
                   shortened url
                 */
                full_url = short_url_in_cache;
            } else {
                /* on tweet text inserted event, dealt with some extreme case,
                   where innerHTML haven't been expanded.
                 */
                full_url = $link.attr("data-expanded-url");
            }

            this.expand_link($link, short_url, full_url);
        }
    },

    expand_link: function($target, short_url, full_url) {
        /* twitter triggered two times modify event, second time retrieve the
           full url
        */
        if (short_url !== full_url) {
            if (full_url.indexOf(short_url) === -1) {
                /* skip not unshortened urls, save only short_url->full_url
                   in cache*/
                this.set_cache(short_url, full_url);
            }

            $target.html(full_url);

            if (full_url.indexOf("http") === 0) {
                $target.prop("href", full_url);
                $target.prop("title", full_url);
                /* in case some tweets has non-expanded url on this attribute */
                $target.attr("data-expanded-url", full_url);
            }
        }
    },

    shortened: function(e) {
        var $target = $(e.target);

        if (!$target.hasClass("twitter-timeline-link")) {
            return;
        }

        $(window).trigger("ShortenUrlResolve", {"target": $target});
    },

    poppedout: function(e, data) {
        var $target = data.tweet_popped_out;

        TwitterUrl.search_links($target.find(".tweet-text"));
    },

    shorten_resolve: function(e, data) {
        var $target = data.target,
            full_url = $target.attr("data-ultimate-url"),
            short_url = $target.html();

        TwitterUrl.expand_link($target, short_url, full_url);
    }
}

/* url is shortended , .main-content use to filter DOMAttrModified events comes
   out of pane out event, which is interfere changes of attributes(auto set
   value back) */
$(window).on("DOMAttrModified", "",
    TwitterUrl, TwitterUrl.shortened);

/* on page load up, twitter try to resolve shortened url automatically */
$(window).on("ShortenUrlResolve", TwitterUrl.shorten_resolve);

/* click on tweet-body, side pane pop out */
$(window).on("SidepanePopout", TwitterUrl.poppedout);

