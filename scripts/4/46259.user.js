// ==UserScript==
// @name           Redirection links cleaner
// @namespace      http://www.info.unicaen.fr/~amignon/
// @description    Rewrite links to removing redirection like those using usercash.com
// @include        http://*
// @exclude        http://*.yahoo.com/*
// @exclude        http://*.google.fr/*
// @exclude        http://*.google.com/*
// @exclude        http://www.exalead.fr/*
// @version        0.0.3
// ==/UserScript==

var links = document.getElementsByTagName("a");
for (var i = 0; i<links.length ; i++) {
    var l = links[i];
    lastindex = l.href.lastIndexOf("http://");
    if (lastindex > 0) l.href=l.href.substring(lastindex,l.href.length);
}