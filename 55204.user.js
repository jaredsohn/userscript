// ==UserScript==
// @name           4fuckr.com Ad Hidr
// @description    Hides ads on 4fuckr.com
// @include        http://4fuckr.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(".thumb").each(function(){
	if(!$(this).attr("href").match(/image_\d+\.htm/)){
		$(this).parent().remove();
	}
});