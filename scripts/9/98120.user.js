// ==UserScript==
// @name           icetrade.by details link corrector
// @namespace      http://userscripts.org/users/123
// @include        http://www.icetrade.by/*
// @include        http://icetrade.by/*
// @include        http://old.icetrade.by/*
// ==/UserScript==

var links = document.querySelectorAll("a[href*='/Tenders.nsf/0/']");
//GM_log(links.length);
if (links) {
    for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute("href");
        href = href.replace(/\/0\//gi, "/c598373f062d42e5c225721d005a7a92/");
        href = href.replace(/&login/gi, "");
        //GM_log("href: " + href);
        links[i].setAttribute("href", href);
    }
}