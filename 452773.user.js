// ==UserScript==
// @name           TvShow Time Overlay 
// @description    Kieron 
// @namespace      http://www.test.com 
// @version        1.0
// @include        http*://www.tvshowtime.com/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

if(document.title == "TVShow Time - Watch and track TV shows online"){
	document.body.innerHTML = document.body.innerHTML.replace(/play-btn no-video /g, 'play-btn video ');
}
  
var t1 = $("meta[property='og:title']").attr("content");
title = t1.replace(" -","");
    
$(document).ready(function(){  //document ready  
setTimeout(function(){
    if(document.URL.indexOf("#autoplay") >= 0){ 
	document.getElementById("http://thepiratebay.se/search/"+title+"/0/7/200").click();
}
     window.unsafeWindow || (
	unsafeWindow = (function() {
		var el = document.createElement('p');
		el.setAttribute('onclick', 'return window;');
		return el.onclick();
	}())
);
 
unsafeWindow.jQuery('.modal, .modal-backdrop').remove().end().add('#content').show();
$(document).ready(function(){
	var t = setTimeout(fix_timer, 100);    
});

$('.play-btn').click(function() {
   	var isClicked = $(this).data('clicked');
    document.getElementById("http://thepiratebay.se/search/"+title+"/0/7/200").click();
	$(document).ready(function(){
			var t = setTimeout(fix_timer, 0001);
	});

if (!isClicked) {
    document.getElementById("http://thepiratebay.se/search/"+title+"/0/7/200").click();	
    $(document).ready(function(){
		var t = setTimeout(fix_timer, 0001);
	});
    $(this).data('clicked', true);
    } else {}
});
     
 }, 0001);

});

function fix_timer(){
	$(".modal-dialog").remove();
    $('.modal-backdrop').remove();
    $(".modal").remove();
}
