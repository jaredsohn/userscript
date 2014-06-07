// ==UserScript==
// @name           Remove FB crap from MobWars
// @namespace      http://userscripts.org/scripts/show/85270
// @description    Remove FB crap when playing MobWars
// @include        http://apps.facebook.com/mobwars/*
// ==/UserScript==

//FB Advertisements
var adSidebar = document.getElementById('sidebar_ads');
if (adSidebar) {
adSidebar.parentNode.removeChild(adSidebar);
}

//GF Offers
var adSidebar = document.getElementById('app8743457343_limited_offer_container_');
if (adSidebar) {
adSidebar.parentNode.removeChild(adSidebar);
}


//Additional Games
var adSidebar = document.getElementById('app8743457343_promoBar');
if (adSidebar) {
adSidebar.parentNode.removeChild(adSidebar);
}

//Heist
var adSidebar = document.getElementById('app8743457343_limited_heist_378');
if (adSidebar) {
adSidebar.parentNode.removeChild(adSidebar);
}

//FB Chat
var adSidebar = document.getElementById('fbDockChat');
if (adSidebar) {
adSidebar.parentNode.removeChild(adSidebar);
}

//FB Copyright, etc...
var adSidebar = document.getElementById('footerContainer');
if (adSidebar) {
adSidebar.parentNode.removeChild(adSidebar);
}

//MW Terms of Service
var adSidebar = document.getElementById('app8743457343_footerLinks');
if (adSidebar) {
adSidebar.parentNode.removeChild(adSidebar);
}

//FB Link, Notifications, search, etc...
var adSidebar = document.getElementById('pageHead');
if (adSidebar) {
//adSidebar.parentNode.removeChild(adSidebar);
}

//Blue bar across top
var adSidebar = document.getElementById('blueBar');
if (adSidebar) {
//adSidebar.parentNode.removeChild(adSidebar);
}

//FB Credits
var adSidebar = document.getElementById('canvas_nav_content');
if (adSidebar) {
adSidebar.parentNode.removeChild(adSidebar);
}