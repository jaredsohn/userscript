// ==UserScript==
// @name          Missing YouTube Links
// @description   Created By BlackoutWorm
// @include       http://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://youtube.com/*
// @include       https://*.youtube.com/*
// @include       http://youtube.com/my_subscriptions*
// @include       http://*.youtube.com/my_subscriptions*
// @include       https://youtube.com/my_subscriptions*
// @include       https://*.youtube.com/my_subscriptions*
// @include       http://youtube.com/my_videos*
// @include       http://*.youtube.com/my_videos*
// @include       https://youtube.com/my_videos*
// @include       https://*.youtube.com/my_videos*
// @include       http://youtube.com/my_favorites*
// @include       http://*.youtube.com/my_favorites*
// @include       https://youtube.com/my_favorites*
// @include       https://*.youtube.com/my_favorites*
// @include       http://youtube.com/my_history*
// @include       http://*.youtube.com/my_history*
// @include       https://youtube.com/my_history*
// @include       https://*.youtube.com/my_history*
// @include       http://youtube.com/watch*
// @include       http://*.youtube.com/watch*
// @include       https://youtube.com/watch*
// @include       https://*.youtube.com/watch*
// @include       http://youtube.com/user/*
// @include       http://*.youtube.com/user/*
// @include       https://youtube.com/user/*
// @include       https://*.youtube.com/user/*
// ==/UserScript==

linkArea = document.createElement("dive");
linkArea.innerHTML = "<a href='http://youtube.com'>Home</a> | <a href='http://youtube.com/videos'>Videos</a> | <a href='http://youtube.com/channels'>Channels</a> | <a href='http://youtube.com/shows'>Shows</a> | <a href='http://youtube.com/movies'>Movies</a> | <a href='http://youtube.com/music'>Music</a> | <a href='http://youtube.com/live'>Live</a>  | <a href='http://youtube.com/my_subscriptions'> Subscriptions</a> | <a href='http://youtube.com/my_favorites'> Favorites</a> | <a href='http://youtube.com/my_history'> History</a> ";
document.getElementById("yt-masthead-content").appendChild(linkArea);