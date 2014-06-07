// ==UserScript==
// @name           NicoLiveReloader
// @namespace      http://hazisarashi.com/
// @author         Hazisarashi
// @version 0.1.3
// @include http://live.nicovideo.jp/watch/lv*
// @exclude *.css
// @exclude *.js
// ==/UserScript==

(function() {
	
	setTimeout( function(){ check() }, 1000);
	
	function check(){
		if ( document.getElementsByTagName('h2')[0].innerHTML == "番組が見つかりません" ){
			window.location.reload();
		}
		
	}
	
})();