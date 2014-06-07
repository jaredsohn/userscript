/* -*-mode:JavaScript;coding:latin-1;-*- Time-stamp: "2006-09-11 15:26:00 AKDT"
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name          Guardian_nocomment
// @namespace     http://interglacial.com/
// @description	  Hides all user comments on Guardian pages
// @version       0.0.1
// @include       http://*.guardian.co.uk/*
// @author        sburke@cpan.org
// ==/UserScript==

GM_addStyle( "#comments, .individualcomment { display: none !important; }" );

// End
