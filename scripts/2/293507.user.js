// ==UserScript==
// @name        RAI.tv in HTML5
// @namespace   800a.org
// @description Visualizza i filmati di Rai.tv dal browser senza SilverLight (solo in HTML5)
// @include     http://www.rai.tv/dl/RaiTV/programmi/media/*
// @version     0.1
// @grant       none
// @downloadURL https://userscripts.org/scripts/source/293507.user.js
// @updateURL   https://userscripts.org/scripts/source/293507.meta.js
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
document.addEventListener("DOMContentLoaded", function(event) {
	//var videoURL_MP4 = $("meta[name='videourl_mp4']").attr("content");
	if(videoURL_MP4) {
		document.getElementById("silverlightControlHost").innerHTML = '<video width="100%" height="100%" src="'+videoURL_MP4+'" type="video/mp4" controls></video>';
	}
});
