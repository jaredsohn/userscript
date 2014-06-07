/* Arte TV Greasemonkey Script
   Copyright 2007 Matt Aimonetti
	
   This software is licensed under the CC-GNU LGPL:
   <http://creativecommons.org/licenses/LGPL/2.1/>

   2007/12/30 - Initial release
*/

// ==UserScript==
// @name          Arte TV
// @namespace     http://arte-tv-greasemonkey.googlecode.com
// @description   Lets you watch your favorite Arte TV shows from outside Germany/France
// @include       http://plus7.arte.tv/fr/detailPage/*
// @include       http://plus7.arte.tv/de/detailPage/*
// ==/UserScript==

// supercomplicated hack :p
  if (window.location.href.match(/html$/)){
    window.location.href = window.location.href.replace(/html$/, "htmlame");
  };