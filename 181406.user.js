// ==UserScript==
// @name           nicovidpreslip
// @version        1
// @include        http://www.nicovideo.jp/watch/*
// @description    nicovideo prevent slip 2013/11/03 11:25
// ==/UserScript==

(function(){
	var xbc=function(f){
		var code='javascript:('+encodeURIComponent(f.toString())+')()';
		location.href=code;}
	xbc(function(){
		function ps(){
			try{
				if(!WatchApp.namespace.model.player.NicoPlayerConnector.isPrepared)
					return void(setTimeout(arguments.callee, 500));
				WatchApp.namespace.model.player.NicoPlayerConnector.stopVideo();
			}catch(e){
				setTimeout(arguments.callee, 500);
			}
		};
		WatchApp.namespace.model.player.PlayerAreaConnector.getInstance().addEventListener('onVideoInitialized',ps);
	});
})();

// script-end
