// ==UserScript==
// @name          Esconder e mostrar menu de marcas - Shopfato.com 1.1
//
// @namespace     http://www.shopfato.com.br/bebes
//
// @description   Arquivo que usa jQuery para esconder e mostrar o menu de marcas
//                na página de bebês do shopfato.
//                Para implementá-lo é necessário chamar a jQuery e 
//                declarar a variável que reconhece que estamos 
//				  na página correta.
// ==/UserScript==

$('body').append('<style type="text/css">span.mostra-mais {color: black; height: 20px!important; padding-top: 10px!important; display: block!important; float: left; font-weight: bold; font-size: 11px; cursor: pointer;} span.mostra-menos {color: black; height: 10px!important; padding-top: 0!important; display: block!important; float: left; font-weight: bold; font-size: 11px; cursor: pointer;}</style>');

var $marcas = $('.Marca');
$marcas.find('li').eq(9).after().append('<span class="mostra-mais" title="mostre-me mais">+ mais marcas</span></li>');

var $mostra_mais = $('.mostra-mais');

$mostra_mais.each(function(i){
	ul = $(this).parent().parent();
	ul.each(function(i){
		$(this).find('li span').each(function(){
			if($(this).attr('class') == "mostra-mais"){
				$('<li class="liMostraMenos"><span class="mostra-menos" title="mostre-me menos">- menos marcas</span></li>').appendTo(ul);
				$(this).parent().nextAll().hide();
			}
		})
	});
	$('.mostra-menos').hide();
});//fim do esconde mais

$('.mostra-mais').live('click', function(e){
	e.preventDefault();
	e.stopPropagation();
	//mostra-mais
	if($(this).attr('class') == 'mostra-mais'){
		$(this).parent().nextAll().slideDown('fast');
		$(this).parent().nextAll().find('li.liMostraMenos').show();
		$(this).parent().nextAll().find('li.liMostraMenos span.mostra-menos').show();
		$(this).parent().hide();
	}
});

$('.mostra-menos').live('click', function(e){
	e.preventDefault();
	e.stopPropagation();
	if($(this).attr('class') == 'mostra-menos'){
		$(this).parent().parent().find('.mostra-mais').parent().show();
		$(this).parent().parent().find('.mostra-mais').parent().nextAll().slideUp('fast');
		//$(this).parent().find('.mostra-mais').show().nextAll().slideUp('fast');
		//$(this).parent().find('.mostra-mais').nextAll().slideUp('fast');
	}
});