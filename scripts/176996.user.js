// ==UserScript==
// @name        Feedly_Saved_For_Later_Releaser
// @namespace   kamaboko
// @description To cancel all the Saved For Later
// @include     http://feedly.com/*
// @include     https://feedly.com/*
// @version     1.0.1
// ==/UserScript==

(function() {
    var MAX_WINDOW_OPEN = 100;
    
    var onKeyDown = function(event) {
        // push "d" key
        if(event.keyCode == 68 && !event.shiftKey) {
            var entries = document.evaluate('//div[@id="section0_column0"]//div[@class="u0Entry quicklisted"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for(var i = entries.snapshotLength - 1, m = MAX_WINDOW_OPEN; i >= 0 && m > 0; i--) {
                var entry = entries.snapshotItem(i);
                m--;

                var stars = document.evaluate('.//div[@class="quicklistHandle"]', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (stars.snapshotLength  == 0) {
                    continue;
                }

                var news = document.getElementsByClassName("condensedTools");
                var links = news[i].getElementsByTagName('a');
                //alert(links[0]);
                if(links[0] == "about:blank")
                {
                    continue;
                }
                //GM_openInTab(links[0]);

                var star = stars.snapshotItem(0);
                var event = document.createEvent('MouseEvents');
                event.initEvent('click', true, true);
                star.dispatchEvent(event);
            }
        }
    }
    document.addEventListener('keydown', onKeyDown, false);
})();