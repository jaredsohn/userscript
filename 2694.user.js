// Reddit onmousedown remover
// version 0.4
// 17 January 2006
// Copyright (c) Paul Visscher
// paulv+greasemonkey@canonical.org
// License: GPLv2 or later
//
// ==UserScript==
// @name            Reddit onmousedown remover
// @namespace       http://localhost/
// @description     Removes the onmousedown attribute which breaks Copy Link Location
// @include         http://reddit.com/
// @include         http://*.reddit.com/
// ==/UserScript==

(function() {
var as,ae;
as = document.getElementsByTagName("a");
for (var i = 0; i < as.length; i++) {
    ae = as[i];
    if (ae.getAttribute('onmousedown')) {
        ae.removeAttribute('onmousedown');
    }
}

GM_addStyle(".title.loggedin:visited { color: #551a8b ! important; }");

})();
