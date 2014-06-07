// ==UserScript==
// @name           Last.fm -> What.cd
// @author         Zach Dwiel
// @description    Provide link from last.fm pages to the what.cd search for that artist, album or track
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
    if(document.body.className.match('r-track')) {
      t = url.substring(begin+7, end).split('/');
      artist = t[0];
      album = t[1];
      track = t[2];
      $('.pagehead h1 .featuredAlbum').before('<a href="http://what.cd/torrents.php?artistname='+artist+'&action=advanced&filelist='+track+'"><img src="http://what.cd/favicon.ico" style="margin-left:0.5em"></a>');
    } else {
      artist = url.substring(begin+7, slash)
      album = url.substring(slash+1, end)
      $('#catalogueHead h1').append('<a href="http://what.cd/torrents.php?artistname='+artist+'&action=advanced&groupname='+album+'"><img src="http://what.cd/favicon.ico" style="margin-left:0.5em"></a>');
    }
	} else {
		artist = url.substring(begin+7, end);
		$('#catalogueHead h1').append('<a href="http://what.cd/artist.php?artistname='+artist+'"><img src="http://what.cd/favicon.ico" style="margin-left:0.5em"></a>');
	}
} );