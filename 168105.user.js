// ==UserScript==
// @name       Block Annoying Onverser Signatures
// @version    0.1
// @description  Block Annoying Gifs
// @include     *
// @copyright  2012+, T3charmy
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    var blockedgifs = new Array();
    blockedgifs[0] = "http://i41.tinypic.com/r89q38.gif";
    blockedgifs[1] = "http://i48.tinypic.com/2e19fu9.gif";
    blockedgifs[2] = "http://i45.tinypic.com/200v96x.gif";

	$('img').each(function() {
		var $img = $(this);
		
		var src = $img.attr('src');
		var w = $img.width();
		var h = $img.height();
		var cursor = $img.css('cursor');
		
		if ($.inArray(src, blockedgifs) != false)
			return;
        
		$img.data('source', src);
		$img.data('cursor', cursor);
		$img.css('cursor', 'pointer');
		$img.addClass('gif-blocked');
        
        if(w==0)
            w = 450;
        if(h==0)
            h = 95;
		
		$img.attr('src', 'http://placehold.it/'+w+'x'+h+'&text=ANNOYING+GIF+BLOCKED+(CLICK+TO+SHOW)');
		
		
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