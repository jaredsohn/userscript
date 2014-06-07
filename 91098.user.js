// ==UserScript==
// @name           Tumblr dashboard photo bigger
// @description    This script displays large images on dashboard of Tumblr.
// @namespace      http://spais.jp
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// author: Ryo HAYASHI
// http://spais.tumblr.com
// ==/UserScript==

var evt = document.createEvent('MouseEvents');
evt.initEvent('click', false, true);
var h = document.body.offsetHeight - 1;

function d(){
	var imgs = document.getElementsByTagName('img');
	for(var i = 0; i < imgs.length; i++){
		var img = imgs[i];
		if(!img.className.match(/image_thumbnail/)) continue;
		if(img.className.match(/enlarged/)) continue;
		img.dispatchEvent(evt);
	}
}
setInterval(function(){
	if(h < document.body.offsetHeight) {
		d();
		h = document.body.offsetHeight;
	}
}, 2000);