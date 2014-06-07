// ==UserScript==
// @name           Free MP3
// @description	   Download music for free all over the web
// @include        http://hypem.com/*
// @include        http://youtube.com/*
// ==/UserScript==

// THE HYPE MACHINE

var iconHtml = '<img src="data:image/gif;base64,R0lGODlhCgAKAMZbAC5fpjNoujppqj5qq0Rtq0RwsFF/w1d+u1N/wVSBxFWDxliEw12Ev1uGx12IyGCJyWGKx2GLyWKLyGWNymWNzGiL02yLzWiOzW6K122L2mmQzWyN3G6TzHCP4W6X1HGY0HOZ0XOa1HWa0Hmc1Xee2Xie2Huc3Xue1Hif2Hmf23mg2Xqg2Xuh3Hyj232j3oKk1n6l3YWi3YCm3YS/UYS/VIGn4YGn4oWo3Yyv5JK15pjJb5nJcZe26pq275m46qG/6p7A76G/77PH47DN87rO78fuh8fujNf0otf2oubw7+Xx7ebx7ebx7+jz6un05Orz8+318/H4//f7//r7/f//3fr8/f//4Pv8/fv8/vz9/v39/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAH8ALAAAAAAKAAoAAAdkgB4nHy8XGiIgEn8UQ1tCW5BbPw8NQFsckFJROBAOQVVYWllTVzcIEz4wMi0rKiglDBE5NjUuLCkkIQcJPE9LTElKUCMFBj1NMzo7NE4mAgpEVEVHSEZWMQMBCxUdGxkYFgQAgQA7" width="10" height="10">';
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
	if (TrackList == undefined ||¬†TrackList.length < 1) {
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
				// GM_log(index + " - " + trackId + " - " + trackKey);
				if (trackKey) {
					unsafeWindow.Element.insert(element, "<a class='gmlink' href='/serve/play/"+trackId+"/"+trackKey+"'>&nbsp;"+iconHtml+"</a>");
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



/**
 * Hotkeys:
 *   /: activate search field
 *   p: play previous track in the current playlist
 *   n: play next track in the current playlist
 *   k: select previous displayed track
 *   j: select next displayed track
 *   o: play selected track
 *   v: open selected blog post in new tab
 *   s: toogle Favorite for the currently playing track
**/
var HotKeys = {
	activateSearch: function(event) {
		unsafeWindow.$('q').activate();
	},
	
	deactivateSearch: function(event) {
		unsafeWindow.$('q').blur();
	},
	
	playPrev: function(event) {
		unsafeWindow.prevTrack(unsafeWindow);
	}, 
	
	playNext: function(event) {
		unsafeWindow.nextTrack(unsafeWindow);
	},
	
	selectPrev: function(event) {
		if (SelectedTrack > 0) {
			TrackElements[SelectedTrack].removeClassName('selectedTrackGM');
			TrackElements[SelectedTrack-1].addClassName('selectedTrackGM');
			// TrackElements[SelectedTrack-1].scrollTo();
			SelectedTrack--;
		}
	},
	
	selectNext: function(event) {
		if (SelectedTrack < TrackElements.length-1) {
			TrackElements[SelectedTrack].removeClassName('selectedTrackGM');
			TrackElements[SelectedTrack+1].addClassName('selectedTrackGM');
			// TrackElements[SelectedTrack+1].scrollTo();
			SelectedTrack++;
		}
	},
	
	playSelected: function(event) {
		unsafeWindow.togglePlayByFileid(TrackList[SelectedTrack].id);
	},
	
	openBlog: function(event) {
		unsafeWindow.open('/go/track/'+TrackList[SelectedTrack].id, '_blank');
	},
	
	toggleFavorite: function(event) {
		// GM_log('favorite: '+unsafeWindow.currentTrack+' '+unsafeWindow.trackList[unsafeWindow.activeList][unsafeWindow.currentTrack].id);
		unsafeWindow.toggle_favorite('track', unsafeWindow.trackList[unsafeWindow.activeList][unsafeWindow.currentTrack].id);
	},
	
	bindings: new Array(),
	keyBindings: new Array()
}
HotKeys.bindings['/'] = HotKeys.activateSearch;
HotKeys.bindings['p'] = HotKeys.playPrev;
HotKeys.bindings['n'] = HotKeys.playNext;
HotKeys.bindings['k'] = HotKeys.selectPrev;
HotKeys.bindings['j'] = HotKeys.selectNext;
HotKeys.bindings['o'] = HotKeys.playSelected;
HotKeys.bindings['v'] = HotKeys.openBlog;
HotKeys.bindings['s'] = HotKeys.toggleFavorite;	

HotKeys.keyBindings[27] /*ESC*/ = HotKeys.deactivateSearch;

unsafeWindow.document.observe("keypress", function(event) {
	// don't do anything on inputs and textareas
    var element = event.element();
    if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') {
        if (event.keyCode == 0) return;
    }
	if (HotKeys.keyBindings[event.keyCode])¬†{
		HotKeys.keyBindings[event.keyCode].apply(event);
	} else {
		var character = String.fromCharCode(event.charCode);
		if (HotKeys.bindings[character]) {
			HotKeys.bindings[character].apply(event);}
		}
	}
);



// YOUTUBE

var separayt2 = location.href.split("&");
var urlcompactada = separayt2[0]
document.getElementById('watch-headline-user-info').innerHTML += '<b><a target="_blank" href="http://2conv.com/?url='+ urlcompactada + '" title="Convertir este video a formato mp3.  ||  Se abre el enlace en una nueva pesta√±a para mantener reproduciendo el v√≠deo.">Download Mp3 (Enuki This)</a></b>';
