// ==UserScript==
// @name        Song name in title
// @namespace   vk_player
// @description Show song name in title of page
// @include     http://vk.com/*
// @version     1
// @grant none
// ==/UserScript==

(function(){
	var usWindow = (unsafeWindow || window)
	if (usWindow && usWindow.audioPlayer && usWindow.audioPlayer.setControlsTitle){
		
		usWindow.audioPlayer.setControlsTitleSNiT = usWindow.audioPlayer.setControlsTitle;
		usWindow.audioPlayer.setControlsTitle =	function(data){
			var SongInfo = usWindow.audioPlayer.lastSong
			if (SongInfo)
				document.title = SongInfo[6]+" ("+SongInfo[5]+")";
				
			return usWindow.audioPlayer.setControlsTitleSNiT.apply(usWindow.audioPlayer,arguments );
		}
	}
	else{
		setTimeout(arguments.callee, 1000);
		return
	}
})();
