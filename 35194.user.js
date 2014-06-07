// ==UserScript==
// @name           ニコニコ動画 自動再生+α
// @description    無料会員でもニコニコ動画で動画を自動再生できるようにします
// @version        0.0.4.2
// @author         nodaguti
// @license        MIT License
// @namespace      http://nodaguti.usamimi.info/
// @include        http://www.nicovideo.jp/watch/*
// @updateURL      https://userscripts.org/scripts/source/35194.meta.js
// ==/UserScript==

(function(){

//======自動再生======

//----config----
//自動再生を試行する間隔 (ms)
var INTERVAL = 250;
//----/config----


//Harajuku
if(document.getElementById("video_controls")){

	location.href = "javascript:(function(){\
\
		var flvplayer = document.getElementById('flvplayer');\
		var interval = " + INTERVAL + ";\
\
		if(!flvplayer || typeof flvplayer.ext_getStatus != 'function')\
			return void(setTimeout(arguments.callee, interval));\
\
		flvplayer.ext_play(1);\
		if(flvplayer.ext_getStatus().indexOf('playing') < 0) return void(setTimeout(arguments.callee, interval));\
	})();";

//Q Watch
}else if(document.getElementById('nicoplayerContainerInner')){

	var w = unsafeWindow;

	try{
		if(!w.WatchApp.namespace.model.player.NicoPlayerConnector.isPrepared)
			return void(setTimeout(arguments.callee, INTERVAL));

		w.WatchApp.namespace.model.player.NicoPlayerConnector.playVideo();
	}catch(e){
		setTimeout(arguments.callee, INTERVAL);
	}

}

})();
