// ==UserScript==
// @name       Quora Share
// @namespace  kevmo.info
// @version    0.1
// @description  adds "?share=1" to URLS, i.e. let's you view full Quora content w/o being logged in.
// @include      https://*.quora.com/*
// @include      http://*quora.com/*
// @copyright  Creative Commons
// ==/UserScript==

var url = window.location.href;

if (url.indexOf("?share=1") === -1){
    url +="?share=1";
    window.location.replace(url);
};
