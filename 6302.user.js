/* -*-mode:JavaScript;coding:latin-1;-*- Time-stamp: "2006-12-08 18:21:57 AKST"
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name          Youtube_Greyer
// @namespace     http://interglacial.com/
// @description	  Make Youtube not so eye-searingly bloomin' white
// @version       0.0.3
// @include       http://*.youtube.*
// @include       http://youtube.*/*
// @author        sburke@cpan.org
// ==/UserScript==

GM_addStyle( [

 " *:not(A) { ",
 "   background-image: none !important; ",
 "   background-color: #999 !important; ",
 "   color:            #000 !important; ",
 " }",
 " A:link     { color: #03d !important; }",
 " A:visited  { color: #000 !important; }",
 " A:active   { color: #0d0 !important; }",

 // And now a bit hackier...
 "#logoTagDiv, #exploreMoreTabs, #gNavDiv, #leaderboardAd, #searchDiv + table, ",
 "img[ src *= \"masthead\" ]  { display: none; }",

''].join("\n"));  // The sky above the port was the color of Youtube.
