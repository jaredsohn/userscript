// ==UserScript==
// @name          YouTube - eXtra
// @description   The best of the hundreds of YouTube scripts, because we make it. Updated all the time, by me and you! Your favorite YouTube script is better than ever!
// @include       http://www.youtube.com/watch?*
// @namespace     #aVg
// @version       0.99.9
// ==/UserScript==
// Do not fiddle with the script for any reason! If you're having problems, use the various contact options!
var opts  = {
	hideRate : new Array("Hide Warnings", false, "Choose this if you want to hide warnings about language, sex or violence."),
	hideHD : new Array("Hide HD watermark", false, "YouTube HD videos now all have an HD logo at the start of every video. Select this to hide it."),
	usecolor : new Array("Enable colors", true, "Choose this option if you want to use colors at all."),
	useHD : new Array("Use HD", true, "Select this option to choose whether you want HD or not. It's a good idea to turn this off if your computer is slow. If you do have a slow computer, you can still download the \"hd mp4\" version, and play it from your computer's media player, which may be desirably faster."),
	autoplay : new Array("Autoplay", true, "By default, YouTube autoplays all of it's videos."),
	autobuffer : new Array("Autobuffer", false, "If you have a slow computer or a slow connection, turn this on to let the video download while it's paused, then you can hit the play button."),
	hidenotes : new Array("Hide annotations", true, "Annotations are those annoying notes some users leave that say \"visit my site!\" or \"make sure to watch in HD!!\". But we already know that, right? You can turn them off if you want."),
	c1 : new Array("Color 1", "000000", "The background color of the player bar. Must be in HEX format. (Six hex digits only)."),
	c2 : new Array("Color 2", "FFFFFF", "The foreground color of the player bar. Must be in HEX format. (Six hex digits only)."),
	bigMode : new Array("Big mode", true, "Have a nice monitor? Like seeing things big? Turn this on."),
	snapBack : new Array("Snap back", true, "Makes the video smaller if you turn off HD / HQ."),
	true720p : new Array("True 720p", false, "Leave this on for all HD videos to load as 720p videos-- in 720p."),
	fit : new Array("Fit to window", true, "When viewing videos in HIGH QUALITY or HIGH DEFINITION, the player will size itself to the window."),
	jumpToPlayer : new Array("Jump to player", true, "Especially with big mode on, this is nice. It scrolls down to the video for you."),
	loop : new Array("Loop", false, "Are you a loopy fanatic? Turn this on! Goes well if you watch a lot of AMV's I hear."),
	autoCinema : new Array("Automatic Cinema", false, "Like YouTube \"Comfort in Black\", this darkens everything except for the video player."),
	utterBlack : new Array("Total Black", false, "This will make cinema mode opaque black, as opposed to trasparent black."),
	collapse : new Array("Collapse everything", true, "For those who prefer having a short scrollbar, this automatically hides every \"panel\" when you open a video.")
};
function toggleWidePlayer(which)
{
	var A = $("baseDiv");
	if(which) {
		if(A.className.indexOf("watch-wide-mode")==-1)
			A.className += " watch-wide-mode";
	} else
		A.className = A.className.replace("watch-wide-mode", "");
}
function update(resp) {
	GM_xmlhttpRequest({
		url : "http://userscripts.org/scripts/source/31864.user.js?update",
		method : "GET",
		onload : function(a) {
			if(a.responseText.match(/\/\/ @version       (\S+)/) == null) return;
			if (RegExp.$1 != thisVer) {
				if(confirm("There is a new version of YouTube HD Ultimate.\n\nInstall it?"))
					location.href = "http://userscripts.org/scripts/source/31864.user.js";
			} else
				if(resp)
					alert("There is no new version at this time.");
		}
	});
}
function togglePlay() {
	player[(player.getPlayerState()==1 ? "pause" : "play") + "Video"]();
}
function create(A, B, C) {
	A = document.createElement(A);
	if(B) for(var b in B) {
		var cur=B[b];
		if(b.indexOf("on")==0)
			A.addEventListener(b.substring(2), cur, false);
		else if(b=="style")
			for(var s in cur)
				A.style[s] = cur[s];
		else
			A[b]=B[b];
	}
	if(C) for(var i=0; i<C.length; ++i) A.appendChild(C[i]);
	return A;
}
function fitToWindow() {
	player.style.marginLeft = (window.innerWidth >= 960 ? Math.floor((985 - window.innerWidth) / 2) : "0") + "px";
	player.style.width = (window.innerWidth - 20 ) + "px";
	player.style.height = (window.innerHeight - 53) + "px";
}
function $(A) {
	return document.getElementById(A);
}
document=unsafeWindow.document;
var player=$("movie_player"),
	optionBox,
	toggler,
	init=false,
	thisVer="0.99.8";
unsafeWindow.player=player;
player.setAttribute("wmode", "opaque");
GM_addStyle(<><![CDATA[
#light-switch {
	float:right;
	position : relative;
	z-index : 90000;
	width:17px;
	height:25px;
}
.light {
	background-position:0 -592px
}
.light:hover {
	background-position:-17px -592px!important;
}
.dark {
	background-position:-34px -592px
}
.dark:hover {
	background-position:-51px -592px!important;
}
.avgDL {
	float: right;
	padding-bottom: 3px;
	padding-top: 3px;
}
#version {
	float : right;
	padding-left: 7px !important;
	padding-right: 3px;
	background : white;
	color: black;
	-moz-border-radius-bottomright : 5px;
	-moz-border-radius-bottomleft : 3px;
	border : solid grey 1px;
}
#opts {
	background : black;
	color : white;
	position : absolute;
	padding : 20px;
	top : 54px;
	left : 25%;
	right : 25%;
	-moz-border-radius : 12px;
	border : groove blue 6px;
	z-index : 100000;
}
#myLinks {
	float : right;
	margin-top : -22px;
}
#myLinks a {
	color : white;
	text-decoration: underline;
}
#opts label {
	display : block;
	padding : 2px;
}
#opts label:hover {
	text-shadow: 1px 2px 1px yellow !important;
}
#opts label.on {
	text-shadow : 1px 2px 1px red;
	color : white;
}
#opts h1 {
	background : red;
	-moz-border-radius: 6px;
	padding : 4px;
	text-shadow: 2px -3px 4px orange;
}
#opts p {
	padding-left: 20px;
	font-family : Calibri, Comic Sans MS;
}
]]></>+"");
optionBox = create("div", {
	innerHTML : "<h1>YouTube HD Ultimate Options</h1><span id=\"version\">v "+thisVer+"</span><p>Settings, if changed, will be applied on the next video. Roll over an option to find out more about it.</p>",
	style : {
		display : "none"
	},
	id : "opts"
});
for(var opt in opts) {
	var val = GM_getValue(opt);
	if (val == null)
		val = opts[opt][1];
	var chk = typeof val != "string";
	var a = create("input", {
		type : chk ? "checkbox" : "text",
		name : opt
	});
	if (chk) a.addEventListener("click", function() {this.parentNode.className = this.checked ? "on" : "";}, false);
	a[chk ? "checked" : "value"]=val;
	var s=document.createElement("label");
	if (chk && val)
		s.className = "on";
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
optionBox.appendChild(create("a", {
	href : "#",
	className : "yt-button",
	onclick : function(E) {
		E.preventDefault();
		toggler.textContent="Show Ultimate Options";
		var newOpts=optionBox.getElementsByTagName("input"), newOpt;
		for(var i=newOpts.length-1; i>=0; --i) {
			newOpt=newOpts[i];
			GM_setValue(newOpt.name, newOpt[newOpt.type=="text" ? "value" : "checked"]);
		}
		optionBox.style.display="none";
	}
	}, new Array(
		create("span", {
			textContent : "Save Options"
		})
	)
));
optionBox.appendChild(create("span",
	{
		id : "myLinks"
	}, new Array(
		document.createTextNode("Script links: "),
		create("a",  {
			href : "http://userscripts.org/scripts/show/31864",
			textContent : "homepage"
		}),
		document.createTextNode(" | "),
		create("a",  {
			href : "http://userscripts.org/users/avindra",
			textContent : "author"
		}),
		document.createTextNode(" | "),
		create("a",  {
			href : "http://userscripts.org/scripts/discuss/31864",
			textContent : "forums"
		}),
		document.createTextNode(" | "),
		create("a", {
			href : "#",
			textContent : "check for update",
			onclick : function(e) {
				e.preventDefault();
				update(true);
			}
		})
	)
));
document.body.appendChild(optionBox);
$("util-links").appendChild(create("span", {
	className : "util-item"
}, new Array(
	toggler=create("a", {
		href : "#",
		className : "hLink",
		textContent : "Show Ultimate Options",
		onclick : function(E) {
			E.preventDefault();
			if(optionBox.style.display=="none") {
				this.textContent="Hide Ultimate Options";
				optionBox.style.display="inline";
			} else {
				this.textContent="Show Ultimate Options";
				optionBox.style.display="none";
			}
		}
	})
)));
if(!opts.bigMode && (opts.fit || opts.true720p))
	opts.bigMode = true;
if(opts.jumpToPlayer)
	$("watch-vid-title").scrollIntoView(true);
unsafeWindow.stateChanged=function(state) {
	if (state == 0) {
		if (unsafeWindow.watchIsPlayingAll) {
			unsafeWindow.gotoNext();
		} else if(opts.loop) {
			player.seekTo(0, true);
			player.playVideo();
		}
		return;
	}
	if (!init && state == 1) {
		init = true;
		if(opts.autobuffer)
			player.pauseVideo();
	}
};
unsafeWindow.onYouTubePlayerReady=function(A) {
	if (player.getAttribute("wmode")!="opaque") return;
	player.addEventListener("onStateChange","stateChanged");
	unsafeWindow.g_YouTubePlayerIsReady = true;
	if(opts.snapBack) {
		unsafeWindow.newFmt=function(fmt) {
			var isBig = fmt == 2;
			toggleWidePlayer(isBig);
			if(isBig) {
				fitToWindow();
				unsafeWindow.onresize = fitToWindow;
			} else {
				player.style.marginLeft="0px";
				player.style.width = "640px";
				player.style.height = "385px";
				unsafeWindow.onresize = null;
			}
		};
		player.addEventListener("onPlaybackQualityChange","newFmt");
	}
	if(unsafeWindow.toggleLights && opts.autoCinema)
		unsafeWindow.toggleLights(true);
}
var downloads={"3gp":"17", mp4:"18"}, swfArgs=unsafeWindow.swfArgs;
if(/(?:^|,)34/.test(swfArgs.fmt_map))
	downloads["hq flv"]="34";
if(unsafeWindow.isHDAvailable || /(?:^|,)35/.test(swfArgs.fmt_map))
	downloads["super hq flv"]="35";
if(unsafeWindow.isHDAvailable)
	downloads["hd mp4"]="22";
var info=$("watch-ratings-views"), block=create("div", { className : "avgDL" });
var head=$("watch-this-vid-info");
block.appendChild(document.createTextNode("Download this video as: "));
var flv=create("a", {
	href : "/get_video?video_id="+unsafeWindow.pageVideoId+"&t="+unsafeWindow.swfArgs.t,
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
head.insertBefore(block,info);
if(opts.usecolor) {
	swfArgs.color1="0x"+opts.c1;
	swfArgs.color2="0x"+opts.c2;
}
if(opts.hidenotes)
	swfArgs.iv_load_policy="3";
if(unsafeWindow.watchIsPlayingAll)
	swfArgs.playnext = "1";
if(!opts.autoplay && !opts.autobuffer)
	swfArgs.autoplay="0";
var ads=new Array("infringe","invideo", "ctb", "vq");
if(opts.hideHD)
	ads.push("watermark");
if(opts.hideRate) {
	ads.push("ratings");
	ads.push("ratings_module");
}
if(location.hash.match(/t=(?:(\d+)m)?(?:(\d+)s)?/)) {
	var start=0;
	if(RegExp.$1)
		start += Number(RegExp.$1) * 60;
	if(RegExp.$2)
		start += Number(RegExp.$2);
	swfArgs.start = --start;
}
for(var i=ads.length-1;i>=0;i--)
	delete swfArgs[ads[i]];
if(unsafeWindow.isHDAvailable && !opts.useHD)
	swfArgs.fmt_map = "35/640000" + swfArgs.fmt_map.substring(10);
var vars="&enablejsapi=1&vq=2&jsapicallback=onYouTubePlayerReady";
for(var arg in swfArgs)
	if(!/^(?:ad|ctb|rec)_/i.test(arg))
		vars+="&"+arg+"="+swfArgs[arg];
player.setAttribute("flashvars",vars.substring(1));
toggleWidePlayer(opts.bigMode);
player.src += "";
if(opts.fit) {
	fitToWindow();
	unsafeWindow.onresize = fitToWindow;
}
if (opts.fit || opts.true720p)
	GM_addStyle(".watch-wide-mode, #watch-this-vid, #watch-player-div {padding-left:0px!important}");
var playerCont=$("watch-player-div");
playerCont.style.position = "relative";
player.style.zIndex = 9000;
player.style.position = "relative";
playerCont.addEventListener("click", function(e) {
	var x = player.offsetWidth - e.layerX;
	var y = player.offsetHeight - e.layerY;
	if ((x >= 100 && x <= 125 && y >= 25 && y <= 90) || y <= 25) return;
	togglePlay();
}, false);
document.addEventListener("keydown", function(e) {
	if("INPUTEXTAREA".indexOf(e.target.nodeName) >= 0) return;
	switch(e.keyCode) {
		case 80: togglePlay(); return;
		case 77: player[player.isMuted() ? "unMute" : "mute"](); return;
		case 82: player.seekTo(0, true); return;
		case 69: player.seekTo(player.getDuration(), true); return;
	}

					$("watch-longform-shade").style.display = "none";
					document.body.className = document.body.className.replace("watch-lights-off", "");
				} else {
					this.className=this.className.replace("light", "dark");
					$("watch-longform-shade").style.display = "inline";
					document.body.className += " watch-lights-off";
				}
			}
	});

	head.insertBefore(block, head.firstChild);
}
$("watch-actions-area").childNodes[1].insertBefore(
	create("div", { className : "watch-tab" }, new Array(
		create("a", {
			onclick : function(E) {
				E.preventDefault();
				var time = "";
				if(confirm("Do you want to include the current time in the link?")) {
					time = player.getCurrentTime(), m = Math.floor( time / 60), s = Math.round(time - m * 60);
					time = "#t=";
					if(m > 0)
						time += m + "m";
					if(s > 0)
						time += s + "s";
				}
				prompt("Here is your custom made link for highest quality:", "http://www.youtube.com/watch" + location.search.replace(/[?&]fmt=\d*/,"") + "&fmt=" + (unsafeWindow.isHDAvailable ? "22" : "18") + time);
			},
			textContent : "Get Link",
			href : "#"
		})
	)),
	$("watch-tab-flag")
);
if(opts.utterBlack)
	GM_addStyle("#watch-longform-shade, .watch-lights-off {background : black !important;}");
if(opts.collapse) {
	var panels = document.evaluate("//div[contains(@class,'expanded')]", document, null, 6, null), panel, i=panels.snapshotLength;
	while(panel=panels.snapshotItem(--i))
		panel.className=panel.className.replace("expanded", "");
}
if(opts.true720p && unsafeWindow.isHDAvailable) {
	player.style.width="1280px";
	player.style.height="745px";
	player.style.marginLeft="-160px";
}
var now=new Date().getTime();
if ((GM_getValue("lastCheck"), now) <= (now - 86400000)) {
	GM_setValue("lastCheck", now);
	update(false);
}