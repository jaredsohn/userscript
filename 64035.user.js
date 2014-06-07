// ==UserScript==
// @name           YouTube Video Download - Italian version
// @description    Permette di scaricare qualsiasi video di YouTube.com, inclusi quelli a 1080p (Altissima qualita'). Progettato per essere leggero e non intrusivo, funziona senza contattare alcun sito esterno.
// @version        1.2
// @author         Francesco Ferraro. Original file by rossy!
// @license        MIT License
// @resource       metadata http://userscripts.org/scripts/source/64035.meta.js
// @include        http://youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// ==/UserScript==

var local_version, remote_version;
var curr_date = new Date().getTime();
var check_updates = false;
var update_needed = false;

if (typeof GM_xmlhttpRequest != "undefined" && typeof GM_getValue != "undefined" && typeof GM_getResourceText != "undefined" && (local_version = getScriptVersion(GM_getResourceText("metadata"))))
{
	remote_version = GM_getValue("remoteversion", 0);
	if (remote_version && remote_version > local_version)
		update_needed = true;
	
	var last_update_check = parseInt(GM_getValue("lastupdatecheck", "0"));
	if (curr_date - last_update_check > 1000 * 60 * 60 * 24 * 2)
		check_updates = true;
}

createDownloadTab({ check_updates: check_updates, update_needed: update_needed });

window.addEventListener("load", function() {
	if (check_updates) checkForUpdates();
}, false);


function toSource(object)
{
	var json = "{";
	for (name in object)
		json += name + ":" + object[name].toString() + ",";
	json += "}";
	return json;
}

function createDownloadTab(objargs)
{
	if (!objargs.invoked)
	{
		objargs.invoked = true;
		var script = document.createElement("script");
		script.type = "application/javascript";
		script.textContent = "(" + arguments.callee + ")(" + toSource(objargs) + ");";
		document.body.appendChild(script);
		return;
	}
	
	function createDLLink(format)
	{
		var link = document.createElement("a");
		link.setAttribute("href", format.url);
		if (format.guessed)
			link.setAttribute("target", "_blank");
		link.setAttribute("style", "display: block");
		link.setAttribute("id", "youtube_video_download_url_" + format.fmt);
		
		var titleEle = document.createElement("span");
		if (format.quality.recdl)
			titleEle.setAttribute("style", "font-weight: bold;");
		titleEle.textContent = format.quality.description + (format.recommended ? " (Raccomandato)" : "") + " ";
		link.appendChild(titleEle);
		
		var descEle = document.createElement("span");
		descEle.setAttribute("style", "opacity: .5;");
		descEle.textContent = "(Formato " + format.fmt + (format.guessed ? ", esatto" : "") + (format.vres ? ", " + format.vres + "p" : format.mres ? ", " + format.mres.width + "x" + format.mres.height : "") + ")" + 
			(format.format ? " (" + format.format + (format.vcodec ? ", " + format.vcodec : "") + (format.acodec ? ", " + format.acodec : "") + ")": "");
		link.appendChild(descEle);
		
		return link;
	}
	
	function compatError()
	{
		var pageBody = document.getElementsByTagName("body")[0];
		var firstChild = pageBody.firstChild;
		var errorSpan = document.createElement("span");
		errorSpan.textContent = "Errore: YouTube è stato aggiornato e YouTube Video Downloader non è più compatibile ";
		pageBody.insertBefore(errorSpan, firstChild);
		var errorLink = document.createElement("a");
		errorLink.setAttribute("href", "http://userscripts.org/scripts/show/64035");
		errorLink.setAttribute("target", "_blank");
		errorLink.textContent = "Clicca qui per scaricare l'ultima versione.";
		pageBody.insertBefore(errorLink, firstChild);
	}
	
	var yt_formats = {
		0:  { fmt: 0 , quality: { level: 0, recdl: false, description: "Bassa definizione, Bassa qualita' (rinomina in video.flv)" }, format: "FLV" , mres: { width: 320, height: 240 }, wmres: { width: 400, height: 226 }, aformat: "22kHz, mono"  , acodec: "MP3" , vcodec: "Flash Video 1 (Sorenson Spark)" },
		5:  { fmt: 5 , quality: { level: 1, recdl: false, description: "Bassa definizione, Bassa qualita'"                       }, format: "FLV" , mres: { width: 320, height: 240 }, wmres: { width: 400, height: 226 }, aformat: "22kHz, mono"  , acodec: "MP3" , vcodec: "Flash Video 1 (Sorenson Spark)" },
		6:  { fmt: 6 , quality: { level: 2, recdl: false, description: "Alta qualita'"                                      }, format: "FLV" , mres: { width: 480, height: 360 }, wmres: { width: 480, height: 270 }                          , acodec: "MP3" , vcodec: "Flash Video 1 (Sorenson Spark)" },
		13: { fmt: 13, quality: { level: 1, recdl: false, description: "Bassa definizione, Bassa qualita'"         }, mobile: true, format: "3GPP", mres: { width: 176, height: 144 }, wmres: { width: 176, height: 144 }, aformat: "8kHz, mono"   , acodec: "SAMR", vcodec: "H.263"                          },
		15: { fmt: 15, quality: { level: -1, recdl: true, description: "Formato originale"                            }, format: "Unknown"                                                                                                                                                         },
		17: { fmt: 17, quality: { level: 2, recdl: false, description: "Bassa definizione, Alta qualita'"        }, mobile: true, format: "3GPP", mres: { width: 176, height: 144 }, wmres: { width: 176, height: 144 }, aformat: "44kHz, mono"  , acodec: "AAC" , vcodec: "MPEG-4"                         },
		18: { fmt: 18, quality: { level: 4, recdl: true , description: "Alta definizione, Compatibile con iPod"                     }, format: "MP4" , mres: { width: 480, height: 360 }, wmres: { width: 480, height: 270 }, aformat: "44kHz, stereo", acodec: "AAC" , vcodec: "H.264"                          },
		22: { fmt: 22, quality: { level: 6, recdl: true , description: "Alta definizione, Alta qualita'"                     }, format: "MP4" , vres: 720                                                            , aformat: "44kHz, stereo", acodec: "AAC" , vcodec: "H.264"                          },
		34: { fmt: 34, quality: { level: 3, recdl: false, description: "Bassa definizione, Alta qualita'"                      }, format: "FLV" , mres: { width: 320, height: 240 }, wmres: { width: 640, height: 360 }, aformat: "44kHz, stereo", acodec: "AAC" , vcodec: "H.264"                          },
		35: { fmt: 35, quality: { level: 5, recdl: true , description: "Definizione standard, Alta qualita'"                 }, format: "FLV" , vres: 480                                                            , aformat: "44kHz, stereo", acodec: "AAC" , vcodec: "H.264"                          },
		36: { fmt: 36, quality: { level: 3, recdl: true , description: "Alta definizione, Alta qualita'"       }, mobile: true, format: "3GPP", mres: { width: 320, height: 240 }, wmres: { width: 320, height: 240 }, aformat: "44kHz, mono"  , acodec: "AAC" , vcodec: "MPEG-4"                         },
		37: { fmt: 37, quality: { level: 7, recdl: true , description: "Alta definizione, Altissima qualita'"               }, format: "MP4" , vres: 1080                                                           , aformat: "44kHz, stereo", acodec: "AAC" , vcodec: "H.264"                          },
	};
	
	var download_tab_exists = true;
	
	if (document.getElementById("watch-action-download"))
		document.getElementById("watch-action-download-link").getElementsByClassName("watch-action-text")[0].innerHTML = " Download";
	else
	{
		download_tab_exists = false;
		
		var dlButton = document.createElement("div");
		dlButton.setAttribute("id", "watch-tab-download");
		dlButton.setAttribute("class", "watch-tab");
		dlButton.setAttribute("onclick", "yt.www.watch.actions.selectTab(this);");
		
		var dlButtonA = document.createElement("a");
		dlButtonA.setAttribute("id", "watch-action-download-link");
		dlButtonA.setAttribute("class", "watch-action-link");
		dlButtonA.setAttribute("onclick", "return false");
		dlButtonA.setAttribute("href", "#");
		dlButton.appendChild(dlButtonA);
	
		var dlButtonBtn = document.createElement("button");
		dlButtonBtn.setAttribute("id", "watch-action-download");
		dlButtonBtn.setAttribute("class", "master-sprite");
		dlButtonBtn.setAttribute("title", "Download");
		dlButtonA.appendChild(dlButtonBtn);
	
		var dlButtonSpan = document.createElement("span");
		dlButtonSpan.setAttribute("class", "watch-action-text");
		dlButtonSpan.innerHTML = " Download";
		dlButtonA.appendChild(dlButtonSpan);
		
		var dlButtonArrow = document.createElement("button");
		dlButtonArrow.setAttribute("class", "master-sprite watch-tab-arrow");
		dlButtonArrow.setAttribute("title", "");
		dlButton.appendChild(dlButtonArrow);
		
		var watchTabs = document.getElementById("watch-actions-area").getElementsByClassName("watch-tabs")[0];
		if (!watchTabs)
			return compatError();
		watchTabs.insertBefore(dlButton, watchTabs.getElementsByClassName("clear")[0]);
	}
	
	var tabBody = document.getElementById("watch-tab-download-body");
	if (!tabBody)
		return compatError();
	if (!download_tab_exists)
		tabBody.setAttribute("style", "background-color: #F3F3F3 !important; padding: 8px 10px;");
	var tabBodyDiv = document.createElement("div");
	tabBodyDiv.setAttribute("id", "youtube_video_download_tabbodydiv");
	tabBodyDiv.setAttribute("style", "padding: 0 13px; font-size: 11px;");
	var tabBodyHeader = document.createElement("span");
	tabBodyHeader.setAttribute("style", "font-weight: bold;");
	if (download_tab_exists)
		tabBodyHeader.textContent = "O in uno di questi formati alternativi (Gratis):";
	else
		tabBodyHeader.textContent = "Scegli un formato:";
	tabBodyDiv.appendChild(tabBodyHeader);
	
	if (!yt.getConfig)
		return compatError();
	
	var fmt_url_map = yt.getConfig("SWF_ARGS")["fmt_url_map"];
	if (!fmt_url_map)
		return compatError();
	fmt_url_map = unescape(fmt_url_map).split(",");
	var video_id = yt.getConfig("SWF_ARGS")["video_id"];
	var token = yt.getConfig("SWF_ARGS")["t"];
	var title = yt.getConfig("VIDEO_TITLE");
	var is_widescreen = yt.getConfig('IS_WIDESCREEN');
	if (title)
		title = title.replace(/"/g, "-").replace(/%/g, "%25").replace(/=/g, "%3D").replace(/,/g, "%2C").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/\//g, "_").replace(/\\/g, "_");
	
	if (video_id && token)
	{
		yt_formats[18].url = "http://" + document.location.host + "/get_video?video_id=" + video_id + "&t=" + token + "&fmt=18";
		yt_formats[18].guessed = true;
		
		yt_formats[13].url = "http://" + document.location.host + "/get_video?video_id=" + video_id + "&t=" + token + "&fmt=13";
		
		yt_formats[17].url = "http://" + document.location.host + "/get_video?video_id=" + video_id + "&t=" + token + "&fmt=17";
		
		yt_formats[36].url = "http://" + document.location.host + "/get_video?video_id=" + video_id + "&t=" + token + "&fmt=36";
		yt_formats[36].guessed = true;
		
		if (yt.getConfig('IS_HD_AVAILABLE'))
		{
			yt_formats[22].url = "http://" + document.location.host + "/get_video?video_id=" + video_id + "&t=" + token + "&fmt=22";
			yt_formats[22].guessed = true;
		}
	}
	
	if (fmt_url_map[0] == "")
	{
		if (!video_id || !token)
			return compatError();
		yt_formats[0].url = "http://" + document.location.host + "/get_video?video_id=" + video_id + "&t=" + token;
		yt_formats[0].guessed = true;
	}
	else
	{
		var last_qlevel = 99;
		for (var fmt in fmt_url_map)
		{
			fmt = fmt_url_map[fmt].split("|");
			var url = fmt[1] + "&title=" + title;
			fmt = parseInt(fmt[0]);
			
			if (yt_formats[fmt])
			{
				last_qlevel = yt_formats[fmt].quality.level;
				yt_formats[fmt].url = url;
				yt_formats[fmt].guessed = false;
			}
			else
				yt_formats[fmt] = { fmt: fmt, quality: { level: last_qlevel - 0.5, description: "Formato sconosciuto" }, url: url };
		}
	}
	
	var recommended;
	var highest_qlevel = -1;
	var format_list = new Array();
	var format_list_mobile = new Array();
	for (var fmt in yt_formats)
		if (yt_formats[fmt].url)
		{
			if (is_widescreen && yt_formats[fmt].mres)
				yt_formats[fmt].mres = yt_formats[fmt].wmres;
			if (yt_formats[fmt].mobile)
				format_list_mobile[format_list_mobile.length] = yt_formats[fmt];
			else
			{
				if (yt_formats[fmt].quality.level > highest_qlevel)
				{
					highest_qlevel = yt_formats[fmt].quality.level;
					recommended = yt_formats[fmt];
				}
				format_list[format_list.length] = yt_formats[fmt];
			}
		}
	recommended.recommended = true;
	format_list.sort(function(a, b) {return b.quality.level - a.quality.level;});
	format_list_mobile.sort(function(a, b) {return b.quality.level - a.quality.level;});
	
	for (var fmt in format_list)
		tabBodyDiv.appendChild(createDLLink(format_list[fmt]));
	
	tabBodyDiv.appendChild(document.createElement("br"));
	var tabBodyPhHeader = document.createElement("span");
	tabBodyPhHeader.setAttribute("style", "font-weight: bold;");
	tabBodyPhHeader.textContent = "Compatibili con cellulari (formato 3GP):";
	tabBodyDiv.appendChild(tabBodyPhHeader);
	
	for (var fmt in format_list_mobile)
		tabBodyDiv.appendChild(createDLLink(format_list_mobile[fmt]));
	
	if (objargs.check_updates || objargs.update_needed)
	{
		var updateMessage = document.createElement("span");
		if (!objargs.update_needed)
			updateMessage.setAttribute("style", "display: none;");
		updateMessage.setAttribute("id", "youtube_video_download_updatemessage");
		updateMessage.appendChild(document.createElement("br"));
		
		var updateMessageText = document.createElement("span");
		updateMessageText.setAttribute("style", "font-weight: bold;");
		updateMessageText.textContent = "Una nuova versione di YouTube Video Download è disponibile. ";
		updateMessage.appendChild(updateMessageText);
		
		var updateMessageLink = document.createElement("a");
		updateMessageLink.setAttribute("href", "http://userscripts.org/scripts/source/64035.user.js");
		updateMessageLink.textContent = "Clicca qui per aggiornare la corrente versione.";
		updateMessage.appendChild(updateMessageLink);
		tabBodyDiv.appendChild(updateMessage);
	}
	
	tabBody.appendChild(tabBodyDiv);
}

function getScriptVersion(meta)
{
	function strTrim(str)
	{
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	
	var lines = meta.split("\n");
	var inuserscripttags = false;
	for (var line in lines)
		if (lines[line].substring(0, 2) == "//")
		{
			lines[line] = lines[line].substring(2);
			var tline = strTrim(lines[line]);
			if (tline.toLowerCase() == "==userscript==")
				inuserscripttags = true;
			else if (tline.toLowerCase() == "==/userscript==")
				inuserscripttags = false;
			else if (inuserscripttags)
			{
				var whitespacepos = tline.search(/\s/);
				if (whitespacepos + 1 && tline.substring(0, whitespacepos).toLowerCase() == "@uso:version")
					return parseInt(strTrim(tline.substring(whitespacepos)));
			}
		}
	return false;
}

function checkForUpdates()
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://userscripts.org/scripts/source/64035.meta.js",
		onload: function(response) {
			GM_setValue("lastupdatecheck", curr_date.toString());
			if (response.status == 200)
			{
				remote_version = getScriptVersion(response.responseText);
				if (remote_version)
					GM_setValue("remoteversion", remote_version);
				if (remote_version && remote_version > local_version)
					document.getElementById("youtube_video_download_updatemessage").setAttribute("style", "");
			}
		}
	});
}
