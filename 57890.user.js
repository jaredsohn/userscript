// ==UserScript==
// @name				Animecrazy.net: One Piece Quick FLV Download Button
// @description			Display a button that will provide you with a direct link to the FLV of the current episode
// @namespace			http://userscripts.org/users/108524
// @version				1.0a
// @copyright			2009, Filip Dupanović ( http://kron.ba/ )
// @license 			MIT License; http://www.opensource.org/licenses/mit-license.php
// @more				http://userscripts.org/scripts/show/57890
// @require				http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        		http://*animecrazy.net/one-piece-episode-*
// ==/UserScript==

/**
 * SETUP
 */

var re = new RegExp('http://.*flv{1}');
var linkCss = {
	backgroundColor: '#BFFFBF',
	color: '#36B636',
	marginLeft: '5px',
}

jQuery.noConflict();	// Play nice with Prototype

if (jQuery('.episodeContent embed').length) {
	var flashVars = jQuery('.episodeContent embed').attr('flashvars');
	var match = flashVars.toString().match(re);
	
	if (!match) return; // No match for the FLV
	
	jQuery('<a href=\"' + match + '\" target=\"_blank\">Download FLV</a>').appendTo('.lastwatching center').css(linkCss);	
}
