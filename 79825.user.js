// ==UserScript==
// @name           YouTube Video Download - Italian
// @namespace      http://rossy2401.blogspot.com/
// @description    Scans the YouTube page for all formats, including 1080p on selected videos. Designed to be lightweight and unobtrusive, it runs entirely on the page without contacting any external sites.
// @version        2.4.3
// @author         rossy! - Italian translation by Kharg
// @license        MIT License
// @resource       metadata http://userscripts.org/scripts/source/79825.meta.js
// @include        http://youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch#*
// @include        http://*.youtube.com/watch#*
// @include        https://youtube.com/watch?*
// @include        https://*.youtube.com/watch?*
// @include        https://youtube.com/watch#*
// @include        https://*.youtube.com/watch#*
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
	if (currDate - lastUpdateCheck > 1000 * 12 * 12 * 15 * 2)
		gmCheckUpdates = true;
}

var pageFunction = function(checkUpdates, updateNeeded) {
	var mifplm = false; // An easter egg?
	var cn = -1;
	
	function compatError()
	{
		var pageBody = document.getElementsByTagName("body")[0];
		var firstChild = pageBody.firstChild;
		pageBody.insertBefore(document.createTextNode("Errore: YouTube \u00e8 stato aggiornato e YouTube Video Download non \u00e8 pi\u00d9 compatibile. "), firstChild);
		var errorLink = document.createElement("a");
		errorLink.setAttribute("href", "http://userscripts.org/scripts/show/79825");
		errorLink.setAttribute("target", "_blank");
		errorLink.appendChild(document.createTextNode("Clicca qui per cercare degli aggiornamenti."));
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
		linkA.className = "yt-uix-button-menu-item " + "ytd-" + format.fmt + "-link" + (mifplm ? " plm" + (++cn == 3 ? cn = 0 : cn) : "");
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
		
		return linkA;
	}
	
	window.ytd = {formats: {
			0:  { fmt: 0 , quality: { level: 0, recdl: false, description: "Bassa Qualit\u00e0 (rinomina a video.flv)" }, format: "FLV" , mres: { width: 320, height: 240 }, wmres: { width: 400, height: 226 }, aformat: "22kHz, mono"  , acodec: "MP3"   , vcodec: "SVQ"    },
			5:  { fmt: 5 , quality: { level: 1, recdl: false, description: "Bassa Qualit\u00e0"                       }, format: "FLV" , mres: { width: 320, height: 240 }, wmres: { width: 400, height: 226 }, aformat: "22kHz, mono"  , acodec: "MP3"   , vcodec: "SVQ"    },
			6:  { fmt: 6 , quality: { level: 2, recdl: false, description: "Alta Qualit\u00e0"                      }, format: "FLV" , mres: { width: 480, height: 360 }, wmres: { width: 480, height: 270 }                          , acodec: "MP3"   , vcodec: "SVQ"    },
			13: { fmt: 13, quality: { level: 1, recdl: false, description: "Bassa Qualit\u00e0 H.263"   }, mobile: true, format: "3GPP", mres: { width: 176, height: 144 }, wmres: { width: 176, height: 144 }, aformat: "8kHz, mono"   , acodec: "SAMR"  , vcodec: "H.263"  },
			15: { fmt: 15, quality: { level: -1, recdl: true, description: "Formato Originale"            }, format: "(Unknown)"                                                                                                                                 },
			17: { fmt: 17, quality: { level: 2, recdl: false, description: "Bassa Qualit\u00e0 MPEG-4"  }, mobile: true, format: "3GPP", mres: { width: 176, height: 144 }, wmres: { width: 176, height: 144 }, aformat: "44kHz, mono"  , acodec: "AAC"   , vcodec: "MPEG-4" },
			18: { fmt: 18, quality: { level: 5, recdl: true , description: "MP4 Ipod, Alta Qualit\u00e0"     }, format: "MP4" , mres: { width: 480, height: 360 }, wmres: { width: 480, height: 270 }, aformat: "44kHz, stereo", acodec: "AAC"   , vcodec: "H.264"  },
			22: { fmt: 22, quality: { level: 8, recdl: true , description: "Alta Definizione, 720p"             }, format: "MP4" , vres: 720                                                            , aformat: "44kHz, stereo", acodec: "AAC"   , vcodec: "H.264"  },
			34: { fmt: 34, quality: { level: 4, recdl: false, description: "Bassa Definizione, 360p"              }, format: "FLV" , vres: 360                                                            , aformat: "44kHz, stereo", acodec: "AAC"   , vcodec: "H.264"  },
			35: { fmt: 35, quality: { level: 6, recdl: true , description: "Qualit\u00e0 Standard, 480p"         }, format: "FLV" , vres: 480                                                            , aformat: "44kHz, stereo", acodec: "AAC"   , vcodec: "H.264"  },
			36: { fmt: 36, quality: { level: 3, recdl: true , description: "Alta Qualit\u00e0 MPEG-4" }, mobile: true, format: "3GPP", mres: { width: 320, height: 240 }, wmres: { width: 320, height: 240 }, aformat: "44kHz, mono"  , acodec: "AAC"   , vcodec: "MPEG-4" },
			37: { fmt: 37, quality: { level: 9, recdl: true , description: "Alta Definizione, 1080p"       }, format: "MP4" , vres: 1080                                                           , aformat: "44kHz, stereo", acodec: "AAC"   , vcodec: "H.264"  },
			38: { fmt: 38, quality: { level: 10, recdl: true, description: "Definizione Originale, 4K"               }, format: "MP4"                                                                                                  , acodec: "AAC?"  , vcodec: "H.264"  },
			43: { fmt: 43, quality: { level: 3, recdl: true , description: "Bassa Definizione, 360p"              }, format: "WebM", vres: 360                                                                                      , acodec: "Vorbis", vcodec: "VP8"    },
			45: { fmt: 45, quality: { level: 7, recdl: true , description: "Alta Definizione, 720p"             }, format: "WebM", vres: 720                                                                                      , acodec: "Vorbis", vcodec: "VP8"    },
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
	dlButton.className = "yt-uix-button yt-uix-tooltip yt-uix-tooltip-reverse";
	dlButton.setAttribute("data-button-action", "ytd.loadDownloadMenu");
	dlButton.setAttribute("title", "Salva il video nell'HD");
	dlButton.setAttribute("type", "button");
	dlButton.setAttribute("onclick", "; return false;");
	ytd.dlButton = dlButton;
	
	var dlButtonContent = document.createElement("span");
	dlButtonContent.className = "yt-uix-button-content";
	dlButtonContent.appendChild(document.createTextNode("Scarica"));
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
	
	var watchEmbed = getElem("watch-share");
	watchEmbed.parentNode.insertBefore(dlButton, watchEmbed);
	watchEmbed.parentNode.insertBefore(document.createTextNode(" "), watchEmbed);
	
	var swfArgs = new Array();
	var moviePlayer = document.getElementById("movie_player");
	var fmtStreamMap = false;
	var videoId;
	
	var userelem = document.getElementById("watch-username");
	if (userelem)
	{
		var userb = btoa(userelem.textContent);
		if (userb == "YW5ncnl0aWdlclA=" || userb == "TUFTVDNSTElOS1g=" || userb == "cGVuc2l2ZXBvbnk=" ||
			userb == "TXlMaXR0bGVQb255MTA4MHA=" || userb == "TWVubG9NYXJzZWlsbGVz")
		{
			mifplm = true;
			var ssheet = document.createElement("style");
			ssheet.appendChild(document.createTextNode(".plm0{background-color:rgba(239,46,49,0.1) !important} " +
				".plm0:hover{background-color:rgba(239,46,49,0.2) !important} " +
				".plm1{background-color:rgba(255,248,125,0.1) !important} " +
				".plm1:hover{background-color:rgba(255,248,125,0.2) !important} " +
				".plm2{background-color:rgba(4,146,210,0.1) !important} " +
				".plm2:hover{background-color:rgba(4,146,210,0.2) !important}"));
			ytd.formats[37].quality.description = ytd.formats[37].quality.description.replace("Full", "Magical");
			document.head.appendChild(ssheet);
		}
	}
	
	if (yt.getConfig("PLAYER_CONFIG"))
	{
		swfArgs = yt.getConfig("PLAYER_CONFIG").args;
		fmtStreamMap = swfArgs["fmt_stream_map"];
		if (!fmtStreamMap)
			return compatError();
		fmtStreamMap = fmtStreamMap.split(",");
		
		videoId = swfArgs["video_id"];
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
	}
	
	var isWidescreen = yt.getConfig('IS_WIDESCREEN');
	var title = getElem("watch-headline-title").textContent;
	if (title)
		title = title.replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/"/g, "-").replace(/%/g, "%25").replace(/=/g, "%3D").replace(/,/g, "%2C").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "+");
	ytd.title = title;
	dlButton.setAttribute("data-ytd-title", title);
		
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
			ytd.formats[fmt].url = dlLink;
		else
			ytd.formats[fmt] = { fmt: fmt, quality: { level: ytd.formats[18].quality.level + 0.2, description: "Formato di Download Ufficiale" }, url: dlLink };
	}
	
	var html5map;
	if (yt.getConfig("PLAYER_CONFIG") && (html5map = yt.getConfig("PLAYER_CONFIG").args["html5_fmt_map"]))
	{
		var lastQLevel = -1;
		for (var i = 0; i < html5map.length; i ++)
		{
			var url = html5map[i].url + "&title=" + (title ?  title : "video");
			if (ytd.formats[html5map[i].itag])
			{
				lastQLevel = ytd.formats[html5map[i].itag].quality.level;
				ytd.formats[html5map[i].itag].url = url;
			}
			else
				ytd.formats[html5map[i].itag] = {
					fmt: html5map[i].itag,
					quality: {
						level: lastQLevel + 0.5,
						description: "Unknown (" + html5map[i].quality + " quality)",
					},
					url: url,
					vcodec: html5map[i].type,
				};
		}
	}
	
	if (fmtStreamMap)
		if (fmtStreamMap[0] == "")
			return compatError();
		else
		{
			var lastQLevel = 99;
			for (var i = 0; i < fmtStreamMap.length; i ++)
			{
				fmt = fmtStreamMap[i].split("|");
				var url = fmt[1] + "&title=" + (title ?  title : "video");
				fmt = parseInt(fmt[0]);
				
				if (ytd.formats[fmt])
				{
					lastQLevel = ytd.formats[fmt].quality.level;
					ytd.formats[fmt].url = url;
				}
				else
					ytd.formats[fmt] = { fmt: fmt, quality: { level: lastQLevel - 0.5, description: "Unknown Format" }, url: url };
			}
		}
	
	var recommended;
	var highestQLevel = -1;
	var formatList = new Array();
	var formatListMobile = new Array();
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
		}
	if (recommended)
		recommended.recommended = true;
	formatList.sort(function(a, b) {return b.quality.level - a.quality.level;});
	formatListMobile.sort(function(a, b) {return b.quality.level - a.quality.level;});
	
	var formatDiv = document.createElement("div");
	formatDiv.className = "yt-uix-button-menu-item";
	formatDiv.style.fontSize = "smaller";
	formatDiv.style.fontWeight = "bold";
	if (mifplm)
		formatDiv.style.backgroundColor = "rgba(166, 233, 248, 0.1)";
	else
		formatDiv.style.backgroundColor = "#EFEFEF";
	formatDiv.style.cursor = "default";
	var formatSpan = document.createElement("span");
	if (formatList.length)
		formatSpan.appendChild(document.createTextNode("Scegli un formato da scaricare:"));
	else
		formatSpan.appendChild(document.createTextNode("Errore: Nessun formato da scaricare disponibile."));
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
		if (mifplm)
			mFormatDiv.style.backgroundColor = "rgba(166, 233, 248, 0.1)";
		else
			mFormatDiv.style.backgroundColor = "#EFEFEF";
		mFormatDiv.style.cursor = "default";
		var mFormatSpan = document.createElement("span");
		mFormatSpan.appendChild(document.createTextNode("Formati compatibili con cellulari: (3GP):"));
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
		updateSpan.appendChild(document.createTextNode("Una nuova versione di YouTube Video Download \u00e8 disponibile"));
		updateDiv.appendChild(updateSpan);
		dlButtonMenu.appendChild(updateDiv);
		
		var linkA = document.createElement("a");
		linkA.className = "yt-uix-button-menu-item ytd-update-link";
		linkA.style.marginTop = "1px";
		linkA.style.marginBottom = "1px";
		if (checkUpdates == true)
			linkA.style.display = "none";
		linkA.setAttribute("href", "http://userscripts.org/scripts/source/79825.user.js");
		
		var linkSpan = document.createElement("span");
		linkSpan.appendChild(document.createTextNode("Clicca qui per scaricare l'aggiornamento"));
		linkA.appendChild(linkSpan);
		dlButtonMenu.appendChild(linkA);
	}
};

var oldtitle = "";
if (document.location.host.substr(document.location.host.length - 11) == "youtube.com")
{
	if (ajax)
	{
		ajax.addEventListener("DOMNodeInserted", function(event) {
			if (event.target.tagName.toLowerCase() == "input" && document.title != oldtitle)
			{
				document.title = oldtitle;
				executeOnPage(pageFunction, gmCheckUpdates, gmUpdateNeeded);
			}
		}, false);
	}
	else
	{
		window.addEventListener("load", function() {
			if (gmCheckUpdates)
				checkForUpdates();
		}, false);
		
		executeOnPage(pageFunction, gmCheckUpdates, gmUpdateNeeded);
	}
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
		url: "http://userscripts.org/scripts/source/79825.meta.js",
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
