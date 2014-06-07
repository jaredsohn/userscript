// ==UserScript==
// @name           Setlist2Deezer
// @namespace      marclucchini
// @include        http://www.setlist.fm/setlist/*
// @include        http://*.deezer.com/*
// ==/UserScript==

/* Setlist.fm specificities: this part should be modified in order to adapt the script for another site */

var playlistPrefix = "setlist-fm-";
var deezerLinkId   = 'deezerLinkId';
var deezerImgId    = 'deezerImgId';

// -> Returns an Element node that will be clicked in order to launch the playlist creation.
function createSpecificGUI() {
	var socialBookmarkSet = document.evaluate('//div[@class=\'socialBookmarks\']', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (socialBookmarkSet.snapshotLength == 1) {
		var newNode = document.createElement("div");
		var socialBookmarkNode = socialBookmarkSet.snapshotItem(0);
		socialBookmarkNode.appendChild(newNode, socialBookmarkNode).innerHTML = 
			'<a id="' + deezerLinkId + '" href="javascript:return false;" class="digg" rel="nofollow" title="Create this playlist in Deezer"><img id="' + deezerImgId + '" src="http://www.deezer.com/favicon.ico" border="0" width="23" height="23"/></a>';

		return newNode;
	}
	return null;
}

// -> Function called when the playlist creation has been launched.
function playlistHasBeenLaunched() {
	var newImg = document.createElement("img");
	newImg.setAttribute("id", deezerImgId);
	newImg.setAttribute("src", "http://marclucchini.free.fr/userscripts/loading.gif");
	newImg.setAttribute("border", 0);
	newImg.setAttribute("width", 23);
	newImg.setAttribute("height", 23);
	var deezerLink = document.getElementById(deezerLinkId);
	var oldImg = document.getElementById(deezerImgId);
	deezerLink.replaceChild(newImg, oldImg);
}

// -> Function called when the playlist has been created. May display a link to the playlist.
function playlistHasBeenCreated(playlistUrl) {
	var oldLink = document.getElementById(deezerLinkId);
	oldLink.parentNode.removeChild(oldLink);

	var socialBookmarkSet = document.evaluate('//div[@class=\'socialBookmarks\']', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (socialBookmarkSet.snapshotLength == 1) {
		var newNode = document.createElement("div");
		var socialBookmarkNode = socialBookmarkSet.snapshotItem(0);
		socialBookmarkNode.appendChild(newNode, socialBookmarkNode).innerHTML = '<a href="' + playlistUrl + '" class="digg" rel="nofollow" title="Launch the playlist!"><img src="http://www.deezer.com/favicon.ico" border="0" width="23" height="23"/></a>';
	}
}

// -> Returns a string that contains the name of the artist. May return an empty string for an unspecific artist playlist.
function getArtist() {
	var artist;
	var artistItemSet = document.evaluate('/html/body/div/div/div/div/div/div/div/div/div/div[1]/strong/a/span', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (artistItemSet.snapshotLength == 1)
		artist = artistItemSet.snapshotItem(0).innerHTML;
	
	if (artist == null || artist.length == 0) {
		GM_log("Artist not found on the page.");
		return null;
	}
	return artist;
}

// -> Returns a string that contains details about the concert.
function getDetails() {
	var details;
	var detailsItemSet = document.evaluate('/html/body/div/div/div/div/div/div/div/h1', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (detailsItemSet.snapshotLength == 1)
		details = detailsItemSet.snapshotItem(0).innerHTML;
	
	if (details == null || details.length == 0) {
		GM_log("Details not found on the page.");
		return null;
	}
	return ""; // Page has changed. Returns "" to avoid future problems caused by a minor feature.
}

// -> Returns an array that contains the titles. If an artist is specified, it will be concatenated to the titles for the search.
function getTrackSet() {
	var trackSet = new Array();
	var trackItemSet = document.evaluate('/html/body/div/div/div/div/div/div/div/div/div/div/ul/li/ol/li/div/a[1]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < trackItemSet.snapshotLength; i++)
		trackSet.push(trackItemSet.snapshotItem(i).innerHTML);
	
	if (trackSet.length == 0) {
		GM_log("No track found on the page.");
		return null;
	}
	return trackSet;
}

/* Deezer interactions */

// Configuration
// This is a bypass to access deezer.com cookie in order to get the id of the current session.
// The right session id is sent in the cookie already, but the playlist_create method needs it *also* among the url parameters.
var apiKey;
var apiEndpoint;
var sid;
var deezerEnv = 'deezerEnv';
if (document.domain.match("deezer"))
	GM_setValue(deezerEnv, document.cookie);

// Dispatcher
var Observer = function() {
    this.observations = [];
};
Observer.prototype = {
    observe: function(name, func) {
		if (! this.observations[name])
			this.observations[name] = new Array();
        this.observations[name].push(func);
    },
    fire: function(name, data) {
		var funcs = this.observations[name];
		for (f in funcs)
			funcs[f].call(window, data);
    }
};
var dispatcher = new Observer();

// Globals
var artist;
var details;
var trackSet;

var serviceLaunched = false;
var errorLaunched = false;
var creatingPlaylist = false;

// Entry point
document.addEventListener("load", createGUI, true);
function createGUI() {
	document.removeEventListener("load", createGUI, true);
	var newNode = createSpecificGUI();
	if (newNode)
		newNode.addEventListener("click", createPlaylist, false);
}

function createPlaylist(e) {
	if (serviceLaunched) {
		if (! errorLaunched)
			alert("Processing playlist. Please wait a few seconds.");
		return true;
	}
	serviceLaunched = true;
	
	playlistHasBeenLaunched();

	dispatcher.observe("deezerEnvCtxtReady",  deezerBuildTrackSet);
	dispatcher.observe("deezerTrackSetReady", deezerBuildPlaylist);
	dispatcher.observe("deezerPlaylistReady", playlistHasBeenCreated);
	exec();
}

function exec() {
	artist = getArtist();
	details = getDetails();
	trackSet = getTrackSet();
	if ((! artist) || (! details) || (! trackSet))
		return false;

	var deezerCookie = GM_getValue(deezerEnv, '');
	if (deezerCookie == null || deezerCookie == '') {
		alert("Deezer environment not found. The script needs that you log in Deezer.");
		return false;
	}

	var deezerCookieArray = deezerCookie.split(';');
	for (var i = 0; i < deezerCookieArray.length; i++) {
		var entry = deezerCookieArray[i].split('=');
		var key = entry[0].replace(/^\s/, '');
		var value = entry[1];
		if (key == "sid") {
			sid = value;
			break;
		}
	}
	
	if (sid == null) {
		GM_log(deezerCookie);
		alert("Deezer environment incorrect. The script needs that you log in Deezer.");
		errorLaunched = true;
		return false;
	}
	
	GM_xmlhttpRequest({
		method: 'get',
		headers: {'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'User-agent': 'Mozilla/4.0 (compatible)'},
		url: 'http://www.deezer.com/fr/xml/config.php',
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "application/xml")
				var varSet = dom.getElementsByTagName("var");
				for (var i = 0; i < varSet.length; i++) {
					if (apiEndpoint != null && apiKey != null)
						break;
					var name = varSet[i].getAttribute("name");
					if (name == "api_gateway")
						apiEndpoint = varSet[i].textContent;
					else if (name == "api_key")
						apiKey = varSet[i].textContent;
				}

				if (apiKey == null || apiEndpoint == null)
					alert("The script could not retrieve Deezer configuration. Try again. If it doesn't help contact the script creator.");
				else
					dispatcher.fire("deezerEnvCtxtReady");
			}
			else
				handleHttpError(responseDetails.status);
		}
	})
	return true;
}

function deezerInitBuildTrackSet() {
	var deezerTrackIdSet = new Array();
	deezerBuildTrackSet(0, deezerTrackIdSet);
}

function deezerBuildTrackSet(i, deezerTrackIdSet) {
	var deezerTrackIdSet = new Array();
	var nbTrack = trackSet.length;
	for (var i = 0; i < nbTrack; i++)
	{
		var t = trackSet[i];
		(function(track, rank, tab, nbElem) {
			GM_xmlhttpRequest({
				method: 'post',
				headers: {'Content-Type': 'application/json', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'User-agent': 'Mozilla/4.0 (compatible)'},
				url: apiEndpoint + '?method=deezer_pageSearch&output=3&input=3&api_key=' + apiKey + '&sid=' + sid, // sid is useless here, but it's precised anyway in order to get an early error in case it's wrong: create_playlist will need the right one.
				data: '{"NB":1,"QUERY":"' + artist + " " + track + '"}',
				onload: function(responseDetails) {
					if (responseDetails.status == 200) {
						GM_log("searchTrack: " + responseDetails.responseText);
						var response = JSON.parse(responseDetails.responseText);
						if (response != null) {
							if (! handleApiError(response.error))
								return false;
						}
						var trackId;
						
						// A request like 'system of a down toxicity' will not return 'toxicity' as the first result, but 'chop suey!' instead because this is the first track of the album 'toxicity'
						// This can be enhanced:
						//    - proper way: by finding the right parameters in order to activate a filter on song titles only; however this parameter may not exist.
						//    - bypass: by asking for more than one result and filter on the client.
						if (response != null && response.results != null && response.results.TRACK != null && response.results.TRACK.data != null && response.results.TRACK.data[0] != null && response.results.TRACK.data[0].SNG_ID != null) {
							tab[rank] = response.results.TRACK.data[0].SNG_ID;
							if (tab.length === nbElem)
								dispatcher.fire("deezerTrackSetReady", tab);
						}
					}
					else
						handleHttpError(responseDetails.status);
				}
			})
			return true;
		}(t, i, deezerTrackIdSet, nbTrack));
	}
}

function deezerBuildPlaylist(deezerTrackIdSet) {
	if (! creatingPlaylist) {
		creatingPlaylist = true;
		var title = playlistPrefix + artist.toLowerCase().replace(/\s/g, '-');
		var songs = "";
		for (var i = 0; i < deezerTrackIdSet.length; i++) {
			var song = deezerTrackIdSet[i];
			if (song)
				songs += '[' + song + ',0],';
		}
		songs = songs.slice(0, songs.length - 1);
		
		GM_xmlhttpRequest({
			method: 'post',
			headers: {'Content-Type': 'application/json', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'User-agent': 'Mozilla/4.0 (compatible)'},
			url: apiEndpoint + '?method=playlist_create&output=3&input=3&api_key=' + apiKey + '&sid=' + sid,
			data: '{"STATUS":0,"STYLE_ID":-1,"TITLE":"' + title + '","SONGS":[' + songs + '],"TYPE":0,"DESCRIPTION":"Concert: ' + details + '"}',
			onload: function(responseDetails) {
				if (responseDetails.status == 200) {
					GM_log("makePlaylist: " + responseDetails.responseText);
					var response = JSON.parse(responseDetails.responseText);
					if (response != null) {
						if (! handleApiError(response.error))
							return false;
					}
					if (response != null && response.results != null) {
						var playlistId = response.results;
						var playlistUrl = 'http://www.deezer.com/music/playlist/' + title + '-' + playlistId;
						GM_log("playlistUrl: " + playlistUrl);
						dispatcher.fire("deezerPlaylistReady", playlistUrl);
					}
				}
				else
					handleHttpError(responseDetails.status);
			}
		})
		return true;
	}
	else
		GM_log("Concurrency handling: avoided to create the playlist twice.");
}

function handleHttpError(errorCode) {
	alert("HTTP Error: " + errorCode + ". Try again. If it doesn't help contact the script creator.");
	serviceLaunched = false;
}

function handleApiError(error) {
	if (error != null) {
		if (error.NEED_USER_AUTH_REQUIRED)
			alert("NEED_USER_AUTH_REQUIRED: the script needs that you log in Deezer.");
		else if (error.NEED_API_AUTH_REQUIRED)
			alert("NEED_API_AUTH_REQUIRED: the script needs a new session id in order to work. You may want to wake up your Deezer session by doing a search in Deezer and reload the page.");
		else if (error.GATEWAY_ERROR)
			alert("GATEWAY_ERROR: the script needs a valid API key in order to work.");
		else {
			errorLaunched = true;
			return true;
		}
		return false;
	}
	return true;
}
