// ==UserScript==
// @name           Nagios Reloaderizer
// @namespace      https://docs.rice.edu/confluence/display/~km6/Home
// @description    Script for autoreloading nagios notifications page every 15 minutes.
// @description    Written by LoQ
// @include        https://nagios1.your.url/*
// ==/UserScript==

// Check to see if notifications page is actually loaded in frame 1
setTimeout(function() { if(document.location.href=="https://nagios1.your.url/cgi-bin/nagios/notifications.cgi?contact=all"){document.location.reload();} } , 600000);

