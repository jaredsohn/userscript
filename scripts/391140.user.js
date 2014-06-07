// ==UserScript==
// @name              Youtube AutoScroller
// @description       Automatically scrolls to a point where the entire video player is visible in the screen
// @include			  *youtube.com/watch*
// @include			  *youtu.be/*
// @version           1
// @author            Some Random Anon
// ==/UserScript==
(function() {
	var winWidth = window.innerWidth;
	var playerWidth = 560;
	var xScroll = ((winWidth-playerWidth)/2)-2;
	window.scrollTo(xScroll,0);
})();