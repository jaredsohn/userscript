// ==UserScript==
// @name           Hype Machine direct download links v3
// @author         @blissofbeing
// @version        0.2.6
// @description    Add download links next to tracks on The Hype Machine.
// @include        http://hypem.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==
// Add "Download" link next to songs on the HypeMachine ( http://hypem.com )

function main(){

var TrackList,
    TrackElements,
    SelectedTrack;

function addLinks() {
	if(typeof displayList !== "undefined"){
    TrackList = displayList.tracks;
		if (TrackList === undefined || TrackList.length < 1) {
			setTimeout(addLinks, 1000);
		} else {
	    var index = 0,
	        tracks = jQuery('div.section-track .track_name');
	    TrackElements = jQuery('div.section-track');
	    SelectedTrack = 0;
	    tracks.each(function(index, element) {
	        var $element = jQuery(element);
	        if ( !$element.parent().find('a.gmlink').length ){ // Check if this particular element has alrdeady been processed through a previous call
	            var trackId = TrackList[index].id,
	                trackKey = TrackList[index].key,
	                trackArtist = TrackList[index].artist,
	                trackSong = TrackList[index].song;
	            if (trackKey ) {
	                jQuery('<a/>', {
	                    'href': "/serve/play/"+trackId+"/"+trackKey, //or use "/serve/f/509/"+trackId+"/"+trackKey for urls not bound to session.
	                    'style': 'color:#ed2024;position: absolute;right: 10px;top: -15px;',
	                    'title': trackArtist+" - "+trackSong,
	                    'class': 'gmlink',
	                    'text': 'Download',
	                    'target': "_blank",
	                    'download': trackArtist+" - "+trackSong
	                }).appendTo($element.parent());
	            }
	            index++;
	        }
	    });
	    jQuery(".section.same .tools").css('top','29px');
		}
	}
}

addLinks();

// Display links after an Ajax update is complete
if (typeof jQuery === "function") {
    jQuery(document).ajaxComplete(function() {
      addLinks();
    });
}
} // /main

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);