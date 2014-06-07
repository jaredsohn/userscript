// ==UserScript==
// @name           hide myspace info bar
// @description    hides info bar on home page (EX: profile views, last login)
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

var b = document.getElementById("home_infobar");
if (b) {b.parentNode.removeChild(b);}

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

var b = document.getElementById("home_schools");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("footer");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("squareAd");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("headerlinks");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("row0");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("header_search");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("header");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("splash_coolNewPeople");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_searchAddressBook");
if (b) {b.parentNode.removeChild(b);}