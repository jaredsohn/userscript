// ==UserScript==
// @name           HypeMaster
// @author         js <joernschellhaas_at_aol_dot_com> / tonyskn_at_gmail.com
// @description	   Add download links and keyboard shortcuts on The Hype Machine.
// @include        http://hypem.com/*
// ==/UserScript==

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
	if (TrackList == undefined || TrackList.length < 1) {
		GM_log('delay');
		unsafeWindow.setTimeout(addLinks, 100);
	} else {
		// Check if this particular page has been processed
		// through a previous call
		if (unsafeWindow.$$('.dldiv').length < 1) {
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
					unsafeWindow.Element.insert(element.parentNode.getElementsByClassName("tools")[0], "<li class='dldiv'><a class='download' title='Download' target='dummy' href='/serve/play/"+trackId+"/"+trackKey+"'><div class='dlicon'></div></a></li>");
				}		
				index++;
			});
		}
	}
}

injectCSS('div.selectedTrackGM {background: #EDF7FC none repeat scroll 0 0;} .tools .dldiv {position:relative; float:right; } .dlicon {background: url(data:image/gif;base64,R0lGODlhFAArAMIAAP///+Dg4Cd74f8AAP///////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAFkAAEALAAAAAAUACsAAANSGLrc7iPK9+SkzUacNWfa8C3hqJRYqIrdalXuRsXfaqL3ZZ7s7v/AoHBILBqPDYFyuVsyTU5lMzp1Vp+jqICj7W6TXqojjB2HP16oWC39tZHFBAA7) 0 0; display:block; width:18px; height:18px;} a:hover .dlicon {background-position: 0 18px; border:none; } .dldiv {margin-right:5px;} #player-container #dlcurrent {float:left; padding:8px 6px; margin: 0 7px 0 -10px; border-right: 1px solid #252525;} .buy, .store {opacity:0.5;} .twit, .read, .fbk {opacity:1;}');
addLinks();

// Display links after an Ajax update is complete
/*unsafeWindow.Ajax.Responders.register({
	onComplete: function() {
		// GM_log("ajax url: "+document.location.href);
		addLinks();
	}
}) */

// Add links after page updateCommands
funcUpdatePage = unsafeWindow.update_page_contents;
unsafeWindow.update_page_contents = function() {
	funcUpdatePage();
	addLinks();
}

// Update link when playing Track changes
funcUpdatePlayer = unsafeWindow.set_now_playing_info;
unsafeWindow.set_now_playing_info = function() {
	funcUpdatePlayer();
	addCurrentLink();
}

function addCurrentLink(){
	if (unsafeWindow.trackList == undefined || unsafeWindow.activeList == undefined || unsafeWindow.currentTrack == undefined || unsafeWindow.trackList[unsafeWindow.activeList] == undefined || unsafeWindow.trackList[unsafeWindow.activeList][unsafeWindow.currentTrack] == undefined) {
		GM_log('delay');
		unsafeWindow.setTimeout(addCurrentLink, 100);
	} else {
		if (unsafeWindow.$$('#dlcurrent').length < 1) {
			currentSong = unsafeWindow.trackList[unsafeWindow.activeList][unsafeWindow.currentTrack];
			document.getElementById('player-nowplaying').innerHTML += "<a id='dlcurrent' class='download' target='dummy' href='/serve/play/" + currentSong.id + "/" + currentSong.key + "'><div class='dlicon'></div></a>";
		}
	}
}
addCurrentLink();

//dummy frame
function addDummy(){
	var iframe = document.createElement('iframe');
	iframe.setAttribute('style', "display:none;");
	iframe.setAttribute('name', "dummy");
	document.body.appendChild(iframe);
}
addDummy();

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
	if (HotKeys.keyBindings[event.keyCode]) {
		HotKeys.keyBindings[event.keyCode].apply(event);
	} else {
		var character = String.fromCharCode(event.charCode);
		if (HotKeys.bindings[character]) {
			HotKeys.bindings[character].apply(event);}
		}
	}
);
