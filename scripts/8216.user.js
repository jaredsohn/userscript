// ==UserScript==
// @name          last.fm Quick Links (user)
// @namespace     http://www.last.fm/user/bmxgamer
// @description   Adds links to header
// @include       http://*.last.fm/*
// ==/UserScript==


var quicklinks, nav; 

nav = document.getElementById('toglink'); 

quicklinks = document.createElement("b");
quicklinks.innerHTML = 
    '<a href=http://www.last.fm/forums><font color=#ffffff>forums</font></a> <a href=http://www.last.fm/dashboard/replytracker><font color=#ffffff>reply tracker</font></a> <a href=http://www.last.fm/wiki><font color=#ffffff>suggested wikis</font></a>';

nav.parentNode.insertBefore(quicklinks, nav);