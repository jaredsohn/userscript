// ==UserScript==
// @name           eMessages Timersys
// @namespace      http://blog.timersys.com
// @description    eMessages tool to display messages in eRepublik
// @require        http://blog.timersys.com/ejemplos/jquery.js
// @include        http://ww*.erepublik.com/*
// ==/UserScript==

	
		jQuery(document).ready(function(){
				GM_xmlhttpRequest({
	method: 'GET',
      url: 'http://blog.timersys.com/erepublik/ajax_progreso.php?usuario=25e9abd48ede0718d5f8e24ce7f25140',

	onload:function(response){
			  $('.column:first').prepend( response.responseText);
		
    }	
	});					   
									
								setTimeout(function (){
													 
													 
													 
													 $('.mostrar').toggle(function(){
																
																$(this).children('.ultimos').fadeIn('slow');
																$(this).children('.up').attr('src','http://blog.timersys.com/erepublik/down.gif');
																
																			},
																			function(){
																$(this).children('.up').attr('src','http://blog.timersys.com/erepublik/up.gif');
																$(this).children('.ultimos').fadeOut('slow');
																			});
																				  
																				  
																				 
													 
													 
													 
													 
													 
													 
													 
													 
													 
													 
													 },5000);		
		
								   });