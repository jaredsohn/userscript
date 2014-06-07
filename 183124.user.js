// ==UserScript==
// @name           vidto.me autoproceed
// @description    Automatically proceeds to video
// @author         Alorel
// @include        http://vidto.me/*.html
// @require        http://code.jquery.com/jquery-2.0.3.min.js
// @version        1.0
// ==/UserScript==

if (!$("div.video-main").html()) {
	window.setTimeout(function(){
		$("form").submit();
	},6500);
}
