// ==UserScript==
// @name        Mindcrack Liker
// @namespace   http://tomo-ni-subs.org/
// @include     http://www.youtube.*/watch?*
// @include     https://www.youtube.*/watch?*
// @version     1
// @require		http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

$(window).load(function() {
	setTimeout(doLike(), 2500);
	
	function doLike() {
		var mindcrackers = [
			"BdoubleO100",
			"VintageBeef",
			"GuudeBoulderfist",
			"EthosLab",
			"Generikb",
			"W92Baj",
			"nebris88",
			"docm77",
			"Zisteau",
			"kurtjmac",
			"PauseUnpause",
			"Pyropuncher",
			"ImAnderZEL",
			"SuperMCGamer",
			"MillBeeful",
			"thejims",
			"JSano19",
			"ShreeyamNET",
			"Arkhas",
			"Mhykol",
			"ArkasMc",
			"MindCrackNetwork",
		];
		if($.inArray($("p#watch-uploader-info a.author").html(), mindcrackers) >= 0){
			if(!$(unsafeWindow.document.getElementById("watch-like")).hasClass("yt-uix-button-toggled")){
				unsafeWindow.document.getElementById("watch-like").click();
			}
		}
	}
});