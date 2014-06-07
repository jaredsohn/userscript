// ==UserScript==
// @name       Twitter t.co bypasser
// @namespace  http://causeless.seesaa.net/
// @version    0.3
// @description  bypass t.co link on twitter.com
// @include      https://twitter.com/*
// @copyright  2012+, ko-zu https://twitter.com/cause_less
// ==/UserScript==


(function(){
    // thanks to http://www.softel.co.jp/blogs/tech/archives/2067
    function getelem(expression, parentElement) {
        var r = []
        var x = document.evaluate(expression, parentElement || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
        for (var i = 0, l = x.snapshotLength; i < l; i++) {
            r.push(x.snapshotItem(i))
        }
        return r;
    }

    
    function bypasslinks() {
        var twlinks = getelem("//a[@data-expanded-url and @class='twitter-timeline-link']");
        for (var i = 0; i < twlinks.length; i++) {
            var e = twlinks[i];

            e.href = e.getAttribute("data-expanded-url");
            e.rel = "noreferrer";
            e.setAttribute("class", e.getAttribute("class") + " bypassed");
        }
    }
        
    
    var lock = 0;

    document.addEventListener('DOMNodeInserted', function() {
        if (lock) {
            return;
        }
        lock = setTimeout(function() {
            lock = 0;
            bypasslinks();
        }, 100);
    }, false);
    
    bypasslinks();
        
})();
