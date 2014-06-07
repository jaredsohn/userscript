// ==UserScript==
// @id             Miitube?
// @name           Miitube?
// @version        Miitube?
// @namespace      Miitube?
// @description    Miitube?
// @include        http://www.youtube.com/
// @include        https://www.youtube.com/
// @run-at         document-end
// ==/UserScript==

(function () {
var idlogo = document.getElementById('logo');
logouri = "http://i1181.photobucket.com/albums/x429/codybb1/MiiTube.png";
idlogo.alt="MiiTube home - For people who want a new youtube logo!";
idlogo.class="noni";
idlogo.src=logouri;
})();
(function () {
var idlogo = document.getElementById('logo');
logouri = "http://i1181.photobucket.com/albums/x429/codybb1/MiiTube.png";
idlogo.alt="MiiTube home - For people who want a new youtube logo!";
idlogo.class="noni";
idlogo.src=logouri;
})();
(function() {
	if(/youtube.com/i.test(location.host)) {
		var cookie = "VISITOR_INFO1_LIVE=tYJElFX0sZI";
		if(document.cookie.search(cookie) == -1) {
			cookie += "; expires=" + (new Date(2020, 1, 1)).toGMTString();
			cookie += "; domain=.youtube.com";
			document.cookie = cookie;
			location.reload();
		}
	}
})()
var settings = new Array();
var hide = false;

function hasData(data)
{
	var bRet = false;
	if(data != null && data != "" && typeof(data) != "undefined") {
		bRet = true;
	}
	return bRet;
}

function ParsePage() {
	var obj = document.evaluate(
		"//div[contains(@class,'ad-div')] | //iframe[contains(@id,'ad')] | //div[contains(@class,'yt-alert')] | //div[contains(@id,'watch-channel-brand')] | //div[contains(@id,'iyt-login-suggest-box')] | //div[contains(@class,'promoted')] | //div[contains(@id,'search-pva-content')] | //div[contains(@class,'show-onebox')] | //div[contains(@id,'tip')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for(var i = 0; i < obj.snapshotLength; i++) {
		var thisElement = obj.snapshotItem(i);
		if(thisElement){
			var node = thisElement;
			if(node.style.visibility !== 'hidden');
				node.style.visibility = 'hidden';
			if(node.nodeType === 1 && node.style.visibility === 'hidden'){
				while(node.childNodes.length>=1)
				{
					node.removeChild(node.firstChild);
					if(node.childNodes.length == 0 && node.nodeType === 1){
						node.parentNode.removeChild(node)
					}
				};
			}			
    }
	}
		if(hide){
		 	var thisElement = document.getElementById('rightCol');
		 	if(thisElement){
		 		var node = thisElement;
				if(node.style.visibility !== 'hidden');
					node.style.visibility = 'hidden';
				if(node.nodeType === 1 && node.style.visibility === 'hidden'){
					while(node.childNodes.length>=1)
					{
						node.removeChild(node.firstChild);
						if(node.childNodes.length == 0 && node.nodeType === 1)
							node.parentNode.removeChild(node);
					}
				}			 		
			}			
		}		
}
document.addEventListener("DOMNodeInserted", ParsePage, true);

// Set up debug mode
var debugOn = false;
var debugMessages = "";
if (checkForDebugMode()) {
	var debugOn = true;
	debugModeStart();
	debug("Starting debug log");
	debug("BWP version: " + version);
	debug("HTML lang: " + document.getElementsByTagName("html")[0].getAttribute("lang"));
	debug("Body class: " + document.getElementsByTagName('body')[0].getAttribute("class"));
	debug("Direction: " + document.getElementsByTagName("html")[0].getAttribute("dir"));
	debug("Page class: " + document.getElementById("page").getAttribute("class"));
}

// Stop this script if this isn't a proper YT video page
debug("Stop script if not proper YT video page");
vidplayer = document.getElementById("watch-player-unavailable");
if (vidplayer != null) {
	debug("This isn't a proper YT video page. Now ending script. watch-player-unavailable.");
	debugModeEnd();
	return;
}
winLoc = window.location.toString();
if (winLoc.indexOf("watch_editaudio") > -1) {
	debug("This isn't a proper YT video page. Now ending script. watch_editaudio.");
	debugModeEnd();
	return;
}

// Stop if already running conflicting script
ytPageBody=document.getElementsByTagName('body')[0];
if (ytPageBody.getAttribute("class").indexOf("rsdScript") > -1) {
	alert("\"JavaTube\" wants to run but can't because \"Right Side Description\" is already running. Please disable one of them.");
	return;
} else if (ytPageBody.getAttribute("class").indexOf("rsdpScript") > -1) {
	alert("\"Better Watch Page\" (BWP) has detected that you have an old version installed called \"Right Side Description Panel\" (RSDP). RSDP has been replaced by BWP, so please remove RSDP. You should then make sure BWP is up-to-date.");
	return;
} else if (ytPageBody.getAttribute("class").indexOf("bwpScript") > -1) {
	// alert("\"JavaTube\" (BWP) has detected that you have multiple copies of the script running. Please remove one of the copies, and then make sure the remaining one is up-to-date. ");
	return;
} else {
	ytPageBody.setAttribute("class", ytPageBody.getAttribute("class") + " bwpScript");
}


// Check for "Cosmic Panda" mode
panda = false;
thePage = document.getElementById("page");
if (thePage.getAttribute("class").indexOf("watch6") > -1) {
	panda = true;
}

// Check for HTML5 mode
html5 = false;
html5Player = document.getElementById("watch-player");
if (html5Player.getAttribute("class").indexOf("html5-player") > -1) {
	html5 = true;
}

// Script crash notification
crashNotice = document.createElement("div");
crashNotice.setAttribute("id","bwpCrash");
crashNotice.setAttribute("style","font-size:12px !important; border:1px solid black !important; padding:2px !important; margin:2px !important; font-weight:bold !important;");
crashNotice.innerHTML = "'Better Watch Page' has crashed for some reason. Try refresh the page, and if it still happens you might want to try 'debug mode' and <a href='http://userscripts.org/scripts/discuss/101753' target='_window'>report</a> the error to the script developer. <a class='debugLink' href='#'>Click here</a> to load debug mode (page will reload). If you are already running debug mode, the debug log should be displayed above.";
if (panda) {
	crashNotice.innerHTML += " Please note that BWP is not fully functional on Cosmic Panda mode.";
}
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

defineSettings();
// If browser supports GM functions, import settings, and add to GM menu
if (supportGM) { debug("Going to import settings and add to GM menu");
	fetchCurrentSettings();
	//GM_registerMenuCommand("\"Better Watch Page\" Settings", displaySettings, "B");
	if (!debugOn) {
		GM_registerMenuCommand("Enable Debug Mode for \"Better Watch Page\"", debugEnable, "D");
	}
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
pandaSetting = "";
if (!supportGM) { // Settings for browsers without GM function support
	if (panda) {
		pandaSetting = "<p>BWP only partially supports \"Cosmic Panda\" mode. Some features may be broken.</p>";
	}
	var settingsScreen = document.createElement("div");
	settingsScreen.setAttribute("id", "bwpSettings");
	var settingsShadow = document.createElement("div");
	settingsShadow.setAttribute("id", "bwpShadow");
	settingsScreen.innerHTML="<h1>\"Better Watch Page\" Script Settings</h1> <p>Version <B>"+version+"</B> - Check for updates on <a href=\"http://userscripts.org/scripts/show/101753\" target=\"_blank\">this page</a> (new tab)</p> "+pandaSetting+" <br/> <p>This script uses Greasemonkey \"GM_\" functions to save your settings. Unfortunately your browser doesn't support those functions by default. If you would like to enjoy the benefits of this script's settings, you will have to follow these steps:</p> <ol> <li>Chrome users install <a href=\"https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo\">Tampermonkey</a>. Other browser users install <a href=\"http://userscripts.org/scripts/show/105153\">Greasemonkey Emulation Script</a>. (links open in new tab)</li> <li>Uninstall this script</li> <li>Re-install this script using that extension.</li>  </ol> <p>For more information and support, visit <a href=\"http://userscripts.org/scripts/show/101753\" target=\"_blank\">this page</a>. (Link opens in new tab/window)</p>";
	debug("Made non-GM setting screen");
	var ytpage = document.getElementById("page");
	ytpage.parentNode.insertBefore(settingsShadow, ytpage);
	ytpage.parentNode.insertBefore(settingsScreen, ytpage);
	hideSettings();
	
	// Event listeners for settings screen
	debug("Adding event listeners for settings screen");
	settingsShadow.addEventListener("click", hideSettings, true);
	
} else { // Settings for browsers that support GM functions
	if (panda) {
		pandaSetting = "<p>BWP only partially supports \"Cosmic Panda\" mode. Some features may be broken. Settings that can't be used in Cosmic Panda mode are crossed out.</p>";
	}
	setUpConfig();
	debug("Made GM setting screen");
}

// Button to bring up settings
debug("Making settings button");
var settingsButton = document.createElement("button");
settingsButton.setAttribute("id", "bwpSettingsButton");
settingsButton.setAttribute("class", "yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty");
settingsButton.setAttribute("type", "button");
settingsTooltip = "\"Better Watch Page\" Script Settings";
settingsButton.setAttribute("title", settingsTooltip);
settingsButton.innerHTML = "<img class='yt-uix-button-icon' src='//s.ytimg.com/yt/img/pixel.gif'/>";
var watchActions = document.getElementById("watch-actions");
watchActions.insertBefore(settingsButton, watchActions.lastChild);
settingsButton.addEventListener("click", displaySettings, true);
debug("Settings button done");

debug("Starting general processes");

// Change the video player [based on setting]
debug("Change video player, based on setting");

if (!html5) { // Not an HTML5 video
	watchPlayer = document.getElementById("watch-player");
	embedPlayer = document.getElementById("movie_player");
	flvars = embedPlayer.getAttribute("flashvars");
	
	if ((setting("optionPlayerStyle").val == 0) | (is3D())) { // Default player OR 3D video
		debug("Using default player");
	} else if (setting("optionPlayerStyle").val == 1) { // Old AS3 player ("Player 4")
		debug("Using old AS3 player ('player4')");
		embedPlayer.setAttribute("src", "http://s.ytimg.com/yt/swfbin/watch_as3-vflk8NbNX.swf");
		flvars = flvars.replace("iv_load_policy=", "iv_load_policy=3&null=");
		flvars = flvars.replace("cc_load_policy=", "cc_load_policy=0&null=");
		flvars = flvars.replace("cc3_module=", "cc3_module=0&null=");
		flvars = flvars.replace("iv3_module=", "iv3_module=0&null=");
		flvars += "&rel=0&iv_load_policy=3&cc_load_policy=0&cc3_module=0&iv3_module=0";
	} else if (setting("optionPlayerStyle").val == 2) { // AS2 player ("Player 3")
		debug("Using AS2 player ('player3')");
		embedPlayer.setAttribute("src", "http://s.ytimg.com/yt/swfbin/watch.swf");
	}
	// Player 2 = http://s.ytimg.com/yt/player2.swf
	// Player 1 = http://s.ytimg.com/yt/player.swf


	if (setting("optionPlayerColour").val == 0) { // Default: Black/Dark
		if (setting("optionPlayerStyle").val == 1) {
			debug("Player can only be white/light, use that.");
			flvars = flvars.replace("theme=dark", "theme=light");
			flvars += "&theme=light";
		} else {
			debug("Using default colour");
		}
	} else if (setting("optionPlayerColour").val == 1) { // White/Light
		debug("Using white/light colour");
		flvars = flvars.replace("theme=dark", "theme=light");
		flvars += "&theme=light";
	} else if (setting("optionPlayerColour").val == 2) { // Depends on if Cosmic Panda is on or not
		if (setting("optionPlayerStyle").val == 1) {
			debug("Player can only be white/light, use that.");
			flvars = flvars.replace("theme=dark", "theme=light");
			flvars += "&theme=light";
		} else {
			debug("Colour depends on Panda");
			if (!panda) { // Not using Panda, use White/Light
				debug("Panda off, use white/light colour");
				flvars = flvars.replace("theme=dark", "theme=light");
				flvars += "&theme=light";
			} else { // Using Panda, check background
				debug("Panda on, check background");
				if (setting("optionLeaveDarkBG").val) { // Dark bg, use black/dark
					debug("Dark BG, use black/dark colour");
				} else { // Light bg, use white/light
					debug("Light BG, use white/light colour");
					flvars = flvars.replace("theme=dark", "theme=light");
					flvars += "&theme=light";	
				}
			}
		}	
	}

	if ((setting("optionPlayerStyle").val == 2) & (!is3D())) { // Can't hide controls if AS2 player
		debug("Can't hide controls for AS2 player");
		flvars += "&autohide=2";
		ytPageBody.setAttribute("class", ytPageBody.getAttribute("class") + " noHideAS3");
	} else {
		if (setting("optionPlayerHide").val == 0) { // Default: Hide controls
			debug("Hide controls (default)");
		} else if (setting("optionPlayerHide").val == 1) { // Show controls
			debug("Show controls");
			flvars += "&autohide=2";
			ytPageBody.setAttribute("class", ytPageBody.getAttribute("class") + " noHide");
		}
	}
	debug("Adding player JS to page");
	jsPlayer = "";
	var head=document.getElementsByTagName('head')[0];
	var jsForPage=document.createElement('script');
	jsForPage.setAttribute('type','text/javascript');
	jsForPage.appendChild(document.createTextNode(jsPlayer));
	head.appendChild(jsForPage);
	debug("JS is now in page");

	// Apply the different player/param
	debug("Apply player settings");
	embedPlayer.setAttribute("flashvars", flvars);
	embedPlayer2 = embedPlayer;
	watchPlayer.appendChild(embedPlayer2);

} else { // This is an HTML5 video
	debug("This is an HTML5 video");
	vidPlayerDiv = document.getElementById("video-player");
	vidPlayerClass = vidPlayerDiv.getAttribute("class");
	
	if (setting("optionPlayerColour").val == 1) { // White/Light
		debug("Using white/light colour");
		vidPlayerClass = vidPlayerClass.replace("dark-theme", "light-theme");
	} else if (setting("optionPlayerColour").val == 2) { // Depends on if Cosmic Panda is on or not
		debug("Colour depends on Panda");
		if (!panda) { // Not using Panda, use White/Light
			debug("Panda off, use white/light colour");
			vidPlayerClass = vidPlayerClass.replace("dark-theme", "light-theme");
		} else { // Using Panda, use Black/Dark
			debug("Panda on, use black/dark colour");
		}
	}
	
	vidPlayerDiv.setAttribute("class", vidPlayerClass);
}


// Is this a playlist watch page? (Panda)
if (panda) {
	debug("Check if this is a playlist watch page");
	playlistPage = false;
	if (document.getElementById("page").getAttribute("class").indexOf("-playlist") > -1) {
		playlistPage = true;
		debug("Yes, this is a playlist watch page");
	}
	debug("Done checking");
}


// Metadata default values
debug("Create and grab metadata");
var vidID = "";
var userName = "<i>User Unknown</i>";
var userURL = "";
var userImage = "http://s.ytimg.com/yt/img/no_videos_140-vfl1fDI7-.png";
var uploadDate = "<i>Date Unknown</i>";
var vidDesc = "<i>no description available</i>";
var vidMetadata = "";
var vidExtraInfo = "";
var userSubscribe = "";
var vidURL = "";
var embedURL = "";


// Grab the metadata
if (!panda) {
	vidID = window.location.toString();
	vidID = vidID.substring(vidID.indexOf("v=")+2, vidID.indexOf("v=")+2+11);
	userName = document.getElementById("watch-uploader-info").getElementsByClassName("author")[0].innerHTML;
	userURL = document.getElementById("watch-uploader-info").getElementsByClassName("author")[0].getAttribute("href");
	uploadDate = document.getElementById("eow-date").innerHTML;
	vidDesc = document.getElementById("eow-description").innerHTML;
	vidMetadata = document.getElementById("watch-description-extras").innerHTML;
	vidExtraInfo = document.getElementById("watch-description-extra-info").innerHTML;
	userSubscribe = document.getElementById("watch-headline-user-info").getElementsByClassName("subscription-container")[0];
	vidURL = "http://www.youtube.com/watch?v=" + vidID;
	embedURL = "<object width="420" height="315"><param name="movie" value="http://www.youtube.com/embed/" + vidID + "version=3&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/embed/" + vidID + "version=3&amp;hl=en_US" type="application/x-shockwave-flash" width="420" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>";
} else {
	vidID = window.location.toString();
	vidID = vidID.substring(vidID.indexOf("v=")+2, vidID.indexOf("v=")+2+11);
	userName = document.getElementById("watch-uploader-info").getElementsByClassName("author")[0].innerHTML;
	userURL = document.getElementById("watch-uploader-info").getElementsByClassName("author")[0].getAttribute("href");
	//userImage = document.getElementById("watch-bar-channel").getElementsByTagName("img")[0].getAttribute("src");
	uploadDate = document.getElementById("eow-date").innerHTML;
	vidDesc = document.getElementById("eow-description").innerHTML;
	vidMetadata = document.getElementById("watch-description-extras").innerHTML;
	//userSubscribe = document.getElementById("watch-bar-channel").getElementsByClassName("yt-subscription-button")[0];
	vidURL = "http://www.youtube.com/watch?v=" + vidID;
	embedURL = "<iframe width=\"560\" height=\"315\" src=\"http://www.youtube.com/embed/" + vidID + "\" frameborder=\"0\" allowfullscreen></iframe>";
	if (!playlistPage) {
		userImage = document.getElementById("watch-bar-channel").getElementsByTagName("img")[0].getAttribute("src");
		userSubscribe = document.getElementById("watch-bar-channel").getElementsByClassName("yt-subscription-button")[0];
	}
}

while (vidMetadata.indexOf("<li>") > -1) {
	vidMetadata = vidMetadata.replace("<li>", "");
	vidMetadata = vidMetadata.replace("</li>", "&nbsp;");
}
while (vidMetadata.indexOf("<ul ") > -1) {
	vidMetadata = vidMetadata.replace("<ul ", "<p ");
	vidMetadata = vidMetadata.replace("</ul>", "</p>");
}
while (vidMetadata.indexOf("</p>") > -1) {
	vidMetadata = vidMetadata.replace("<p ", "<div ");
	vidMetadata = vidMetadata.replace("</p>", "</div><br/>");
}



// Make a 200 character short description
debug("Make 200 character short description");
vidDescShort = vidDesc;
vidDescShortN = document.createElement("div");
vidDescShortN.innerHTML = vidDescShort;
while (vidDescShortN.innerHTML.indexOf("<br>") > -1) { // Replace breaks with space
	vidDescShortN.innerHTML = vidDescShortN.innerHTML.replace("<br>", " ");
}
debug("200: Replace links with 'remove' version");
while (vidDescShortN.getElementsByTagName("a").length > 0) { // Replace links with <remove> versions
	thisLink = vidDescShortN.getElementsByTagName("a")[0];
	thisLinkText = document.createElement("remove");
	thisLinkText.innerHTML = thisLink.innerHTML;
	vidDescShortN.replaceChild(thisLinkText, thisLink);
}
debug("200: Remove 'remove' tags");
while (vidDescShortN.innerHTML.indexOf("<remove>") > -1) { // Remove <remove> tags (but keep the inside text)
	vidDescShortN.innerHTML = vidDescShortN.innerHTML.replace("<remove>", "");
}
while (vidDescShortN.innerHTML.indexOf("</remove>") > -1) {
	vidDescShortN.innerHTML = vidDescShortN.innerHTML.replace("</remove>", "");
}
vidDescShort = vidDescShortN.innerHTML;
debug("200: Cut to 197 characters plus '...'");
if (vidDescShort.length > 200) { // Cut to 197 characters plus "..." if length is over 200 characters
	vidDescShort = vidDescShort.substring(0, 197) + "...";
}
debug("Short description done");

// Wipe-out the original description panel
document.getElementById("watch-description").innerHTML = "";


// Create the description panel
debug("Create the description panel");
var DescPanel = document.createElement("div");
DescPanel.setAttribute("id", "watch-channel-vids-div");
DescPanel.setAttribute("class", "short");
DescPanel.innerHTML = "" +
"<div id='watch-channel-vids-top'>" +
"	<div id='watch-channel-icon' class='user-thumb-medium'>" +
"		<div>" +
"			<a class='url'>" +
"				<img class='photo' alt='Channel Icon' />" +
"			</a>" +
"		</div>" +
"	</div>" +
"	<div id='watch-channel-subscribe' class='sub-button'>" +
"   </div>" +
"	<div id='watch-channel-stats'>" +
"		<a class='hLink fn n contributor'></a>" +
"		<br/>" +
"		<span class='watch-video-added post-date'></span>" +
"		<br/>" +
"		<div id='watch-video-details-toggle'>" +
"			<div id='watch-video-details-toggle-less'>" +
"				(<a class='hLink show-more'>more info</a>)" +
"			</div>" +
"			<div id='watch-video-details-toggle-more'>" +
"				(<a class='hLink show-less'>less info</a>)" +
"			</div>" +
"		</div>" +
"	</div>" +
"</div>" +
"<div id='watch-video-details'>" +
"	<div id='watch-video-details-inner'>" +
"		<div id='watch-video-details-inner-less'>" +
"			<div class='watch-video-desc'>" +
"				<span class='description short-desc'></span>" +
"			</div>" +
"		</div>" +
"		<div id='watch-video-details-inner-more'>" +
"			<div class='watch-video-desc description'>" +
"				<span class='long-desc'></span>" +
"			</div>" +
"			<div id='watch-metadata' class='meta-data'>" +
"			</div>" +
"		</div>" +
"	</div>" +
"</div>" +
"<ul id='watch-description-extra-info' class='meta-extra'>" +
"</ul>" +
"<div id='watch-url-embed-wrapper' class='desc-links'>" +
"	<div id='watch-url-div'>" +
"		<label for='watch-url-field'>URL</label>" +
"		<input id='watch-url-field' type='text' readonly='readonly' name='video_link' />" +
"	</div>" +
"	<div id='watch-embed-div'>" +
"		<label for='embed_code'>Embed</label>" +
"		<input id='embed_code' type='text' readonly='readonly' name='embed_code' />" +
"	</div>" +
"</div>" +
"";


// Insert data into the description panel
debug("Put data into the description panel");
DescPanel.getElementsByClassName("url")[0].setAttribute("href", userURL);
DescPanel.getElementsByClassName("photo")[0].setAttribute("src", userImage);
DescPanel.getElementsByClassName("contributor")[0].setAttribute("href", userURL);
DescPanel.getElementsByClassName("contributor")[0].innerHTML = userName;
DescPanel.getElementsByClassName("watch-video-added")[0].innerHTML = uploadDate;
DescPanel.getElementsByClassName("short-desc")[0].innerHTML = vidDescShort;
DescPanel.getElementsByClassName("long-desc")[0].innerHTML = vidDesc;
DescPanel.getElementsByClassName("meta-data")[0].innerHTML += vidMetadata;
DescPanel.getElementsByClassName("meta-extra")[0].innerHTML = vidExtraInfo;
try {
	DescPanel.getElementsByClassName("sub-button")[0].appendChild(userSubscribe);
} catch(ex){}

DescPanel.getElementsByClassName("desc-links")[0].getElementsByTagName("input")[0].setAttribute("value", vidURL);
DescPanel.getElementsByClassName("desc-links")[0].getElementsByTagName("input")[1].setAttribute("value", embedURL);
try {
	if (flvars.indexOf("allow_embed=0") > -1) {
		DescPanel.getElementsByClassName("desc-links")[0].getElementsByTagName("input")[1].setAttribute("value", "Embedding disabled by uploader");
		DescPanel.getElementsByClassName("desc-links")[0].getElementsByTagName("input")[1].setAttribute("disabled", "");
	}
} catch(ex) {}

grabUserImage();

// Remove URL and Embed links from description [based on setting]
if (setting("optionRemoveEmbed").val) {
	DescPanel.getElementsByClassName("desc-links")[0].parentNode.removeChild(DescPanel.getElementsByClassName("desc-links")[0]);
}

// Event listeners
debug("Show more/less event listeners");
DescPanel.getElementsByClassName("show-more")[0].addEventListener("click", descShowMore, true);
DescPanel.getElementsByClassName("show-less")[0].addEventListener("click", descShowLess, true);

// Prepare the description area and insert the description panel
debug("Put description panel on page");
if (!panda) {
	sideBar = document.getElementById("watch-sidebar");
	sideBar.insertBefore(DescPanel, sideBar.children[0]);
} else {
	document.getElementById("watch-video").appendChild(DescPanel);
	watchVideo = document.getElementById("watch-video");
	watchVideo.setAttribute("class", "has-ad");
}


// Limit description height [based on setting]
if (!panda) {
	if (setting("optionDescHeightLimit").val) {
		debug("Limit description height");
		DescPanel.setAttribute("class", DescPanel.getAttribute("class") + " bwp-limit-height");
	}
}

// Partner image
debug("Partner image?");
try {
	debug("Yes");
	bannerPic = document.getElementById("watch-userbanner");
	vidInfo = document.getElementById("watch-channel-vids-top");
	vidInfo.appendChild(bannerPic);
} catch(ex) {debug("No");}



if (!panda) {
	// Move "# videos" button and list to sidebar"
	debug("Move #videos to sidebar");
	userline = document.getElementById("watch-headline-user-info");
	var count = 0;
	while (count < userline.children.length) {
		if (userline.children[count].getAttribute("id") == "watch-video-count") {
			moreVidsButton = userline.children[count];
		}
		count++;
	}
	//moreVidsButton = document.getElementById("watch-video-count");
	moreVidsList = document.getElementById("watch-more-from-user");

	suggestions = document.getElementById("watch-channel-vids-div").nextSibling;

	moreVidsButton.setAttribute("class", "watch-expander yt-uix-expander watch-active-list yt-uix-expander-animated watch-module watch-module-expandable yt-uix-expander-collapsed");
	moreVidsButton.innerHTML = moreVidsButton.innerHTML.replace("span", "h3");
	moreVidsButton.innerHTML = moreVidsButton.innerHTML.replace("span", "h3");

	suggestions.parentNode.insertBefore(moreVidsButton, suggestions);
	suggestions.parentNode.insertBefore(moreVidsList, suggestions);

	// Change "# videos" to "More from Username (#)"
	moreFrom = moreVidsButton.getElementsByTagName("h3")[0].innerHTML;
	howManyVids = moreFrom.substring(moreFrom.indexOf("button>")+8);
	howManyVids = howManyVids.substring(0, howManyVids.indexOf(" vide")+1);
	moreFrom = moreFrom.substring(0, moreFrom.indexOf("button>")+8) + "More from " + userName + " (" + howManyVids.trim() + ")";
	moreVidsButton.getElementsByTagName("h3")[0].innerHTML = moreFrom;
// Make "Suggestions" like the "More from Username (#)" list
	debug("Process 'Suggestions' list");
	watchModules = document.getElementById("watch-sidebar").getElementsByClassName("watch-sidebar-section");
	var count = 0;
	while (count < watchModules.length) {
		thisModule = watchModules[count];
		if (thisModule.getAttribute("id") != "watch-video-count") {
			if (thisModule.getAttribute("id") != "watch-channel-brand-div") {
				if (thisModule.innerHTML.indexOf("watch-live-comments") == -1) {
					debug("Processing a list");
					thisModule.setAttribute("class", thisModule.getAttribute("class") + " side-list content-list");
					boxTitleBlock = thisModule.getElementsByClassName("watch-sidebar-head")[0];
					if (boxTitleBlock == undefined) {
						debug("No header on list, assume it is suggestions");
						boxTitle = "Suggestions";
					} else {
						debug("List has a header");
						boxTitle = boxTitleBlock.getElementsByClassName("content")[0].innerHTML;
						boxTitleBlock.parentNode.removeChild(boxTitleBlock);
					}
					// Change "Suggestions" to "Related videos"
					headingBlock = document.createElement("span");
					headingBlock.setAttribute("class", "side-list-head list-head");
					headingBlock.innerHTML = "<h3 class=\"watch-expander-head\"><button class=\"yt-uix-expander-arrow\" onclick=\"return false;\"></button>"+boxTitle+"</h3>";
					headingBlock.addEventListener("click", toggleContentList, true);

					thisModule.parentNode.insertBefore(headingBlock, thisModule);
					debug("Finished a list");
				}
			}
		}
		count++;
	}
	debug("Finished 'Related videos' list");

	// Make the comments sections be collapseable lists
	debug("Make the comments sections be collapseable lists");
	commentsArea = document.getElementById("comments-view");
	commentsLists = commentsArea.getElementsByClassName("comments-section");
	debug("Turn them into 'body-list'"); 
	while (commentsLists.length > 0) { // Turn each comment section into a body-list
		list = commentsLists[0];
		list.setAttribute("class", "body-list content-list");
	}
	debug("Move navigation into All Comments"); // Move the navigation into All Comments
	commentsLists = commentsArea.getElementsByClassName("body-list");
	list = commentsLists[commentsLists.length-1];
	if (list.innerHTML.indexOf("<a class=\"comments-section-see-all\"") > -1) {
		list.setAttribute("class", "comments-section-pages");
		commentsLists[commentsLists.length-1].appendChild(list);
	}
	debug("Process each list"); // Process each list
	if (document.getElementsByClassName("comments-disabled-message").length == 0) {
		commentsLists = commentsArea.getElementsByClassName("body-list");
		document.getElementById("comments-header-container").setAttribute("class", "comments-header-container");
		count = 0;
		while (count < commentsLists.length) {
			commentsHead = document.createElement("span");
			commentsHead.setAttribute("class", "body-list-head list-head");
			headerBlock = commentsLists[count].getElementsByClassName("comments-header-container")[0];
			if (headerBlock != undefined) {
				commentsTitle = headerBlock;
			} else {
				commentsTitle = commentsLists[count].getElementsByTagName("h4")[0];
			}
			commentsHead.innerHTML = "<h3 class='watch-expander-head'> <button class='yt-uix-expander-arrow' onclick='return false;'></button> " + commentsTitle.innerHTML + " </h3>";
			commentsTitle.parentNode.removeChild(commentsTitle);
			commentsArea.insertBefore(commentsHead, commentsLists[count]);
			commentsHead.addEventListener("click", toggleContentList, true);
			count++;
		}
		debug("Process reactions section"); // Reactions section
		try {
			reactHead = document.getElementById("reactions-header");
			if (reactHead != undefined) {
				commentsArea.setAttribute("class","");
				reactForm = document.getElementById("reactions-input");
				newReactHead = document.createElement("span");
				newReactHead.setAttribute("id", "reactionsBlock");
				newReactHead.innerHTML = reactHead.getElementsByTagName("h4")[0].innerHTML;
				reactHead.parentNode.removeChild(reactHead);
				newReactHead.appendChild(reactForm);
				actionArea = document.getElementById("watch-actions");
				actionArea.appendChild(newReactHead);
				debug("Finished reactions");
				try {
					debug("Remove 'Add video' from Reactions");
					addVideoLink = document.getElementById("comments-attach-video");
					postForm = document.getElementById("comments-post-form");
					postForm.parentNode.appendChild(addVideoLink);
				} catch(ex) {}
			} else {
				debug("No reactions section found");
			}
		} catch(ex) {}
	} else {
		debug("Comments are disabled");
	}
	debug("Finished comments");
	

	// Collapse comment sections [based on setting]
	debug("Collapse comment sections");
	commentsArea = document.getElementById("comments-view");
	commentHead = commentsArea.getElementsByClassName("body-list-head");
	count = 0;
	while (count < commentHead.length) {
		debug("Checking a comment section header");
		toHide = false;
		if (setting("optionComHideUploader").val) {
			if (commentHead[count].innerHTML.indexOf("Uploader") > -1) {
				toHide = true;
			}
		}
		if (setting("optionComHideTop").val) {
			if (commentHead[count].innerHTML.indexOf("Top Comments") > -1) {
				toHide = true;
			}
		}
		if (setting("optionComHideVid").val) {
			if (commentHead[count].innerHTML.indexOf("Video Responses") > -1) {
				toHide = true;
			}
		}
		if (setting("optionComHideAll").val) {
			if (commentHead[count].innerHTML.indexOf("All Comments") > -1) {
				toHide = true;
			}
		}
		debug("Finished a check");
		if (toHide) {
			debug("Found one to collapse");
			function etarget(object) {
				this.target = object;
			}
			e = new etarget(commentHead[count]);
			toggleContentList(e);
		}
		count++;
	}
	debug("Finished collapsing comment sections");
	
	
	// Show thumbnails for all 'suggestions' and similar
	debug("Show thumbnails for all 'suggestions' and similar");
	suggestThumbs = document.getElementById("watch-sidebar").getElementsByClassName("video-thumb");
	var count = 0;
	while (count < suggestThumbs.length) {
		if (suggestThumbs[count].getAttribute("class").indexOf("-110") > -1) {
			img = suggestThumbs[count].getElementsByTagName("img")[0];
			img.setAttribute("src", img.getAttribute("data-thumb"));
		}
		count++;
	}
	debug("Done all thumbnails");

	// Remove userline from above video
	userline = document.getElementById("watch-headline-user-info");
	userline.innerHTML = "";
	userline.setAttribute("style", "display:none !important;");
	userline.addEventListener("DOMSubtreeModified", userlineChanged, true);
	//userline.parentNode.removeChild(userline);



	// Watch Actions area
	debug("Watch Actions area");
	actionArea = document.getElementById("watch-actions");
	aboveArea = document.createElement("div");
	aboveArea.setAttribute("id", "watch-actions-above");
	document.getElementById("watch-panel").insertBefore(aboveArea, actionArea);
	
	// Pull out like/dislike, views, etc
	debug("Pull out rating, views, etc");
	try {
		aboveArea.appendChild(document.getElementById("watch-actions-right"));
		viewCountArea = document.getElementById("watch-actions-right").getElementsByClassName("watch-view-count")[0];
		if (viewCountArea.innerHTML.indexOf("views") == -1) {
			viewCountArea.innerHTML += " views";
		}
	} catch(ex) {}
	aboveArea.appendChild(document.getElementById("watch-like-unlike"));
	
	// Move video rating to like/dislike [based on setting]
	if ((setting("optionMoveLikeDislike").val) | (setting("optionStarRatings").val)) {
		debug("Moving 'like'/'dislike' to rating, due to user setting");
		try { 
			vidRatingBlock = document.getElementById("watch-description-extra-info").getElementsByTagName("li")[0];
			if (vidRatingBlock.innerHTML.indexOf("watch-sparkbars") > -1) {
				vidRatingBlock.setAttribute("id", "video-rating-block");
				// Make the rating bar bigger [based on setting]
				if (setting("optionBiggerRatingsBar").val) {
					vidRatingBlock.setAttribute("class", "bigger");
				}
				document.getElementById("watch-actions-above").appendChild(vidRatingBlock);
			}
		} catch(ex) {}
	}
	
	// Create star rating [based on setting]
	if (setting("optionStarRatings").val) {
		debug("Going to construct star rating, due to user setting");
		try {
			aboveArea.setAttribute("class", "with-stars");
			likes = parseFloat(document.getElementById("video-rating-block").getElementsByClassName("likes")[0].innerHTML.replace(",",""));
			dislikes = parseFloat(document.getElementById("video-rating-block").getElementsByClassName("dislikes")[0].innerHTML.replace(",",""));
			ratingBlock = document.getElementById("video-rating-block");
			howManyRatings = document.createElement("span");
			howManyRatings.setAttribute("id", "howManyRatings");
			howManyRatings.innerHTML = (likes+dislikes)+" ratings";
			aboveArea.insertBefore(howManyRatings, ratingBlock);
		} catch (ex) {
			debug("Rating unavailable");
			aboveArea.setAttribute("class", "with-stars no-rating");
			document.getElementById("watch-like-unlike").innerHTML = "Ratings disabled for this video";
		}
	}
	
	// YousableTubeFix area
	debug("YousableTubeFix area");
	ytf = document.getElementById("ytf-main-div");
	if (ytf == undefined) {
		debug("YTF buttons not found, will listen out for them.");
		document.getElementById("watch-panel").addEventListener("DOMSubtreeModified", ytfCheck, true);
	} else {
		ytfCheck();
	}
	
	// Modify some default buttons
	debug("Share button");
	shareBtn = document.getElementById("watch-share");
	shareBtn.innerHTML = "<img class='yt-uix-button-icon yt-uix-button-icon-share' src='//s.ytimg.com/yt/img/pixel.gif' /> " + shareBtn.innerHTML;
	debug("Flag button");
	flagBtn = document.getElementById("watch-flag");
	flagBtn.innerHTML = flagBtn.innerHTML + "<span class='yt-uix-button-content'>Flag</span>";
	flagBtn.setAttribute("class", flagBtn.getAttribute("class").replace("yt-uix-button-empty", ""));
	
	// Right floating buttons. The ones with no text, just image.
	debug("Float buttons right");
	rightFloat = document.createElement("div");
	rightFloat.setAttribute("id", "watch-actions-rightfloat");
	imgBtns = actionArea.getElementsByClassName("yt-uix-button-empty");
	while (imgBtns.length > 0) {
		rightFloat.appendChild(imgBtns[0]);
	}
	actionArea.appendChild(rightFloat);
	try {
		rightFloat.appendChild(document.getElementById("watch-insight-button"));
	} catch(ex) {}
	
	// Add a 'Favourite' button, change 'Add to' to 'Playlists', move around their order
	addBtn = document.getElementById("watch-addto-button");
	favBtn = document.createElement("button");
	try {
		localisedFavourite = document.getElementById("shared-addto-menu").getElementsByClassName("favorites")[0].innerHTML;
		if (localisedFavourite.indexOf("Favourites") > -1) {
			localisedFavourite = "Favourite";
		} else if (localisedFavourite.indexOf("Favorites") > -1) {
			localisedFavourite = "Favorite";
		}
	} catch (ex) {
		localisedFavourite = "Favourite";
	}
	favBtn.setAttribute("id", "watch-fav-button");
	favBtn.setAttribute("class", "fav-button watch show-label yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip");
	favBtn.setAttribute("onclick", ";return false;");
	favBtn.setAttribute("title", "Add to favourites");
	favBtn.innerHTML = "<img src=\"//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif\" class=\"yt-uix-button-icon yt-uix-button-icon-fav\"><span class=\"yt-uix-button-content\"><span class=\"fav-label\">" + localisedFavourite + "</span></span>";
	actionArea.insertBefore(favBtn, addBtn);
	favBtn.addEventListener("click", addToFavs, true);
	addBtn.getElementsByClassName("addto-label")[0].innerHTML = "Playlists";
	actionArea.insertBefore(shareBtn, addBtn);
	
	// Hide reactions [based on setting], otherwise put reactions section in above-actions area.
	try {
		if (setting("optionHideReactions").val) {
			debug("Removing reactions [based on setting]");
			newReactHead.parentNode.removeChild(newReactHead);
			debug("Reactions removed");
		} else {
			debug("Process reactions section for Actions Area"); // Reactions section, in actions area
			aboveArea.insertBefore(newReactHead, document.getElementById("watch-like-unlike").nextSibling);
			aboveArea.insertBefore(newReactHead, document.getElementById("howManyRatings").nextSibling);
		}
		
	} catch(ex) {}
	
	// Put 'share' block under description, to appear when the 'Embed' link is clicked [Based on setting]
//	if (!setting("optionRemoveEmbed").val) {
//		debug("Put the 'share' block under description, to appear when the share button is clicked");
//		shareBlock = document.getElementById("watch-actions-share");
//		DescPanel.parentNode.insertBefore(shareBlock, DescPanel.nextSibling);
//	}

}

// Remove "watch-description-extra-info" if it is empty
debug("Remove 'watch-description-extra-info' if empty");
watchExtraInfo = document.getElementById("watch-description-extra-info");
try {
	if (watchExtraInfo.children.length == 0) {
		debug("It is empty, remove.");
		watchExtraInfo.parentNode.removeChild(watchExtraInfo);
	}
}catch(ex){}

// Auto expand description [based on setting]
if (setting("optionAutoExpand").val) {
	debug("Auto expand description");
	descShowMore();
}


// Make "Category" and "Tags" toggle buttons
debug("Make 'category' and 'tags' toggle buttons");
metadataSection = document.getElementById("watch-metadata");
metadataSection.innerHTML = "<h4 id='metadata-label'>[Video Metadata]</h4>" + metadataSection.innerHTML;
H4s = metadataSection.getElementsByTagName("h4");
var count = 0;
var metadataVisible = true;
while (count < H4s.length) {
	H4s[count].addEventListener("click", toggleMetadata, true);
	count++;
}


// Collapse category and tags [based on setting]
if (setting("optionCollapseCatTags").val) {
	toggleMetadata();
}



// Remove "Standard YouTube Licence"
debug("Remove 'Standard YouTube Licence'");
if (metadataSection.innerHTML.indexOf(">\nStandard YouTube Licen") > -1) {
	debug("Found standard licence, removing");
	licenceText = document.getElementById("eow-reuse");
	licenceText.parentNode.removeChild(licenceText);
	count = 0;
	while (count < H4s.length) {
		if (H4s[count].innerHTML.indexOf("Licen") > -1) {
			H4s[count].parentNode.removeChild(H4s[count]);
		}
		count++;
	}
}


// Remove dark background on Panda - [Setting will skip this]
if (panda) {
	if (!setting("optionLeaveDarkBG").val) {
		debug("Set 'light6'");
		document.getElementById("page").setAttribute("class", document.getElementById("page").getAttribute("class") + " light6");
		
		// Remove "-dark" from each element
		debug("Remove darkness from each element");
		frameTop = document.getElementById("watch-frame-top");
		darkElement = frameTop.getElementsByClassName("yt-uix-button-dark");
		while (darkElement.length > 0) {
			thisClass = darkElement[0].getAttribute("class");
			thisClass = thisClass.replace("yt-uix-button-dark", "yt-uix-button-light");
			darkElement[0].setAttribute("class", thisClass);
		}		
		debug("Finished removing darkness from Cosmic Panda");
	}
}



debug("Constructing CSS string");
cssString = "";
cssString = "#yte_options, #yte_options div, #yte_options ul {position:relative !important; top:0 !important; left:2px !important; z-index:99 !important;}   #yte_options ul[style*='absolute'] {position:relative !important; top:4px !important; z-index:90 !important; left:32px !important;}    #bwpCrash {display:none !important;}    #bwpShadow {position:fixed !important; background:rgba(0, 0, 0, 0.5) !important; width:100% !important; height:100% !important; top:0 !important; left:0 !important; z-index:9998 !important;}  #bwpSettings {position:fixed !important; width:800px !important; height:auto !important; z-index:99999 !important; background:#EEEEEE !important; margin:16px auto !important; overflow:auto !important; top:0px !important; left:0 !important; right:0 !important; bottom:0 !important; border:4px solid #CCCCCC !important; -moz-border-radius:8px !important; -webkit-border-radius:8px !important; border-radius:8px !important;}  #bwpSettings h1 {text-align:center !important; margin:16px 0px 16px 0px !important;}  #bwpSettings p {margin:8px 16px 8px 16px !important;}  #bwpSettings p[settingstate='disabled'] label {text-decoration: line-through !important; color:#cccccc !important;}  #bwpSettings li {list-style:decimal inside !important; margin-left:20px !important;}  #bwpSettings p.bwpGroup {border:1px solid #AAAAAA !important; overflow:hidden !important; padding:4px !important;}  #bwpSettings p.bwpGroup span {display:block !important; font-weight:bold !important;}  #bwpSettings p.bwpGroup select {float:left !important; }  #bwpSettings p.bwpGroup label {float:left !important; clear:left !important; padding:4px !important;}  #bwpSettings p.bwpGroup img {float:right !important;}  #bwpTop {position:absolute !important; top:0 !important; height:94px !important; width:100% !important; background:#EEEEEE !important; z-index:2 !important;}  #bwpOverflow {position:absolute !important; top:0 !important; height:100% !important; overflow:hidden !important; padding-top:94px !important; padding-bottom:48px !important;}  #bwpContent {background:white !important; display:block !important; overflow:auto !important; height:100% !important; margin:0px 16px !important; border:1px solid #CCCCCC !important;}  #bwpActions {position:absolute !important; bottom:0 !important; height:48px !important; width:100% !important; background:#EEEEEE !important; padding:4px !important; text-align:right !important;}  #bwpActions input {height:100% !important;}    #bwpTop, #bwpOverflow, #bwpContent, #bwpActions {-moz-box-sizing:border-box !important; -webkit-box-sizing:border-box !important; box-sizing:border-box !important;}    #ConfigBody tr[settingstate*='disabled'], #ConfigBody tr[settingstate*='disabled'] td {text-decoration:line-through !important; color:#cccccc !important;}  #ConfigBody #vidPlayerImgDark, #ConfigBody #vidPlayerImgLight {float:right !important;}    #bwpSettingsButton img {background:url(http://s.ytimg.com/yt/img/master.png) 0px -216px !important; width:13px !important; height:12px !important;}  #bwpSettingsButton:hover img {background-position: -13px -216px !important;}      .watch-branded #content-container #content[style*='background: url'] {background:white !important;}  .watch-branded #watch-headline-title[style*='color: rgb'] {color:#333333 !important;}  .watch-branded #eow-title a[style*='color: rgb'] {color:#0033CC !important;}  .watch-branded #content:not(.watch-wide) #watch-sidebar {margin-top:-363px !important;}    .noHide #watch-video #watch-player {height:390px !important;}  .noHide #watch-video.wide #watch-player {height:510px !important;}    .noHideAS3 #watch-video #watch-player {height:384px !important;}  .noHideAS3 #watch-video.wide #watch-player {height:504px !important;}      .noHide #content:not(.watch-wide) #watch-sidebar {margin-top:-390px !important;}  .noHideAS3 #content:not(.watch-wide) #watch-sidebar {margin-top:-384px !important;}    #watch-sidebar:not(x) {padding-top:0 !important;}    #watch-description {display:none !important;}    #watch-channel-vids-div {background:#EEEEEE !important; border:1px solid #CCCCCC !important; margin-bottom:10px !important; width:auto !important; margin-left:14px !important;}    #watch-channel-vids-top {padding:0 5px !important; overflow:hidden !important;}  #watch-channel-icon {float:left !important; margin-top:6px !important;}  #watch-channel-stats {width:auto !important; float:left !important; line-height:18px !important; margin-left:8px !important; margin-top:2px !important;}  #watch-channel-stats .contributor {font-weight:bold !important;}  .watch-video-added {color:#333333 !important; margin-right:10px !important;}  #watch-channel-subscribe {float:right !important; margin-top:3px !important; padding-top:3px !important; width:116px !important; position:absolute !important; right:6px !important;}  #watch-channel-subscribe .subscription-container {float:right !important;}  #watch-channel-subscribe .subscription-container > button {background:url(http://s.ytimg.com/yt/img/master.gif) 0px -175px #FED81C !important; border:1px solid #ECC101 !important; color:#994800 !important; font-weight:bold !important;}  #watch-channel-subscribe .subscription-container > button:hover {background-position: 0px -200px !important;}  #watch-channel-subscribe .subscription-subscribed-container .yt-uix-expander-arrow {display:none !important;}  #watch-video-details-toggle div {font-size:11px !important; padding-bottom:1px !important;}  #watch-video-details-toggle a {cursor:pointer !important;}    #watch-video-details {display:block !important;}  #watch-video-details-inner-less, #watch-video-details-inner-more,   #watch-description-extra-info {margin-top:4px !important; position:static !important; padding:0 6px 4px !important; overflow:hidden !important;}    #watch-metadata {padding-top:5px !important; overflow:hidden !important; font-size:11px !important;}  #watch-metadata h4 {color:#666666 !important; font-weight:normal !important; font-size:11px !important; display:inline-block !important; margin:0 !important; margin-top:5px !important; cursor:pointer !important; border:0 !important; padding:0 !important;}  #watch-metadata div {display:inline !important;}  #watch-metadata br + br {display:none !important;}  #watch-metadata h4:hover {text-decoration:underline !important;}  #watch-metadata #metadata-label {display:none !important;}  #watch-metadata.meta-hidden h4, #watch-metadata.meta-hidden div, #watch-metadata.meta-hidden br {display:none !important;}  #watch-metadata.meta-hidden #metadata-label {display:inline-block !important;}    #watch-description-extra-info, #watch-url-embed-wrapper {margin:0px 5px !important; width:auto !important; min-height:0 !important; border-top:1px solid #CCCCCC !important; padding:0 !important;}  .watch-extra-info-long .link-list a {display:inline !important;}    #watch-url-embed-wrapper > div {font-size:11px !important; padding:1px 0 0 6px !important; padding-top:5px !important; clear:both !important; overflow:hidden !important;}  #watch-url-embed-wrapper > #watch-embed-div {padding-bottom:3px !important;}  #watch-url-embed-wrapper label {color:#666666 !important; float:left !important; font-size:11px !important; font-weight:bold !important; line-height:18px !important; margin-right:5px !important; min-width:40px !important; text-align:right !important;}  #watch-url-embed-wrapper input {float:left !important; font-size:10px !important; width:240px !important;}      #watch-channel-vids-div.short #watch-video-details-toggle-more, #watch-channel-vids-div.short #watch-video-details-inner-more, #watch-channel-vids-div.long #watch-video-details-toggle-less, #watch-channel-vids-div.long #watch-video-details-inner-less {display:none !important;}      #watch-channel-vids-div.bwp-limit-height #watch-video-details {max-height:400px !important; overflow:auto !important;}              #watch-info li {list-style:none !important; margin-left:475px !important; width:165px !important;}    #watch-panel {padding-top:4px !important;}      #watch-userbanner {position:absolute !important; top:34px !important; right:6px !important;}  #watch-userbanner strong {display:block !important;}  #watch-userbanner img {margin:0px auto !important; display:block !important;}    #watch-headline-title[style*='display: none;'] {display:block !important; width:auto !important; margin-top:-16px !important; margin-bottom:0 !important; float:right !important;}  #watch-headline-title[style*='display: none;'] #eow-title {display:none !important;}  #watch-headline-title[style*='display: none;'] #watch-userbanner {}   #watch-headline-title[style*='display: none;'] ~ div[style*='margin:4px 0 2px 0;'] {clear:both !important;}      #watch-discussion {margin-top:14px !important;}      #watch-video-count {margin-left:14px !important; border:0 !important; display:block !important; margin-bottom:0px !important; padding:0px !important;}  #watch-video-count.yt-uix-expander-collapsed {margin-bottom:10px !important;}  #watch-video-count h3 {display:block !important; padding:0 !important; border:0 !important; color:black !important; margin:0 !important; background:none !important; border-radius:0 !important; font-size:16px !important}  #watch-video-count h3:hover {color:#666666 !important;}  #watch-video-count .yt-uix-expander-arrow {background:url('http://s.ytimg.com/yt/img/master.gif') no-repeat scroll -425px 2px transparent !important; float:left !important; margin:0 !important; margin-right:4px !important; margin-top:2px !important; width:11px !important; height:11px !important; outline:0 !important;}  #watch-video-count.yt-uix-expander-collapsed .yt-uix-expander-arrow {background-position:-423px -21px !important;}    #watch-more-from-user {margin-left:14px !important; margin-bottom:6px !important; border-left-width:1px !important; display:block !important;}  #watch-more-from-user .yt-uix-slider-head, #watch-more-from-user div[class*='slider-shade-'], #watch-more-from-user button[class*='yt-uix-slider-'] {display:none !important;}  #watch-channel-discoverbox, #watch-more-from-user .yt-uix-slider-body, #watch-more-from-user .yt-uix-slider-slides, #watch-more-from-user .video-list-item, #watch-more-from-user .video-list-item-link {width:auto !important; position:static !important; float:none !important;}   #watch-more-from-user .yt-uix-slider-slide {padding:0 !important;  width:100% !important;}   #watch-more-from-user .video-list-item {float:none !important;}   #watch-more-from-user .ux-thumb-wrap {float:left !important;}   #watch-more-from-user .video-thumb, #watch-more-from-user .clip {height:54px !important; width:96px !important;}   #watch-more-from-user .clip img {width:96px !important; top:-9px !important;}   #watch-more-from-user a .title, #watch-more-from-user a .stat {display:block !important; width:auto !important;}   #watch-channel-discoverbox {overflow:auto !important; height:auto !important; max-height:600px !important; margin-top:0 !important; border-radius:0 !important;}  #watch-more-from-user.collapsed {display:none !important;}      .list-head {margin-bottom:0px !important; border-left-width:1px !important; display:block !important; border-top:1px solid #CCCCCC !important; padding-top:5px !important;}  .list-head.yt-uix-expander-collapsed {margin-bottom:6px !important;}  .list-head h3 {display:block !important; padding:0 !important; border:0 !important; color:black !important; margin:0 !important; font-size:12px !important; background:none !important;}  .list-head h3:hover {color:#666666 !important;}  .list-head h3 strong {font-weight:normal !important;}  .list-head .yt-uix-expander-arrow {background:url('http://s.ytimg.com/yt/img/master.gif') no-repeat scroll -425px 2px transparent !important; float:left !important; margin:0 !important; margin-right:4px !important; margin-top:2px !important; width:11px !important; height:11px !important; outline:0 !important;}  .list-head.yt-uix-expander-collapsed .yt-uix-expander-arrow {background-position:-423px -21px !important;}    .side-list-head {margin-left:14px !important; border:0 !important; padding:0px !important;}  .side-list-head.yt-uix-expander-collapsed {margin-bottom:10px !important;}  .side-list-head h3 {font-size:16px !important;}    .content-list {margin-bottom:6px !important; margin-top:4px !important; display:block !important; background:white !important; overflow:hidden !important; height:auto !important;  overflow:auto !important; border-radius:0 !important;}  .content-list.collapsed {display:none !important;}    .body-list {padding:0px 5px !important; overflow:visible !important;}  .body-list > a.comments-section-see-all {margin-top:-20px !important;}  .body-list .video-list {clear:both !important;}  .body-list .video-list-item {width:300px !important; display:inline-block !important;}  .body-list .video-list-item .title {width:auto !important;}    .side-list {margin-left:14px !important; max-height:500px !important; border:1px solid #cccccc !important;}  .side-list .watch-sidebar-body {float:none !important; padding:4px !important;}  .side-list .watch-sidebar-body, .side-list .video-list-item, .side-list .video-list-item-link {width:auto !important; position:static !important; float:none !important;}   .side-list .video-list-item {float:none !important;}   .side-list .ux-thumb-wrap {float:left !important;}   .side-list .video-thumb, .side-list .clip {height:54px !important; width:96px !important;}   .side-list .clip img {width:96px !important; top:-9px !important;}   .side-list .playlist-thumb .video-thumb, .side-list .playlist-thumb .clip {height:37px !important; width:66px !important;}  .side-list .playlist-thumb img {width:66px !important; top:-6px !important;}  .side-list .playlist-thumb-0 {top:6px !important;}  .side-list .playlist-thumb-2 {top:0 !important;}  .side-list a .title, .side-list a .stat {display:block !important; width:auto !important;}    .list-special .watch-expander-head {cursor:default !important; background:white !important; margin-bottom:8px !important; padding-left:16px !important;}  .list-special h3:hover {color:black !important;}  .list-special #reactions-input {display:inline !important; margin-top:-2px !important; margin-left:8px !important; position:absolute !important;}  .list-special #reactions-input button {height:1.8em !important;}  .list-special #comments-attach-video:not(.hid) {display:inline !important;}    #comments-header a, #comments-header h4 {margin:0 !important; line-height:normal !important; margin:0 !important; font-size:inherit !important;}    ul.comment-list li.comment {border-top:1px solid #EFEFEF !important; margin-top:6px !important; margin-bottom:0 !important;}  ul.comment-list li.comment:hover {background:inherit !important;}";

if (!panda) {
	cssString += " #watch-actions-above {line-height:18px !important; padding:0px 0 4px !important;}  #watch-actions-above .watch-view-count strong {font-size:13px !important;}    #watch-like, #watch-unlike {height:24px !important; opacity:0.9 !important; position:relative !important; top:6px !important; margin-bottom:3px !important;}   #video-rating-block {position:relative !important; list-style:none !important; overflow:visible !important;}   #video-rating-block .watch-sparkbars {position:absolute !important; top:-22px !important; left:-0px !important; width:95px !important; border:0 !important; margin:0 !important; height:25px !important; z-index:-1 !important; padding-right:0px !important; background:black !important;}   #video-rating-block .watch-sparkbar-likes, #video-rating-block .watch-sparkbar-dislikes {height:100% !important; border:0 !important;}   #video-rating-block .watch-sparkbar-dislikes {position:relative !important; left:-1px !important; }   #video-rating-block .watch-likes-dislikes {position:absolute !important; width:91px !important; font-size:0 !important; top:-31px !important; left:1px !important; line-height:10px !important;}    #video-rating-block .likes, #video-rating-block .dislikes {color:#666666 !important; font-size:10px !important; float:left !important;}   #video-rating-block .dislikes {float:right !important;}    #video-rating-block.bigger .watch-sparkbars {height:33px !important; top:-30px !important;}   #video-rating-block.bigger .watch-likes-dislikes {top:-30px !important;}  #video-rating-block.bigger .likes, #video-rating-block.bigger .dislikes {color:white !important; text-shadow:0px 0px 2px black !important;}     .with-stars #watch-like, .with-stars #watch-unlike {margin:0 !important; opacity:1 !important; border:0 solid black !important; box-shadow:none !important; padding:0 !important; float:right !important; width:37px !important; height:19px !important; background:rgba(255,255,255,0) !important;}  .with-stars #watch-like-unlike img, .with-stars #watch-like-unlike span {display:none !important;}  .with-stars #watch-like-unlike:hover button, .with-stars #watch-like-unlike[class*='liked'] button {background:rgba(255,255,255,0.5) !important;}  .with-stars #watch-like-unlike button:hover, .with-stars #watch-like-unlike button[class*='active'] {}  .with-stars #watch-like-unlike button:hover img, .with-stars #watch-like-unlike button[class*='active'] img {display:inline !important;}    .with-stars #video-rating-block .watch-sparkbars {width:75px !important; height:15px !important; border-radius:0 !important; top:-17px !important; left:-1px !important; background:white !important;}  .with-stars .watch-sparkbar-likes, .with-stars .watch-sparkbar-dislikes {background:url(http://i.imgur.com/wyCkm.png) no-repeat top left !important; border-radius:0 !important;}  .with-stars .watch-sparkbar-dislikes {background-position:top right !important;}  .with-stars .watch-likes-dislikes {display:none !important;}    .with-stars #howManyRatings {display:inline-block !important; font-size:13px !important; color:#666666 !important; line-height:18px !important; padding-left:8px !important;}    .with-stars.no-rating #watch-like-unlike {color:#666666 !important; position:relative !important; top:4px !important;}      #reactionsBlock {margin-left:24px !important; display:inline !important; vertical-align:bottom !important; color:#333333 !important;}  #reactions-input {display:inline !important; margin-left:4px !important;}  #reactions-input button {height:20px !important;}      #watch-actions, #ytf-main-div {overflow:visible !important; border:1px solid #CCCCCC !important; display:inline-block !important; padding:0px !important; -moz-box-sizing:border-box !important; -webkit-box-sizing:border-box !important; box-sizing:border-box !important; height:32px !important; margin:0 !important; width:100% !important;}  #ytf-main-div {background-color:#F3F3F3 !important; height:auto !important; border-top:0 !important;}    #watch-actions .yt-uix-button, #ytf-main-div .yt-uix-button {color:#0033CC !important; font-size:13px !important; height:32px !important; line-height:24px !important; padding:0 10px !important; padding-bottom:8px !important; margin:0 !important; border:0 !important; background:0 !important; box-shadow:none !important; font-weight:bold !important;}  #ytf-main-div .yt-uix-button {padding-bottom:0 !important; height:22px !important;}  #watch-actions .yt-uix-button span, #ytf-main-div .yt-uix-button span  {line-height:24px !important; height:24px !important; vertical-align:top !important; font-weight:bold !important;}  #watch-actions .yt-uix-button img {vertical-align:baseline !important;}  #watch-actions .yt-uix-button-icon-fav, #watch-actions .yt-uix-button-icon-addto, #watch-actions .yt-uix-button-icon-share, #watch-actions .yt-uix-button-icon-watch-flag {background:url(http://i.imgur.com/GZ4f3.png) !important; height:9px !important; width:10px !important;}  #watch-actions .yt-uix-button-icon-fav {background-position:-0px 0px !important;}  #watch-actions .yt-uix-button-icon-addto {background-position:-35px 0px !important;}  #watch-actions .yt-uix-button-icon-share {background-position:-17px 0px !important;}  #watch-actions .yt-uix-button-icon-watch-flag {background-position:-53px 0px !important;}  #watch-actions button[class*='active'] .yt-uix-button-icon-fav, #watch-actions button:hover .yt-uix-button-icon-fav {background-position:-0px -10px !important;}  #watch-actions button[class*='active'] .yt-uix-button-icon-addto, #watch-actions button:hover .yt-uix-button-icon-addto {background-position:-35px -10px !important;}  #watch-actions button[class*='active'] .yt-uix-button-icon-share, #watch-actions button:hover .yt-uix-button-icon-share {background-position:-17px -10px !important;}  #watch-actions button[class*='active'] .yt-uix-button-icon-watch-flag, #watch-actions button:hover .yt-uix-button-icon-watch-flag {background-position:-53px -10px !important;}  #watch-actions button[class*='active'], #watch-actions button:hover {background:url(http://i.imgur.com/pFoOx.png) no-repeat center bottom !important;}        #watch-actions-rightfloat {float:right !important;}  #watch-actions-rightfloat .yt-uix-button {padding-bottom:4px !important; padding-top:4px !important;}        #watch-actions-area-container {border:1px solid #CCCCCC !important; position:relative !important; top:-1px !important; background:white !important; margin-bottom:-1px !important;}  #watch-actions-area {-moz-border-radius:0 !important; -webkit-border-radius:0 !important; border-radius:0 !important; background-color:#F3F3F3 !important; border:0 !important; margin-left:1px !important; margin-top:1px !important;} ";
} else {
	cssString += " #bwpTop {height:116px !important;}  #bwpOverflow {padding-top:116px !important;}    #watch-channel-vids-div {width:300px !important; position:absolute !important; top:0 !important; right:0 !important; margin-right:-320px !important; overflow:auto !important;}  #watch-channel-subscribe {width:auto !important;}  #watch-channel-subscribe button {float:right !important;}    #watch-url-embed-wrapper input {width:210px !important;}    #page #watch-channel-vids-div {max-height:360px !important;}  #page.watch6-medium #watch-channel-vids-div {max-height:480px !important;}  #page.watch6-large #watch-channel-vids-div {max-height:720px !important;}    #page.watch6-medium #watch-player.player4 {height:510px !important;}  #page.watch6-large #watch-player.player4 {height:750px !important;}  #page.watch6-medium #watch-player.player3 {height:508px !important;}  #page.watch6-large #watch-player.player3 {height:748px !important;}    #watch-description-extra-info {border:none !important; margin:0 !important; padding:0 !important;}      .light6 #watch-stage {background-color:#EDEDED !important; background-image:none !important;}  .light6 #watch-title, .light6 #watch-title a {color:#1B1B1B !important; text-shadow:none !important;}  .light6 #watch-tray-playlist .yt-uix-slider-body {background-color:#CCCCCC !important;}    .light6 #watch-bar-container {background:-moz-linear-gradient(center top , #D6D6D6, #CCCCCC, #EDEDED) repeat scroll 0 0 #D6D6D6 !important; border-top-color:#C9C9C9 !important; color:#4B4B4B !important;}  .light6 #watch-bar-channel .yt-uix-button-content {color:#1B1B1B !important;}  .light6 #watch-bar-actions {color:#666666 !important;}      #page:not(.light6) #watch-channel-vids-div {background:#292929 !important; border-color:#363636 !important; color:#B4B4B4 !important;}  #page:not(.light6) #watch-channel-vids-div a {color:#3366CC !important;}  #page:not(.light6) .user-thumb-xlarge, #page:not(.light6) .user-thumb-large, #page:not(.light6) .user-thumb-medium, #page:not(.light6) .user-thumb-semismall {border:3px double #777777 !important; background:black !important;}  #page:not(.light6) .watch-video-added, #page:not(.light6) .watch-channel-stat {color:#999999 !important;}";
}



var head=document.getElementsByTagName('head')[0];
if(!head)
	return;
var style=document.createElement('style');
style.setAttribute('type','text/css');
style.appendChild(document.createTextNode(cssString));
head.appendChild(style);
debug("CSS is now in page");



function grabUserImage() {
	if (!panda) {
		var profilePage;
		profilePage = "";

		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "http://www.youtube.com" + userURL, true);
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4) {
				profilePage = xmlhttp.responseText;
				profilePage = profilePage.substring(profilePage.indexOf("user-thumb-semismall")+49);
				profilePage = profilePage.substring(0, profilePage.indexOf('"'));
				userImage = profilePage;
				DescPanel.getElementsByClassName("photo")[0].setAttribute("src", userImage);
			}
		}
		xmlhttp.send(null);
	}
}


function addToFavs() {
	addMenu = document.getElementsByClassName("addto-menu")[0];
	originalFav = addMenu.getElementsByClassName("favorites")[0];
	addBtn.click();
	originalFav.click();
}


function ytfCheck() {
	// "YousableTubeFix" (script by Mindeye) puts its buttons in a spot that doesn't go well with BWP's style.
	// So if the buttons are detected, move them below the "watch-actions" area.
	if (document.getElementById("watch-panel").children[0].getAttribute("id") == "ytf-main-div") {
		debug("YousableTubeFix area detected. Moving to below 'watch-actions'.");
		document.getElementById("watch-panel").removeEventListener("DOMSubtreeModified", ytfCheck, true);
		ytf = document.getElementById("ytf-main-div");
		document.getElementById("watch-panel").insertBefore(ytf, document.getElementById("watch-info"));
	}
}

function userlineChanged() {
	// "YouTube Auto Buffer & Auto HD & Remove Ads" (script by JoeSimmons) adds its settings button here.
	// But I remove this section. So if detected, move the button to a different spot where it can be seen.
	userline = document.getElementById("watch-headline-user-info");
	actionArea = document.getElementById("watch-actions");
	if (userline.innerHTML.indexOf("id=\"watch-options\"") > -1) { 
		bufferButton = document.getElementById("watch-options");
		actionArea.insertBefore(bufferButton, document.getElementById("watch-flag").nextSibling);
		bufferButton.setAttribute("class", bufferButton.getAttribute("class") + " yt-uix-tooltip-reverse");
	}
}

function descShowMore() {
	DescPanel.setAttribute("class", DescPanel.getAttribute("class").replace("short","long"));
}
function descShowLess() {
	DescPanel.setAttribute("class", DescPanel.getAttribute("class").replace("long","short"));
}
function descCheckStatus() {
	status = document.getElementById("watch-description").getAttribute("class");
	if (status.indexOf("yt-uix-expander-collapsed") > -1) {
		descShowLess();
	} else {
		descShowMore();
	}
}


function fetchCurrentSettings() { debug("function: fetchCurrentSettings");
	convertOldSettings();
	
	// Set the setting val as the GM val
	for (i in settings) {
		settings[i].val = GM_getValue(settings[i].gmName);
		if ((settings[i].val == undefined) | (settings[i].val == "") | (settings[i].val == null)) {
			// Set to default if nothing is set
			settings[i].val = settings[i].defaultVal;
			GM_setValue(settings[i].gmName, settings[i].defaultVal);
		}
	}

	debug("End function: fetchCurrentSettings");
}

function convertOldSettings() { // Convert any old settings to current format
	debug("function: convertOldSettings");
	
	if (GM_getValue("collapsetags") != undefined) {
		// Old: Collapse tags - "collapsetags"
		// New: Collapse category and tags - "collapsecattags"
		GM_setValue("collapsecattags", GM_getValue("collapsetags"));
		GM_deleteValue("collapsetags");
	}
	
	if (GM_getValue("videoplayer") != undefined) {
		// Old: Video Player - "videoplayer"
		// New: Player Style, Player Colour, Player auto-hide - "playerstyle", "playercolour", "playerhide"
		if (GM_getValue("videoplayer") == 0) {
			GM_setValue("playerstyle", 0);
			GM_setValue("playercolour", 0);
			GM_setValue("playerhide", 0);
		}
		if (GM_getValue("videoplayer") == 3) {
			GM_setValue("playerstyle", 2);
			GM_setValue("playercolour", 1);
			GM_setValue("playerhide", 1);
		}
		if (GM_getValue("videoplayer") == 4) {
			GM_setValue("playerstyle", 1);
			GM_setValue("playercolour", 1);
			GM_setValue("playerhide", 1);
		}
		if (GM_getValue("videoplayer") == 5) {
			GM_setValue("playerstyle", 0);
			GM_setValue("playercolour", 1);
			GM_setValue("playerhide", 0);
		}
		
		GM_deleteValue("videoplayer");
	}
	
	// Old: Remove settings screen - "optionSettingScreen"
	// New: No replacement
	GM_deleteValue("optionSettingScreen"); 	
	
	debug("End function: convertOldSettings");
}




function is3D() {
	theTags = document.getElementById("eow-tags");
	try {
		if (theTags.innerHTML.indexOf("yt3d:enable=true") > -1) {
			return true;
		} 
	} catch (ex) {}
	return false;
}


function toggleMetadata() { debug("Function: toggleMetadata");
	if (metadataVisible) { // Cat&Tags are visible, hide them
		metadataSection.setAttribute("class", "meta-data meta-hidden");
		metadataVisible = false;
	} else { // Cat&Tags are hidden, make them visible
		metadataSection.setAttribute("class", "meta-data");
		metadataVisible = true;
	}
	debug("End function: toggleMetadata");
}



function toggleContentList(e) { debug("Function: toggleContentList");
	heading = e.target;
	while (heading.tagName != "SPAN") {
		heading = heading.parentNode;
	}
	vidList = heading.nextSibling;
	theListClass = vidList.getAttribute("class");
	theHeadClass = heading.getAttribute("class");
	if (theListClass.indexOf("collapsed") > -1) {
		theListClass = theListClass.replace("collapsed", "");
		theHeadClass = theHeadClass.replace("yt-uix-expander-collapsed", "");
	} else {
		theListClass = theListClass + " collapsed";
		theHeadClass = theHeadClass + " yt-uix-expander-collapsed";
	}
	vidList.setAttribute("class", theListClass);
	heading.setAttribute("class", theHeadClass);
	debug("End function: toggleContentList");
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
		alert("\"Better Watch Page\" Script - Debug Mode \n\nDebug Mode has been enabled. \n\nAfter you click \"OK\" on this message, please wait 5 seconds, and another message (like this one) should appear with further instructions. \n\nIf no message appears, please copy the \"debug log\" text from the box in YouTube's header, and paste it in a message on this script's page on Userscripts.org so the script author can help you.\n");
		debugBox = document.createElement("div");
		debugBox.innerHTML = "<h1>\"Better Watch Page\" Debug Log</h1> <textarea id='bwpDebugLog' style='border:4px solid red !important; width:500px !important; height:150px !important;' readonly='readonly'>TESTING</textarea> <br/> <input type='button' value='Reload page without debug' id='bwpDebugDisable' /> - Pressing this button will also remove the debug log, so please copy/paste the debug log before pressing the button.";
		document.body.insertBefore(debugBox, document.body.children[0]);
		document.getElementById("bwpDebugDisable").addEventListener("click", debugDisable, true);
	}
}

function debugModeEnd() {
	if (debugOn) {
		debug("Ending Debug Process");
		alert("\"Better Watch Page\" Script - Debug Mode \n\nDebugging has been completed. \n\nThere is now a \"debug log\" in YouTube's header. Please copy the debug log and paste it in a message on this script's page on Userscripts.org \n\nAfter you've posted the debug log, click \"Reload page without debug\" which will turn off debug mode and will refresh the page.");
		document.getElementById("bwpDebugLog").focus();
		document.getElementById("bwpDebugLog").select();
	}
}

function debug(message) {
	if (debugOn) {
		debugMessages = debugMessages + message + "\n";
		try {
			document.getElementById("bwpDebugLog").value = debugMessages;
		} catch (ex) {
		}
	}
}

function checkForDebugMode() {
	currentPage = window.location.toString();
	if (currentPage.indexOf("debug=1") > -1) {
		return true;
	}
	return false;
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

function checkSettingImageState() { debug("Function: checkSettingImageState");
	if (document.getElementById("configInput_playercolour").getElementsByTagName("option")[1].selected) {
		document.getElementById("vidPlayerImgDark").setAttribute("style", "display:none;");
		document.getElementById("vidPlayerImgLight").setAttribute("style", "");
	} else if (document.getElementById("configInput_playercolour").getElementsByTagName("option")[2].selected) {
		if (!panda) {
			document.getElementById("vidPlayerImgDark").setAttribute("style", "display:none;");
			document.getElementById("vidPlayerImgLight").setAttribute("style", "");
		} else {
			if (setting("optionLeaveDarkBG").val) {
				document.getElementById("vidPlayerImgDark").setAttribute("style", "");
				document.getElementById("vidPlayerImgLight").setAttribute("style", "display:none;");
			} else {
				document.getElementById("vidPlayerImgDark").setAttribute("style", "display:none;");
				document.getElementById("vidPlayerImgLight").setAttribute("style", "");
			}
		}
	} else {
		document.getElementById("vidPlayerImgDark").setAttribute("style", "");
		document.getElementById("vidPlayerImgLight").setAttribute("style", "display:none;");
	}
	debug("End function: checkSettingImageState");
}

function checkSettingButtonStates() { debug("Function: checkSettingButtonStates");
	if (document.getElementById("configInput_moveratingsbar").checked) {
		enableSettingField("configInput_ratingsbarbigger");
	} else {
		disableSettingField("configInput_ratingsbarbigger");
	}
	if (document.getElementById("configInput_starratings").checked) {
		disableSettingField("configInput_moveratingsbar");
		disableSettingField("configInput_ratingsbarbigger");
	} else {
		enableSettingField("configInput_moveratingsbar");
	}
	debug("End function: checkSettingButtonStates");
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
	doReset = confirm("This will reset all your 'Better Watch Page' (BWP) settings, replacing them with the default settings. \nAre you sure you want to reset to the default BWP settings? \n\n'OK' will reset your settings and refresh the page. \n'Cancel' will keep your settings.");
	if (doReset) {
		cssStringReset = "html > body > div {display:none !important;} html > body:before {content:'Resetting script settings and reloading page...' !important; font-size:14px !important; font-weight:bold !important; padding:4px !important;}";
		var head=document.getElementsByTagName('head')[0];
		var styleReset=document.createElement('style');
		styleReset.setAttribute('type','text/css');
		styleReset.appendChild(document.createTextNode(cssStringReset));
		head.appendChild(styleReset);
		// Delete all settings for BWP. Code from the Greasemonkey Wiki.
		var keys = GM_listValues();
		for (var i=0, key=null; key=keys[i]; i++) {
			GM_deleteValue(key);
		}
		location.reload(true);
	} else {
		
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

function disableSettingField(id) {
	document.getElementById(id).disabled = true;
	document.getElementById(id).parentNode.parentNode.setAttribute("settingState", "disabled");
}
function enableSettingField(id) {
	document.getElementById(id).disabled = false;
	document.getElementById(id).parentNode.parentNode.setAttribute("settingState", "");
}

function newTabPage(id) { debug("Function: newTabPage");
	if (id == "configTabGeneral") {
		if (!panda) {
			document.getElementById("configInput_moveratingsbar").addEventListener("click", checkSettingButtonStates, true);
			document.getElementById("configInput_starratings").addEventListener("click", checkSettingButtonStates, true);
			checkSettingButtonStates();	
		} else {
			disableSettingField("configInput_moveratingsbar");
			disableSettingField("configInput_ratingsbarbigger");
			disableSettingField("configInput_starratings");
			disableSettingField("configInput_hidereactions");
		}
	} else if (id == "configTabVideo_Player") {
		document.getElementById("configInput_playercolour").addEventListener("click", checkSettingImageState, true);
		checkSettingImageState()
	} else if (id == "configTabHide_Comments") {
		if (panda) {
			disableSettingField("configInput_commentsHideUploader");
			disableSettingField("configInput_commentsHideTop");
			disableSettingField("configInput_commentsHideVid");
			disableSettingField("configInput_commentsHideAll");
		}
	} else if (id == "configTabCosmic_Panda") {
		if (!panda) {
			disableSettingField("configInput_pandaDarkBG");
		}
	} else if (id == "configTabBWP") {
		document.getElementById("bwpResetSettings").addEventListener("click", resetSettings, true);
	}
	debug("End function: newTabPage");
}

function setUpConfig() { debug("Function: setUpConfig");
	Config.scriptName = "Better Watch Page";
	Config.footerHtml = "<p>Version <B>"+version+"</B> <br/> Check for updates on <a href=\"http://userscripts.org/scripts/show/101753\" target=\"_blank\">this page</a> (new tab)</p> " + pandaSetting;
	Config.reloadOnSave = true;
	Config.activateTabReal = Config.activateTab;
	Config.activateTab = function(id) {Config.activateTabReal(id); newTabPage(id);};
	Config.tabs = {
		"General":{
			html:"<p>General settings. (Click the tabs above for more settings)</p>",
			fields:{
				autoexpand:{
					type:'checkbox',
					label:'Autoexpand description',
					text:'Automatically expand the description panel when the page loads',
				},
				descheightlimit:{
					type:'checkbox',
					label:'Description height limit',
					text:'Give the description scrollbars if it is longer than 400px',
				},
				collapsecattags:{
					type:'checkbox',
					label:'Autohide Category/Tags',
					text:'Automatically hide "Category"/"Tags" in the description',
				},
				removeembed:{
					type:'checkbox',
					label:'Remove URL/Embed',
					text:'Remove the "URL" and "Embed" links from below the description',
				},
				moveratingsbar:{
					type:'checkbox',
					label:'Move ratings bar',
					text:'Move the "like/dislike" bar to the "like/dislike" buttons',
				},
				ratingsbarbigger:{
					type:'checkbox',
					label:'Expand ratings bar',
					text:'Make the "like/dislike" bar bigger',
				},
				starratings:{
					type:'checkbox',
					label:'Star ratings',
					text:'Replace "like/dislike" system with Star ratings',
				},
				hidereactions:{
					type:'checkbox',
					label:'Remove "Reactions"',
					text:'Remove the "Reactions" box',
				},
			}
		},
		"Video Player":{
			html:"<img src='http://img842.imageshack.us/img842/9210/unledhcp.png' id='vidPlayerImgDark' /> <img src='http://img30.imageshack.us/img30/1696/unled2ev.png' id='vidPlayerImgLight' /> <p>Video player settings. If you use HTML5, only the Player Colour setting will be used. Player 4 doesn't work with subtitles/captions and annotations so it will automatically disable them.</p>",
			fields:{
				playerstyle:{
					type:'select',
					label:'Style',
					text:'Older players may not support all Youtube features',
					options:{
						"Default":0,
						"'Player 4'":1,
						"'Player 3'":2,
					},
					value:0,
				},
				playercolour:{
					type:'select',
					label:'Colour',
					text:'(Player 4 will always be light/white)',
					options:{
						"Dark/Black [Default]":0,
						"Light/White":1,
						"Automatic based on background":2,
					},
					value:0,
				},
				playerhide:{
					type:'select',
					label:'Autohide controls',
					text:'(Player 3 will always show controls)',
					options:{
						"Auto-hide controls [Default]":0,
						"Always show controls":1,
					},
					value:0,
				},
			}
		},
		"Hide Comments":{
			html:"<p>Auto-collapse these comments sections.</p>",
			fields:{
				commentsHideUploader:{
					type:'checkbox',
					label:'"Uploader\'s Comments"',
					text:'Auto-collapse "Uploader\'s Comments" section',
				},
				commentsHideTop:{
					type:'checkbox',
					label:'"Top Comments"',
					text:'Auto-collapse "Top Comments" section',
				},
				commentsHideVid:{
					type:'checkbox',
					label:'"Video Responses"',
					text:'Auto-collapse "Video Responses" section',
				},
				commentsHideAll:{
					type:'checkbox',
					label:'"All Comments"',
					text:'Auto-collapse "All Comments" section',
				},
			}
		},
		"Cosmic Panda":{
			html:"<p>These settings are only used on Cosmic Panda. Since Cosmic Panda is still experimental, these settings may change or break at any time.</p>",
			fields:{
				pandaDarkBG:{
					type:'checkbox',
					label:'Dark Background',
					text:'Keep the dark page background',
				},
			}
		},
		"BWP":{
			html:"<p>Version <B>"+version+"</B> <br/> Check for updates on <a href=\"http://userscripts.org/scripts/show/101753\" target=\"_blank\">this page</a> (new tab)</p> " + pandaSetting + "<p> <input type='button' id='bwpResetSettings' value='Reset Script Settings' /> </p>"
		}
	};
	debug("End function: setUpConfig");
}

function defineSettings() { debug("Function: defineSettings");
	function settingObj(js, gm, def, descr, cosmic) {
		this.jsName = js; // Javascript name
		this.gmName = gm; // GM name (for GM_getValue and GM_setValue)
		this.defaultVal = def; // Default value
		this.desc = descr; // Description
		this.cosmicPanda = cosmic; // Cosmic Panda compatible
	}
	settings=[
		// settingObj(Javascript name, GM name, default value, description, panda compatible)
		optionAutoExpand = new settingObj("optionAutoExpand", "autoexpand", false, "Description Panel Autoexpand", true),
		optionDescHeightLimit = new settingObj("optionDescHeightLimit", "descheightlimit", false, "Give description scrollbars if longer than 400px", false),
		optionCollapseCatTags = new settingObj("optionCollapseCatTags", "collapsecattags", false, "Autohide \"Category\" and \"Tags\" when page loads", true),
		optionMoveLikeDislike = new settingObj("optionMoveLikeDislike", "moveratingsbar", false, "Move \"like/dislike\" bar to the \"like/dislike\" buttons", false),
		optionBiggerRatingsBar = new settingObj("optionBiggerRatingsBar", "ratingsbarbigger", false, "Make the \"like/dislike\" bar bigger", false),
		optionStarRatings = new settingObj("optionStarRatings", "starratings", false, "Replace \"like/dislike\" system with Star ratings", false),
		optionRemoveEmbed = new settingObj("optionRemoveEmbed", "removeembed", false, "Remove the 'URL' and 'Embed' links from below the description", true),
		optionHideReactions = new settingObj("optionHideReactions", "hidereactions", false, "Remove the 'Reactions' box", false),
		optionPlayerStyle = new settingObj("optionPlayerStyle", "playerstyle", 0, "Video player style", true),
		optionPlayerColour = new settingObj("optionPlayerColour", "playercolour", 0, "Video player colour", true),
		optionPlayerHide = new settingObj("optionPlayerHide", "playerhide", 0, "Autohide video player controls", true),
		optionComHideUploader = new settingObj("optionComHideUploader", "commentsHideUploader", false, "Auto-collapse \"Uploaders' Comments\" section", false),
		optionComHideTop = new settingObj("optionComHideTop", "commentsHideTop", false, "Auto-collapse \"Top Comments\" section", false),
		optionComHideVid = new settingObj("optionComHideVid", "commentsHideVid", false, "Auto-collapse \"Video Responses\" section", false),
		optionComHideAll = new settingObj("optionComHideAll", "commentsHideAll", false, "Auto-collapse \"All Comments\" section", false),
		optionLeaveDarkBG = new settingObj("optionLeaveDarkBG", "pandaDarkBG", false, "Keep the dark background on Cosmic Panda", true)
	];
	debug("End function: defineSettings");
}


debug("Reached sequential end of script");
debugModeEnd();	
function appendJS(strJsFile) {
	document.body.appendChild(document.createElement('script')).src = strJsFile;
}
function insertSiblingBefore(oldSibling, newSibling) {
	oldSibling.parentNode.insertBefore(newSibling, oldSibling);
}
function getOffset(n) {
    switch(Math.round(n*2)/2){
        case 0: return [-75, -110];
        case 0.5: return [-59, -126];
        case 1: return [-59, -110];
        case 1.5: return [-44, -126];
        case 2: return [-44, -110];
        case 2.5: return [-29, -126];
        case 3: return [-29, -110];
        case 3.5: return [-15, -126];
        case 4: return [-15, -110];
        case 4.5: return [0, -126];
        case 5: return [0, -110];
    }
}
unsafeWindow.jsonCallBack = function jsonCallBack(root) {
	var rating = 0;
	var ratingCount = 0;
	var strRatingHTML;	
	try {
		rating = root.feed.entry[0].gd$rating.average;
		ratingCount  = root.feed.entry[0].gd$rating.numRaters;
	} catch(e) {
		rating = -1;
		ratingCount = -1;
	}
	var sibDiv = document.getElementById("watch-actions");
	if (sibDiv) {
		if ( rating >= 0 ) {
			rating = Math.round(rating*10)/10;
			strRatingHTML = '<div style="float: left; background: transparent url(\'http://s.ytimg.com/yt/img/master_watch5-vfl155666.png\') no-repeat ' + getOffset(rating)[0] + 'px ' + getOffset(rating)[1] + 'px; width: 75px; height: 16px; margin: -2px 5px;"></div>';
			strRatingHTML += " &nbsp; Rating: " + rating + " out of 5 &nbsp; &nbsp; Number of Ratings: " + ratingCount;
		} else {
			strRatingHTML = "unable to find rating";
		}
		var newDiv = document.createElement("div");
		newDiv.style.margin = '0px 0px 5px 0px';
		newDiv.innerHTML = strRatingHTML;
		insertSiblingBefore(sibDiv, newDiv);
	}
}

function parseId(url) {
	var patt = /[?#&]v=([^&]+)/;
	var result = patt.exec(url);
	return (result!=null && result.length == 2) ? result[1] : '';
}

var strLoc = document.location.href;
var video_id = parseId(strLoc);
if ( video_id != "" ) appendJS("http://gdata.youtube.com/feeds/api/videos?v=2&max-results=1&safeSearch=none&q=" + video_id + "&alt=json-in-script&callback=jsonCallBack");

// End of script