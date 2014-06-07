// ==UserScript==
// @name         Overall scrobbles
// @include      http://www.last.fm/music/*
// @include      http://www.lastfm.*/music/*
// @include      http://cn.last.fm/music/*
// @exclude      http://www.last.fm/music/*/*
// @exclude      http://www.lastfm.*/music/*/*
// @exclude      http://cn.last.fm/music/*/*
// @description  Display overall scrobbles in right column
// @author       nameless_fairy
// @version      0.2
// ==/UserScript==

window.addEventListener('load', function(){

if (self != window.top) { return; } // Don't run in frames

		var section = document.getElementsByClassName('catalogue-scrobble-graph-top-data');
		// overall scrobbles are in second section ^ in tag 'strong'
		var scrobbles = section[1].getElementsByTagName('strong')
		// we will replace this
		var userscrobbles = document.getElementsByClassName('user-scrobbles');
		
		userscrobbles[0].innerHTML = '<b>' + scrobbles[0].innerHTML + '</b><div class="lite">scrobbles</div>';
}, false );