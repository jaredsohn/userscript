// ==UserScript==
// @name          Nyan Cat for YouTube
// @namespace     http://www.youtube.com/watch
// @include       http://youtube.*/*
// @include       http://*.youtube.*/*
// @include       https://youtube.*/*
// @include       https://*.youtube.*/*
// ==/UserScript==

(function() {
		setTimeout(function() {
			setTheme('watch-player');
			setTheme('playnav-player');
		}, 500);
})();
function setTheme(pid) {
	var wrapper = document.getElementById(pid);
	if (wrapper.className != 'html5-player')
		wrapper.innerHTML = wrapper.innerHTML.replace('flashvars="', 'flashvars="theme=cat&');
}