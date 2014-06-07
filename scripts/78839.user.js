// ==UserScript==
// @name           YouTube Video Downloader
// @namespace      http://userscripts.org/users/176926
// @description    Skenira YouTube stranice za sve formate, ukljucujuci i 1080p na odabranom snimku. Dizajniran je da bude lak i nenametljiv i u potpunosti radi sa stranicom bez kontaktiranja bilo koje dodante stranice.
// @version        1.0.0
// @author         Shtraus
// @license        MIT License
// @resource       metadata http://userscripts.org/scripts/source/62634.meta.js
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/watch*
// ==/UserScript==

var localVersion, remoteVersion;
var currDate = new Date().getTime();
var gmCheckUpdates = false;
var gmUpdateNeeded = false;
var ajax = document.getElementById("watch-pagetop-section");

if (typeof GM_xmlhttpRequest != "undefined" && typeof GM_getValue != "undefined" && typeof GM_getResourceText != "undefined" && (localVersion = getScriptVersion(GM_getResourceText("metadata"))))
{
	remoteVersion = GM_getValue("remoteversion", 0);
	if (remoteVersion && remoteVersion > localVersion)
		gmUpdateNeeded = true;
	
	var lastUpdateCheck = parseInt(GM_getValue("lastupdatecheck", "0"));
	if (currDate - lastUpdateCheck > 1000 * 60 * 60 * 24 * 2)
		gmCheckUpdates = true;
}

var pageFunction = function(checkUpdates, updateNeeded) {
	function compatError()
	{
		var pageBody = document.getElementsByTagName("body")[0];
		var firstChild = pageBody.firstChild;
		pageBody.insertBefore(document.createTextNode("Error: YouTube has been updated and YouTube Video Download is no longer compatible. "), firstChild);
		var errorLink = document.createElement("a");
		errorLink.setAttribute("href", "http://userscripts.org/scripts/show/62634");
		errorLink.setAttribute("target", "_blank");
		errorLink.appendChild(document.createTextNode("Molim klikni ovde za proveru update."));
		pageBody.insertBefore(errorLink, firstChild);
	}
	
	function getElem(id)
	{
		var ret;
		if (!(ret = document.getElementById(id)))
			compatError();
		else
			return ret;
	}
	
	function createDLLink(format)
	{
		var linkA = document.createElement("a");
		linkA.className = "yt-uix-button-menu-item " + "ytd-" + format.fmt + "-link";
		linkA.style.marginTop = "1px";
		linkA.style.marginBottom = "1px";
		linkA.setAttribute("href", format.url);
		
		var linkSpan = document.createElement("span");
		linkSpan.appendChild(document.createTextNode(format.quality.description + (format.format && !format.mobile ? " " + format.format : "")));
		linkA.appendChild(linkSpan);
		
		var infoSpan = document.createElement("span");
		infoSpan.style.color = "darkgrey";
		infoSpan.appendChild(document.createTextNode((format.mres ? " " + format.mres.width + "x" + format.mres.height : "") + (format.vcodec ? " " + format.vcodec + (format.acodec ? "/" + format.acodec: "") : " (Format " + format.fmt + ")")));
		linkA.appendChild(infoSpan);
		
		if (format.guessed)
		{
			var tipSpan = document.createElement("span");
			linkA.appendChild(document.createElement("br"));
			tipSpan.style.fontSize = "smaller";
			tipSpan.style.color = "darkgrey";
			tipSpan.className = "ytd-link-guessed-tip";
			tipSpan.appendChild(document.createTextNode("(Right click and choose \"Save Link As...\" to download this format)"));
			linkA.appendChild(tipSpan);
		}
		return linkA;
	}
	
	window.ytd = {formats: {
			0:  { fmt: 0 , quality: { level: 0, recdl: false, description: "Low Quality (rename to video.flv)" }, format: "FLV" , mres: { width: 320, height: 240 }, wmres: { width: 400, height: 226 }, aformat: "22kHz, mono"  , acodec: "MP3"   , vcodec: "SVQ"    },
			2:  { fmt: 2 , quality: { level: 0, recdl: false, description: "Official Download Format"          }, format: "(Unknown)", vcodec: "Doesn't work"                                                                                                         },
			5:  { fmt: 5 , quality: { level: 1, recdl: false, description: "Low Quality"                       }, format: "FLV" , mres: { width: 320, height: 240 }, wmres: { width: 400, height: 226 }, aformat: "22kHz, mono"  , acodec: "MP3"   , vcodec: "SVQ"    },
			6:  { fmt: 6 , quality: { level: 2, recdl: false, description: "High Quality"                      }, format: "FLV" , mres: { width: 480, height: 360 }, wmres: { width: 480, height: 270 }                          , acodec: "MP3"   , vcodec: "SVQ"    },
			13: { fmt: 13, quality: { level: 1, recdl: false, description: "Low Quality H.263"   }, mobile: true, format: "3GPP", mres: { width: 176, height: 144 }, wmres: { width: 176, height: 144 }, aformat: "8kHz, mono"   , acodec: "SAMR"  , vcodec: "H.263"  },
			15: { fmt: 15, quality: { level: -1, recdl: true, description: "Original Upload Format"            }, format: "(Unknown)"                                                                                                                                 },
			17: { fmt: 17, quality: { level: 2, recdl: false, description: "Low Quality MPEG-4"  }, mobile: true, format: "3GPP", mres: { width: 176, height: 144 }, wmres: { width: 176, height: 144 }, aformat: "44kHz, mono"  , acodec: "AAC"   , vcodec: "MPEG-4" },
			18: { fmt: 18, quality: { level: 5, recdl: true , description: "iPod Compatible, High Quality"     }, format: "MP4" , mres: { width: 480, height: 360 }, wmres: { width: 480, height: 270 }, aformat: "44kHz, stereo", acodec: "AAC"   , vcodec: "H.264"  },
			22: { fmt: 22, quality: { level: 8, recdl: true , description: "High Definition, 720p"             }, format: "MP4" , vres: 720                                                            , aformat: "44kHz, stereo", acodec: "AAC"   , vcodec: "H.264"  },
			34: { fmt: 34, quality: { level: 4, recdl: false, description: "Low Definition, 360p"              }, format: "FLV" , vres: 360                                                            , aformat: "44kHz, stereo", acodec: "AAC"   , vcodec: "H.264"  },
			35: { fmt: 35, quality: { level: 6, recdl: true , description: "Standard Definition, 480p"         }, format: "FLV" , vres: 480                                                            , aformat: "44kHz, stereo", acodec: "AAC"   , vcodec: "H.264"  },
			36: { fmt: 36, quality: { level: 3, recdl: true , description: "High Quality MPEG-4" }, mobile: true, format: "3GPP", mres: { width: 320, height: 240 }, wmres: { width: 320, height: 240 }, aformat: "44kHz, mono"  , acodec: "AAC"   , vcodec: "MPEG-4" },
			37: { fmt: 37, quality: { level: 9, recdl: true , description: "Full High Definition, 1080p"       }, format: "MP4" , vres: 1080                                                           , aformat: "44kHz, stereo", acodec: "AAC"   , vcodec: "H.264"  },
			43: { fmt: 43, quality: { level: 3, recdl: true , description: "Low Definition, 360p"              }, format: "WebM", vres: 360                                                                                      , acodec: "Vorbis", vcodec: "VP8"    },
			45: { fmt: 45, quality: { level: 7, recdl: true , description: "High Definition, 720p"             }, format: "WebM", vres: 720                                                                                      , acodec: "Vorbis", vcodec: "VP8"    },
		},
		loadDownloadMenu: function() {
			var container = document.getElementById("watch-actions-area-container");
			if (container)
			{
				var cClasses = container.className.split(" ");
				var collapsed = false;
				for (var i = 0; i < cClasses.length; i ++)
					if (cClasses[i] == "collapsed")
						collapsed = true;
				if (!collapsed)
					container.className += " collapsed";
				
				var watchTabs = ["watch-like", "watch-unlike", "watch-share", "watch-embed", "watch-flag"];
				for (var i = 0; i < watchTabs.length; i ++)
				{
					var tab = document.getElementById(watchTabs[i]);
					if (tab)
					{
						var tClasses = tab.className.split(" ");
						for (var j = 0; i < tClasses.length; i ++)
							if (tClasses[i] == "active")
								tClasses.splice(i, 1);
						tab.className = tClasses.join(" ");
					}
				}
			}
			
			if (document.getElementById("ytd-watch-download-button").getAttribute("data-ytd-new-version") == "yes")
			{
				var updateDivs = document.getElementsByClassName("ytd-update-div");
				for (var i = 0; i < updateDivs.length; i ++)
					updateDivs[i].style.display = "";
				
				var updateLinks = document.getElementsByClassName("ytd-update-link");
				for (var i = 0; i < updateLinks.length; i ++)
					updateLinks[i].style.display = "";
			}
		},
	};
	
	var dlButton = document.createElement("button");
	dlButton.setAttribute("id", "ytd-watch-download-button");
	dlButton.className = "yt-uix-button yt-uix-tooltip";
	dlButton.setAttribute("data-button-action", "ytd.loadDownloadMenu");
	dlButton.setAttribute("title", "Save video to hard drive");
	dlButton.setAttribute("type", "button");
	dlButton.setAttribute("onclick", "; return false;");
	ytd.dlButton = dlButton;
	
	var dlButtonContent = document.createElement("span");
	dlButtonContent.className = "yt-uix-button-content";
	dlButtonContent.appendChild(document.createTextNode("Download"));
	dlButton.appendChild(dlButtonContent);
	dlButton.appendChild(document.createTextNode(" "));
	
	var dlButtonArrow = document.createElement("img");
	dlButtonArrow.className = "yt-uix-button-arrow";
	dlButtonArrow.setAttribute("src", "http://s.ytimg.com/yt/img/pixel-vfl73.gif");
	dlButtonArrow.setAttribute("alt", "");
	dlButton.appendChild(dlButtonArrow);
	
	var dlButtonMenu = document.createElement("div");
	dlButtonMenu.className = " yt-uix-button-menu";
	dlButtonMenu.style.display = "none";
	dlButtonMenu.style.backgroundColor = "#EBEBEB";
	dlButton.appendChild(dlButtonMenu);
	
	var watchEmbed = getElem("watch-embed");
	watchEmbed.parentNode.insertBefore(dlButton, watchEmbed);
	watchEmbed.parentNode.insertBefore(document.createTextNode(" "), watchEmbed);
	
	if (document.documentElement.getAttribute("lang") == "fr")
	{
		var watchShare = document.getElementById("watch-share");
		if (watchShare)
		{
			var img = watchShare.getElementsByTagName("img")[0];
			if (img)
				img.style.display = "none";
		}
	}
	
	var swfArgs = new Array();
	var moviePlayer = document.getElementById("movie_player");
	var fmtStreamMap = false;
	var videoId;
	var token;
	
	if (yt.getConfig("SWF_CONFIG"))
	{
		swfArgs = yt.getConfig("SWF_CONFIG").args;
		fmtStreamMap = swfArgs["fmt_stream_map"];
		if (!fmtStreamMap)
			return compatError();
		fmtStreamMap = fmtStreamMap.split(",");
		
		videoId = swfArgs["video_id"];
		token = swfArgs["t"];
	}
	else if (moviePlayer)
	{
		var flashvars = getElem("movie_player").getAttribute("flashvars").split("&");
		for (var flashvar in flashvars)
			swfArgs[flashvars[flashvar].substring(0, flashvars[flashvar].indexOf("="))] = flashvars[flashvar].substring(flashvars[flashvar].indexOf("=") + 1);
		
		fmtStreamMap = swfArgs["fmt_stream_map"];
		if (!fmtStreamMap)
			return compatError();
		fmtStreamMap = unescape(fmtStreamMap).split(",");
		
		videoId = swfArgs["video_id"];
		token = swfArgs["t"];
	}
	else if (typeof videoPlayer == "undefined" && document.getElementById("watch-player") && document.getElementById("watch-player").getElementsByTagName("script").length)
	{
		var flashvars = document.getElementById("watch-player").getElementsByTagName("script")[0].textContent;
		flashvars = flashvars.substring(flashvars.indexOf("flashvars=\\\"") + 12);
		flashvars = flashvars.substring(0, flashvars.indexOf("\"")).split("&");
		
		for (var flashvar in flashvars)
			swfArgs[flashvars[flashvar].substring(0, flashvars[flashvar].indexOf("="))] = flashvars[flashvar].substring(flashvars[flashvar].indexOf("=") + 1);
		
		fmtStreamMap = swfArgs["fmt_stream_map"];
		if (!fmtStreamMap)
			return compatError();
		fmtStreamMap = unescape(fmtStreamMap).split(",");
		
		videoId = swfArgs["video_id"];
		token = swfArgs["t"];
	}
	
	var isWidescreen = yt.getConfig('IS_WIDESCREEN');
	var title = getElem("watch-headline-title").textContent;
	if (title)
		title = title.replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/"/g, "-").replace(/%/g, "%25").replace(/=/g, "%3D").replace(/,/g, "%2C").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "+");
	ytd.title = title;
	dlButton.setAttribute("data-ytd-title", title);
	
	if (videoId && token)
	{
		ytd.formats[5].url = "http://" + document.location.host + "/get_video?video_id=" + videoId + "&t=" + token + "&fmt=5";
		ytd.formats[5].guessed = true;
		
		ytd.formats[18].url = "http://" + document.location.host + "/get_video?video_id=" + videoId + "&t=" + token + "&fmt=18";
		ytd.formats[18].guessed = true;
		
		ytd.formats[13].url = "http://" + document.location.host + "/get_video?video_id=" + videoId + "&t=" + token + "&fmt=13";
		ytd.formats[13].guessed = true;
		
		ytd.formats[17].url = "http://" + document.location.host + "/get_video?video_id=" + videoId + "&t=" + token + "&fmt=17";
		ytd.formats[17].guessed = true;
		
		ytd.formats[36].url = "http://" + document.location.host + "/get_video?video_id=" + videoId + "&t=" + token + "&fmt=36";
		ytd.formats[36].guessed = true;
		
		if (yt.getConfig('IS_HD_AVAILABLE'))
		{
			ytd.formats[22].url = "http://" + document.location.host + "/get_video?video_id=" + videoId + "&t=" + token + "&fmt=22";
			ytd.formats[22].guessed = true;
		}
	}
	
	var dlLink;
	if ((dlLink = document.getElementById("download-hq-button")) && (dlLink = dlLink.getAttribute("href")) && dlLink.indexOf(".youtube.com/videoplayback?") + 1)
	{
		var url = dlLink.split('?')[0];
		var args = dlLink.substring(url.length + 1).split('&');
		var titleChangable = true;
		var fmt = 18;
		if (title)
			for (var arg in args)
			{
				arg = args[arg];
				if (arg.indexOf("sparams=") == 0)
				{
					var sparams = unescape(arg.substring(8)).split(',');
					for (var sparam in sparams)
						if (sparams[sparam] == "title")
						{
							titleChangable = false;
							break;
						}
					break;
				}
			}
		dlLink = url + "?";
		for (var arg in args)
		{
			if (title && titleChangable && args[arg].indexOf("title=") == 0)
				args[arg] = "title=" + title;
			else if (args[arg].indexOf("itag=") == 0)
				if (!(fmt = parseInt(args[arg].substring(5))))
					fmt = 18;
			dlLink += args[arg];
			if (arg < args.length - 1)
				dlLink += "&";
		}
		if (ytd.formats[fmt])
		{
			ytd.formats[fmt].url = dlLink;
			ytd.formats[fmt].guessed = false;
		}
		else
			ytd.formats[fmt] = { fmt: fmt, quality: { level: ytd.formats[18].quality.level + 0.2, description: "Official Download Format" }, url: dlLink };
	}
	
	if (typeof videoPlayer != "undefined")
	{
		var markup = document.documentElement.innerHTML;
		var mindex;
		while ((mindex = markup.indexOf("videoPlayer.setAvailableFormat(\"")) + 1)
		{
			markup = markup.substring(mindex + 32);
			var url = markup.substring(0, markup.indexOf("\", \""));
			markup = markup.substring(markup.indexOf("\", \"") + 4);
			markup = markup.substring(markup.indexOf("\", \"") + 4);
			var quality = markup.substring(0, markup.indexOf("\");"));
			
			var args = url.substring(url.indexOf("?") + 1).split("&");
			var fmt;
			for (var j = 0; j < args.length; j ++)
				if (args[j].indexOf("itag=") == 0)
					fmt = parseInt(args[j].substring(5));
			if (ytd.formats[fmt])
			{
				lastQLevel = ytd.formats[fmt].quality.level;
				ytd.formats[fmt].url = url + "&title=" + (title ?  title : "video");
				ytd.formats[fmt].guessed = false;
			}
			else
				ytd.formats[fmt] = { fmt: fmt, quality: { level: ytd.formats[18].quality.level + 0.1, description: quality }, url: url + "&title=" + (title ?  title : "video") };
		}
	}
	
	if (fmtStreamMap)
		if (fmtStreamMap[0] == "")
		{
			if (!videoId || !token)
				return compatError();
			ytd.formats[0].url = "http://" + document.location.host + "/get_video?video_id=" + videoId + "&t=" + token;
			ytd.formats[0].guessed = true;
		}
		else
		{
			var lastQLevel = 99;
			for (var fmt in fmtStreamMap)
			{
				fmt = fmtStreamMap[fmt].split("|");
				var url = fmt[1] + "&title=" + (title ?  title : "video");
				fmt = parseInt(fmt[0]);
				
				if (ytd.formats[fmt])
				{
					lastQLevel = ytd.formats[fmt].quality.level;
					ytd.formats[fmt].url = url;
					ytd.formats[fmt].guessed = false;
				}
				else
					ytd.formats[fmt] = { fmt: fmt, quality: { level: lastQLevel - 0.5, description: "Unknown Format" }, url: url };
			}
		}
	
	var recommended;
	var highestQLevel = -1;
	var formatList = new Array();
	var formatListMobile = new Array();
	ytd.watchedFmts = new Array();
	for (var fmt in ytd.formats)
		if (ytd.formats[fmt].url)
		{
			if (isWidescreen && ytd.formats[fmt].mres)
				ytd.formats[fmt].mres = ytd.formats[fmt].wmres;
			if (ytd.formats[fmt].mobile)
				formatListMobile[formatListMobile.length] = ytd.formats[fmt];
			else
			{
				if (ytd.formats[fmt].quality.level > highestQLevel)
				{
					highestQLevel = ytd.formats[fmt].quality.level;
					recommended = ytd.formats[fmt];
				}
				formatList[formatList.length] = ytd.formats[fmt];
			}
			if (ytd.formats[fmt].guessed)
				ytd.watchedFmts.push(ytd.formats[fmt].fmt);
		}
	if (recommended)
		recommended.recommended = true;
	formatList.sort(function(a, b) {return b.quality.level - a.quality.level;});
	formatListMobile.sort(function(a, b) {return b.quality.level - a.quality.level;});
	dlButton.setAttribute("data-ytd-watched", ytd.watchedFmts.join(" "));
	
	var formatDiv = document.createElement("div");
	formatDiv.className = "yt-uix-button-menu-item";
	formatDiv.style.fontSize = "smaller";
	formatDiv.style.fontWeight = "bold";
	formatDiv.style.backgroundColor = "#EFEFEF";
	formatDiv.style.cursor = "default";
	var formatSpan = document.createElement("span");
	if (formatList.length)
		formatSpan.appendChild(document.createTextNode("Choose a format to download:"));
	else
		formatSpan.appendChild(document.createTextNode("Error: No download formats available."));
	formatDiv.appendChild(formatSpan);
	dlButtonMenu.appendChild(formatDiv);
	
	for (var fmt in formatList)
		dlButtonMenu.appendChild(createDLLink(formatList[fmt]));
	
	if (formatListMobile.length)
	{
		var mFormatDiv = document.createElement("div");
		mFormatDiv.className = "yt-uix-button-menu-item";
		mFormatDiv.style.fontSize = "smaller";
		mFormatDiv.style.fontWeight = "bold";
		mFormatDiv.style.backgroundColor = "#EFEFEF";
		mFormatDiv.style.cursor = "default";
		var mFormatSpan = document.createElement("span");
		mFormatSpan.appendChild(document.createTextNode("Or choose a mobile phone compatible format (3GP):"));
		mFormatDiv.appendChild(mFormatSpan);
		dlButtonMenu.appendChild(mFormatDiv);
		
		for (var fmt in formatListMobile)
			dlButtonMenu.appendChild(createDLLink(formatListMobile[fmt]));
	}
	
	if (updateNeeded == true || checkUpdates == true)
	{
		var updateDiv = document.createElement("div");
		updateDiv.className = "yt-uix-button-menu-item ytd-update-div";
		updateDiv.style.fontSize = "smaller";
		updateDiv.style.fontWeight = "bold";
		updateDiv.style.backgroundColor = "#EFEFEF";
		updateDiv.style.cursor = "default";
		if (checkUpdates == true)
			updateDiv.style.display = "none";
		var updateSpan = document.createElement("span");
		updateSpan.appendChild(document.createTextNode("A new version of YouTube Video Download is available"));
		updateDiv.appendChild(updateSpan);
		dlButtonMenu.appendChild(updateDiv);
		
		var linkA = document.createElement("a");
		linkA.className = "yt-uix-button-menu-item ytd-update-link";
		linkA.style.marginTop = "1px";
		linkA.style.marginBottom = "1px";
		if (checkUpdates == true)
			linkA.style.display = "none";
		linkA.setAttribute("href", "http://userscripts.org/scripts/source/62634.user.js");
		
		var linkSpan = document.createElement("span");
		linkSpan.appendChild(document.createTextNode("Click here to update now"));
		linkA.appendChild(linkSpan);
		dlButtonMenu.appendChild(linkA);
	}
};

var oldtitle = "";
if (ajax)
{
	ajax.addEventListener("DOMNodeInserted", function(event) {
		if (event.target.tagName.toLowerCase() == "input" && document.title != oldtitle)
		{
			document.title = oldtitle;
		//	window.setTimeout(loadFunction, 1); Commented out until I can test on Firefox.
			executeOnPage(pageFunction, gmCheckUpdates, gmUpdateNeeded);
		}
	}, false);
}
else
{
	window.addEventListener("load", function() {
		loadFunction();
	}, false);
	
	executeOnPage(pageFunction, gmCheckUpdates, gmUpdateNeeded);
}

function loadFunction()
{
	if (gmCheckUpdates) checkForUpdates();
	// test GM_xmlhttpRequest().abort() with a bogus url :3
	if (typeof GM_xmlhttpRequest != "undefined" && (GM_xmlhttpRequest({method: "HEAD", url: "http://youtube.com/get_video_info"}).abort))
		checkWatchedLinks();
}

function getScriptVersion(meta)
{
	function strTrim(str)
	{
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	
	var lines = meta.split("\n");
	var inUserScriptTags = false;
	for (var line in lines)
		if (lines[line].substring(0, 2) == "//")
		{
			lines[line] = lines[line].substring(2);
			var tline = strTrim(lines[line]);
			if (tline.toLowerCase() == "==userscript==")
				inUserScriptTags = true;
			else if (tline.toLowerCase() == "==/userscript==")
				inUserScriptTags = false;
			else if (inUserScriptTags)
			{
				var whitespacePos = tline.search(/\s/);
				if (whitespacePos + 1 && tline.substring(0, whitespacePos).toLowerCase() == "@uso:version")
					return parseInt(strTrim(tline.substring(whitespacePos)));
			}
		}
	return false;
}

function checkForUpdates()
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://userscripts.org/scripts/source/62634.meta.js",
		onload: function(response) {
			GM_setValue("lastupdatecheck", currDate.toString());
			if (response.status == 200)
			{
				remoteVersion = getScriptVersion(response.responseText);
				if (remoteVersion)
					GM_setValue("remoteversion", remoteVersion);
				if (remoteVersion && remoteVersion > localVersion)
					document.getElementById("ytd-watch-download-button").setAttribute("data-ytd-new-version", "yes");
			}
		}
	});
}

function dlVideo(url)
{
	var gmxhr;
	gmxhr = GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onreadystatechange: function(response) {
			if (response.readyState == 2 || response.readyState == 3)
				gmxhr.abort();
			else if (response.readyState == 4)
			{
				var title = document.getElementById("ytd-watch-download-button").getAttribute("data-ytd-title");
				if (response.finalUrl.indexOf(".youtube.com/videoplayback?") + 1)
					document.location.href = response.finalUrl + "&title=" + (title ? title : "video");
				else
					alert("Error in retrieving download URL, try right-clicking on the format name and choosing \"Save Link As...\" or choosing a different format.");
			}
		},
		onerror: function(response) {
			alert("Error in retrieving download URL, try right-clicking on the format name and choosing \"Save Link As...\" or choosing a different format.");
		},
	});
}

function checkWatchedLinks()
{
	var dlButton = document.getElementById("ytd-watch-download-button");
	dlButton.addEventListener("click", function() { setTimeout(function() {
		var checkLinks = dlButton.getAttribute("data-ytd-watched");
		if (checkLinks)
		{
			checkLinks = checkLinks.split(" ");
			for (var i = 0; i < checkLinks.length; i ++)
			{
				var links = document.getElementsByClassName("ytd-" + checkLinks[i] + "-link");
				for (var j = 0; j < links.length; j ++)
				{
					links[j].addEventListener("click", function(e) {
						if (e.button == 0)
						{
							dlVideo(e.currentTarget.getAttribute("href"));
							e.preventDefault();
						}
					}, false);
					links[j].removeChild(links[j].getElementsByTagName("br")[0]);
					links[j].removeChild(links[j].getElementsByClassName("ytd-link-guessed-tip")[0]);
				}
			}
		}
	}, 1); dlButton.removeEventListener("click", arguments.callee, false); }, false);
}

function serialize(object)
{
	function serializeString(str)
	{
		const meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "\"" : "\\\"", "\\": "\\\\"};
		return "\"" + str.replace(/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, function(a) {
			var c = meta[a];
			return typeof(c) == "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
		}) + "\"";
	}
	
	function serializeValue(object)
	{
		if (object && object.toSource)
			return object.toSource();
		switch (typeof(object))
		{
			case "string":
				return serializeString(object);
			case "number":
			case "boolean":
			case "null":
			case "function":
				return String(object);
			case "object":
				if (object == null)
					return "null";
				else if (object instanceof String)
					return serializeString(object);
				else if (object instanceof Number || object instanceof Boolean || object instanceof Function || object instanceof RegExp)
					return object.toString();
				else if (object instanceof Date)
					return "(new Date(" + object.getTime() + "))";
				else if (object instanceof Array)
				{
					var element = new Array();
					for (var i = 0; i < object.length; i ++)
						element.push(serializeValue(object[i]));
					return "[" + element.join(", ") + "]";
				}
				else
				{
					var element = new Array();
					for (var i in object)
						element.push(i.toString() + ":" + serializeValue(object[i]));
					return "{" + element.join(", ") + "}";
				}
			case "undefined":
				return "undefined";
			default:
				return "null";
		}
	}
	
	if (object && object.toSource)
		return object.toSource();
	switch (typeof(object))
	{
		case "string":
			return "(new String(" + serializeString(object) + "))";
		case "number":
			return "(new Number(" + String(object) + "))";
		case "boolean":
			return "(new Boolean(" + String(object) + "))";
		case "null":
			return "null";
		case "function":
			return "(" + serializeValue(object) + ")";
		case "object":
			if (object == null)
				return "null";
			else if (object instanceof String)
				return "(new String(" + serializeString(object) + "))";
			else if (object instanceof Number)
				return "(new Number(" + String(object) + "))";
			else if (object instanceof Boolean)
				return "(new Boolean(" + String(object) + "))";
			else if (object instanceof RegExp)
				return object.toString();
			else if (object instanceof Array)
				return serializeValue(object);
			else
				return "(" + serializeValue(object) + ")";
		case "undefined":
			return "undefined";
		default:
			return "null";
	}
}

function executeOnPage()
{
	var args = Array.prototype.slice.call(arguments);
	var func = args.shift();
	var script = document.createElement("script");
	script.type = "text/javascript";
	for (var i = 0; i < args.length; i ++)
		args[i] = serialize(args[i]);
	script.textContent = "(" + func + ")(" + args.join(", ") + ");";
	document.body.appendChild(script);
}

