// ==UserScript==
// @name           Feedly Star Opener
// @namespace      http://www.srcw.net/
// @description    Starred item open in a lump for Feedly for Chrome
// @include        http://feedly.com/*
// @include        https://feedly.com/*
// @version        1.0.2
// ==/UserScript==

(function() {
    var MAX_WINDOW_OPEN = 5;
    var onKeyDown = function(event) {
        // push "w" key
        if(event.keyCode == 87 && !event.shiftKey) {
            var entries = document.evaluate('//div[@id="section0_column0"]//div[@class="u0Entry quicklisted"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0, m = MAX_WINDOW_OPEN; i < entries.snapshotLength && m > 0; i++) {
                var entry = entries.snapshotItem(i);
                m--

                var stars = document.evaluate('.//div[@class="quicklistHandle"]', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (stars.snapshotLength  == 0) {
                    continue;
                }

                var links = document.evaluate('.//a[@class="title read"]', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (links.snapshotLength > 0) {
                    var link = links.snapshotItem(0);
                    window.open(link.href);
                }

                var star = stars.snapshotItem(0);
                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, true);
                star.dispatchEvent(event);
            }
        }
    }
    document.addEventListener('keydown', onKeyDown, false);
})();

