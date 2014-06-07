// ==UserScript==
// @name        YouTube Watch Via Playlist
// @namespace   YouTube
// @description Adds a "Watch Via Playlist"-button next to YouTube's Like-Dislike-buttons
// @include     *youtube.com/*
// @version     1.4
// @author      GDur
// ==/UserScript==
/*
Copyright (c) 2013 GDur (Gregor A.)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy or modify the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*
 * Original icon:
 * made by: Gentleface.com - http://www.gentleface.com 
 * found on: http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/list_num.png
 */ 

// easy adjustments possible:
var buttonTooltip	= "by GDur =)";
var buttonLabel		= "Watch Via Playlist";
var buttonImage		= "data:image/png;base64,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";


/*
 * expertise necessary:
 */
var willLog			= false;

var isLikable		= document.getElementById("watch7-sentiment-actions");
var container		= document.getElementById("watch-like-dislike-buttons");
var created			= false;
if (isLikable) {
	addScript();
	var videoID	= getParam('v');
	doForEachTagName("link", function(element) {
		if (element.href.search("http://www.youtube.com/user/") !== -1) {
			userID = element.href.split("/")[4];
			cons("Searching in " + userID + "'s playlists for v=" + videoID);
			getPlylistIdViaVideoId(userID, videoID);
		}
	});
}

function addScript() {
	var D					= document;
	var scriptNode			= D.createElement('script');
	scriptNode.type			= "text/javascript";
	scriptNode.textContent	= linkToPL.toString();
	var targ				= D.getElementsByTagName('head')[0] || D.body || D.documentElement;
	targ.appendChild(scriptNode);
}

function getPlylistIdViaVideoId(userID, videoID) {
	var link = "https://gdata.youtube.com/feeds/api/users/" + userID + "/playlists?v=2&max-results=50&alt=json";
	GM_xmlhttpRequest({
		// synchronous: true,
		method: "GET",
		url: link,
		onload: function(response) {
			try {
				var playlists = JSON.parse(response.responseText);
				var entries = playlists.feed.entry;
				for (var j = 0; j < entries.length; j++) {
					var playlistID = entries[j].yt$playlistId.$t;
					var count = entries[j].yt$countHint.$t;

					cons("Searching in Playlist: " + playlistID);
					var k = 0;

					if (count >= 50) {
						for (; k < Math.floor(count / 50); k++) {
							cons("start: " + (k * 50) + " long: " + 50);
							ifVideoIDInPlaylist(playlistID, videoID, k * 50, 50);
						}
					}
					cons("start: " + (k * 50) + " long: " + (count % 50));
					ifVideoIDInPlaylist(playlistID, videoID, k * 50, (count % 50));
				}
			} catch (error) {
				cons("Error: " + error);
			}
		}
	});
}

function ifVideoIDInPlaylist(playlistID, videoID, start, count) {
	var link = "http://gdata.youtube.com/feeds/api/playlists/" + playlistID + "?start-index=" + (start + 1) + "&max-results=" + (count) + "&alt=json";

	GM_xmlhttpRequest({
		//synchronous: true,
		method: "GET",
		url: link,
		onload: function(response) {
			try {
				var aList	= JSON.parse(response.responseText);
				var entries	= aList.feed.entry;
				for (var j = 0; j < entries.length; j++) {
					if (entries[j].gd$comments !== undefined) {
						var tmpVideoID = entries[j].gd$comments.gd$feedLink.href;
						if (tmpVideoID.search(videoID) !== -1) {
							cons("Found v=" + videoID + " in playlist " + playlistID);
							container.innerHTML += createButton(playlistID, videoID);
						}
					}
				}
			} catch (error) {
				cons("Error: " + error);
			}
		}
	});
}

function doForEachTagName(tagName, fn) {
	var divs = document.getElementsByTagName(tagName);
	for (var j = 0; j < divs.length; j++) {
		fn(divs[j]);
	}
}

function linkToPL(vid, pid) {
	var ytplayer	= document.getElementById('movie_player');
	var link		= 'http://www.youtube.com/watch?v=' + vid + '&list=' + pid + '&t=' + Math.floor(ytplayer.getCurrentTime());
	window.location = link;
}

function createButton(playlistID, videoID) {
	if (created) {
		return "";
	}
	
	var button	= '<span style="padding-right=0px;margin-right=0px;"><button data-tooltip-text="'+buttonTooltip+'" type="button" title="'+buttonTooltip+'" onclick="linkToPL(\'' + videoID + '\',\'' + playlistID + '\');return false;" class="yt-uix-button yt-uix-button-text yt-uix-tooltip"  data-orientation="vertical" data-like-tooltip="'+buttonTooltip+'"  data-position="bottomright" data-unlike-tooltip="'+buttonTooltip+'" role="button"><span class="yt-uix-button-icon-wrapper">  <img class="yt-uix-button-icon " src="'+buttonImage+'" alt="'+buttonLabel+'" title=""><span class="yt-uix-button-valign"></span></span><span class="yt-uix-button-content"  style="padding-right=0px;margin-right=0px;">'+buttonLabel+' </span></button></span>'
	created		= true;
	return button;
}

function cons(a) {
	if (willLog) console.log("YouTube Greasemonkey - " + a);
}

function getParam(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}