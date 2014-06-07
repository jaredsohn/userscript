// ==UserScript==
// @name           Google Music Save MP3s
// @namespace      GoogMusicFeatures
// @description    Add the ability to save any MP3 you've uploaded to Google Music with a simple click
// @include        http*://music.google.com/music/*
// ==/UserScript==

unsafeWindow.convertToDownload= function(){
	foundFirst = 0;
	var divArray = document.getElementsByClassName("goog-menuitem");
	for (var i = 0; i<divArray.length; i++){
		if ((divArray[i].firstChild.innerHTML == "Shop this artist") && (foundFirst < 1)) {
			foundFirst = 1;
			buyLinkidName = divArray[i].id;
			buyLinkID = divArray[i];
		}
		if (divArray[i].firstChild.innerHTML == "Save to computer") {
			downloadLinkidName = divArray[i].id;
			downloadLinkID = divArray[i];
		}
	}

	buyLinkID.id = downloadLinkidName;
	buyLinkID.innerHTML = '<div class="goog-menuitem-content">Save to computer</div>';
}
unsafeWindow.setTimeout("convertToDownload()", 2000);