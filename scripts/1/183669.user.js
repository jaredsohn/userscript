// ==UserScript==
// @name           Always sort ThePirateBay & KickAss.to by seeders
// @author         Alexander Awitin
// @version        1.2.1
// @namespace      http://userscripts.org/scripts/show/183669
// @description    Automatically sort torrents by seeders instead of by date uploaded with support for search function.
// @include        *://*thepiratebay.*/search/*
// @include        *://*thepiratebay.*/browse/*
// @include        *://*kickass.to/*
// @exclude        *://*kickass.to/faq/*
// @exclude        *://*kickass.to/blog/*
// @exclude        *://*kickass.to/user/*
// @exclude        *://*kickass.to/browse/*
// @exclude        *://*kickass.to/community/*
// ==/UserScript==

function thePirateBay() {
    if (document.location.href.indexOf('browse') >= 0) {
        if (document.location.href.indexOf('/7/') < 0) {
            document.location.pathname = document.location.pathname.concat('/0/7/0');
        }
    } else if (URL.indexOf('/7/0') < 0) {
        document.location.pathname = document.location.pathname.replace('/99/', '/7/');
    };
}

function kickAss() {
    if (document.location.href.indexOf("?field=seeders") < 0) {
        document.location.pathname = document.location.pathname.concat("?field=seeders&sorder=desc");
    };
}

if (location.hostname.indexOf('thepiratebay') >= 0) {
    thePirateBay();
} else if (location.hostname.indexOf('kickass') >= 0 && location.pathname != '/' && location.pathname.indexOf('.html') < 0) {
    kickAss();
};