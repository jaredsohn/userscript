// ==UserScript==
// @name       Followshows tracker button
// @namespace  http://followshows.com
// @version    0.4
// @description  enter something useful
// @match      http://followshows.com/*
// @copyright  2012+, Koen T'Sas
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
$(document).ready(function() {
    $(".links").append('<li><a href="/tracker">My shows</a></li>');
});