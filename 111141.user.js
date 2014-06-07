// ==UserScript==
// @name           theinterviews
// @namespace      ro.futa.gm
// @include        http://theinterviews.jp/*
// ==/UserScript==

(function(){
	var $ = unsafeWindow.jQuery;
	$('div.share iframe[src^="http://www.facebook.com/"]').each(function(key, item){
		$(item).parent().css({float:"none"});
		$(item).css({width: "600px", height: "100px"});
		item.src = item.src.split("show_faces=false").join("show_faces=true");
		item.src = item.src.split("layout=button_count").join("");
	});
	$("div.log div.foot").css({height: "100px"});	
})();