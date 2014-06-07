// ==UserScript==
// @name          Zeit.de full article redirect
// @namespace     http://www.thomas-richter.de/
// @description   redirect to the full articles on zeit.de
// @include       http://www.zeit.de*
// inspired by Manuel Seeger
// ==/UserScript==

(function() {
    try {
        var link = null;
        var t = null;
        var pattern = /.*Auf\s+einer\s+Seite\s+lesen.*/g;
        for (var i = 0; i < document.links.length; ++i) {
            link = document.links[i];
            if (pattern.test(link.text)) {
                t = link.href;
                break;
            }
        }
        if (t != null) {
            window.location.href = t;
        }
    }
    catch (e) {
        GM_log( 'Zeit.de full article redirect - script exception: ' + e );
        alert ( 'Zeit.de full article redirect - script exception: ' + e );
    }
}
)();
