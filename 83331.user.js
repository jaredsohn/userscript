// ==UserScript==
// @name           YouTube random favorite
// @namespace      http://mike.thedt.net
// @description    Adds a link to channels which plays a random favorite video from that channel
// @include        http://www.youtube.com/*
// @include        http://*.youtube.com/*
// @version        1.1
// ==/UserScript==

var updating=false;
var username=null;
var favs=null;
var videos="";
var tc=0;

function downloadFavorites(page) {
	var updfav = document.getElementById('updfav');
	GM_xmlhttpRequest({
		method: "post",
		url: "http://www.youtube.com/profile_ajax?action_ajax=1&user="+username+"&new=1&box_method=load_playlist_page&box_name=user_playlist_navigator",
		headers: { "Content-type" : "application/x-www-form-urlencoded"},
		data: unsafeWindow.ajax_session_info+"&messages=%5B%7B%22type%22%3A%22box_method%22%2C%22request%22%3A%7B%22name%22%3A%22user_playlist_navigator%22%2C%22x_position%22%3A1%2C%22y_position%22%3A-2%2C%22palette%22%3A%22default%22%2C%22method%22%3A%22load_playlist_page%22%2C%22params%22%3A%7B%22playlist_name%22%3A%22favorites%22%2C%22encrypted_playlist_id%22%3A%22favorites%22%2C%22query%22%3A%22%22%2C%22encrypted_shmoovie_id%22%3A%22favorites%22%2C%22page_num%22%3A"+page+"%2C%22view%22%3A%22play%22%2C%22playlist_sort%22%3A%22default%22%7D%7D%7D%5D",
		onload: function(responseDetails) {
			var vids = /<div style=\\"display:none\\" class=\\"encryptedVideoId\\">(.*?)<\\\/div>/g;
			var match = vids.exec(responseDetails.responseText);
			while (match != null) {
				tc++;
				updfav.innerHTML="updating... "+tc+"/"+favs;
				videos += match[1] + ",";
				match = vids.exec(responseDetails.responseText);
			}
			if (page<(Math.ceil(favs/12)-1)) {
				downloadFavorites(page+1);
			}else{
				GM_setValue(username, videos);
				updfav.innerHTML="update";
				updating=false;
				alert("Updated!");
			}
		}
	});
}

function update(event) {
	if (!updating) {
		updating=true;
		tc=0;
		var updfav = document.getElementById('updfav');
		updfav.innerHTML="updating... "+tc+"/"+favs;
		GM_xmlhttpRequest({
			method: "post",
			url: "http://www.youtube.com/profile_ajax?action_ajax=1&user="+username+"&new=1&box_method=load_playlist&box_name=user_playlist_navigator&playlistName=favorites",
			headers: { "Content-type" : "application/x-www-form-urlencoded"},
			data: unsafeWindow.ajax_session_info+"&messages=%5B%7B%22type%22%3A%22box_method%22%2C%22request%22%3A%7B%22name%22%3A%22user_playlist_navigator%22%2C%22x_position%22%3A1%2C%22y_position%22%3A-2%2C%22palette%22%3A%22default%22%2C%22method%22%3A%22load_playlist%22%2C%22params%22%3A%7B%22playlist_name%22%3A%22favorites%22%2C%22view%22%3A%22play%22%2C%22playlist_sort%22%3A%22default%22%7D%7D%7D%5D",
			onload: function(responseDetails) {
				favs = responseDetails.responseText.match(/<input type=\\"hidden\\" id=\\"playnav-playlist-favorites-count\\" value=\\"(.*?)\\"\\\/>/)[1];
				var vids = /<div style=\\"display:none\\" class=\\"encryptedVideoId\\">(.*?)<\\\/div>/g;
				var match = vids.exec(responseDetails.responseText);
				while (match != null) {
					tc++;
					updfav.innerHTML="updating... "+tc+"/"+favs;
					videos += match[1] + ",";
					match = vids.exec(responseDetails.responseText);
				}
				if (favs>12) {
					downloadFavorites(1);
				}
			}
		});
	}
}

function random(event) {
	videos=GM_getValue(username, "update");
	var vids = videos.split(",");
	if (videos!="update") {
		var randnum = Math.floor(Math.random()*((vids.length)-1))
		GM_log(vids.length + " " + randnum);
		location.href="javascript:playnav.playVideo('favorites','0','"+vids[randnum]+"')"
	} else {
		alert("Please click update first!");
		videos="";
	}
}

window.addEventListener("load", function() {
	var playnav = document.getElementById('playnav-play-playlist-all-holder');
	if (playnav) {
		
		username=document.getElementsByClassName('box-title title-text-color');
		username = username[0].title;

		var mydiv = document.createElement('div');
		mydiv.style.fontSize='8pt';
		mydiv.innerHTML = '<a href="#" id="randfav">random favorite</a> (<a href="#" id="updfav">update</a>)';
		playnav.parentNode.insertBefore(mydiv, playnav);
		
		var updfav = document.getElementById('updfav');
		updfav.addEventListener('click', update, false);
		
		var randfav = document.getElementById('randfav');
		randfav.addEventListener('click', random, false);
	}
}, true);