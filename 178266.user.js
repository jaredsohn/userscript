// ==UserScript==
// @name        	Crazy loves Farma
// @namespace   	farma
// @author			Stefan Ninic
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include     	http://www.mondo.rs/Naslovna
// @version     	1.1
// ==/UserScript==

$ = jQuery = jQuery.noConflict(true);
$(document).ready(function(){	
	var list = ["farma","farme","farmi","farmom","farmu","farmo"];	
	$(".small_news ul li, .big_news, .news_image_box, .news_list ul li, .hot_news ul li").each(function(){		
		var title = $(this).find("h3 a, h2, a, a, a").text();
		for(var i=0;i<list.length;i++){
			if(title.toLowerCase().indexOf(list[i]) != -1){
				$(this).remove();
			}
		}
	});
});