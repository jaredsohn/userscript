// ==UserScript==
// @name           Google Plus Auto Pager
// @namespace      http://code.jquery.com/
// @description    Automatically get more posts when scrolling near the bottom of the page.
// @author         Joseph Marikle
// @include        *plus.google.com*
// @version        0.1
// ==/UserScript==

window.addEventListener("scroll", function() {
    var atBottom = parseInt((window.scrollY + window.innerHeight) / document.height + 0.1)
    if (atBottom == 1) {
        var obj = document.getElementsByClassName("a-f-zd-gb-h")[0];
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
        obj.dispatchEvent(evt);
    }
}, false);


