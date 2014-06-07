// ==UserScript==
// @name           Hype Machine direct download links v3
// @author         @tonyskn @obmas @BlissOfBeing
// @description  Add download links next to tracks on The Hype Machine.
// @include        http://hypem.com/*
// ==/UserScript==

// Orginal Script by @tonyskn
// Modified by @obmas
// I got rid of the hot keys and the embeded icon. This now adds (Download) next to the track and attributes to work with the DownThemAll plugin.
// Modified by @blissofbeing
// Replaced Protoype code with pure JS or jQuery to fix Aug 25 2011 update on hypem.com. Removed un-needed code.

//GM_log("fired");
var TrackList;
var TrackElements;
var SelectedTrack;

function addLinks() {
	// GM_log('addLinks');
	TrackList = unsafeWindow.trackList[document.location.href];
	if (TrackList == undefined || TrackList.length < 1) {
		//GM_log('delay');
		unsafeWindow.setTimeout(addLinks, 1000);
	} else {
		// Check if this particular page has been processed through a previous call
		if (unsafeWindow.jQuery('.gmlink').length < 1) {
			// GM_log("here we go! "+document.location.href);
			// Update some global variables than add links
			TrackElements = unsafeWindow.jQuery('div.section-track');
			SelectedTrack = 0;
			var index = 0;
			var tracks = unsafeWindow.jQuery('div.section-track .track_name');
			tracks.each(function(index, element) {
				var trackId = TrackList[index].id;
				var trackKey = TrackList[index].key;
				var trackArtist = TrackList[index].artist;
				var trackSong = TrackList[index].song;
				// GM_log(index + " - " + trackId + " - " + trackKey);
				if (trackKey) {
						if(element.innerHTML.indexOf("Download")==-1){							
							//window.Element.insert(element, "<a title='"+trackArtist+" - "+trackSong+"' href='/serve/play/"+trackId+"/"+trackKey+"'>&nbsp;<sub><b style='color:red'>(download)</b></sub><sub style='font-size:0px;'>"+trackArtist+" - "+trackSong+"</sub></a>");
							//above line stopped working Aug 2011, changed to pure JS by @blissofbeing																						
							var ahref = document.createElement('a');
							ahref.setAttribute('href', "/serve/play/"+trackId+"/"+trackKey);
							ahref.setAttribute('style','color:red;position: absolute;right: 10px;top: 5px;z-index: 9969;');
							ahref.setAttribute('title',trackArtist+" - "+trackSong);
							ahref.setAttribute('class','gmlink');
							ahref.appendChild(document.createTextNode("Download"));							
							element.parentNode.insertBefore( ahref, element.nextSibling );
						}
				}		
				index++;
			});
		}
	}
}

addLinks();

// Display links after an Ajax update is complete
unsafeWindow.jQuery(document).ajaxComplete(function() {
	//unsafeWindow.console.log("ajax url: "+document.location.href);
	addLinks();
});