// ==UserScript==
// @name           Video and Mp3 Youtube Downloader
// @namespace      YouTube
// @description    Mendownload Video YouTube untuk semua format, termasuk download ke. Mp3 pada video yang dipilih. Dirancang untuk menjadi ringan dan tidak mengganggu, downloader tersebut  berjalan sepenuhnya pada di youtube tanpa perlu mendownloadnya di situs khusus untuk download video youtube atau pun IDM.
// @include        htt*://*.youtube.com/*
// @grant		   none
// @match          http://*.youtube.com/*
// @match          https://*.youtube.com/*
// @icon           http://www.gravatar.com/avatar/9b1d3237df880fe6da28f608468823dd?r=PG&s=60&default=identicon
// @version        2.1
// @encoding       UTF-8
// ==/UserScript==



var formats;
var orderedFormats;
var title;
var channel;
var video_id;

var language = document.documentElement.getAttribute("lang");

var translation = {
	"en": {
		errormsg: "Error: YouTube has been updated and YouTube Video Download is no longer compatible. ",
		errorlink: "Please click here to check for updates.",

		button: "Download",
		tomp3: "Download to .mp3",
		tip: "Save video to hard drive",

		low: "Low Quality",
		high: "Low Definition",

		lowdef: "Low Definition",
		stddef: "Standard Definition",
		highdef: "High Definition",
		fhighdef: "Full High Definition",

		origdef: "Original Definition",

		unknown: "Unknown Format",

		dlheader: "Choose a format to download:",
		nofmts: "Error: No download formats available.",
		update1: "A new version of YouTube Video Download is available.",
		update2: "Click here to update now.",

		options: "options",
		updatetoggle: " Check for updates",
		replacetoggle: " Replace video title",
		vinfotoggle: " Set visitor info cookie (advanced)",
		tformat: "Title format: ",
		apply: "apply",
		tformatinfo: "%t - video title\n%c - uploader\n%f - format number\n%v - video id\n%% - literal percent",
	},
	"fr": { 
		errormsg: "Erreur: Youtube a été mis à jour et YouTube Video Download n'est plus compatible. ",
		errorlink: "Cliquer ici pour vérifier les mises à jour.",

		button: "Télécharger",
		tomp3: "Télécharger en .mp3",
		tip: "Télécharger cette vidéo",

		low: "Basse Qualité",
		high: "Basse Définition",

		lowdef: "Basse Définition",
		stddef: "Définition Standard",
		highdef: "Haute Définition",
		fhighdef: "Très Haute Définition",

		origdef: "Définition Originale",

		unknown: "Format Inconnu",

		dlheader: "Choisissez le format à télécharger:",
		nofmts: "Erreur: Pas de formats de téléchargement disponible.",
		update1: "Une nouvelle version de YouTube Video Download est disponible.",
		update2: "Cliquer ici pour mettre à jour maintenant.",

		options: "options",
		updatetoggle: " Vérifier les mises à jour",
		replacetoggle: " Modifier le nom de fichier de la vidéo",
		vinfotoggle: " Enregister le cookie d'information du visiteur (avancé)",
		tformat: "Format du nom de fichier: ",
		apply: "Appliquer",
		tformatinfo: "%t - titre de la vidéo\n%c - uploader\n%f - numéro du format\n%v - ID de la vidéo\n%% - pourcentage littéral",
	},
};



	function getTrans(str)
{
	var ret;
	if (translation[language] && (ret = translation[language][str]))
		return ret;
	else if (ret = translation["en"][str])
		return ret;
	else
		return "";
}

function getHTML5Map()
{
	try
	{
		var hFormatMap = yt.getConfig("PLAYER_CONFIG").args["html5_fmt_map"];
		if (hFormatMap)
			for (var i = 0; i < hFormatMap.length; i ++)
			{
				if (formats[hFormatMap[i].itag])
					formats[hFormatMap[i].itag].html5hint = hFormatMap[i];
				else
					formats[hFormatMap[i].itag] = { itag: hFormatMap[i].itag, html5hint: hFormatMap[i] };
				alert(hFormatMap[i].itag + " / " + hFormatMap[i].url);
			}
		else
			return false;
	}
	catch (e)
	{
		return false;
	}
	return true;
}
	

function ReplaceAll(Source,stringToFind,stringToReplace){

  var temp = Source;

    var index = temp.indexOf(stringToFind);

        while(index != -1){

            temp = temp.replace(stringToFind,stringToReplace);

            index = temp.indexOf(stringToFind);

        }

        return temp;

}

function getTitle()
{
	return encodeURIComponent(ReplaceAll(document.title.substr(0, document.title.length-10),'"','_'));
}

function getChannel()
{
	try
	{
		return yt.getConfig("VIDEO_USERNAME");
	}
	catch (e)
	{
		try
		{
			return document.getElementById("watch-uploader-info").getElementsByClassName("author")[0].textContent;
		}
		catch (e)
		{
			return "unknown";
		}
	}
}

function getSAR()
{
	try
	{
		return yt.getConfig("IS_WIDESCREEN") ? 16/9 : 4/3;
	}
	catch (e)
	{
		return 16/9;
	}
}

function getVideoId()
{
	try
	{
		return yt.getConfig("VIDEO_ID");
	}
	catch (e)
	{
		return "";
	}
}


function initFormats()
{
		formats = {
			17: { itag: 17, quality:  1, description: getTrans("low")    , format: "3GP" , mres: { width:  176, height:  144 }, acodec: "AAC"   , vcodec: "H.264"						  , arate: 22050, abr:  24000, vbr:  80000 },
			36: { itag: 36, quality:  2, description: getTrans("low")    , format: "3GP" , mres: { width:  320, height:  180 }, acodec: "AAC"   , vcodec: "H.264"						  , arate: 22050, abr:  32000, vbr:  225000 },
			5:  { itag: 5 , quality:  3, description: getTrans("low")     , format: "FLV" , mres: { width:  400, height:  240 }, acodec: "MP3"   , vcodec: "SVQ"                          , arate: 22050, abr:  64000, vbr:  250000 },
			18: { itag: 18, quality:  7, description: getTrans("high")    , format: "MP4" , mres: { width:  480, height:  360 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "Baseline@L3.0", arate: 44100, abr:  96000, vbr:  500000 },
			22: { itag: 22, quality:  10, description: getTrans("highdef") , format: "MP4" , mres: { width: 1280, height:  720 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "High@L3.1"    , arate: 44100, abr: 152000, vbr: 2000000 },
			34: { itag: 34, quality:  5, description: getTrans("lowdef")  , format: "FLV" , mres: { width:  640, height:  360 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "Main@L3.0"    , arate: 44100, abr: 128000, vbr:  500000 },
			35: { itag: 35, quality:  8, description: getTrans("stddef")  , format: "FLV" , mres: { width:  854, height:  480 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "Main@L3.0"    , arate: 44100, abr: 128000, vbr:  800000 }, // downloaded a video and found that the resolution was 640x480 for this itag
			37: { itag: 37, quality:  11, description: getTrans("fhighdef"), format: "MP4" , mres: { width: 1920, height: 1080 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "High@L4.0"    , arate: 44100, abr: 152000, vbr: 3500000 },
			38: { itag: 38, quality: 13, description: getTrans("origdef") , format: "MP4" , mres: { width: 4096, height: 3072 }, acodec: "AAC"   , vcodec: "H.264" },
			43: { itag: 43, quality:  4, description: getTrans("lowdef")  , format: "WebM", mres: { width:  640, height:  360 }, acodec: "Vorbis", vcodec: "VP8"                          , arate: 44100, abr: 128000, vbr:  500000 },
			44: { itag: 44, quality:  6, description: getTrans("stddef")  , format: "WebM", mres: { width:  854, height:  480 }, acodec: "Vorbis", vcodec: "VP8"                          , arate: 44100, abr: 128000, vbr: 1000000 },
			45: { itag: 45, quality:  9, description: getTrans("highdef") , format: "WebM", mres: { width: 1280, height:  720 }, acodec: "Vorbis", vcodec: "VP8"                          , arate: 44100, abr: 192000, vbr: 2000000 },
			46: { itag: 46, quality:  12, description: getTrans("fhighdef"), format: "WebM" , mres: { width: 1920, height: 1080 }, acodec: "Vorbis", vcodec: "VP8"					  , arate: 44100, abr: 192000, vbr: 3500000 },
		};
	orderedFormats = new Array();
}



function getStreamMap()
{
	var streamMap;
	try
	{
		if (!(streamMap = yt.playerConfig.args["url_encoded_fmt_stream_map"]))
			throw "";
	}
	catch (e)
	{
		try
		{
			var flashVars = document.getElementById("movie_player").getAttribute("flashvars").split("&");
			var splitLoc;
			var name;
			for (var i = 0; i < flashVars.length; i ++)
			{
				name = flashVars[i].substr(0, splitLoc = flashVars[i].indexOf("="));
				if (name == "url_encoded_fmt_stream_map")
					streamMap = unescape(flashVars[i].substr(splitLoc + 1));
			}
			if (!streamMap)
				throw "";
		}
		catch (e)
		{
			try
			{
				var swfConfigTxt = document.getElementById("postpage").getElementsByTagName("script")[3].textContent;
				if (swfConfigTxt.substring(0, 18) == "\n    (function() {")
				{
					eval(swfConfigTxt.substring(18, swfConfigTxt.length - 8))
					streamMap = swfConfig.args.url_encoded_fmt_stream_map;
				}
			}
			catch (e)
			{
				return false;
			}
		}
	}

	
	var title = getTitle();
	//var videoId = getVideoId();
	
	//alert(videoId);
	if (streamMap)
	{
		streamMap = streamMap.split(",");
		var split;
		var url;
		var itag;
		var sig;
		var name;

		video_id = window.location.search.split('v=')[1];
		var ampersandPosition = video_id.indexOf('&');
		if(ampersandPosition != -1) {
		  video_id = video_id.substring(0, ampersandPosition);
		}
		//
		// Dark button "yt-uix-tooltip-reverse yt-uix-button yt-uix-button-dark yt-uix-tooltip"
		
		var but = '<button aria-expanded="false" data-tooltip-text="' + getTrans("tip") + '" onclick="; return false;" aria-pressed="false" role="button" type="button" title="' + getTrans("tip") + '" class="' + ((document.getElementById("watch7-sentiment-actions"))?"yt-uix-button yt-uix-button-hh-text":"yt-uix-tooltip-reverse yt-uix-button yt-uix-button-dark") + ' yt-uix-tooltip yt-uix-button-empty"><span class="yt-uix-button-content">' + getTrans("button") + '</span> <img alt="" src="//s.ytimg.com/yt/img/pixel-vfl73.gif" class="yt-uix-button-arrow"><div style="background-color: rgb(234, 234, 234); min-width: 86px; left: 350.917px; top: 563.117px; display: none;" class="yt-uix-button-menu hid">';

		but += '<a id="get_mp3" style="position: relative; padding-right: 7em;" class="yt-uix-button-menu-item" target="_blanc" href="http://www.winnfail.com/mp3.php?video_id=' + video_id + '">' + getTrans("tomp3") + '<span style="position: absolute; right: 0.6666em; opacity: 0.6; float: right;"></span></a>';

		for (var i = 0; i < streamMap.length; i ++)
		{
			split = streamMap[i].split("&");
			for (var j = 0; j < split.length; j ++)
			{
				name = split[j].substring(0, split[j].indexOf("="));
				if (name == "url")
					url = unescape(split[j].substring(split[j].indexOf("=") + 1));
				else if (name == "sig")
					sig = unescape(split[j].substring(split[j].indexOf("=") + 1));
				else if (name == "itag")
					itag = parseInt(split[j].substring(split[j].indexOf("=") + 1));
			}
			//alert(itag + "" + url + "&signature=" + sig);

			if (formats[itag])
				formats[itag].url = url;
			else
				formats[itag] = { itag: itag, url: url };
				
			but += '<a style="position: relative; padding-right: 7em;" class="yt-uix-button-menu-item" href="' + url + '&signature=' + sig + '&title=' + title + '">' + (formats[itag].description ? formats[itag].description + (formats[itag].mres && Math.abs(formats[itag].mres.width / formats[itag].mres.height - 1.7) < 0.1 ? ", " + formats[itag].mres.height + "p" : ", " + formats[itag].mres.height + "p") + " " + formats[itag].format + " " : getTrans("unknown")) + ' <span style="position: absolute; right: 0.6666em; opacity: 0.6; float: right;">' + (formats[itag].vcodec ? formats[itag].vcodec + (formats[itag].acodec ? "/" + formats[itag].acodec: "") : formats[itag].html5hint ? formats[itag].html5hint.type.substring(0, formats[itag].html5hint.type.indexOf(";")) : "itag=" + formats[itag].itag) + '</span></a>';
		}
		but += '</div></button>';
		return but;
	}
	else
		return false;
}
	


	

initFormats();
//getHTML5Map();

var c=0;
getto = function() {





	if (document.getElementById("watch-actions") || document.getElementById("watch7-sentiment-actions")) {
			var watch_ = ((document.getElementById("watch7-sentiment-actions")) ? document.getElementById("watch7-sentiment-actions") : document.getElementById("watch-actions"));
		
		if (!document.getElementById("get_mp3")) {

			if (window.location.search.split('v=')[1]) {
			
				video_id = window.location.search.split('v=')[1];
				var ampersandPosition = video_id.indexOf('&');
				if(ampersandPosition != -1) {
				  video_id = video_id.substring(0, ampersandPosition);
				}
				

				
				if (but = getStreamMap()) {
					watch_.innerHTML += but;
				}
				
				
			}
		}

	}
	else {
	
		if (c <= "10") {

			setTimeout(function () {
				getto()
			}, 1000);
		}
		c++;

	}
	

}

getto();

