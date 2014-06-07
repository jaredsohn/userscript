// ==UserScript==
// @id             sound_cloud_downloader
// @name           Soundcloud Song Ripper
// @version        1.0
// @namespace      sound_cloud_downloader
// @author         SEGnosis
// @description    Downloads sound cloud songs
// @include        *soundcloud.*
// @run-at         document-end
// @require        http://code.jquery.com/jquery-1.7.1.js
// ==/UserScript==

$(document).ready(function(){
	var results = document.getElementsByTagName("body")[0].innerHTML.match("sndcdn\.com\/(.*)\.png");
	
	if(results.length > 1 && $(".info-header.large").length == 1){
		var id = results[1].split("_")[0];
		$("#main-nav").prepend("<li class=\"nav no-submenu anonymous\" style=\"margin-left: 0px;\"><a id=\"download-mobile\" href=\"#\">Rip Song</a></li>");
	}
	
	$("#download-mobile").live("click", function(e){
		e.preventDefault();
		window.location.href = "http://media.soundcloud.com/stream/" + id;
	});
});