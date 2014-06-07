// ==UserScript==
// @name				Taringa - Clean Homepage
// @namespace		http://www.pinicio.com.ar
// @description		Interfaz limpia para la Homepage de Taringa!
// @include			http://www.taringa.net/*
// @require			http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function($)
{
    $(function()
    {
		var author = $('.author-nick').html();
		$('.post-share').html('<li><b>Autor</b>: ' + author + '</li>');
		
		var points = $('.total-points span').html();
		$('.post-share').append('<li><b>Puntos</b>:<br>' + points + '</li>');
		
		var delete_edit = $('#sidebar .box').eq(1).children('.floatL').html();
		$('.post-share').append('<li><b>Acciones</b>:<br>' + delete_edit + '</li>');
		
		$('.post-share li a').removeClass('ui-btn ui-button ui-state-default ui-widget ui-corner-all ui-button-text-only');
		
		$('ul.tabs').append('<li><a href="http://www.pinicio.com.ar">PInicio</a></li>');

                $('#user-metadata-profile').css('float','left');
				
		$('#sidebar, #estadisticasBox, #footer-links, .pie-wiroos, #google_ads_div_tar_p_250_noticias, #___plusone_0').remove();
		$('#main-col').width('980px');
		$('#left-col').width('440px');
		$('#right-col').width('400px');
		$('#main').width('900px');
		$('#nav .wrapper').width('901px');
		$('#footer .wrapper').width('902px');
		$('#footer .wrapper').css('background-image', 'url("")');
		$('body').css('background-image', 'url("http://adornosdetorta.com.ar/assets/img/bg.gif")');		
    });    
})(jQuery);