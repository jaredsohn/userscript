//This is my first ever Greasemonkey script, please be gentle.
// ==UserScript==
// @name           TSR Nice-ifier
// @namespace     http://userscripts.org/users/94746
// @description    Remove various annoying elements from TSR forums.
// @include        http://www.thestudentroom.co.uk/*
// ==/UserScript==

//Removes the "Welcome to The Student Room" box at the top of the My TSR page
var featuredContent = document.getElementById('featuredContent');
if (featuredContent) {
    featuredContent.parentNode.removeChild(featuredContent);
}

//Want TSR without ads? YES, GO AWAY YOU STUPID ORANGE BOX.
var orgbox = document.getElementById('boxed_message_jointsrrequest');
if (orgbox) {
    orgbox.parentNode.removeChild(orgbox);
}

//Sets a cookie for permanent "slideup" of the orange box (won't appear on pageload before removal)
document.cookie =
  'bbsubtsrrequest=1; expires=9999999999999999999999999; path=/'

//Removing wide ad in the header
var adTop = document.getElementById('header_ad');
if (adTop) {
    adTop.parentNode.removeChild(adTop);
}

//Remove 300x250 ad on right column of home
var adRight = document.getElementById('iframe_adbit_300_250');
if (adRight) {
    adRight.parentNode.removeChild(adRight);
}

