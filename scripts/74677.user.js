// ==UserScript==
// @name           travian/simple aliance control
// @author         vitamina/pt
// @namespace      http://userscripts.org/
// @description    raising for alliance menu 
// @include        http://s*.travian.*
// @include        http://www.travian.org/*
// @exclude        http://shop.travian*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==



$(document).ready(function() {
   
$("#side_navi p:last-child a:last-child").after('<div id="ally_panel"><a>CONTROL</a><div id="links"<a href=http://speed.travian.pt/allianz.php?s=3><strong>ATAQUES</strong></a><a href=http://speed.travian.pt/allianz.php?s=3&f=1>bem sucedido</a><a href=http://speed.travian.pt/allianz.php?s=3&f=2>vitoria+perdas</a><a href=http://speed.travian.pt/allianz.php?s=3&f=3>mal sucedido <a><strong>DEFESA</strong></a><a href= http://speed.travian.pt/allianz.php?s=3&f=4>vitoriosa</a><a href=http://speed.travian.pt/allianz.php?s=3&f=5>vitoriosa+perdas</a><a href= http://speed.travian.pt/allianz.php?s=3&f=7>sem sucesso<a href=http://speed.travian.pt/allianz.php?s=4><strong>NOTICIAS</strong></div></div>');


$("#ally_panel").css({'background-color' : 'white', 'font-weight' : 'bolder', 'border' : '1px solid black'});

$("#links").css({'background-color' : '#F5F5F5', 'font-weight' : 'bolder'});


	$('#links').hide();

	$('#ally_panel').hover(function() {  
		$('#links').slideDown('fast');

		
	}, 
  	function () {
    		$('#links').fadeOut('fast');

   
 });
});

	
	


	
	





	

