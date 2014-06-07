// ==UserScript==
// @name        Dumpert.nl player fixer
// @namespace   Dumpert.nl player fixer
// @description Fixes mysteriously broken Dumpert player
// @author      Rebootr.nl
// @match       *://dumpert.nl/mediabase/*
// @match       *://www.dumpert.nl/mediabase/*
// @version     1
// @grant       none
// @licence     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

// This script requires jQuery but does not include it through this script's header
// because Dumpert.nl includes jQuery anyway

dumpertItem = $('#item1');

if(dumpertItem.hasClass('video')) {

	// Build embed URL using current URL
	urlSplit = window.location.href.split('/');
	embedURL = 'http://www.dumpert.nl/embed/'+urlSplit[4]+'/'+urlSplit[5]+'/';
	
	// The hack: use the embed feature of Dumpert's player
	// which somehow fixes my player problems
	dumpertItem.replaceWith('<iframe src="'+embedURL+'" width="480" height="272"></iframe>');
}