// ==UserScript==
// @name		Rai.tv native video player and direct links
// @namespace	http://andrealazzarotto.com
// @description	This script allows you to watch and download videos on Rai.tv.
// @include		http://www*.rai.*/dl/RaiTV/programmi/media/*
// @include		http://www*.rai.*/dl/RaiTV/tematiche/*
// @include		http://www*.rai.*/dl/*PublishingBlock-*
// @include		http://www*.rai.*/dl/replaytv/replaytv.html*
// @include		http://*.rai.it/*
// @include		http://www.rainews.it/dl/rainews/media/*
// @version		8.4.4
// @require		http://code.jquery.com/jquery-latest.min.js
// @grant		GM_xmlhttpRequest
// @updateURL	https://userscripts.org/scripts/source/89326.user.js
// @downloadURL	https://userscripts.org/scripts/source/89326.user.js
// ==/UserScript==

var MP4isOk = document.createElement('video').canPlayType('video/mp4');

function playerElement() {
	var PL = $("div.Player").get(0);
	if (!PL)
		PL = $("div#Player").get(0);
	if (!PL)
		PL = $("div#idPlayer").get(0);
	if (!PL)
		PL = $("embed#Player").get(0);
	return $( PL );
}

// Return a carefully handcrafted MP4 URL from a "bad" URL
function cutAndSew(url, quality, ending) {
	var r = "_[^_]*" + ending + ".*";
	var reg = new RegExp(r, "");
	var base = "http://creativemedia1.rai.it/podcastmhp";
	var piece = url.replace(/.*podcastmhp/, "")
				.replace(reg, "");
	return base + piece + "_" + quality + ".mp4";
}

function appendMsg(text) {
	$("#direct-link").after("<div id='subcontent'>" + text + "</div>");
	var w = playerElement().width();
	$("#subcontent").css({
		"padding": "5px",
		"color": "white",
		"text-shadow": "0 1px 2px black",
		"background": "rgba(0,0,0,0.4)",
		"float": "left",
		"width": (w*0.9) + "px",
		"margin-left": (w*0.05) + "px"
	});
}

function placeHolder(url, kind, PL) {
	if(!PL) {
		PL = playerElement();
	}
	
	$("#direct-link").remove();
	PL.after("<div id='direct-link' />");
	var wi = PL.width();
	var w = wi*.6;
	var m = wi*.19;
	// some styling
	$("#direct-link")
		.css({
			'padding': '5px',
			'margin': '10px '+m+'px',
			'width': w+'px',
			'border': '1px solid #888',
			'text-align': 'center',
			'box-shadow': '0px 5px 15px 0px rgba(0, 0, 0, .7)',
			'background-color': '#cfc',
			'float': 'left'
		});
	// place the link
	$("#direct-link")
		.append('<a href="'+url+'">' + kind + " Direct Link</a>");
	$("#direct-link a")
		.css({
			'font-size': '13px',
			'font-weight': 'normal',
			'color': 'black'
		});
	
	// fix the position of the link
	var min = PL.prev().height() + PL.height() + parseInt(PL.css("margin-top"))
		+ parseInt(PL.css("margin-bottom")) + $("#direct-link").height();
	if ($("#direct-link").parent().height() < min) {
		$("#direct-link").parent().height(min + 32).css("position", "relative")
			.css("clear", "both");
		$("#direct-link").css("position","absolute").css("left", 0)
			.css("bottom", parseInt($("#direct-link").parent().css("padding-bottom"))*.4 );
	}
}

function placeM3U8(master_url, title) {
	$("#direct-link").remove();
	// Get the highest quality tablet stream
	GM_xmlhttpRequest({
		method: 'GET',
		url: master_url,
		onload: function(responseDetails) {
			var master_url = responseDetails.finalUrl;
			var r = responseDetails.responseText
				.split("#EXT-X-STREAM-INF:");
			var path = "";
			var quality = 0;
			for(var i=0; i<r.length; i++) {
				var el = r[i];
				if(el.indexOf("RESOLUTION") != -1) {
					quality = parseInt(el.split("WIDTH=")[1].split(",")[0]);
					quality = Math.floor(quality/1000/100) * 100; // round
					el = el.replace(/.*\n/,"");
					path = el.replace(/[\n].*/g,"");
				}
			}
			
			if(path=="")
				return;
			
			if(path.indexOf("http://") != -1)
				var stream_url = path;
			else
				var stream_url = master_url.split("/")
					.slice(0,-1).join("/") + "/" + path;

			var final = cutAndSew(stream_url, quality, "\.mp4");
			setUP(final, "MP4");
		}
	});

}

function setUP(url, kind, title) {
	if(kind.toLowerCase().indexOf("smooth") != -1 ||
			kind.toLowerCase().indexOf("csm") != -1)
		return;

	if(kind == "M3U8")
		placeM3U8(url, title);
	else {
		placeHolder(url, kind);
		// place the video
		var PL = playerElement();
		var w = PL.width();
		var h = PL.height();
		PL.empty();
		if(kind == "MP4" && MP4isOk) {
			PL.append('<video id="Player" width="' + w + 'px" '
				+ 'height="' + h + 'px" src="'
				+ url + '" controls autoplay>');
		}
		else {
			PL.append('<embed id="Player" width="' + w + 'px" '
				+ 'height="' + h + 'px" src="'
				+ url + '" type="application/x-mplayer2" '
				+ 'autoplay="true">');
		}
		// kill the flash player, if any
		setTimeout(function() {
			if(unsafeWindow.player) {
				unsafeWindow.player.pause();
			}
			else {
				setTimeout(arguments.callee, 400);
			}
		}, 400);
	}
	
	appendMsg("<b>Versione 8.4</b> &mdash; Questa versione usa un nuovo " + 
		"backend e potrebbe non funzionare su alcuni video. Per le " +
		" segnalazioni commentare <a href='http://andrealazzarotto.com" +
		"/2012/11/24/guardare-e-scaricare-i-video-di-rai-tv-e-rai-replay" +
		"-anche-con-linux'>il post</a>. <b>Prima controllare</b> i commenti" +
		" precedenti. Grazie.");
};

function decide(videoURL, videoURL_MP4, videoURL_M3U8, estensioneVideo) {
	if (videoURL_MP4) {
		// handle the relinker server-side
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://video.lazza.dk/rai/?r=' + encodeURIComponent(videoURL_MP4),
			onload: function(responseDetails) {
				var r = responseDetails.responseText;
				if (r.length > 0)
					setUP(r, "MP4");
			}
		});
	}
	else if (videoURL) {
		// handle the relinker server-side
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://video.lazza.dk/rai/?r=' + encodeURIComponent(videoURL),
			onload: function(responseDetails) {
				var r = responseDetails.responseText;
				if (r.substr(r.length - 4).substr(0,1) == '.')
					estensioneVideo = r.substr(r.length - 3).toUpperCase();
				if(r.toLowerCase().indexOf("mms") == 0)
					setUP(r, "MMS Stream");
				else {
					if(r.length > 0)
						setUP(r, estensioneVideo);
					else {
						if(estensioneVideo.toLowerCase().indexOf("smooth") != -1 ||
								estensioneVideo.toLowerCase().indexOf("ism") != -1)
							setUP(videoURL_M3U8, "M3U8", $("title").html());
					}
				}
			}
		});
	} // end if (videoURL)
}

function parseQuery(hash) {
	var result = {};
	var parts = hash.split("&");
	for(var i = 0; i<parts.length; i++) {
		var pair = parts[i].split("=");
		result[pair[0]] = pair[1];
	}
	return result;
}

function purifyTitle(title) {
	return title.replace(/[^A-Za-z0-9]/gi," ").trim().replace(/\ +/gi,"_");
}

function setUpFromURL(url) {
	// get the original page content
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(responseDetails) {
			var r = responseDetails.responseText;
			// kill script tags to avoid execution (and errors!)
			r = r.replace(new RegExp('script', 'g'), 'dummy');
			r = $('<div></div>').append(r);
			
			var data = $(r).find("div#silverlightControlHost dummy").text();
			
			// set the correct variables
			var videoURL = data.match(/videoURL = ["'](.*?)["']/)[1];
			var videoURL_MP4 = data.match(/videoURL_MP4 = ["'](.*?)["']/)[1];
			var videoURL_M3U8 = data.match(/videoURL_M3U8 = ["'](.*?)["']/)[1];
			var estensioneVideo = data.match(/estensioneVideo = ["'](.*?)["']/)[1];
			
			decide(videoURL, videoURL_MP4, videoURL_M3U8, estensioneVideo);
		}
	});
}

$(document).ready(function(){

	unsafeWindow.refreshByJS = false;

	if(window.location.href.indexOf("tematiche") < 0 &&
		window.location.href.indexOf("replaytv") < 0 &&
		(unsafeWindow.videoURL || unsafeWindow.videoURL_MP4)) {

		var videoURL = $("meta[name=videourl]").attr("content");
		if(!videoURL)
			videoURL = unsafeWindow.videoURL;
		var videoURL_MP4 = $("meta[name=videourl_h264]").attr("content");
		if(!videoURL_MP4)
			videoURL_MP4 = unsafeWindow.videoURL_MP4;
		if(!videoURL_MP4)
			videoURL_MP4 = $("meta[name=videourl_mp4]").attr("content");
		var videoURL_M3U8 = $("meta[name=videourl_m3u8]").attr("content");
		if(!videoURL_M3U8)
			videoURL_M3U8 = unsafeWindow.videoURL_M3U8;
		var estensioneVideo = unsafeWindow.estensioneVideo;
		if(estensioneVideo)
			estensioneVideo = estensioneVideo.toUpperCase();
		else
			estensioneVideo = "Unknown";
		if(unsafeWindow.MediaItem.type == 'WMV')
			// avoid bug when estensioneVideo = CSM and MediaItem.type = WMV
			estensioneVideo = "WMV";
		
		decide(videoURL, videoURL_MP4, videoURL_M3U8, estensioneVideo);

	} // end Rai.tv "standard"

	else if($("iframe[src*='/dl/objects/embed.html']").length) {
		var url = $("iframe[src*='/dl/objects/embed.html']").attr("src");
		url = "http://www.rai.tv" + url.replace(/.*embed.html\?/, "");
		setUpFromURL(url);
	}

	// end iframes
	
	else if($("script:contains('draw')").length) {
		var videoURL = $("script:contains('draw')").text().split("'")[1];
		if(videoURL != null && videoURL.indexOf("relinker") > 0) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: videoURL,
				headers: {
					'Accept': 'application/atom+xml,application/xml,text/xml'
				},
				onload: function(responseDetails) {
					var r = responseDetails.responseText;
					var doc = $.parseXML(r);
					var $xml = $( doc );
					
					var url = $xml.find("REF").attr("HREF");
					url = url.replace("http://", "mms://");
					
					setUP(url, "MMS Stream");
				}
			});
		}
		else if(videoURL != null && videoURL.indexOf(".html") > 0) {
			setUpFromURL(videoURL);
		}
		else { // last try
			var PL = playerElement();
			var initParams = PL.find("param[name=initParams]").attr("value");
			if (initParams.indexOf("mediaUri") != -1) {
				var url = initParams.split("mediaUri=")[1].split(",")[0];
				decide(url, null, null, null); // decide will find the type
			}
		}
	} // end pages like report.rai.it
	
	// ========================================
	
	else if(window.location.href.indexOf("PublishingBlock") != -1
		   || window.location.href.indexOf("tematiche") != -1) {
	
		setInterval(function() {
			document.HprevId = document.Hid;
			document.Hid = $("div.Player").attr("data-id");
			
			// remove video list click events to allow opening of "real" pages
			// if not on "tematiche"
			if(window.location.href.indexOf("tematiche") < 0)
				$(".listaVideo a").unbind("click");
		
			if(document.Hid && (document.Hid != document.HprevId)) {
				var completeURL = "http://www.rai.tv/dl/RaiTV/programmi/media/"
					+ document.Hid + ".html";
				setUpFromURL(completeURL);
			}
		}, 400);
	
	} // end Tematiche
	
	// ========================================
	
	else if(window.location.href.indexOf("replaytv") != -1) {
		$(window).bind('hashchange', function(){
			var hash = window.location.hash.slice(1);
			var hashdata = parseQuery(hash);
			
			$("#direct-link + #subcontent").remove();
			$("#direct-link").remove();

			var isvideo = hashdata["v"];
			document.TheVideoNow = hashdata["v"];
			if(isvideo && document.TheVideoNow != document.TheVideoBefore) {
				var dataURL = "http://video.lazza.dk/rai/?i=" + hashdata['v'];

				GM_xmlhttpRequest({
					method: 'GET',
					url: dataURL,
					onload: function(responseDetails) {
						var r = responseDetails.responseText;
						if(r.length > 0)
							setUP(r, "MP4");
					}
				});
				document.TheVideoBefore = document.TheVideoNow;
			}
		});
		$(window).trigger( 'hashchange' );
	} // end Rai Replay

	// handle RTMP based flash objects on Rai.it
	$("object").not("object object").each(function() {
		var o = $(this);
		var flashvars = o.find("param[name=flashvars]").attr("value");
		if(!flashvars)
			flashvars = o.find("embed").attr("flashvars");
		if(!flashvars)
			flashvars = "";
		var path = flashvars.replace(/.*percorso[^=]*=/gi, "")
				.replace(/&.*/gi, "").replace(/\?.*/gi, "");
		if(path.toLowerCase().indexOf("rtmp")!=-1) {
			var url = path.replace('mp4:','').replace('rtmp','http')
						.replace('.mp4','') + '.mp4';
			placeHolder(url, "MP4", o);
		}
	});
	// end code for flash videos
	
	// handle new pages with "video" tags
	// (maybe the above code will be removed in future releases...)
	var pj;
	try {
		pj = projekktor();
	}
	catch (e) {
		pj = false;
	}
	if(pj) {
		var files = pj.media;
		var src = files[files.length - 1].file[0].src;
		var el = $('div.projekktor');
		placeHolder(src, 'MP4', el);
		el.parent().css('background', 'transparent');
	}
	// end new pages

}); // end document.ready