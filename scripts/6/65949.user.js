// ==UserScript==
// @name           Allkpop Remove Ads
// @namespace      www.leddytech.com/allkpop
// @include        http://www.allkpop.com/
// @include        http://*.allkpop.com/*
// @version	       1.0.3
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function removeAds() {
	addGlobalStyle('.menu { top: 48px !important;}');
	addGlobalStyle('.custom #sidebar_1 li.akp-ad-unit {display:none !important;}');
	addGlobalStyle('.custom #sidebar_2 li.akp-ad-unit {display:none !important;}');
	addGlobalStyle('.custom .akp-ad-unit {display:none !important;}');	
	addGlobalStyle('#akp-head .akp-ad-unit {display:none !important;}');
	//addGlobalStyle('body {background-image: none !important;}');

	var topbanner = document.getElementById('akp-ad-unit-1');
	if(topbanner) {
		topbanner.parentNode.removeChild(topbanner); 
	}
	var dropdown = document.getElementById('a2apage_dropdown');
	if(dropdown) {
		dropdown.parentNode.removeChild(dropdown); 
	}
	
}
removeAds();
setTimeout(function() {removeAds()},2200);



