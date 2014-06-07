
// ==UserScript==
// @name			Old Erep Menu
// @version			0.4
// @author			DMBoss
// @namespace		        erep_old_menu
// @description		        Returns old menu em PT.
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include			http://*.erepublik.com/*
// ==/UserScript==
function oldMenu(){
//Change My Places Part
    $("#menu2").html('<p></p>'+
		'<a href="javascript:;"><span>Meus Lugares</span></a>'+
		'<ul>'+
			'<li><a href="http://www.erepublik.com/pt/citizen/profile/1382899">Perfil</a></li>'+
			'<li><a href="http://www.erepublik.com/en/economy/myCompanies">Empresas</a></li>'+
			'<li><a href="http://www.erepublik.com/en/economy/training-grounds">Campos de Treino</a></li>'+
			'<li><a href="http://www.erepublik.com/en/economy/inventory">Armazém</a></li>'+
			'<li><a href="http://www.erepublik.com/en/economy/advanced-buildings">Edifícios Avançados</a></li>'+
			'<li><a href="http://www.erepublik.com/pt/party/partido-comunista-eportugues-3829/1">Partido</a></li>'+
			'<li><a href="http://www.erepublik.com/pt/main/group-show/978">Unidade Militar</a></li>'+
			'<li><a href="http://www.erepublik.com/pt/newspaper/dmboss-news-198319/1">Jornal</a></li>'+
		'</ul>');
    $("#menu2 a").css('background', 'url("http://i1233.photobucket.com/albums/ff385/GajoMuitaFixe/eRepublik%20stuff/menu_erepublik_new2_zps09f8d840.png") no-repeat scroll -410px 0 transparent');
    $("#menu2 a").css('cursor', 'default');
    $("#menu2 li a").css('cursor', '');
    $("#menu2 a").hover(function () {
        $("#menu2 a").css('background', 'url("http://www.erepublik.com/images/main_menu/menu_erepublik.png") no-repeat scroll -410px -48px transparent')
    }, function () {
        $("#menu2 a").css('background', 'url("http://www.erepublik.com/images/main_menu/menu_erepublik.png") no-repeat scroll -410px 0 transparent')
    });
	
//Change Market Part
    $("#menu3").html('<p></p>'+
		'<a href="javascript:;"><span>Mercado</span></a>'+
		'<ul>'+
			'<li><a href="http://www.erepublik.com/pt/economy/market/53">Mercado Local</a></li>'+
			'<li><a href="http://www.erepublik.com/pt/economy/exchange-market/">Mercado Monetário</a></li>'+
			'<li><a href="http://www.erepublik.com/pt/economy/job-market/15">Mercado de Trabalho</a></li>'+
			'<li><a href="http://economy.erepublik.com/pt/market/company/53">Empresas à Venda</a></li>'+
		'</ul>');	
    $("#menu3 a").css('background', 'url("http://www.erepublik.com/images/main_menu/menu_erepublik.png") no-repeat scroll -410px 0 transparent');
    $("#menu3 a").css('cursor', 'default');
    $("#menu3 li a").css('cursor', '');
    $("#menu3 a").hover(function () {
        $("#menu3 a").css('background', 'url("http://www.erepublik.com/images/main_menu/menu_erepublik.png") no-repeat scroll -410px -48px transparent')
    }, function () {
        $("#menu3 a").css('background', 'url("http://www.erepublik.com/images/main_menu/menu_erepublik.png") no-repeat scroll -410px 0 transparent')
    });
	
//Change Info Part
    $("#menu4").html('<p></p>'+
		'<a href="javascript:;"><span>Info</span></a>'+
		'<ul>'+
			'<li><a href="http://www.erepublik.com/pt/main/rankings-countries">Classificações</a></li>'+
			'<li><a href="http://www.erepublik.com/pt/map">Mapa</a></li>'+
			'<li><a href="http://www.erepublik.com/pt/military/campaigns">Guerras</a></li>'+
		'</ul>');
		
//Change Community Part
    $("#menu5").html('<p></p>'+
		'<a href="javascript:;"><span>Comunidade</span></a>'+
		'<ul>'+
			'<li><a href="http://www.erepublik.com/pt/invite-friends">Convidar Amigos</a></li>'+
			'<li><a href="http://www.erepublik.com/pt/main/elections">Eleições</a></li>'+
			'<li><a href="http://www.erepublik.com/pt/main/news/rated/all/Portugal/1">Notícias</a></li>'+
			'<li><a href="http://wiki.erepublik.com/" target="_blank">Wiki</a></li>'+
		'</ul>');
}
$ = jQuery = jQuery.noConflict(true);
$(document).ready(function () {	
	oldMenu();
});

Because it's your web

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
