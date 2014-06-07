// ==UserScript==
// @name TwiShell
// @namespace TwiShell
// @description Enhance Twitter Web with lots of features.
// @match http://twitter.com/*
// @match https://twitter.com/*
// @version 3.8
// @run-at document-start
// ==/UserScript==

//noinspection ThisExpressionReferencesGlobalObjectJS
(function (window) {
    'use strict';
    var document = window.document;
    
    var ELEMENT_NODE = 1,
        TEXT_NODE = 3;

    var click = function (node) {
        var event = document.createEvent("Event");
        event.initEvent("click", true, true);
        node.dispatchEvent(event);
    };

    var hasClass = function (node, cls) {
        return node.classList && node.classList.contains(cls);
    };

    var addClass = function (node, cls) {
        node.classList.add(cls);
    };

    var removeClass = function (node, cls) {
        node.classList.remove(cls);
    };

    var toggleClass = function (node, cls) {
        node.classList.toggle(cls);
    };

    var wantsMoreTimelineItems = function () {
        var event = document.createEvent("Event");
        event.initEvent("uiNearTheBottom", true, true);
        document.dispatchEvent(event);
    };

    // throttle function call in specified interval
    var throttle = function (fn, interval) {
        var fnTimer;
        var repeatCalling = false;
        return function wrapper() {
            if (!fnTimer) {
                fn();
                fnTimer = setTimeout(function () {
                    fnTimer = null;
                    if (repeatCalling) {
                        repeatCalling = false;
                        wrapper();
                    }
                }, interval);
            }
            else {
                repeatCalling = true;
            }
        };
    };

    var globalDialog,
        retweetDialog;

    var getOriginalTweetText = function (tweetNode) {
        var originalTweetText = Array.prototype.reduce.call(
            tweetNode.querySelector("div.content p.js-tweet-text").childNodes,
            function (acc, childNode) {
                var text;
                if (childNode.nodeType === TEXT_NODE) {
                    text = childNode.textContent;
                }
                else if (childNode.nodeType === ELEMENT_NODE) {
                    text = childNode.getAttribute("data-expanded-url") || childNode.textContent;
                }
                if (text) {
                    acc.push(text);
                }
                return acc;
            },
            []
        ).join("");
        var screenName = tweetNode.querySelector("div.stream-item-header span.username").textContent.trim();
        return "RT " + screenName + ": " + originalTweetText.split("\n").map(function (s) {
            return "<div>" + s + "</div>";
        }).join("");
    };

    var hideRetweetDialog = function () {
        click(document.querySelector("#retweet-tweet-dialog button.modal-close"));
    };

    var showGlobalTweetDialog = function () {
        globalDialog.querySelector(".draggable").setAttribute(
            "style",
            retweetDialog.querySelector(".draggable").getAttribute("style")
        );
        click(document.getElementById("global-new-tweet-button"));
        globalDialog.querySelector(".modal-title").innerHTML =
            retweetDialog.querySelector(".modal-title").innerHTML;
    };

    var prepareRT = function (tweetNode) {
        hideRetweetDialog();
        showGlobalTweetDialog();
        var text = getOriginalTweetText(tweetNode);
        fillInTweetBox(text);
    };

    var fillInTweetBox = function (text) {
        var tweetBox = globalDialog.querySelector("div.tweet-box"),
            range = document.createRange(),
            selection = window.getSelection();

        tweetBox.innerHTML = text;
        tweetBox.focus();
        // Place cursor in the front.
        range.selectNodeContents(tweetBox);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    };

    var replaceCancelButton = function () {
        if (!retweetDialog) { // sometimes it will become null
            return;
        }
        var btnCancel = retweetDialog.querySelector("button.cancel-action");
        addClass(btnCancel, "rt-action");
        removeClass(btnCancel, "cancel-action");
        btnCancel.innerHTML = "RT";
        btnCancel.addEventListener("click", function () {
            prepareRT(retweetDialog.querySelector(".tweet"));
        }, false);
    };

    var isAttachedMap = Object.create(null);
    var attachProtectedTweet = function () {
        Array.prototype.forEach.call(document.querySelectorAll(".tweet[data-protected=true]"), function (protectedTweet) {
            var itemId = protectedTweet.getAttribute("data-item-id");
            if (!(isAttachedMap[itemId])) {
                isAttachedMap[itemId] = true;
                protectedTweet.querySelector(".retweet.cannot-retweet").addEventListener("click", function (evt) {
                    if (evt.button == 2) { // Ignore right-clicks
                        return;
                    }
                    evt.stopPropagation();
                    evt.preventDefault();
                    for (var tweet = evt.target.parentNode; !(hasClass(tweet, "tweet")); tweet = tweet.parentNode) {}
                    prepareRT(tweet);
                }, false);
            }
        });
    };

    var tcoMatcher = /^http(?:s)?:\/\/t\.co\/[0-9A-Za-z]+$/i;
    var expandAllUrl = function () {
        Array.prototype.forEach.call(
            document.querySelectorAll("a.twitter-timeline-link:not(.url-expanded)"),
            function (tlLink) {
                var expandedUrl = tlLink.getAttribute("data-expanded-url");
                if (expandedUrl && tcoMatcher.test(tlLink.getAttribute("href"))) {
                    tlLink.setAttribute("href", expandedUrl);
                }
                addClass(tlLink, "url-expanded");
            }
        );
    };

    document.addEventListener("DOMContentLoaded", function () {
        globalDialog = document.getElementById("global-tweet-dialog");
        retweetDialog = document.getElementById("retweet-tweet-dialog");
        replaceCancelButton();
    }, false);

    var styles = [
        "@media screen {",
        ".cannot-retweet{display: inline !important;}", // rt for protected tweet
        ".content-main, .profile-page-header {float: left !important;}",
        ".dashboard {float: right !important;}",
        "#suggested-users {clear: none !important;}",
        "li.stream-item .has-cards .js-media-container {max-height: 100%; transition-property: all; transition-duration: 0.2s;}",
        "li.stream-item:not(.open) .stream-item-footer:before, li.stream-item:not(.open) .stream-item-footer:after {display: none;}",
        "li.stream-item:not(.open) .has-cards .js-media-container {max-height: 0; overflow-y: hidden; padding: 0; margin: 0; border: 0;}",
        "li.stream-item:not(.open) .has-cards .expanded-content {display: none;}",
        "li.stream-item:not(.open) .has-cards .bottom-tweet-actions {margin-top: 0;}",
        "}"
    ].join("");

    var addStyle = function (css) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        document.documentElement.appendChild(node);
        node = null;
    };

    addStyle(styles);

    var throttledExpandUrl = throttle(expandAllUrl, 100);
    var throttledAttachProtectedTweet = throttle(attachProtectedTweet, 100);
    new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes) {
                throttledExpandUrl();
                throttledAttachProtectedTweet();
            }
        });
    }).observe(document, {
        childList: true,
        subtree: true
    });
})(this);