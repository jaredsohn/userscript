// ==UserScript==
// @name            ISM Popup Links to Generic Links
// @namespace       http://docs.g-blog.net/code/greasemonkey
// @description     I am tired of having ISM open popups. Me want standard links.
// @include         http://www.ishotmyself.com*
// @include         http://ishotmyself.com*
// ==/UserScript==

/*
    (c) Carlo Zottmann, carlo@g-blog.net
    http://G-Spotting.net/

    Copy, use, modify, spread as you see fit.
*/

(function ()
{
    var candidates = document.getElementsByTagName("a");

    for (var cand = null, i = 0; (cand = candidates[i]); i++) {
        if (cand.getAttribute("onclick") == null && cand.href.toLowerCase().indexOf("javascript:") == 0) {
            match = cand.href.match(/(popupLandscape\('([^']+)'\))/i);

            if (match != null) {
                // cand.setAttribute("onclick", match[1] + "\nreturn false;");
                cand.setAttribute("href", match[2]);
            }
        }
    }
})();
