// ==UserScript==
// @name           CPV Link Skipper
// @author         .
// @description    Skip shit
// @version        0.5
// @grant          unsafeWindow
// @include       *shr77.com/*
// @updateURL     http://userscripts.org/scripts/source/186165.meta.js
// @downloadURL   http://userscripts.org/scripts/source/186165.user.js
// ==/UserScript==
// fires when gbar is found or added to document.
var $ = unsafeWindow.jQuery;
var timeoutId;
var done = false;
function redirect(elem) {
    href = elem.getAttribute('href');
    if (!done && typeof href != 'undefined' && href.match(/^https?.*$/)) {
        clearTimeout(timeoutId);
        done = true;
        document.location = href;
        return true;
    }
    return false;
}

function redirect2(v) {
    if (!done && typeof v == 'string' && v.match(/^https?.*$/)) {
        clearTimeout(timeoutId);
        done = true;
        document.location = v;
        return true;
    }
    return false;
}


(function () {
    var elem;
    //First attempt
    /*for (var x in unsafeWindow) {
        if (x.match(/^[A-Za-z0-9]{7}$/)) {
            redirect2(unsafeWindow[x]);
        }
    }*/
    //Third attempt; from https://github.com/devnoname120/nopicads/blob/shr77.com/src/sites/link/shr77.com.js
    var link = document.head.innerHTML.match(/\$\('a#loading'\)\.attr\('href',"([^"]+)"\);/);
    if (!link[1] || !redirect2(link[1])) {
        //Second attempt
        //Override jQuery animate for instant shit
        if (typeof unsafeWindow.jQuery != 'undefined') {
            var oldfn = unsafeWindow.jQuery.fn.animate;
            unsafeWindow.jQuery.fn.animate = function (a, b, c) {
                c();
            }
        }
        //Moar

        if (typeof unsafeWindow.setInterval != 'undefined') {
            var oldfn = unsafeWindow.setInterval;
            unsafeWindow.setInterval = function (a, b) {
                return oldfn(a, 50);
            }
        }
        if (typeof unsafeWindow.num != 'undefined') {
            unsafeWindow.num = 0;
            if (typeof timeoutId == 'undefined') {
                timeoutId = setInterval(function () {
                    if ((elem = document.getElementById('loading'))) {
                        redirect(elem);
                    }
                }, 50);
            }
        }
    }
}) ();
