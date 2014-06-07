// ==UserScript==
// @name Youtube Favorite Button
// @description Adds a button for favoriting YouTube videos.
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @exclude
// ==/UserScript==
var share, info, fav, notify, notifyid, visible;
share = document.getElementById("watch-share");
info = document.getElementById("watch-info");
visible = false;

function favorite() {
	var st 	= document.getElementsByName('session_token')[2].value;
	var vid = document.getElementsByName('video_id')[0].value;
		
	GM_xmlhttpRequest({
		method: "post",
		url: "http://www.youtube.com/addto_ajax?feature=watch&action_add_to_favorites=1",
		headers: { "Content-type" : "application/x-www-form-urlencoded" },
		data: "video_ids="+encodeURIComponent(vid)+"&playlist_id&new_playlist_name&session_token="+encodeURIComponent(st),
	});
	
	if (visible == false) {
		notify = document.createElement('div');
		notify.innerHTML = '<div id="notify" style="text-align:center; font-size:14px; margin-bottom:6px;">This video has been added to your favorites.</div>';
		info.parentNode.insertBefore(notify, info);
		visible = true;
		setTimeout(function() { document.getElementById('notify').style.display = 'none'; visible = false; }, 5000);
	} else {
		
	}
}

if (share) {
	fav = document.createElement('button');
	fav.innerHTML = '<button style="margin-right:6px;" onclick=";return false;" title="Download" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip" id="downloadbtn" data-button-action="yt.www.watch.add" role="button" aria-pressed="false" data-tooltip="Add to favorites" data-button-listener="29" data-tooltip-title="Add to favorites" data-tooltip-timer="348746">Favorite</span></button>';
	fav.addEventListener('click', favorite, true);
	share.parentNode.insertBefore(fav, share);
}