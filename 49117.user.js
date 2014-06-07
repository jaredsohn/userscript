// ==UserScript==
// @name           Skins.be direct images
// @author         Thomas V.
// @namespace      
// @description    Replaces framed preview links on Skins.be with unframed previews.
// @include        http://www.skins.be*
// ==/UserScript==

/**	licenced under a Creative Commons Attribution-NonCommercial-ShareAlike license
 **	http://creativecommons.org/licenses/by-nc-sa/2.5/
 **
 **		Thomas V.
 **		thx to Ben for the original script
 **
 **	This is a greasemonkey script, for use with the Firefox extension Greasemonkey.
 **	More info: http://greasemonkey.mozdev.org/
 **/

(function () {
	var wallpapers = window.document.getElementsByTagName("a");
	var parts, sChick, iPicID, sDims;
	for (var p = 0; p < wallpapers.length; p++) {
		if (wallpapers[p].href.indexOf("wallpaper.skins.be/") != -1) {
			parts = wallpapers[p].href.split("/");
			sChick = parts[parts.length-4]; // model name
			iPicID = parts[parts.length-3]; // image ID
			sDims = parts[parts.length-2]; // image dimensions
			if (sDims == "") (sDims = "1024x768")
			wallpapers[p].href = "http://wallpapers.skins.be/" + sChick + "/" +
				sChick + "-" + sDims + "-" + iPicID + ".jpg"
		}
	}

})();