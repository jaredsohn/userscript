// ==UserScript==
// @name        Funciones premium
// @namespace   Funciones premium
// @description Simula la barra de velocidad de las cuentas premium, las flechas para cambiar de pueblo y el desplegable con la lista de pueblos
// @include     http://es*.guerrastribales.es/*
// @version     1
// @grant       none
// ==/UserScript==  

var quickbar= 
			'<br class="newStyleOnly">' +
   '<table id="quickbar_outer" align="center" cellspacing="0" width="100%">' +
	            '<tbody><tr>' +
	               '<td>' +
						'<table id="quickbar_inner" style="border-collapse: collapse;" width="100%">' +
							'<tbody><tr class="topborder"> '+
								'<td class="left"> </td>' +
								'<td class="main"> </td>' +
								'<td class="right"> </td>' +
							'</tr>' +
	                        '<tr>' +
								'<td class="left"> </td>' +
								'<td class="main">' +
									'<ul class="menu quickbar">' +																								 
											'<li><span><a href="/game.php?village=42890&amp;screen=main"><img src="http://cdn.tribalwars.net/graphic//buildings/main.png" alt="Edificio Principal">Edificio Principal</a></span></li>' +																																										 
											'<li><span><a href="/game.php?village=42890&amp;screen=train"><img src="http://cdn.tribalwars.net/graphic//buildings/barracks.png" alt="Reclutar">Reclutar</a></span></li>' +																																											 
											'<li><span><a href="/game.php?village=42890&amp;screen=snob"><img src="http://cdn.tribalwars.net/graphic//buildings/snob.png" alt="Corte ">Corte </a></span></li>' +																																											 
											'<li><span><a href="/game.php?village=42890&amp;screen=smith"><img src="http://cdn.tribalwars.net/graphic//buildings/smith.png" alt="Herrería">Herrería</a></span></li>' +																																											 
											'<li><span><a href="/game.php?village=42890&amp;screen=place"><img src="http://cdn.tribalwars.net/graphic//buildings/place.png" alt="Plaza de reuniones">Plaza de reuniones</a></span></li>' +																																											 
											'<li><span><a href="/game.php?village=42890&amp;screen=market"><img src="http://cdn.tribalwars.net/graphic//buildings/market.png" alt="Mercado">Mercado</a></span></li>' +																														
                                                '</ul>' +
								'</td>' +
								'<td class="right"> </td>' +
							'</tr>' +
							'<tr class="bottomborder">' +
								'<td class="left"> </td>' +
								'<td class="main"> </td>' +
								'<td class="right"> </td>' +
							'</tr>' +
							'<tr>' +
								'<td class="shadow" colspan="3">' +
									'<div class="leftshadow"> </div>' +
									'<div class="rightshadow"> </div>' +
								'</td>' +
							'</tr>' +
						'</tbody></table>' +
					'</td>' +
				'</tr>' +
			'</tbody></table>';

var flechas = //A continuación se define como variable la que bienen siendo las flechas para cambiar de pueblo
    '<td class="box-item icon-box separate arrowCell">' +
																									'<a id="village_switch_left" class="village_switch_link" href="/game.php?village=p42890&amp;screen=overview" accesskey="a">' +
																															'<span class="arrowLeft"> </span>' +
																												'</a>' +
																							'</td>' +
																																		'<td class="box-item icon-box arrowCell">' +
																									'<a id="village_switch_right" class="village_switch_link" href="/game.php?village=n42890&amp;screen=overview" accesskey="d">' +
																															'<span class="arrowRight"> </span>' +
																												'</a>' +
																							'</td>';


var desplegable = //A continuación se definen como variable lo que biene siendo el botón desplegable con la lista de todos los pueblos
												                                        '<td class="box-item">' +
    '<script type="text/javascript">' +
												//<![CDATA[
	                                        		'villageDock.saveLink = "/game.php?village=42890&ajaxaction=dockVillagelist&h=7d60&screen=overview";		                                        	villageDock.loadLink = "/game.php?village=42890&mode=overview&ajax=load_groups&screen=groups";' +
		                                        	'villageDock.docked = 0;' +

													'$(function() {' +
				                                        'if(villageDock.docked) {' +
					                                        'villageDock.open();' +
				                                        '}' +
													'});' +
		                                        //]]>
   
		                                        '</script>' +
	                                        	'<a href="#" id="open_groups" onclick="return villageDock.open(event);"><span class="icon header arr_down"></span></a>' +
												'<a href="#" id="close_groups" onclick="return villageDock.close(event);" style="display: none;"><span class="icon header arr_up"></span></a>' +
	                                            '<input id="popup_close" value="cerrar" type="hidden">' +
	                                            '<input value="/game.php?village=42890&amp;ajax=load_villages_from_group&amp;mode=overview&amp;screen=groups" id="show_groups_villages_link" type="hidden">' +
	                                            '<input value="/game.php?screen=overview" id="village_link" type="hidden">' +
	                                            '<input value="overview" id="group_popup_mode" type="hidden">' +
	                                            '<input value="Grupo:" id="group_popup_select_title" type="hidden">' +
	                                            '<input value="Pueblo" id="group_popup_villages_select" type="hidden">' +
	                                        '</td>';

$('.maincell').prepend(quickbar);
$('TR#menu_row2').prepend(flechas);
$('TR#menu_row2').append(desplegable);
