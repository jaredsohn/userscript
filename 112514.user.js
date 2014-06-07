// ==UserScript==
// @name           Hype Machine direct download links (chrome-fix)
// @author         tonyskn_at_gmail.com chrome-modded by creadurex
// @description	   Add download links next to tracks on The Hype Machine.
// @include        http://hypem.com/*
// ==/UserScript==

var iconHtml = '<img src="data:image/gif;base64,R0lGODlhCgAKAMZbAC5fpjNoujppqj5qq0Rtq0RwsFF/w1d+u1N/wVSBxFWDxliEw12Ev1uGx12IyGCJyWGKx2GLyWKLyGWNymWNzGiL02yLzWiOzW6K122L2mmQzWyN3G6TzHCP4W6X1HGY0HOZ0XOa1HWa0Hmc1Xee2Xie2Huc3Xue1Hif2Hmf23mg2Xqg2Xuh3Hyj232j3oKk1n6l3YWi3YCm3YS/UYS/VIGn4YGn4oWo3Yyv5JK15pjJb5nJcZe26pq275m46qG/6p7A76G/77PH47DN87rO78fuh8fujNf0otf2oubw7+Xx7ebx7ebx7+jz6un05Orz8+318/H4//f7//r7/f//3fr8/f//4Pv8/fv8/vz9/v39/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAH8ALAAAAAAKAAoAAAdkgB4nHy8XGiIgEn8UQ1tCW5BbPw8NQFsckFJROBAOQVVYWllTVzcIEz4wMi0rKiglDBE5NjUuLCkkIQcJPE9LTElKUCMFBj1NMzo7NE4mAgpEVEVHSEZWMQMBCxUdGxkYFgQAgQA7" width="10" height="10">';
var TrackList;
var TrackElements;
var SelectedTrack;

// Fix for unsafeWindow in Chrome
 window.unsafeWindow || (
	unsafeWindow = (function() {
		var el = document.createElement('p');
		el.setAttribute('onclick', 'return window;');
		return el.onclick();
	}())
);

function injectCSS(cssdata) {
	head = document.getElementsByTagName("head" )[0];
    style = document.createElement("style" );
	style.setAttribute("type", 'text/css');
	style.innerHTML = cssdata;
	head.appendChild(style);	
}

function addLinks() {
	TrackList = unsafeWindow.trackList[document.location.href];
	if (TrackList == undefined || TrackList.length < 1) {
		GM_log('delay');
		unsafeWindow.setTimeout(addLinks, 1000);
	} else {
		// Check if this particular page has been processed
		// through a previous call
		if (unsafeWindow.jQuery('.gmlink').length < 1) {
			// Update some global variables than add links
			TrackElements = unsafeWindow.jQuery('div.section-track');
			SelectedTrack = 0;
			var trackIndex = 0;
			var tracks = unsafeWindow.jQuery('div.section-track .track_name');
			//TODO Fix the selectors for the Twitter page
			tracks.each(function(trackIndex, element) {
				var trackId = TrackList[trackIndex].id;
				var trackKey = TrackList[trackIndex].key;
				if (trackKey) {
					unsafeWindow.jQuery(element).append("&nbsp;&nbsp;<a title='Download MP3' class='gmlink' href='/serve/play/"+trackId+"/"+trackKey+"'>"+iconHtml+"</a>");
				}		
				trackIndex++;
			});
		}
	}
}

injectCSS('div.selectedTrackGM {background: #EDF7FC none repeat scroll 0 0;}');

// Display floppy links only after an Ajax update is complete
unsafeWindow.jQuery(document).ajaxComplete(function() {
	addLinks();
});