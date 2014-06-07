// ==UserScript==
// @name cbcgoodies3
// @description	Adds helpful MP3 links to CBC Music pages.
// @include http://music.cbc.ca/*
// @version 3.0
// ==/UserScript==
// Code to be injected into the page
function Injected() {
	try {
		var
		// Sometimes console is stupid
		conlog = function(str) {
			if (console && console.log) {
				console.log(str);
			}
		},

		// Get a duration string from a JSON track object
		GetTrackTime = function(jtrack) {
			var secs = jtrack.duration % 60,
				mins = (jtrack.duration - secs) / 60;
			if (secs < 10) {
				secs = '0' + secs;
			}
			return ' (' + mins + ':' + secs + ')';
		},

		// Make a new <a> within oldelm
		MakeLink = function(oldelm, jtrack, desc) {
			var newelm = document.createElement('a');
			newelm.href = jtrack.audioUrl;
			if (!desc) {
				desc = jtrack.title + GetTrackTime(jtrack);
			}
			conlog('Replacing link for track "' + desc + '", audioUrl "' + jtrack.audioUrl + '"');
			newelm.innerHTML = desc;
			oldelm.replaceChild(newelm, oldelm.firstChild);
		},
		
		// Some globals
		player,       // r3PlayerBootStrap.masterPlayerInstance
		plplayer,     // r3PlayerBootStrap.masterPlayerInstance.playlistPlayer
		strplayer,    // r3PlayerBootStrap.masterPlayerInstance.streamPlayer
		pwservice,    // CBC.Radio3.Player.Web.PlayerWebService
		clientFrame,  // r3PlayerBootStrap.clientFrame
		capElm,       // Player caption element used as target for track info
		permalinkReq, // Permalink string - most recent permalink
		track,        // JSON track object - most recently fetched track
		isPanel = document.documentURI.indexOf('artist.aspx') != -1 ||
			document.documentURI.indexOf('concert.aspx') != -1,
		isPlaylist = document.documentURI.indexOf('playlist.aspx') != -1,
		
		// What happens if a CBC AJAX service returns a failure
		ServiceFail = function(err) {
			conlog('GetPlaylist Service error: ' + err);
		},
		
		// This is called after asking for info on one streamed track
		PlaylistTrackReceived = function(response) {
			if (response && response.Successful) {
				track = new window.CBCR3.Player.Mappers.PlaylistTrackDtoMapper().mapFrom(response.Payload);
				conlog('Track received from GetPlaylistTrack: ' + track.title);
				MakeLink(capElm, track);
			}
		},
		
		// Called on streaming metadata updates that are missing audioUrl
		PlayerUpdated = function(event) {
			try {
				// Check RTMPPlayer waitingToPlay streamMount
				if (event && event.data && event.data.value &&
					player.playerState.mode == 'stream') {
					var trackInfo = event.data.value.getNowPlaying();
					if (trackInfo && trackInfo.permalink && permalinkReq != trackInfo.permalink) {
						permalinkReq = trackInfo.permalink;
						conlog('Requesting audioUrl for ' + permalinkReq);
						pwservice.GetPlaylistTrack(permalinkReq, 0, PlaylistTrackReceived, ServiceFail);
					} else if (!trackInfo.permalink) {
						conlog('No permalink for stream');
					}
				}
			} catch (e) {
				alert(e);
			}
		},
		
		// Called after the R3 code tinkers with the title
		SetTitle = function(event) {
			if (track) {
				if (capElm.title.toLowerCase() == track.title.toLowerCase()) {
					MakeLink(capElm, track);
				} else {
					conlog('Caption "' + capElm.title + '" does not match stored "' + track.title + '"');
				}
			}
		},
		
		// Called when an actual audioURL is received
		TrackReceived = function(response) {
			try {
				if (response && response.data) {
					track = response.data.track;
					if (track) {
						conlog('Track received from serviceEvent:trackReceived: "' + track.title + '"');
						MakeLink(capElm, track);
					}
				}
			} catch (e) {
				alert(e);
			}
		},

		// Register hooks in the CBCR3 code
		RegisterHandlers = function() {
			conlog('Registering handlers...');

			strplayer.nodesocketservice.addEventListener('metaNode:playerupdated', PlayerUpdated);
			plplayer.addEventListener('serviceEvent:trackReceived', TrackReceived);
			player.addEventListener('playbackEvent:start', SetTitle);
			player.addEventListener('playbackEvent:stream', SetTitle);

			conlog('Event handlers registered.');
		},
		
		// Called after we ask for info on a whole playlist
		PlaylistReceived = function(response) {
			try {
				response.Tracks.each(
				function(jtrack) {
					var trackpath = "//div[contains(@class,'item') and .//a[contains(@class,'gearsButton') and @href='" + jtrack.Permalink + "']]//label",
						tracklabel = document.evaluate(trackpath,
							document, null, XPathResult.ANY_UNORDERED_NODE_TYPE)
							.singleNodeValue,
						mappedtrack = new window.CBCR3.Player.Mappers.PlaylistTrackDtoMapper().mapFrom(jtrack);
					MakeLink(tracklabel, mappedtrack);
				});
			} catch (e) {
				alert(e);
			}
		},
		
		// Get a playlist (actual playlist or artist listing) permalink
		GetPlaylistPermalink = function() {
			// Get the audio links
			var playpath = isPlaylist ?
					"//a[@class='playButton' and @title='Play All']/@href" :
					"//a[@class='playButton' and text()='Play All']/@href",
				href = document.evaluate(playpath, document, null,
					XPathResult.ANY_UNORDERED_NODE_TYPE);
			return href.singleNodeValue.nodeValue;
		},

		// Fix some CSS stupidity in the playlist panel
		UpdatePlaylist = function() {
			var newstyle = document.createElement('style');
			newstyle.type = 'text/css';
			newstyle.textContent = '.panel label a, .panel label { height: auto !important; width: auto !important; }';
			document.head.appendChild(newstyle);
		},
		
		// Update everything in the page after we know that the player code is loaded
		UpdatePage = function() {
			capElm = clientFrame.document.getElementsByClassName('subTitle')[0];
			if (isPanel) {
				UpdatePlaylist();
			}
			RegisterHandlers();
			
			var permalink = GetPlaylistPermalink();
			conlog('Playlist permalink: ' + permalink);
			pwservice.GetPlaylist(permalink, PlaylistReceived, ServiceFail);
		},
		
		// Wait for the player code and all of the things we care about to be loaded
		WaitForVars = function() {
			try {
				if (window.CBC &&
					window.CBC.Radio3 &&
					window.CBC.Radio3.Player &&
					window.CBC.Radio3.Player.Web &&
					parent &&
					parent.r3PlayerBootStrap) {
					var bootstrap = parent.r3PlayerBootStrap;
					pwservice = window.CBC.Radio3.Player.Web.PlayerWebService;
					if (bootstrap && pwservice) {
						clientFrame = bootstrap.clientFrame;
						player = bootstrap.masterPlayerInstance;
						if (player && clientFrame) {
							plplayer = player.playlistPlayer;
							strplayer = player.streamPlayer;
							if (plplayer && strplayer) {
								UpdatePage();
								return;
							}
						}
					}
				}
                conlog('Waiting some more for the variables...');
				setTimeout(WaitForVars, 100);
			} catch (e) {
				alert(e);
			}
		};

		if (!(isPanel || isPlaylist)) {
			return;
		}

		conlog('Looking for variables from page "' + document.documentURI + '"');
		WaitForVars();
	} catch (e) {
		alert(e);
	}
}

window.addEventListener('load', function () {
	// Insert a script node into the page.
	var script = document.createElement('script');
	script.type = 'application/javascript';
	script.textContent = '(' + Injected + ')();';
	document.body.appendChild(script);
});