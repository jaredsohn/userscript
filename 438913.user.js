// ==UserScript==
// @name            9GAG Unmobile
// @namespace       http://alling.se
// @match           http://*.9gag.com/*
// @match           https://*.9gag.com/*
// @version         1.0.0
// @description     Redirects to the desktop website when you click a 9GAG Mobile link.
// @copyright       2014 Simon Alling
// ==/UserScript==

var url = document.location.href;

if (!!url.match("^https?:\/\/m\.9gag\.com")) {
    document.location.href = url.replace("m.9gag.com", "9gag.com");
}