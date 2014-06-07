// ==UserScript==
// @name           Youtube Proxy Hidemyass GEMA
// @namespace      http://userscripts.org/users/129044
// @include        *.youtube.com/*
// ==/UserScript==
if (document.getElementById("watch-player-unavailable-message") != null) {
	window.location = "https://youtubeproxy.org/default.aspx?prx=" + window.location.href;
}