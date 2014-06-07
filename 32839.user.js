// ==UserScript==
// @name           MetaCafePlayer
// @version        1.1
// @namespace      0d92f6be108e4fbee9a6a0ee4366b72e
// @include        http://*metacafe.com/watch/*
// ==/UserScript==

/*
const_video_url_re = '(?:http://)?(?:www\.)?metacafe\.com/watch/([^/]+)/([^/]+/)?.*'
const_normalized_url_str = 'http://www.metacafe.com/watch/%s/'
const_disclaimer_url = 'http://www.metacafe.com/disclaimer'
const_age_post_data = 'allowAdultContent=1&submit=Continue+-+I%27m+over+18'
const_video_mediaurl_re = '"mediaURL":"(http.*?\.flv)"'
const_video_gdakey_re = '"gdaKey":"(.*?)"'
*/

var width = 560;
var height = 440;

var mime = "video/flv";
var mime2 = "application/x-quicktimeplayer"

/* Player */
var player = document.getElementById('FlashObj');
//alert(player);
if(player) {

	var media = null;
	var gdakey=null;
	var gotoYT = false;
	var scripts = document.getElementsByTagName('script');
	for(var i = 0; i < scripts.length && media == null && gdakey == null; ++i) {
	    /*if(!media)
        media = scripts[i].text.match(/"mediaURL":"([^"]+)/);
        if(!gdakey)
        gdakey = scripts[i].text.match(/"gdaKey":"([^"]+)/);*/
        
        if(!media)
        media = scripts[i].text.match(/mediaURL=([^&]+)/);
        if(!gdakey)
        gdakey = scripts[i].text.match(/gdaKey=([^&]+)/);
        if(!gotoYT)
        gotoYT = (scripts[i].text.match(/YTPortalVideoPlayer/) != null);
	}
	
	if(media == null || gdakey == null || gotoYT) {
		//alert('Unable to find video source');
		url = window.location.href.match(/watch\/yt-([^\/]+)/)[1];
		player.innerHTML = 
		'<a href="http://www.youtube.com/watch?v=' + url + '">This video is probably from YouTube. Go There!</a>';
		return;
	}
	
	var url = unescape(media[1].replace(/\\\//g,"/") ) +"?__gda__="+gdakey[1] ; //+ "&allowAdultContent=1&submit=Continue+-+I%27m+over+18";
	player.innerHTML = 
		'<embed src="' + url + 
		'" width="' + width + 
		'" height="' + height + 
		'" autoplay="true" loop="true" \
		type="' + mime + '"></embed><br/> \
		<a href="' + url + '" id="mpdl">Download</a>';

}
