// ==UserScript==
// @name       YT: Auto Expand 'One more video'
// @namespace  http://use.i.E.your.homepage/
// @include    http://youtube.com*
// @include    http://www.youtube.com*
// @require    http://usocheckup.dune.net/125092.js
// ==/UserScript==

(function() {
    function init() {
        var sms = document.getElementsByClassName('show-more');
        for (var i=0;i<sms.length;i++) {
            if (sms[i].tagName.toLowerCase() == 'a' && sms[i].innerHTML.search(/\+ /) > -1) {
                var ev = document.createEvent('MouseEvents');
                ev.initMouseEvent('click', true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null);
                sms[i].dispatchEvent(ev);
            }
        }
    }
    init();
})();