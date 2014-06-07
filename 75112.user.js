// ==UserScript==
// @name		Esconde videos
// @description		Esconde los videos vistos
// @include		http*//www.lockerz.com/play
// @include		http*//www.lockerz.com/p/*
// @version		0.1
// @copyright		Para Forolockerz.com

// ==/UserScript==

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