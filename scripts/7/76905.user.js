// ==UserScript==
// @name           xHamster Video Link
// @namespace      http://userscripts.org/users/165265
// @description    Adds a link to download videos on xhamster.com
// @include        http://xhamster.com/movies/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js
// ==/UserScript==

// Wrapper to delay the script execution (internal scripts need to run first).
window.setTimeout(function() {
	// Find the parameters of the flash player
	var flashvars = jQuery("#player param[name='flashvars']").attr('value');
	// Use substrings to build url of video
	var url = flashvars.substring(flashvars.indexOf("srv=") + 4, flashvars.indexOf("&", flashvars.indexOf("srv=") + 4)) + "flv2/" +	flashvars.substring(flashvars.indexOf("file=") + 5, flashvars.indexOf("&", flashvars.indexOf("file=") + 5));
	// Replace Link above video.
	jQuery("#top_player_adv").replaceWith(jQuery("<a>Download this video</a>").attr("href", url));
}, 60);
