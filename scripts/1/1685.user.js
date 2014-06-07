// ==UserScript==
// @name           Skins.be FrameKiller
// @author         Ben Lawson
// @namespace      http://www.eightseventeen.com/
// @description    Replaces framed preview links on Skins.be with unframed previews.
// @include        http://www.skins.be*
// ==/UserScript==

/**	licenced under a Creative Commons Attribution-NonCommercial-ShareAlike license
 **	http://creativecommons.org/licenses/by-nc-sa/2.5/
 **
 **		Ben Lawson
 **		http://www.eightseventeen.com
 **
 **	This is a greasemonkey script, for use with the Firefox extension Greasemonkey.
 **	More info: http://greasemonkey.mozdev.org/
 **/

(function () {
	var wallpapers = window.document.getElementsByTagName("a");
	var parts, sChick, iPicID, sDims;
	for (var p = 0; p < wallpapers.length; p++) {
		if (wallpapers[p].href.indexOf("/wallpaper/") != -1) {
			// example beginning href = http://www.skins.be/wallpaper/molly-sims/21842/1152x864/
			// example ending href = http://wallpapers.skins.be/molly-sims/molly-sims-1152x864-21842.jpg
			parts = wallpapers[p].href.split("/");
			sChick = parts[parts.length-4]; // model name
			iPicID = parts[parts.length-3]; // image ID
			sDims = parts[parts.length-2]; // image dimensions
			wallpapers[p].href = "http://wallpapers.skins.be/" + sChick + "/" +
				sChick + "-" + sDims + "-" + iPicID + ".jpg"
		}
	}

})();