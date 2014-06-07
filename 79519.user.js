// ==UserScript==
// @name           Google Cache Redirect
// @description    Replaces links to use Google's cache version

// @include http://example.com/*
// @exclude http://webcache.googleusercontent.com/*

// ==/UserScript==

if (window.location.protocol == "http:") {
  (function() {
    var l=window.location; 
    l.replace(l.href.replace(/^http:/, 'http://webcache.googleusercontent.com/search?q=cache:http:'));
  })();
}