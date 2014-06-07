// ==UserScript==
// @name           YoutubeNoAS3Player
// @description		Works only with Firefox and installed Flashblock Addon. This script replaces the SWF10 flash player with SWF8 flash player on youtube.
// @namespace      ytnoas3player
// @include        http://www.youtube.com/*
// ==/UserScript==

var player = document.getElementById('watch-player-div');
if(player != null) {
	var playerSrc = player.childNodes[0].attributes.getNamedItem('srcAttribute');
	playerSrc.value = 'http://s.ytimg.com/yt/swf/watch_v8-vfl127661.swf';

	var title = player.childNodes[0].attributes.getNamedItem('title');
	title.value = 'http://s.ytimg.com/yt/swf/watch_v8-vfl127661.swf';
}
