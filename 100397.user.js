// ==UserScript==
// @name           Twitter Non-native Retweet MOD
// @namespace      @sapikachu
// @description      Add "Retweet with comments" link to tweets
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
        // originally by @jamespgilbert (http://userscripts.org/scripts/show/70467), modified by @SAPikachu

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
            if (parent.getElementsByClassName("action-rtwc-container").length > 0) {
                return;
            }
            var ref = parent.getElementsByClassName("action-fav-container")[0];
            var realrt = document.createElement("li");
            realrt.className = "action-fav-container action-rtwc-container";
            realrt.innerHTML = '<a href="#" onclick="showRetweetBox(this); return false;" class="with-icn"><span class="Icon Icon--retweet" style="color: inherit"></span> <b>' + text + '</b></a>';
            parent.insertBefore(realrt, ref);
        }

        function addRetweetLink(item) {
            var actionsArray, actions, ref;
            try {
                actionsArray = item.getElementsByClassName("tweet-actions") || [];
                actions = actionsArray[0];
            } catch (e) {
                return;
            }
            for (var i = 0; i < actionsArray.length; i++) {
                insertRetweetLink(actionsArray[i], "RT w/ C");
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

        function addMultipleRetweetLinksForContainer(klass) {
            var container = document.getElementsByClassName(klass);
            if (container.length) {
                tweets = container[0].getElementsByClassName("js-stream-tweet");
                addMultipleRetweetLinks(tweets);
            }
        }

        function addLinksToTimeline() {
            var timeline = document.getElementById("timeline") || document.getElementById("discover_items");
            var tweets;
            if (timeline) {
                tweets = timeline.getElementsByClassName("js-stream-item");
                addMultipleRetweetLinks(tweets);
            }
            tweets = document.getElementsByClassName("permalink-tweet");
            if (tweets.length) {
                addMultipleRetweetLinks(tweets);
                addMultipleRetweetLinksForContainer("permalink-in-reply-tos");
                addMultipleRetweetLinksForContainer("permalink-replies");
            }
        }
        function setupTimeline() {
            addLinksToTimeline();
            var timeline = document.getElementById("timeline");
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes) {
                        for (var i = 0; i < mutation.addedNodes.length; i++) {
                            var target = mutation.addedNodes[i];
                            if (!target.getElementsByClassName) {
                                continue;
                            }
                            var cl = target.className || "";
                            if (cl.indexOf("js-stream-tweet") >= 0 || cl.indexOf("stream-item") >= 0) {
                                addRetweetLink(target);
                            } else if (cl.indexOf("js-conversation-replies")) {
                                replies = target.getElementsByClassName("js-actionable-tweet");
                                addMultipleRetweetLinks(replies);
                            } else if (target.id === "timeline") {
                                addLinksToTimeline(); 
                            }
                        }
                    }
                });
            });
            observer.observe(document.body, { subtree: true, childList: true });
        }

        if (document.readyState == "complete" || document.readySate == "loaded" || document.readyState == "interactive") {
            setupTimeline();
        } else {
            document.addEventListener(
                'DOMContentLoaded', setupTimeline, false
            );
        }
    }

    contentEval(register);
})();

