// ==UserScript==
// @name NicovideoPlayingFavicon
// @namespace https://twitter.com/hirogasa/
// @match http://www.nicovideo.jp/watch/*
// @description ニコニコ動画の再生中ページのFaviconを変更します。
// @version 1.0
// ==/UserScript==
 
(function(){
	var isPlaying = false;
	var player = document.getElementById("flvplayer");
	var timer = setInterval(function(){checkStatus();}, 1000);
	
	function checkStatus(){
		if(player.ext_getStatus() == "playing"){
			if(!isPlaying){
				changeFavicon("http://i.imgur.com/JYOD7ss.png");
					isPlaying = true;
				}
			}else if(isPlaying){
    			changeFavicon("http://res.nimg.jp/img/favicon.ico");
    			isPlaying = false;
    		}
    	}
      
	function changeFavicon(url){
		var l = document.getElementsByTagName("link");
		for(var i = 0; i < l.length; i++) {
			if(l[i].getAttribute("rel") == "shortcut icon"){
				l[i].parentNode.removeChild(l[i]);
				break;
			}
		}
		var m = document.createElement("link");
		m.rel = "shortcut icon";
		m.href = url;
		document.getElementsByTagName("head")[0].appendChild(m);
	}
})();