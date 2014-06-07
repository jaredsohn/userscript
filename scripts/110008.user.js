// ==UserScript==
// @name           ScrobbleSmurf
// @namespace      scrobble
// @description    Scrobble songs from YouTube.
// @include        *.youtube.com/?token=*
// @include        */youtube.com/?token=*
// @include        *.youtube.com/watch?*v=*
// @include        */youtube.com/watch?*v=*
// @include		   *.youtube.com/watch%3F*v=*
// @include        */youtube.com/watch%3F*v=*
// @include        *.youtube.com/watch#!*v=*
// @include        */youtube.com/watch#!*v=*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant		   GM_deleteValue
// @grant          GM_xmlhttpRequest
// @version		   1.6.0
// ==/UserScript==
/* You can contact me on Twitter @DDaan90 or Last.FM (DDaan90).
 * - Don't steal all of my code and say it's yours. 
 * - You may steal parts of my code. Credits are not required. 
 * - Suggestions and improvements are welcome. 
 * - This code is free, when you take parts of my code expect it will remain free.
 */
var useHtml5LocalStorage = false;
var showTime = 0;
var scrobbleTimer;
var scrobLength = -1;
var noScrobble = false;
var iTunesArtistAndTitleFound = false;

var scrobbleAutoCollapse = "lastfmExpand";
var scrobblePercentage = "50";
var scrobbleEnabled = "yes";
var scrobbleFilter = "";

var apiKey = "870da3cecaf2a63062b474a93ace2285";
var lastFmAuthenticationUrl = "http://www.last.fm/api/auth/";
var authenticationSessionUrl = "http://ddaanv.nl/lastfm/auth/getSession/";
var scrobbleSongUrl = "http://ddaanv.nl/lastfm/scrobbleSong/";
var youtubeApiUrl = "http://gdata.youtube.com/feeds/api/videos/";

//--General functions.
/**
 * Shows a message in the ScrobbleSmurf menu.
 */
function menuAlert(text) {
	text = text.replace(/\n/gi, "<br/>");
	var scrobbCount = document.getElementById("scrobble-counter");
	var scrobbMessg = document.getElementById("scrobble-message");
	var scrobbMsg = document.getElementById("scrobble-msg");
	scrobbCount.style.display = "none";
	scrobbMessg.style.display = "block";
	scrobbMsg.innerHTML = text + ".";
}
/**
 * Starts the script.
 */
function start() {
	var authUrlRegex = /.[.\/]youtube.com\/\?token=.*/gi;
	var valid = authUrlRegex.test(document.URL);
	if(valid) {
		tryGetAuthToken();
	} else {
		initialize();
	}
}
/**
 * Initialisation function, should be called once the document is loaded. 
 * The ScrobbleSmurf plug-in will be added to the YouTube page.
 */
function initialize() {
	//Somehow the script runs twice, the first time not all elements are loaded.
	var userBarContainer1 = document.getElementById("yt-masthead");
	if(userBarContainer1 != null) {
		try {
			localStorageEnabledCheck();
			loadSavedFormValues();
			
			addStyle();
			addLastFmOptions();
			addLastFmButton();
			addMenuPop();
			activateLastFmButtons();
			activateResetLastFmFormVisbilityByAccountButton();
			
			var song = getSongInformation();
			fillSongInformation(song);
			
			checkVideoLoaded();
			
			if(!isLoggedIn()) {
				showLoginHideReset();
			} else {
				setUsernameSpan();
				hideLoginShowReset();
			}
		} catch (e) {
			debugger;
			console.log(e);
		}
	}
}
/**
 * This function detects if the video is loaded.
 * In case Flashblock plug-in is enabled or the video player will be loaded later so an event listener is added. 
 * In case a flashblock is enabled or HTML5 is used an API request will be scheduled when the Flash element gets loaded.
 * In case no flashblock is enabled the request is executed immediately.
 */
function checkVideoLoaded() {
	var videoContainer = document.getElementById("player-api");
	var embedVideoCount = videoContainer.getElementsByTagName("embed").length;
	if(embedVideoCount > 0 || typeof(document.getElementById("movie_player-html5")) !== "undefined") {
		//In case Flash/HTML5 a video is showing.
		videoApiRequest();
	} else {
		//In case Flashblock is enabled (no video is showing).
		videoContainer.addEventListener("DOMNodeInserted", videoContainerUpdate, false);
	}
}
/**
 * Function that should be triggered when a user disables his Flashblocker or the HTML5 player is loaded. 
 * Checks if there is an embed element available or the HTML5 player is added and if so starts the scrobbling timer and such.
 */
function videoContainerUpdate() {
	var videoContainer = document.getElementById("watch7-player");
	var embedVideoCount = videoContainer.getElementsByTagName("embed").length;
	if(embedVideoCount > 0 || typeof(document.getElementById("movie_player-html5")) !== "undefined") {
		videoContainer.removeEventListener('DOMNodeInserted', flashBlockUpdate, false);
		videoApiRequest();
	}
}
//--Google Chrome compatibility functions.
/**
 * Alerts the user when the browser does not support HTML5 local storage.
 */
function localStorageEnabledCheck() {
	var hasGreaseMonkey = typeof(GM_getValue("a", "b")) !== "undefined";
	if(!hasGreaseMonkey) {
		useHtml5LocalStorage = window.localStorage;
		if(!useHtml5LocalStorage) {
			alert("Your browser does not support HTML5 local storage, nor GreaseMonkey.\n" +
				"Any of these two is required to use ScrobbleSmurf.");
		}
	} else {
		useHtml5LocalStorage = false;
	}
}
//--Functions for the additional menu pop up.
/**
 * Adds the more options pop up and background to the YouTube page. 
 * By default the pop up is hidden, to show it call the moreOptions method.
 */
function addMenuPop() {
	var page = document.getElementById("page");
	var pop = document.createElement("div");
	pop.setAttribute("id", "lastfm-moreoptions-pop");
	pop.style.visibility = "hidden";
	
	pop.innerHTML = "<h2>More Last FM Options</h2>\n" + 
	"<form id=\"lastfm-moreoptions-form\">\n" +
	"<table class=\"lastfm-moreoptions-table\"><tr>\n" +
	"	<col width=\"40%\" /><col width=\"60%\" />" + 
	"	<td>Collapse ScrobbleSmurf menu</td>\n" +
	"	<td><input name=\"lastfm-moreoptions-collapse\" type=\"radio\" value=\"collapse\">Collapse the menu by default.<br/>\n" + 
	"	<input name=\"lastfm-moreoptions-collapse\" type=\"radio\" value=\"expand-music\">Expand only with music videos.<br/>\n" +
	"	<input name=\"lastfm-moreoptions-collapse\" type=\"radio\" value=\"expand\">Expand the menu by default.</td>\n" +
	"</tr><tr>\n" +
	"	<td>Scrobble percentage</td>\n" +
	"	<td><select style=\"width:100%\" name=\"lastfm-moreoptions-percentage\">\n" +
	"		<option value=\"20\">20 percent</option>\n" +
	"		<option value=\"30\">30 percent</option>\n" +
	"		<option value=\"40\">40 percent</option>\n" +
	"		<option value=\"50\">50 percent</option>\n" +
	"		<option value=\"60\">60 percent</option>\n" +
	"		<option value=\"70\">70 percent</option>\n" +
	"		<option value=\"80\">80 percent</option>\n" +
	"	</select></td>\n" +
	"</tr><tr>\n" +
	"	<td>Words to remove<br/><i>(separate by semicolon)<i></td>\n" +
	"	<td><input style=\"width:100%\" id=\"lastfm-moreoptions-filter\" name=\"lastfm-moreoptions-filter\" type=\"text\"></input></td>\n" +
	"</tr><tr>\n" +
	"	<td>Enable all scrobbling</td>\n" +
	"	<td><input name=\"lastfm-moreoptions-scrobble\" type=\"radio\" value=\"yes\">Yes, scrobble my songs to Last FM<br/>\n" + 
	"	<input name=\"lastfm-moreoptions-scrobble\" type=\"radio\" value=\"no\">No, do not scrobble my songs</td>\n" +
	"</tr></table>\n" +
	"</form>\n" +
	"<div class=\"lastfm-moreoptions-controls\">\n" + 
	"	<button class=\"yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-hh-default\" id=\"lastfm-moreoptions-ok\" title=\"Save changes\"><span class=\"yt-uix-button-content\">Save</span></button>\n" +
	"	<button class=\"yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-hh-default\" id=\"lastfm-moreoptions-cancel\" title=\"Discard changes\" style=\"margin-left: 14px;\"><span class=\"yt-uix-button-content\">Cancel</span></button>\n" +
	"</div>\n";	
	page.appendChild(pop);
	centerPopup(pop);
	
	activatePopupControls();
}
/**
 * Attemps to center the more options pop up.
 */
function centerPopup(popup) {
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	
	var popupWidth = parseInt(popup.clientWidth);
	var popupHeight = parseInt(popup.clientHeight);
	
	popup.style.position = "absolute";
	var top = windowHeight/2 - popupHeight/2;
	var left = windowWidth/2 - popupWidth/2;
	popup.style.top = (top > 0 ? top : 0) + "px";
	popup.style.left = (left > 0 ? left : 0) + "px";
}
/**
 * Activates the buttons on the more options pop up.
 */
function activatePopupControls() {
	var okButton = document.getElementById("lastfm-moreoptions-ok");
	var cancelButton = document.getElementById("lastfm-moreoptions-cancel");
	
	okButton.addEventListener("click", saveCurrentForm, false);
	cancelButton.addEventListener("click", function() { moreOptions(true); }, false);
}
/**
 * Saves the currently selected values from the more options menu pop up to the user's hard disk.
 */
function saveCurrentForm() {
	var sform = document.getElementById("lastfm-moreoptions-form");
	
	var collapse = getSelectedRadioButton("lastfm-moreoptions-collapse");
	var percentage = sform.elements["lastfm-moreoptions-percentage"].value;
	var filter = sform.elements["lastfm-moreoptions-filter"].value;
	var enable = getSelectedRadioButton("lastfm-moreoptions-scrobble");
	
	if(useHtml5LocalStorage) {
		localStorage.setItem("lastfmExpand", collapse);
		localStorage.setItem("lastfmPercentage", percentage);
		localStorage.setItem("lastfmFilter", filter);
		localStorage.setItem("lastfmScrobble", enable);
	} else {
		GM_setValue("lastfmExpand", collapse);
		GM_setValue("lastfmPercentage", percentage);
		GM_setValue("lastfmFilter", filter);
		GM_setValue("lastfmScrobble", enable);
	}
	
	moreOptions(true);	
	loadSavedFormValues();
}
/**
 * Loads values from the more options menu pop up the user saved to it's hard disk. 
 */
function loadSavedFormValues() {
	var autoCollapse, percentage, filter, enabled;
	if(useHtml5LocalStorage) {
		autoCollapse = localStorage.getItem("lastfmExpand");
		percentage = localStorage.getItem("lastfmPercentage");
		filter = localStorage.getItem("lastfmFilter");
		enabled = localStorage.getItem("lastfmScrobble");
	} else {
		autoCollapse = GM_getValue("lastfmExpand");
		percentage = GM_getValue("lastfmPercentage");
		filter = GM_getValue("lastfmFilter");
		enabled = GM_getValue("lastfmScrobble");
	}
	scrobbleAutoCollapse 	= autoCollapse 	== null ? scrobbleAutoCollapse 	: autoCollapse;
	scrobblePercentage 		= percentage 	== null ? scrobblePercentage 	: percentage;
	scrobbleFilter 			= filter 		== null ? scrobbleFilter 		: filter;
	scrobbleEnabled 		= enabled 		== null ? scrobbleEnabled 		: enabled;
}
//--Functions to get additional video information from the YouTube API.
/**
 * Gets the current YouTube video ID from the browser URL.
 */
function getYouTubeVideoId() {
	var regex = /(\?|%3F|&|%26)v=[^\?&#]*/gi;
	var matches = document.URL.match(regex);
	if(matches == null) {
		return null;
	}
	var removeRegex = /(\?|%3F|&|%26)v=/gi;
	var videoCode = matches[0].replace(removeRegex, "");
	return videoCode;
}
/**
 * Uses the YouTube API to get more information from the current video.
 */
function videoApiRequest() {
	var vidId = getYouTubeVideoId();
	if(vidId == null) {
		return;
	}
	GM_xmlhttpRequest({
		method: "GET",
		url: youtubeApiUrl + vidId + "?v=2&alt=jsonc",
		headers: {
			"Accept": "application/json"
		},
		onload: videoApiResponse,
		onerror: function() {
			menuAlert("Could not connect \nto YouTube API.");
		}
	});
}
/**
 * Handles data returned from the YouTube API which provides more data from the video.
 */
function videoApiResponse(response) {
	var jsonObject = eval("(" + response.responseText + ")");
	var category = jsonObject.data.category.toLowerCase();
	if(countOccurencesInString(category, "music") < 1) {
		noScrobble = true;
		menuAlert("No music video");
		return;
	} else {
		if(scrobbleAutoCollapse === "expand-music") {
			toggleLastFmForm();
		}
	}
	
	scrobLength = Math.round(jsonObject.data.duration / (100 / scrobblePercentage) );
	if(scrobbleEnabled === "no") {
		dontScrobble();
	} else {
		scrobbleTimer = setInterval(timePlus, 1000);
	}
	
	if(!iTunesArtistAndTitleFound) {
		var vidTitle = jsonObject.data.title;
		if(scrobbleFilter) {
			var filterWords = scrobbleFilter.split(";");
			for(word in filterWords) {
				var escapedFilterWord = escapeAllRegexSpecialChars(filterWords[word].trim());
				var filterRegex = new RegExp(escapedFilterWord, "gi");
				vidTitle = vidTitle.replace(filterRegex, "");
			}
		}
		
		var song = tryStripSongFromTitle(vidTitle);
		fillSongInformation(song);
	}
}
/**
 * Escapes all characters with a special meaning in Regular Expressions.
 */
function escapeAllRegexSpecialChars(regexString) {
	var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    var regex = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
	
	regexString= regexString.replace(regex, '\\$1');	
	return regexString;
}
//--Scrobbling functions.
/**
 * Adds one to timer and updates the textspans. When the timeLeft is 0 (or less the song will be scrobbled).
 */
function timePlus() {
	showTime++;
	var timeLeft = scrobLength - showTime;
	
	if(timeLeft <= 0) {
		clearInterval(scrobbleTimer);
		scrobbleSong();
	}
	
	var timeSpan = document.getElementById("scrobble-time");
	timeSpan.innerHTML = Math.max(timeLeft, 0);
}
/**
 * Srobbles a song using the values from the two textinput's from the form.
 */
function scrobbleSong() {
	var artist = document.getElementById("lastfm-artist").value;
	var title = document.getElementById("lastfm-title").value;
	var album = document.getElementById("lastfm-album").value;
	if(artist == "" || title == "") {
		menuAlert("Insufficient artist \nand title information");
		return;
	}

	if(!isLoggedIn()) {
		menuAlert("Please authenticate \nbefore scrobbling");
	}
	else {
		var user = getUserCredentials();
		var timestamp = Math.round(new Date().getTime()/1000.0);
		
		var args = "?artist=" + encodeURIComponent(artist) + "&sk=" + user.sessionk + 
		"&timestamp=" + timestamp + "&track=" + encodeURIComponent(title);
		if(album) {
			args += "&album=" + encodeURIComponent(album)
		}
		
		menuAlert("Scrobbling song");
			
		GM_xmlhttpRequest({
			method: "GET",
			url: scrobbleSongUrl + args,
			onload: scrobbleFeedback,
			onerror: function() { menuAlert("Scrobbling failed") }
		});
	}
}
/**
 * Show the user a response to their Scrobble attempt.
 */
function scrobbleFeedback(response) {
	var jsonObject = JSON.parse(response.responseText);
	
	if(jsonObject.error != null) {
		menuAlert("Error connecting to Last.FM.\n" + 
		"Error code: " + jsonObject.error + "\n" +
		"Message: " + jsonObject.message + ".");
	} else {
		var artist = getJsonProperty(jsonObject.scrobbles.scrobble.artist, "text");
		var title = getJsonProperty(jsonObject.scrobbles.scrobble.track, "text");
		var album = getJsonProperty(jsonObject.scrobbles.scrobble.album, "text");
		if(album) {
			menuAlert("Scrobbled song\nArtist: " + artist + "\nTitle: " + title + "\nAlbum: " + album);
		} else {
			menuAlert("Scrobbled song\nArtist: " + artist + "\nTitle: " + title);
		}
	}
	function getJsonProperty(jsonObject, value) {
		return jsonObject[value] == null ? jsonObject["#" + value] : jsonObject[value];
	}
}
//--Login functions.
/**
 * Attempts to get a Last FM token from the URL. If so authenticate the user.
 */
function tryGetAuthToken() {
	var url = document.URL;
	var tokenRegex = /(\?|%3F|&|%26)token=([0-9a-f]){32}/gi;
	var matches = url.match(tokenRegex);
	if(matches == null) {
		return;
	}
	var removeRegex = /(\?|%3F|&|%26)token=/gi;
	var token = matches[0].replace(removeRegex, "");
	
	GM_xmlhttpRequest({
		method: "GET",
		url: authenticationSessionUrl + "?token=" + token,
		headers: {
			"Accept": "text/html" //My hosting puts in html spam
		},
		onload: getSessionKey
	});
}
/**
 * Gets a Last FM session key and store it for later reference.
 */
function getSessionKey(response) {
	var jsonObject = JSON.parse(response.responseText);
	
	if(jsonObject.error != null) {
		menuAlert("Error connecting to Last.FM.\n" + 
		"Error code: " + jsonObject.error + "\n" +
		"Message: " + jsonObject.message + ".");
	} else {
		if(useHtml5LocalStorage) {
			localStorage.setItem("lastfmUsername", 		jsonObject.session.name);
			localStorage.setItem("lastfmSessionkey", 	jsonObject.session.key);
		} else {
			GM_setValue("lastfmUsername", 	jsonObject.session.name);
			GM_setValue("lastfmSessionkey", jsonObject.session.key);
		}
		
		setUsernameSpan();
		hideLoginShowReset();
	}
}
/**
 * Check whether user credentials are stored or not.
 */
function isLoggedIn() {
	var user = getUserCredentials();
	if(user.username == null || user.sessionk == null) {
		return false;
	}
	return true;
}
/**
 * Gets the user's stored credentials.
 */
function getUserCredentials() {
	var user = new Object();
	if(useHtml5LocalStorage) {
		user.username = localStorage.getItem("lastfmUsername");
		user.sessionk = localStorage.getItem("lastfmSessionkey");
	} else {
		user.username = GM_getValue("lastfmUsername");
		user.sessionk = GM_getValue("lastfmSessionkey");
	}
	return user;
}
/**
 * Fills in the user's username on the Last FM form.
 */
function setUsernameSpan() {
	var usernameSpan = document.getElementById("lastfm-username");
	usernameSpan.innerHTML = getUserCredentials().username;
}
/**
 * Hides the 'login'-form, shows the 'reset login'-form
 */
function hideLoginShowReset() {
	var reset = document.getElementById("lastfm-options-resetlogin");
	var login = document.getElementById("lastfm-options-login");
	login.style.display = "none";
	reset.style.display = "block";
}
/**
 * Shows the 'login'-form, hides the 'reset login'-form
 */
function showLoginHideReset() {
	var reset = document.getElementById("lastfm-options-resetlogin");
	var login = document.getElementById("lastfm-options-login");
	reset.style.display = "none";
	login.style.display = "block";
}
//--Functions to edit the YouTube lay-out.
/**
 * Adds CSS style to the page used by this plug in.
 */
function addStyle() {
	var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	head.appendChild(style);
	
	style.setAttribute("type", "text/css");
	style.innerHTML = "#masthead-lastfm { background: #F6F6F6; border-top: 1px solid #CCC; border-bottom: 1px solid #CCC; min-width: 1016px; }\n" +
	"ul#lastfm-options li { height: 86px; float: left; margin: 8px 0px; padding: 0px 24px; border-right: 1px solid #CCCCCC; }\n" + 
	"ul#lastfm-options p { padding-left: 1px; }\n" +
	"#lastfm-moreoptions { margin-bottom: 6px; }\n" +
	"#lastfm-moreoptions-pop { width:432px; position: absolute; top: 0px; right: 0px; background:#FFF; border:2px solid #CCC; z-index: 500; padding:12px; font-size:13px; }\n" +
	".lastfm-moreoptions-table { border-collapse:collapse; }\n" + 
	".lastfm-moreoptions-table td { border-bottom:1px solid #EEE; padding:8px 6px 10px; }\n" +
	".lastfm-moreoptions-controls { text-align:center; margin-top:6px; }\n" +
	"#lastfm-masthead-dropdown { border-color: #999 transparent transparent; border-style: solid; border-width: 5px; cursor: pointer; display: inline-block; position: relative; top: 3px; }\n" +
	"#lastfm-masthead-dropdown.reversed { border-bottom-color: #999; border-top-color: transparent; top: -2px; }\n" +
	"#lastfm-button { float: right; margin-left: 12px; margin-top: 3px; }" +
	"#lastfm-button>button { padding: 0; }" +
	".lastfm-text-input, #lastfm-noscrobble { margin-top: 2px; }";
}
/**
 * Adds a button to the page to toggle the Last FM form.
 */
function addLastFmButton() {
	var buttonId = "lastfm-button";
	var lastFmImgCode = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3AwHFx43hJqMaQAAAoNJREFUSMftVrFOIlEUPRCSHd0xyya6mQITCwpKCgsKC0pKCk0sLCbRHzAhsdCCzpKSxgSMH2BBY2JBYUExBT9gMibADgJBBWVkZ5izxThvGQdXtzFbcJNbvHn3vTP3nnNvXqgJEJ9kYXyizcHmYP8OJmWz+H52hh/1OhRdx3K1im+FAiLx+MxLQpIEOZfDiqZB0XWs1GpY2NwMBjYBet5JpfirXqdnjmnSbjTEmpbFx2KRzUhEnGnJMsdXVyRJu9Hwnb9NJjl9vwDrbGzQGQ5Jkk+lEjvr6yLoZzTKvqrS1nWSdAFf9gb5fOBbL5PhY7HIdjweBGtJEid3dyTJvqr6AqbdUBQB6MWZ5+ckyU4q9eY5z8MAsLC9jXA0ilG5jFG5/CbBk3Yb/a0tAMDS4SEQicC+vnZ5zmTeV0gT4LhWI0l20+l3/246m76q8jaZpGOaJMlxrcZeNuvjNFBGrzQtSfoQ2G0y6V6uaWJtVipCGHajwUE+T0NR3gZ7vfk391Q3LSRjbY3DQkEIzRkOfVyGAWDS67lNpygfbtDR6SkAYHF39w+nNzd42N9He3UVo3IZIVnG0sGBn7OHoyMh+fcy8jIxYjHSsugMh2zJciCuJUmiV32ZjU5O4PR6WNzZmd35LxZJJLBcreJLOo1Js4nniwuEZBlf9/ZmxgKA024HJ0gvk3FVZVkcHB/TiMV8U6KvqqIX73M5NgF202nSsjjpdn3ctBMJjjWNJDnI54MTxCuRGE+WRVvXXfFYllCaB+T5fS4n9ibdLm3DEGuzUvGVGLNq3VdVPl9e0jYMdz7qOp9KpcCsE1XJZjnWNDqmScc0OdY0d8K86rfQ/MEzB/tvwH4DtEsGIhkSqcYAAAAASUVORK5CYII=";
	var htmlCode = "<div id=\"lastfm-button\">" + 
		"	<button role=\"button\" data-orientation=\"vertical\" class=\"yt-masthead-user-icon yt-uix-button yt-uix-button-default\" type=\"button\">" +
		"		<span class=\"yt-uix-button-content\">" +
		"			<span class=\"video-thumb ux-thumb yt-thumb-square-27 \">" +
		"				<img width=\"27\" alt=\"Thumbnail\" src=\"" + lastFmImgCode + "\">" +
		"			</span>" +
		"		</span>" +
		"	</button>" +
		"	<span id=\"lastfm-masthead-dropdown\">" +
		"	</span>" +
		"</div>";
	
	var mockDiv = document.createElement("div");
	mockDiv.innerHTML = htmlCode;
	
	var userBarContainer2 = document.getElementById("yt-masthead");
	var userInfoContainer = document.getElementById("yt-masthead-user");
	if(userInfoContainer == null) {
		//When the user is not logged in. 
		var signInContainer = document.getElementById("yt-masthead-signin");
		userBarContainer2.insertBefore(mockDiv.firstChild, signInContainer);
	} else {
		userBarContainer2.insertBefore(mockDiv.firstChild, userInfoContainer);
	}
	
	var button = document.getElementById(buttonId);
	button.addEventListener("click", toggleLastFmForm, false);
}
/**
 * Adds a division with the Last FM menu. 
 */
function addLastFmOptions() {
	var swapImgCode = "data:image/png;base64,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";
	var scrobbleSmurfImgCode = "data:image/png;base64,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%3D";
	var htmlCode = "<div id=\"masthead-lastfm\" style=\"display: none;\">\n" +
	"	<div id=\"lastfm-container\">\n" +
	"		<ul id=\"lastfm-options\">\n" +
	"		<li id=\"lastfm-options-resetlogin\">\n" +
	"			<h3>Authenticate</h3>\n" +
	"			<p>Logged in as: <br/><span id=\"lastfm-username\"></span></p>\n" +
	"			<button class=\"yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-hh-default\" id=\"lastfm-reset\" title=\"Log out from Last FM\"><span class=\"yt-uix-button-content\">Reset</span></button>\n" +
	"		</li>\n" +
	"		<li id=\"lastfm-options-login\">" +
	"			<h3>Authenticate</h3>\n" +
	"			<p>To log in this page <br/>will be closed.</p>" +
	"			<button class=\"yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-hh-default\" id=\"lastfm-login\" title=\"Log in to Last FM\"><span class=\"yt-uix-button-content\">Authenticate</span></button>" +
	"		</li>\n" +
	"		<li>\n" +
	"			<h3>Miscellaneous</h3>\n" +
	"			<button class=\"yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-hh-default\" id=\"lastfm-moreoptions\" title=\"More options menu\"><span class=\"yt-uix-button-content\">More options</span></button><br/>\n" +
	"			<button class=\"yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-hh-default\" id=\"lastfm-man-scrobble\" title=\"Scrobble now\"><span class=\"yt-uix-button-content\">Scrobble manual</span></button>\n" +
	"		</li>\n" +
	"		<li>\n" +
	"			<h3>Scrobbling</h3>\n" +
	"			<table>\n" +
	"				<tbody>\n" +
	"				<tr><td><p>Artist:</p></td><td><div class=\"masthead-search-terms-border lastfm-text-input\"><input type=\"text\" id=\"lastfm-artist\" style=\"border: none;\"></input></div></td><td rowspan=\"2\">" +
	"					<img src=\"" + swapImgCode + "\" id=\"lastfm-swap-songinfo\" width=\"20px\" height=\"41px\"></td></tr>\n" +
	"				<tr><td><p>Title:</p></td><td><div class=\"masthead-search-terms-border lastfm-text-input\"><input type=\"text\" id=\"lastfm-title\" style=\"border: none;\"></input></div></td></tr>\n" +
	"				<tr><td><p>Album:</p></td><td><div class=\"masthead-search-terms-border lastfm-text-input\"><input type=\"text\" id=\"lastfm-album\" style=\"border: none;\"></input></div></td></tr>\n" +
	"				</tbody>\n" +
	"			</table>\n" +
	"		</li>\n" +
	"		<li style=\"border-right: none;\">\n" +
	"			<h3>Status</h3>\n" +
	"			<div id=\"scrobble-counter\">\n" +
	"				<p><span id=\"scrobble-in\">Scrobble in:</span> <span id=\"scrobble-time\"></span></p>\n" +
	"				<button class=\"yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-hh-default\" id=\"lastfm-noscrobble\" title=\"Stops the automatic scrobble timer\"><span class=\"yt-uix-button-content\">Don't scrobble</span></button>\n" +
	"			</div>\n" +
	"			<div id=\"scrobble-message\" style=\"display: none;\">\n" +
	"				<p id=\"scrobble-msg\"></p>\n" + 
	"			</div>\n" +
	"		</li>\n" +
	"		</ul>\n" +
	"		<div style=\"clear: both;\"></div>\n" +
	"	</div>\n" +
	"</div>\n";
	var positionerContainer = document.getElementById("masthead-positioner");
	var accountContainer = document.getElementById("masthead-expanded");
	
	if(positionerContainer != null) {
		var mockDiv = document.createElement("div");
		mockDiv.innerHTML = htmlCode;
		
		if(accountContainer == null) {
			//When the user is not logged in. 
			var masthead = document.getElementById("yt-masthead-container");
			positionerContainer.insertBefore(mockDiv.firstChild, masthead.nextSibling);
		} else {
			positionerContainer.insertBefore(mockDiv.firstChild, accountContainer.nextSibling);
		}
	}
	
	window.onresize = fixLastFmBarMargin;
	fixLastFmBarMargin();
}
/**
 * Fixes the margin of the Last FM bar to be inline with other elements.
 */
function fixLastFmBarMargin() {
	var width = window.innerWidth;
	var lastfmBar = document.getElementById("masthead-lastfm");
	if(width < 1197) {
		lastfmBar.style.paddingLeft = "0";
	} else if(width < 1235) {
		lastfmBar.style.paddingLeft = "12px";
	} else {
		lastfmBar.style.paddingLeft = "32px";
	}
}
/**
 * Toggles the Last FM form added by this plug in. 
 * The stated is based on the Last FM button at the right top.
 */
function toggleLastFmForm() {
	var container = document.getElementById("masthead-lastfm");
	var pageContainer = document.getElementById("page-container");
	var buttonArrow = document.getElementById("lastfm-button").children[1];
	buttonArrow.classList.toggle("reversed");
	
	if(buttonArrow.classList.contains("reversed")) {
		container.style.display = "block";
		pageContainer.style.marginTop = "102px";
	} else {
		container.style.display = "none";
		pageContainer.style.marginTop = "";
	}
}
//--Last FM form button listeners and actions.
/**
 * Adds functionality to the YouTube account button.
 */
function activateResetLastFmFormVisbilityByAccountButton() {
	var accountButton = document.getElementById("yt-masthead-user");
	if(accountButton != null) {
		accountButton.addEventListener("click", resetLastFmFormVisbility, true);
	}
}
/**
 * Hides the Last.FM form when the user toggles the account button.
 * This is done because the account button tries to fix margins, 
 * but I already set a margin in the page container in a nasty way. 
 */
function resetLastFmFormVisbility() {
	var container = document.getElementById("masthead-lastfm");
	var pageContainer = document.getElementById("page-container");
	var buttonArrow = document.getElementById("lastfm-button").children[1];
	if(buttonArrow.classList.contains("reversed")) {
		buttonArrow.classList.toggle("reversed");
		container.style.display = "none";
		pageContainer.style.marginTop = "";
	}
}
/**
 * Add event listeners to all the menubuttons added by this plug-in.
 */
function activateLastFmButtons() {
	authenticateButton();
	resetAuthenicateButton();
	dontScrobbleButton();
	moreOptionsButton();
	manScrobbleButton();
	swapSongInfoButton();
}
/**
 * Add the event listener to the 'authenticate'-button.
 */
function authenticateButton() {
	var authButton = document.getElementById("lastfm-login");
	authButton.addEventListener("click", authenticate, false);
}
/**
 * Redirects the user to Last FM to authenticate. When they allow they will 
 * be directed back and an authentication token will be added to the URL.
 */
function authenticate() {
	var redirectURL = lastFmAuthenticationUrl + "?api_key=" + apiKey +"&cb=http://youtube.com";
	window.location.href = redirectURL;
}
/**
 * Add the event listener to the 'reset login'-button.
 */
function resetAuthenicateButton() {
	var resetButton = document.getElementById("lastfm-reset");
	resetButton.addEventListener("click", resetAuth, false);
}
/**
 * Resets the authentication. A user would have to authenticate again to scrobble.
 */
function resetAuth() {
	if(useHtml5LocalStorage) {
		localStorage.removeItem("lastfmUsername");
		localStorage.removeItem("lastfmSessionkey");
	} else {
		GM_deleteValue("lastfmUsername");
		GM_deleteValue("lastfmSessionkey");
	}
	showLoginHideReset();
}
/**
 * Adds the event listener to the 'do not scrobble'-button.
 */
function dontScrobbleButton() {
	var dontScrobbleButton = document.getElementById("lastfm-noscrobble");
	dontScrobbleButton.addEventListener("click", dontScrobble, false);
}
/**
 * Disables scrobbling for this time.
 */
function dontScrobble() {
	clearInterval(scrobbleTimer);
	
	var dontScrobbleButton = document.getElementById("lastfm-noscrobble");
	dontScrobbleButton.classList.add("yt-uix-button-toggled");
	
	menuAlert("Scrobbling cancelled");
}
/**
 * Adds the event listener to the 'options'-button.
 */ 
function moreOptionsButton() {
	var moreOptionsButton = document.getElementById("lastfm-moreoptions");
	moreOptionsButton.addEventListener("click", function(){ moreOptions(false); }, false);
}
/**
 * Shows or hides a pop-up containing some less common options for this plug-in.
 */
function moreOptions(hide) {
	var pop = document.getElementById("lastfm-moreoptions-pop");
	//This video will be null when the HTML5-player is used, which works fine with z-index.
	var video = document.getElementById("movie_player");
	
	if(hide) {
		pop.style.visibility = "hidden";
		if(video != null)
		{
			video.style.visibility = "visible";
		}
	} else {
		setRadioButtonChecked("lastfm-moreoptions-collapse", scrobbleAutoCollapse);
		setDefaultSelectValue("lastfm-moreoptions-percentage", scrobblePercentage);
		document.getElementById("lastfm-moreoptions-filter").value = scrobbleFilter;
		setRadioButtonChecked("lastfm-moreoptions-scrobble", scrobbleEnabled);
		
		if(video != null)
		{
			video.style.visibility = "hidden";
		}
		pop.style.visibility = "visible";
	}
}
/**
 * Adds the event listener to the 'manual scrobble'-button.
 */ 
function manScrobbleButton() {
	var manScrobbButton = document.getElementById("lastfm-man-scrobble");
	manScrobbButton.addEventListener("click", scrobbleManual, false);
}
/**
 * Disables scrobbling for this time.
 */
function scrobbleManual() {
	noScrobble = true;
	scrobbleSong();
	
	var manScrobbButton = document.getElementById("lastfm-man-scrobble");
	manScrobbButton.removeEventListener('click', scrobbleManual, false);
	manScrobbButton.classList.add("yt-uix-button-toggled");
}
/**
 * Adds the event listener to the two arrows, the 'swap song info'-button.
 */
function swapSongInfoButton() {
	var swapSongButton = document.getElementById("lastfm-swap-songinfo");
	swapSongButton.addEventListener("click", swapSongInfo, false);
}
/**
 * Swaps the artist field's value with the title field's value.
 */
function swapSongInfo() {
	var artistInput = document.getElementById("lastfm-artist");
	var titleInput = document.getElementById("lastfm-title");
	
	var oldArtist = artistInput.value;
	var oldTitle = titleInput.value;
	
	artistInput.value = oldTitle;
	titleInput.value = oldArtist;
}
//--Functions to for song information.
/**
 * Fills the 'song'-form with the passed song.
 */
function fillSongInformation(song) {
	var artistInput = document.getElementById("lastfm-artist");
	var titleInput = document.getElementById("lastfm-title");
	
	if(song.artist != null) {
		artistInput.value = song.artist;
	}
	if(song.title != null) {
		titleInput.value = song.title;
	}
}
/**
 * Gets song information from the currently played YouTube video using the iTunes metadata.
 */
function getSongInformation() {
	var song = new Object();
	song.artist = tryGetArtistMeta();
	song.title = tryGetTitleMeta();
	if(song.artist && song.title) {
		iTunesArtistAndTitleFound = true;
	}
	return song;	
}
/**
 * Gets song artist from the metadata in the video description.
 */
function tryGetArtistMeta() {
	var xSongArtistPath = "//ul[@id='watch-description-extra-info']/li[2]/span[@class='metadata-info']/a";
	try { 
		var artistNodes = document.evaluate(xSongArtistPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		var artist = artistNodes.singleNodeValue.firstChild.nodeValue;
	} catch (e) {
	}
	return artist;
}
/**
 * Gets song title from the metadata in the video description.
 */
function tryGetTitleMeta() {
	var title;
	var xCountPath = "count(//ul[@id='watch-description-extra-info']/li)";
	var infoNodeCount = document.evaluate(xCountPath, document, null, XPathResult.NUMBER_TYPE, null).numberValue;
	var titleInfoNodeNumber = infoNodeCount-1;
	var xSongTitlePath = "//ul[@id='watch-description-extra-info']/li[1]/span[@class='metadata-info']/span['metadata-info-title']";
	try {
		var songNodes = document.evaluate(xSongTitlePath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		var rawTitle = songNodes.singleNodeValue.firstChild.nodeValue;	//rawSong still contains 'buy on' text.
		rawTitle = removeBreaks(rawTitle);
		title = stringBetweenChars(rawTitle, "\"");
		if(typeof(title) === "undefined") {
			title = stringBetweenChars(rawTitle, "'");
		}
	} catch (e) {
	}
	return title;
}
/**
 * Tries to strip a song's information from the passed video title. 
 * First looks for quoted text which will be used as song title. 
 * The rest of the title will then be used as artist. 
 * If it fails it split the title between a dash and uses the first part as artist. 
 * The second part will be used as title. 
 */
function tryStripSongFromTitle(title) {
	var song = new Object();
	if(countOccurencesInString(title, "\"") >= 2) {
		song = getSongFromQuotedTitle(title, "\"");
	} else if(countOccurencesInString(title, "'") >= 2) {
		song = getSongFromQuotedTitle(title, "'");
	} else if(stringContainsChar(title, "-")) {
		var split = title.split("-");
		song.artist = trim(split[0]);
		song.title = trim(split[1]);
	}
	return song;
}
/**
 * Gets a song from a video title that contains quotes.
 */
function getSongFromQuotedTitle(vidTitle, quoteString) {
	var song = new Object();
	song.title = stringBetweenChars(vidTitle, quoteString);
	var regex = new RegExp(quoteString + song.title + quoteString);
	song.artist = vidTitle.replace(regex, "");
	return song;
}
//--JavaScript common utilization functions.
/**
 * Removes breaks from a text.
 */
function removeBreaks(text) {
	return text.replace(/(\n|\r)/gm, "");
}
/**
 * Checks whether a text contains a character.
 */
function stringContainsChar(text, charac) {
	for(var i = 0; i < text.length; i++) {
		if(text[i] == charac) {
			return true;
		}
	}
	return false;
}
/**
 * Counts the occurences of a certain object in a text.
 */
function countOccurencesInString(text, toMatch) {
	var regex = new RegExp(toMatch, "g");
	var matches = text.match(regex);
	if(matches == null) {
		return 0;
	}
	return matches.length;
}
/**
 * Finds a text between two characters.
 */
function stringBetweenChars(text, charac) {
	var part, results = [];
	var regex = new RegExp(charac + "([^" + charac +"]+)", "g");
	while(part = regex.exec(text)) {
		results.push(part[1]);
	}
	results = results.splice(0, 1);
	if(typeof(results) === "string") {
		return results;
	} else {
		return results[0];
	}
}
/**
 * Trims a text from spaces.
 */
function trim(text) {
	return text.replace(/^\s*/, "").replace(/\s*$/, "");
}
/**
 * Gets the selected value from a radio button group.
 */
function getSelectedRadioButton(name) {
	var radioButtons = document.getElementsByName(name);
	for(x in radioButtons) {
		if(radioButtons[x].checked) {
			return radioButtons[x].value;
		}
	}
	return null;
}
/**
 * Sets all values from a radio button group to unchecked except the passed value's radio button.
 */
function setRadioButtonChecked(name, value) {
	var radioButtons = document.getElementsByName(name);
	for(x in radioButtons) {
		if(radioButtons[x].value == value) {
			radioButtons[x].checked = true;
		} else {
			radioButtons[x].checked = false;
		}
	}
}
/**
 * Sets a select input to a default value.
 */
function setDefaultSelectValue(name, value) {
	var selectInput = document.getElementsByName(name)[0];
	var options = selectInput.getElementsByTagName("option");
	for(var i = 0; i < options.length; i++) {
		if(options[i].value == value) {
			options[i].setAttribute("selected", "");
		} else {
			options[i].removeAttribute("selected");
		}
	}
	
	var parent = selectInput.parentNode;
	parent.removeChild(selectInput);
	parent.appendChild(selectInput);
}

start();