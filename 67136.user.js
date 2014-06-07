// ==UserScript==
// @name           NicoLiveHack
// @namespace      http://hazisarashi.com/
// @author         Hazisarashi
// @version 0.2
// @include http://live.nicovideo.jp/editstream/lv*
// @exclude *.css
// @exclude *.js
// ==/UserScript==

(function() {
	
	if (typeof(unsafeWindow) === 'undefined') {
		unsafeWindow = window;
	}
	
	setTimeout( function(){hack()}, 1000);
	
	function hack(){
		unsafeWindow.getwaitinfoTimer = function(a){
			waitinfotimerID = setInterval("getwaitinfo(" + a + ")", 1000);
			remaintimerID = undefined
		}
		
		a = unsafeWindow.location.href.match(/lv(\d+)/)[1];
		unsafeWindow.getwaitinfoTimer(a);
	}
	
})();

console.log('ok');
