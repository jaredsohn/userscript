// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Video Mail.ru resize
// @author         Roman Stets
// @namespace      http://www.hicraft.biz
// @description    resizes flash embed to pal resolution
// @include        http://video.mail.ru/*
// ==/UserScript==

// Assign the relevant objects to each info type
function GM_resizeVideo()
{
	// Fill an array with all div objects
	var embed = document.getElementById('contForPlayer').getElementsByTagName('embed')[0];
	embed.height = 576;
	embed.width = 720;
	embed.allowFullScreen = true;
}

GM_resizeVideo();