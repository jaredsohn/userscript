// ==UserScript==
// @name           Pitsburgh Default Request Library
// @namespace      http://docwhat.gerf.org/
// @description    If you use Pittsburgh's Library system, this script will let you set the "request book" library to your local library by default.
// @include        http://*.einetwork.net/search*request*
// @include        https://*.einetwork.net/search*request*
// ==/UserScript==

/**
 * Documentation:
 * Change the library_re to whatever library you want.
 * Do not use ^ and $ because they use whitespace in weird ways.
 */

(function() {
    var library_re = /Squirrel Hill/;

    var fixit = function (el) {
        if (el) {
            var opts = el.getElementsByTagName('option'),
                len = opts.length,
                i;
            for (i = 0; i < len; i++) {
                if (opts[i].innerHTML.match(library_re)) {
                    el.value = opts[i].value;
                    el.style.background = '#ffa';
                    break;
                }
            }
        }
    };

    var libraryRequest = function () {
        var i, list;
        list = document.getElementsByTagName('select');
        for (i = 0; i < list.length; i++) {
            if (list[i].name.match(/^loc/)) {
                fixit(list[i]);
            }
        }
    };

    // Schedule a fix later, and try now *just in case*
    window.addEventListener("load", libraryRequest, false);
    try {
        libraryRequest();
    } catch(e) { }
})();

// EOF
