// ==UserScript==
// @name        Jheberg timer bypass
// @description Automatically bypass the timer of jheberg when accessing a file
// @updateURL   http://userscripts.org/scripts/source/170505.meta.js
// @installURL  http://userscripts.org/scripts/source/170505.user.js
// @icon        http://jheberg.net/img/favicon.png
// @include     *jheberg.net/redirect/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version     1.0
// @grant none
// ==/UserScript==

splitPath = window.location.pathname.split("/");
slug = splitPath[2]; // Id of the download
host = splitPath[3]; // Host of the download

jQuery.post("/redirect-ajax/", {
    'slug': slug,
    'host': host
}, function (data) {
    var obj = jQuery.parseJSON(data); // Get the real URL
    if (obj.error == 0) {
        document.location.href = obj.url; // Redirect to it
    }
});