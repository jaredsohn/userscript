// ==UserScript==
// @name           zerochan
// @namespace      zzz
// @description    preview image
// @include        http://www.zerochan.net/
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); window.stop(); }
}
// sync
GM_wait();

function letsJQuery() {								
	
	$("p.thumb a img").mouseenter(function(){
		link =  "http://www.zerochan.net" + $(this.parentNode).attr("href");
		response = '';
		$.ajax({ type: "GET",   
			 url: link,   
			 async: false,
			 success : function(text)
			 {
				 response = $(text).find("div#large img").attr("src");
			 }
		});
		
		$("body").append("<div id='test'></div>");
		$("div#test").html(link);
		$("div#test").css("position", "fixed");
		$("div#test").css("top", "0");
		$("div#test").css("right", "200px");				
		$("div#test").append("<img src="+response+" />");		
	});
	
	$("p.thumb a img").mouseleave(function(){
		$("div#test").remove();
	});
}