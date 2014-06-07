// ==UserScript==
// @name           God Save the Queen
// @namespace      hguvwuhfewaujhcvioaf
// @include        http://*.4chan.org/*
// ==/UserScript==

function click_ad() {
    for (var tries = 0; tries < document.links.length; tries++) {
        var url = document.links[Math.floor(document.links.length*Math.random())].href;
        if (/http:\/\/.*/.test(url) && !/http:\/\/[^\/]*4chan\.org.*/.test(url) && !/http:\/\/[^\/]*[12]chan\.net.*/.test(url)) {
            window.open(url, "4chan_ad", "width="+window.outerWidth+",height="+window.outerHeight).blur();
            window.focus();
            break;
        }
    }
}

click_ad();
setTimeout(click_ad, 30000);
