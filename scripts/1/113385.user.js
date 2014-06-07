// ==UserScript==
// @name           ESPN Gamecast - Start in STATS tab
// @namespace      userscripts.org
// @include        http://scores.espn.go.com/*/gamecast*
// ==/UserScript==
var tries = 0;

var maybeClickStats = function() {
    var gameTabs = document.getElementById('top-menu');
    var anchors = gameTabs.getElementsByTagName('a');
    for (i in anchors) {
        var anchor = anchors[i];
        if (anchor.href.indexOf('#stats') >= 0) {
            anchor.click();
            return;
        }
    }

    if (tries++ < 10)
        setTimeout(maybeClickStats, 50);
}

setTimeout(maybeClickStats, 50);
