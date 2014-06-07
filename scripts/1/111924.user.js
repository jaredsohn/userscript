// ==UserScript==
// @name           Facebook Lightbox BG
// @namespace      http://userscripts.org/users/almightyju
// @description    Change Lightbox BG
// @include        http://facebook.com/*
// @include        http://www.facebook.com/*
// @include        http*://*.facebook.com/* 
// ==/UserScript==

function getSnowbox(){
	var d = document.getElementById("fbPhotoSnowbox");
	if(d == null) window.setTimeout(getSnowbox,100); 
	else d.style.backgroundColor="rgba(0, 0, 0, 0.75)";
}

getSnowbox();