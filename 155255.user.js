// ==UserScript==
// @name           ClipConverter
// @description    ClipConverter Browser Addon
// @author         Lunaweb
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @include        https://*.youtube.com/watch?*
// @include        https://youtube.com/watch?*
// ==/UserScript==
function readCookie(n) {
	var cookiecontent = new String();
	if(document.cookie.length > 0) {
		var cookiename = n + '=';
		var cookiebegin = document.cookie.indexOf(cookiename);
		var cookieend = 0;
		if(cookiebegin > -1) {
			cookiebegin += cookiename.length;
			cookieend = document.cookie.indexOf(";", cookiebegin);
			if(cookieend < cookiebegin) {
				cookieend = document.cookie.length;
			}
			cookiecontent = document.cookie.substring(cookiebegin, cookieend);
			return unescape(cookiecontent);
		}
	}
	return false;
}
function getParam(variable){    
     var query = document.location.search.substring(1);     
     var vars = query.split("&");    
      for (var i=0;i<vars.length;i++) {      
            var pair = vars[i].split("=");     
            if(pair[0] == variable){return pair[1];}  
       }       return(false);  
}

window.addEventListener('DOMContentLoaded', function() {
	
	
	if(document.body && document.domain == 'www.youtube.com' && (document.getElementById('watch-headline-user-info')) || document.querySelectorAll("#watch7-sentiment-actions")[0]) {
		var icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM5NDU0RDIwRDQ1RjExREZBNkU3Q0FCMkU2OUIzNDYwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM5NDU0RDIxRDQ1RjExREZBNkU3Q0FCMkU2OUIzNDYwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzk0NTREMUVENDVGMTFERkE2RTdDQUIyRTY5QjM0NjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzk0NTREMUZENDVGMTFERkE2RTdDQUIyRTY5QjM0NjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5hHYvlAAAC9ElEQVR42nxTTUhUURQ+99434+ToODM2jRZDauJikiIoi4qiRdCiRRFEVBgR/cBAtApqUYugXZsKhBYuJCIrCGonSYiCi4JCrIhQkf7U9M2bcd68n/vXec8xgqAL37vnnnvP975zzr2kUChAMCilkEgkQsTj8XrG2B1091Wr1QnHcUBKCcFsWRbYtg2EkJU4+HfEhBB3Xdc9hcEJzjn8bxh/L5A15fv+A8/zDuPSQtxD35LWegLxFO3x/xFk8a8PUeZetIs1Xw7RjoG7cT6DuI/2LYRYTcFQnhcanNIM5taNGz4udSAIP6Jmc9Ca4d51VEKUUjf+KKg0pVcSN39N2pXKCV/KfuReiy4boYgQJayw0JTGcR2QXMWCDiNGwrTzIx9AUQYb341CevglFB1nGxdyAIPamJLnIZ15TX2XGWWriRuR9RLIBVQhkOBUQMDWnS2gVk2LuQ6tpIDI99k5p1Qa85Z+bbW37HhkXr75w8ltWvaS6XlqLs6QxfnnNhet2KmviArLnLkEyhdHiZSZcmtu1sxvB96yYUFPfX7hd2+f9bu23hbMOGh3bR6qtuRAO46m32bfSqVsVKJZ8lgvyKrTLMqVfuwjaMMQYmNHhO/c78nshgwvWsf5UukcUyItE8khqzOvlefq2NcpHdagbXA4vFX+YvGZ5vIYiRoVwqgFhuGDVI3adRuU1HiExIxU4wDEohe5z92IuYD90dhGRcJOSe5fE2apB7ly6I8F5GEXsAPBjIcdv2j2GukkIQ31vbw5ixU0gLnv34DCI7Q5ayrOx3h5eY9yqlnlehSlEuk6GqGk60ZU1WGSyydQFx/lM9Pgf/4IZPUxRDvzEO05ADKWWEsaUqdBeoewWR3guWkNOgWROoFqrjCQfXLmE3jjr0AtW0BYjUDXNJM1caDtecDfE8kia2h+V5+m0dN0fuak/DIxqL5P/zkbFhEJgnwbEXW1txFwUh1wMqMK+44UiDn3EybHH+ObbgjrEVxtgArC+S3AAPFbkuCGsMvQAAAAAElFTkSuQmCC';
		var clipconverterpath = 'http://www.clipconverter.cc/?ref=addon&version=128&browser=opera&url=' + encodeURIComponent(document.URL);
		
		if(document.getElementById('watch-headline-user-info')) {
			var div_embed = document.getElementById('watch-headline-user-info');
			var buttonclass = "yt-uix-button yt-uix-button-default yt-uix-tooltip";
				}  else if (document.querySelectorAll("#watch7-sentiment-actions")[0]) {
					var div_embed = document.querySelectorAll("#watch7-sentiment-actions")[0];
			var buttonclass = "yt-uix-button yt-uix-button-short yt-uix-tooltip yt-uix-button-subscription";
		}
		
		var title = '';
		var urlmap = '';
		var cookie = '';
		var target= '_blank';
		var re = /"url_encoded_fmt_stream_map": "(.*?)"/;
		var result = re.exec(document.body.innerHTML);
		if(result) {
			urlmap = (result[1]);
			title = (document.title);
			cookie = "VISITOR_INFO1_LIVE=" + readCookie("VISITOR_INFO1_LIVE");
			if(readCookie("goojf")) {
				cookie += "; goojf=" + readCookie("goojf");
			}
		}
		if(getParam('clipconverter')=='autostart' || getParam('clipconverter')=='frame') {
			target='_parent';
		}
		
		var form = '<form id="clipconverter" name="clipconverter" action="' + clipconverterpath + '" target="' + target + '" method="POST"><input type="hidden" name="urlmap" value="' + urlmap + '"><input type="hidden" name="title" value="' + title + '"><input type="hidden" name="format" id="format" value=""><input type="hidden" name="cookie" value="' + cookie + '"></form>';
		
		if(document.getElementById('header')) {
			document.getElementById('header').innerHTML += form;
		}
		else if(document.getElementById('footer')) {
			document.getElementById('footer').innerHTML += form;
		}		
		else if(div_embed) {
			div_embed.innerHTML += form;
		}
		if(div_embed) {
			div_embed.innerHTML += ' <span class="yt-uix-button-group"><a href="javascript:(function(){ document.getElementById(\'format\').value=\'\'; document.getElementById(\'clipconverter\').submit();  })();"><button class="start ' + buttonclass + '" type="button" title="Record video with ClipConverter"><img alt="" class="" style="" src="' + icon + '"> <span class="yt-uix-button-content"><strong>ClipConverter</strong></span></button></a>' + '<a href="javascript:(function(){ document.getElementById(\'format\').value=\'mp3\'; document.getElementById(\'clipconverter\').submit(); })();"><button class="' + buttonclass + '" type="button" title="Record audio as MP3">MP3</span></button></a>' + '<a href="javascript:(function(){ document.getElementById(\'format\').value=\'mp4\'; document.getElementById(\'clipconverter\').submit(); })();"><button class="end ' + buttonclass + '" type="button" title="Record video as MP4">MP4</span></button></a></span>';
		}
		
		
		if(getParam('clipconverter')=='autostart') {
			document.getElementById('clipconverter').submit();
		}			
		
		
	}
	
	
	
	
})();