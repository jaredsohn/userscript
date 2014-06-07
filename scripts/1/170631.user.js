// ==UserScript==
// @name	RSI direct link
// @namespace   http://andrealazzarotto.com/
// @include	http://rsi.ch/*
// @include	http://*.rsi.ch/*
// @version	1.1
// @description This script gives you the direct link while watching a video on la1.rsi.ch and la2.rsi.ch.
// @copyright   2013+, Andrea Lazzarotto - GPLv3 License
// @require	http://code.jquery.com/jquery-latest.min.js
// @grant	GM_xmlhttpRequest
// @updateURL	http://userscripts.org/scripts/source/170631.user.js
// @downloadURL http://userscripts.org/scripts/source/170631.user.js
// ==/UserScript==
$(document).ready(function(){
	$("embed").each(function (index, value){
		var obj = $(this);
		var url = obj.attr("flashvars").split("FileName")[1].split("'")[1];
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: {
				'Accept': 'application/json,text/x-json'
			},
			onload: function(responseDetails) {
				var r = responseDetails.responseText;
				var doc = $.parseJSON(r);
				var root = doc["streamingServerURL"];
				var path = doc["playList"][0]["url"];
				var start = Math.round(doc["playList"][0]["start"]);
				var end = Math.round(doc["playList"][0]["end"]);
				var myurl = root + path;
				var commandline = "rtmpdump -r " + myurl + " -o video-tmp.mp4 -A " + start + " -B " + end;
				
				commandline += "\nffmpeg -i video-tmp.mp4 -acodec copy -vcodec copy video.mp4 && rm video-tmp.mp4";
				commandline += "\necho 'Download and conversion done!'";
				
				$("<div class='rtmp-command-line' id='rtmp-command-line-" + index + "' />")
					.insertAfter(obj.parent());
				obj.parent().parent().css("height", "auto");
				$("#rtmp-command-line-" + index)
					.append("<div>RTMPdump command line + FFmpeg fix</div><pre>" + commandline + "</pre>");
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
			}
		}); // end ajax request
	}); // end each

});