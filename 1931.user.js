// ==UserScript==
// @name          Widen freebsd.org
// @namespace     http://www.tobez.org/download/greasemonkey/
// @description   Widen fixed width layout of www.freebsd.org
// @include       http://*.freebsd.org/*
// ==/UserScript==

/**
 ** freebsd-widen.user.js version 0.01
 **
 ** ----------------------------------------------------------------------------
 ** "THE BEER-WARE LICENSE" (Revision 42)
 ** <tobez@tobez.org> wrote this file.  As long as you retain this notice you
 ** can do whatever you want with this stuff. If we meet some day, and you think
 ** this stuff is worth it, you can buy me a beer in return.   Anton Berezin
 ** ----------------------------------------------------------------------------
 **
 ** There is an ongoing bikeshed about new freebsd.org site look and feel.
 ** This script is my small contribution to it.
 ** 
 ** This is a greasemonkey script, intended for use with the Firefox extension
 ** Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **
 **/

(function() 
{
	function do_widen(id, width, min) {
		var container = document.getElementById(id);
		if (!container)
			return;
		if (width)
			container.style.width = width;
		if (min)
			container.style.minWidth = min;
	}
	
	function widen_freebsd_website_layout() {
		do_widen("container", "75%", "765px");
		do_widen("CONTAINER", "75%", "765px");
	}
	
	widen_freebsd_website_layout();
})();
