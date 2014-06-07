// ==UserScript==
// @name 虎扑投票
// @namespace hupu_voice
// @include http://voice.hupu.com/nba/topic/direct-reports0104*
// ==/UserScript==
(function(){
if(window!=window.top)return;
document.addEventListener('DOMContentLoaded',function(){
	var d = document.querySelector('.btn-blueSquare-top');
	window.setInterval(function(){
		for(var i=0;i<100;i++){
			d.click();
		}
	},100);
},false);
})();