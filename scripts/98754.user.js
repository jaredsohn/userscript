// ==UserScript==
// @name           BigNextTv
// @namespace      http://www.nexttv.com.tw/
// @include        http://www.nexttv.com.tw/
// ==/UserScript==

GM_setValue('width', 850);	

setTimeout(function(){
	unsafeWindow.switchplay('play1');
	var player=document.getElementById('player');
	player.width=GM_getValue('width', 640);
	player.height=player.width/640*360;
}, 1000);