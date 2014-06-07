// ==UserScript==
// @name           Like = Favorite Rape Edition Youtube
// @namespace      SuperRicardoWorld
// @description    
// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// @version        1.3
// ==/UserScript==

var lastVid='';

function likeClicked(event)
{
	if (document.getElementById('fav').checked) {
		var st 	= document.getElementsByName('session_token')[2].value;
		var vid = document.getElementsByName('video_id')[0].value;
		
		GM_xmlhttpRequest({
			method: "post",
			url: "http://www.youtube.com/watch_ajax?log_action_add_favorite_video&log_add_to_favorite=on",
			headers: { "Content-type" : "application/x-www-form-urlencoded" },
			data: "session_token="+encodeURIComponent(st)+"&action_add_favorite_video=1&video_id="+encodeURIComponent(vid)+"&playlist_id=&add_to_favorite=on&new_playlist_name=",
		});
	}
}

var like = document.getElementById('watch-like');
var playnav=document.getElementById('playnav-video-panel-inner');

if (playnav) { //if it is a channel
	playnav.addEventListener("DOMNodeInserted", function() {
		var like = document.getElementById('watch-like');
		if (like && lastVid!=document.getElementsByName('video_id')[0].value) {
			lastVid=document.getElementsByName('video_id')[0].value;
			like.addEventListener("click", likeClicked, false);
			var mydiv = document.createElement('div');
			mydiv.innerHTML = '<input type="checkbox" name="fav" id="fav" checked="checked" style="margin-left: 0px;"/>Rape me while liking';
			var watchActions = document.getElementById('channel-like-buttons');
			watchActions.appendChild(mydiv);
		}
	}, false);
} else if (like) { //if it is not a channel
	like.addEventListener("click", likeClicked, false);
	GM_addStyle("#watch-actions { height: auto !important; }");
	var mydiv = document.createElement('div');
	mydiv.innerHTML = '<input type="checkbox" name="fav" id="fav" checked="checked" style="margin-left: 0px;"/>Rape me while liking';
	var watchActions = document.getElementById('watch-actions-left');
	if (watchActions)
		watchActions.appendChild(mydiv);
}