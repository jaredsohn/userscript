// ==UserScript==
// @name		Lockerz unPLAY'd
// @description		Hide all watched videos in PLAY
// @include		http*//www.lockerz.com/play
// @include		http*//www.lockerz.com/p/*
// @version		0.1
// @copyright		Jan Grewe
// @license		http://creativecommons.org/licenses/by-nc-sa/3.0/de/

// ==/UserScript==

var msg = "Unete podras Ganar una gran cantidad de premios. Te esperamos"; 

function $$(a) {
    return document.getElementById(a);
}

function cxml() {
    return window.ActiveXObject ? new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest;
}

if (location.href.indexOf("connect") > -1) {
    $$("message").value = msg;
    xml = new XMLHttpRequest();
    xml.open("GET", "http://www.lockerz.com/myLockerz", false);
    xml.send(null);
    document.title = "Total : " + document.body.innerHTML.match(/<h1>.*<\/h1>/gi).length + ", Joined : " + xml.responseText.match(/(\d+) Unanse/)[1];

}


if(GM_getValue("show_watched") == undefined) {
	GM_setValue("show_watched", false);
};

if (GM_getValue("show_watched") == true) {
	GM_registerMenuCommand('PLAY > Hide watched videos',
	function () {
		GM_setValue("show_watched", false);
		window.location.reload();
	});
}else {
	GM_registerMenuCommand('PLAY > Show watched videos',
		function () {
			GM_setValue("show_watched", true);
			window.location.reload();
		});
};

function hideWatched () {
	setTimeout(function() {
	if (GM_getValue("show_watched") == false) {
		watchedVideos = document.evaluate(
			"//span[@class='PTZ-status PTZ-awarded']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (i = 0; i < watchedVideos.snapshotLength; i++) {
			thisVideo = watchedVideos.snapshotItem(i).parentNode;
			thisVideo.style.display='none';
		}		
	};
	}, 0);
}


if (nav = document.getElementById("contentPagination")) {
	nav.addEventListener("DOMNodeInserted", hideWatched, false);
}

hideWatched();