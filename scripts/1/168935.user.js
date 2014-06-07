// ==UserScript==
// @name           Skip Youtube Age
// @description    Puts an embedded youtube player in the place of the youtube age filter, so you can skip signon
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @author         jetdog
// @version        1
// ==/UserScript==

if(document.getElementById('watch7-player-age-gate-content')) {
	var api=document.createElement('div');
	api.setAttribute("class", "player-width player-height");
	api.style.overflow="hidden";
	
	var obj=document.createElement('object');
	obj.style.width="100% !important";
	obj.style.height="100% !important";
	obj.data=window.location.href.split('watch')[0] + '/v/' + window.location.href.split('v=')[1].split('&')[0] + "?&amp;rel=0&amp;fs=1"
	obj.type="application/x-shockwave-flash";
	
	var wmode=document.createElement('param');
	wmode.name="wmode";
	wmode.value="transparent";
	obj.appendChild(wmode);
	
	var quality=document.createElement('param');
	quality.name="quality";
	quality.value="high";
	obj.appendChild(quality);
	
	var allowFullScreen=document.createElement('param');
	allowFullScreen.name="allowFullScreen";
	allowFullScreen.value="true";
	obj.appendChild(allowFullScreen);
	
	api.appendChild(obj);
	
	var toReplace=document.getElementById('player-unavailable');
	toReplace.parentNode.replaceChild(api, toReplace);
}