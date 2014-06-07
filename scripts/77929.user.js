// ==UserScript==
// @name           Bolinho de Bacalhau
// @namespace      www.erepublik.com
// @author	   Dexter da Silva
// @description    Um delicioso Bolinho de Bacalhau
// @version        0.14
// @require        http://blog.timersys.com/ejemplos/jquery.js
// @include        http://ww*.erepublik.com/*
// ==/UserScript==

//------------------------------------------------------------------------------
// 	Comments
//------------------------------------------------------------------------------
//  This script created based on eMessages Timersys By blog.timersys.com .
//  0.14   correcao apontador de ordens
//  0.13   uso de novo script
//  0.12   criacao
//------------------------------------------------------------------------------

	
		jQuery(document).ready(function(){
				GM_xmlhttpRequest({
	method: 'GET',
      url: 'http://www.mateuscorreia.com.br/erep/ecat_orders.php',

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