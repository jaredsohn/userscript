// ==UserScript==
// @name        YouTube Timelinks in Comments and Description
// @namespace   LWChris
// @description Extends the time link functionality of YouTube for times like 1:23:45
// @include     http://www.youtube.com/watch?v=*
// @include     http://www.youtube.com/watch?*&v=*
// @version     2
// @grant       none
// ==/UserScript==

var R = /(\d+):(\d\d):(\d\d)([^<]|<[^\/]|<\/[^a]|<\/a[^>]|$)/g;

createTimelinks = function() {
	var comments = document.querySelectorAll("div.comment-text p");
	for (var c = 0; c < comments.length; c++) {
		var comment = comments[c];
		if(R.test(comment.innerHTML)) {
			comment.innerHTML = comment.innerHTML.replace(R, '<a onclick="yt.www.watch.player.seekTo($1*3600+$2*60+$3);return false;" href="#">$1:$2:$3</a>$4');
		}
	}
}

var description = document.querySelector("#watch-description-text");
if (description) {
	description.innerHTML = description.innerHTML.replace(R, '<a onclick="yt.www.watch.player.seekTo($1*3600+$2*60+$3);return false;" href="#">$1:$2:$3</a>$4');
}

createTimelinks();
check = setInterval(createTimelinks, 200);