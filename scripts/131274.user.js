// ==UserScript==
// @name        FPN No Flutter
// @namespace   http://kps.datatravelandexperiments.com/
// @description Replace animated-GIF flags with text on Fountain Pen Network (FPN). Probably would work on other IP.Board sites.
// @include     http://www.fountainpennetwork.com/forum/index.php/topic/*
// @grant       none
// @version     2
// ==/UserScript==

xpr = document.evaluate("//div/div[1]/ul[2]/li/span[2]/dd/img/..", document,
                        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; (n = xpr.snapshotItem(i)) != null; ++i) {
    t = n.firstChild.src;
    if (t && (x = t.lastIndexOf('/')) >= 0) {
        t = t.substr(x + 1);
        if ((x = t.lastIndexOf('.')) >= 0) {
            t = t.substr(0, x);
        }
        n.innerHTML = unescape(t);
    }
}
