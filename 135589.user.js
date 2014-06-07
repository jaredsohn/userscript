// ==UserScript==
// @name       Remove Facebook Link Redirects
// @namespace  none
// @version    2012.06.09
// @description  Stops facebook from tracking outbound links.
// @match      https://www.facebook.com/*
// @copyright  no
// ==/UserScript==

function unbounce() {
    var l = document.getElementsByTagName('a');
    for (var i in l) {
        if (l[i].rel == 'nofollow' || l[i].rel == 'nofollow nofollow') {
            l[i].removeAttribute('rel');
            l[i].removeAttribute('onmousedown');
            l[i].onmousedown = undefined;
        }
    }
}

setInterval(unbounce,500);