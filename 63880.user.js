// ==UserScript==
// @name          YouTube HD Ultimate
// @description   The best of the hundreds of YouTube scripts, because we make it. Updated all the time, by me and you! Your favorite YouTube script is better than ever!
// @include       http://www.youtube.com/watch?*
// @namespace     #aVg
// @version       1.1.6_opera
// ==/UserScript==
// Do not fiddle with the script for any reason! If you're having problems, use the various contact options!

(function() // GreaseMonkey => "executed when the page completes loading, after creating the DOM for the page, but before running any onload handlers that have been defined." ; Opera handle this code too because filename ends with ".user.js"
{
if(!window.opera) document = unsafeWindow.document;
var player=$("movie_player"),
	optionBox,
	toggler,
	init = false,
	head=$("watch-vid-title"),
	thisVer="1.1.6";
document.title = "YT | " +document.title.substring(10);
var opts  = {
	useHD : new Array("Use HD", true, "Select this option to choose whether you want HD or not. It's a good idea to turn this off if your computer is slow. If you do have a slow computer, you can still download the \"hd mp4\" version, and play it from your computer's media player, which may be desirably faster."),
	autoplay : new Array("Autoplay", true, "By default, YouTube autoplays all of it's videos."),
	autobuffer : new Array("Autobuffer", false, "If you have a slow computer and/or a slow connection, turn this on to let the video download while it's paused, then you can hit the play button."),
	usecolor : new Array("Enable colors", true, "Choose this option if you want to enable custom colors."),
	c1 : new Array("Color 1", "000000", "The background color of the player bar. Must be in HEX format. (Six hex digits only)."),
	c2 : new Array("Color 2", "FFFFFF", "The foreground color of the player bar. Must be in HEX format. (Six hex digits only)."),
	hidenotes : new Array("Hide annotations", true, "Annotations are those annoying notes some users leave that say \"visit my site!\" or \"make sure to watch in HD!!\" in the video. But we already know that, right? You can turn them off if you want."),
	hideRate : new Array("Hide Warnings", false, "Choose this if you want to hide warnings about language, sex or violence."),
	fit : new Array("Fit to window", true, "When viewing videos in HIGH QUALITY or HIGH DEFINITION, the player will size itself to the window."),
	bigMode : new Array("Big mode", true, "Have a nice monitor? Like seeing things big? Turn this on. Ensures proper aspect ratio, and maximum viewing in the comfort of your browser."),
	min : new Array("Mini mode", false, "For those who use YouTube mainly for music, turn this on."),
	true720p : new Array("True 720p", false, "Turn this on for all HD videos to load in \"true\" 720p. Yeah, it's a pretty lame option on most computers."),
	useVol : new Array("Enabled Fixed Volume", false, "This will enabled the fixed volume feature (script sets volume to custom amount at the start of every video)."),
	vol : new Array("Volume", "50", "The volume, as an integer, from 0 to 100."),
	snapBack : new Array("Snap back", true, "Makes the video smaller if you turn off HD/HQ mid-video using the player's button."),
	loop : new Array("Loop", false, "Are you a loopy fanatic? Turn this on! Goes well if you watch a lot of AMV's I hear."),
	autoCinema : new Array("Automatic Cinema", false, "Like YouTube \"Comfort in Black\", this darkens everything except for the video player. Perfectly mimics YouTube's native cinema mode."),
	utterBlack : new Array("Total Black", false, "This will make cinema mode opaque black, as opposed to trasparent black."),
	jumpToPlayer : new Array("Jump to player", true, "Especially with big mode on, this is nice. It scrolls down to the video for you."),
	collapse : new Array("Collapse everything", true, "For those who prefer having a short scrollbar, this automatically hides every \"panel\" when you open a video.")
};

if(window.opera)
{
	// Firebug <-> Opera
	window.console =
	{
		log: window.opera.postError,
		debug: window.opera.postError,
		info: window.opera.postError,
		warn: window.opera.postError,
		error: window.opera.postError,
		trace: window.opera.postError
	};
	GM_log = window.opera.postError;	
	unsafeWindow = window; // global
	
	//------------------	
	// For following functions, See : http://www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js
	
	function GM_addStyle(css) {
		var NSURI = 'http://www.w3.org/1999/xhtml';
		var hashead = document.getElementsByTagName('head')[0];
		var parentel = hashead || document.documentElement;
		var newElement = document.createElementNS(NSURI,'link');
		newElement.setAttributeNS(NSURI,'rel','stylesheet');
		newElement.setAttributeNS(NSURI,'type','text/css');
		newElement.setAttributeNS(NSURI,'href','data:text/css,'+encodeURIComponent(css));
		if( hashead ) {
			parentel.appendChild(newElement);
		} else {
			parentel.insertBefore(newElement,parentel.firstChild);
		}
	}
}

var config = unsafeWindow.yt.config_, swfArgs=config.SWF_ARGS; // after opera init block

var prev = new Image();
prev.src = "http://img.youtube.com/vi/"+swfArgs.video_id+"/1.jpg";

function toggleWidePlayer(which)
{
	var A = $("baseDiv");
	if(which) {
		if(A.className.indexOf("watch-wide-mode")==-1)
			A.className += " watch-wide-mode";
	} else A.className = A.className.replace("watch-wide-mode", "");
}
function update(resp) {
	GM_xmlhttpRequest({
		url : "http://userscripts.org/scripts/source/31864.user.js?",
		method : "GET",
		onload : function(A) {
			if(A.responseText.match(/\/\/ @version       (\S+)/) == null) return;
			if (RegExp.$1 != thisVer) {
				if(confirm("There is a new version of YouTube HD Ultimate.\n\nInstall it?"))
					location.href = "http://userscripts.org/scripts/source/31864.user.js";
			} else if(resp) alert("There is no new version at this time.");
		}
	});
}
var now=new Date().getTime();
if(!window.opera) {
	if ((GM_getValue("lastCheck"), now) <= (now - 86400000)) {
		GM_setValue("lastCheck", now);
		update(false);
	}
}
function Element(A, B, C) {
	A = document.createElement(A);
	if(B) for(var b in B) {
		var cur=B[b];
		if(b.indexOf("on")==0) A.addEventListener(b.substring(2), cur, false);
		else if(b=="style") A.setAttribute("style", B[b]);
		else A[b]=B[b];
	}
	if(C) for(var c in C){
		A.appendChild(C[c]);
	}
	return A;
}
function center() {player.style.marginLeft = Math.round(player.parentNode.offsetWidth / 2 - player.offsetWidth / 2) + "px";}
function $(A) {return document.getElementById(A);}
function fitToWindow() {
	player.style.width = document.body.offsetWidth + "px";
	player.style.height = (window.innerHeight - 53) + "px";
	center();
}
function fitBig() {
	var ratio = (config.IS_HD_AVAILABLE || prev.width < 130) ? 1.77 : 1.33;
	fitToWindow();
	var w = Math.round((player.offsetHeight - 25) * ratio);
	if (w > player.parentNode.offsetWidth) {
		w = player.parentNode.offsetWidth;
		player.style.height = Math.round(w / ratio + 25) + "px";
	}
	player.style.width = w + "px";
	center();
}
if(player.PercentLoaded()!=100) player.src += "";
GM_addStyle("#vidtools > * {\
	position : relative;\
	z-index : 6 !important;\
	float:right;\
}\
.yt-menulink-menu {z-index:700 !important}\
.yt-menulink {z-index:4 !important}\
#light-switch {width:17px;height:25px;}\
#watch-longform-shade {z-index:5!important}\
.loop {\
	width: 11px;height: 15px;\
	margin-left: 3px;\
	margin-right: 3px;\
	margin-top: 4px;\
}\
.loop.on {\
	background-image: url(data:image/gif,GIF89a%10%00%10%00%F4%00%00%FF%F6%F6%FF%00%00%FE%F0%F0%FE66%FE%7F%7F%FE%05%05%FE%24%24%FE%CF%CF%FE%A2%A2%FE%15%15%FErr%FEbb%FE%DC%DC%FE%93%93%FE%BF%BF%FEEE%FESS%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%21%FF%0BNETSCAPE2.0%03%01%00%00%00%21%FE%1ACreated%20with%20ajaxload.info%00%21%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05P%20%20%8Edi%9E%A50%14l%21%2A%84%60%AA%AD%98%14%C6%91%1A5%80%F0%06%D9%88%80%5B%8D%04%3C%02i%85P%91%10%85%01%89%85%A2%8E%AC%29%2C%80IZ%F8%A2%24b%F0%BAH%92%908%84%A85%26%1Dx%895k%20%3C%13%14%F2y%1D%C5%EF%8FB%00%21%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05h%20%20%8AG%D2%8Ch%2A%1A%C5%E0%A8%A8%40%24E%7D%C0%C0%C1%D6%C5%02%08%8C%94%80eh%14%12%0C%C1%C0%20%40%11%0AL%C0%80%F0cQG%83%02B%B4%E5%B6P5%98%20%3C%AA5UdQ%B6%2B%E8%22%BE%A3g%940%A8%16%AE%A2%A1%8FAk%10%CF%23A%00%0B%3CP70%07%3C%09%04%800%0EY%068%2A%0D%09%87%23%21%00%21%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05%60%20%20%8E%23%F3%90%28%DA%14H%2A%0A%C4P%14%09-%A4%871%EF3%81%0A%3AC%CB1K%B4H%84%82%E1%06H.%98%24%D9%B1y%00%08%10%BE%D1%CC%05%D8j%0B.%81WD%40%DC%0EY%00%A20H%09%16%85%2C0%8EB%D4%0A%8Ek%10J%E6%ED%0CU%3F5w%03%04%7C%24k%0D%5C%29%0F%0C%8B%21%00%21%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05R%20%20%8Edi%9E%80%20%94%021%14%C5%40%A8%83C%1E%06%AC%17%C6k%8B%82%9C%01%21B%E4%60%3F%00%81%B7%02%BE%90%23E%828zBQX%80c%BBm%A2v%0B%12%22%A1%20%E9%C2%A3%60%81%60%86%0DUF%A6%19r%DC%19%0E%A5p%EB%29%F3f%FF%80%21%00%21%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05%60%20%20%8Edi%9E%A8%40%0CE1%10%C2%C9%18m%5D%18%C7%B9%18H%8C%D0%86%D8%28%07%10%8A%044%02%20%E7%28%2C%18%A6F%21aH%00XS%98%08%81m5%A4%B5%01bDH%B4%06%00%AA%B9ab%2C%0A%8E%25%80p3%16c%C4%23%B0%27%F8%0D%EC%22%07467P%26%2AX%2F%80%28%8C%8D%24%21%00%21%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%05_%20%20%8Edi%9E%A8H%14%C5%40%08%A6%404%00%C2%B2%C6A%22I%91%08%B0%9A%A1%60%08%3En%85%05I0%24%88%18%8D%1EK7%B2%0DH%2C%07%C1%89-t%83%2A%82%83E%1A%14%10%A4%C3-%D1%60%A8%88%60%C0%02%F9%101%89%08%18%B0%97%40%8F%0EC7h%08%2F1%04f%05%5C%29%8B%8C%26%21%00%3B%00%00%00%00%00%00%00%00%00);\
}\
.loop.off {\
	background-image: url(data:image/gif,GIF89a%10%00%10%00%F7%00%00%00%00%00%80%00%00%00%80%00%80%80%00%00%00%80%80%00%80%00%80%80%80%80%80%C0%C0%C0%FF%00%00%00%FF%00%FF%FF%00%00%00%FF%FF%00%FF%00%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%003%00%00f%00%00%99%00%00%CC%00%00%FF%003%00%0033%003f%003%99%003%CC%003%FF%00f%00%00f3%00ff%00f%99%00f%CC%00f%FF%00%99%00%00%993%00%99f%00%99%99%00%99%CC%00%99%FF%00%CC%00%00%CC3%00%CCf%00%CC%99%00%CC%CC%00%CC%FF%00%FF%00%00%FF3%00%FFf%00%FF%99%00%FF%CC%00%FF%FF3%00%003%0033%00f3%00%993%00%CC3%00%FF33%0033333f33%9933%CC33%FF3f%003f33ff3f%993f%CC3f%FF3%99%003%9933%99f3%99%993%99%CC3%99%FF3%CC%003%CC33%CCf3%CC%993%CC%CC3%CC%FF3%FF%003%FF33%FFf3%FF%993%FF%CC3%FF%FFf%00%00f%003f%00ff%00%99f%00%CCf%00%FFf3%00f33f3ff3%99f3%CCf3%FFff%00ff3fffff%99ff%CCff%FFf%99%00f%993f%99ff%99%99f%99%CCf%99%FFf%CC%00f%CC3f%CCff%CC%99f%CC%CCf%CC%FFf%FF%00f%FF3f%FFff%FF%99f%FF%CCf%FF%FF%99%00%00%99%003%99%00f%99%00%99%99%00%CC%99%00%FF%993%00%9933%993f%993%99%993%CC%993%FF%99f%00%99f3%99ff%99f%99%99f%CC%99f%FF%99%99%00%99%993%99%99f%99%99%99%99%99%CC%99%99%FF%99%CC%00%99%CC3%99%CCf%99%CC%99%99%CC%CC%99%CC%FF%99%FF%00%99%FF3%99%FFf%99%FF%99%99%FF%CC%99%FF%FF%CC%00%00%CC%003%CC%00f%CC%00%99%CC%00%CC%CC%00%FF%CC3%00%CC33%CC3f%CC3%99%CC3%CC%CC3%FF%CCf%00%CCf3%CCff%CCf%99%CCf%CC%CCf%FF%CC%99%00%CC%993%CC%99f%CC%99%99%CC%99%CC%CC%99%FF%CC%CC%00%CC%CC3%CC%CCf%CC%CC%99%CC%CC%CC%CC%CC%FF%CC%FF%00%CC%FF3%CC%FFf%CC%FF%99%CC%FF%CC%CC%FF%FF%FF%00%00%FF%003%FF%00f%FF%00%99%FF%00%CC%FF%00%FF%FF3%00%FF33%FF3f%FF3%99%FF3%CC%FF3%FF%FFf%00%FFf3%FFff%FFf%99%FFf%CC%FFf%FF%FF%99%00%FF%993%FF%99f%FF%99%99%FF%99%CC%FF%99%FF%FF%CC%00%FF%CC3%FF%CCf%FF%CC%99%FF%CC%CC%FF%CC%FF%FF%FF%00%FF%FF3%FF%FFf%FF%FF%99%FF%FF%CC%FF%FF%FF%21%F9%04%01%00%00%10%00%2C%00%00%00%00%10%00%10%00%00%08y%00%FF%09%1CH%B0%E0%40%7C%07%13%0AD%28p%1C%B7%87%DC%04%AA%8BW%10%21%BEq%B8%1E%FE%C3%F7p%1C%B5%8D%04%C79%8C%F8%2F%9E%C3q%05%D5u%24%B9%D1a%3C%86%FF%5C%5E%24%18%8F%1BJ%90%0F-%82D%98s%A0F%831Y%06%A5%C8P%1D%BE%9A%E3%60%22%85%C9M%9DCu%0B%5B%E2%1AG%14%22.%90%07O%0A%84%08%95%A0%C5x%5D%21%DA%84%09%14%A8%CE%B3%3BA%06%04%00%3B);\
}\
.light {background-position:0 -592px}\
.light:hover {background-position:-17px -592px!important;}\
.dark {background-position:-34px -592px}\
.dark:hover {background-position:-51px -592px!important;}\
.avgDL {\
	float: right;\
	padding-bottom: 3px;padding-top: 3px;\
}\
#version {\
	float : right;\
	padding-left: 7px !important;padding-right: 3px;\
	background-color: white;\
	color: black;\
	-moz-border-radius-bottomright : 5px;-moz-border-radius-bottomleft : 3px;\
	border : solid grey 1px;\
}\
#opts {\
	background-color: black;\
	color : white;\
	position : absolute;\
	padding : 20px;\
	top : 54px;left : 25%;right : 25%;\
	-moz-border-radius : 12px;\
	border : 5px outset red;\
	z-index : 100000;\
}\
#myLinks {\
	float : right;\
	margin-top : -435px;\
	margin-right: 17px;\
	font-size: 16px;\
}\
#myLinks a {\
	color : white;\
	text-decoration: underline;\
	display: block;\
	font-size: 12px;\
}\
#opts input {\
	margin-left: 3px;\
	padding-left: 4px;\
}\
#opts label {\
	display : block;\
	padding : 2px;\
}\
#opts label:hover {text-shadow: 1px 2px 1px yellow !important;}\
#opts label.on {\
	font-style : italic;\
	text-shadow : 1px 0 4px white;\
	color : white;\
}\
a {cursor:pointer;}\
#opts h1 {\
	background-color: red;\
	-moz-border-radius: 6px;\
	padding : 4px;\
	text-shadow: 1px -1px 4px white;\
}\
.watch-wide-mode, #watch-this-vid, #watch-player-div {padding-left:0!important}\
#opts p {\
	padding-left: 20px;\
	font-family : Calibri, Comic Sans MS;\
}");
optionBox = new Element("div", {
	innerHTML : "<h1>YouTube HD Ultimate Options</h1><span id=\"version\">v "+thisVer+"</span><p>Settings, if changed, will be applied on the next video. Roll over an option to find out more about it.</p>",
	style : "display : none",
	id : "opts"
});
for(var opt in opts) {
	var val = null;
	if(!window.opera) { // using default value for now
		val = GM_getValue(opt);
	}
	if (val == null) val = opts[opt][1];
	var chk = typeof val != "string";
	var a = new Element("input", {
		type : chk ? "checkbox" : "text",
		name : opt
	});
	if (chk) a.addEventListener("click", function() {this.parentNode.className = this.checked ? "on" : "";}, false);
	a[chk ? "checked" : "value"]=val;
	var s=document.createElement("label");
	if (chk && val) s.className = "on";
	if(chk) {
		s.appendChild(a);
		s.appendChild(document.createTextNode(opts[opt][0]));
	} else {
		s.appendChild(document.createTextNode(opts[opt][0]));
		s.appendChild(a);
	}
	s.title=opts[opt][2];
	optionBox.appendChild(s);
	opts[opt]=val;
}
optionBox.appendChild(new Element("a", {
	className : "yt-button yt-button-primary",
	style : "float:right;margin-top:-25px;",
	onclick : function(E) {
		E.preventDefault();
		toggler.textContent="Show Ultimate Options";
		player.style.marginTop = "0";
		if(player.getPlayerState()==2) player.playVideo();
		var newOpts=optionBox.getElementsByTagName("input"), newOpt;
		for(var i=newOpts.length-1; i>=0; --i) {
			newOpt=newOpts[i];
			GM_setValue(newOpt.name, newOpt[newOpt.type=="text" ? "value" : "checked"]);
		}
		optionBox.style.display="none";
	}
	}, new Array(
		new Element("span", {
			textContent : "Save Options"
		})
	)
));
var linkbox;
optionBox.appendChild(linkbox=new Element("span",
	{
		id : "myLinks"
	}, new Array(
		document.createTextNode("Script links: ")
	)
));
var sLinks = {
	"homepage" : "http://userscripts.org/scripts/show/31864",
	"official" : "http://code.google.com/p/youtubehd/",
	"author" : "http://userscripts.org/users/avindra",
	"e-mail" : "mailto:aavindraa@gmail.com",
	"forums" : "http://userscripts.org/scripts/discuss/31864",
	"wiki + F1" : "http://code.google.com/p/youtubehd/wiki/mainPage",
	"open bugs + requests" : "http://code.google.com/p/youtubehd/issues/list",
	"all bugs + requests" : "http://code.google.com/p/youtubehd/issues/list?can=1",
	"new bug" : "http://code.google.com/p/youtubehd/issues/entry",
	"new request" : "http://code.google.com/p/youtubehd/issues/entry?template=Feature%20Request"
};
for(var link in sLinks) {
	linkbox.appendChild(new Element("a", {
		textContent : link,
		href : sLinks[link]
	}));
}
linkbox.appendChild(new Element("a", {
	textContent : "check for update",
	onclick : function(E) {
		E.preventDefault();
		update(true);
	}
}));
linkbox.appendChild(new Element("a", {
	textContent : "debugString",
	title : "This is for easing development. Don't worry about it unless Avindra tells you to use it.",
	onclick : function(E) {
		E.preventDefault();
		for(var arg in swfArgs) if(arg.indexOf("rv")==0) delete swfArgs[arg];
		opts.swfArgs = swfArgs;
		opts.ver = thisVer;
		opts.ua = navigator.userAgent;
		prompt("Here is your debugString:", opts.toSource());
	}
}));
document.body.appendChild(optionBox);
$("masthead-nav-user").appendChild(toggler=new Element("a", {
	style : "padding: 4px; background-color: blue; color: white; -moz-border-radius: 8px;",
	textContent : "Show Ultimate Options",
	onclick : function(E) {
		E.preventDefault();
		var p = player.getPlayerState();
		if(optionBox.style.display=="none") {
			if(p==1) player.pauseVideo();
			optionBox.style.display="inline";
			player.style.marginTop= optionBox.offsetHeight + "px";
			this.textContent="Hide Ultimate Options";
		} else {
			if(p==2) player.playVideo();
			player.style.marginTop = "0";
			this.textContent="Show Ultimate Options";
			optionBox.style.display="none";
		}
	}
}));
if(!opts.bigMode && (opts.fit || opts.true720p)) opts.bigMode = true;
if(opts.jumpToPlayer) head.scrollIntoView(true);
unsafeWindow.stateChanged=function(state) {
	if (state==0) {
		if (unsafeWindow.watchIsPlayingAll) unsafeWindow.goToNext();
		else if(opts.loop) {
			player.seekTo(0, true);
			player.playVideo();
		}
	} else if(!init && state==1) {
		init = true;
		if(opts.autobuffer) player.pauseVideo();
	}
};
unsafeWindow.onYouTubePlayerReady=function(A) {
	if (player.getAttribute("greased")!="true") return;
	if(!player.isMuted) {
		player.src += "";
		return;
	}
	if(opts.useVol && opts.vol.match(/(\d+)/)) player.setVolume(RegExp.$1);
	player.addEventListener("onStateChange","stateChanged");
	unsafeWindow.g_YouTubePlayerIsReady = true;
	if(opts.snapBack) {
		unsafeWindow.newFmt=function(fmt) {
			var isBig = fmt == "large";
			toggleWidePlayer(isBig);
			if(isBig) {
				fitToWindow();
				if(opts.fit) unsafeWindow.onresize = fitToWindow;
				else if(opts.bigMode) fitBig();
			} else {
				player.style.marginLeft="0";
				player.style.width = "640px";
				player.style.height = "385px";
				unsafeWindow.onresize = null;
			}
		};
		player.addEventListener("onPlaybackQualityChange","newFmt");
	}
	if(unsafeWindow.toggleLights && opts.autoCinema) unsafeWindow.toggleLights(true);
};
if(opts.usecolor) {
	swfArgs.color1="0x"+opts.c1;
	swfArgs.color2="0x"+opts.c2;
}
if(opts.hidenotes) swfArgs.iv_load_policy="3";
if(unsafeWindow.watchIsPlayingAll) swfArgs.playnext = "1";
if(!opts.autoplay && !opts.autobuffer) {
	swfArgs.autoplay="0";
	swfArgs.iurl = "http://img.youtube.com/vi/"+swfArgs.video_id+"/hqdefault.jpg";
}
else if(opts.autoplay) swfArgs.autoplay="1";
var ads=new Array("infringe","invideo", "ctb", "vq", "interstitial", "watermark");
if(opts.hideRate) {
	ads.push("ratings");
	ads.push("ratings_module");
}
if(location.hash.match(/t=(?:(\d+)m)?(?:(\d+)s)?(\d*)/)) {
	var start=0;
	if(RegExp.$1) start += Number(RegExp.$1) * 60;
	if(RegExp.$2) start += Number(RegExp.$2);
	if(RegExp.$3) start += Number(RegExp.$3);
	swfArgs.start = start;
}
for(var i=ads.length-1;i>=0;i--)
	delete swfArgs[ads[i]];
if(config.IS_HD_AVAILABLE && !opts.useHD) swfArgs.fmt_map = unescape(swfArgs.fmt_map).replace(/^22[^,]+,/,"");
else if(swfArgs.fmt_map.indexOf("18")==0 && /3[45]/.test(swfArgs.fmt_map)) swfArgs.fmt_map=swfArgs.fmt_map.replace(/18.+?,/,"");
var vars="enablejsapi=1&vq=2&jsapicallback=onYouTubePlayerReady";
for(var arg in swfArgs) if(!/^(?:ad|ctb|rec)_/i.test(arg)) vars+="&"+arg+"="+swfArgs[arg];
player.setAttribute("flashvars", vars);
toggleWidePlayer(opts.bigMode);
player.setAttribute("greased", "true");
player.src += "";
head = head.insertBefore(new Element("div", {id:"vidtools"}), head.firstChild);
document.addEventListener("keydown", function(E) {
	if("INPUTEXTAREA".indexOf(E.target.nodeName) >= 0) return;
	switch(E.keyCode) {
		case 83: player.style.height = "25px"; return;
		case 80: player[(player.getPlayerState()==1 ? "pause" : "play") + "Video"](); return;
		case 82: player.seekTo(0, true); return;
		case 77: player[player.isMuted() ? "unMute" : "mute"](); return;
		case 69: player.seekTo(player.getDuration(), true); return;
		case 39: player.seekTo(player.getCurrentTime()+.5, true);return;
		case 37:
		console.log(player.getCurrentTime());
		console.log(player.getCurrentTime()-2);
		player.seekTo(Math.round(player.getCurrentTime()-1), true);
		console.log(player.getCurrentTime());
		return;
	}
	if(E.ctrlKey)
		switch(E.keyCode) {
			case 38:
				E.preventDefault();
				player.setVolume(player.getVolume() + 4);
				return;
			case 40:
				E.preventDefault();
				player.setVolume(player.getVolume() - 4);
				return;
		}
}, false);
var shade, tog;
function toggle() {
	if (document.body.className.indexOf("watch-lights-off") != -1) {
		tog.className=tog.className.replace("dark", "light");
		shade.style.display = "none";
		document.body.className = document.body.className.replace("watch-lights-off", "");
	} else {
		shade.style.height = (window.innerHeight + window.scrollMaxY) + "px";
		tog.className=tog.className.replace("light", "dark");
		shade.style.display = "inline";
		document.body.className += " watch-lights-off";
	}
}
if(!unsafeWindow.toggleLights) {
	if(opts.autoCinema) document.body.className += " watch-lights-off";
	document.body.appendChild(shade=new Element("div", {onclick : toggle, id : "watch-longform-shade", style : "height : "+(window.innerHeight + window.scrollMaxY) + "px; display : " + (opts.autoCinema ? "" : "none")}));
	head.appendChild(tog=new Element("span", {
			id : "light-switch",
			className : "master-sprite " + (opts.autoCinema ? "dark" : "light"),
			onclick : toggle
	}));
}
head.appendChild(new Element("span", {
	className : "loop o" + (opts.loop ? "n" : "ff"),
	style : "padding-left:2px;padding-right:2px;",
	onclick : function() {
		GM_setValue("loop", opts.loop = !opts.loop);
		this.className = "loop o" + (opts.loop ? "n" : "ff");
	}
}));
head.appendChild(new Element("a", {
	className : player.offsetHeight + "px",
	style : "font-size:12px;padding-top:3px;padding-left:3px;",
	onclick : function() {
		if(this.textContent=="mini mode on")
		{
			this.textContent = "mini mode off";
			if(opts.fit) {
				unsafeWindow.onresize = fitToWindow;
				fitToWindow();
			} else player.style.height = this.className;
		} else {
			this.textContent = "mini mode on";
			player.style.height = "25px";
			unsafeWindow.onresize = null;
		}
	},
	textContent : "mini mode o" + (opts.min ? "n" : "ff")
}));
$("watch-actions-area").childNodes[1].insertBefore(
	new Element("div", { className : "watch-tab" }, new Array(
			new Element("a", {
				onclick : function(E) {
					E.preventDefault();
					var time = "";
					if(confirm("Do you want to include the current time in the link?")) {
						var ct = player.getCurrentTime();
						var m = Math.floor( ct / 60), s = Math.round(ct - m * 60);
						time = "#t=";
						if(m > 0) time += m + "m";
						if(s > 0) time += s + "s";
					}
					prompt("Here is your custom made link for highest quality:", "http://www.youtube.com/watch" + location.search.replace(/[?&]fmt=\d*/,"") + "&fmt=" + (config.IS_HD_AVAILABLE ? "22" : "18") + time);
				},
				textContent : "Get Link"
			})
		)
	),
	$("watch-tab-flag")
);
if(opts.utterBlack) GM_addStyle("#watch-longform-shade, .watch-lights-off {background : black !important;}");
if(opts.collapse) {
	var panels = document.evaluate("//div[contains(@class,'yt-uix-expander')]", document, null, 6, null), panel, i=panels.snapshotLength;
	while(panel=panels.snapshotItem(--i))
		panel.className+=" yt-uix-expander-collapsed";
}
if(opts.min) {
	fitToWindow();
	player.style.height = "25px";
} else if(opts.fit) {
	fitToWindow();
	unsafeWindow.onresize = fitToWindow;
} else if(opts.true720p && config.IS_HD_AVAILABLE) {
	player.style.width="1280px";
	player.style.height="745px";
	player.style.marginLeft="-160px";
} else if(!opts.fit && opts.bigMode) {
	fitToWindow();
	fitBig();
}
var downloads={"3gp":"17", mp4:"18"};
if(/(?:^|,)34/.test(swfArgs.fmt_map)) downloads["hq flv"]="34";
if(config.IS_HD_AVAILABLE || /(?:^|,)35/.test(swfArgs.fmt_map)) downloads["super hq flv"]="35";
if(config.IS_HD_AVAILABLE) downloads["hd mp4"]="22";
var info=$("watch-ratings-views"), block=new Element("div", { className : "avgDL" });
block.appendChild(document.createTextNode("Download this video as: "));
var flv=new Element("a", {
	href : "/get_video?video_id="+swfArgs.video_id+"&t="+swfArgs.t,
	innerHTML : "flv"
});
block.appendChild(flv);
for(var dl in downloads) {
	var temp=flv.cloneNode(false);
	temp.innerHTML=dl;
	temp.href+="&fmt="+downloads[dl];
	block.appendChild(document.createTextNode(" // "));
	block.appendChild(temp);
}
$("watch-this-vid-info").insertBefore(block,info);
var f = $("watch-channel-icon");
if(f) f.className="";

})();