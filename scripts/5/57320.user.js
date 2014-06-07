// ==UserScript==
// @name           Soundcloud Songbird
// @namespace      soundcloud
// @description    Plays track from SongCloud natively
// @include        http://soundcloud.com/*
// ==/UserScript==
function jQueryIsReady($) { 
	var hasSongbird = (typeof(unsafeWindow.songbird) != "undefined");
	if(hasSongbird) {
	    var myMediaList = unsafeWindow.songbird.siteLibrary.createSimpleMediaList("soundcloud");
	    myMediaList.clear();
	    unsafeWindow.songbird.siteLibrary.scanMediaOnCreation = false;
	    unsafeWindow.songbird.commands.addCommand( "action",
        "download-all",
        "Download All",
        "Download all tracks to your library." );

	}
	$("div[id*='player-track']").each(function() {
		if(hasSongbird) {
			
			var myTrack = unsafeWindow.songbird.siteLibrary.createMediaItem("http://media.soundcloud.com/stream/"+$(this).metadata().uid);
	    	myTrack.setProperty("http://songbirdnest.com/data/1.0#trackName", $(this).find("h3 a:first").text());
	    	myTrack.setProperty("http://songbirdnest.com/data/1.0#duration", $(this).metadata().trackDuration*1000);
			myMediaList.add(myTrack);
		}
	});
	if(hasSongbird) {
		unsafeWindow.songbird.webPlaylist.mediaList = myMediaList;
	}
};


window.addEventListener("load", function() {
	jQueryIsReady(unsafeWindow.jQuery);
}, false);

// Here is our event handler
var handleEvent = function(event) {
        if (event.type == "download-all") {
            unsafeWindow.songbird.downloadList(unsafeWindow.songbird.webPlaylist.mediaList);
        }
}

// Now register it as a listener with the document.
document.addEventListener("download-all", handleEvent, true );