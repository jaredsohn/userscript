// ==UserScript==
// @author         F.Ko-Ji
// @name           Google Reader Auto Read Ads
// @namespace      http://blog.fkoji.com/
// @description    This script click entries whose title "PR: " automatically
// @version        0.3
// @include        http://www.google.*/reader*
// @include        https://www.google.*/reader*
// ==/UserScript==

document.body.addEventListener("DOMNodeInserted", function(e) {
    var element = e.target;
    if (!element.className.match(/^entry/)) return;
    var title = element.getElementsByTagName("h2")[0];
    if (title.textContent.match(/^(PR:|AD:|\[PR\])/i)) {
        element.style.height = 0;
        var event = title.ownerDocument.createEvent("MouseEvents");
        event.initMouseEvent("click", true, true,
                             title.ownerDocument.defaultView,
                             1, 0, 0, 0, 0,
                             false, false, false, false,
                             0, title);
        title.dispatchEvent(event);
    }
}, false);
