// ==UserScript==
// @name		Video.mediaset.it native video player and direct links
// @namespace   http://andrealazzarotto.com
// @description This script allows you to watch and download videos on Video Mediaset.
// @include	 http://www.video.mediaset.it/video/*
// @version	 4.3
// @require	 http://code.jquery.com/jquery-latest.min.js
// @grant	   GM_xmlhttpRequest
// @updateURL	https://userscripts.org/scripts/source/151516.user.js
// @downloadURL https://userscripts.org/scripts/source/151516.user.js
// ==/UserScript==
$(document).ready(function(){
	var chunks = window.location.pathname.split("/");
	var id = chunks[4];
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://video.lazza.dk/vd.php?id='+id,
		headers: {
	  		'Accept': 'application/atom+xml,application/xml,text/xml'
	  	},
		onload: function(responseDetails) {
			var r = responseDetails.responseText;
			var doc = $.parseXML(r);
			$xml = $( doc );
			var videos = $xml.find("video");
			var vlinks = [];
			var embed_url = "";
			
			// parse video URLs
			videos.each(function (i) {
				var url = $( videos.get(i) ).attr("src");
				var type = url.slice(-3);
				var name = "";
				switch(type) {
					case "est": name = "Smooth streaming"; break;
					case "pl)": name = "Apple streaming"; break;
					case "flv": name = "Video FLV"; break;
					case "f4v": name = "Video F4V"; break;
					case "mp4":
						embed_url = url;
						name = "Video MP4";
						break;
					case "wmv": name = "Video WMV"; break;
				}
				vlinks.push( { na: name, url: url } );
			});
			
			// display video URLs
			num = vlinks.length;
			$("#spinner").remove();
		
			$('<div id="video-links">')
					.css('padding', '5px')
					.css('margin', '10px 0')
					.css('border', '1px solid #888')
					.css('text-align','center')
					.css('background-color', '#cfc')
					.css('box-shadow', '0px 5px 15px 0px rgba(0, 0, 0, .7)')
					.appendTo('#box-apertura');
			for(var i=0; i<num; i++) {
				var o = vlinks[i];
				var s = '<a href="'+o.url+'">'+o.na+'</a>';
				$(s).appendTo('#video-links');
				if(i!=num-1)
					$('<span>&nbsp;|&nbsp;</span>').css('color','#888').appendTo('#video-links');
			}
			
			// add video player
			
			if (embed_url) {
				setTimeout(function() {
					var style = $("#myVideoContainer").attr("style");
					if (style){
						if(unsafeWindow.myPlayer != null) {
							unsafeWindow.myPlayer.pause(); // mute annoying flash player
							unsafeWindow.count = 0;
							setTimeout(function() {
								unsafeWindow.myPlayer.pause(); // sometimes you need to do it again and again
								unsafeWindow.count++;
								if(unsafeWindow.count < 75)
									setTimeout(arguments.callee, 500);
							}, 500);
						}
						$("#myVideoContainer").empty();
						$("#myVideoContainer").replaceWith("<embed width='100%'"
						+ "height='100%' style='" + style + "' src='"
						+ embed_url + "' type='application/x-mplayer2' "
						+ "autoplay='true' />");
					} else {
						setTimeout(arguments.callee, 400);
					}
				},400);
			}
		}
	});
});