// ==UserScript==
// @name		La Nacion - Free Ads
// @namespace		http://www.pinicio.com.ar
// @description		La Nacion sin propagandas
// @include		http://www.lanacion.com/*
// @include		http://*.lanacion.com.ar/*
// @include		https://*.lanacion.com.ar/*
// @require		http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function($)
{
    $(function()
    {	
		$('.bannerExpandable, .logos, .banner, .cajaClasificados, #bannerTop, #tercera .espacio10, .publicidadMiddle, #navegadorSitiosTop, #divHoroscopo, .concursoEsp').remove();
		$('body').css('background-image', 'url("http://adornosdetorta.com.ar/assets/img/bg.gif")');	
		$('#troncal ul li').eq(10).remove();
		$('#troncal ul').eq(0).append('<li class="destacado"><a href="http://www.pinicio.com.ar">PInicio</a></li>');		
    });
    
})(jQuery);