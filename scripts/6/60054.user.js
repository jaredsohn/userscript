// YTOHWCentral!
// version 1.0
// 2009-10-17
// Copyright (c) 2009, Willy Barro - willybarro[at]gmail[dot]com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          YTOHWCentral!
// @description   Add's an icon to watch the video/musics from One Hit Wonder Central musics on Youtube!
// @include       http://www.onehitwondercentral.com/*
// @include       http://onehitwondercentral.com/*
// ==/UserScript==

// Add jQuery
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
	function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
	}
	GM_wait();

// jQuery Ready
function letsJQuery() {
	$('.yticon').remove();

	$('table:eq(0) > tbody > tr:eq(2) > td:eq(1) > table:eq(1) > tbody > .body').each(function() {
	var artistSong = $('td:eq(0) font', this).text() +' '+ $('td:eq(1) font', this).text();
	var ytLink = 'http://www.google.com/search?&btnI=745&hl=en&q='+ escape('Youtube '+ artistSong);

	$('td:eq(4)', this).prepend('<a href="'+ ytLink +'" class="yticon" target="_blank"><img src="http://s.ytimg.com/yt/mobile/img/pic_ytlogo_58x20-vfl124299.gif" alt="" height="14" border="0" /></a>');
	});
}