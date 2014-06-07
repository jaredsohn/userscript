// ==UserScript==
// @id             8a83f914-a27c-4c40-b3dc-b7dad7c395cd@Takato
// @name           Youtube - Better Channel Page
// @namespace      Takato
// @author         Takato
// @copyright      2011+, Takato (http://userscripts.org/users/82358)
// @licence        Summary: Free for personal non-commercial use; http://userscripts.org/scripts/show/112521
// @description    Makes Youtube's "Channel" pages (user profiles) better.
// @icon           http://i.imgur.com/T7q6D.png http://i.imgur.com/Kh2Zj.png
// @icon64         http://i.imgur.com/Kh2Zj.png
// @version        2013.04.14
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require        https://userscripts.org/scripts/version/113580/416797.user.js
// @updateURL      https://userscripts.org/scripts/source/112521.meta.js
// @website        http://userscripts.org/scripts/show/112521
// @include        http://www.youtube.com/user/*
// @include        https://www.youtube.com/user/*
// @include        http://www.youtube.com/channel/*
// @include        https://www.youtube.com/channel/*
// @include        http://www.youtube.com/artist/*
// @include        https://www.youtube.com/artist/*
// @include        http://www.youtube.com/playlist?*
// @include        https://www.youtube.com/playlist?*
// ==/UserScript==
version = "2013.04.14";


// You can set your settings on the settings screen on Youtube.
// If your browser doesn't support GM_ functions, you'll need an extension to change settings.
//    Firefox users: You'll already be using a GM_ supporting extension. 
//    Chrome users: Tampermonkey - https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo
//    Other browser users: Greasemonkey Emulation Script - http://userscripts.org/scripts/show/105153
// Uninstall Better Channel Page (BCP), then install the extension, then re-install BCP using that extension. 
// For more information and support, visit http://userscripts.org/scripts/show/112521


// Debug Mode - NOTE: I need to debug debug mode. >_>
// To enable Debug Mode, add "&debug=1" to the page address ( eg http://youtube.com/user/smosh/&debug=1 )
// To disable Debug Mode, just go to a new page, or remove "&debug=1"


var settings = new Array();

var head=document.getElementsByTagName('head')[0];
if(!head)
	return;

// Set up debug mode
var debugOn = false;
var debugMessages = "";
if (checkForDebugMode()) {
	var debugOn = true;
	debugModeStart();
	debug("Starting debug log");
	debug("BCP version: " + version);
	debug("HTML lang: " + document.getElementsByTagName("html")[0].getAttribute("lang"));
	debug("Body class: " + document.getElementsByTagName('body')[0].getAttribute("class"));
	debug("Direction: " + document.getElementsByTagName("html")[0].getAttribute("dir"));
	debug("Page class: " + document.getElementById("page").getAttribute("class"));
}


// Stop if already running conflicting script
ytPageBody=document.getElementsByTagName('body')[0];
if (ytPageBody.getAttribute("class").indexOf("bcpScript") > -1) {
	//alert("\"Better Channel Page\" (BCP) has detected that you have multiple copies of the script running. Please remove one of the copies, and then make sure the remaining one is up-to-date. ");
	return;
} else if (ytPageBody.getAttribute("class").indexOf("bwpScript") > -1) {
	alert("\"Better Channel Page\" (BCP) has detected a script that it wasn't expecting on this page. This probably means your copy of BCP is out-of-date. Please check for an update, or report this as a bug if there is no update.");
	return;
} else if (window.location.toString().indexOf("action_edit=") > -1) { // Playlist editing
	return;
} else if (ytPageBody.classList.contains("ytg-old-clearfix")) { // Old channels/playlists
	masthead = document.getElementById("yt-masthead-content");
	jError = document.createElement("div");
	jError.setAttribute("style", "display:inline-block; width:160px; float:right; font-size:11px; border:1px solid grey; padding:6px; margin-left:4px; cursor:pointer; border-radius:4px;");
	jError.innerHTML = "'Better Channel Page' has stopped running. Click for info.";
	masthead.insertBefore(jError, masthead.children[0]);
	jError.addEventListener("click", function() { alert("'Better Channel Page' now supports the new style channels and playlists, but has had to remove support for old style channels/playlists (like the one you're viewing now).\n\nOver the next few weeks/months all channels and playlists will be updated to the new style and will all be supported by Better Channel Page."); }, true);
	return;
} else {
	ytPageBody.setAttribute("class", ytPageBody.getAttribute("class") + " bcpScript");
}



// Script crash notification
crashNotice = document.createElement("div");
crashNotice.setAttribute("id","bcpCrash");
crashNotice.setAttribute("style","font-size:12px !important; border:1px solid black !important; padding:2px !important; margin:2px !important; font-weight:bold !important;");
crashNotice.innerHTML = "'Better Channel Page' has crashed for some reason. Try refresh the page, and if it still happens you might want to try 'debug mode' and <a href='http://userscripts.org/scripts/discuss/112521' target='_window'>report</a> the error to the script developer. <a class='debugLink' href='#'>Click here</a> to load debug mode (page will reload). If you are already running debug mode, the debug log should be displayed above.";
crashNotice.getElementsByClassName("debugLink")[0].setAttribute("href", window.location + "&debug=1");
var ytpage = document.getElementById("page");
ytpage.parentNode.insertBefore(crashNotice, ytpage);

// Check browser support for GM_getValue() and GM_setValue()
debug("Checking GM support");
supportGM = false;
try {
	GM_setValue("gmSupport", true);
	doesIt = GM_getValue("gmSupport");
	if (doesIt) { debug("Supports GM");
		supportGM = true;
	} else { debug("Doesn't support GM");
		supportGM = false;
	}
} catch (ex) { debug("Doesn't support GM, exception caught");
	supportGM = false;
}
debug("Finished GM check");

// Check that the browser correctly downloaded the @require script
atRequireBroken = false;
if (supportGM) {
	debug("Checking @require worked");
	try {
		if (Config) { debug("@require worked");
			atRequireBroken = false;
		} else { debug("@require didn't work but the check didn't issue an exception.");
			atRequireBroken = true;
		}
	} catch (ex) { debug("@require didn't work, exception caught");
		atRequireBroken = true;
	}
	debug("Finished @require check");

	// Fallback to non GM mode if @require didn't work
	if (atRequireBroken) {
		supportGM = false;
	}
}


defineSettings();
// If browser supports GM functions, import settings, and add to GM menu
if (supportGM) { debug("Going to import settings and add to GM menu");
	fetchCurrentSettings();
	debug("Finished import and GM menu");
} else { // No GM support, use the previously defined values
	debug("Set settings with the manual settings, due to no GM support.");
	for (i in settings) {
		settings[i].val = settings[i].defaultVal;
	}
	debug("Finished setting settings.");
}

debug("Constructing settings screen");
// Construct a settings screen
if (!supportGM) { // Settings for browsers without GM function support
	var settingsScreen = document.createElement("div");
	settingsScreen.setAttribute("id", "bcpSettings");
	var settingsShadow = document.createElement("div");
	settingsShadow.setAttribute("id", "bcpShadow");
	settingsScreen.innerHTML="<h1>\"Better Channel Page\" Script Settings</h1> <p>Version <B>"+version+"</B> - Check for updates on <a href=\"http://userscripts.org/scripts/show/112521\" target=\"_blank\">this page</a> (new tab)</p> <br/> <p>This script uses Greasemonkey \"GM_\" functions to save your settings. Unfortunately your browser doesn't support those functions by default. If you would like to enjoy the benefits of this script's settings, you will have to follow these steps:</p> <ol> <li>Chrome users install <a href=\"https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo\">Tampermonkey</a>. Other browser users install <a href=\"http://userscripts.org/scripts/show/105153\">Greasemonkey Emulation Script</a>. (links open in new tab)</li> <li>Uninstall this script</li> <li>Re-install this script using that extension.</li>  </ol> <p>For more information and support, visit <a href=\"http://userscripts.org/scripts/show/112521\" target=\"_blank\">this page</a>. (Link opens in new tab/window)</p>";
	if (atRequireBroken) { // Alternative for users who can use GM functions but the @require failed
		settingsScreen.innerHTML="<h1>\"Better Channel Page\" Script Settings</h1> <p>Version <B>"+version+"</B> - Check for updates on <a href=\"http://userscripts.org/scripts/show/112521\" target=\"_blank\">this page</a> (new tab)</p> <br/> <p>Better Channel Page (BCP) was unable to create the settings screen. This is because an \"@require\" failed. The most likely reason for this is that you've just updated BCP - simply refresh the page and the update should complete itself. <br/> If that doesn't fix it, then it probably means your version of Greasemonkey is out-of-date. <br/> Please try updating your version of Greasemonkey: (links open in new tab)</p> <p> - Latest version of <a href=\"https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/\" target=\"_blank\">Greasemonkey</a> at Mozilla Addons (Mozilla Firefox) <br/> - Latest version of <a href=\"https://addons.mozilla.org/en-US/firefox/addon/scriptish/\" target=\"_blank\">Scriptish</a> at Mozilla Addons (Mozilla Firefox) <br/> - Latest version of <a href=\"https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo\" target=\"_blank\">Tampermonkey</a> at the Chrome Webstore (Google Chrome) </p> <p>After updating to the latest version, try re-installing BCP.</p> <p>If you continue to receive this message, or for more information and support, visit <a href=\"http://userscripts.org/scripts/show/112521\" target=\"_blank\">this page</a>. (Link opens in new tab/window)</p>";
	}
	debug("Made non-GM setting screen");
	var ytpage = document.getElementById("page");
	ytpage.parentNode.insertBefore(settingsShadow, ytpage);
	ytpage.parentNode.insertBefore(settingsScreen, ytpage);
	hideSettings();
	
	// Event listeners for settings screen
	debug("Adding event listeners for settings screen");
	settingsShadow.addEventListener("click", hideSettings, true);
	
} else { // Settings for browsers that support GM functions
	setUpConfig();
	debug("Made GM setting screen");
}


// Is this a playlist?
var isPlaylist = false;
if (document.getElementById("page").classList.contains("playlist")) {
	isPlaylist = true;
}


// Button to bring up settings
debug("Making settings button");
var settingsButton;
var channelMenu;
settingsButton = document.createElement("li");
if (!isPlaylist) {
	channelMenu = document.getElementById("channel-navigation-menu");
} else {
	channelMenu = document.getElementById("channel-subheader");
}
settingsButton.setAttribute("id", "bcpSettingsButton");
settingsButton.setAttribute("class", "yt-uix-tooltip");
settingsTooltip = "\"Better Channel Page\" Script Settings";
settingsButton.setAttribute("title", settingsTooltip);
settingsButton.innerHTML = "<a class='yt-uix-button yt-uix-button-epic-nav-item'><img class='epic-nav-item-heading-icon' src='http://i.imgur.com/Pzw16.png'/></a>";
channelMenu.appendChild(settingsButton);

settingsButton.addEventListener("click", displaySettings, true);
debug("Settings button done");




// Determine what type of page we are on

if (!isPlaylist) {

	// Find the root path
	rootPath = "";
	count = 0;
	headLinks = document.getElementsByTagName("head")[0].getElementsByTagName("link");
	while (count < headLinks.length) {
		if (headLinks[count].getAttribute("rel") == "canonical") {
			rootPath = headLinks[count].getAttribute("href");
		}
		count++;
	}

	// Remove "http://www.youtube.com" if it is in the root path
	if (rootPath.indexOf("youtube.com") > -1) {
		rootPath = rootPath.replace("http://www.youtube.com", "");
		rootPath = rootPath.replace("https://www.youtube.com", "");
		rootPath = rootPath.replace("//www.youtube.com", "");
	}

	// "/user/" or "/channel/" or "/artist/" ?
	rootPrefix = "/user/";
	if (rootPath.indexOf("/channel/") == 0) {
		rootPrefix = "/channel/";
	} else if (rootPath.indexOf("/artist/") == 0) {
		rootPrefix = "/artist/";
	}

	rootPathA = rootPath.substring(rootPrefix.length);
	rootPathInPage = rootPrefix + rootPathA;
	
	while (rootPathA.indexOf("/") > -1) {
		rootPathA = rootPathA.substring(0, rootPathA.lastIndexOf("/"));
	}
	rootPath = rootPrefix + rootPathA;
	
		
	// If page URL doesn't contain the rootPath, go to real page
	if (document.location.toString().indexOf(rootPath) == -1) {
		insertLoadingCSS();
		location.replace("//www.youtube.com" + rootPathInPage);
	}
	
	

	// Figure out current page location
	pageLocation = document.location.toString();
	if (pageLocation.indexOf("?") > -1) {
		pageLocation = pageLocation.substring(0, pageLocation.indexOf("?"));
	}
	if (pageLocation.indexOf("#") > -1) {
		pageLocation = pageLocation.substring(0, pageLocation.indexOf("#"));
	}
	pageLocation = pageLocation;
	pageLocation = pageLocation.substring(pageLocation.indexOf(rootPath));
	pageLocation = pageLocation.replace(rootPath, "");

	rootPath = rootPath.substring(rootPath.indexOf(rootPrefix), rootPath.length);


	// Determine page type
	//    0 = Not one of the below pages
	//    1 = /user/example = Initial page
	//    2 = /user/example/ = Initial page
	//    3 = /user/example/featured = Featured
	//    4 = /user/example/videos = Video page
	//    5 = /user/example/feed = Feed
	//    6 = /user/example/search = Search
	//    7 = /playlist = Playlist (see next 'else')
	//    8 = /user/example/about = About
	//    9 = /user/example/discussion = Discussion
	pageType = 0;
	if (pageLocation == "") { // 1 = /user/example
		pageType = 1;
	} else if (pageLocation == "/") { // 2 = /user/example/
		pageType = 2;
	} else if (pageLocation == "/featured") { // 3 = /user/example/featured
		pageType = 3;
	} else if (pageLocation == "/videos") { // 4 = /user/example/videos
		pageType = 4;
	} else if (pageLocation == "/feed") { // 5 = /user/example/feed
		pageType = 5;
	} else if (pageLocation == "/search") { // 6 = /user/example/search
		pageType = 6;
	} else if (pageLocation == "/about") { // 8 = /user/example/about
		pageType = 8;
	} else if (pageLocation == "/discussion") { // 8 = /user/example/discussion
		pageType = 9;
	} else {
		pageType = 0;
	}
	
} else {
	// 7 = Playlist
	pageType = 7;
}


// Go to video page if currently on main page (and main is not requested) 
if ((pageType == 1) | (pageType == 2)) {
	if (setting("optionRedirectToVids").val == true) {
		insertLoadingCSS();
		location.replace("http://www.youtube.com" + rootPath + "/videos");
	}
}

// Video page and Search results page
if ((pageType == 4) || (pageType == 6)) {
	whatUser = rootPath.substring(6, rootPath.length);

	/* if (document.getElementById("channels-browse-header").getElementsByTagName("ul")[0].children.length == 0) {
		// Channel has no videos or playlists or likes
		// Swap to "Feed" instead
		if (setting("optionNoVidsGoFeed").val == true) {
			loading = document.createElement("div");
			loading.setAttribute("id", "bcpLoading");
			loading.setAttribute("class", "ytg-wide");
			loading.innerHTML = "<img src='http://i.imgur.com/nTmSZ.gif'/>";
			document.getElementById("branded-page-body").appendChild(loading);
			insertLoadingCSS();
			location.replace("http://www.youtube.com" + rootPath + "/feed");
		} 
	} else { */
	
		// Video thumbnail preload
		/*vids = document.getElementsByClassName("video-thumb");
		count = 0;
		while (count < vids.length) {
			thisImg = vids[count].getElementsByTagName("img")[0];
			thisImgThumb = thisImg.getAttribute("data-thumb");
			if (thisImgThumb != undefined) {
				thisImg.setAttribute("src", thisImgThumb);
			}
			count++;
		}*/
		
		cssString = "";
		cssString = ".channels-browse-content-grid .channels-content-item {width:201px !important; margin:0px 5px 10px 0px !important;}  .channels-browse-content-grid .content-item-detail {height:auto !important; color:#444444 !important;}  .channels-browse-content-grid .content-item-detail .content-item-title {font-weight:bold !important; color:#323232 !important; margin-top:3px !important; width:100% !important; line-height:15px !important; font-size:13px !important; white-space:normal !important; height:auto !important; max-height:30px !important; text-overflow:ellipsis !important; overflow:hidden !important;}  .channels-browse-content-grid .content-item-detail .content-item-metadata {line-height:normal !important;}  .channels-browse-content-grid .content-item-detail .content-item-time-created {display:block !important;}    .channels-browse-content-grid .content-item-detail .metadata-separator {display:none !important;}      .channels-browse-content-grid .context-data-item {margin-right:7px !important;}  .channels-browse-content-grid .channel-video-thumb-container .ux-thumb-wrap {display:inline !important;}  .channels-browse-content-grid .channel-video-thumb-container .video-thumb {border:1px solid #323232 !important; display:inline-block !important; border-radius:3px !important;}  .channels-browse-content-grid .channel-video-thumb-container .video-time {color:white !important; border-radius:2px !important;}    .channels-browse-content-grid .channels-content-item.vid-unavailable {opacity:0.5 !important;}";
		
	/*}*/
	
} else { // Not video page
	debug("Constructing CSS string");
	cssString = " ";
}



if (pageType == 7) { // Playlist
	annotatedVids = document.getElementById("gh-activityfeed").getElementsByClassName("annotated");
	count = 0;
	while (count < annotatedVids.length) {
		anno = annotatedVids[count].getElementsByClassName("annotation-text")[0];
		if (!anno.classList.contains("yt-uix-tooltip")) {
			anno.setAttribute("title", anno.innerHTML);
			anno.setAttribute("data-tooltip-text", anno.innerHTML);
			anno.classList.add("yt-uix-tooltip");
		}
		count++;
	}
	toggleButton = document.createElement("button");
	toggleButton.setAttribute("class", "yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-playlist-action");
	toggleButton.setAttribute("role", "button");
	toggleTitle = "Toggle playlist view mode";
	toggleButton.setAttribute("title", toggleTitle);
	toggleButton.setAttribute("data-tooltip-text", toggleTitle);
	toggleButton.setAttribute("type", "button");
	toggleButton.innerHTML = "<span class='yt-uix-button-content'>Toggle View</span>";
	document.getElementsByClassName("playlist-actions")[0].appendChild(toggleButton);
	toggleButton.addEventListener("click", togglePlaylistView, true);
	
	if (setting("optionPlaylistStyle").val == true) {
		togglePlaylistView();
	}
	
	vids = document.getElementsByClassName("playlist-video-item");
	count = 0;
	while (count < vids.length) {
		thisImg = vids[count].getElementsByClassName("thumb-container")[0].getElementsByTagName("img")[0];
		
		// Set image
		thisImgThumb = thisImg.getAttribute("data-thumb");
		if (thisImgThumb == undefined) {
			thisImgThumb = thisImg.getAttribute("src");
		}
		thisImgThumb = thisImgThumb.replace("/default", "/mqdefault");
		thisImg.setAttribute("data-thumb", thisImgThumb);
		thisImg.setAttribute("src", thisImgThumb);
		
		// Image size
		thisImg.setAttribute("width", "194");
		vids[count].getElementsByClassName("yt-thumb-106")[0].classList.add("yt-thumb-194");
		vids[count].getElementsByClassName("yt-thumb-106")[0].classList.remove("yt-thumb-106");
		
		count++;
	}
	
	// Video title tooltip
	/*vids = document.getElementsByClassName("video-title-container");
	count = 0;
	while (count < vids.length) {
		var thisTitle = vids[count].getElementsByTagName("span")[0];
		var title = thisTitle.innerHTML;
		thisTitle.setAttribute("title", title);
		thisTitle.setAttribute("data-tooltip-text", title);
		thisTitle.classList.add("yt-uix-tooltip");
		count++;
	}*/
	
	
	cssString = "";
	cssString = "#gh-activityfeed.bcp-playlist ol {padding-left:20px !important; padding-right:5px !important;}    .bcp-playlist .playlist-video-item {width:201px !important; margin:0px 5px 10px 0px !important; padding:0px !important; height:185px !important;  border:0px !important; background:none !important; float:left !important; position:relative !important;}  .bcp-playlist .playlist-video-item .yt-uix-tile {display:inline !important; overflow:visible !important; padding:0px !important;}  .bcp-playlist .playlist-video-item .video-index {display:none !important;}    .bcp-playlist .playlist-video-item .thumb-container {margin:0px !important;}    .bcp-playlist .playlist-video-item .thumb-container .video-thumb {border:1px solid #323232 !important; display:inline-block !important; border-radius:3px !important; background:white !important; }    .bcp-playlist .playlist-video-item .playlist-video-item-base-content {position:relative !important;}    .bcp-playlist .playlist-video-item .video-info {display:inline !important; margin:0px !important; overflow:hidden !important; }  .bcp-playlist .playlist-video-item .video-buttons {display:none !important;}  .bcp-playlist .playlist-video-item .video-description {display:none !important;}  .bcp-playlist .playlist-video-item .video-overview {margin:0px !important; overflow:visible !important; display:inline-block !important;}  .bcp-playlist .playlist-video-item .video-title-container a{color:#323232 !important;}  .bcp-playlist .playlist-video-item .video-title, .playlist-video-item .video-details {display:block !important; margin:0px !important; height:auto !important;}  .bcp-playlist .playlist-video-item .video-title {font-weight:bold !important; color:#323232 !important; margin-top:3px !important; width:100% !important; line-height:15px !important; font-size:13px !important; white-space:normal !important; height:auto !important; max-height:30px !important; text-overflow:ellipsis !important; overflow:hidden !important;}  .bcp-playlist .playlist-video-item .video-details {display:block !important; overflow:hidden !important; margin-top:3px !important; line-height:normal !important;}  .bcp-playlist .playlist-video-item .video-owner, .bcp-playlist .playlist-video-item .video-view-count {display:block !important; color:#444444 !important; line-height:normal !important;}    .bcp-playlist .playlist-video-item.annotated .video-annotation {position:absolute; top:2px; left:2px; margin:0px!important; padding:0px !important;}  .bcp-playlist .playlist-video-item.annotated .video-annotation .video-thumb {background:url(http://s.ytimg.com/yt/imgbin/www-refresh.png) 0 -79px !important; width:12px !important; height:12px !important;}  .bcp-playlist .playlist-video-item.annotated .video-annotation .yt-thumb-clip {display:none;}  .bcp-playlist .playlist-video-item.annotated .video-annotation .annotation-text {border:0px !important; width:12px; height:12px; float:left; padding:0px !important; font-size:0px !important; position:absolute;}";
}



cssString += "#bcpCrash {display:none !important;}    #bcpSettingsButton a {}  #bcpSettingsButton img {width:0px !important; height:0px !important; padding-left:13px !important; padding-bottom:12px !important; background:url(http://i.imgur.com/Pzw16.png) 13px 0px !important;}  #bcpSettingsButton:hover img {background-position:0px 0px !important}    #bcpShadow {position:fixed !important; background:rgba(0, 0, 0, 0.5) !important; width:100% !important; height:100% !important; top:0 !important; left:0 !important; z-index:9998 !important;}  #bcpSettings {position:fixed !important; width:800px !important; height:auto !important; z-index:99999 !important; background:#EEEEEE !important; margin:16px auto !important; overflow:auto !important; top:0px !important; left:0 !important; right:0 !important; bottom:0 !important; border:4px solid #CCCCCC !important;border-radius:8px !important;}  #bcpSettings h1 {text-align:center !important; margin:16px 0px 16px 0px !important;}  #bcpSettings p {margin:8px 16px 8px 16px !important;}  #bcpSettings li {list-style:decimal inside !important; margin-left:20px !important;}    #ConfigBody tr[settingstate*='disabled'], #ConfigBody tr[settingstate*='disabled'] td {text-decoration:line-through !important; color:#cccccc !important;}  #ConfigBody #vidPlayerImgDark, #ConfigBody #vidPlayerImgLight {float:right !important;}";

var head=document.getElementsByTagName('head')[0];
if(!head)
	return;
var style=document.createElement('style');
style.setAttribute('type','text/css');
style.appendChild(document.createTextNode(cssString));
head.appendChild(style);
debug("CSS is now in page");



function togglePlaylistView() {
	document.getElementById("gh-activityfeed").classList.toggle("bcp-playlist");
}


function insertLoadingCSS() {
	loading = document.createElement("div");
	loading.setAttribute("id", "bcpLoading");
	loading.setAttribute("class", "ytg-wide");
	loading.innerHTML = "<img src='http://i.imgur.com/nTmSZ.gif'/>";
	document.getElementsByClassName("branded-page-v2-primary-col")[0].appendChild(loading);
	
	cssString = ".branded-page-v2-primary-col {position:relative !important;}     #bcpLoading {position:absolute !important; background:rgba(255,255,255,0.4) !important; height:100% !important; width:100% !important; top:0px !important; z-index:5 !important;}    #bcpLoading img {margin:0px 0 0 20px !important; background:rgba(255,255,255,0.8) !important; padding:34px !important;}    embed {display:none !important;}  #bcpSettingsButton, #bcpShadow, #bcpSettings {display:none !important;}";
	var head=document.getElementsByTagName('head')[0];
	if(!head)
		return;
	var style=document.createElement('style');
	style.setAttribute('type','text/css');
	style.appendChild(document.createTextNode(cssString));
	head.appendChild(style);
}



function issueRequest(type, user, start) {
	var apiResponse;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://gdata.youtube.com/feeds/api/users/" + user + "/" + type + "?v=2&alt=jsonc&max-results=30&start-index=" + start, true);
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4) {
			apiResponse = eval('(' + xmlhttp.responseText + ')');
			limit = 30;
			if (apiResponse["data"]["totalItems"]-apiResponse["data"]["startIndex"]+1 < limit){
				limit = apiResponse["data"]["totalItems"]-apiResponse["data"]["startIndex"]+1;
			} 
			count = 0;
			while (count < limit) {
				handleVideo(apiResponse["data"]["items"][count], count, type);
				count++;
			}
			
		}
	}
	xmlhttp.send(null);
} 



function handleVideo(vidData, count, type) {
	thisVid = document.createElement("li");
	
	// Is the video restricted or otherwise unavailable?
	unavailable = false;
	var status;
	reasonCode = "";
	reasonShortText = "";
	reasonLongText = ""; 
	
	try {
		status = vidData["status"]["value"];
		if ((status != undefined) && (status != null)) {
			if (status == "processing") { // Processing
				unavailable = true;
				reasonCode = "processing";
				reasonShortText = "Processing...";
				reasonLongText = "Youtube is processing this video. Try again later.";
			} else if (status == "deleted") { // Deleted
				unavailable = true;
				reasonCode = "deleted";
				reasonShortText = "Deleted";
				reasonLongText = "This video has been deleted";
			} else if (status == "failed") { // Failed
				unavailable = true;
				reasonCode = vidData["status"]["reason"];
				reasonShortText = "Video Error";
				reasonLongText = "This video was not uploaded correctly";
			} else if (status == "rejected") { // Rejected
				unavailable = true;
				reasonCode = vidData["status"]["reason"];
				reasonShortText = "Unavailable";
				reasonLongText = "This video is unavailable";
				if (reasonCode == "copyright") {
					reasonLongText = "This video commits a copyright infringement"
				} else if (reasonCode == "blocked") {
					reasonLongText = "This video has been blocked by the content owner"
				} else if ((reasonCode == "inappropriate")|(reasonCode == "termsOfUse")|(reasonCode == "suspended")) {
					reasonLongText = "This video either containes inappropriate content, violated Youtube's Terms of Use, or the uploader's account was suspended.";
				} else if (reasonCode == "duplicate") {
					reasonLongText = "This video is a duplicate of another video";
				}
			} else if (status == "restricted") { // Restricted
				reasonCode = vidData["status"]["reason"];
				if (reasonCode != "limitedSyndication") {
					unavailable = true;
					if (reasonCode == "requesterRegion") {
						reasonShortText = "Region Restricted";
						reasonLongText = "This video is unavailable in your region";
					} else if (reasonCode = "private") {
						reasonShortText = "Private";
						reasonLongText = "This video has been marked 'private' by the video owner";
					}
				}
			}
		}
	} catch (ex) {
	} 

	// Video metadata
	
	vidID = vidData["id"];
	vidTitle = vidData["title"];
	vidThumb = "//i.ytimg.com/vi/"+vidID+"/mqdefault.jpg";
	
	
	if (!unavailable) { // Extra bits for available videos
		try {	
			vidDate = formatDate(vidData["uploaded"]);
			vidLength = formatLength(vidData["duration"]);
			vidViews = formatViews(vidData["viewCount"]);
		} catch (ex) {
			unavailable = true;
			reasonCode = "scriptError";
			reasonShortText = "Script Error";
			reasonLongText = "'Better Channel Page' had an error when trying to receive information about this video.";
		} 
	}
	
	if (unavailable) { // Stuff for unavailable videos
		vidDate = "";
		vidLength = "";
		vidViews = reasonShortText;
		thisVid.classList.add("vid-unavailable");
		thisVid.classList.add("yt-uix-tooltip");
		thisVid.setAttribute("data-tooltip-text", reasonLongText);
		thisVid.setAttribute("title", reasonLongText);
	}
	
	thisVid.classList.add("channels-content-item");
	
	
	// Construct video
	
	var videoBlock;
	
	videoBlock =  "<a class='ux-thumb-wrap' href='/watch?v=" + vidID + "'>";
	videoBlock +=	"<span class='video-thumb ux-thumb yt-thumb-default-194'>";
	videoBlock +=		"<span class='yt-thumb-clip'>";
	videoBlock +=			"<span class='yt-thumb-clip-inner'>";
	videoBlock +=				"<img width='194' alt='Thumbnail' src='" + vidThumb + "' />";
	videoBlock +=			"</span>";
	videoBlock +=		"</span>";
	videoBlock +=	"</span>";
	videoBlock +=	"<span class='video-time'>" + vidLength + "</span>";
	videoBlock += "</a>";
	videoBlock += "<a class='content-item-title yt-uix-tooltip' data-tooltip-text='" + vidTitle + "' href='/watch?v=" + vidID + "'>" + vidTitle + "</a>";
	videoBlock += "<span class='content-item-detail'>";
	videoBlock += 	vidViews;
	videoBlock += 	"<span class='metadata-separator'>|</span>";
	videoBlock += 	"<span class='content-item-time-created'>" + vidDate + "</span>";
	videoBlock += "</span>";
	
	thisVid.innerHTML = videoBlock;
	
	document.getElementsByClassName("channels-browse-content-grid")[0].appendChild(thisVid);

}


function formatViews(nStr) { // Source: http://www.mredkj.com/javascript/numberFormat.html
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return (x1 + x2).toString() + " views";
} 


function formatDate(val) {
	val = Date.parse((new Date).toUTCString()) - Date.parse(val);
	valStr = "";
	val = val / 60000 // Minutes (from milliseconds)
	if (val < 60) { // Less than 1 hour, use minutes
		thisNum = Math.floor(val);
		if (thisNum == 1) {
			valStr = thisNum.toString() + " minute ago";
		} else {
			valStr = thisNum.toString() + " minutes ago";
		}
		return valStr;
	}
	val = val / 60 // Hours (from minutes)
	if (val < 24) { // Less than 1 day, use hours
		thisNum = Math.floor(val);
		if (thisNum == 1) {
			valStr = thisNum.toString() + " hour ago";
		} else {
			valStr = thisNum.toString() + " hours ago";
		}
		return valStr;
	}
	val = val / 24 // Days (from hours)
	if (val < 7) { // Less than 1 week, use days
		thisNum = Math.floor(val);
		if (thisNum == 1) {
			valStr = thisNum.toString() + " day ago";
		} else {
			valStr = thisNum.toString() + " days ago";
		}
		return valStr;
	}
	if (val < 365.25/12) { // Less than 1 month, use weeks
		thisNum = Math.floor(val/7);
		if (thisNum == 1) {
			valStr = thisNum.toString() + " week ago";
		} else {
			valStr = thisNum.toString() + " weeks ago";
		}
		return valStr;
	}
	if (val < 365.25) { // Less than 1 year, use months
		thisNum = Math.floor(val / (365.25/12));
		if (thisNum == 1) {
			valStr = thisNum.toString() + " month ago";
		} else {
			valStr = thisNum.toString() + " months ago";
		}
		return valStr;
	}
	// Use years
	thisNum = Math.floor(val/365.25);
	if (thisNum == 1) {
		valStr = thisNum.toString() + " year ago";
	} else {
		valStr = thisNum.toString() + " years ago";
	}
	return valStr;
} 


function formatLength(val) {
	sec = 0;
	min = 0;
	hour = 0;
	while (val >= 3600) {
		hour++;
		val = val - 3600;
	}
	while (val >= 60) {
		min++;
		val = val - 60;
	}
	sec = val;

	if (hour > 0) {
		if (min < 10) {
			min = "0" + min.toString();
		}
		if (sec < 10) {
			sec = "0" + sec.toString();
		}
		valStr = hour.toString() + ":" + min.toString() + ":" + sec.toString();
	} else {
		if (sec < 10) {
			sec = "0" + sec.toString();
		}
		valStr = min.toString() + ":" + sec.toString();
	}
	return valStr;
} 


function fetchCurrentSettings() { debug("function: fetchCurrentSettings");
	convertOldSettings();
	
	// Set the setting val as the GM val
	for (i in settings) {
		settings[i].val = GM_getValue(settings[i].gmName);
		if ((settings[i].val == undefined) | (settings[i].val == "") | (settings[i].val == null)) {
			// Set to default if nothing is set
			if (settings[i].val != false) {
				settings[i].val = settings[i].defaultVal;
				GM_setValue(settings[i].gmName, settings[i].defaultVal);
			}
		}
	}

	debug("End function: fetchCurrentSettings");
}

function convertOldSettings() { // Convert any old settings to current format
	debug("function: convertOldSettings");
	debug("End function: convertOldSettings");
}


function displaySettings() { debug("Function: displaySettings");
	setEmbedVisibility(false);
	if (!supportGM) {
		settingsScreen.style.visibility = "visible";
		settingsShadow.style.visibility = "visible";
	} else {
		fetchCurrentSettings();
		Config.show(hideSettings);
	}
	debug("End function: displaySettings");
}

function hideSettings() { debug("Function: hideSettings");
	if (!supportGM) {
		settingsScreen.style.visibility = "hidden";
		settingsShadow.style.visibility = "hidden";
	}
	setEmbedVisibility(true);
	debug("End function: hideSettings");
}

function resetSettings() { debug("Function: resetSettings");
	doReset = confirm("This will reset all your 'Better Channel Page' (BCP) settings, replacing them with the default settings. \nAre you sure you want to reset to the default BCP settings? \n\n'OK' will reset your settings and refresh the page. \n'Cancel' will keep your settings.");
	if (doReset) {
		cssStringReset = "html > body > div {display:none !important;} html > body:before {content:'Resetting script settings and reloading page...' !important; font-size:14px !important; font-weight:bold !important; padding:4px !important;}";
		var head=document.getElementsByTagName('head')[0];
		var styleReset=document.createElement('style');
		styleReset.setAttribute('type','text/css');
		styleReset.appendChild(document.createTextNode(cssStringReset));
		head.appendChild(styleReset);
		// Delete all settings for BCP. Code from the Greasemonkey Wiki.
		var keys = GM_listValues();
		for (var i=0, key=null; key=keys[i]; i++) {
			GM_deleteValue(key);
		}
		location.reload(true);
	} 	
	debug("End function: resetSettings");
}


// Hides or shows all the embeds of the document
// This function has been copied and modified from Mindeye's YousableTubeFix script.
function setEmbedVisibility(embedVisible) { debug("Function: setEmbedVisibility");
	var embeds = document.getElementsByTagName("embed");
	var count = 0;
	while (count < embeds.length) {
		embeds[count].style.visibility = (embedVisible) ? "" : "hidden";
		count++;
	}
	debug("End function: setEmbedVisibility");
}

function setting(name) {
	for (i in settings) {
		if (settings[i].jsName == name) {
			return settings[i];
		}
	}
	debug("Tried to access setting that doesn't exist, called \"" + name + "\"");
	return null;

}

function newTabPage(id) { debug("Function: newTabPage");
	if (id == "configTabBCP") {
		document.getElementById("bcpResetSettings").addEventListener("click", resetSettings, true);
	}
	debug("End function: newTabPage");
}

function setUpConfig() { debug("Function: setUpConfig");
	Config.scriptName = "Better Channel Page";
	Config.footerHtml = "<p>Version <B>"+version+"</B> <br/> Check for updates on <a href=\"http://userscripts.org/scripts/show/112521\" target=\"_blank\">this page</a> (new tab)</p> ";
	Config.reloadOnSave = true;
	Config.activateTabReal = Config.activateTab;
	Config.activateTab = function(id) {Config.activateTabReal(id); newTabPage(id);};
	Config.tabs = {
		"General":{
			html:"<p>General settings</p>",
			fields:{
				redirectToVids:{
					type:'checkbox',
					label:'Start on Video List',
					text:'Automatically load the Video List when a Channel is opened.',
				},
				/*noVidsGoFeed:{
					type:'checkbox',
					label:'Go to "Feed" if Video List is empty',
					text:'If the channel has no videos or playlists, automatically load the "Feed" page.',
				},*/
				playlistStyle:{
					type:'checkbox',
					label:'View Playlists like the Video page',
					text:'Display playlists in the same style as the video page.',
				},
			}
		},
		"BCP":{
			html:"<p>Version <B>"+version+"</B> <br/> Check for updates on <a href=\"http://userscripts.org/scripts/show/112521\" target=\"_blank\">this page</a> (new tab)</p> <p> <input type='button' id='bcpResetSettings' value='Reset Script Settings' /> </p>"
		}
	};
	debug("End function: setUpConfig");
}

function defineSettings() { debug("Function: defineSettings");
	function settingObj(js, gm, def, descr) {
		this.jsName = js; // Javascript name
		this.gmName = gm; // GM name (for GM_getValue and GM_setValue)
		this.defaultVal = def; // Default value
		this.desc = descr; // Description
	}
	settings=[
		// settingObj(Javascript name, GM name, default value, description)
		optionRedirectToVids = new settingObj("optionRedirectToVids", "redirectToVids", true, "Redirect to Video List"),
		optionNoVidsGoFeed = new settingObj("optionNoVidsGoFeed", "noVidsGoFeed", true, "Redirect to Feed if the Video List is empty"),
		optionPlaylistStyle = new settingObj("optionPlaylistStyle", "playlistStyle", true, "Display playlists in the same style as the video page")
	];
	debug("End function: defineSettings");
}


function debugDisable() {
	currentPage = window.location.toString();
	currentPage = currentPage.substring(0, currentPage.indexOf("&debug=1"));
	window.location = currentPage;
}

function debugEnable() {
	currentPage = window.location.toString();
	currentPage = currentPage + "&debug=1";
	window.location = currentPage;
}

function debugModeStart() {
	if (debugOn) {
		alert("\"Better Channel Page\" Script - Debug Mode \n\nDebug Mode has been enabled. \n\nAfter you click \"OK\" on this message, please wait 5 seconds, and another message (like this one) should appear with further instructions. \n\nIf no message appears, please copy the \"debug log\" text from the box in YouTube's header, and paste it in a message on this script's page on Userscripts.org so the script author can help you.\n");
		debugBox = document.createElement("div");
		debugBox.innerHTML = "<h1>\"Better Channel Page\" Debug Log</h1> <textarea id='bcpDebugLog' style='border:4px solid red !important; width:500px !important; height:150px !important;' readonly='readonly'>TESTING</textarea> <br/> <input type='button' value='Reload page without debug' id='bcpDebugDisable' /> - Pressing this button will also remove the debug log, so please copy/paste the debug log before pressing the button.";
		document.body.insertBefore(debugBox, document.body.children[0]);
		document.getElementById("bcpDebugDisable").addEventListener("click", debugDisable, true);
	}
}

function debugModeEnd() {
	if (debugOn) {
		debug("Ending Debug Process");
		alert("\"Better Channel Page\" Script - Debug Mode \n\nDebugging has been completed. \n\nThere is now a \"debug log\" in YouTube's header. Please copy the debug log and paste it in a message on this script's page on Userscripts.org \n\nAfter you've posted the debug log, click \"Reload page without debug\" which will turn off debug mode and will refresh the page.");
		document.getElementById("bcpDebugLog").focus();
		document.getElementById("bcpDebugLog").select();
	}
}

function debug(message) {
	if (debugOn) {
		debugMessages = debugMessages + message + "\n";
		try {
			document.getElementById("bcpDebugLog").value = debugMessages;
		} catch (ex) {
		}
	}
}

function checkForDebugMode() {
	currentPage = window.location.toString();
	if (currentPage.indexOf("&debug=1") > -1) {
		return true;
	}
	return false;
}


debug("Reached sequential end of script");
debugModeEnd();	
// End of script

