// ==UserScript==
// @name           Last.fm -> What.cd
// @author         Zach Dwiel
// @description    Provide link from last.fm pages to the what.cd search for that artist, album or track
// @include        *://*.last*fm*/music/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js
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
		$('#catalogueHead h1').append('<a href="http://what.cd/torrents.php?artistname='+artist+'&action=advanced&torrentname='+album+'"><img src="http://what.cd/favicon.ico" style="margin-left:0.5em"></a>');
	} else {
		artist = url.substring(begin+7, end);
		$('#catalogueHead h1').append('<a href="http://what.cd/artist.php?name='+artist+'"><img src="http://what.cd/favicon.ico" style="margin-left:0.5em"></a>');
	}
} );
