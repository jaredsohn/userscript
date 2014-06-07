// ==UserScript==
// @name	Xuite Album Expander
// @description Expand thumbnails into full size pictures in Xuite.
// @include	http://photo.xuite.net/*
// ==/UserScript==

function album_expander($){
	$('.photo_item').each(function(){
		var $this = $(this);
		var page = $this.find('a').attr('href') + '/sizes/o/';
		$.get(page, function(data){
			var imgsrc = $(data).find('#photo').find('img').attr('src');
			$this.find('.photo_cover').attr('src', imgsrc).removeClass('photo_cover').removeClass('fixed');
		});
		$this.removeClass('photo_item');		
	});    
}

function GM_wait(){
    if (typeof jQuery == 'undefined') window.setTimeout(GM_wait, 100);
    else album_expander(jQuery);
}

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

GM_wait();