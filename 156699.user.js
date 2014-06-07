// ==UserScript==
// @name        'YoutubeRedirect'
// @namespace   'kA'
// @include     http://*.youtube.*
// @include     https://*.youtube.*
// @version     1
// ==/UserScript==


document.getElementById("logo").onclick = function () {
	window.location.href = "https://www.youtube.com/feed/subscriptions/u";	
	alert("redirecting...");
	};