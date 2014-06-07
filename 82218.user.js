var GMSU_meta_74493 = <><![CDATA[
// ==UserScript==
// @name           Youtube to mp3
// @namespace      youtubetomp3
// @version        1.0
// @author         CSpencer
// @description    Convert and download youtube video as mp3
// @include        http://*.youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?v=*&*
// @include        http://*.myvideo.de/watch/*
// @include        http://www.clipfish.de/*/video/*
// @include        http://*.sevenload.com/videos/*
// @include        http://*.sevenload.com/shows/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/51513.user.js
// ==/UserScript==
]]></>;

//Check for updates
GMSU.init(74493);

var debuger = false;
var url = window.location.href;

$(function(){
	var button = $('<button type="button" title="Steve please click and wait for download." class="master-

sprite yt-uix-button yt-uix-tooltip" id="subscribeDiv" data-tooltip-title="Click here and wite" data-tooltip-

timer="1521"><img alt="" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="yt-uix-button-icon-watch-url"> 

<span class="yt-uix-button-content">Download as mp3</span></button>');

	if (url.indexOf('youtube') != -1) {
		$('#watch-headline-user-info').append(button);
		$(button).click(function(){
			$(this).text('Converting...');
			prepare();
		});
	} else if (url.indexOf('myvideo') != -1) {
		GM_addStyle("#subscribeDiv {font-size:12px}");
		var what = $('#video_player_id');
		$(button).addClass('btn sCenter');
		$('td:eq(2)',what).css('width','inherit').append(button);
		$(button).click(function(){
			$(this).text('Converting...');
			prepare();
		});
	} else if (url.indexOf('clipfish') != -1) {
		GM_addStyle("#subscribeDiv {background:none repeat scroll 0 0 transparent;border:medium 

none;bottom:3px;color:#666666;float:right;font-size:12px;position:absolute;right:10px;}");
		var what = $('#cf-main-content-container');
		$(button).addClass('btn sCenter');
		$('.cf-two-columns-left > div > div.cf-rounded-box-top > h1',what).append(button);
		$(button).click(function(){
			$(this).text('Converting...');
			prepare();
		});
	} else if (url.indexOf('sevenload') != -1) {
		GM_addStyle("#subscribeDiv {background:url

(http://static.sevenload.net/img/modules/Item/tabViewBG.gif) no-repeat center left transparent;margin-

right:15px;padding-left:15px;cursor:pointer}");
		button = $('<a id="subscribeDiv"> Download as mp3</a>');
		if (url.indexOf('shows') != -1) {
			GM_addStyle("div.generatedShow div#showPlayer {margin-bottom:20px;text-align:center} 

#subscribeDiv {background:url(http://static.sevenload.net/img/structure/dropdown_dark_gray.png) no-repeat;}");
			$('#showPlayer').append(button);
		} else {
			var what = $('.itemNavigation:eq(0)');
			$('a:eq(1)',what).after(button);
		}
		$(button).click(function(){
			$(this).text('Converting...');
			prepare();
		});
	}
	
	function prepare() {
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://www.video2mp3.net/check.php",
			data: "hq=1&url="+window.location.href+"&hq=1&server=&lang=en&adblock=1",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				if (debuger) console.debug(response.responseText);
				var res = response.responseText.split('|');
				var message = res[0];
				var wait = res[1];
				var id = res[2];
				var service = res[3];
				var server = res[4];
				if (wait > 1) {
					$(button).html('Please '+message+' <span class="countdown">'+wait

+'</span>s.').attr('disabled','disabled');
					$('span.countdown').countdown({
						seconds: wait
					});
					window.setTimeout(function(){
						download(id,service,server);
					}, (wait * 1000 + 500));

				} else {
					if (debuger) console.debug(res);
					server = res[5];
					$(button).text('Grabbing Video:').attr('disabled','disabled');
					window.setTimeout(function(){
						update(id,service,server);
					}, 5000);
				}
			}
		});
	}

	function update(id,service,server) {
		if (debuger) console.debug(id+':'+service+':'+server);
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.video2mp3.net/update.php?v="+id+"&service="+service+"&hostname="+server

+"&lang=en",
			//data:"",
			onload: function(response) {
				if (debuger) console.debug(response.responseText);
				var res = response.responseText.split('|');
				var message = res[0];
				
				if (message == 'OKCONVERT') {
					download(id,service,server);
				} 
				else if (message == 'MESSAGE') {
					var procent = res[1].split('<h2>')[1].split('</h2>')[0];
					var text = res[1].replace(/(<([^>]+)>)/ig,"").replace(procent, 

'').substring(0,40)+'... '+procent+' done.';
					$(button).text(text).attr('disabled','disabled');
					window.setTimeout(function(){
						update(id,service,server);
					}, 5000);
				}
				else if (message == 'ERROR') {
					var text = res[1].replace(/(<([^>]+)>)/ig,"");
					$(button).removeAttr('disabled').attr('title','Click here to try again.')
					$(button).text(text);
				}

			}
		});
	}

	function download(id,service,server) {
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://www.video2mp3.net/check.php",
			data: "v="+id+"&service="+service+"&hostname="+server+"&lang=en",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				if (debuger) console.debug(response.responseText);
				var res = response.responseText.split('|');
				var message = res[0];
				var service = res[1];
				var url = res[2];
				var title = res[3];
				var id = res[4];
				var size = res[5];
				var lenght = res[6];
				var quality = res[7];
				var thumbnail = res[8];
				$(button).text(title+' - '+size+'MB');
				$(button).unbind('click');
				$(button).click(function(){
					window.location.href = url;
				});
				$(button).removeAttr('disabled').attr('title','Click here and download the mp3.');
			}
		});
	}
});

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