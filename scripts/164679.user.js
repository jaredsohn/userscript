// ==UserScript==
// @name        noGIF
// @namespace   info.avramovic.www
// @description Disable GIFs by default
// @include     *
// @version     0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==


$(document).ready(function() {

	$('img').each(function() {
		var $img = $(this);
		
		var src = $img.attr('src');
		var w = $img.width();
		var h = $img.height();
		var cursor = $img.css('cursor');
		
		var parts = src.split('.');
		var ext = parts[parts.length-1];
		
		if ($.trim(ext.toLowerCase()) != "gif")
			return;
			
		$img.data('source', src);
		$img.data('cursor', cursor);
		$img.css('cursor', 'pointer');
		$img.addClass('gif-blocked');
		
		$img.attr('src', 'http://placehold.it/'+w+'x'+h+'&text=GIF%20BLOCKED%20(click)');
		
		
	});
	
	
	$(document).on('click', 'img.gif-blocked', function(ev) {
		var $img = $(this);
		var url = $img.data('source');
		var cursor = $img.data('cursor');
		$img.attr('src', url);
		$img.css('cursor', cursor);
		$img.removeClass('gif-blocked');
		ev.preventDefault();
		return false;
	});
});