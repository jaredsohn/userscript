// ==UserScript==
// @name        Followerious
// @namespace   elits
// @include     https://soundcloud.com/nademusic/following
// @version     1.0
// @grant		none
// ==/UserScript==

var SoundcloudUsername = "nademusic";

function followerious() {
	$.getJSON('http://api.soundcloud.com/users/' + SoundcloudUsername + '/followers.json?client_id=2062cfeb34e8085370a13162c547f4cc', function(data) {
		$('.usersList__item').each(function(key, value) {
			var found = false;
			for(var i = 0; i < data.length; i++) {
				if(data[i].username == $('.userBadge__userNameLink', value).text()) found = true;
			}
			if (!found) {
				$('.sc-truncate', value).append('<span style="color:#F33">[DOUCHE]</span>');
			}
		});
	});
}

setTimeout(followerious, 2000);