// ==UserScript==
// @name           gtfoFacebookAds
// @namespace      http://localhost
// @description    Removes the dumb ad column on facebook. Take that!
// @author         Xyan Flux
// @version        1.0.0
// @include        http://www.new.facebook.com*
// @include        http://apps.new.facebook.com*
// @exclude
// ==/UserScript==

var ads;
var times;
check();

function check(){
	ads =  document.getElementById('sidebar_ads');
	if(ads){
		ads.parentNode.removeChild(ads);
		setTimeout(check,1000);	
	}else{
		times=10;
		setTimeout(recheck,100);
	}
}

function recheck(){
	ads =  document.getElementById('sidebar_ads');
	times =10;
	if(ads){
		ads.parentNode.removeChild(ads);
		setTimeout(check,1000);
	}else if(times-->0){
		setTimeout(recheck,100);
	}else{
		setTimeout(check,1000);
	}
}





