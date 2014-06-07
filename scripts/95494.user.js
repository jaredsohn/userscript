// ==UserScript==
// @name          Facebook HTTPS
// @description   Redirect facebook.com to the SSL version
// @include       http://www.facebook.com/*
// @run-at        document-start 
// ==/UserScript==

if(window.location.protocol == "http:") {
    window.location.protocol = "https:";
}

