// ==UserScript==
// @name           Ubuntu.ru forum link converter
// @namespace      http://www.s25.ru/dev/firefox/greasemonkey/
// @description    Convert link on forum.ubuntu.ru for lightweight browsing.
// @include        http://*forum.ubuntu.ru/*
// ==/UserScript==

if (location.href.match(/\;wap2/)) {
    var aElm = document.getElementsByTagName('a');
    for (i=0; i<aElm.length; i++) {
        if (aElm[i].href.indexOf('http://forum.ubuntu.ru/') > -1) {
            if (!(aElm[i].href.match(/\;wap2/))) {
                if (aElm[i].href.match(/\?/)) {
                    aElm[i].href = aElm[i].href + ';wap2';
                } else {
                    aElm[i].href = aElm[i].href + '?;wap2';
                }
            }
        }
    }
}