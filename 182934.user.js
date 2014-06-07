// ==UserScript==
// @name		Rai.tv native video player and direct links
// @namespace	http://andrealazzarotto.com
// @description	This script allows you to watch and download videos on Rai.tv.
// @include		http://www.rai.tv/favicon.ico
// @include		http://www*.rai.*/dl/RaiTV/programmi/media/*
// @include		http://www*.rai.*/dl/RaiTV/tematiche/*
// @include		http://www*.rai.*/dl/*PublishingBlock-*
// @include		http://www*.rai.*/dl/replaytv/replaytv.html*
// @include		http://*.rai.it/*
// @version		6.1
// @require		http://code.jquery.com/jquery-latest.min.js
// @grant		GM_xmlhttpRequest
// @updateURL	https://userscripts.org/scripts/source/89326.user.js
// @downloadURL	https://userscripts.org/scripts/source/89326.user.js
// ==/UserScript==



playerElement = function() {
	var PL = $("div.Player").get(0);
	if (!PL)
		PL = $("div#Player").get(0);
	if (!PL)
		PL = $("div#idPlayer").get(0);
	if (!PL)
		PL = $("embed#Player").get(0);
	return $( PL );
}

placeHolder = function(url, kind) {
	PL = playerElement();
	
	$("#direct-link").remove();
	PL.after("<div id='direct-link' />");
	var wi = PL.width();
	var w = wi*.6;
	var m = wi*.19;
	// some styling
	$("#direct-link")
		.css('padding', '5px')
		.css('margin', '10px '+m+'px')
		.css('width', w+'px')
		.css('border', '1px solid #888')
		.css('text-align','center')
		.css('box-shadow', '0px 5px 15px 0px rgba(0, 0, 0, .7)')
		.css('background-color','#cfc')
		.css('float','left');
	// place the link
	$("#direct-link")
		.append("<a href='"+url+"'>" + kind + " Direct Link</a>");
	$("#direct-link a")
		.css('color','black')
		.css('font-size','1.2em');
	
	// fix the position of the link
	var min = PL.prev().height() + PL.height() + parseInt(PL.css("margin-top"))
		+ parseInt(PL.css("margin-bottom")) + $("#direct-link").height();
	if ($("#direct-link").parent().height() < min) {
		$("#direct-link").parent().height(min+30).css("position","relative");
		$("#direct-link").css("position","absolute").css("left",0)
			.css("bottom", parseInt($("#direct-link").parent().css("padding-bottom"))*.4 );
	}
}

setUP = function(url, kind) {
	if(kind.toLowerCase().indexOf("smooth") != -1 ||
			kind.toLowerCase().indexOf("csm") != -1)
		return;

	placeHolder(url, kind);
	// place the video
	var PL = playerElement();
	PL.empty();
        PL.append("<video width='"+ PL.width() + "' height='"+ PL.height() +"' controls>"
		+ "<source src='" + url + "' type='video/mp4'>"
		+ "</video>");
};

decide = function(videoURL, videoURL_MP4, estensioneVideo) {
	if (videoURL_MP4) { setUP(videoURL_MP4, "MP4"); }
	else if (videoURL) {
		if((estensioneVideo != 'WMV' && estensioneVideo != null) || videoURL.indexOf("relinker") == -1) {
			if(videoURL.toLowerCase().indexOf("mms") == 0)
				setUP(videoURL, "MMS Stream");
			else
				setUP(videoURL, estensioneVideo);
		}
		else { // it could be a relinker to an MMS stream or an MP4 video with wrong type
			GM_xmlhttpRequest({
				method: 'HEAD',
				url: videoURL,
				onload: function(responseDetails) {
					var head = responseDetails.responseHeaders;
					var type = head.toLowerCase().split("type")[1].split("/")[1].split("\n")[0];
					
					if(type.indexOf("mp4") != -1)
						setUP(responseDetails.finalUrl, "MP4");
					else {
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
						}); // end GET request
					}
				}
			}); // end HEAD request
		} // end relinker

	} // end if (videoURL)
}

parseQuery = function(hash) {
	var result = {};
	var parts = hash.split("&");
	for(var i = 0; i<parts.length; i++) {
		var pair = parts[i].split("=");
		result[pair[0]] = pair[1];
	}
	return result;
}

purifyTitle = function(title) {
	var newtitle = title.replace(/[^A-Za-z0-9]/gi," ").trim().replace(/\ /gi,"_");
	return newtitle;
}

setUpFromURL = function(url) {
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
			var estensioneVideo = data.match(/estensioneVideo = ["'](.*?)["']/)[1];
			
			decide(videoURL, videoURL_MP4, estensioneVideo);
		}
	});
}

$(document).ready(function(){

	if(window.location.href.indexOf("tematiche") < 0 && (unsafeWindow.videoURL || unsafeWindow.videoURL_MP4)) {

		var videoURL = $("meta[name=videourl]").attr("content");
		if(!videoURL)
			videoURL = unsafeWindow.videoURL;
		var videoURL_MP4 = $("meta[name=videourl_h264]").attr("content");
		if(!videoURL_MP4)
			videoURL_MP4 = unsafeWindow.videoURL_MP4;
		if(!videoURL_MP4)
			videoURL_MP4 = $("meta[name=videourl_mp4]").attr("content");
		var estensioneVideo = unsafeWindow.estensioneVideo;
		if(estensioneVideo)
			estensioneVideo = estensioneVideo.toUpperCase();
		else
			estensioneVideo = "Unknown";
		if(unsafeWindow.MediaItem.type == 'WMV')
			// avoid bug when estensioneVideo = CSM and MediaItem.type = WMV
			estensioneVideo = "WMV";
		
		decide(videoURL, videoURL_MP4, estensioneVideo);

	} // end Rai.tv "standard"
	
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
				decide(url, null, null); // decide will find out the correct type
			}
		}
	} // end pages like report.rai.it
	
	// ========================================
	
	else if(window.location.href.indexOf("PublishingBlock") != -1
		   || window.location.href.indexOf("tematiche") != -1) {
	
		setInterval(function() {
			document.HprevId = document.Hid;
			document.Hid = $("div.Player").attr("data-id");
			
			// remove video list click events to allow opening of "real" pages if not on "tematiche"
			if(window.location.href.indexOf("tematiche") < 0)
				$(".listaVideo a").unbind("click");
		
			if(document.Hid && (document.Hid != document.HprevId)) {
				var completeURL = "http://www.rai.tv/dl/RaiTV/programmi/media/"
					+ document.Hid + ".html";
				setUpFromURL(completeURL);
				console.log(completeURL);
			}
		}, 400);
	
	} // end Tematiche
	
	// ========================================
	
	else if(window.location.href.indexOf("replaytv") != -1) {
		var channelMap = {
			1: "Uno",
			2: "Due",
			3: "Tre",
			31: "Cinque",
			32: "Premium"
		}

		$(window).bind('hashchange', function(){
			var h264sizes = [1800, 1500, 1200, 800, 600, 400];
			
			var hash = window.location.hash.slice(1);
			var hashdata = parseQuery(hash);

			var isvideo = hashdata["day"] && hashdata["ch"] && hashdata["v"];
			document.TheVideoNow = hashdata["v"];
			if(isvideo && document.TheVideoNow != document.TheVideoBefore) {
				var dataURL = "http://www.rai.it/dl/portale/html/palinsesti/" +
					"replaytv/static/Rai" + channelMap[hashdata["ch"]] + "_" +
					hashdata["day"].replace(/-/g,"_") + ".html";

				GM_xmlhttpRequest({
					method: 'GET',
					url: dataURL,
					onload: function(responseDetails) {
						var r = responseDetails.responseText;
						var doc = $.parseJSON(r)[hashdata["ch"]][hashdata["day"]];
						// Find the right video
						var data;
						for(var prop in doc) {
							if(doc[prop]["i"] == hashdata["v"]) {
								data = doc[prop];
								break;
							}
						}
						playerElement().empty();
						// Pick the best MP4 quality, if available
						var found = false;
						for(var i=0; i<h264sizes.length; i++) {
							var url = data["h264_"+h264sizes[i]];
							if (url) {
								setUP(url, "MP4");
								found = true;
								break;
							}
						}

						if(!found) {
							// We need to retrieve the tablet version (M3U8)
							master_url = data["urlTablet"];

							// Get the highest quality tablet stream
							GM_xmlhttpRequest({
								method: 'GET',
								url: master_url,
								onload: function(responseDetails) {
									var r = responseDetails.responseText
										.split("#EXT-X-STREAM-INF:");
									var path = "";
									for(var i=0; i<r.length; i++) {
										var el = r[i].toLowerCase();
										if(el.indexOf("resolution") != -1) {
											el = el.replace(/.*\n/,"");
											path = el.replace(/[\?\n].*/g,"");
										}
									}
									var stream_url = master_url.split("/")
										.slice(0,-1).join("/") + "/" + path;

									// Set up command line
									setUP(stream_url, "");
									commandline = "ffmpeg -i " + stream_url +
										" -qscale 0.00001 " +
										purifyTitle($(".tit h2").html()) + ".mp4";
									$("#direct-link").empty()
										.css('background-color','#ddd')
										.append("<div class='ffmpeg-command-line'>"
										+ "FFmpeg command line</div><pre>"
										+ commandline + "</pre>");
									$(".ffmpeg-command-line")
										.css("font-weight","bold")
										.css('text-align','center');
									$("#direct-link pre")
										.css("font-size",".85em")
										.css("white-space","pre-wrap")
										.css("word-break","break-all");
								}
							});
						}
					}
				});
				document.TheVideoBefore = document.TheVideoNow;
			}
		});
		$(window).trigger( 'hashchange' );
	} // end Rai Replay

	// handle RTMP based flash objects on Rai.it
	var i = 0;
	$("object").not("object object").each(function() {
		var o = $(this);
		var flashvars = o.find("param[name=flashvars]").attr("value");
		var path = flashvars.replace(/.*percorso=/gi, "").replace(/&.*/gi, "").replace(/\?.*/gi, "");
		if(path.toLowerCase().indexOf("rtmp")!=-1) {
			var host = (path.split("/"))[2];
			var app = (path.replace(/\/mp4:.*/gi,'').split("/")).slice(3).join("/");
			var split = path.split("mp4:");
			var playPath = "mp4:" + split[1];
			var name = purifyTitle(playPath.replace(/mp4/gi,"")) + ".mp4";
			var tcUrl = split[0];
			var player = "http://" + window.location.host + o.find("param[name=movie]").attr("value");
			var referer = window.location.href;
			
			var commandline = "rtmpdump -n " + host + " -t " + tcUrl + " -y " + playPath + " -a " + app
				+ " -p " + referer + " --swfVfy " + player + " -o " + name;
			
			// write the command line under the video
			o.after("<div class='rtmp-command-line' id='rtmp-command-line-" + i + "' />");
			$("#rtmp-command-line-"+i).append("<div>RTMPdump command line</div><pre>" + commandline + "</pre>");
			i++;
		}

	});
	$(".rtmp-command-line div").css("font-weight","bold").css('text-align','center');
	$(".rtmp-command-line")
		.css('padding', '5px')
		.css('margin', '10px auto')
		.css('width', '95%')
		.css('border', '1px solid #888')
		.css('box-shadow', '0px 5px 15px 0px rgba(0, 0, 0, .7)')
		.css('background-color','#ddd');
	$(".rtmp-command-line pre")
		.css("font-size",".85em")
		.css("white-space","pre-wrap")
		.css("word-break","break-all");
	// end code for flash videos

}); // end document.ready