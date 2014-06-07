// ==UserScript==
// @name           Qrl
// @namespace      http://
// @description    (v1.0) Crea un codigo Qr para compartir la url
// @include        *
// @grant       GM_getValue
// @grant       GM_setValue
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://www.neobookeros.com.ar/servicios/jquery.qrcode-0.2.js
// ==/UserScript==

/*************************************************************************************
***************     Creado por BuNKeR << www.neobookeros.com.ar >>     ***************
**************************************************************************************/

var j = jQuery.noConflict();
j(window).load(function(){
	j('body:not(window.frames.document):not(frameset)', window.parent.document).prepend("<div id=\"Qrl-container\" style=\"z-index:10000;right:0;position: fixed;bottom: 0px;background-color:#000;color:#fff; padding: 2px 0 0 2px; width:18px; height:18px;\"><img id=\"Qrl-img\" src=\"http://www.neobookeros.com.ar/servicios/qrcode.png\" alt=\"Qrl\" title=\"Qrl\" style=\"z-index:10001;background-color:#fff;\"/></div>");
	j('#Qrl-container').after("<div id=\"Qrl\" style=\"display:none;z-index:9999;right:0;position: fixed;bottom: 0px;background-color:#fff; margin: 0px; width:305px; height:305px; padding-left:5px; padding-top:5px;\"></div>");
	j('#Qrl-img').click(function() {
  		j('#Qrl-container').animate( { "opacity": "hide",height: 'toggle'} , 200 );
  		j("#Qrl").animate( { "opacity": "show",height: 'toggle'} , 500 );
	});
	j('#Qrl').click(function() {
  		j(this).animate( { "opacity": "hide",height: 'toggle'} , 200 );
  		j("#Qrl-container").animate( { "opacity": "show",height: 'toggle'} , 500 );
	});

	j("#Qrl").qrcode({
		width: 300,
		height: 300,
		color: '#000',
		text: window.location.href
	});

});