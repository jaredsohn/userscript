// ==UserScript==
// @name       arte.tv download video
// @namespace  http://jonas.brekle/
// @version    0.1
// @description  download video on arte.tv 
// @match      http://www.arte.tv/guide/*
// @copyright  2013+, Jonas Brekle, LGPL v2.0
// ==/UserScript==

var newButton = $("<li class='span2 phone-align'><a class='btn btn-block'>generate link</a></li>");
newButton.appendTo("#details-functions");
newButton.click(
	function(){
		$("span.icomoon-play").click();
		var hiddenDiv = $("<div/>"); 
		hiddenDiv.hide(); 
		hiddenDiv.appendTo('body'); 
		hiddenDiv.load(
			$("#arte_vp_jwplayer_iframe iframe").attr("src") + " meta[name='twitter:player:stream']" , 
			function(){ 
				var videoUrl = hiddenDiv.find("meta").attr("content");
				newButton.find("a").replaceWith("<a class='btn btn-block' href='"+videoUrl+"'>link (right click me)</a>")
			}
		);
    }
);