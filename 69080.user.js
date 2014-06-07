// ==UserScript==
// @name           Move Go To Parent
// @namespace      movegtp@kwierso.com
// @description    Moves it.
// @include        http://*.roosterteeth.com/members/modHistoryView.php*
// @include        http://roosterteeth.com/members/modHistoryView.php*
// @include        http://redvsblue.com/members/modHistoryView.php*
// @include        http://strangerhood.com/members/modHistoryView.php*
// @include        http://achievementhunter.com/members/modHistoryView.php*
// @include        http://roosterteethcomics.com/members/modHistoryView.php*
// ==/UserScript==

(function() {
    var gtpParentEl = document.getElementsByClassName("content topContent").item(0);
    var gtpEl;
    for(var i in gtpParentEl.childNodes) {
        if(gtpParentEl.childNodes[i].innerHTML == "<b>Go to Parent</b>") {
            gtpEl = gtpParentEl.childNodes[i];
            break;
        }
    }

    // This is a video link, which is broken on the site normally
    if(gtpEl.href.match(/members\/\d+/)) {
        gtpEl.href = "/members/videos/video.php?id=" + gtpEl.href.split("members/")[1];
    }

    var crumbLink = document.getElementsByClassName("crumbLink crumbLinkLast").item(0);
    crumbLink.href = gtpEl.href;
    gtpParentEl.removeChild(gtpEl);
})();