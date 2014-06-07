// ==UserScript==
// @name          TwitchCleanser
// @version        1.4
// @description   Removes the chat column and doubles the video area size.
// @include        http://www.twitch.tv/*
// @include        http://*.twitch.tv/*
// @exclude		http://www.twitch.tv/*/popout
// @exclude		http://www.twitch.tv/
// @exclude		http://www.twitch.tv/directory/*
// ==/UserScript==

// Remove Twitch channel header, about box, related videos and other items.

function removeEach(ar){
    for(var i=0; i<ar.length;i++)
    ar[i].parentNode.removeChild(ar[i]);
}
removeEach(document.querySelectorAll("#header_banner, #facebook_connect, #archive_info_tabs, #archives, #about, #related_channels"));

// Doubles width of video and meta box, moves boxes around.

var twitchStyle = 
    '.live_site_player_container, .archive_site_player_container {' +
	'width: 920px !important;' +
	'height: 561px !important;' +
    '}' +
     '#live_site_player_flash, #archive_site_player_flash {' +
	'width: 920px !important;' +
	'height: 561px !important;' +
    '}' +
	'.c8 {' +
	'width: 920px !important;' +	
    '}' +
	'.c4 {' +
	'width: 920px !important;' +	
	'clear:left !important;' +
    '}' +
	'#chat_lines {' +
	'height: 350px !important;' +		
    '}' +
	'.swf_container {' +
	'background: transparent !important;' +		
    '}' +
	'#stats_and_description {' +
	'width: 900px !important;' +	
	'clear:left !important;' +
    '}';
GM_addStyle(twitchStyle);