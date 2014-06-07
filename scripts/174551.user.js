// ==UserScript==
// @id             TeamLiquid.net Twitch to VLC
// @name           TeamLiquid.net Twitch to VLC
// @version        1.0
// @namespace      None
// @author         stranac
// @description    Adds the ability to copy a stream to vlc command to TL stream pages. Works only on twitch.tv streams.
// @include        http://www.teamliquid.net/video/streams/*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

/**
 * This script user "bog's awesome stream -> vlc script"
 * http://bogy.mine.nu/sc2/stream2vlc.php
 * The produceCmdLine function is taken from that site(and modified slightly)
 */

// Modify the paths as needed
// These are just what I have on my windows computer
RTMPDUMP_PATH = 'C:\\Program Files\\rtmpdump\\rtmpdump.exe';
VLC_PATH = 'C:\\Program Files\\VideoLAN\\VLC\\vlc.exe';


function produceCmdLine(params) {
	// check rtmpdump path format
	if(RTMPDUMP_PATH.match(/^[a-z]:[\\\/]/i)) { // windows paths
		RTMPDUMP_PATH = '"'+RTMPDUMP_PATH+'"';
	} else { // assume unixoid paths
		RTMPDUMP_PATH = RTMPDUMP_PATH.replace(/ /, "\\ ");
	}
	// check vlc path format
	if(VLC_PATH.match(/^[a-z]:[\\\/]/i)) { // windows paths
		VLC_PATH = '"'+VLC_PATH+'"';
	} else { // assume unixoid paths
		VLC_PATH = VLC_PATH.replace(/ /, "\\ ");
	}
	
	return RTMPDUMP_PATH+' '+params+' | '+VLC_PATH+' - --play-and-exit';
}


var channelRe = /<a href="http:\/\/www\.twitch\.tv\/(.+?)">View on Twitch\.tv<\/a>/;
var channelName = document.documentElement.innerHTML.match(channelRe)[1];

function createCopyLink(command) {
	var twitchLink = $('a:contains("View on Twitch")');

	var copyLink = document.createElement('a');
	copyLink.href = '';
	copyLink.innerHTML = 'Copy stream to VLC command to clipboard';
	copyLink.addEventListener('click', function(e) {
		prompt("Copy to clipboard: Ctrl+C, Enter", command);
		e.preventDefault();
			});

	twitchLink.after('&nbsp;&nbsp;&nbsp;', copyLink);
}

GM_xmlhttpRequest({
	method: "POST",
	overrideMimeType: "application/json",
	headers: {"Content-Type": "application/x-www-form-urlencoded"},
	url: "http://bogy.mine.nu/sc2/stream2vlc.php",
	data: "channelname=" + channelName + "&hoster=justin",
	onload: function(response) {
		responseJSON = JSON.parse(response.responseText);
		if (responseJSON['720p'] !== undefined) {
			res = responseJSON['720p'];
		}
		else {
			res = responseJSON['live'];
		}
		var command =  produceCmdLine(res);
		createCopyLink(command);
	}
});

