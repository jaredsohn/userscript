// ==UserScript==
// @name           YT-MenuButtons
// @namespace      Vivre
// @author         Vivre
// @copyright      2012+, Vivre
// @licence        Free for personal and/or non-commercial use
// @description    Adds further MenuButtons to new Youtube's "Channel" pages
// @version        21.03.13 v09.5
// @website        http://userscripts.org/scripts/show/127319
// @include        http://www.youtube.com/user/*
// @include        http://youtube.com/user/*
// @include        https://www.youtube.com/user/*
// @include        https://youtube.com/user/*
// @include        http://youtube.com/playlist*
// @include        https://youtube.com/playlist*
// @include        http://youtube.com/channel/*
// @include        https://youtube.com/channel/*
// ==/UserScript==
version = "21.03.13 v09.5";


// ************************************
// Main Aim: of this script is to quickly jump to the user-comments by one click 
// from any channel-page, including the 'anonym' playlistings that lack any menu.
// Enhanced by a second button to reach the playlists - 
// besides meant as option for you to apply your own target.
// 
// The 'button-faces' are of two kinds: imaged and textual.
// Below you'll find a mini-settings area where you could readily change them.
// Note: best image-size would be 12x12px, but the css-style is adjusted to work with 16x16px. 
// Likewise needed the 'smiley' a bit to be zoomed.
// 
// enjoy ~ V
// 
// ************************************
// 
// Some code is from Better Channel Page by Takato, 
// used with permission, free for personal non-commercial use.
// http://userscripts.org/scripts/show/112521 
// 
// ************************************
// and please don't miss the other wonderfull yt-script by Takato:
// Better Watch Page -http://userscripts.org/scripts/show/101753 
// ************************************



var head=document.getElementsByTagName('head')[0];
if(!head) return;


// Stop if already running conflicting script
ytPageBody=document.getElementsByTagName('body')[0];
if (ytPageBody.getAttribute("class").indexOf("ytmScript") > -1) {
	alert("\"YT - MenuButtons\" has detected multiple copies of this script running. Please remove those copies. ");
	return;
} else if (ytPageBody.getAttribute("class").indexOf("ytmScript") > -1) {
	alert("\"YT - MenuButtons\" has detected an unexpected script on this page. Maybe this ytm is out-of-date. Please check for an update or report this as a bug.");
	return;
} else {
	ytPageBody.setAttribute("class", ytPageBody.getAttribute("class") + " ytmScript");
}


// *************** settings **************
// exchange img-urls / character code to your preferences

var but_i1 = "http://i.imgur.com/MCJSA.png"  // arrow
var but_i2 = "http://i.imgur.com/V1mzu.png"  // disk
var but_t1 = "&#9786;"  // smiley:  &#9786;  smiley-filled: &#9787;  music-note: &#9835;  clup: &#9827;  sun: &#9788;  arrow-down:  &#9660;
var but_t2 = "&#9824;" // spades - feed
var but_t3 = "&#9834;" // single-note - videos

// to autoexpand all 'more' options, set value 0 (false) to 1 (true)
// display all uploaded video counts AND SUBs amount in channel header: 1 (true), 0 (false)

var autoexpand = 0 ;
var showVids = 1 ;

// activate autoscroll (1/0) -> skip yt-top 
// and choose if always go to header (1/0) -> skip banner 

var autoS = 0;
var goH = 0;

// ****************************************


/* // Check for New Channels mode
newChan = false;
linkStyles = head.getElementsByTagName("link");
count = 0;
while ((count < linkStyles.length) && (!newChan)) {
	if (linkStyles[count].getAttribute("href").indexOf("http://s.ytimg.com/yt/cssbin/www-channels3-v") > -1){
		newChan = true;
	} 
	count++;
} */

// if (!newChan) {
loca = document.location.toString();
if (loca.indexOf("playlist?") > -1) {
//	alert("alert newChan = " + newChan + "\n" + loca);

	// create extra Button to work on playlist-pages
	thumbLink = document.getElementsByClassName("profile-thumb")[0];
	var userNa = thumbLink.toString();
	userNa = userNa.replace(/.*user\//, '');

	try {
	var conButton = document.createElement("li");
	conButton.setAttribute("id", "myButton");
	conButton.setAttribute("class", "stat-entry yt-uix-tooltip");
	conTooltip = userNa+ "'s notes";
	conButton.setAttribute("title", conTooltip);
	conButton.innerHTML = "<a class='my-cl'>" +but_t1+ "</a>";  // &#9786; &#9660;
	var playMenu = document.getElementById("branded-page-header").getElementsByClassName("header-stats")[0].getElementsByTagName("ul")[0];
	playMenu.insertBefore(conButton, playMenu.firstChild);
	conButton.addEventListener("click", gofuu, true);
	} catch (ex) {};
//	doTitle();
	} 
//	else {return};}

function gofuu() {location.replace(thumbLink + "/feed?filter=1")}



// create first (playlist / imaged) Button
try {
var plButton = document.createElement("li");
plButton.setAttribute("id", "myButton");
plButton.setAttribute("class", "yt-uix-tooltip");
plTooltip = "\"GoTo\" playlist";
plButton.setAttribute("title", plTooltip);
plButton.innerHTML = "<a class='no-cl'><img src='" +but_i2+ "'/></a>";
var channelMenu = document.getElementById("channel-header-main").getElementsByClassName("channel-horizontal-menu")[0].getElementsByTagName("ul")[0];
channelMenu.appendChild(plButton);
plButton.addEventListener("click", gofee, true);
} catch (ex) {}

function gofee() {location.replace("http://www.youtube.com" + rootPath + "/videos?view=1")}


// channel-targets (more below):
// playlists: /videos?view=1
// comments: /feed?filter=1
// activity: /feed?filter=2


// create second (comments / textual) Button 
try {
var coButton = document.createElement("li");
coButton.setAttribute("id", "myButton");
coButton.setAttribute("class", "yt-uix-tooltip");
coTooltip = "\"GoTo\" comments";
coButton.setAttribute("title", coTooltip);
coButton.innerHTML = "<a class='my-cl'>" +but_t1+ "</a>";  // &#9786; &#9660;
var channelMenu = document.getElementById("channel-header-main").getElementsByClassName("channel-horizontal-menu")[0].getElementsByTagName("ul")[0];
channelMenu.appendChild(coButton);
coButton.addEventListener("click", gofoo, true);
} catch (ex) {}

function gofoo() {location.replace("http://www.youtube.com" + rootPath + "/feed?filter=1")}

// function gofoo() {alert("rootPath: " + rootPath + "\n" + "rootPathA: " + rootPathA )}


// ++++++++++++++++++++++ NEU 19.06.12

// create third (feeds / textual) Button 
try {
var feButton = document.createElement("li");
feButton.setAttribute("id", "myButton");
feButton.setAttribute("class", "yt-uix-tooltip");
feTooltip = "\"GoTo\" activities";
feButton.setAttribute("title", feTooltip);
feButton.innerHTML = "<a class='my-cl'>" +but_t2+ "</a>";
var channelMenu = document.getElementById("channel-header-main").getElementsByClassName("channel-horizontal-menu")[0].getElementsByTagName("ul")[0];
channelMenu.appendChild(feButton);
feButton.addEventListener("click", gofed, true);
} catch (ex) {}

function gofed() {location.replace("http://www.youtube.com" + rootPath + "/feed?filter=2")}


// create fourth (videos / textual) Button 
try {
var viButton = document.createElement("li");
viButton.setAttribute("id", "myButton");
viButton.setAttribute("class", "yt-uix-tooltip");
viTooltip = "\"GoTo\" videos";     //
viButton.setAttribute("title", viTooltip);
viButton.innerHTML = "<a class='my-cl'>" +but_t3+ "</a>";
var channelMenu = document.getElementById("channel-header-main").getElementsByClassName("channel-horizontal-menu")[0].getElementsByTagName("ul")[0];
channelMenu.appendChild(viButton);
viButton.addEventListener("click", govid, true);
} catch (ex) {}

// Alternative functions to access VideoPage or Uploaded- or Favorite video list
// uncomment that function you'd like to use with this 4th button:

function govid() {location.replace("http://www.youtube.com" + rootPath + "/videos")}
//function govid() {location.replace("http://www.youtube.com/playlist?list=UU" + chanID)}
//function govid() {location.replace("http://www.youtube.com/playlist?list=FL" + chanID)}

// ++++++++++++++++++++++ NEU


// Determine what type of page we are on
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
}
// save root from playlist to work in grabID
if (rootPath.match("playlist")) {
 rootPathP = rootPath;
}


// "/user/" or "/channel/"
rootChannel = false;
rootPrefix = "/user/";
if (rootPath.indexOf("/channel/") == 0) {
	rootChannel = true;
	rootPrefix = "/channel/";
}
if (!rootChannel) {
	rootPathA = rootPath.substring(6); 
} else {
	rootPathA = rootPath.substring(9); 
}
while (rootPathA.indexOf("/") > -1) {
	rootPathA = rootPathA.substring(0, rootPathA.lastIndexOf("/"));
}
rootPath = rootPrefix + rootPathA;


// Figure out current page location
pageLocation = document.location.toString();

// to intercept 'low-cased links'
if (pageLocation == pageLocation.toLowerCase()) {
	var newRP = new RegExp(rootPath, "gi");
	pageLocation = pageLocation.replace(newRP, rootPath);
}

if (pageLocation.indexOf("?") > -1) {
	pageLocation = pageLocation.substring(0, pageLocation.indexOf("?"));
}
if (pageLocation.indexOf("#") > -1) {
	pageLocation = pageLocation.substring(0, pageLocation.indexOf("#"));
}
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
} else {
	pageType = 0;
}


// Feed or Video page
if (pageType == 5) {
	cssString = "";
	cssString = ".my-cl{color:springgreen !important; font-size:1.82em !important; font-style:bold !important; line-height:0.8em; margin-top:-3px !important;}     #myButton a {padding:8px 12px !important;}  #myButton img {width:0px !important; height:0px !important; padding-left:14px !important; padding-bottom:15px !important; background:url(" +but_i2+ ") 16px 0px !important; margin-top:0px !important;}    .yt-user-photo .video-thumb {width: 36px !important; height:36px !important; background: transparent !important;}  .yt-user-name{font-size: 1.4em !important;}  .heading-main {background-color:transparent !important; color:orange !important; margin-bottom: -5px !important;}  .heading-main img {width:36px !important; height:36px !important;}  .yt-tile-visible{margin-top: -15px !important;}  .channel-summary-list{margin-top: 15px !important;}";
	
} else if (pageType == 4) {
	cssString = "";
	cssString = ".my-cl{color:hotpink !important; font-size:1.82em !important; font-style:bold !important; line-height:0.8em; margin-top:-3px !important;}     #myButton a {padding:8px 12px !important;}  #myButton img {width:0px !important; height:0px !important; padding-left:14px !important; padding-bottom:15px !important; background:url(" +but_i1+ ") 16px 0px !important; margin-top:0px !important;}";
	
} else { // or other page
	cssString = "";
	cssString = ".my-cl{color:#ffcc00 !important; font-size:1.82em !important; font-style:bold !important; line-height:0.8em; margin-top:-3px !important;}     #myButton a {padding:8px 12px !important; text-decoration:none !important;}  #myButton img {width:0px !important; height:0px !important; padding-left:14px !important; padding-bottom:15px !important; background:url(" +but_i2+ ") 16px 0px !important; margin-top:0px !important;}";
}

// apply CSS to page
var head=document.getElementsByTagName('head')[0];
if(!head)
	return;
var style=document.createElement('style');
style.setAttribute('type','text/css');
style.appendChild(document.createTextNode(cssString));
head.appendChild(style);



//  routine to autoscroll - skip yt-top / also banner

if (autoS) {
var topM = document.getElementById("branded-page-body-container").getElementsByTagName("map")[0];

	if (topM && goH) { //alert('mit map');
		document.getElementById("branded-page-header-container").scrollIntoView(true);
	} else  { //alert('ohne map');
		document.getElementById("branded-page-body-container").scrollIntoView(true);
	}
}



// routine to autoexpand all 'more' options

if (autoexpand) {noCollapse();};

function noCollapse() {
  var allBut = document.getElementsByTagName('button');
  for (var i=0;i<allBut.length;i++) {
    if(allBut[i].textContent.match(/more/)) { allBut[i].click();
    } //else {alert('But not found');}
  }
};



// determine a users channel ID

(function grabUserID() {

	if (rootPath.match("user")) {
		var userNam = rootPath.replace(/.*user\//, '');
	} else if (rootPath.match("channel")){
		var userNam = rootPath.replace(/.*channel\//, '');
	}
	try {
		if (rootPathP.match(/playlist\?list=[A-Z][A-Z]/)){
			var userNam = rootPathP.replace(/.*playlist\?list\=[A-Z][A-Z]/, '');
		}
	} catch (ex) {};

	var dataPage;
	dataPage = "";

	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://gdata.youtube.com/feeds/api/users/" + userNam, true);
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4) {
			try { 
				dataPage = document.createElement("div");
				dataPage.innerHTML = xmlhttp.responseText;
			userID = dataPage.getElementsByTagName("id");
			userID = userID[0].textContent;
			userID = userID.replace(/http:\/\/gdata.youtube.com\/feeds\/api\/users\//, '');
			window.chanID = userID;		// copy to global variable


//	grab uploaded video amount and insert to header on no-playlist-pages
			vidNum = dataPage.getElementsByTagName("gd:feedLink");
			for(var i = 0 ; i < vidNum.length ; i++) { 
				if (vidNum[i].getAttribute('countHint')) {
				vidNu = vidNum[i].getAttribute('countHint')
				}
			}; 

			subNum = dataPage.getElementsByTagName("yt:statistics");
			for(var i = 0 ; i < subNum.length ; i++) { 
				if (subNum[i].getAttribute('subscriberCount')) {
				subNu = subNum[i].getAttribute('subscriberCount')
				}
			}; 

			if (showVids && !document.location.toString().match("playlist")) {
				var vAll = document.createElement("div");
				vAll.setAttribute("class", "stat-entry"); 
//				vAll.innerHTML = "<span class='stat-value'>" +vidNu + "</span><span class='stat-name'> v&icirc;ds</span>";
				vAll.innerHTML = "<span class='stat-value'>" +vidNu +' &nbsp\; &nbsp\; ' +subNu + "</span><div style='text-align:justify !important;'><span class='stat-name'>&nbsp\;v&icirc;ds <span style='float:right !important;'>subs&nbsp\;</span></span></div>";
				var topMenu = document.getElementById("branded-page-header").getElementsByClassName("upper-right-section")[0].getElementsByTagName("div")[0];
				topMenu.insertBefore(vAll, topMenu.firstChild);
			}


			aNam = dataPage.getElementsByTagName("name");
			aNam = aNam[0].textContent;
			conTooltip = aNam+ "'s notes";
			conButton.setAttribute("title", conTooltip);

				dataPage.innerHTML = "";
			} catch(ex) {}
		}
	}
	xmlhttp.send(null);
})();


debug("Reached end of script");
// End of script
