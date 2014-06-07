// ==UserScript==
// @name           Hype Machine Songbird
// @author         Dzony based on script by tonyskn_at_gmail.com
// @description	   Add downloads to The Hype Machine in Songbird.
// @include        http://hypem.com/*
// ==/UserScript==
document.body.removeChild( document.getElementById('player-container') );
window.addEventListener(
"load",
function() {
	if(typeof(unsafeWindow.songbird) != "undefined") {
		var myMediaList = unsafeWindow.songbird.siteLibrary.createSimpleMediaList("hypem-"+document.location.pathname);
		unsafeWindow.songbird.siteLibrary.scanMediaOnCreation = false;
		myMediaList.clear()
		unsafeWindow.togglePlay = function(id) {
			var myMediaList = unsafeWindow.songbird.siteLibrary.createSimpleMediaList("hypem-"+document.location.pathname);
			unsafeWindow.songbird.playMediaList(myMediaList, id);
		};		
		var tracks = unsafeWindow.trackList[document.location.href];
		for (var i=0; i < tracks.length; i++) {
			var myTrack = unsafeWindow.songbird.siteLibrary.createMediaItem('http://hypem.com/serve/play/'+tracks[i]["id"]+'/'+tracks[i]["key"]);
			myTrack.setProperty("http://songbirdnest.com/data/1.0#artistName", tracks[i]["artist"]);
			myTrack.setProperty("http://songbirdnest.com/data/1.0#trackName", tracks[i]["song"]);
			myTrack.setProperty("http://songbirdnest.com/data/1.0#duration", tracks[i]["time"]*1000*1000);
			myMediaList.add(myTrack);
		 };   	
		unsafeWindow.songbird.webPlaylist.mediaList = myMediaList;
	}
}, true);
