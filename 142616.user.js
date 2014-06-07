// ==UserScript==
// @name           Youtube to mp3
// @namespace      youtubetomp3
// @version        1.7
// @author         FDisk
// @description    Convert and download youtube video as mp3 with no popups
// @include        http://*.youtube.com/watch*
// @include	   http://youtube.com/watch*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://usocheckup.redirectme.net/74493.js
// ==/UserScript==

var debuger = false;
var url = $("meta[property=og:url]").attr("content");

	var button = $('<button type="button" title="lik disini dan tunggu." class="yt-uix-tooltip yt-uix-button yt-uix-button-default" id="downloadbutton" data-tooltip-title="Click here and wait for download." data-tooltip-timer="1521"><img alt="" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="yt-uix-button-icon-watch-url"> <span class="yt-uix-button-content">Download as mp3</span></button>');

	if (url.indexOf('youtube') != -1) {
		$('#watch-headline-user-info').append(button);
		$(button).click(function(){
			$(this).text('Converting...');
			prepare();
		});
	}

	function prepare() {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.youtube-mp3.org/api/pushItem/?item="+url+"&xy=yx",
			//data: "item="+url,
			headers: {
			    "Accept-Location": "*",
				"Referrer": "http://www.youtube-mp3.org/"
			},
			onload: function(response) {
				if (debuger) console.debug(url,response);

				var sCode = response.responseText;

				if (sCode.length > 0) {

					convert(sCode);
				}
			}
		});
	}
	
	function pushItemYTError() {
	
		$(button).text('Error. Cannot convert this video').attr('data-tooltip-text','There was an Error caused by YouTube, we cannot deliver this Video! This error is mostly caused by copyright issues or the length of the video. We only support videos with maximum of 20 minutes.').attr('title','There was an Error caused by YouTube, we cannot deliver this Video! This error is mostly caused by copyright issues or the length of the video. We only support videos with maximum of 20 minutes.');
	}

	function convert(sCode) {

		if (debuger) console.debug('Converting: ' + sCode);

		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.youtube-mp3.org/api/itemInfo/?video_id=" + sCode,
			onload: function(response) {
				if (debuger) console.debug(response.responseText);
				eval(response.responseText);

				if (info.status == 'serving') {
					download(info, sCode);
				}
				else if (info.status == 'loading' || info.status == 'converting' || info.status == 'pending') {
					$(button).html('[' + info.status + ']' + (info.status != 'pending' || info.status != 'converting' ? ': '+info.progress+'% ('+info.progress_speed+'kB/s).' : '') + ' Status update in: <span class="countdown">'+5+'</span>s.').attr('disabled','disabled');
					$('span.countdown').countdown({
						seconds: 5,
						callback: 'convert("'+sCode+'")'
					});
					/*window.setTimeout(function(){
						convert(sCode);
					}, (6000));*/

				}
				else {
					console.debug(response);
					alert(info.status);
				}
			}
		});
	}

	function download(info,sCode) {
		$(button).text('Download ready. Click here.').removeAttr('disabled');
		$(button).click(function(){
			var win = window.open("")
			win.location.href = "data:text/html,%3Cmeta%20http-equiv%3D%22refresh%22%20content%3D%220%3Burl%3Dhttp://www.youtube-mp3.org/get?video_id=" + sCode + "&h=" + info.h + "%22%3E%20";
			window.setTimeout(function(){
				win.close();
			}, (5000));
			$(button).attr('title','Downloaded: ' + info.title).text('Download as mp3').unbind('click');
		});
	}

jQuery.fn.countdown = function(options) {
	if(!options) options = '()';
	if(jQuery(this).length == 0) return false;
	var obj = this;

	if(options.seconds < 0 || options.seconds == 'undefined') {
		if(options.callback) eval(options.callback);
		return null;
	}
	window.setTimeout(
		function() {
			var lvTime = new Date(0,0,0,0,0,0);
			lvTime.setSeconds(options.seconds);
			jQuery(obj).html(lvTime.getSeconds());
			--options.seconds;
			jQuery(obj).countdown(options);
		}
		, 1000
		);

	return this;
}
jQuery.fn.countdown.stop = function() {
	window.clearTimeout(setTimeout("0")-1);
}