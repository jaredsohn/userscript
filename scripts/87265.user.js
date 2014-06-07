// ==UserScript==
// @name           YouTube favorites search
// @namespace      http://mike.thedt.net
// @description    Allows you to search the favorites of a YouTube user
// @include        http://*.youtube.com/*
// @version        1.0
// ==/UserScript==

var updating=false;
var username=null;
var favs=null;
var videos="";
var names="";
var users="";
var durat="";
var tc=0;
var template = '<div class="playnav-item playnav-video" id="playnav-video-play-favorites-0-%VIDEOID%"><div class="encryptedVideoId" style="display:none">%VIDEOID%</div><div class="selector" id="playnav-video-play-favorites-0-%VIDEOID%-selector"></div><div class="content"><div class="playnav-video-thumb"><a id="video-thumb-%VIDEOID%-4986163" class="video-thumb ux-thumb-96" href="/watch?v=%VIDEOID%"><span class="img"><img title="%VIDEONAME%" onclick="playnav.playVideo(\'favorites\',\'0\',\'%VIDEOID%\');return false;" src="http://i1.ytimg.com/vi/%VIDEOID%/default.jpg"></span><span class="video-time">%VIDEOTIME%</span></a></div><div class="playnav-video-info"><a id="playnav-video-title-play-favorites-0-%VIDEOID%" onclick="playnav.playVideo(\'favorites\',\'0\',\'%VIDEOID%\');return false;" class="playnav-item-title ellipsis" href="/watch?v=%VIDEOID%"><span dir="ltr">%VIDEONAME%</span></a><div class="metadata"><span dir="ltr" class="playnav-video-username"><a href="/user/%VIDEOUSER%" title="Play video">%VIDEOUSER%</a></span></div><div id="playnav-video-play-favorites-0" style="display:none">%VIDEOID%</div></div></div></div>';


function downloadFavorites(page) {
	var updfav = document.getElementById('updfavsearch');
	GM_xmlhttpRequest({
		method: "post",
		url: "http://www.youtube.com/profile_ajax?action_ajax=1&user="+username+"&new=1&box_method=load_playlist_page&box_name=user_playlist_navigator",
		headers: { "Content-type" : "application/x-www-form-urlencoded"},
		data: unsafeWindow.ajax_session_info+"&messages=%5B%7B%22type%22%3A%22box_method%22%2C%22request%22%3A%7B%22name%22%3A%22user_playlist_navigator%22%2C%22x_position%22%3A1%2C%22y_position%22%3A-2%2C%22palette%22%3A%22default%22%2C%22method%22%3A%22load_playlist_page%22%2C%22params%22%3A%7B%22playlist_name%22%3A%22favorites%22%2C%22encrypted_playlist_id%22%3A%22favorites%22%2C%22query%22%3A%22%22%2C%22encrypted_shmoovie_id%22%3A%22favorites%22%2C%22page_num%22%3A"+page+"%2C%22view%22%3A%22play%22%2C%22playlist_sort%22%3A%22default%22%7D%7D%7D%5D",
		onload: function(responseDetails) {
			var vidsRegexp 	= /<div style=\\"display:none\\" class=\\"encryptedVideoId\\">(.*?)<\\\/div>/g;
			var namesRegexp = /;return false;\\" title=\\"(.*?)\\"><\\\/span>/g;
			var usersRegexp	= /href=\\"\\\/user\\\/(.*?)\\">/g;
			var duratRegexp	= /<span class=\\"video-time\\">(.*?)<\\\/span>/g;
			
			var matchVids 	= vidsRegexp.exec(responseDetails.responseText);
			var matchNames	= namesRegexp.exec(responseDetails.responseText);
			var matchUsers	= usersRegexp.exec(responseDetails.responseText);
			var matchDurat	= duratRegexp.exec(responseDetails.responseText);
			while (matchVids != null) {
				tc++;
				updfav.innerHTML="updating... "+tc+"/"+favs;
				videos	+= matchVids[1] + ",";
				names	+= matchNames[1] + "<<";
				users	+= matchUsers[1] + ",";
				durat	+= matchDurat[1] + ",";
				matchVids = vidsRegexp.exec(responseDetails.responseText);
				matchNames = namesRegexp.exec(responseDetails.responseText);
				matchUsers = usersRegexp.exec(responseDetails.responseText);
				matchDurat = duratRegexp.exec(responseDetails.responseText);
			}
			if (page<(Math.ceil(favs/12)-1)) {
				downloadFavorites(page+1);
			}else{
				GM_setValue(username+"Vids", videos);
				GM_setValue(username+"Names", names);
				GM_setValue(username+"Users", users);
				GM_setValue(username+"Durat", durat);
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
		var updfav = document.getElementById('updfavsearch');
		updfav.innerHTML="updating... "+tc+"/"+favs;
		GM_xmlhttpRequest({
			method: "post",
			url: "http://www.youtube.com/profile_ajax?action_ajax=1&user="+username+"&new=1&box_method=load_playlist&box_name=user_playlist_navigator&playlistName=favorites",
			headers: { "Content-type" : "application/x-www-form-urlencoded"},
			data: unsafeWindow.ajax_session_info+"&messages=%5B%7B%22type%22%3A%22box_method%22%2C%22request%22%3A%7B%22name%22%3A%22user_playlist_navigator%22%2C%22x_position%22%3A1%2C%22y_position%22%3A-2%2C%22palette%22%3A%22default%22%2C%22method%22%3A%22load_playlist%22%2C%22params%22%3A%7B%22playlist_name%22%3A%22favorites%22%2C%22view%22%3A%22play%22%2C%22playlist_sort%22%3A%22default%22%7D%7D%7D%5D",
			onload: function(responseDetails) {
				favs = responseDetails.responseText.match(/<input type=\\"hidden\\" id=\\"playnav-playlist-favorites-count\\" value=\\"(.*?)\\"\\\/>/)[1];
				var vidsRegexp 	= /<div style=\\"display:none\\" class=\\"encryptedVideoId\\">(.*?)<\\\/div>/g;
				var namesRegexp = /;return false;\\" title=\\"(.*?)\\"><\\\/span>/g;
				var usersRegexp	= /href=\\"\\\/user\\\/(.*?)\\">/g;
				var duratRegexp	= /<span class=\\"video-time\\">(.*?)<\\\/span>/g;
				
				var matchVids 	= vidsRegexp.exec(responseDetails.responseText);
				var matchNames	= namesRegexp.exec(responseDetails.responseText);
				var matchUsers	= usersRegexp.exec(responseDetails.responseText);
				var matchDurat	= duratRegexp.exec(responseDetails.responseText);
				while (matchVids != null) {
					tc++;
					updfav.innerHTML="updating... "+tc+"/"+favs;
					videos	+= matchVids[1] + ",";
					names	+= matchNames[1] + "<<";
					users	+= matchUsers[1] + ",";
					durat	+= matchDurat[1] + ",";
					matchVids = vidsRegexp.exec(responseDetails.responseText);
					matchNames = namesRegexp.exec(responseDetails.responseText);
					matchUsers = usersRegexp.exec(responseDetails.responseText);
					matchDurat = duratRegexp.exec(responseDetails.responseText);
				}
				if (favs>12) {
					downloadFavorites(1);
				}
			}
		});
	}
}

function search(e) {
	var query		= document.getElementById('favsearch').value.toLowerCase();
	if (query!='') {
		document.getElementById('playnav-play-playlist-search-holder').style.display="inline";
		videos=GM_getValue(username+"Vids", "update");
		names=GM_getValue(username+"Names", "update");
		users=GM_getValue(username+"Users", "update");
		durat=GM_getValue(username+"Durat", "update");
		var vidIDs 		= videos.split(",");
		var vidNames 	= names.split("<<");
		var vidUsers	= users.split(",");
		var vidDurat	= durat.split(",");
		var query		= document.getElementById('favsearch').value.toLowerCase();
		var temp		= '';
		
		for (var i = 0; i<vidIDs.length; i++) {
			if (vidNames[i].toLowerCase().indexOf(query)!=-1) {
				temp += template.replace(/%VIDEOID%/g, vidIDs[i]).replace(/%VIDEOTIME%/g, vidDurat[i]).replace(/%VIDEONAME%/g, vidNames[i]).replace(/%VIDEOUSER%/g, vidUsers[i]);
			}
		}
		
		document.getElementById('playnav-play-search-items').innerHTML = temp;
	} else {
		document.getElementById('playnav-play-playlist-search-holder').style.display="none";
	}
}

window.addEventListener("load", function() {
	var playnav = document.getElementById('playnav-play-playlist-all-holder');
	if (playnav) {
		username=document.getElementsByClassName('box-title title-text-color');
		username = username[0].title;

		var mydiv = document.createElement('div');
		mydiv.style.fontSize='8pt';
		mydiv.innerHTML = 'Search: <input type="text" name="favsearch" id="favsearch"/> (<a href="#" id="updfavsearch">update</a>)';
		playnav.parentNode.insertBefore(mydiv, playnav);
		
		var searchDiv = document.createElement('div');
		searchDiv.class="playnav-playlist-holder";
		searchDiv.id="playnav-play-playlist-search-holder";
		searchDiv.style.display="none";
		searchDiv.innerHTML = '<div class="scrollbox-wrapper inner-box-colors" id="playnav-play-search-scrollbox"><div class="scrollbox-content playnav-playlist-non-all"><div class="scrollbox-body" style="height: 550px;"><div class="outer-scrollbox"><div class="inner-scrollbox" id="playnav-play-search-items"></div></div></div></div></div>';
		var allitems=document.getElementById('playnav-play-all-scrollbox');
		allitems.parentNode.insertBefore(searchDiv, allitems);
		
		var updfav = document.getElementById('updfavsearch');
		updfav.addEventListener('click', update, false);
		
		var favsearch = document.getElementById('favsearch');
		favsearch.addEventListener('keyup', search, true);
	}
}, true);