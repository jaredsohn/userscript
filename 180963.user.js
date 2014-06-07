// ==UserScript==
// @name          Waffles Demilitarized Zone
// @version       0.1
// @description	  creates a safe zone free of militant activity
// @author        sootyflues
// @include       *waffles.fm/forums.php?action=viewtopic*
// @run-at        document-end
// ==/UserScript==

var links = document.getElementsByTagName("a");

for (i = 0; i < links.length; i++) {
    if (links[i].innerHTML == "<b>militant</b>") {
        var postTop = links[i].parentNode.parentNode.parentNode.parentNode.parentNode;
        var postBottom = postTop.nextSibling.nextSibling.nextSibling;
        var extraSpace = postTop.nextSibling;
        var moreExtra = postTop.previousSibling;
        postBottom.parentNode.removeChild(postBottom);
        extraSpace.parentNode.removeChild(extraSpace);
        moreExtra.parentNode.removeChild(moreExtra);
        postTop.parentNode.removeChild(postTop);
    }
}