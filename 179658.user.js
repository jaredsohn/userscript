// ==UserScript==
// @name           Imgur link replace
// @description    Replaces all reddit imgur links with kageurufu links on page load | Mark Lyons 2012
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

a = document.getElementsByTagName('a');
for (inc=0;inc<a.length;inc++) {
    p = /imgur\.com\/([A-Za-z0-9]+)/;
    res = p.exec(a[inc]);

    if (res!=null) {
        a[inc].href = 'http://jacobroberts.me/imgur/' + res[1] + '.jpg';
    }
}