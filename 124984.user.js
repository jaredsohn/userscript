// ==UserScript==
// @name twitter-rt
// @namespace http://naonie.com/projects/twitter_rt.html
// @description traditional rt for twitter
// @version 0.3.3
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include https://twitter.com/*
// ==/UserScript==

var TwitterRT = {
    g: {
        rt_bg_color: "",
    },

    insert_rt_archor: function(e) {
        var $target = $(e.target),
            has_style = $target.hasClass("js-user-style"),
            is_component_node = $target.hasClass("component"),
            is_reply_tweet = $target.hasClass("in-reply-to"),
            is_timeline_tweet = $target.hasClass("js-stream-item"),
            is_click_on_tweet = $target.hasClass("js-tweet-details-fixer");

        if (has_style) {
            /*
             * each time the user js loaded means the page switched
             */
            e.data.that.g.rt_bg_color = "";
            e.data.that.set_rt_icon_background_color();
        }

        if (is_timeline_tweet || is_click_on_tweet || is_reply_tweet || is_component_node) {
            e.data.that.set_rt_icon_background_color();
            e.data.that.append_rt_to_actions($target);
        }

    },

    rt_action_template: function() {
        return ['<li class="action-quote-container">',
                '<a class="with-icn js-action-quote" title="RT" href="#">',
                '<i class="action-quote"></i>', '<b>RT</b>', '</a>',
                '</li>'].join("");
    },

    set_rt_icon_background_color: function() {
        /*
         * find no eleganter way to check and set color only once
         */
        var user_color = $(".sm-fav").css("color");

        if ((!this.g.rt_bg_color && user_color) || this.g.rt_bg_color !== user_color) {
            GM_addStyle(".action-quote { background-color:"+user_color+";}");
            this.g.rt_bg_color = user_color;
        }
    },

    append_rt_to_actions: function($target) {
        var $tweet_actions = $target.find(".action-fav-container"),
            has_quote = $target.find(".action-quote-container");

        if (has_quote.length === 0) {
            $(this.rt_action_template()).insertAfter($tweet_actions);
        }
    },

    click_rt: function(e) {
        var $current_target = $(e.currentTarget),
            $tweet_wrap = e.data.that.find_tweet($current_target, 1),
            $tweet, $orgi_tweet, $simple_tweet, tweet_id, screen_name,
            tweet_text, $single_tweet;

        if (!$tweet_wrap) return;

        /* on timeline */
        $orgi_tweet = $tweet_wrap.find(".original-tweet");
        /* on tweet replies */
        $simple_tweet = $tweet_wrap.find(".simple-tweet");
        /* on single tweet page */
        $single_tweet = $tweet_wrap.find(".permalink-tweet");

        // click rt on main tweet without opened replies
        if ($orgi_tweet.length) {
            $tweet = $orgi_tweet;
        }

        // click rt inside reply
        if (!$orgi_tweet.length && $simple_tweet.length) {
            $tweet = $current_target.closest(".simple-tweet");
        }

        // click rt on main tweet with replies open
        if ($orgi_tweet.length && $simple_tweet.length) {
            $tweet = $orgi_tweet;
        }

        if ($single_tweet.length) {
            $tweet = $single_tweet;
        }

        if (!$tweet) return;

        tweet_id = $tweet.attr("data-tweet-id");
        screen_name = $tweet.attr("data-screen-name");

        if (!tweet_id || !screen_name) return;

        tweet_text = e.data.that.tweet_text($tweet, screen_name);

        (new unsafeWindow.twttr.widget.TweetDialog({
            draggable: 0,
            template: {title: "Quote @" + screen_name},
            defaultContent: "",
        })).open().focus();

        $(".twttr-dialog textarea").val(tweet_text);
    },

    tweet_text: function($tweet, screen_name) {
        var $tweet_text = $tweet.find(".js-tweet-text"),
            children = $tweet_text.contents(),
            len = children.length,
            texts = [], tmp, $child,
            components = ["RT", ["@", screen_name, ":"].join("")];

        for (i = 0; i < len; i++) {
            $child = $(children[i]);
            if ($child.hasClass("twitter-timeline-link")) {
                /* get the full url */
                tmp = $child.attr("data-expanded-url");
                texts.push(tmp);
            } else {
                tmp = $child.text();
                texts.push(tmp);
            }
        }

        components.push(texts.join(""));

        return components.join(" ");
    },

    find_tweet: function($target, count) {
        if (count > 10) return;

        var $tmp = $target.parent();

        if ($tmp.find(".tweet").length > 0) {
            return $tmp;
        } else {
            return this.find_tweet($tmp, count+1);
        }
    }
}


var quote_perforate_ff_16 = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcAhIWLBAV1R6IAAAA6klEQVQoz4WRsS6EQRSFv9nEqndF2EhEpdBoeABReQJqWoVa6SU8Ap1E4glEdIpV20LyJ9tJFMiG+ylm5t+/4lT3zDlzcudMUv5Er50E3juKwAdiRvjtHvhgxcQVMBsinDoEz1v5DsDbbAg/Z4vgdQkLHwEca0lwHzxpb8esD95kguEYwLfWcAGuVoJ6LK47xxp4VkkPvE8wAvPTflIDLrc8dClPbtoYTgDsgwdqoA5rMw7Ul05Xh3mH3XnbTrvVOwhRrzpHahzlOYit2sNpkS/V0NgulmcjlchXGjYYlWUST3yxwwIp/ffdv0kw9aGJP+G2AAAAAElFTkSuQmCC"

var quote_perforate_f6_16 = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcAhMOICerVGEmAAAA+ElEQVQoz4WRvS4FURSFvzNBZEhurp8wCtEpNbzBLbyB+wBajVLpCXTiFTQK8QZCp0BLQnKFThRfNM5WzNy5U3FOc9ba66zstXcy+PMU7SuAr04lAImiAwdlj5tW8MJqOUfCMMx+uAQeGc29AvDSwDCr8+B5U8zeAvhg1IJwAO63v7Oz4EWNMHsP4GcrOAarMZoicSKs02vbOwP2ujGvS6gg6iw/5QhiucWGiyBvyU1HZp8BnAF3DTOGC7WZ2Dd8mszKYZ1ixwn13h29faMADssJtwIOx46s1T2EBw11apgNtxr8aE6N5SsjNqiavSTu+GabaVL6b92/McO6ZwUIyE4AAAAASUVORK5CYII="

var quote_perforate_ff_12 = "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAQAAAD8fJRsAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcBQITARDRDQ0DAAAAy0lEQVQY0y2OoUpDYQBGzz+2CYaJMGYRRLEZTKsDX0BsBqOvYLYs2nwCH8JqtQlisNhk4l0YorDNyfiO4d70nXPSVxSQAs023Gp0xTVPdbbiygoTnefIA9+j+py+I79RFzl0N1XUvGUzQ38jJmPIgyaucgHO1OCXx25FNanseqZGWy55ZcCMHwuT8kfPKUvAifXTkXPvqfnSBX6mV2sefWmo7UeLbU5rpc+eQ4AysNNmo9y447ScsE+bO29Zck6/GApxXbqCpbBGOvAPQWGPDvVKFusAAAAASUVORK5CYII="

var quote_perforate_f6_12 = "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAQAAAD8fJRsAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcBQITAQDMuh1nAAAA2ElEQVQY0y2QoUpDcRhHz3fZJkyYCHMWQUwmsbgq+AJiMxh9BbvFZvIRBB/BajWJoMFidbgJQxC+39Ux/j/Dve2cE0/IgB2BCROYAKjavOAynt3kKRdMK9sR8gF3bADBC3s8uY8saVdbmslpvaufY/3KZNEV6EFWyT+dgeayCvrWfq6lZZWcZk8nsopcUfMWI+b8EExWFwz8RW3QhwDQYWbe0/C5hD5z0Gg+6rWlTk4qr3PcKEO2NQaIEd1OrHCdmzHjiB134jZvouaUYagQFJb02jNLTNf8A2SbgugrK9WxAAAAAElFTkSuQmCC"

GM_addStyle(".js-action-quote i {margin:1px 3px 0 0;}");
GM_addStyle(".action-quote {width: 12px; height: 12px; background-repeat: no-repeat;}");
GM_addStyle("i.action-quote {background-image: url(data:image/png;base64,"+quote_perforate_f6_12+")!important;}");
GM_addStyle(".opened-tweet i.action-quote {background-image: url(data:image/png;base64,"+quote_perforate_ff_12+")!important;}");
GM_addStyle(".permalink-tweet i.action-quote {background-image: url(data:image/png;base64,"+quote_perforate_ff_16+")!important;}");
GM_addStyle(".permalink-tweet .action-quote {width: 16px; height: 16px;}");
GM_addStyle(".permalink-tweet .js-action-quote i {margin:-1px 3px 0 0;}");

/* filter tweet bodies */
$(window).on("DOMNodeInserted", "", {"that": TwitterRT},
    TwitterRT.insert_rt_archor);

/* react on RT click */
$(window).on("mousedown", ".js-action-quote", {"that":TwitterRT},
    TwitterRT.click_rt);

