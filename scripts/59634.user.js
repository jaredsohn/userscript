// ==UserScript==
// @name           Nico set quality low
// @namespace      http://efcl.info/
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==

(function(){
		var bodyTag = document.getElementsByTagName('body')[0];
		var flvPlayer = document.getElementById('flvplayer_container').getElementsByTagName('embed')[0];
		flvPlayer.setAttribute('quality', 'low');
		bodyTag.innerHTML = bodyTag.innerHTML
})();