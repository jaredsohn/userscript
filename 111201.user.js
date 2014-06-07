// Mako video user script
// version 1.7
// 2010-12-29
// Copyright (c) 2008, 2010 Yehuda B. 
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// ==UserScript==
// @name        Mako video
// @description	Fix video playback on Mako.co.il . Version 1.7
// @namespace   http://yehudab.com
// @include     http://*.mako.co.il/*
// @include		http://*.castup.net/Customers/KeshetMako/*
// ==/UserScript==

function getPlayerHtml(url, width, height, isVOD)
{
	GM_log(url);
	if (!isVOD) {
		return "<a target=\"_new\" style=\"float:right;color:white;background-color:black;text-decoration:none\" href=\"" + url + "\">\u05dc\u05e6\u05e4\u05d9\u05d4 \u05d9\u05e9\u05d9\u05e8\u05d4</a><br>" +
			"<EMBED type='application/x-mplayer2' width='" + width +"' height='" + height + "' " +
			"src='" + url + "' autostart='1' showcontrols='1' loop='0'></EMBED>"; // לצפיה ישירה
	}
	else {
		return "<EMBED type='application/x-mplayer2' width='" + width +"' height='" + height + "' " +
			"src='" + url + "' autostart='1' showcontrols='1' loop='0'></EMBED><br>" +
			"<a target=\"_new\" style=\"display:block;width:80px;white-space:nowrap;padding:0 4px;margin:0 auto;color:white;background-color:black;text-decoration:none\" href=\"" + url + "\">\u05dc\u05e6\u05e4\u05d9\u05d4 \u05d9\u05e9\u05d9\u05e8\u05d4</a>"; // לצפיה ישירה
	}
}

unsafeWindow.KPlayer_DoFSCommand = function(mPlayerID, command, args) {
	if (command != "WMPlayer_Play") {
		return;
	}
	if (mPlayerID.indexOf("_") != -1)
	{
		var arr = mPlayerID.split("_");
		mPlayerID = arr[1];
	}
	
	playCommon(mPlayerID);
}

function playCommon(mPlayerID) {
	var width, height, playerID;
	width = 431;
	height = 323;
	
	var playerID = "wmp_container_" + mPlayerID;
	var player = document.getElementById(playerID);
	if (player == null) {
		playerID = "video_container_" + mPlayerID;
		player = document.getElementById(playerID);
	}
	if (player == null) {
		return;
	}
	width = player.offsetWidth;
	if (width < 250)
	{
		var tmpPlayer = player.parentNode;
		while(tmpPlayer != null)
		{
			if (typeof tmpPlayer.className == "string" && 
				(tmpPlayer.className.match(/side_bar_width/) || tmpPlayer.className.match(/video_lobby_holder/)))
			{
				player = tmpPlayer;
				width = player.offsetWidth;
				break;
			}
			tmpPlayer = tmpPlayer.parentNode;
		}
	}
	height = Math.round(width*3/4);
	var waitScreen = document.getElementById('video_waitscreen_' + mPlayerID);
	if (waitScreen != null)
		waitScreen.style.display = 'none';
	var url = unsafeWindow.asxActionURL;
	try {
		var initPlayerFunc = eval('unsafeWindow.initPlayer'+mPlayerID+ '.toString()');
		urlMatches = initPlayerFunc.match(/asxActionURL\s*=\s*"([^"]+)"/);
		if (urlMatches != null) {
			url = urlMatches[1];
		}
	}
	catch (ex)
	{
	}
	skipAdd(player, url, width, height, false);
}

unsafeWindow.onClipPlay = function(nChannelId, nClipId,xml) {
	unsafeWindow.dText = "";
	unsafeWindow.clip = nClipId;
	// get the talkbacks in ajax
	unsafeWindow.submitAjaxTalkbacks(nChannelId,nClipId);
	unsafeWindow.getDescFunc(nClipId); // this function makes the player start
	unsafeWindow.getRankFunc(nClipId);
	unsafeWindow.saveClip = nClipId;
	unsafeWindow.saveChannel = nChannelId;
	var playerID = "video_container_videogallerynull";
	var player = document.getElementById(playerID);
	if (player == null)
		return;
	width = player.offsetWidth;
	if (width < 400)
	{
		width = 432;
	}
	height = width*3/4;
	var player_url = unsafeWindow.player_url;
	if (player_url.match(/^http:\/\/[^.]+.mako.co.il/) == null)
		player_url = "http://www.mako.co.il" + player_url;
	var URL = player_url + '&videoVCMId=' + nClipId + '&currentChannelId=' + nChannelId + '&cfgName=' + unsafeWindow.cfg + '&galleryName=' + unsafeWindow.gal;
	
	skipAdd(player, URL, width, height, false);
	
}
unsafeWindow.KPlayer_Update = function(){}

function skipAdd(obj, clipURL, width, height, isVOD)
{
	if (typeof obj == "string")
		obj = document.getElementById(obj);
	try 
	{
		var onloadFunc = function(details) {
			if (details.status != 200)
			{
				GM_log("Unable to load video: " + clipURL, 2);
			}
			else
			{
				var videoUrl = clipURL;
				var allTags = details.responseText.match(/<[^>]+>/g);
				var i, l = allTags == null ? 0 : allTags.length;
				if (l == 0)
				{
					GM_log("asx has no tags: " + details.responseText);
					return;
				}
				var inEntry = false;
				var canSkip = false;
				var foundclientskip = false;
				var tagName;
				var haveVideoURL = false;
				for (i = 0; i < l; i++)
				{
					tagName = allTags[i].match(/[a-zA-Z]+/);
					if (tagName != null)
					{
						tagName = tagName[0].toLowerCase();
						switch (tagName)
						{
						case "entry":
							if (!inEntry)
							{
								inEntry = true;
								haveVideoURL = false;
								if (allTags[i].match(/clientskip="no"/i)) {
									canSkip = false;
									foundclientskip = true;
								}
								else if (foundclientskip)
									canSkip = true;
							}
							else
							{
								inEntry = false;
								if (canSkip && haveVideoURL)
								{
									obj.innerHTML = getPlayerHtml(videoUrl, width, height, isVOD);
									return;
								}
							}
							break;
						case "param":
							paramName = allTags[i].match(/name[ ]*=[ ]*"[^"]+"/i);
							paramValue = allTags[i].match(/value[ ]*=[ ]*"[^"]+"/i);
							if (paramValue != null && paramName != null)
							{
								paramName = paramName[0].replace(/^.*"([^"]+)".*$/, "$1").toLowerCase();
								paramValue = paramValue[0].replace(/^.*"([^"]+)".*$/, "$1").toLowerCase();
								if (paramName == "canskipforward" && (paramValue == "no" || paramValue == "false"))
									canSkip = false;
								if (paramName == "title" && paramValue == "intro")
									canSkip = false;
							}
							break;
						case "starttime":
							canSkip = true;
							break;
						case "ref":
							if (canSkip) 
							{
								
								var href = allTags[i].match(/href[ ]*=[ ]*"[^"]+"/i);
								if (href != null)
								{
									videoUrl = href[0].replace(/^.*"([^"]+)".*$/, "$1");
									haveVideoURL = true;
								}
							}
							break;
								
						}
					}
					
				}	
				obj.innerHTML = getPlayerHtml(videoUrl, width, height, isVOD);
			}
		}
		
		window.setTimeout(function() {
	 		GM_xmlhttpRequest({
			  method:"GET",
			  url: isVOD ? clipURL : 'http://yehudab.com/apps/mako/url-getter.php?url=' + encodeURIComponent(clipURL),
			  onerror:function(details) {
					GM_log("Unable to load video: " + clipURL, 2);
			  },
			  onload: onloadFunc
			});
		}, 0);
	}
	catch (ex)
	{
		GM_log(ex);
	}
}

function fixMakoStyles()
{
	unsafeWindow.getScrollY = function()
	{
		return 0;
	}
	addGlobalStyle("#id_sideMenuHolder {position:fixed}");
	addGlobalStyle(".channel_ticker_title_text {white-space:nowrap}");
}
function fixCastupVideo()
{
	var search = location.href.split("?")[1];
	if (typeof search == "undefined")
		return;
	var params = search.split("&");
	var clipURL = "";
	var width = "100%";
	var height = "100%";
	var dimentions = location.href.match(/v_([0-9]{3})x([0-9]{3})_/);
	if (dimentions)
	{
		width = dimentions[1];
		height = dimentions[2];
	}
	for (var i = 0; i < params.length; i++)
	{
		var p = params[i].toLowerCase();
		if (p.indexOf("clipurl=") == 0)
		{
			clipURL = unescape(params[i].split("=")[1]);
		}
	}
	if (clipURL == '')
		return;
	skipAdd(document.body, clipURL, width, height, true);
}

function fixWaitScreens()
{
	var allW = document.getElementsByClassName("video_waitscreen");
	var i, l, playerId, matches;
	if (allW != null)
	{
		l = allW.length;
		for (i = 0; i < l; i++)
		{
			matches = allW[i].id.match(/video_waitscreen_(.*)/);
			if (matches)
			{
				playerId = matches[1];
				if (allW[i].innerHTML.match(/plugin_install/))
				{
					allW[i].innerHTML = 
						//'<img id="img_waitscreen_' + playerId + '" src="http://yehudab.com/apps/monkeyImg.php?w=' + width + 'h=' + height + 'v=' + scriptVer + '" style="width: ' + width + 'px; height: ' + height + 'px;">' +
						'<div id="video_play_overlay_' + playerId + '" class="video_play_overlay" onclick="javascript:KPlayer_pressPlay(\'' + playerId + '\');">' +
						'<img id="overlay_player_img_' + playerId + '" src="http://rcs.mako.co.il/images/player_small/video_play_over.png" style="z-index: 7; position: absolute; top: 40%; left: 40%; cursor: pointer;">' +
						'</div>';
				}
				else if (allW[i].innerHTML.match(/playerLive/)) {
					unsafeWindow.Event.observe(unsafeWindow, 'load' , function(){
						var initFuncName = 	'initPlayer' + playerId;
						var funcSrc = eval("unsafeWindow." + initFuncName).toString();
						var re = /asxActionURL[ ]*=[ ]*["']([^"']+)["']/;
						var matches = funcSrc.match(re);
						if (matches != null) {
							var url=matches[1];
							skipAdd(document.getElementById("wmp_container_" + playerId), url, 426, 319, false);
							if (document.getElementById("banner_plasma_frame") != null)
							{
								document.getElementById("banner_plasma_frame").style.display="none";
							}
						}
					});
				}
			}
		}
	}

}
function fixBigBrother()
{
	unsafeWindow.BigBrother_DoFSCommand = function(command, args) {
		var width, height, bbObjName;
		width = 431;
		height = 323;
		bbObjName = "WMPlayer";
		if(command == "WMPlayer_Play")
		{
			skipAdd(bbObjName, args, width, height, false);
		}
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function fixArticle() 
{
/*	var itemPlayer = document.getElementById('itemPlayer');
	if (itemPlayer == null) {
		window.setTimeout(fixArticle, 500);
		return;
	}
	var clipURL = itemPlayer.getAttribute('src');
	var width = parseInt(itemPlayer.getAttribute('width'));
	var height = parseInt(itemPlayer.getAttribute('height'));
	skipAdd(itemPlayer.parentNode, clipURL, width, height, false);*/
	var video_waitscreens = document.getElementsByClassName('video_waitscreen');
	if (video_waitscreens != null) {
		var playButtonPrefix = 'video_play_overlay_';
		for (var i = 0; i < video_waitscreens.length; i++) {
			var thisDiv = video_waitscreens[i];
			var matches = thisDiv.id.match(/video_waitscreen_(.*)/);
			if (matches == null)
				continue;
			var videoID = matches[1];
			thisDiv.style.display = '';
			var playButton = document.getElementById(playButtonPrefix + videoID);
			if (playButton != null) {
				playButton.addEventListener("click", function() {playButtonClicked(this);}, false);
			}
		}
	}
}

function fixBigBrother3() {
	unsafeWindow.Rayv.IsInstalled = function () {return true;}
}
function playButtonClicked(element) {
	var matches = element.id.match(/video_play_overlay_(.*)/);
	if (matches == null)
		return;
	var videoID = matches[1];
	playCommon(videoID);
}

if (window.location.href.match(/mako\.co\.il.*Article-[a-z0-9]+.htm/i))
{
	fixArticle();
}
else if (typeof unsafeWindow.BigBrother_DoFSCommand != 'undefined')
{
	fixBigBrother();
}
else if (window.location.href.match(/tv-bigbrother/)){
	fixBigBrother3();
}
else if (window.location.href.match(/mako\.co\.il/))
{
	fixMakoStyles();
	fixWaitScreens();
}
else if (window.location.href.match(/castup\.net/))
{
	fixCastupVideo();
}
