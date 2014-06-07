// ==UserScript==
// @name           Turntable.fm Left-side Chat
// @namespace      ttlsc
// @description	   Moves chat to left of turntable.fm rooms
// @author         turntable.fm
// @include        http://turntable.fm/*
// @version        1.1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	callback = main;

	var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}

// Add jQuery
    (function(){
		window.setTimeout(addJQuery, 5000);
    })();

	function main() {
		$('.chat-container').appendTo('body').width((($(window).width()-$('#outer').width())/2)+'px').height($('#outer').height()+'px').css('top','0').css('left','0'); $('.messages').height(($('#outer').height()-40-25)+'px'); $('.message').width('100%'); $('.messages').bind('DOMNodeInserted',function(){$(this).find('.message').last().width('100%');}); $('.playlist-container').height(($('#outer').height()-40-56)+'px'); $('.queueView').height(($('#outer').height()-40-82)+'px'); $('.songlist').height(($('#outer').height()-40-125)+'px');
	}
