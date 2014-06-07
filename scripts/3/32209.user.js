// ==UserScript==
// @name           GoogleCacheSurfer
// @namespace      webmonkey
// @description    Change the links from the cached page to point to cached pages. No extra styling crap, dead-simple. Keeps the links in google's header untouched.
// @include        http://webcache.googleusercontent.com/*
// ==/UserScript==

IS_JS_LINK = /javascript:.*/;
IS_ABS_LINK = /https?\:\/\/.*/;
IS_CACHE = /This is Google's cache of /;
NOT_FOUND_REPLACEMENT = /<p>The requested URL <code>\/search\?q=cache%3A(.*?)<\/code> was not found on this server./;
if (IS_CACHE.exec(document.body.innerHTML)) {
    var links = document.links;
    for (var i=0; i<links.length; i++) {
        var link = links[i];
        var href = link.href;
        var test = link.parentNode;
        while (test && test != document.body.firstChild) 
            test = test.parentNode;
        if (!test && !IS_JS_LINK.exec(href)) {
            if (IS_ABS_LINK.exec(href)) {
                link.href = "http://www.google.com/search?q=cache%3A" + encodeURIComponent(link.href);
            } else {
                link.href = "http://www.google.com/search?q=cache%3A" + encodeURIComponent(document.baseURI+link.href);
            }
        }
    } 
} else {
    document.body.innerHTML = document.body.innerHTML.replace(NOT_FOUND_REPLACEMENT, function(str, x) {
        x = decodeURIComponent(x);
        return '<a href="'+x+'">'+x+'</a>';
    });
}