// ==UserScript==
// @name           Youtube Dark Theme
// @namespace      http://www.youtube.com/watch
// @include       http://youtube.*/*
// @include       http://*.youtube.*/*
// @include       https://youtube.*/*
// @include       https://*.youtube.*/*
// ==/UserScript==

(function() {
		setTimeout(setTheme, 500);
})();
function setTheme() {
	var wrapper = document.getElementById('watch-player');
	wrapper.innerHTML = wrapper.innerHTML.replace('flashvars="', 'flashvars="theme=dark&');
}