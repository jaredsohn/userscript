// ==UserScript==
// @name           Unfuck Comedy Now
// @namespace      http://userscripts.org/users/67379
// @description    Resizes items on the episode page
// @include        http://watch.thecomedynetwork.ca/*/#clip*
// ==/UserScript==

function OnBody() {
	try {
	// onload doesn't work, and sometimes this is null.
	var flashplayer = document.getElementById('__FlashPlayer');
	if (!flashplayer) {
		setTimeout(OnBody, 50);
		return;
	}
	
	/*
	<embed width="100%" height="100%"
	flashvars=
	"videoURL=rtmp%3A//cp45909.edgefcs.net/ondemand/all/sales/preroll/SCTVSatSunFalbo_e.flv&amp;
	bugURL=&amp;
	isAd=true&amp;
	nowPlaying=&amp;
	permalinkURL=
http://ad.doubleclick.net/click%3Bh%3Dv8/3a15/3/0/%2a/n%3B228636162%3B0-0%3B0%3B32522470%3B31-1/1%3B38233994/38251751/1%3B%3B%7Esscs%3D%3f
	http://www.thecomedynetwork.ca/shows/showdetails.aspx?sid=27945"
	allowfullscreen="true"
	wmode="transparent"
	allowscriptaccess="always"
	quality="high"
	bgcolor="#000000"
	name="__FlashPlayer"
	id="__FlashPlayer"
	style=""
	src="http://watch.thecomedynetwork.ca/Flash/player.swf?themeURL=http://watch.thecomedynetwork.ca/themes/Comedy/player/theme.aspx"
	type="application/x-shockwave-flash">
	*/
	
	var target = document.getElementById('BigBoxAd');
	target.parentNode.removeChild(target);
	target = document.getElementById('Permalinks');
	target.parentNode.removeChild(target);
	target = document.getElementById('SocialBookmarks');
	target.parentNode.removeChild(target);
	target = document.getElementById('SocialTabsContainer');
	target.parentNode.removeChild(target);
	target = document.getElementById('Header');
	target.parentNode.removeChild(target);
	target = document.getElementById('Footer');
	target.parentNode.removeChild(target);
	
	target = flashplayer;
	target.width  = '';
	target.height = '';
	target.style['width']   = '100%';
	target.style['height']  = '100%';
	target.style['margin']  = '0';
	target.style['padding'] = '0';
	
	target = document.getElementById('Viewer');
	target.width  = '';
	target.height = '';
	target.style['width']   = '450px';
	target.style['height']  = '400px';	
	target.style['margin']  = '0';
	target.style['padding'] = '0';
	
	target = document.getElementById('Player');
	target.width  = '';
	target.height = '';
	target.style['width']  = 'auto';
	target.style['height'] = 'auto';
	
	target = document.getElementById('Video');
	target.width  = '';
	target.height = '';
	target.style['width']  = '100%';
	target.style['height'] = '500px';
	
	target = document.getElementById('Container');
	target.width  = '';
	target.height = '';
	target.style['height'] = 'auto';
	
	} catch (e) { alert(e); }
}
OnBody();
