// ==UserScript==
// @name cbcgoodies2
// @description	Adds helpful MP3 links to CBC Radio 3 pages.
// @include http://radio3.cbc.ca*
// ==/UserScript==

// Code to be injected into the page
function Injected() {
	if ('object' != typeof _r3PlayerInstance) {
		setTimeout(Injected, 200);
			return;
	}
	
	try {
	
	// Reset the ThinkAhead cache
	function ResetTA() {
		var script = document.createElement('script');
		script.type = 'application/json';
		script.id = 'TA_Reset';
		document.body.appendChild(script);
	}
	
	// Do a regular XPath query
	function XPath(path) {
		return document.evaluate(path, document, null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	
	// Do a JSON request to a CBC service
	function JSONReq(service, req, handler) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState != 4)
				return;
			try {
				var response = eval('(' + request.responseText + ')').d;
			} catch(e) {
				return;
			}
			if ('object' != typeof response)
				return;
			handler(response);
		};
		request.open('POST',
			'http://radio3.cbc.ca/modules/r3-player/services/PlayerWebService.asmx/'
			+ service, true);
		request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		request.send(req);
	}
	
	// Get a duration string from a track
	function GetTrackTime(track) {
		var secs = track.LengthInSeconds % 60,
			mins = (track.LengthInSeconds - secs) / 60;
		if (secs < 10) secs = '0' + secs;
		return ' (' + mins + ':' + secs + ')';
	}
	
	// Make a new <a> within oldelm
	function MakeLink(oldelm, track, desc) {
		var newelm = document.createElement('a');
		newelm.href = track.AudioUrl;
		newelm.innerHTML = desc;
		oldelm.replaceChild(newelm, oldelm.firstChild);
		
		var script = document.createElement('script');
		script.type = 'application/json';
		script.textContent = '{"thinkahead_ver": "1.04", "matches": [ { "urls": ["'+
			track.AudioUrl +
			'"], "response": { "Content-Disposition": "attachment; filename=\\"' +
			track.Artist + ' - ' + track.Title + '.mp3\\"" } } ] }';
		document.body.appendChild(script);
	}
	
	// Get the player caption element.
	var cappath = "//div[@id='r3player']/div[@id='trackDisplay']/div[@id='info']/div[@class='subTitle']",
		capelm = XPath(cappath).snapshotItem(0);

	// Called on track start and stream events.
	function PStart() {
		try {
			var permalink = _r3PlayerInstance.masterPlayer.getTrack().permalink;
		} catch (e) {
			return;
		}
		if ('string' != typeof permalink || permalink == '') {
			return;
		}
		JSONReq('GetTrack',
			'{"playlistPermalink":"' + permalink + '","sequence":0}',
		function(track) {
			// Replace the inner text node of the track label with a link.
			MakeLink(capelm, track, track.Title + GetTrackTime(track));
			ResetTA();
		});
	}
	
	// Use the R3 API to register event listeners for track info refreshing.
	_r3PlayerInstance.masterPlayer.addEventListener(
		CBCR3.Player.Events.PlaybackEvent.start, PStart);
	_r3PlayerInstance.masterPlayer.addEventListener(
		CBCR3.Player.Events.PlaybackEvent.stream, PStart);
				
	// Do an initial refresh.
	PStart();

	// Figure out what page we're on.
	var pages = { home:0, artist:1, concert:2, playlist:3 },
		pageurls = [
			'/home.aspx',
			'/music/artist.aspx',
			'/recordings/concert.aspx',
			'/playlists/playlist.aspx' ];
	for (var page = 0; page < pageurls.length; page++)
		if (document.documentURI.indexOf(pageurls[page]) != -1)
			break;

//	alert('Page: ' + page + ' - ' + document.documentURI);
	if (page >= pageurls.length)
		return;

	// Get the playlist permalink.
	var listlink;
	if (page == pages.home)
		listlink = 'http://radio3.cbc.ca/play/R3-30/playlist/R3-30';
	else {
		var listlink_paths = [
			"//div[@class='musicHeaderBox']/a[@class='imageButton permalinkButton']",
			"//div[@class='concertButtons']/a[@title='Play']",
			"//div[@class='playlistFields']/span[@class='permalinkButton permalink']/a" ];
		listlink = XPath(listlink_paths[page-1]).snapshotItem(0).href;
	}
//	alert('listlink = ' + listlink);
	
	// The JSON request to get the playlist info.
	JSONReq('GetPlaylist',
		'{"playlistPermalink":"' + listlink + '"}',
	function(response) {
		// Get the list of track title elements.
		var tracks = response.Tracks,
			nameelms_paths = [
			"//ul[@class='alternatingList r330List']//span[@title]",
			"//ul[@id='artistTracks']//h2[@class='title']",
			"//ul[@class='trackList']//label[@class='title']",
			"//ul[@id='playlistTracks']//label" ],
			nameelms = XPath(nameelms_paths[page]);
		
		// Use the response to replace title elements.
		for (var t = 0; t < tracks.length; t++) {
			var track = tracks[t],				
				desc = '';
			if (page == pages.home || page == pages.playlist)
				desc += '- ';
			desc += track.Title;
			if (page != pages.concert)
				desc += GetTrackTime(track);
			
			// Create the new div with the media link in it.
			MakeLink(nameelms.snapshotItem(t), track, desc);
		}
		ResetTA();
	});
	
	} catch (e) {
		alert(e);
	}
}

function OnBody() {
	// onload doesn't work, and sometimes this is null.
	if (!top.frames[0].document.body) {
//		GM_log('client document.body null, trying again in a short while.');
		setTimeout(OnBody, 200);
		return;
	}
	
	// This should only run for the "client" iframe.
	if (top.frames)
		if (window != top.frames[0])
			return;

	// Insert a script node into the page.
	var script = document.createElement('script');
	script.type = 'application/javascript';
	script.textContent = '(' + Injected + ')();';
	document.body.appendChild(script);
}
OnBody();
