// ==UserScript==
// @name           Nyan Cat Loading Bar for all YouTube Videos
// @namespace      http://www.youtube.com/watch
// @include       http://youtube.*/*
// @include       http://*.youtube.*/*
// ==/UserScript==

(function() {
		setTimeout(setTheme, 500);
})();
function setTheme() {
	var wrapper = document.getElementById('watch-player');
	wrapper.innerHTML = wrapper.innerHTML.replace('flashvars="', 'flashvars="theme=cat&');
}