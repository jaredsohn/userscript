// ==UserScript==
// @name           skovorodka_cleaner
// @namespace      http://userscripts.org/users/404192
// @include        http://skovorodka.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js	
// ==/UserScript==


//$(function() {  
	$("#brdtitle a").html('<h1>' + $("#brdtitle").find('img').attr('alt')+ '</h1>');
	$("#brdtitle").css('text-align', 'center');
	$("#brdtitle").css('margin', '10px');
	
	$("#brdwelcome ul:first").append($("#brdwelcome .conr").html());
	$("#brdwelcome .conr").html('<img src="http://skovorodka.org/uploaded/86861706_sm.png" style="width: 70px"/>')
	
	$('#announce').hide();
	$($("#brdwelcome .conl li")[3]).hide();
 //})
