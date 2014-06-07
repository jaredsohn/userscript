// ==UserScript==
// @name        Avaliação literal dos filmes no Filmow.com
// @namespace   http://userscripts.org/users/541816
// @include     http://filmow.com/*
// @version     2.0
// @grant       none
// ==/UserScript==
$('.navbar-sub.navbar-movie .span9').append('<div id="barrinhaInusitada" style="background-color: #51A351; border: 1px solid #000000; color: #FFFFFF; display: none; font-size: 12px; font-weight: bold; margin-left: 400px; margin-top: -33px; padding: 11px 0; position: absolute; text-align: center; text-shadow: 2px 1px 1px #000000; width: 300px;">');
//$('.movie-profile .star-rating-container').append('<div id="irmandade" style="border:1px solid #000000; color:#FFFFFF; display:none; font-weight: bold; margin-top: 3px; position: absolute; text-align: center; text-shadow: 2px 1px 1px #000000; width: 220px">');
//$('.movie-user-actions').css('margin-top','34px');
$('.star-rating .half-star[data-value=1]').hover(function(){
    $('#barrinhaInusitada').html('Lastimável (Um dos piores filmes da minha vida)').css('backgroundColor', '#CA0000').show();
});
$('.star-rating .half-star[data-value=2]').hover(function(){
    $('#barrinhaInusitada').html('Horrível (Tempo de vida que não vai voltar mais)').css('backgroundColor', '#CA0000').show();
});
$('.star-rating .half-star[data-value=3]').hover(function(){
    $('#barrinhaInusitada').html('Péssimo (Troféu Framboesa)').css('backgroundColor', '#CA0000').show();
});
$('.star-rating .half-star[data-value=4]').hover(function(){
    $('#barrinhaInusitada').html('Muito ruim (Não serve nem para Sessão da Tarde)').css('backgroundColor', '#CA0000').show();
});
$('.star-rating .half-star[data-value=5]').hover(function(){
    $('#barrinhaInusitada').html('Ruim (Falhou em alguns detalhes)').css('backgroundColor', '#CA0000').show();
});
$('.star-rating .half-star[data-value=6]').hover(function(){
    $('#barrinhaInusitada').html('Bom (Valeu o dinheiro que paguei... Se paguei) ').css('backgroundColor', '#51A351').show();
});
$('.star-rating .half-star[data-value=7]').hover(function(){
    $('#barrinhaInusitada').html('Muito bom (Veria novamente)').css('backgroundColor', '#51A351').show();
});
$('.star-rating .half-star[data-value=8]').hover(function(){
    $('#barrinhaInusitada').html('Ótimo (Merece um prêmio!)').css('backgroundColor', '#51A351').show();
});
$('.star-rating .half-star[data-value=9]').hover(function(){
    $('#barrinhaInusitada').html('Excelente (Entrou para os Favoritos!)').css('backgroundColor', '#51A351').show();
});
$('.star-rating .half-star[data-value=10]').hover(function(){
    $('#barrinhaInusitada').html('Simplesmente épico (Como não tive essa ideia!?)').css('backgroundColor', '#51A351').show();
});
$('.star-rating .half-star').mouseout(function(){
    $('#barrinhaInusitada').html('').hide();
});