// ==UserScript==
// @name           Retweet Twitter
// @namespace      http://bastian-ganda.blogspot.com
// @description      untuk melakukan peng RT an secara auto .
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @grant          none
// ==/UserScript==

(function() {
    // http://wiki.greasespot.net/Content_Script_Injection
    function contentEval(source) {
        // Check for function input.
        if ('function' == typeof source) {
            // Execute this function with no arguments, by adding parentheses.
            // One set around the function, required for valid syntax, and a
            // second empty set calls the surrounded function.
            source = '(' + source + ')();'
        }

        // Create a script node holding this  source code.
        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = source;

        // Insert the script node into the page, so it will run, and immediately
        // remove it to clean up.
        document.body.appendChild(script);
        document.body.removeChild(script);
    }


    function register() {
        // originally by @jamespgilbert (http://userscripts.org/scripts/show/70467), modified by @bastian_ganda

        var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

        // Save or make a fake console object for debugging 
        var console = {};

        for (var i = 0; i < names.length; i++) {
            if (window["console"]) {
                console[names[i]] = window.console[names[i]];
            } else {
                console[names[i]] = function() {};
            }
        }
        // Twitter disables console object after loading, we make it available again for using in firebug
        window._console = console;

        var iconBackgroundColor = null;
        var lastPageStyle = null;

        function resetIconBackgroundColor() { 
            iconBackgroundColor = null; 
        }

        function checkIfStyleChanged() {
            var m = /user-style-([^ ]+)/g.exec(document.body.className);
            if (!m) {
                return;
            }
            var currentStyleName = m[1];
            if (lastPageStyle !== currentStyleName) {
                lastPageStyle = currentStyleName;
                resetIconBackgroundColor();
            }
        }

        window.showRetweetBox = function (link) {
            setTimeout(function() {
                var impl = function($) {
                    try
                    {
                        var tweetElem = $(link).parents().filter(".js-actionable-tweet").eq(0);
                        if (tweetElem.size() == 0) {
                            alert("Can't locate tweet element.");
                            return;
                        };
                        var userElem = tweetElem.find(".account-group .username b").eq(0);
                        var userName = $.trim(userElem.html());

                        var contentElem = $(".js-tweet-text", tweetElem).eq(0).clone();
                        $("a", contentElem).each(function() {
                            var o = $(this);
                            var expanded = o.data("ultimate-url") || o.data("expanded-url");
                            if (expanded) {
                                o.text(expanded);
                            };
                        });
                        var content = " RT @" + userName + " " + $.trim(contentElem.text());
                        $("#global-new-tweet-button").click();

                        $("#tweet-box-global").trigger(
                            "uiChangeTextAndPosition", 
                            {
                                text: content,
                                position: 0
                            }
                        );
                        // Dirty hack to preserve conversation stream
                        // Seems tweetElem.data("tweet-id") will parse the
                        // id as float and give us wrong result
                        $(document).trigger(
                            "uiOverrideTweetBoxOptions", 
                            { id: tweetElem.attr("data-tweet-id") }
                        );
                    } catch (e) {
                        console.error(e);
                    }
                };
                if (window["jQuery"]) {
                    impl(window["jQuery"]);
                } else {
                    // Use loadrunner from the page
                    using("core/jquery", impl);
                }
            }, 0);
        };

        function insertRetweetLink(parent, text) {
            if (parent.getElementsByClassName("rtwc").length > 0) {
                return;
            }
            var ref = parent.getElementsByClassName("action-fav-container")[0];
            var realrt = document.createElement("li");
            realrt.className = "action-fav-container action-rtwc-container";
            if (!iconBackgroundColor) {
                iconBackgroundColor = window.getComputedStyle(parent.getElementsByClassName("sm-reply")[0], null).getPropertyValue("background-color");
            }
            realrt.innerHTML = '<a href="#" onclick="showRetweetBox(this); return false;" class="with-icn"><i class="sm-rt" style="background-color: ' + iconBackgroundColor + ';"></i> <b style="color: ' + iconBackgroundColor + ';"><span title="Retweet with comments" class="rtwc">' + text + '</span></b></a>';
            parent.insertBefore(realrt, ref);
        }

        function addRetweetLink(item) {
            var actionsArray, actions, ref;
            try {
                actionsArray = item.getElementsByClassName("tweet-actions");
                actions = actionsArray[0];
            } catch (e) {
                return;
            }
            insertRetweetLink(actions, "RT w/ C");
            if (actionsArray.length > 1) {
                insertRetweetLink(actionsArray[1], "Retweet with comments");
            }
        }

        function addMultipleRetweetLinks(elements) {
            if (elements.length > 0) {
                for (var i = 0; i < elements.length; i++) {
                    // due to some unknown reason, we need to create a scope and capture the node object, otherwise something strange will happen (elements will be cleared etc.)
                    (function() {
                        var node = elements[i];
                        setTimeout(function() { 
                            addRetweetLink(node); 
                        }, 0);
                    })();
                }
            }
        }

        document.addEventListener('DOMNodeInserted', function (e) {
            checkIfStyleChanged();
            var target = e.target;
            var cl = target.className;
            if (cl.indexOf("js-stream-tweet") >= 0 || cl.indexOf("stream-item") >= 0) {
                addRetweetLink(target);
            } else if (cl.indexOf("js-conversation-replies")) {
                replies = target.getElementsByClassName("js-actionable-tweet");
                addMultipleRetweetLinks(replies);
            }
        }, false);

        function addLinksToTimeline() {
            checkIfStyleChanged();
            var timeline = document.getElementById("timeline");
            var tweets;
            if (timeline) {
                tweets = timeline.getElementsByClassName("js-stream-tweet");
                addMultipleRetweetLinks(tweets);
            }
            tweets = document.getElementsByClassName("permalink-tweet");
            if (tweets.length) {
                addMultipleRetweetLinks(tweets);
                var in_reply_tos = document.getElementsByClassName("permalink-in-reply-tos");
                if (in_reply_tos.length) {
                    tweets = in_reply_tos[0].getElementsByClassName("js-stream-tweet");
                    addMultipleRetweetLinks(tweets);
                }
            }
        }

        if (document.readyState == "complete" || document.readySate == "loaded" || document.readyState == "interactive") {
            addLinksToTimeline();
        } else {
            document.addEventListener(
                'DOMContentLoaded', addLinksToTimeline, false
            );
        }
    }

    contentEval(register);
})();