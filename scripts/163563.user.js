// ==UserScript==
// @name           change color twitts in tweetdeck by hovering mouse
// @version        0.0.2
// @namespace      http://twitter.com/aladiah_
// @author         aladiah
// @description    tryout
// @include        https://web.tweetdeck.com/
// @include        https://web.tweetdeck.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant          none
// ==/UserScript==


(function($) {
	var porEncima=function(ele){
	   setTimeout(function(){
    	   $(ele).css("background-color","#9BFA9B");
	   },1000);
	}
	$(document).delegate("article", "mouseover", function() {
		porEncima($(this));
	});
})(jQuery.noConflict(true));