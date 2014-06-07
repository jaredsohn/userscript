// ==UserScript==
// @name			YouTube Stitch
// @author			DarkJedi613
// @namespace		http://userscripts.org/scripts/show/32755
// @description		Stitch together YouTube videos of TV shows.
// @version			0.3
// @copyright		2008-09-08 Modified MIT License (see source)
// @include			http://youtube.tld/*
// @include			http://*.youtube.tld/*
// ==/UserScript==

/*
 * The following functions are used (with permission) from YousableTubeFix (http://userscripts.org/scripts/show/13333) by Mindeye
 * reloadPlayer, getFlashVar, setFlashVar, deleteFlashVar and unsafeWindow.gsPlayerReady (renamed to unsafeWindow.gsPlayerReadyToStitch)
 * If you wish to use these functions listed above you will have to ask Mindeye for permission (see above link).
 */

/*
 * Copyright (c) 2008 DarkJedi613
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software, to deal in the software without
 * restriction, including without limitation the rights to use, copy, modify, distribute copies of this software, and to permit
 * persons to whom the software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the software.
 * In addition credit must be given, including a link to http://userscripts.org/scripts/show/32755
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * The following rights, as well as those unlisted above, are reserved for the copyright holder: merge, publish, distribute, sublicense, and/or sell
 * copies of the software.
 */
 
 /*
  * Created from an idea found at Lifehacker (http://lifehacker.com/400630/top-10-youtube-hacks)
  *
  * Rewrite.Features.Compatibility/Bug Fixes
  * Changelog
  * 0.3	(2008-10-18)
  *		Supports multiple filters (x/y, Part, cz, SxxEyyPzz)
  *		Start of code for automatic updates, preferences
  * 0.2		(2008-09-08)
  * 	"titleNode is null" fixed
  *		Configurable number of videos to buffer at once
  * 0.1.1	(2008-09-05)
  * 	Fixed some errors with changing the title
  *		Compatible with YousableTubeFix (http://userscripts.org/scripts/show/13333)
  * 0.1		(2008-08-29)
  * 	First working version
  */
  
  /* To do list:
  buffer ld instead of hd
  grab from quick list
  */

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.addslashes = function() {
	return this.replace(/\\/g,"\\");
}

function insertAfter(newElement, precedingElement) {
	if (precedingElement) {
		precedingElement.parentNode.insertBefore(newElement, precedingElement.nextSibling);
	}
}

function getURLParameter(name, url) {
	if (url == null) {
		url = document.URL;
	}
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]"+name+"=([^&#]*)");
	var results = regex.exec(url);
	if (results == null) {
		return null;
	} else {
		return results[1];
	}
}

function findMoreParts(titleExp) {
	var titles = new Array;

	var moreFromUser = document.evaluate(
		"//div[@class='v90WrapperInner']/a",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < moreFromUser.snapshotLength; i++) {
		var tempTitle = moreFromUser.snapshotItem(i).firstChild.alt;
		if (tempTitle.match(titleExp) !== null) {
			titles[getURLParameter("v", moreFromUser.snapshotItem(i).href)] = tempTitle;
		}
	}

	var relatedVideos = document.evaluate(
		"//div[@class='watch-discoverbox-facets']/div[@class='vtitle']/a",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < relatedVideos.snapshotLength; i++) {
		var tempTitle = relatedVideos.snapshotItem(i).innerHTML;
		//Match pattern but don't match the current video
		if (tempTitle.match(titleExp) !== null) {
			titles[getURLParameter("v", relatedVideos.snapshotItem(i).href)] = tempTitle;
		}
	}
	
	return titles;
}

function YouTubeVideo(_video_id, _title, isDefault) {
	// Loads a player using the video id, automatically inserts it before the given element
	var video_id = _video_id;
	var title = _title;
	var player; //defined below
	
	//Some unknowns set by the following functions
	var season = null;
	var episode = null;
	var partNumber = null;
	var numberOfParts = null;
	
	setEpisodeInfo();
	setPartNumbers();
	
	//Special case to define to "default" video
	if (isDefault != null) {
		player = defaultPlayer;
		setFlashVar("jsapicallback", "gsPlayerReadyToStitch", false);
		setFlashVar("playerapiid", partNumber, true);
	} else {
		player = defaultPlayer.cloneNode(true);
		setFlashVar("video_id", _video_id, false);
		deleteFlashVar("t", false); //Allows video to play on any page
		setFlashVar("jsapicallback", "gsPlayerReadyToStitch", false);
		setFlashVar("playerapiid", partNumber, false);
		player.name = player.id = "movie_player";
	}
	var autoplayFailedRegs = 0;
	var uwPlayer = player.wrappedJSObject;
	
	var defaultHeight = player.height;
	var defaultStyleHeight = player.style.height;

	// Loads the player by adding it to the DOM tree before nextSibling
	function loadPlayer(nextSibling) {
		var playerParent = nextSibling.parentNode;
		playerParent.insertBefore(player, nextSibling);
	}
	
	// Reloads the player by removing it from the DOM tree and inserting it again in the same position
	// If the video is substituted by an icon, it won't do anything (a reload isn't necessary)
	function reloadPlayer() {
		var playerParent = player.parentNode;
		var playerNextSibling = player.nextSibling;
		playerParent.removeChild(player);
		playerParent.insertBefore(player, playerNextSibling);
	}
	
	// Gets a Flash string variable from the player
	// Returns null if the variable isn't found
	// The function doesn't escape/unescape variables or values (be careful with special characters like "&" or "=")
	function getFlashVar(varName) {
		// Gets the flashvars from player
		var flashVars = String(player.getAttribute("flashvars"));

		// Searchs for the varName in the flashvars
		var queryRE = new RegExp("(?:^|&)" + varName + "=([^&]*)");
		var queryRet = queryRE.exec(flashVars);

		// Returns the corresponding value or null (if not found)
		return (queryRet === null) ? null : queryRet[1];
	}

	// Sets a Flash string variable to the player
	// If doReloadPlayer is true it also reloads the player
	// The function doesn't escape/unescape variables or values (be careful with special characters like "&" or "=")
	function setFlashVar(varName, varNewValue, doReloadPlayer) {
		// Gets varName value now and the flashvars from the player
		var varValue = getFlashVar(varName);
		var flashVars = String(player.getAttribute("flashvars"));

		// If varName isn't set, just adds it
		// If varName is set, replaces its value with varNewValue
		if (varValue === null) {
			player.setAttribute("flashvars", flashVars + "&" + varName + "=" + varNewValue);
		}
		else {
			var replaceRE = new RegExp("(^|&)" + varName + "=" + varValue);
			flashVars = flashVars.replace(replaceRE, "$1" + varName + "=" + varNewValue);
			player.setAttribute("flashvars", flashVars);
		}
		// Reloads the player
		if (doReloadPlayer) reloadPlayer();
	}

	// Deletes a Flash string variable from the player
	// If doReloadPlayer is true it also reloads the player
	// The function doesn't escape/unescape variables or values (be careful with special characters like "&" or "=")
	function deleteFlashVar(varName, doReloadPlayer) {
		// Gets varName value now and the flashvars from the player
		var varValue = getFlashVar(varName);
		var flashVars = String(player.getAttribute("flashvars"));

		// Deletes varName if it's set
		if (varValue !== null) {

			// Searchs for varName and deletes it
			var replaceRE = new RegExp("(^|&)" + varName + "=" + varValue + "(&?)");
			flashVars = flashVars.replace(replaceRE, lambdaReplacer);
			player.setAttribute("flashvars", flashVars);
		}

		// Reloads the player
		if (doReloadPlayer) reloadPlayer();

		// Lambda function to remove varName in all scenarios
		// It is a nested function
		function lambdaReplacer(str, p1, p2, soffset, s) {
			return (p1 == "") ? p1 : p2; // p1 ==  "" if (^|&) matches ^ (start of string)
		}
	}
	
	// Set Season/Episode information from the title
	// Uses pattern of S##E## (case insensitive)
	function setEpisodeInfo() {
		var pattern = new RegExp(/S(\d+)E(\d+)/i);
		var result = pattern.exec(title);
		if (result) {
			season = result[1];
			episode = result[2];
		}
	}
	
	// Set part number & total number of parts from title
	function setPartNumbers() {
		for (var i = 0; i < partPatterns.length; i++) {
			var result = partPatterns[i].exec(title);
			if (result) {
				partNumber = result[1];
				numberOfParts = result[2];
				return; // Stop looking once found
			}
		}
	}

	// Return variables to access data
	this.video_id = video_id;
	this.title = title;
	this.player = player;
	this.uwPlayer = uwPlayer;

	this.autoplayFailedRegs = autoplayFailedRegs;
	this.defaultHeight = defaultHeight;
	this.defaultStyleHeight = defaultStyleHeight;

	this.season = season;
	this.episode = episode;
	this.partNumber = partNumber;
	this.numberOfParts = numberOfParts;
	
	// Give references to the functions that can be run from outside
	this.loadPlayer = loadPlayer;
	this.reloadPlayer = reloadPlayer;
}

// Function to initialize the YouTube API code to stop autoplay
// It registers our state change event listener (gsStateChangeListenerStitch) and then executes the default YouTube initialization function
// It is called by the player when its API module is ready (if the corresponding jsapicallback variable is set)
// Although the function is accesible from unsafeWindow, it's executed in the script context
unsafeWindow.gsPlayerReadyToStitch = function(playerId) {
	// Hide the player
	if (playerId != defaultPlayerId) {
		players[playerId].player.height = "0";
		players[playerId].player.style.height = "0";
	}

	// Tries to register the state change event listener
	// This sometimes fails for unknown reasons, so the error is cached and the player reloaded up to 4 times to try to do it again
	try {
		players[playerId].uwPlayer.addEventListener("onStateChange", "gsStateChangeListenerStitch");
	}
	catch(err) {
		if (players[playerId].autoplayFailedRegs < 4) {
			players[playerId].autoplayFailedRegs++; // Increments the counter by one
			players[playerId].reloadPlayer();
		}
		else {
			// Too many failed registration attempts. The API method will be disabled and the video will play as normal
			players[playerId].deleteFlashVar("jsapicallback", true);
		}
		return;
	}

	// The registration was successful. Resets the "failed attempts" counter
	players[playerId].autoplayFailedRegs = 0;

	// If the player is unmuted, mutes it (except for the first video)
	// As the pause video code can't pause the video till it's already playing, the sound is muted so the small delay is less noticeable
	if (players[playerId].uwPlayer.isMuted() === false && playerId != defaultPlayerId) players[playerId].uwPlayer.mute();

	// The default YouTube initialization function is called if it exists
	if (unsafeWindow.onYouTubePlayerReady) unsafeWindow.onYouTubePlayerReady(playerId);
}

// Function to pause the video first reproduction
// It is called by the player when its state changes
// Although the function is accesible from unsafeWindow, it's executed in the script context
unsafeWindow.gsStateChangeListenerStitch = function(stateId) {
	if (stateId === YOUTUBE_PLAYING) {
		for (var playerId in players) {
			// Don't pause the current player and only try to pause players that are playing
			if (playerId != currentlyPlayingId && players[playerId].uwPlayer.getPlayerState() === YOUTUBE_PLAYING) {
				players[playerId].uwPlayer.pauseVideo();
			}
		}
	} else if (stateId === YOUTUBE_ENDED) {
		//Hide the current player and show the next video
		players[currentlyPlayingId].player.height = "0";
		players[currentlyPlayingId].player.style.height = "0";
		var mute = players[currentlyPlayingId].uwPlayer.isMuted();

		// If we're at the last video reset to the first one
		if (currentlyPlayingId == players[currentlyPlayingId].numberOfParts) {
			currentlyPlayingId = 1;
		} else {
			currentlyPlayingId++;
		}

		//Show the next player and change the title
		players[currentlyPlayingId].player.height = players[currentlyPlayingId].defaultHeight;
		players[currentlyPlayingId].player.style.height = players[currentlyPlayingId].defaultStyleHeight;
		titleNode.innerHTML = players[currentlyPlayingId].title;

		/*if (mute === true && players[currentlyPlayingId].uwPlayer.isMuted() === false) {
			Unnecessary -- all the players should be muted
			players[currentlyPlayingId].uwPlayer.mute();
		} else */if (mute === false && players[currentlyPlayingId].uwPlayer.isMuted() === true) {
			players[currentlyPlayingId].uwPlayer.unMute();
		}/* else mute === players[currentlyPlayingId].uwPlayer.isMuted() so we can leave it */

		// Tries to play video (only if not the back at the default video or returned to the first video)
		// This sometimes fails for unknown reasons, so we try again (up to 4)
		// This usually only fails on the second video (the first video that was added to the page)
		if (currentlyPlayingId != defaultPlayerId && currentlyPlayingId != 1) {
			for (var tries = 0; tries < 4 && players[currentlyPlayingId].uwPlayer.getPlayerState() != YOUTUBE_PLAYING; tries++) {
				players[currentlyPlayingId].uwPlayer.playVideo();
			}
		}
		
		// Start buffering another video
		var nowBuffering = (currentlyPlayingId + numberToBuffer - 1 > players[defaultPlayerId].numberOfParts) ?
			currentlyPlayingId + numberToBuffer - 1 - players[defaultPlayerId].numberOfParts : // Loop back to the beginning
			currentlyPlayingId + numberToBuffer - 1;
		players[nowBuffering].loadPlayer(defaultPlayer);
	}
}



// This includes the video currently being watched
// Suggestions: Ultra low bandwidth: 1, Low bandwidth: 2, Recommended: 3, High bandwidth: 5
// If you are using a script that forces a higher quality video you may want to turn the number to buffer down
var numberToBuffer = GM_getValue("numberToBuffer", 3); // This needs to be a preference

// Patterns to match #START# and #END# are the set of integers
var partPatternsString = GM_getValue("partPatterns",
	"#START#\\/#END#|Part.#START#|cz.#START#|S\\d+E\\d+P#START#"); // Matches xx/yy, Part xx, cz.xx, SaaEbbPxx
var partPatternsStrings = partPatternsString.split("|");
var partPatterns = new Array();
for (var i = 0; i < partPatternsStrings.length; i++) {
	// Try making the string into a pattern and fail gracefully
	try {
		var tempPartPatternString = partPatternsStrings[i].replace(/#START#/, "(\\d+)");
		if (tempPartPatternString.match(/#END#/)) {
			tempPartPatternString = tempPartPatternString.replace(/#END#/, "(\\d+)");
		}
		var regex = new RegExp(tempPartPatternString);
		partPatterns[i] = regex;
	} catch(e) {
		GM_log(e);
	}
}

// Update variables
var lastUpdateCheck = GM_getValue("lastUpdateCheck", new Date());
var updateCheckFrequency = GM_getValue("updateCheckFrequency", 60 * 60 * 24 * 3); // 3 days
var version = GM_getValue("version", 0.3);

// Check to see if there is a new version available
if (lastUpdateCheck < new Date() + updateCheckFrequency) {
	//checkForUpdate();
}

// Configuration menu
// Not quite done yet
/*GM_registerMenuCommand("YouTube Stitch Configuration",
	function() {
		var filterDiv = document.createElement("div");
		filterDiv.setAttribute("style", "background-color: black; opacity: 0.5; z-index: 100; position: fixed; left: 0px; top: 0px;"
			+ "width: 100%; height: 100%");
		var optionsDiv = document.createElement("div");
		optionsDiv.setAttribute("style", "background-color: #EEEEEE; overflow: auto; padding: 5px; z-index: 101;"
			+ "outline: black solid thin; position: fixed; left: 30%; top: 10%; width: 40%; height: 80%;");
		optionsDiv.innerHTML = '<h3 style="text-align: center;">YouTube Stitch Configuration</h3>';
		
		document.body.appendChild(filterDiv);
		document.body.appendChild(optionsDiv);
	},
	null,
	null,
	"Y");*/

// Create variables for states
var YOUTUBE_UNSTARTED = -1;
var YOUTUBE_ENDED = 0;
var YOUTUBE_PLAYING = 1;
var YOUTUBE_PAUSED = 2;
var YOUTUBE_BUFFERING = 3;
var YOUTUBE_CUED = 5;

// Sets up variables to store players in
var defaultPlayer = document.getElementById("movie_player");
var titleNode = document.evaluate(
	"//div[@id='watch-vid-title']/*",
	document,
	null,
	XPathResult.FIRST_ORDERED_NODE_TYPE,
	null).singleNodeValue;
var players = new Array();

// Only run if we're watching a video (and can find both the title and the player)
if (titleNode && defaultPlayer) {
	var tempYouTubeVideo = new YouTubeVideo(getURLParameter("v"), titleNode.innerHTML.trim(), true);

	// Global variables
	var currentlyPlayingId;
	var defaultPlayerId;
	var nowPlaying = false; 

	// If it looks like its split into parts then run the script
	if (tempYouTubeVideo.partNumber != null /*&& tempYouTubeVideo.numberOfParts != null*/) {
		defaultPlayerId = tempYouTubeVideo.partNumber;
		players[defaultPlayerId] = tempYouTubeVideo;

		currentlyPlayingId = defaultPlayerId;

		// Check for matching titles (against each pattern)
		//for (var i = 0; i < partPatterns.length && ; i++) {
		for (var i = 0; i < partPatterns.length; i++) {
			// Only check if pattern even matches, else ignore
			if (titleNode.innerHTML.trim().match(partPatterns[i])) {
				// Create string to match
				var tempPartPatternString = partPatternsStrings[i].replace(/#START#/, players[defaultPlayerId].partNumber);
				// Create the replacement string
				var replacementPartPatternString = partPatternsStrings[i].replace(/#START#/, "(\\d+)");
				if (tempPartPatternString.match(/#END#/)) {
					tempPartPatternString = tempPartPatternString.replace(/#END#/, players[defaultPlayerId].numberOfParts);
					replacementPartPatternString = replacementPartPatternString.replace(/#END#/, players[defaultPlayerId].numberOfParts);
				}
				// Replace the string to create the pattern
				var titleExp = titleNode.innerHTML.trim().replace(new RegExp(tempPartPatternString), replacementPartPatternString);

				var titles = findMoreParts(titleExp);
				for (var video_id in titles) {
					var tempYouTubeVideo = new YouTubeVideo(video_id, titles[video_id]);
					// If it has a part # then add it to the array
					if (players[tempYouTubeVideo.partNumber] == undefined) {
						players[tempYouTubeVideo.partNumber] = tempYouTubeVideo;
						// Buffer the video if it should be
						// This statement is wrong when defaultPlayerId != 1
						if ((tempYouTubeVideo.partNumber - defaultPlayerId) < numberToBuffer) {
							tempYouTubeVideo.loadPlayer(defaultPlayer);
						}
					}
				}
			}
		}
	}
}