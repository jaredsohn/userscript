// ==UserScript==
// @id             No Embedded Recomendations
// @name           No Embedded Recomendations
// @version        1.0
// @namespace      test
// @author         SEGnosis
// @description    No Embedded Recomendations on youtube
// @include        *www.youtube.com*
// @run-at         document-end
// @require        http://code.jquery.com/jquery-1.7.1.js
// ==/UserScript==


$(document).ready(function(){
	setInterval(function(){
		$(".feed-item-rec-reason-text").parents(".feed-item-container").parent().remove();
	}, 1000);
});
