// ==UserScript==
// @name       VK Download All 2
// @namespace  http://vk.com/id190985821
// @version    1
// @description  Позволяет скачивать все аудио из поста одним кликом.
// @match      http://vk.com/*
// @match      https://vk.com/*
// @run-at document-end
// ==/UserScript==



unsafeWindow.dwnld_start = function(i){
	for(var j = 0; typeof document.getElementsByClassName('post_media clear_fix wall_audio')[i].getElementsByClassName('play_new down_btn')[j] != 'undefined'; j++){
	setTimeout('document.getElementsByClassName("post_media clear_fix wall_audio")['+i+'].getElementsByClassName("play_new down_btn")['+j+'].click();', j*3000+50);
	}
}


unsafeWindow.dwnld_init = function(){
	for(var i = 0; typeof document.getElementsByClassName('post_media clear_fix wall_audio')[i] != 'undefined'; i++){
		if(typeof document.getElementsByClassName('post_media clear_fix wall_audio')[i].getElementsByClassName('dwnld_p')[0] != 'object'){
			document.getElementsByClassName('post_media clear_fix wall_audio')[i].innerHTML += '<span class="dwnld_p"><a class="dwnld_b" onclick="dwnld_start('+i+');">скачать все</a> </span>';
		}
	} 
}
dwnld_init();
setInterval(dwnld_init, 3000);