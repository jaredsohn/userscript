// ==UserScript==
// @name       Youtube Auto Sharing Disabler
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  After a youtube video played to the end a "share" tab was activated. This script prevents it. Warning: It also disables all the button functionality like share, flag etc..
// @match      http://*.youtube.com/*
// @copyright  2013+, You
// @require        http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==


$(document).ready(function() {
    var desc = $("#watch-description");
    $("#watch7-action-panels").hide();
    $(desc).insertBefore("#watch-discussion");
    
});
