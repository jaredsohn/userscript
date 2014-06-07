// Fix Autostart user script
// http://muujware.com/greasemonkey/fix-autostart.user.js
// 2006-08-04
// Copyright (c) 2006, Matthew W. Jackson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Fix Autostart", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Fix Autostart
// @namespace     http://muujware.com/greasemonkey/
// @description   Script to fix embed elements with autostart="false" instead of autostart="0"
// @include       *
// ==/UserScript==

(function() {
	// get all embed elements	
	var embeds = document.getElementsByTagName("embed");
	
	// loop through all embed elements
	for(var index = 0; index < embeds.length; ++index) {
		var embed = embeds[index];
		
		// get the autostart attribute
		var autostart = embed.getAttribute("autostart");
		
		// if autostart="false"
		if(autostart && autostart.toUpperCase() == "FALSE") {
			// deep clone the node
			var newEmbed = embed.cloneNode(true);
			
			// fix the autostart attribute
			newEmbed.setAttribute("autostart", "0");
			
			// replace the old node with the fixed one
			embed.parentNode.replaceChild(newEmbed, embed);
		}
	}
})();