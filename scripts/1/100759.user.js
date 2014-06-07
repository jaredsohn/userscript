// ==UserScript==
// @name Tumblr Bigger Profile Pic
// @description View a bigger profile picture when clicking one's avatar on dashboard.
// @match http://www.tumblr.com/dashboard
// @include http://www.tumblr.com/dashboard
// ==/UserScript==

var post_avatars = document.getElementsByClassName('post_avatar');

for (var i = 0; i < post_avatars.length; i++) {
	var bg_style = post_avatars[i].style.backgroundImage,
	avatar_url = bg_style.substr(4, bg_style.length - 11) + '512.png';
	post_avatars[i].href = avatar_url;
}