// ==UserScript==
// @name       Spickmich Tools by MrAndroidster
// @version		   2.0
// @namespace      http://userscripts.org/users/514417
// @author         MrAndroidster
// @description    AdBlocker (Bis auf Popups), Zentrieren der Seite, Auto-"Nur an meine Freunde", "Freunde einladen" und Level-Icons verborgen
// @include 		http://spickmich.de/*
// @include 		http://*.spickmich.de/*
// @run-at         document-end
// ==/UserScript==



//Seite zentrieren von MrAndroidster
var very_outer_frame = document.getElementById("very_outer_frame");
very_outer_frame.style.width = '810px';



//Nur für Freunde von Snehonja
document.getElementById("nc-friends-checkbox").checked = true;

//Adblock + Keine Icons von TheAaronReloaded
GM_addStyle(".experience, #headerInviteLink, #topBanner, #rightBanner, #leftBanner, #home-rectangle-ad, #nuggadLayer {display:none!important;}"); 
GM_addStyle("body {margin:0;padding:0;font-size:10pt;text-align:center;background-color:white!important;}");