// ==UserScript==  
// @name         quanben kill ad
// @author       111skr@163.com  
// @description  A javascript snippet to help you kill www.quanben.com's ad
// @include      *://www.quanben.com/*
// @include      *://www.quanben.com/*
// ==/UserScript== 
function withjQuery(callback, safe){
	if(typeof(jQuery) == "undefined") {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";

		if(safe) {
			var cb = document.createElement("script");
			cb.type = "text/javascript";
			cb.textContent = "jQuery.noConflict();(" + callback.toString() + ")(jQuery);";
			script.addEventListener('load', function() {
				document.head.appendChild(cb);
			});
		}
		else {
			var dollar = undefined;
			if(typeof($) != "undefined") dollar = $;
			script.addEventListener('load', function() {
				jQuery.noConflict();
				$ = dollar;
				callback(jQuery);
			});
		}
		document.head.appendChild(script);
	} else {
		callback(jQuery);
	}
}
withjQuery(function($){
$(document).ready(function(){
    $("#info").next("div").remove();
    $("#span_dd").nextAll("div").remove();
    $("#headlink").nextAll("div").remove();
    $("center").remove();    
    $("#adtop").before("<h1 style='color:red;text-align: center;'>remove ad success</h1>");
    });
},true)