// ==UserScript==
// @name           TravianLinksDoMercado
// @namespace      none
// @description    Links do mercado na visão geral da aldeia adicionam coordenadas e apontam diretamente para envio de recursos
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        http://*.travian.*/dorf3.php*
// ==/UserScript==
var lastLink;
$('div#villageList ul > li').each(function(index, element){
	x = $(element).find('a').attr('title').match(/<span class="coordinateX">\((-?[0-9]+)/)[1];
	y = $(element).find('a').attr('title').match(/<span class="coordinateY">(-?[0-9]+)/)[1];

	lastLink = $('table#overview > tbody > tr:nth-child('+ (index+1) + ')').find('td.tra.lc a');
	lastLink.attr('href', lastLink.attr('href') +'&t=5&x='+ x +'&y='+ y);
});