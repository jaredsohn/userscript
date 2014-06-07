// ==UserScript==
// @name		Clarin - Free Ads
// @namespace		http://www.pinicio.com.ar
// @description		Clarin sin propagandas
// @include		http://www.clarin.com/*
// @require		http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function($)
{
    $(function()
    {	
		$('.bb-tu-bg_blue, .bb-md-adv_dos_col, .bb-md-adv1, .bb-md-adv2, .bb-md-adv3, .pub183_90, .bb-lt-adv, .nav-sup, #ft-nav-middle, .des-md-conexion, .des-md-twitter, .des-adv, .publi183_90').remove();
		$('#eplAdDivLeft2x300x250, #eplAdDivRight1x300x250, #eplAdDivRight2x300x50, #eplAdDivRight4x300x250').remove();				
		$('body').css('background-image', 'url("http://www.pinicio.com.ar/img/bg_main.png")');
		$('ul.nav-temas-del-dia').append('<li><a href="http://www.pinicio.com.ar">PInicio</a></li>');
		$('#doc5').css({ 'width': '970', 'background': '#fff', 'padding' : '0 15px', 'border-left' : '1px solid #aaaaaa', 'border-right' : '1px solid #aaaaaa' });	
    });
    
})(jQuery);