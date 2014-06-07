// ==UserScript==
// @name           Torrentip
// @namespace      http://use.i.E.your.homepage/
// @grant          GM_getValue
// @grant          GM_setValue
// @version        0.3.16
// @description    Script para mostrar uma tootip, de pré vizualização.
// @match          http://www.theanonybay.net/*
// @match		   http://theanonybay.net/busca*
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// @copyright      Ronniery Borges Correa, 2012+
// ==/UserScript==

/* Vetor de linguagem PT-BR */
pt_br = new Array("Opções");

/* Efeito hover, quando o mouse passa sobre o link */
$('a.detLink').hover(function(e){
    /* Pega o href, que será injetado dentro da div tooltip */
	var href = $(this).attr('href');
    href = 'http://theanonybay.net/'+href.slice(3);
    
    //alert(href);
   
    /* Pega a posição do eixo Y e adiciona 30 */
    var top = e.pageY + 15;
    /* Pega a posição do eixo x e adiciona + 10 */
    var left = e.pageX + 20;
    /* Guarda o title para ele não ficar sobrepondo a tooltip */
    var title = $(this).attr('title');
    /* E então remove o title */
    $(this).removeAttr('title');
    /* Adiciona ao link uma div com a classe tooltip */
    $(this).append('<div class="tooltip"><div class="img"></div></div>');
    /*  Define as regras de estilização CSS da classe */
    $('.tooltip')
        .css({'padding':'3px',
              'border':'thin solid',
              'border-radius':'5px',
              'position':'fixed',
              'top':+top,
              'left':+left,
              'display':'none',
              'background-color':'#333',
              'color':'#fff',
              'width':'250px',
              'height':'auto'})
        /* Carrega os dados da página onde o mouse esta ( sobre determinado link ) */
    	.load(href+'#details dl',function(){
            /* folha de estilo para a <dl> carregada dentro da <div> */
            $(".tooltip dl").css({'padding':'0px','margin':'0px','text-align': 'left','float': 'left','width':'100%','height': '94%;','padding-top': '7px','padding-left': '7px'});
            $(".tooltip .col1,.col2").remove();
            /* folha de estilo para as <dl> <dt> */
            $(".tooltip dl dt").css({'float': 'left','clar':'both','width':'100px'});
            /* Efeito para mostrar a div */
            $(this).fadeIn(150);
            /* CODE: para achar cada dd dentro da <dl> e para cada dd irá verificar o texto, se o texto dentro da DD estiver vazio, adiciona ao mesmo '?' */
            $(".tooltip dl").find("dd").each(function(index){
                if($(this).text() == '' ){
                 	$(this).text('?');   
                }
            })
        })
}
/* Hover out */
,function(e){
	/* Aplica um efeito para ocultar a div */
	$('.tooltip').fadeOut(150,function(){
		/* E por fim remove-a */
		$(this).remove();
	})
})
/* Div acompanhando o mouse */
.mousemove(function(e){
	var top = e.pageY + 15 ;
	var left = e.pageX + 20;
	$('.tooltip').css({'top':+top,'left':+left});
});
