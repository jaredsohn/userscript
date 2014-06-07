// ==UserScript==
// @name          Tumblr icons
// @description	  Makes the new post icons mine
// @namespace    neversettle15
// @include       http://www.tumblr.com/*
// By Alyssa Adapted from Jason Rhyley
// ==/UserScript==

(function() {

	var kil = document.createElement('style'); 
	kil.setAttribute('type','text/css'); 
	kil.appendChild(document.createTextNode('.new_post_label_icon{background-image: url(http://i52.tinypic.com/9pv0i9.jpg) !important;}#new_post_label_text:active .new_post_label_icon{background-position:2px -5px !important;}#new_post_label_photo:active .new_post_label_icon{background-position:-73px -5px !important;}#new_post_label_quote:active .new_post_label_icon{background-position:-148px -5px !important;}#new_post_label_link:active .new_post_label_icon{background-position:-223px -5px !important;}#new_post_label_chat:active .new_post_label_icon{background-position:-298px -5px !important;}#new_post_label_audio:active .new_post_label_icon{background-position:-373px -5px !important;}#new_post_label_video:active .new_post_label_icon{background-position:-448px -5px !important;}'));
	document.body.insertBefore(kil, document.body.firstChild); 

})();
