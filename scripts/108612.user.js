// ==UserScript==
// @name		Cuevana to IMDB
// @namespace		http://www.pinicio.com.ar
// @description		Add links to IMDB
// @include		http://www.cuevana.tv/*/*
// @require		http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function($)
{
    $(function()
    {	
		// Get Title
		var main_title = $('div#tit div.tit').eq(0);
		var title = main_title.text();
		title = title.replace(/\s/g, '+');
		
		$('.banner1').remove();
		$('#menubar ul li').eq(4).remove();
		$('#menubar ul').append('<li><a href="http://www.pinicio.com.ar"><span class="txt">PInicio</span><span class="right"></span></a></li>');
	
		// Append IMDB Link		
		$('<a/>', {
			href: 'http://www.imdb.com/find?s=tt&q=' + title,
			title: 'Buscar ' + title + ' en IMDB',
			target: '_blank',			
			text: '[IMDB]'
		}).css('paddingLeft', '10px').appendTo( main_title );		
    });   	
})(jQuery);