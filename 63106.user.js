// ==UserScript==
// @name           facebook https
// @description    modify links to use https

// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

as = document.getElementsByTagName('a');

for(i=0; i<as.length; ++i) {
    a = as[i];
    if(a.href.substring(0,5) == "http:") {
        a.href = "https" + a.href.substring(4);
    }
}