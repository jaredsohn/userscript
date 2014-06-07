// ==UserScript==
// @name Twitter: Timeline Link Title Replace with Expanded
// @namespace com.gingerbeardman.userscript.linktitlereplace
// @description Replace link title with expanded URL (use with PageExpand)
// @match http://twitter.com/*
// @match https://twitter.com/*
// @version 1.0
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
                if (node.getAttribute("href") != node.getAttribute("data-expanded-url")) {
                    expandedUrl = node.getAttribute("data-expanded-url");
                    if (expandedUrl) {
                        d = node.querySelectorAll('span.js-display-url');
                        //d[0].innerHTML = node.getAttribute("href");
                        d[0].title = node.getAttribute("href");
                        // node.href = expandedUrl;
                    }
                    node.className += " timeline-link-expanded";
                }
            });
    };
    var trigger = OneTimeTrigger(expandAllLink, 500);
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