// ==UserScript==
// @name           Sharecash survey bypasser, method B
// @namespace      71f8f12556abe601d230ac099af2e207
// @include        *
// @description    Skips surveys on sharecash.
// ==/UserScript==

if (window == top) {
    GM_setValue("tophost", location.host);
    document.addEventListener("focus", function(e) {
        GM_setValue("tophost", location.host);
    }, false);
} else {
    if (!/sharecash\.org/.test(location.host) && /sharecash\.org/.test(GM_getValue("tophost", ""))) {
        document.body.addEventListener("click", function() {
            if (/sharecash\.org/.test(GM_getValue("tophost", ""))) {
                var c = [
                    "http://www.google.com/",
                    "http://www.facebook.com/",
                    "http://www.yahoo.com/",
                    "http://www.bing.com/",
                    "http://www.blogger.com/"
                ];
                location.href = c[Math.floor(5 * Math.random())];
            }
        }, false);
    }
}
