// ==UserScript==
// @name           Last.fm to Sputnik
// @author         SavageCore
// @description    Provide link from last.fm pages to the Sputnikmusic search for that artist
// @include        *://*.last*fm*/music/*
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready( function() {
	var url = document.location.href;
	var begin = url.indexOf('/music/');
	var end = url.length;
	var params = url.indexOf('?', begin+7);
	if (params != -1) {
		end = params;
	}
	var slash = url.indexOf('/', begin+7);
	if (slash != -1) {
		artist = url.substring(begin+7, slash)
		album = url.substring(slash+1, end)
		$('#catalogueHead h1').append('<a href="http://www.sputnikmusic.com/search_results.php?genreid=0&search_in=Bands&search_text='+artist+'&x=0&y=0" target="_blank"><img src="http://sputnikmusic.com/favicon.ico" style="margin-left:0.5em"></a>');
	} else {
		artist = url.substring(begin+7, end);
		$('#catalogueHead h1').append('<a href="http://www.sputnikmusic.com/search_results.php?genreid=0&search_in=Bands&search_text='+artist+'&x=0&y=0" target="_blank"><img src="http://sputnikmusic.com/favicon.ico" style="margin-left:0.5em"></a>');
	}
} );