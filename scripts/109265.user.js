// ==UserScript==
// @name           Original Sized Picture
// @namespace      userscripts.org
// @description    Redirects you to the original sized picture
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include        http://dailybooth.com/*
// ==/UserScript==

jQuery(document).ready(function(){
	var picUrl = jQuery("#main_picture_container img").attr("src");
	var picOrigUrl = picUrl.replace(/large/g, "original");
	jQuery("#main_picture_container").prepend("<a href='"+picOrigUrl+"'>Original size</a>");
});
