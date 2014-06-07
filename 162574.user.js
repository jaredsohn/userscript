// ==UserScript==
// @name       Spickmich Cleaner
// @version    1.0
// @description  Ein einfach gemachtes Script, um alle Level-Icons in der Leiste links auf der Spickmich-Seite, den "Freunde einladen"-Button oben links und die Werbungen zu entfernen (außer popups).
// @match      http://www.spickmich.de/*
// @copyright  http://www.facebook.com/AaronAverage
// ==/UserScript==



GM_addStyle(".experience, #headerInviteLink, #topBanner, #rightBanner, #leftBanner, #home-rectangle-ad, #nuggadLayer {display:none!important;}"); 
GM_addStyle("body {margin:0;padding:0;font-size:10pt;text-align:center;background-color:white;}");