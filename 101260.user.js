// ==UserScript==
// @name           twitter toLocaltime for new UI
// @version        2.8
// @namespace      http://twitter.com/inmoutan
// @auther         inmoutan
// @description    Rewrite twitter timestamp to localtime for new UI.
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


(function() {
	var filter = function(elem){
		$(elem).find('a.tweet-timestamp').each(function(){
			if(!$(this).find('span.localtime').length){
				var data = $(this).attr('title');
				if(data!=null){
				$(this).append('<span class="localtime"> - '+data+'</span>');
				}
			}
		});
	}
	
	$.event.add(window, "load", function(){
		filter('.tweet');
	});
	
	$(document).delegate(".stream-item", "DOMNodeInserted", function() {
		filter($(this));
	});
	
})();
