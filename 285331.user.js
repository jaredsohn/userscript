// ==UserScript==
// @name        facebook tracker kicker
// @namespace   facebook url onclick redirection tracker
// @description removing all the ugly onclick redirection stuff
// @include     https://www.facebook.com/
// @version     4
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
    var cleanAllLink = function () {
        var cleanedUrl;
        Array.prototype.forEach.call(document.querySelectorAll("a:not(.url-checked)"),
            function (node) {
                if (node.getAttribute("onclick") !== null && (node.getAttribute("onclick").substring(0,8) === "Linkshim")) {
                    node.setAttribute("onclick", null);
                    console.log("1 CLEANED")
                    }
                node.className += " url-checked";
            });
    };
    var trigger = OneTimeTrigger(cleanAllLink, 100);
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