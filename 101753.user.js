// ==UserScript==
// @id             b77e78bb-5ab5-403b-ae45-7540077fbc64
// @name           Youtube - Better Watch Page
// @namespace      Takato
// @author         Takato
// @copyright      2010+, Takato (http://userscripts.org/users/82358)
// @licence        Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International - Additional conditions apply; http://userscripts.org/scripts/show/101753
// @description    Moves the video description to the right of the video (like it used to be) and makes a few style tweaks to the 'watch' page (video page) to make it more like how it was in 2009 and earlier.
// @icon           http://i.imgur.com/VQ8pr.png http://i.imgur.com/hfj8l.png
// @icon64         http://i.imgur.com/hfj8l.png
// @version        2014.02.28
// @require        https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://userscripts.org/scripts/version/113580/416797.user.js
// @updateURL      http://userscripts.org/scripts/source/101753.meta.js
// @downloadURL    http://userscripts.org/scripts/source/101753.user.js
// @website        http://userscripts.org/scripts/show/101753
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_registerMenuCommand
// @grant          GM_listValues
// @grant          GM_addStyle
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://www.youtube.com/watch*
// @include        https://youtube.com/watch*
// ==/UserScript==
var script = {};
script.version = "2014.02.28";

// SETTINGS -----------------------------
// This script has a settings screen on Youtube (a gear icon below the video)
// You need to set your settings on that screen.
// --------------------------------------

// DEBUG MODE ---------------------------
// To enable Debug Mode add "&debug=1" to the page address ( eg http://youtube.com/watch?v=jNQXAC9IVRw&debug=1 )
// To disable Debug Mode just go to a new page or remove "&debug=1"
// --------------------------------------


// This script is licenced under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (https://creativecommons.org/licenses/by-nc-sa/4.0/) with additional conditions. 
// See http://userscripts.org/scripts/show/101753 for full details of the licence and conditions.



// Everything below this line shouldn't be edited unless you are an advanced user and know what you are doing.

// Defining script properties
script.name = "Better Watch Page";
script.shortname = "BWP";
script.website = "http://userscripts.org/scripts/show/101753";
script.discussion = "http://userscripts.org/scripts/discuss/101753";
script.icon = "http://i.imgur.com/VQ8pr.png";
script.icon64 = "http://i.imgur.com/hfj8l.png";
script.mainCSS = "";
script.mainCSS = "   /* BWP Settings button */  #bwpSettingsButton img {background:url(http://s.ytimg.com/yt/img/master.png) 0px -216px; width:13px ; height:12px;}  #bwpSettingsButton:hover img {background-position: -13px -216px ;}    /* BWP Settings panel */  #ConfigMask {z-index:2000000000;}  #ConfigBodyWrapper {z-index:2000000001 !important;}    /* Page */  body {background:white !important;}  #watch7-sidebar-contents {margin-top:0 !important;}  #watch7-main {}    /* Header */  #yt-masthead-container {border-bottom-color:#CCCCCC;}  #logo-container:not(.doodle) #logo:not(.doodle) {background:url(https://s.ytimg.com/yt/img/master.png) 0px -641px; height:40px; width:98px; margin-top:-5px; margin-bottom:-5px;}  #logo-container .content-region {display:none;}    /* Video title */  #watch-vid-title {margin-bottom:5px; font-size:18px; font-weight:bold; color:black;}  #watch-vid-title h1 {font-size:19px; margin-top:0px; margin-bottom:5px; line-height:24px;}    /* Ads */  #watch-longform-ad, #watch-channel-brand-div {display:none !important;}  #player {background:transparent !important;}    /* Below Video */  #watch7-user-header {padding-bottom:0px;}  #watch7-user-header, #watch7-action-buttons, #watch-discussion {border:none; padding-left:0px; padding-right:0px;}  #watch7-views-info {line-height:48px;}  #watch7-action-panels {border:1px solid #E6E6E6 !important;}  #watch7-action-panel-footer .yt-horizontal-rule {border-top:0px;}  #watch-description-content {min-height:0 !important;}    /* Like/dislike */  #watch-like-dislike-buttons {padding-top:1px !important; position:relative !important;}  #watch-like-dislike-buttons button {margin-right:0px !important; opacity:0.9 !important; z-index:1 !important; position:relative !important;}    #watch-like-dislike-buttons .video-extras-sparkbars {margin:0!important; position:absolute !important; top:0px !important; left:0px !important; width:100% !important; height:100% !important; border-radius:0 0 4px 4px !important; background:black !important;}  #watch-like-dislike-buttons .video-extras-sparkbars .video-extras-sparkbar-likes {background-color:green !important; height:100% !important;}  #watch-like-dislike-buttons .video-extras-sparkbars .video-extras-sparkbar-dislikes {background-color:red !important; height:100% !important; position:relative !important; left:1px !important;}    #watch-like-dislike-buttons .video-extras-likes-dislikes {position:absolute !important; top:-10px !important; left:0px !important; width:100% !important;  color:grey !important; font-size:11px !important; white-space:normal !important;}  #watch-like-dislike-buttons .video-extras-likes-dislikes img {display:none !important;}  #watch-like-dislike-buttons .video-extras-likes-dislikes .likes-count {float:left !important;}  #watch-like-dislike-buttons .video-extras-likes-dislikes .dislikes-count {float:right !important;}    /* Right Side Description */  #watch-channel-vids-div {background:#EEEEEE !important; border:1px solid #CCCCCC !important; margin-bottom:10px !important; width:auto !important; max-height:calc(360px + 30px) !important;  overflow:auto; -moz-box-sizing:border-box !important; box-sizing:border-box !important; font-size:12px !important;}    #watch-channel-vids-div a {color:#0033CC !important;}    #watch-channel-vids-top {padding:0 5px !important; overflow:hidden !important; position:relative !important;}  #watch-channel-icon {float:left !important; margin-top:6px !important; height:46px !important; width:46px !important; background-color:white !important; border:3px double #999999 !important; display:block !important; overflow:hidden !important;}  #watch-channel-icon div {margin-left:-177px !important; float:left !important; text-align:center !important; width:400px !important;}  #watch-channel-icon a {display:block !important;}  #watch-channel-icon img {height:46px !important;}    #watch-channel-stats {width:auto !important; float:left !important; line-height:18px !important; margin-left:8px !important; margin-top:2px !important;}  #watch-channel-stats .contributor {font-weight:bold !important;}  #watch-channel-stats .watch-video-added {color:#333333 !important; margin-right:10px !important;}    #watch-channel-subscribe {float:right !important; margin-top:3px !important; padding-top:3px !important; width:116px !important; position:absolute !important; right:6px !important;}  #watch-channel-subscribe button {background:url(http://s.ytimg.com/yt/img/master.gif) 0px -175px #FED81C !important; border:1px solid #ECC101 !important; font-weight:bold !important; height:23px !important; text-shadow:none !important; font-size:12px !important; float:right !important; padding:0 0px !important;}  #watch-channel-subscribe button:hover {background-position: 0px -200px !important; -moz-transition:none !important; -webkit-transition:none !important; box-shadow:none !important;}  #watch-channel-subscribe button .yt-uix-button-content {position:static !important;}  #watch-channel-subscribe button .yt-uix-button-content span {color:#994800 !important; text-shadow:none !important; }  #watch-channel-subscribe button.hover-enabled:hover .subscribed-hh-label {line-height:0px !important;}  #watch-channel-subscribe .yt-uix-button-icon-wrapper {display:none !important;}    #watch-video-details-toggle div {font-size:11px !important; padding-bottom:1px !important;}  #watch-video-details-toggle a {cursor:pointer !important;}    #watch-video-details {display:block !important; line-height:15px !important;}  #watch-video-details-inner-more,   #watch-description-extra-info {margin-top:4px !important; position:static !important; padding:0 6px 4px !important; overflow:hidden !important;}    #watch-metadata {padding-top:5px !important; overflow:hidden !important; font-size:11px !important;}  #watch-metadata h4 {color:#666666 !important; font-weight:normal !important; font-size:11px !important; display:inline-block !important; margin:0 !important; margin-top:5px !important; cursor:pointer !important; border:0 !important; padding:0 !important;}  #watch-metadata div {display:inline !important;}  #watch-metadata br + br {display:none !important;}  #watch-metadata h4:hover {text-decoration:underline !important;}  #watch-metadata #metadata-label {display:none !important;}  #watch-metadata.meta-hidden h4, #watch-metadata.meta-hidden div, #watch-metadata.meta-hidden br {display:none !important;}  #watch-metadata.meta-hidden #metadata-label {display:inline-block !important;}    #watch-desc-extra-info, #watch-url-embed-wrapper {margin:0px 5px !important; width:auto !important; min-height:0 !important; border-top:1px solid #CCCCCC !important; padding:0 !important;}  #watch-desc-extra-info .watch-extra-info-long .link-list a {display:inline !important;}    #watch-url-embed-wrapper > div {font-size:11px !important; padding:1px 0 0 6px !important; padding-top:5px !important; clear:both !important; overflow:hidden !important;}  #watch-url-embed-wrapper > #watch-embed-div {padding-bottom:3px !important;}  #watch-url-embed-wrapper label {color:#666666 !important; float:left !important; font-size:11px !important; font-weight:bold !important; line-height:18px !important; margin-right:5px !important; min-width:40px !important; text-align:right !important;}  #watch-url-embed-wrapper input {float:left !important; font-size:10px !important; width:240px !important;}  ";

script.settings = new Array();
script.languageStrings = new Array();
script.currentLanguage = "";


// Set up debug mode
script.debugOn = false;
script.debugMessages = "";
if (checkForDebugMode()) {
	script.debugOn = true;
	debugModeStart();
	debug("Starting "+script.shortname+" debug log");
	debug(script.shortname+" version: " + script.version);
	debug("HTML lang: " + document.getElementsByTagName("html")[0].getAttribute("lang"));
	debug("Body class: " + document.getElementsByTagName('body')[0].getAttribute("class"));
	debug("Direction: " + document.getElementsByTagName("html")[0].getAttribute("dir"));
	debug("Page class: " + document.getElementById("page").getAttribute("class"));
}



// Stop this script if this isn't a proper YT video page
debug("Stop script if not proper YT video page");
vidplayer = document.getElementById("player-api");
if (vidplayer == null) {
	debug("This isn't a proper YT video page. The video is unavailable. Now ending script. player-api not found.");
	debugModeEnd();
	return;
}
if (vidplayer.children.length <= 0) {
	debug("This isn't a proper YT video page. The video is unavailable. Now ending script. player-api empty.");
	debugModeEnd();
	return;
}
winLoc = window.location.toString();
if (winLoc.indexOf("watch_editaudio") > -1) {
	debug("This isn't a proper YT video page. Now ending script. watch_editaudio.");
	debugModeEnd();
	return;
}
if (winLoc.indexOf("watch_popup") > -1) {
	debug("This isn't a proper YT video page. Now ending script. watch_popup.");
	debugModeEnd();
	return;
}



// Stop if already running conflicting script
debug("Stop if already running conflicting script");
if ($("body").hasClass("rsdScript")) { // Right Side Description
	alert("\"Better Watch Page\" wants to run but can't because \"Right Side Description\" is already running. Please disable one of them.");
	debug("Script conflict: rsdScript");
	return;
} else if ($("body").hasClass("rsdpScript")) { // Old BWP (Right Side Description Panel)
	alert("\"Better Watch Page\" (BWP) has detected that you have an old version installed called \"Right Side Description Panel\" (RSDP). RSDP has been replaced by BWP, so please remove RSDP. You should then make sure BWP is up-to-date.");
	debug("Script conflict: rsdpScript");
	return;
} else if ($("body").hasClass("bwpScript")) { // Already running BWP
	// alert("\"Better Watch Page\" (BWP) has detected that you have multiple copies of the script running. Please remove one of the copies, and then make sure the remaining one is up-to-date. ");
	debug("Script conflict: bwpScript? Script possibly just updated.");
	return;
} else if ($("body").hasClass("bwpandaScript")) { // BWPanda
	alert("\"Better Watch Page\" (BWP) can't run at the same time as \"Better Watch Panda\" (BWPanda). Please disable one of them.");
	debug("Script conflict: bwpandaScript");
} else {
	$("body").addClass("bwpScript");
}



// Script crash notification
debug("Constructing crash notification");
$(document.createElement("div"))
	.attr("id", "bwpCrash")
	.attr("style", "font-size:12px !important; border:1px solid black !important; padding:2px !important; margin:2px !important; font-weight:bold !important;")
	.html("'" + script.name + "' has crashed. Refresh the page if this is the first time. If it still crashes, try 'debug mode' and <a href='"+script.discussion+"' target='_window'>report</a> the error to the script developer. <a class='debugLink' href='" + window.location + "&debug=1'>Click here</a> to load debug mode (page will reload). Already running debug mode? The debug log should be displayed above.")
	.insertBefore("#page");

if (!script.debugOn) {
	GM_registerMenuCommand("Enable Debug Mode for \"" + script.name + "\"", debugEnable, "D");
}
	
// Insert Main CSS
debug("Inserting main CSS");
insertCSS(script.mainCSS);
debug("Main CSS is now active");

// Set up multiple language support
determineLanguage();
setUpLanguage();

// Settings
setUpConfig();
// Settings button
debug("Making settings button");
$(document.createElement("span"))
	.attr("id", "bwpSettingsButton")
	.append($(document.createElement("button"))
		.attr("class", "action-panel-trigger yt-uix-button yt-uix-button-hh-text yt-uix-button-empty yt-uix-tooltip")
		.attr("onclick", ";return false;")
		.attr("type", "button")
		.attr("role", "button")
		.attr("title", "'"+script.name+"' Script Settings")
		.html("<span class='yt-uix-button-icon-wrapper'><img class='yt-uix-button-icon yt-uix-button-icon-action-panel-bwpsettings' alt='' src='//s.ytimg.com/yt/img/pixel.gif'/><span class='yt-uix-button-valign'></span></span>")
		.click(displaySettings)
		)
	.appendTo("#watch7-secondary-actions");
debug("Settings button done");	


// Remove VEVO branding
debug("Removing VEVO branding if exists");
$("#watch7-container")
	.removeClass("watch-branded")
	.removeClass("watch-branded-banner");
$("#player")
	.attr("style", "")
	.removeClass("watch-branded-banner");
$("#watch7-branded-banner").remove();

// Remove "Card" styling
$("#content").removeClass("yt-card");



// Move title above video
debug("Moving title above video");
$(document.createElement("div"))
	.attr("id", "watch-vid-title")
	.html("<h1>"+$("#watch-headline-title").html()+"</h1>")
	.prependTo("#player");
$("#watch-vid-title span").removeClass("yt-uix-expander-head");
$("#watch7-headline").remove();
debug("Title moved");



// Right-side metadata default values
var userName = "<i>User Unknown</i>";
var userURL = "";
var userImage = "//s.ytimg.com/yt/img/no_videos_140-vfl1fDI7-.png";
var uploadDate = "<i>Date Unknown</i>";
var vidDesc = "<i>no description available</i>";
var vidMetadata = "";
var vidExtraInfo = "";

// Grab right-side metadata values
debug("Grabbing metadata");
userName = $("#watch7-user-header .yt-user-name").text();
userURL = $("#watch7-user-header .yt-user-name").attr("href");
userImage = $("#watch7-user-header .yt-user-photo img").attr("src");
uploadDate = $("#watch-uploader-info #eow-date").text();
vidDesc = $("#eow-description").html();

// Remove watch7 description bits
debug("Removing watch7 description bits");
$("#watch-description") //Un-collapse description
	.removeClass("yt-uix-expander-collapsed")
	.removeClass("yt-uix-button-panel"); 
$("#watch-description-toggle").remove(); //Un-collapse description
$("#eow-description").remove(); // Desc 
$("#watch7-user-header .yt-user-photo").remove(); // Photo
$("#watch7-user-header .yt-user-name").remove(); // Name
$("#watch7-user-header .yt-user-videos").remove(); // Vid count
$("#watch7-user-header .yt-user-separator").remove(); // Separator
$("#watch-uploader-info").remove() // Date



// Create right side description panel
debug("Creating right side description panel");
$(document.createElement("div"))
	.attr("id", "watch-channel-vids-div")
	.insertBefore("#watch7-sidebar .watch-sidebar-section:first");
$("#watch-channel-vids-div")[0].innerHTML = "" +
"<div id='watch-channel-vids-top'>" +
"	<div id='watch-channel-icon' class='user-thumb-medium'>" +
"		<div>" +
"			<a class='url' href='"+userURL+"'>" +
"				<img class='photo' src='"+userImage+"'/>" +
"			</a>" +
"		</div>" +
"	</div>" +
"	<div id='watch-channel-subscribe' class='sub-button'>" +
"   </div>" +
"	<div id='watch-channel-stats'>" +
"		<a class='hLink fn n contributor' href='"+userURL+"'>"+userName+"</a>" +
"		<br/>" +
"		<span class='watch-video-added post-date'>"+uploadDate+"</span>" +
"		<br/>" +
"		<div id='watch-video-details-toggle'>" +
"			<div id='watch-video-details-toggle-more'>" +
//"				(<a class='hLink show-less'>less info</a>)" +
"			</div>" +
"		</div>" +
"	</div>" +
"</div>" +
"<div id='watch-video-details'>" +
"	<div id='watch-video-details-inner'>" +
"		<div id='watch-video-details-inner-more'>" +
"			<div class='watch-video-desc description'>" +
"				<span class='long-desc'>"+vidDesc+"</span>" +
"			</div>" +
"			<div id='watch-metadata' class='meta-data'>" +
"				"+vidMetadata+
"			</div>" +
"		</div>" +
"	</div>" +
"</div>" +
"<ul id='watch-desc-extra-info' class='meta-extra'>" +
"	"+vidExtraInfo+
"</ul>" +
"";


// Move subscription button to right side description
debug("Moving subscribe button to description panel");
$("#watch7-user-header .yt-uix-button-subscription-container button.yt-uix-subscription-button")
	.appendTo("#watch-channel-subscribe");
$("#watch7-user-header .yt-uix-button-subscription-container").remove();

// Move 'Verified name' to right side description
debug("Moving 'verified name' to description panel");
$("#watch7-user-header .yt-user-name-icon-verified")
	.insertAfter("#watch-channel-stats a.contributor");


// Remove "watch-desc-extra-info" if empty
debug("Remove 'watch-desc-extra-info' empty");
watchExtraInfo = $("#watch-desc-extra-info");
try {
	if (watchExtraInfo[0].children.length < 1) {
		debug("It is empty, remove it.");
		watchExtraInfo.remove();
	}
}catch(ex){}




// Likes/dislikes
debug("Likes/dislikes");
$("#watch-like-dislike-buttons").appendTo("#watch7-user-header");
$("#watch-like-dislike-buttons button")
	.removeClass("yt-uix-button-text")
	.addClass("yt-uix-button-default")
	.addClass("yt-uix-tooltip-reverse");
$("#watch7-views-info .video-extras-sparkbars").appendTo("#watch-like-dislike-buttons");
$("#watch7-views-info .video-extras-likes-dislikes").appendTo("#watch-like-dislike-buttons");




// Remove Crash notice
debug("Removing crash notice");
insertCSS("#bwpCrash {display:none !important;} ");



// ---------------------------------------
// FUNCTIONS -----------------------------
// ---------------------------------------





function determineLanguage() { debug("Function: determineLanguage");
	searchHref = $("head link[rel='search'][type='application/opensearchdescription+xml']").attr("href");
	currentLanguage = searchHref.substring(searchHref.length-5);
	debug("User language: " + currentLanguage);
	debug("End function: determineLanguage");
}

function setUpLanguage() { debug("Function: setUpLanguage");
	// Default strings match English (UK) [en_gb] and mostly match English (US) [en_us]
	// Other languages with some string support:
	//    de_DE   Deutsch
	//    pt_PT   Português
	//    ru_RU   Русский
	languageStrings={
		"\"Better Watch Page\" Script Settings":{
			"pt_PT":"Opções do Script \"Better Watch Page\""
		},
		"Expand Player Size":{
			"pt_PT":"Expandir Tamanho do Reprodutor"
		},
		"Shrink Player Size":{
			"pt_PT":"Comprimir Tamanho do Reprodutor"
		},
		"Popout Video":{
			"pt_PT":"Ver vídeo numa janela nova"
		},
		"More from ":{
			"pt_PT":"Mais de "
		},
		"less info":{
			"pt_PT":"menos info"
		},
		"more info":{
			"pt_PT":"mais info"
		},
		"views":{
			"de_DE":"Aufrufe",
			"pt_PT":"Visualizações"
		},
		" ratings":{
			"pt_PT":" classificações"
		},
		"Favourite":{
			"en_US":"favorite"
		}		
	};
	debug("End function: setUpLanguage");
}

function lang(theString) {
	toReturn = languageStrings[theString][currentLanguage];
	if ((toReturn == null) | (toReturn == undefined) | (toReturn == "")) {
		toReturn = theString;
	}
	return toReturn;
}


function insertCSS(cssToInsert) {
	var head=document.getElementsByTagName('head')[0];
	if(!head)
		return;
	var style=document.createElement('style');
	style.setAttribute('type','text/css');
	style.appendChild(document.createTextNode(cssToInsert));
	head.appendChild(style);
}


function setPlayerSize() { // Set the player size
	debug("Function: setPlayerSize");
	if ($("#watch7-container").hasClass("watch-wide")) { // Wide player
		$("#watch7-container")
			.addClass("watch-medium")
			.removeClass("watch-large");
		$("#videoSizeButton button")
			.attr("title", lang("Shrink Player Size"))
			.attr("data-tooltip-text", lang("Shrink Player Size"));
	} else { // Small player
		$("#watch7-container")
			.removeClass("watch-medium")
			.removeClass("watch-large");
		$("#videoSizeButton button")
			.attr("title", lang("Expand Player Size"))
			.attr("data-tooltip-text", lang("Expand Player Size"));
	}
	debug("End function: setPlayerSize");
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
	if (script.debugOn) {
		alert("\""+script.name+"\" Script - Debug Mode \n\nDebug Mode has been enabled. \n\nAfter you click \"OK\" on this message, please wait 5 seconds and another message (like this one) should appear with further instructions. \n\nIf no message appears please copy the \"debug log\" text from the box in YouTube's header, and paste it in a message on this script's page on Userscripts.org so the script author can help you.\n");
		debugBox = document.createElement("div");
		debugBox.innerHTML = "<h1>\""+script.name+"\" Debug Log</h1> <textarea id='bwpDebugLog' style='border:4px solid red !important; width:500px !important; height:150px !important;' readonly='readonly'>DEBUG LOG</textarea> <br/> <input type='button' value='Reload page without debug' id='bwpDebugDisable' /> - Pressing this button will also remove the debug log, so please copy/paste the debug log before pressing the button.";
		document.body.insertBefore(debugBox, document.body.children[0]);
		document.getElementById("bwpDebugDisable").addEventListener("click", debugDisable, true);
	}
}

function debugModeEnd() {
	if (script.debugOn) {
		debug("Ending Debug Process");
		alert("\""+script.name+"\" Script - Debug Mode \n\nDebugging has been completed. \n\nThere is now a \"debug log\" in YouTube's header. Please copy the debug log and paste it in a message on this script's page on Userscripts.org \n\nAfter you've posted the debug log, click \"Reload page without debug\" which will turn off debug mode and will reload the page.");
		document.getElementById("bwpDebugLog").focus();
		document.getElementById("bwpDebugLog").select();
	}
}

function debug(message) {
	if (script.debugOn) {
		script.debugMessages = script.debugMessages + message + "\n";
		try {
			document.getElementById("bwpDebugLog").value = script.debugMessages;
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
function setEmbedVisibility(embedVisible) { debug("Function: setEmbedVisibility");
	// This function has been copied and modified from Mindeye's YousableTubeFix script.
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


function displaySettings() { debug("Function: displaySettings");
	setEmbedVisibility(false);
	Config.show(hideSettings);
	debug("End function: displaySettings");
}

function hideSettings() { debug("Function: hideSettings");
	setEmbedVisibility(true);
	debug("End function: hideSettings");
}





function setUpConfig() { debug("Function: setUpConfig");
	Config.scriptName = script.name;
	Config.footerHtml = "<p>Version <B>"+script.version+"</B> <br/> Check for updates via your browser's addon update function or on <a href=\""+script.website+"\" target=\"_blank\">this page</a> (new tab)</p> ";
	Config.reloadOnSave = false;
	Config.tabs = {
		"BWP":{
			html:"<p>Version <B>"+script.version+"</B> <br/> Check for updates via your browser's addon update function or on <a href=\""+script.website+"\" target=\"_blank\">this page</a> (new tab)</p> <p> <input type='button' id='bwpResetSettings' value='Reset Script Settings' /> </p> <p>The following scripts are recommended to be used alongside BWP for a better Youtube experience.<br/><ul><li><a href='http://userscripts.org/scripts/show/13333' target='_blank'>YousableTubeFix</a> by Mindeye - Has options for using a light/white video player</li><li><a href='http://userscripts.org/scripts/show/153606' target='_blank'>Youtube Center Aligned</a> by aznplucky - Center aligns Youtube</li></ul></p>"
		}
	};
	debug("End function: setUpConfig");
}






debug("Reached sequential end of script");
debugModeEnd();	
// End of script