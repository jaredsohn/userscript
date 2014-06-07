// ==UserScript==
// @name        Tweetdeck url extander
// @namespace   tweetdeck.twitter.com
// @description getting over the t.co redirection
// @include     https://tweetdeck.twitter.com/
// @version     1
// @grant       none
// ==/UserScript==
(function (window) {
    var document = window.document;
    var OneTimeTrigger = function (func, delay) {
        var timerCountdown = 0;
        return function() {
            setTimeout(function() {
                timerCountdown -= 1;
                if (timerCountdown == 0) {
                    func();
                }
            }, delay);
            timerCountdown += 1;
        };
    };
    var expandAllLink = function () {
        var expandedUrl;
        Array.prototype.forEach.call(document.querySelectorAll("a.url-ext:not(.url-ext-expanded)"),
            function (node) {
                if (/^http(?:s)?:\/\/t\.co\/[0-9A-Za-z]+$/g.test(node.href)) {
                    expandedUrl = node.getAttribute("data-full-url");
                    if (expandedUrl) {
                        node.href = expandedUrl;
                    }
                    node.className += " url-ext-expanded";
                }
            });
    };
    var trigger = OneTimeTrigger(expandAllLink, 100);
    var MutationObserver = window.MutationObserver ? window.MutationObserver : window.WebKitMutationObserver;
    if (typeof MutationObserver !== "undefined") {
        var observer = new MutationObserver(trigger);
        observer.observe(document, { childList: true, subtree: true });
    }
    else {
        document.addEventListener("DOMNodeInserted", trigger, false);
        document.addEventListener("DOMSubtreeModified", trigger, false);
    }

})(window);