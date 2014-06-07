// ==UserScript==
// @name           Opendns Block Page Cleaner
// @namespace      Matt
// @description    I suggest you install the <a href="http://userscripts.org/scripts/show/26062">script updater</a>because im sure there will be updates soon <br> Removes sponsored ads and cleans page of extra elements 
// @include        http://block.opendns.com/?url=*
// @include        http://block.opendns.com/controller.php*
// ==/UserScript==
// Author Matt
//any element you would like to keep add "//" (no quotes) to the front of the line



// remove ads
var adSidebar = document.getElementById('blocked-ads');if (adSidebar) {    adSidebar.parentNode.removeChild(adSidebar);}


//remove footer or "This service is powered by OpenDNS with data from St. Bernard's iGuard." and following images
var adSidebar = document.getElementById('footer');if (adSidebar) {    adSidebar.parentNode.removeChild(adSidebar);}


//remove the searchbox
var adSidebar = document.getElementById('searchbox');if (adSidebar) {    adSidebar.parentNode.removeChild(adSidebar);}


//remove the opendns guide logo 
var adSidebar = document.getElementById('logo');if (adSidebar) {    adSidebar.parentNode.removeChild(adSidebar);}

//extra clean up
var adSidebar = document.getElementById('header');if (adSidebar) {    adSidebar.parentNode.removeChild(adSidebar);}

//extra clean up
var adSidebar = document.getElementById('canvas');if (adSidebar) {    adSidebar.parentNode.removeChild(adSidebar);}

//extra clean up
var adSidebar = document.getElementById('bottom');if (adSidebar) {    adSidebar.parentNode.removeChild(adSidebar);}


//adds text
var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +    'border−bottom: 1px solid #000000; margin−bottom: 5px; ' +    'font−size: 58; background−color: #000000; ' +    'color: #00FF00;"><p style="font-size:50px"> ' +    'This Page Has Been Blocked ' +    '</p></div>';
document.body.insertBefore(logo, document.body.firstChild);