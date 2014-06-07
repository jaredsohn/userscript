// ==UserScript==
// @id             twitter.com-718c826a-c5cd-7348-a7fa-4f2b4ff632e4@scriptish
// @name           NikeStore thingy
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        https://twitter.com/NikeStore/*
// @include        https://twitter.com/NikeStore/
// @include        https://twitter.com/NikeStore
// @include        http://twitter.com/NikeStore/*
// @include        http://twitter.com/NikeStore/
// @include        http://twitter.com/NikeStore
// @run-at         window-load
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var i = 0;

$('.tweet').each(function(){
	var x = $(this).find('.js-tweet-text').text();
	var ts = parseInt($(this).find('._timestamp').data('time'));
	var el = parseInt(Date.now() / 1000) - ts;
	if(x.toLowerCase().contains('jordan')) {
	// MODIFY THE vvvvv NUMBER HERE TO CHANGE HOW OLD TWEETS NEED TO BE (seconds)
		if(el < 13600) {
			var url = x.match(/http:\/\/swoo\.sh\/[\w\d]+/i)[0];
			window.open(url, 'nikestorewindow' + (++i));
		}
	}

});

if(!i) window.setTimeout(function(){window.location.reload();},3000);

