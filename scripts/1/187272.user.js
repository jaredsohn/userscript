// ==UserScript==
// @name        Change ShareNXS Image Links to Link Directly to Original Size
// @namespace   Change ShareNXS Image Links to Link Directly to Original Size
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

var anchors = document.getElementsByTagName("a");
for (var i = 0; i < anchors.length; i++) {
    test = anchors[i].href;
    if (test.match("sharenxs.com/view/")) {
        anchors[i].href = anchors[i].href + "&offset=original";
    }
}