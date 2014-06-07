// ==UserScript==
// @name          Antisocial Reader for Facebook
// @author        Chris Dary
// @namespace     http://lab.arc90.com/antisocial-reader
// @description   Removes the annoying popup to join social readers for facebook. Articles only, please.
// @match         http://www.facebook.com/*
// @match         https://www.facebook.com/*
// ==/UserScript==

window.setInterval(function() {
    var readLinks = document.querySelectorAll('a[href*="news.read"]');

    for (var i=0, il=readLinks.length; i<il; i++) {
        var readLink = readLinks[i],
            query = readLink.search;

        if (query.indexOf('redirect_uri=') !== -1) {
            newLink = decodeURIComponent(query.match('redirect_uri=([^&]+)')[1]);
            readLink.href = newLink;
            readLink.target = "_blank";
            readLink.removeAttribute('data-hovercard');
            readLink.removeAttribute('rel');
        }
    }
}, 2000);