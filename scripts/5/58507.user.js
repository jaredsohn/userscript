// ==UserScript==
// @name        MiniMode
// @namespace   http://fluidapp.com
// @description A mini mode for Lala
// @include     *
// @author      Adam Nolley
// @version     1.2
// @updated     04/10/09
// @udated by   Joshua Goggans
// @notes		updated to resize correctly with the new lala.com interface design
// ==/UserScript==

if (typeof jQuery == "undefined") {
	// Include jQuery and set it up in noConflict mode so it doesn't override $(), which Lala has already defined
	window.fluid.include(window.fluid.userscriptPath + 'jquery-1.2.6.min.js');
	
	if (typeof jQuery == "undefined" && !window.__lala_MiniMode_jQueryWarned) {
		window.__lala_MiniMode_jQueryWarned = true;
		alert("Unable to load jQuery. The MiniMode userscript will not function without it. Please download the full Lala userscript package from nanovivid.com.");
	} else {
		jQuery.noConflict();
	}
}

if (!window.__lala_MiniMode_loaded && typeof jQuery != "undefined") {
	window.__lala_MiniMode_loaded = true;
	
	var __lala_MiniMode = new Object();
	
	jQuery(document).ready(function() {
		
		// We need to take the window chrome into account when sizing
		function getChromeHeight() {return window.outerHeight - window.innerHeight};
		function getChromeWidth() {return window.outerWidth - window.innerWidth};
		
		// If we haven't already added the resize button, go ahead and initialize things
		if (!jQuery("#__lala_MiniMode_Button").is("*")) {
			
			// Create the element and set its CSS properties
			jQuery(
				'<div id="__lala_MiniMode_Box" style="position: absolute; top: 0; right: 0; padding: 1px 3px 0 0; height: 15px; width: 15px; z-index: 10000;"></div>'
			).css({
				background: jQuery("#playerRegion").css("background-color")
			}).append(
				'<div id="__lala_MiniMode_Button" title="Mini mode" style="float: right; height: 15px; width: 15px; padding 0 0 0 0; color: white; font-weight: normal; font-size: 22px; line-height: 0.8; text-align: right; text-decoration: none; cursor: pointer;">&#x2296;</div>'
			).toggle(
				// We'll switch between big and small on click
				
				// Big -> Small
				function() {
					
					// Record current info for restoration
					__lala_MiniMode.oldWidth = window.outerWidth - getChromeWidth();
					__lala_MiniMode.oldHeight = window.outerHeight - getChromeHeight();
					__lala_MiniMode.oldHeaderHeight = jQuery("#headerRegion").height();
					__lala_MiniMode.oldPlayerWidth = jQuery("#litePlayerEmbed").width();
					__lala_MiniMode.oldBackground = jQuery("#headerRegion").css("background-color");
					
					// Shrink into mini mode
					window.resizeTo(713, 58 + getChromeHeight());
					
					// Kill the scrollbars
					jQuery("html").css("overflow", "hidden");
					
					// Hide things that will clutter up the display
					jQuery("#headerSearchBox,#headerNav,#headerLogoCell,#headerStripes,#headerPlaylistButton,#headerShareButton,#btnSeparator").css("display", "none");
					
					// Resize the header
					jQuery("#headerRegion").height(window.innerHeight).css("background-color", jQuery("#playerRegion").css("background-color"));
					
					// Fix the player width
					jQuery("#litePlayerEmbed").css("width", 588);
					
					// Change the button glyph & possition
					jQuery("#__lala_MiniMode_Button").html("&#x2295;").attr("title", "Normal Mode");
					
					jQuery("#__lala_MiniMode_Box").attr("style", "position: absolute; top: 0; right: 0; padding: 1px 260px 0 0; height: 15px; width: 15px; z-index: 10000;");

				
				},
				// Small -> Big
				function() {
					
					// Make the window big
					window.resizeTo(__lala_MiniMode.oldWidth + getChromeWidth(), __lala_MiniMode.oldHeight + getChromeHeight());
					
					// Bring back the scrollbars
					jQuery("html").css("overflow", "auto");
					
					// Show the things we hid
					jQuery("#headerSearchBox,#headerNav,#headerPlaylistButton,#headerShareButton,#btnSeparator").css("display", "block");
					jQuery("#headerLogoCell,#headerStripes").css("display", "table-cell");
					
					// Put the player back to its original size
					jQuery("#litePlayerEmbed").css("width", __lala_MiniMode.oldPlayerWidth);
					
					// Restore color
					jQuery("#headerRegion").height(__lala_MiniMode.oldHeaderHeight).css("background-color", __lala_MiniMode.oldBackground);
					
					// Change the back button glyph & possition
					jQuery("#__lala_MiniMode_Button").html("&#x2296;").attr("title", "Mini Mode");
					
					jQuery("#__lala_MiniMode_Box").attr("style", "position: absolute; top: 0; right: 0; padding: 1px 3px 0 0; height: 15px; width: 15px; z-index: 10000;");
					
				}
			).andSelf(
			).appendTo("#headerRegion");
			
		}
		
	});

}
