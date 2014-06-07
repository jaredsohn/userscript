// ==UserScript==
// @name           Weblancer ads killer
// @namespace      
// @description    delete advetisments from weblancer 
// @include        http://weblancer.*/*
// ==/UserScript==

function init(){
	var ads = document.getElementById('announce_box');
	if (ads) {
    	ads.parentNode.removeChild(ads);
	}

}

init();