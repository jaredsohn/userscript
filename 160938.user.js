// ==UserScript==
// @name Twitter Timeline URL Expand
// @namespace Twitter-Timeline-URL-Expand
// @description Replace t.co href of A tag with real url.
// @match http://twitter.com/*
// @match https://twitter.com/*
// @version 1.1
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
        Array.prototype.forEach.call(document.querySelectorAll("a.twitter-timeline-link:not(.timeline-link-expanded)"),
            function (node) {
                if (/^http(?:s)?:\/\/t\.co\/[0-9A-Za-z]+$/g.test(node.href)) {
                    expandedUrl = node.getAttribute("data-expanded-url");
                    if (expandedUrl) {
                        node.href = expandedUrl;
                    }
                    node.className += " timeline-link-expanded";
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