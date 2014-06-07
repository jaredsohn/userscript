// ==UserScript==
// @name           HideViewedVideos
// @namespace      kenmaz
// @include        http://www.nicovideo.jp/ranking
// ==/UserScript==

(function(){
	var watches = document.getElementsByClassName("watch");
	for(var i = 0; i < watches.length; i++) {
		var titleElm = watches[i];
		var color = document.defaultView.getComputedStyle(titleElm, null).getPropertyValue("color");
	    if(color == "rgb(54, 63, 63)"){
	        titleElm.style.display = "none";
	        var img = titleElm.parentNode.parentNode;
	        img.style.display = "none";
	    }
	}
})();
