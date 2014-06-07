// ==UserScript==
// @name           YouTube automatically favorite when liking a video
// @namespace      http://mike.thedt.net
// @description    Automatically favorites a video when you like it.
// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// @include        https://youtube.com/*
// @include        https://*.youtube.com/*
// @version        1.6
// ==/UserScript==

var lastVid='';

function likeClicked(event)
{
	if (document.getElementById('fav').checked) {
		var myRegexp = /yt\.net\.ajax\.setToken\('addto_ajax', "(.*?)"\);/ig;
		//var st = document.getElementsByName('session_token');
		//st = st[st.length-1].value;
		var st = myRegexp.exec(document.body.innerHTML);
		st = st[1];
		
		var vid = document.getElementsByName('video_id')[0].value;
		
		GM_xmlhttpRequest({
			method: "post",
			url: "http://www.youtube.com/addto_ajax?feature=watch&action_add_to_favorites=1",
			headers: { "Content-type" : "application/x-www-form-urlencoded" },
			data: "video_ids="+encodeURIComponent(vid)+"&playlist_id&new_playlist_name&session_token="+encodeURIComponent(st),
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
			mydiv.innerHTML = '<input type="checkbox" name="fav" id="fav" checked="checked" style="margin-left: 0px;"/>Favorite';
			var watchActions = document.getElementById('channel-like-buttons');
			watchActions.appendChild(mydiv);
		}
	}, false);
} else if (like) { //if it is not a channel
	like.addEventListener("click", likeClicked, false);
	GM_addStyle("#watch-actions { height: auto !important; }");
	var mydiv = document.createElement('div');
	mydiv.innerHTML = '<input type="checkbox" name="fav" id="fav" checked="checked" style="margin-left: 0px;"/>Favorite';
	var watchActions = document.getElementById('watch-actions');
	if (watchActions)
		watchActions.appendChild(mydiv);
}