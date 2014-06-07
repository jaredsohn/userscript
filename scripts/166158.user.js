// ==UserScript==
// @name        CC skipper
// @namespace   Automatically skips cc.cc timer
// @description This script allows to bypass the cc timer
// @updateURL      http://userscripts.org/scripts/source/166158.meta.js
// @installURL     http://userscripts.org/scripts/source/166158.user.js
// @include     *cc.cc*
// @grant       none
// @version     1.0.1
// ==/UserScript==

get_url = '/go_page/mglp.php?lf=' + document.location.href + '&rf=' + document.referrer + '&rd=' + Math.random();

$.getJSON(get_url, function (R) {
        if (R.proc) {
            document.location.href = R.go_page
        }
    });
