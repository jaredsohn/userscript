// ==UserScript==  
// @name         www.imanhua.com's helper whicth help you go to next page when you click the image
// @author       111skr@163.com  
// @description  A javascript snippet to help you go to next page,and remove ad
// @include      *://www.imanhua.com/*
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
        $(".main").remove();
        $("#imanhua").bind("click",function(){
            next();
        })
    });
},true)