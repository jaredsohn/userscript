// ==UserScript==
// @name         Guides Link
// @namespace    http://userscripts.org/users/35001
// @description  Add Guides Link to the Mainmenu.
// @include      http://userscripts.org/*
// @include      https://userscripts.org/*
// @author       Hannibal Smith.
// ==/UserScript==

// Copyright (c) 2008, Hannibal Smith
// Released under the BSD license.
// http://www.opensource.org/licenses/bsd-license.php

var bigmenu, myhtml;
bigmenu = document.getElementById( 'mainmenu' );

if ( bigmenu ) {
	myhtml = document.createElement( "div" );
	myhtml.innerHTML = '<li><a rel="nofollow" href="/guides">Guides</a></li>';
	bigmenu.appendChild( myhtml );
}
