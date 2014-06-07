// ==UserScript==
// @name           hide myspace waste
// @description    hides myspace mobile ads, tell people about myspace table, toms notices, and "myspace home page" link
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

var b = document.getElementById("home_additionalLinks");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_userURLInfo");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ctl00_CMS_Tom_Announcement");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_additionalLinks");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_setHomePage");
if (b) {b.parentNode.removeChild(b);}







