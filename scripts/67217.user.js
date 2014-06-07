// ==UserScript==
// @name           Hype Machine direct download links (new!)
// @author         tonyskn_at_gmail.com
// @description	   Add download links next to tracks on The Hype Machine.
// @include        http://hypem.com/*
// ==/UserScript==
// Modified by @obmas
// I got rid of the hot keys and the embeded icon. This now adds (Download) next to the track.
// GM_log("fired");

var TrackList;
var TrackElements;
var SelectedTrack;

function injectCSS(cssdata) {
	head = document.getElementsByTagName("head" )[0];
    style = document.createElement("style" );
	style.setAttribute("type", 'text/css');
	style.innerHTML = cssdata;
	head.appendChild(style);
}

function addLinks() {
	// GM_log('addLinks');
	TrackList = unsafeWindow.trackList[document.location.href];
	if (TrackList == undefined || TrackList.length < 1) {
		GM_log('delay');
		unsafeWindow.setTimeout(addLinks, 1000);
	} else {
		// Check if this particular page has been processed
		// through a previous call
		if (unsafeWindow.$$('.gmlink').length < 1) {
			// GM_log("here we go! "+document.location.href);
			// Update some global variables than add links
			TrackElements = unsafeWindow.$$('div.section-track');
			SelectedTrack = 0;
			var index = 0;
			var tracks = unsafeWindow.$$('div.section-track .track_name');
			//TODO Fix the selectors for the Twitter page
			tracks.each(function(element, index) {
				var trackId = TrackList[index].id;
				var trackKey = TrackList[index].key;
				var trackArtist = TrackList[index].artist;
				var trackSong = TrackList[index].song;
				// GM_log(index + " - " + trackId + " - " + trackKey);
				if (trackKey) {
					unsafeWindow.Element.insert(element, "<a title='"+trackArtist+" - "+trackSong+"' href='/serve/play/"+trackId+"/"+trackKey+"'>&nbsp;<sub><b>(download)</b></sub><sub style='font-size:0px;'>"+trackArtist+" - "+trackSong+"</sub></a>");
				}		
				index++;
			});
		}
	}
}

injectCSS('div.selectedTrackGM {background: #EDF7FC none repeat scroll 0 0;}');
addLinks();

// Display links after an Ajax update is complete
unsafeWindow.Ajax.Responders.register({
	onComplete: function() {
		// GM_log("ajax url: "+document.location.href);
		addLinks();
	}
})