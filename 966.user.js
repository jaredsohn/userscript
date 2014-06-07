// ==UserScript==
// @name          Netflix Preview Direct Link
// @namespace     http://www.j-san.net/code/greasemonkey
// @description	modifies preview button to link directly to the media file instead of the embedded player
// @include       http://www.netflix.com/MovieDisplay*
// @include       http://netflix.com/MovieDisplay*
// ==/UserScript==

/** The Preview feature in Netflix is very nice. 
 ** It's a windows media stream that opens in an embedded player.
 ** But sometimes it's nice to be able to
 ** choose the way it's displayed. This script simply gives you 
 ** a direct link to the source file so you can manipulate it in the
 ** same way you would any media stream, using external players or whatever.
 ** 
 ** licenced under a Creative Commons Attribution-NonCommercial-ShareAlike 2.0
 ** http://creativecommons.org/licenses/by-nc-sa/2.0/
 **
 ** Code by:
 ** Jason Rhyley - jason AT rhyley DOT org - www.rhyley.org
 **
 ** Packaged by:
 ** Jason Brackins - jason AT j-san DOT net
 **
 ** This is a greasemonkey script, intended for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **/
(function() 
{
	function updatePreviewButton() {
		for (var i=0; i < document.images.length; i++) {
			var a = document.images[i];
			if (a.src.indexOf("preview_btn") != -1) {
				a.parentNode.setAttribute("href", document.getElementsByTagName("embed")[0].src);
				a.parentNode.setAttribute("onclick", "");
				return;
			}
		}
	}

	updatePreviewButton();
})();


