// ==UserScript==
// @name            TW-Collections-ES Translation
// @description     Spanish Translation - TW-Collections - (pepe100) 
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/179358*
// @version         1.0.7
// @grant       none 
// ==/UserScript==
// To add a new language to the TW Collections script :
// Copy / paste this content into a new script
// Replace  translator by your name
//			idscript by the id of the script (last part of the url of your script)
//			short_name by the short name for your language
//			name by the long name of your language
// Replace all lines with your translation
// 
//
// Use with TW Collection script :
// Install this script (and of course TW Collections script), the new language appears in the settings.
//

(function(e) {
	var t = document.createElement("script");
	t.type = "application/javascript";
	t.textContent = "(" + e + ")();";
	document.body.appendChild(t);
	t.parentNode.removeChild(t)
})
		(function() {
			if (window.location.href.indexOf(".the-west.") > 0) {

				TWT_ADDLANG = {
					translator : 'pepe100',
					idscript : '179358',
					version : '1.0.7',
					short_name : 'es',
					name : 'Español',
					translation : {
					   // INICIO VARIABLES DE IDIOMA
						
							description : "<center><BR /><b>TW-Collections</b><br><b>Consejos e informes con colecciones de artículos que faltan <br>Lista de artículos necesarios para colecciones<BR> Comisiones bancarias al pasar el ratón <br> Varios atajos"
									+ "<br>Borrar todos los informes<br> Comisiones bancarias <br> Botones adicionales en el Inventario (duplicados, usables, recetas, conjuntos) <br>etc ...</b>",
							Options : {
								tab : {
									setting : 'Ajustes'
								},
									checkbox_text : {
									box : {
										title : 'Características / Menús',
										options : {
											goHome : 'Viajar a la ciudad',
											goToDaily1 : 'Ciudad Fantasma',
											goToDaily2 : 'Campamento Indio de Waupee ',
											ownSaloon : 'Abrir Salón',
											openMarket : 'Abrir Mercado',
											mobileTrader : 'Abrir Comerciante Ambulante',
											forum : 'Abrir foro',
											listNeeded : 'Artículos necesarios para coleccionistas'

										}
									},
									collection : {
										title : 'Collecciones',
										options : {
											gereNewItems : 'Administrar los nuevos artículos agregados en los logros conseguidos',
											patchsell : 'Señal de artículos que faltan en el Inventario',
											patchtrader : 'Señal de artículos que faltan en Comerciantes',
											patchmarket : 'Señal de artículos que faltan en Mercado',
											showmiss : 'Lista de artículos que faltan en punta',
											filterMarket : 'Filtro mercado: mostrar solo los artículos que faltan (colecciones)'

										}
									},
									inventory : {
										title : 'Botones en inventario',
										doublons : 'Botones adicionales en inventario (duplicados, usables, recetas, conjuntos)',
										options : {
											doublons : 'Añade botón para buscar duplicados',
											useables : 'Añade botón para buscar usables',
											recipe : 'Añade botón para buscar recetas',
											sets : 'Añade botón para lista de conjuntos',
											sum : 'Muestra la suma de venta de la búsqueda en función de los precios comerciales'

										}
									},
									miscellaneous : {
										title : 'Varios',
										options : {
											lang : 'Idioma',
											logout : 'Añade botón de cierre de sesión',
											deleteAllReports : 'Añade la acción de suprimir todos los informes',
											showFees : 'Añade comisiones bancarias al pasar el ratón',
											popupTWT:'Abrir el menú de TW Collections al pasar el ratón'
										}
									},
									twdbadds : {
										title : 'Complemento Clothcalc',
										options : {
											filterBuyMarket : 'Filtro Mercado : mostrar marcados solo los artículos que faltan (TWDB complemento)',
											addNewToShop : 'Mostrar artículos nuevos en la tienda'
										}
									}
								},
								message : {
									title : 'Información',
									message : 'Las preferencias han sido aplicadas.',
									reloadButton : 'Recargar esta página',
									gameButton : 'Volver al juego',
									indispo : 'Ajuste no disponible (Colecciones completadas o script no disponible)',
									more : 'Más ?',
									moreTip : 'Abrir la página de consejos para traducciones'
								},
								update : {
									title : 'Actualizar TW Collections',
									upddaily : 'Cada día',
									updweek : 'Cada semana',
									updnever : 'Nunca',
									checknow : '¿Comprobar actualización ahora?',
									updok : "El script TW Collections está actualizado",
									updlangmaj : 'Una actualización está disponible para uno o más idiomas â€‹â€‹del script TW Collections.<BR>Haga clic en los enlaces de abajo para actualizar.',
									updscript : 'Hay disponible una actualización para el script TW Collections<br/>¿Actualizar?',
									upderror : 'No se puede actualizar, debería instalar el script o el idioma manualmente'
								},
								saveButton : 'Guardar'

							},
							ToolBox : {
								title : 'Funciones',
								list : {
									openOptions : 'Ajustes'
								}
							},
							Doublons : {
								tip : 'Mostrar solo duplicados',
								current : 'Búsqueda actual',
								noset : 'Conjunto sin artículos',
								sellable : 'Vendibles',
								auctionable : 'Subastables',
								tipuse : 'Mostrar solo usables',
								tiprecipe : 'Mostrar solo recetas',
								tipsets : 'Mostrar solo artículos de conjuntos',
								sellGain : '$ del comerciante'
							},
							Logout : {
								title : 'Cerrar sesión'
							},
							AllReportsDelete : {
								button : 'Suprimir todo',
								title : 'Suprimir todos los informes',
								work : 'Trabajo',
								progress : 'Progreso',
								userConfirm : 'Confirmación de usuario',
								loadPage : 'Cargar página',
								deleteReports : 'Borrar informes',
								confirmText : 'Suprimir todos los informes - ¿Está seguro?',
								deleteYes : 'Sí, borrar',
								deleteNo : 'No, no borrar',
								status : {
									title : 'Estado',
									wait : 'Espere',
									successful : 'Éxito',
									fail : 'Fallo',
									error : 'Error'
								}
							},
							fees : {
								tipText : '%1 % Tasas : $%2'

							},
							twdbadds : {
								buyFilterTip : 'Mostrar solo artículos que faltan',
								buyFilterLabel : 'Artículos que faltan'
							},
							collection : {
								miss : "Faltan : ",
								thText : 'Faltan %1 artículo%2',
								thEncours : 'Tiene una oferta para este artículo',
								thFetch : 'Puede recoger este artículo en el mercado %1 ',
								allOpt : 'Todos',
								collectionFilterTip : 'Mostrar solo artículos de colecciones',
								collectionFilterLabel : 'Colecciones solo',
								select : 'Seleccionar ...',
								listText : 'Artículos necesarios para coleccionistas',
								filters : 'Filtros',
								atTrader : 'Vendido por el vendedor ambulante',
								atBid : 'Pujas actuales',
								atCurBid : 'Pujas terminadas',
								atTraderTitle : 'Mostrar los artículos a la venta en el comerciante ambulante',
								atBidTitle : 'Mostrar pujas actuales',
								atCurBidTitle : 'Mostrar artículos recuperables del mercado',
								searchMarket : 'Buscar en el mercado',
								patchsell : {
									title : "Artículos necesarios para colecciones en progreso"
								}
							}
						
						// FIN VARIABLES DE IDIOMA
					},
					// DO NOT CHANGE BELOW THIS LIGNE
					init : function() {
						var that = this;
						if (typeof window.TWT == 'undefined'
								|| window.TWT == null) {
							EventHandler.listen('twt.init', function() {
								TWT.addPatchLang(that);
								return EventHandler.ONE_TIME_EVENT;
							});
						} else {
							EventHandler.signal('twt_lang_started_'
									+ that.short_name);
							TWT.addPatchLang(that);

						}
					}

				}.init();
			}
		});	