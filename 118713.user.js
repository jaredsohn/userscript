// ==UserScript==
// @name           Vkontakte player keyboard
// @namespace      keyboard_player
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

(function(){
	var usWindow = (unsafeWindow || window)
	function play_pause(){
			var audioPlayer = usWindow.audioPlayer;
			if (audioPlayer && audioPlayer.id) {audioPlayer.operate(audioPlayer.id);}
			if (!audioPlayer) usWindow.showDoneBox("Плеер не найден. Включите его запустив трек.")
	}
	
	function play_next(){
		if (usWindow.audioPlayer)
			usWindow.audioPlayer.nextTrack();
		else
			usWindow.showDoneBox("Плеер не найден. Включите его запустив трек.")
	}
	
	function play_previous(){
		if (usWindow.audioPlayer)
			usWindow.audioPlayer.prevTrack();
		else
			usWindow.showDoneBox("Плеер не найден. Включите его запустив трек.")
	}
	
	function check_button(e){
		switch(e.which){
			case 179: // play/pause
			case 19: // Pause Break 
				play_pause();
				break;
			case 176: // next
			case 34: //Page Down
				play_next();
				break;
			case 177: // previous
			case 33: //Page Up
				play_previous();
				break;
			default:
				return true;
		}
			
		return false;
	}
	
	var binded={};

	function bind_keyboard(){
		var el_l = document.getElementsByTagName("input");
		for (var i=0;i<el_l.length;i++)
			if (el_l[i].id && (!binded[el_l[i].id] || (binded[el_l[i].id]!=el_l[i]))){
				binded[el_l[i].id] = el_l[i];
				el_l[i].parentNode.addEventListener("keydown",check_button, false);
			}
	}
	
	setInterval(bind_keyboard, 1000);
})()