/* -*-mode:JavaScript;coding:latin-1;-*- Time-stamp: "2006-07-13 22:15:07 ADT"
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name          LiveJournal_Kill_Navbar
// @namespace     http://interglacial.com/
// @description	  Kill the LiveJournal navbar
// @version       0.0.2
// @include       http://*.livejournal.com/*
// @author        sburke@cpan.org
// ==/UserScript==
/*
		      "LiveJournal_Kill_Navbar"

Livejournal navbar, you displease me.  You displease me bad.
So this hides that navbar.  Hides it good.

*/

GM_addStyle( "body { padding-top: 0 !important }" );
GM_addStyle( "#lj_controlstrip { display: none !important }" );

// End
