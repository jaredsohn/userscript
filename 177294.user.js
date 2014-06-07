// ==UserScript==
// @name           Hipster Layout
// @namespace      CrafterSama
// @description    A New Version of the Mejorando.la Class Layout
// @include        https://cursos.mejorando.la/live*
// @author         Julmer Olivero aka CrafterSama jolivero.03@gmail.com
// @version        0.1
// ==/UserScript==

var ModLayout = function newLayout()
{
	$('#url-timeline').css('left','0');
	$('#url-timeline').css('border-top-right-radius','25px');
	$('#url-timeline').css('border-bottom-right-radius','25px');
	$('#url-timeline').css('border-top-left-radius','0');
	$('#url-timeline').css('border-bottom-left-radius','0');
	$('#url-timeline').css('text-align','left');
	$('#url-timeline').css('font-size','0.7em');
	$('#url-timeline').css('font-weight','bold');
	$('#col1').css('width','73%');
	$('#col2').css('width','26%');
	$('.hilo').css('display','none');
	$('#subidos').css('margin-top','-9%');
	$('a#todo').css('margin','0 auto');
	$('.botones-live').css('margin','a auto');
	$('.botones-live').css('z-index','999');
	$('.boton-live').css('border-radius','3px');
}

ModLayout();







