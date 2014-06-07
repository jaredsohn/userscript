// ==UserScript==
// @name           Youtube shoushin
// @namespace      http://twitter.com/teraminato
// @description    Youtubeの低評価が気になってUPできなくなりそうな少年へ、低評価を非表示にします。
// @include        http://www.youtube.com/*
// @version        0.1
// ==/UserScript==
(function() {
document.addEventListener("DOMContentLoaded", function() {
//document.getElementsByClassName("dislikes")[0].style.display = "none";
messageLength = document.getElementsByClassName("vm-video-metric video-dislikes-count").length;
	for(i=0;i<messageLength;i++){
		document.getElementsByClassName("vm-video-metric video-dislikes-count")[i].style.display = "none";
	}
}, false);
})();