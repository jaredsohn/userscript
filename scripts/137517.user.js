// ==UserScript==
// @id             7655
// @name           BoingBoing JK Hotkey Disabler
// @version        1.0
// @namespace  http://boingboing.net*
// @author         
// @description    
// @include        http://boingboing.net*
// @run-at         document-end

// ==/UserScript==

// Make jQuery work happily, so we don't just overwrite it.
var $ = unsafeWindow.jQuery;

$(document).ready(
	function() {
		// Eliminate the object for jknav, the plugin used to do all this.
		$.jknav = null;
	}
);