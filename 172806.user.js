// ==UserScript==
// @name            Mod TW-Collections PL by Darius II
// @description     Mod TW-Collections PL by Darius II - see history
// @include         http://*.the-west.*/game.php*
// @include         http://*.the-west.*/forum.php*
// @include         http://userscripts.org/scripts/source/172806*
// @version         PL_1.2.1.1
// @history     PL_1.2.1.1 Tłumaczenie na j.pol. + kosmetyczne poprawki
// @history     1.2.1 passage 2.0.5
// @history     1.2.0 correction bugs maj + Traduction italienne (grazie tw81)
// @history     1.1.9 correction attente TWDB
// @history     1.1.8 mise à jour pour TW 2.0.4 - do not install this script if your server has not migrated
// @history     1.1.7 exclusion pour le serveur beta
// @history     1.1.6 Traduction espagnol (gracias pepe100)
// @history     1.1.5 Traduction allemande (danke Hanya)
// @history     1.1.4 suppression tips et color chat présents dans clothcalc, signalement des items achetés dans la liste 
// @history     1.1.3 suppression depot rapide présent dans clothcalc
// @history     1.1.2 correction suite maj de clothcalc,affichage des enchères en cours dans la liste
//              des collections et pour non prise en compte comme manquants 
// @history     1.1.1 tri liste, améliorations et corrections diverses, et check box marché dynamique 
// @history     1.1.0 application des préferences sans rechargement, corrections bugs, ajout checkbox marché
// @history     1.0.9.1 amelioration liste items manquants
// @history     1.0.9 correction bugs apres achats
// @history     1.0.8 amelioration de la liste des items manquants
// @history     1.0.8 correction bugs des items manquants
// @history     1.0.7 Correction frais de banque, ajout d'un raccourci liste des items manquants de collection
// @history     1.0.6 correction updater
// @history     1.0.5 traduction 'rapide' anglaise (need help for completing translations)
// @history     1.0.5 ajout des items manquant des collections dans les marchands et le marcheacute;
// @history     1.0.4 correction des paramètres
// @history     1.0.3 ajout des frais bancaires en survol	
// @history	    1.0.2 suppression des fonctionnalit&acute;s ajouteacute;es à   tw-db clothcalc
// @history	    1.0.1 correction bouton forum Nouveau pour les admins
// @history     1.0.0 initial base sur script de stewue
// @grant       none 
// ==/UserScript==
(function(fn) {
	var script = document.createElement('script');
	script.type = "application/javascript";
	script.textContent = '(' + fn + ')();';
	document.body.appendChild(script);
	script.parentNode.removeChild(script);
})
		(function() {
			var url = window.location.href;
			if (url.indexOf(".the-west.") == -1) {
				var idscript = '172806';
				function sendMessage() {

					var dstWindow = window.parent;
					mymessage = String(escape(document.body.textContent));

					if (dstWindow.postMessage) {

						dstWindow.postMessage(idscript + mymessage, '*');
					}
				}

				sendMessage();

			} else {

				TWT = {
					LANG : 'pl',
					info : {
						version : 'PL_1.2.1.1',
						min_gameversion : '2.05',
						max_gameversion : '2.059',
						idscript : '172806'
					},
					languages : [ {
						short_name : 'fr',
						name : 'Francais'
					}, {
						short_name : 'en',
						name : 'English'
					}, {
						short_name : 'es',
						name : 'Español'
					}, {
						short_name : 'de',
						name : 'German'
					}, {
						short_name : 'it',
						name : 'Italian'
					}, {
						short_name : 'pl',
						name : 'Polish'
					} ],
					images : {
						cup : "/images/icons/achv_points.png",
						logout : 'data:image/jpg;base64,/9j/4AAQSkZJRgABAgIAJQAlAAD/wAARCAAZADIDAREAAhEBAxEB/9sAhAAGBAUGBQQGBgUGBwcGCAoRCwoJCQoVDxAMERkWGhoYFhgXGx8oIRsdJR4XGCIvIyUpKiwtLBshMTQwKzQoKywrAQcHBwoJChQLCxQrHBgcHCsrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKyv/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APDNaa5l1G4Zp5YYoZHiTy3ZSQrHBIz1rhg4pWR2NSb1Poqb4f8Ag7Zf507UG+xwCTd/a0+HJVGwBu45f36Vz+1adl+S/wAjpVFb6/ezhPjB4P0Xw9pWmX2gwTpetOGPnXLzjaN/ykMSCMqO1XSrOTtIirSsrowrwFtUu4fLVYYJNqIQPkG0HGQOeuM+mKhNJKwNSbfN+B654f8ACXhm+sNMjudOleaaxS5llF0wG4hsjb2+5+tQ5tGkadzD8aeFvD1t4Tj1KzsNl05GxXlMmz7pPX/epxm77ilSTWxhWOnWUtlbySaLbs7xqzMJggJI67e30rKU1d6sajUt0+45rSfA+r+JpZr61jsTaC+mV1luo4ZDiQ5BVmH5j/Gul1Yw0b1svyPKr4yMXKEVqr9vluz3u+l+wWWppNFG263Vy5ZsXSAopx/d525HVcjkgqzYJqVmjtw2IjVjZvX+tf6/yv5p8YtRV9JsZZ1/dlCUWFeVwZPUnPIPPv7VVJOTsjqm0kYelaLqOv6zrbabFbeRHOikXE6QuMxpjhyMjH9M0Plio37fqcFbHQpTcGn36fqz2XSoptJsrWKeOISfYTEJ1fcu5UdjGADtBA3YOTuALA/eVY5lJXQ8FivaLlqP3vz/AOD/AEutuP8AGWpxyeGLSSSMRWodlWOFSzKcR4PJOeq/lQ03oj0I2Wpzek3+nyaXZv8AZro7oUOTGxJ+UegxSlTkm0JTVjh4dXubPWprB57uyb7U2RI6IqBmJBJHOMEHPpXZ7KM0mrM8mvhqcnJtWl6/cemN4k0+K0mil1PQriSYBZpPtLbnUMGCD5sBeMYGD15ySTCwslpFo6MPyUYcqvfr/Vzk/Guu2Wq2UcEJspiF8qOC1lJY5LfdyWJbLH8KuNCUXzNo2lWUlZXMifV2sdWuhN/aMDTlJk2sih1KKM5PJ5B6dOlR7NTirWZhVw9Kc+apH8T0Gy1+2tLLbPq2i3F0YTF5jXJLRqy7SBzjJ6kkEk+wAB9Vt8LRGDhHDx1u5df6/q5j694l057GOJDppiiLMkUUzHex2j+Ikk/KMD1pvDSe7R2fWEu5j2mrPbWsMCi/jWJAgRiMrgYwaxlG7b/UtWsQa/8Aduf+uSVdLdhX/QpeG/uxfh/M0q+xVDY72w/5Cll/vt/6DXn/AGDePxHNa7/rG/65P/Ou6j+hhW2Rz+gf+zH+YrStsRh+p3sfW1/67R/zNef0Z1dUW7z/AI+5/wDfb+dJbEy3P//Z'
					},
					menu_callback : {
						goHome : "TaskQueue.add(new TaskWalk(Character.homeTown.town_id,'town'))",
						goToDaily1 : 'Map.center(1920, 2176);',
						goToDaily2 : 'Map.center(28288,16768);',
						ownSaloon : 'SaloonWindow.open(Character.homeTown.town_id);',
						openMarket : 'MarketWindow.open(Character.homeTown.town_id,10);',
						mobileTrader : "Trader.open('item_trader');",
						listNeeded : 'TWT.WindowCollection.open();',
						openOptions : "TWT.Options.open('setting')"

					},
					langs : {
						fr : {
							description : "<center><BR /><b>TW Tools RB + Collections</b><br><b>Astuces et signalement des items manquants des collections<br>Liste des items manquants des collections<br>Frais bancaires en survol avant dépot<br>Divers raccourcis et fonctions<br>  bloc notes<br> suppressions des rapports<br> etc...</b></center>",
							Options : {
								tab : {
									setting : 'Réglages'
								},
								checkbox_text : {
									box : {
										title : 'Raccourcis menus',
										options : {
											goHome : 'Aller &agrave; sa ville',
											goToDaily1 : 'Aller &agrave; la ville abandonn&eacute;e',
											goToDaily2 : 'Aller au village de Waupee',
											ownSaloon : 'Ouvrir votre saloon',
											openMarket : 'Ouvrir le march&eacute;',
											mobileTrader : 'Ouvrir le marchand ambulant',
											listNeeded : 'Items manquants des collections'
										}
									},
									miscellaneous : {

										title : 'Divers',
										options : {
											lang : 'Language :',
											logout : 'Bouton d&eacute;connexion directe',
											deleteAllReports : 'Action pour supprimer tous les rapports',
											showFees : 'Frais bancaire en survol'
										}
									},
									collection : {
										title : 'Collections',
										options : {
											patchsell : 'Signalement des items manquants aux collections dans l\'inventaire',
											patchtrader : 'Signalement des items n&eacute;cessaires aux collections chez les marchands',
											patchmarket : 'Signalement des items n&eacute;cessaires aux collections dans le march&eacute;',
											filterMarket : 'Filtre dans le march&eacute; pour n\'afficher que les items manquants',
											showmiss : 'Items manquants des collections sur survol'
										}
									}
								},
								message : {
									title : 'Information',
									message : 'Préférences appliquées',
									reloadButton : 'Recharger cette page',
									gameButton : 'Aller sur le jeu'
								},
								saveButton : 'Sauvegarder'

							},
							ToolBox : {
								title : 'TWTools Fonctionnalit&eacute;s',
								list : {
									openOptions : 'Param&egrave;tres de l&acute;outil'
								}
							},
							Logout : {
								title : 'D&eacute;connecter'
							},
							AllReportsDelete : {
								button : 'Tout supprimer',
								title : 'Supprimer tous les rapports',
								work : 'Job',
								progress : 'Etat d\'avancement',
								userConfirm : 'Confirmation utilisateur',
								loadPage : 'Charger la page',
								deleteReports : 'Supprimer les rapports',
								confirmText : 'Etes-vous sur de vouloir supprimer tous les rapports ?',
								deleteYes : 'Oui, supprimer',
								deleteNo : 'Non, ne pas supprimer',
								status : {
									title : 'Statut',
									wait : 'Patienter',
									successful : 'R&eacute;ussi',
									fail : 'Erreur',
									error : 'Erreur'
								}
							},
							fees : {
								tipText : 'Frais &aacute; %1% : %2'

							},
							collection : {
								miss : "Manquants : ",
								thText : '%1 item%2 manquant%3',
								thEncours : 'Vous avez une ench&egrave;re en cours pour cet article',
								thFetch : 'Vous pouvez récuperer cet article au marché de %1',
								allOpt : 'Tous',
								listText : 'Liste des items manquants des collections',
								collectionFilterTip : 'Montrer seulement les items de collection',
								collectionFilterLabel : 'Collections seules',
								select : 'S&eacute;lectionner >>',
								patchsell : {
									title : "Cet item est n&eacute;cessaire pour une collection en cours",
									style : "position:relative;top:0px;left:0px;width:12px;height:12px;padding:0px;border:0px;margin:0px;",
									styleT : "position:absolute;top:4px;left:3px;width:15px;height:15px;padding:0px;border:0px;margin:0px;"
								}
							}
						},
						it : {
							description : "<center><BR /><b>TW Tools RB + Collections</b><br><b>Tips and reporting missing items collections <br>list of collection needed items<BR> Bank fees on mouseover <br> Various shortcuts"
									+ "<br>All reports deletion<br> etc ...</b>",
							Options : {
								tab : {
									setting : 'Impostazioni'
								},
								lang : 'Lingua :',
								checkbox_text : {
									box : {
										title : 'Menù di scelta rapida',
										options : {
											goHome : 'Città',
											goToDaily1 : 'Città fantasma',
											goToDaily2 : 'Villaggio indiano di Waupee',
											ownSaloon : 'Proprio saloon',
											openMarket : 'Mercato',
											mobileTrader : 'Mercante',
											listNeeded : 'Elementi necessari per le collezioni'
										}
									},
									miscellaneous : {
										title : 'Varie',
										options : {
											lang : 'Lingua :',
											logout : 'Pulsante diretto di logout',
											deleteAllReports : 'Azione per eliminare tutti i report',
											showFees : 'Aggiungi Commissioni bancarie al passaggio del mouse'

										}
									},
									collection : {
										title : 'Collezioni',
										options : {
											patchsell : 'Segnalazione di elementi mancanti alle collezioni nell\'inventario',
											patchtrader : 'Segnalazione di elementi necessari per le collezioni dal mercante',
											patchmarket : 'Segnalazione di elementi necessari per le collezioni nel mercato',
											showmiss : 'Filtrare nel mercato gli elementi mancanti',
											filterMarket : 'Filtro di mercato: mostrare solo gli elementi mancanti'
										}
									}
								},
								message : {
									title : 'Informazioni',
									message : 'Impostazioni cambiate con successo',
									reloadButton : 'Ricarica questa pagina',
									gameButton : 'Vai al gioco'
								},
								saveButton : 'Salva'

							},
							ToolBox : {
								title : 'TWTools Funzioni',
								list : {
									openOptions : 'Impostazioni'
								}
							},
							Logout : {
								title : 'Logout'
							},
							AllReportsDelete : {
								button : 'Elimina tutto',
								title : 'Elimina tutti i report',
								work : 'Lavoro',
								progress : 'Stato dei lavori',
								userConfirm : 'Conferma dell\'utente',
								loadPage : 'Caricare la pagina',
								deleteReports : 'Elimina i rapporti',
								confirmText : 'Sei sicuro di voler eliminare tutti i rapporti?',
								deleteYes : 'Si, elimina',
								deleteNo : 'No, non eliminare',
								status : {
									title : 'Stato',
									wait : 'Attendere',
									successful : 'Riuscito',
									fail : 'Errore',
									error : 'Errore'
								}
							},
							fees : {
								tipText : '%1 % Tasse al: $%2'

							},
							collection : {
								miss : "Mancante: ",
								thText : '%1 Oggetti mancanti%2',
								thEncours : 'Hai un offerta per questo articolo',
								thFetch : 'È possibile recuperare questo articolo nel mercato di %1',
								allOpt : 'Tutti',
								collectionFilterTip : 'Mostra solo oggetti da collezione',
								collectionFilterLabel : 'Solo collezioni',
								select : 'Seleziona categoria >>',
								listText : 'Elenco degli oggetti mancanti per le collezioni',
								patchsell : {
									title : "Questa voce è necessaria per la collezione attuale",
									style : "position:relative;top:0px;left:0px;width:12px;height:12px;padding:0px;border:0px;margin:0px;",
									styleT : "position:absolute;top:4px;left:3px;width:15px;height:15px;padding:0px;border:0px;margin:0px;"

								}
							}

						},
						es : {
							description : "<center><BR /><b>TW Tools RB + Collections</b><br><b>Consejos e informe de colecciones de objetos perdidos <br>lista de colecciones de objetos necesarios<BR> Comisiones bancarias al pasar el ratón <br> Varios atajos"
									+ "<br>block de notas<br>Todos los informes borrados<br> etc ...</b>",
							Options : {
								tab : {
									setting : 'Ajustes'
								},
								lang : 'Idioma :',
								checkbox_text : {
									box : {
										title : 'Funciones / Menús',
										options : {
											goHome : 'Ir a la Ciudad',
											goToDaily1 : 'Ciudad Fantasma',
											goToDaily2 : 'Campamento Indio Waupee',
											ownSaloon : 'Abrir Salón',
											openMarket : 'Abrir Mercado',
											mobileTrader : 'Abrir Comerciante Ambulante',
											listNeeded : 'Artículos necesarios para colección'

										}
									},
									miscellaneous : {

										title : 'Otros',
										options : {
											lang : 'Idioma :',
											logout : 'Añadir botón de cierre de sesión',
											deleteAllReports : 'Añadir suprimir todos los informes de acción',
											showFees : 'Añadir Comisiones Bancarias al pasar el ratón'
										}
									},
									collection : {
										title : 'Colecciones',
										options : {
											patchsell : 'Señal de artículos que faltan en el Inventario',
											patchtrader : 'Señal de artículos que faltan en Vendedores',
											patchmarket : 'Señal de artículos que faltan en el Mercado',
											showmiss : 'Lista de artículos que faltan en la punta',
											filterMarket : 'Filtro de Mercado : mostrar solo artículos que faltan'
										}
									}
								},
								message : {
									title : 'Información',
									message : 'Se han aplicado las preferencias.',
									reloadButton : 'Actualizar esta página',
									gameButton : 'Volver al juego'
								},
								saveButton : 'Guardar'

							},
							ToolBox : {
								title : 'TWTools Funciones',
								list : {

									openOptions : 'Ajustes'

								}
							},
							Logout : {
								title : 'Salir'
							},
							AllReportsDelete : {
								button : 'Suprimir todo',
								title : 'Suprimir todos los informes',
								work : 'Trabajo',
								progress : 'Progreso',
								userConfirm : 'Confirme Usuario',
								loadPage : 'Cargar Página',
								deleteReports : 'Borrar informes',
								confirmText : 'Suprimir todos los informes - ¿Está seguro?',
								deleteYes : 'Sí, borrar',
								deleteNo : 'No, no borrar',
								status : {
									title : 'Estado',
									wait : 'Espere',
									successful : 'Con éxito',
									fail : 'Falló',
									error : 'Error'
								}
							},
							fees : {
								tipText : '%1 % Comisiones : $%2'

							},
							collection : {
								miss : "Que falta : ",
								thText : '%1 artículo que falta%2',
								thEncours : 'Tienes una oferta por este artículo',
								thFetch : 'Puedes recuperar este artículo en el mercado de %1',
								allOpt : 'Todo',
								collectionFilterTip : 'Mostrar colecciones de artículos solamente',
								collectionFilterLabel : 'Colecciones solamente',
								select : 'Seleccionar >>',
								listText : 'Artículos necesarios para colecciones',
								patchsell : {
									title : "Artículo necesario para colección en progreso",
									style : "position:relative;top:0px;left:0px;width:12px;height:12px;padding:0px;border:0px;margin:0px;",
									styleT : "position:absolute;top:4px;left:3px;width:15px;height:15px;padding:0px;border:0px;margin:0px;"
								}
							}

						},
						de : {
							description : "<center><BR /><b>TW Tools RB + Collections</b><br><b>Tips and reporting missing items collections <br>list of collection needed items<BR> Bank fees on mouseover <br> Various shortcuts"
									+ "<br>All reports deletion<br> etc ...</b>",
							Options : {
								tab : {
									setting : 'Einstellungen'
								},
								lang : 'Language :',
								checkbox_text : {
									box : {
										title : 'Funktionen / Menüs',
										options : {
											goHome : 'Zur eigenen Stadt gehen',
											goToDaily1 : 'Geisterstadt',
											goToDaily2 : 'Waupee´s Indianerdorf',
											ownSaloon : 'Saloon öffnen',
											openMarket : 'Markt öffnen',
											mobileTrader : 'Fahrenden Händler öffnen',
											listNeeded : 'Fehlende Elemente Sammlungen'
										}
									},
									miscellaneous : {
										title : 'Sonstiges',
										options : {
											lang : 'Language :',
											logout : 'Logout Button Hinzufügen',
											deleteAllReports : 'Alle Berichtemeldungen unterdrücken',
											showFees : 'Bankgebühren'
										}
									},
									collection : {
										title : 'Sammlungen',
										options : {
											patchsell : 'Hinweis für fehlendes Item im Inventar',
											patchtrader : 'Hinweis für fehlendes Item beim fahrenden Händler',
											patchmarket : 'Hinweis für fehlendes Item im Markt',
											showmiss : 'Liste für fehlende Items',
											filterMarket : 'Marktfilter : Zeige nur fehlende Items'
										// listNeeded : 'Verkürzte Liste der
										// fehlenden
										// Items'
										}
									}
								},
								message : {
									title : 'Information',
									message : 'Einstellungen wurden durchgeführt.',
									reloadButton : 'Lade die Seite neu mit F5',
									gameButton : 'Zurück zum Spiel'
								},
								saveButton : 'Speichern'
							},
							ToolBox : {
								title : 'TWTools Funktionen',
								list : {
									openOptions : 'Einstellungen'
								// neededWindow : 'Benötigte Items'
								}
							},
							Logout : {
								title : 'Logout'
							},
							AllReportsDelete : {
								button : 'Alle entfernen',
								title : 'Alle Berichte entfernen',
								work : 'Arbeit',
								progress : 'Fortschritt',
								userConfirm : 'Bestätigen',
								loadPage : 'Seite laden',
								deleteReports : 'Berichte löschen',
								confirmText : 'Alle Berichte löschen. Bist du dir sicher?',
								deleteYes : 'Ja, löschen',
								deleteNo : 'Nein, nicht löschen',
								status : {
									title : 'Status',
									wait : 'Warten',
									successful : 'Erfolgreich',
									fail : 'Fehler',
									error : 'Fehler'
								}
							},
							fees : {
								tipText : '%1 % Fees : $%2'
							},
							collection : {
								miss : "Es fehlen: ",
								thText : '%1 fehlende Item%2',
								thEncours : 'Du hast schon ein Angebot abgegeben',
								thFetch : 'Du kannst dieses Produkt im% 1 \'s Markt abrufen ',
								allOpt : 'Alle',
								collectionFilterTip : 'Nur Sammleritems anzeigen',
								collectionFilterLabel : 'Nur Sammlungen',
								select : 'Wähle >>',
								listText : 'Benötigte Einzelteile für meine Sammlung',
								patchsell : {
									title : "Dieses Item wird benötigt bei der Arbeit",
									style : "position:relative;top:0px;left:0px;width:12px;height:12px;padding:0px;border:0px;margin:0px;",
									styleT : "position:absolute;top:4px;left:3px;width:15px;height:15px;padding:0px;border:0px;margin:0px;"
								}
							}
						},
						en : {
							description : "<center><BR /><b>TW Tools RB + Collections</b><br><b>Tips and reporting missing items collections <br>list of collection needed items<BR> Bank fees on mouseover <br> Various shortcuts"
									+ "<br>notepad<br>All reports deletion<br> etc ...</b>",
							Options : {
								tab : {
									setting : 'Settings'
								},
								lang : 'Language :',
								checkbox_text : {
									box : {
										title : 'Features / Menus',
										options : {
											goHome : 'Go town',
											goToDaily1 : 'Ghost Town',
											goToDaily2 : 'Waupee Indian Camp ',
											ownSaloon : 'Open saloon',
											openMarket : 'Open Market',
											mobileTrader : 'Open Mobile Trader',
											listNeeded : 'Needed items for collections'
										}
									},
									miscellaneous : {
										title : 'Miscellaneous',
										options : {
											lang : 'Language :',
											logout : 'Add Logout button',
											deleteAllReports : 'Add suppress all reports action',
											showFees : 'Add Bank Fees on Mouseover'

										}
									},
									collection : {
										title : 'Collections',
										options : {
											patchsell : 'Signal missing items in inventory',
											patchtrader : 'Signal missing items on Traders',
											patchmarket : 'Signal missing items on Market',
											showmiss : 'List for missing items on tip',
											filterMarket : 'Market filter : show only missing items'
										}
									}
								},
								message : {
									title : 'Information',
									message : 'Preferences have been applied.',
									reloadButton : 'Reload this page',
									gameButton : 'Return to the game'
								},
								saveButton : 'Save'

							},
							ToolBox : {
								title : 'TWTools Features',
								list : {
									openOptions : 'Settings'
								}
							},
							Logout : {
								title : 'Logout'
							},
							AllReportsDelete : {
								button : 'Suppress all',
								title : 'Suppress all reports',
								work : 'Job',
								progress : 'Progress',
								userConfirm : 'User Confirm',
								loadPage : 'Load Page',
								deleteReports : 'Delete reports',
								confirmText : 'Supress all reports - Are you sure ?',
								deleteYes : 'Yes, delete',
								deleteNo : 'No, don\'t delete',
								status : {
									title : 'Status',
									wait : 'Wait',
									successful : 'R&eacute;ussi',
									fail : 'Error',
									error : 'Error'
								}
							},
							fees : {
								tipText : '%1 % Fees : $%2'

							},
							collection : {
								miss : "Missing : ",
								thText : '%1 missing item%2',
								thEncours : 'You have a bid for this item',
								thFetch : 'You may retrieve this item at %1\'s market ',
								allOpt : 'All',
								collectionFilterTip : 'Show collections items only',
								collectionFilterLabel : 'Collections only',
								select : 'Select >>',
								listText : 'Items needed for collections',
								patchsell : {
									title : "Item needed for collection in progress",
									style : "position:relative;top:0px;left:0px;width:12px;height:12px;padding:0px;border:0px;margin:0px;",
									styleT : "position:absolute;top:4px;left:3px;width:15px;height:15px;padding:0px;border:0px;margin:0px;"
								}
							}

						},
						pl : {
							description : "<center><BR /><b>TW Tools RB + Collections</b><br><b>Porady i raportowanie brakujących elementów kolekcji <br/> lista kolekcji potrzebnych przedmiotów, <br/> opłaty bankowe po najechaniu myszą, <br/> zbiór różnych skrótów."
									+ "<br>notatnik<br>Usuwanie wszystkich raportów<br> itp ...</b>",
							Options : {
								tab : {
									setting : 'Ustawienia'
								},
								lang : 'Język :',
								checkbox_text : {
									box : {
										title : 'Właściwości / Menu',
										options : {
											goHome : 'Idź do miasta',
											goToDaily1 : 'Idź do Miasta Widma',
											goToDaily2 : 'Idź do Wioski Idiańskiej ',
											ownSaloon : 'Otwórz saloon',
											openMarket : 'Otwórz targ',
											mobileTrader : 'Otwórz handlarza',
											listNeeded : 'Brakujące przedmioty do kolekcji'
										}
									},
									miscellaneous : {
										title : 'Różne',
										options : {
											lang : 'Język :',
											logout : 'Włącz przycisk \"Wyloguj się\"',
											deleteAllReports : 'Dodaj usuwanie wszystkich raportów',
											showFees : 'Pokaż opłaty w Banku po najechaniu myszką na kwotę'

										}
									},
									collection : {
										title : 'Kolekcje',
										options : {
											patchsell : 'Oznaczyć brakujące przedmioty w ekwipunku',
											patchtrader : 'Oznaczyć brakujące przedmioty u Handlarza',
											patchmarket : 'Oznaczyć brakujące przedmioty na Targu',
											showmiss : 'Lista brakujących przedmiotów',
											filterMarket : 'Filtr Targu : pokaż tylko brakujące przedmiotów'
										}
									}
								},
								message : {
									title : 'Informacje',
									message : 'Ustawienia został zapisane.',
									reloadButton : 'Odswież tą stronę',
									gameButton : 'Powrót do gry'
								},
								saveButton : 'Zapisz'

							},
							ToolBox : {
								title : 'Funkcje TWTools',
								list : {
									openOptions : 'Ustawienia'
								}
							},
							Logout : {
								title : 'Wyloguj się'
							},
							AllReportsDelete : {
								button : 'Usuwanie wszystkich raportów',
								title : 'Usuwanie raportów',
								work : 'Praca',
								progress : 'Postęp',
								userConfirm : 'Potwierdzenie użytkownika',
								loadPage : 'Ładowana strona',
								deleteReports : 'Usunięte raporty',
								confirmText : 'Usuwanie raportów - Jesteś pewien ?',
								deleteYes : 'Tak, usuń',
								deleteNo : 'Nie, nie usuwaj',
								status : {
									title : 'Status',
									wait : 'Czekaj',
									successful : 'Pomyślnie',
									fail : 'Błąd',
									error : 'Błąd'
								}
							},
							fees : {
								tipText : '%1 % Prowizja : $%2'

							},
							collection : {
								miss : "Brakuje : ",
								thText : 'Liczba brakujących przedmiotów: %1',
								thEncours : 'Bierzesz udział w licytacji tego produktu',
								thFetch : 'Możesz odebrać ten przedmiot z targu w mieście %1\' ',
								allOpt : 'Wszystko',
								collectionFilterTip : 'Pokaż tylko przedmioty do kolekcji',
								collectionFilterLabel : 'Tylko kolekcje',
								select : 'Wybierz >>',
								listText : 'Brakujące przedmioty do kolecji',
								patchsell : {
									title : "Lista brakujących przedmiotów",
									style : "position:relative;top:0px;left:0px;width:12px;height:12px;padding:0px;border:0px;margin:0px;",
									styleT : "position:absolute;top:0px;left:3px;width:15px;height:15px;padding:0px;border:0px;margin:0px;"
								}
							}

						}
					},
					init : function() {
						try {
							var that = this;
							var timeout = 0;

							// if (!"#tws_selectable_text".length) return;
							$("head")
									.append(
											"<style id=\"tws_selectable_text\">"
													+ "* { -webkit-user-select: text !important; -khtml-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important; }"
													+ "</style>");

							this.interval = setInterval(
									function() {

										var loading = false;

										if (isDefined(Character.playerId)
												&& Character.playerId == 0) {
											loading = false;
										} else if (isDefined(ItemManager.initialized)
												&& !ItemManager.initialized) {
											loading = false;
										} else if (isDefined(ItemManager.isLoaded)
												&& !ItemManager.isLoaded()) {
											loading = false;
										} else if (isDefined(window.TWDB)) { // null
																				// !=
																				// TWDB
																				// &&
																				// 'undefined'
																				// !=
																				// typeof
																				// TWDB)
																				// {

											if (!TWDB.ClothCalc.ready) { // Attente
												// des
												// injections
												// TWDB
												loading = false;
												// si TWDB se plante on arrete
												// au bout de 10 secondes
												timeout++;
												if (timeout > 20) {
													console
															.log('Stoping interval, chargement de TWDB non possible ?');
													loading = true;

												}
											} else {

												loading = true;
											}

										} else {

											loading = true;

										}
										if (loading) {
											clearInterval(that.interval);

											if (TWT.scriptStorage == null) {
												TWT.scriptStorage = new Storage(
														"local",
														"Storage."
																+ TWT.info.idscript);
											}

											TWT.LANG = TWT.langs[TWT.scriptStorage
													.getItem('TWT.Cache.lang')]
													|| TWT.langs["pl"];
											// Update
											ScriptUpdater.check(
													TWT.info.idscript,
													TWT.info.version);

											TWT.Settings.init();
											TWT.api();
											TWT.ready = true;
										}
									}, 500);

						} catch (e) {
							console.log(e, "Erreur d'initialisation");

							TWT.ready = false;
						}
					},
					Settings : {
						checked : {},
						shouldRefresh : {},
						init : function() {

							$
									.each(
											TWT.LANG.Options.checkbox_text,
											function(ind1, val) {

												TWT.Settings.checked[ind1] = [];

												$
														.each(

																TWT.LANG.Options.checkbox_text[ind1]['options'],
																function(ind2,
																		detail) {
																	var attended = TWT.scriptStorage
																			.getItem('TWT.Cache.'
																					+ ind1
																					+ '.'
																					+ ind2);

																	if (!isDefined(attended)) {

																		attended = TWT.scriptStorage
																				.getItem('TWT.Cache.'
																						+ ind2);

																		if (!isDefined(attended)) {

																			if (detail == 'lang') {

																				attended = 'pl';
																			} else {
																				attended = '1';

																			}
																			;
																		} else {

																			// patch

																			TWT.scriptStorage
																					.removeItem('TWT.Cache.'
																							+ ind2);
																		}
																		TWT.scriptStorage
																				.setItem(
																						'TWT.Cache.'
																								+ ind1
																								+ '.'
																								+ ind2,
																						attended);

																	}

																	TWT.Settings.checked[ind1][ind2] = attended;
																});

											});
							TWT.Settings.apply();
						},
						getValue : function(what) {

							return eval('TWT.Settings.checked.' + what);

						},
						isChecked : function(what) {
							return TWT.Settings.getValue(what) == "1";

						},
						refresh : function(tabOpt) {
							var refreshed = false;
							try {
								for ( var key in tabOpt) {
									if (tabOpt.hasOwnProperty(key)) {
										var val = tabOpt[key];
										if (val != TWT.Settings.getValue(key)) {
											TWT.scriptStorage.setItem(
													'TWT.Cache.' + key, val);
											var det = key.split('.');
											TWT.Settings.checked[det[0]][det[1]] = val;

											EventHandler.signal(key);

											refreshed = true;
										}
									}

								}
								;
								TWT.LANG = TWT.langs[TWT.Settings
										.getValue('miscellaneous.lang')]
										|| TWT.langs["pl"];
								EventHandler.signal('collection.bagupdate');
							} catch (e) {
								console.log('Erreur refresh ', e);
							}
							return refreshed;
						},
						apply : function() {
							TWT.LANG = TWT.langs[TWT.Settings
									.getValue('miscellaneous.lang')]
									|| TWT.langs["pl"];

							TWT.MenuBox.create();
							TWT.CollectionsHandler.initListener();
							TWT.Logout.initListener();
							TWT.BankFees.initListener();
							TWT.AllReportsDelete.initListener();
							TWT.CollectionsHandler.init();

							if (TWT.Settings.isChecked('miscellaneous.logout'))
								TWT.Logout.create();
							if (TWT.Settings.isChecked('collection.patchsell')
									|| TWT.Settings
											.isChecked('collection.patchmarket')
									|| TWT.Settings
											.isChecked('collection.showmiss')
									|| TWT.Settings
											.isChecked('collection.filterMarket')) {
								EventHandler.signal('collection.bagupdate');
								TWT.CollectionsHandler.inject();
								TWT.CollectionsHandler.attachFilter();
							}

							if (TWT.Settings
									.isChecked('miscellaneous.showFees')) {

								TWT.BankFees.attach();
							}

							if (TWT.Settings
									.isChecked('miscellaneous.deleteAllReports')) {
								TWT.AllReportsDelete.addStyle();
								TWT.AllReportsDelete.attach();

							}

						}
					},
					Options : {

						open : function(window) {
							TWT.Options.Windows = wman.open('ToolWindow')
									.addClass('noreload').setMiniTitle(
											TWT.LANG.Options.tab.setting)
									.addTab(TWT.LANG.Options.tab.setting,
											'TabSetting',
											TWT.Options.setting.open);
							$('<div></div>').attr({
								'id' : 'ToolWindowBody'
							}).css({
								'margin-left' : '20px',
								'margin-right' : '20px'
							}).appendTo(
									'.ToolWindow .tw2gui_window_content_pane');
							if (window == 'setting')
								TWT.Options.setting.open();

						},
						setting : {
							open : function() {
								TWT.Options.Windows.activateTab('TabSetting');
								var save_button = new west.gui.Button(
										TWT.LANG.Options.saveButton,
										function() {
											TWT.Options.save();
										});
								var l1 = $('<tr />').append(
										$('<td />').append(
												TWT.Options.getContent()));
								var l2 = $('<tr />')
										.append(
												$('<td />')
														.append(
																$(
																		'<div style="text-align: center;"></div>')
																		.append(
																				save_button
																						.getMainDiv())));

								$('#ToolWindowBody')
										.html(
												$(
														'<table border="0" width=100%></table>')
														.append(l1).append(l2));

							}
						},
						getContent : function() {

							var table = $('<table class="craftingbg" border="0" width=100%></table>');

							for ( var key in TWT.LANG.Options.checkbox_text) { // TWT.Settings.checkbox_setting)
								// {

								$('<tr />')
										.append(
												$('<td colspan=2 align="center"><b>'
														+ TWT.LANG.Options.checkbox_text[key]['title']
														+ '</b></td>'))
										.appendTo(table);

								for ( var i in TWT.LANG.Options.checkbox_text[key]['options']) {

									if (i == 'lang') {
										$(table).append(
												TWT.Options.createLanguage());
									} else {

										var base = $('<tr />');
										$('<td />')
												.append(
														new west.gui.Checkbox()
																.setSelected(
																		// (TWT.scriptStorage
																		// .getItem('TWT.Cache.'
																		// + key
																		// + '.'
																		// +
																		TWT.Settings
																				.isChecked(key
																						+ '.'
																						+ i))

																.getMainDiv())
												.append(
														' '
																+ TWT.LANG.Options.checkbox_text[key]['options'][i])
												.appendTo(base);

										base.attr({
											'id' : 'setting_' + key + '_' + i

										}).appendTo(table);

									}

								}

							}

							var scrollbar = new west.gui.Scrollpane;
							$(scrollbar.getMainDiv()).css("height", "300px");
							scrollbar.appendContent(table);

							return $(scrollbar.getMainDiv());
						},
						createLanguage : function() {

							TWT.Options.lang_box = new west.gui.Combobox;
							for ( var i = 0; i < TWT.languages.length; i++) {
								TWT.Options.lang_box.addItem(
										TWT.languages[i].short_name,
										TWT.languages[i].name);
							}

							TWT.Options.lang_box.select(TWT.Settings
									.getValue('miscellaneous.lang'));

							return $('<tr />')
									.append(
											$('<td />')
													.append(
															TWT.LANG.Options.checkbox_text.miscellaneous.options.lang
																	+ " ")
													.append(
															TWT.Options.lang_box
																	.getMainDiv()));
						},
						save : function() {
							var tblSave = new Array();

							for ( var key in TWT.LANG.Options.checkbox_text) {

								for ( var i in TWT.LANG.Options.checkbox_text[key]['options']) {

									if (i != 'lang') {
										tblSave[key + '.' + i] = $('#setting_'
												+ key + '_' + i
												+ ' .tw2gui_checkbox_checked').length;

									}
								}
							}

							tblSave['miscellaneous.lang'] = TWT.Options.lang_box
									.getValue();

							TWT.Settings.refresh(tblSave);
							new UserMessage(TWT.LANG.Options.message.message,
									UserMessage.TYPE_SUCCESS).show();
							TWT.Options.Windows.closeTab('TabSetting');

						}
					},
					MenuBox : {
						selectbox : null,
						create : function() {
							$('#TWT_Icon').remove();
							var a = $('<div></div>').attr({
								'class' : 'menulink',
								'title' : TWT.LANG.ToolBox.title
							}).css({
								'background-position' : '0px -100px'
							}).mouseenter(
									function(e) {
										$(this).css("background-position",
												"-25px -100px");

										TWT.MenuBox.open(e);
									}).mouseleave(
									function() {
										$(this).css("background-position",
												"0px -100px");
									}).click(function(e) {
								TWT.MenuBox.open(e);
							});
							var b = $('<div></div>').attr({
								'class' : 'menucontainer_bottom'
							});

							$('#ui_menubar .ui_menucontainer :first').after(
									$('<div></div>').attr({
										'class' : 'ui_menucontainer',
										'id' : 'TWT_Icon'
									}).append(a).append(b));
							// .appendTo('#ui_menubar');
						},
						open : function(e) {

							if (isDefined(this.selectbox)) {

								this.selectbox.items = [];

							} else {

								this.selectbox = new west.gui.Selectbox(true);

								this.selectbox

								.setWidth(250).addListener(

								function(key) {
									console.log(key);
									if (key == 99) {
										eval(TWT.menu_callback['openOptions']);
									} else {
										eval(TWT.menu_callback[key]);
									}

								});
							}
							var that = this;
							$.each(

							TWT.LANG.Options.checkbox_text.box.options,
									function(indexB, keyB) {

										if (TWT.Settings.isChecked('box.'
												+ indexB))
											that.selectbox
													.addItem(indexB, keyB);

									});
							this.selectbox.addItem(99,
									TWT.LANG.ToolBox.list.openOptions);

							this.selectbox.show(e);

							this.selectbox.setPosition(e.clientX,
									e.clientY - 25);
							$(this.selectbox.elContent).mouseleave(function() {
								that.selectbox.hide();

							});
						}
					},
					MetaCol : {
						group : [],
						groupSorted : [],
						marketEC : {},
						all : {},
						inProgress : {},
						erreur : false,
						ready : false,
						dirty : true,
						getMarketEC : function() {

							$
									.ajax({
										url : 'game.php?window=building_market&action=fetch_bids&h='
												+ Player.h,
										type : 'POST',
										data : {},
										dataType : 'json',
										async : false,
										success : function(json) {
											if (json.error)
												return new UserMessage(
														json.msg,
														UserMessage.TYPE_ERROR)
														.show();
											var result = json.msg.search_result;
											TWT.MetaCol.marketEC = [];
											for ( var i = 0; i < result.length; i++) {
												var item = ItemManager
														.get(result[i].item_id);

												TWT.MetaCol.marketEC[$
														.trim(item.name)] = result[i];
											}

										}
									});
						},
						populateInProgress : function(all) {

							try {

								$
										.each(
												all["achievements"]["progress"],
												function(index, value) {

													var itemsImg = $('<div />')
															.append(value.meta)
															.find(
																	'.resizedImage');
													var ident = $
															.trim(value.title);
													TWT.MetaCol.group[ident] = [];

													var strManquant = "";
													$
															.each(
																	itemsImg,

																	function(
																			inD,
																			val) {
																		var name = $
																				.trim($(
																						val)
																						.attr(
																								'alt'));
																		var shoudBuy = $(
																				val)
																				.parent()
																				.hasClass(
																						"locked");

																		TWT.MetaCol.inProgress[name] = {
																			shouldBuy : shoudBuy,
																			src : $(
																					val)
																					.attr(
																							'src'),
																			img : $(
																					val)
																					.attr(
																							'src')
																					.match(
																							/\S*.\/(\S*png)/)[1],
																			group : ident

																		};
																		if (shoudBuy) {
																			TWT.MetaCol.group[ident]
																					.push(name);
																		}

																	});

												});
								var sortable = [];
								for ( var group in TWT.MetaCol.group) {
									sortable.push([ group,
											TWT.MetaCol.group[group] ]);
								}
								sortable.sort(function(a, b) {
									var x = a[0];
									var y = b[0];

									if (typeof x === 'string'
											&& typeof x === 'string') {

										return x.localeCompare(y);
									}

									return ((x < y) ? -1 : ((x > y) ? 1 : 0));
								});

								TWT.MetaCol.groupSorted = sortable;
								// DEBUG
								// TWT.MetaCol.inProgress['Gibus marron'] = {
								// shouldBuy : true,
								// src : 'dirty',
								// img : 'dirty',
								// group : 'Gibus'
								//
								// };
								// TWT.MetaCol.group['Gibus'].push('Gibus
								// marron');

								TWT.MetaCol.dirty = false;
							} catch (e) {
								this.erreur = "Collection impossible";
								console.log(e, this.erreur);
							}

						},
						sort : function(array, key) {

							return array.sort(function(a, b) {
								var x = a[key];
								var y = b[key];
								return ((x < y) ? -1 : ((x > y) ? 1 : 0));
							});
						},
						init : function() {
							if (this.ready == false) {

								TWT.MetaCol.all = {};
								TWT.MetaCol.group = {};
								TWT.MetaCol.all = {};
								TWT.MetaCol.inProgress = {};
								that = this;
								TWT.MetaCol.getMarketEC();
								$
										.ajax({
											url : 'game.php?window=achievement&action=get_list&h='
													+ Player.h,
											type : 'POST',
											data : {
												'folder' : 'collections',
												'playerid' : Character.playerId
											},
											dataType : 'json',
											async : false,
											success : function(data_return) {
												TWT.MetaCol.all = eval(data_return);
												TWT.MetaCol
														.populateInProgress(eval(data_return));
												TWT.MetaCol.ready = true;
											}
										});

							}
						},
						isFinished : function(name) {
							var item = TWT.MetaCol.inProgress[$.trim(name)];
							if (!isDefined(item)) {

								return true;
							} else if (TWT.MetaCol.group[item.group][0] == true) {

								return true;

							}

							return false;
						},
						shouldBuy : function(name) {
							var item = TWT.MetaCol.inProgress[$.trim(name)];
							var marketed = TWT.MetaCol.marketEC[$.trim(name)];
							if (item && !isDefined(marketed)) {

								return item.shouldBuy;
							} else {

								return false;
							}
						},
						getBuyItems : function(name) {
							if (TWT.Settings.isChecked('collection.showmiss')) {
								var item = TWT.MetaCol.inProgress[$.trim(name)];
								if (item) {
									var manquants = TWT.MetaCol.group[item.group];

									if (manquants.length > 0) {
										var strManq = ":\u003Cbr /\u003E";
												//+ TWT.LANG.collection.miss;
										$.each(manquants, function(inD, val) {
											strManq += "&nbsp;&nbsp;&nbsp;<strong>[ " + val + " ]</strong>\x3Cbr /\x3E";
										});
										return strManq += "";
									}
								}
							}
							return "";
						},

						remove : function(arr, name) {

							name = $.trim(name);

							var x, _i, _len, _results;
							_results = [];
							for (_i = 0, _len = arr.length; _i < _len; _i++) {
								x = arr[_i];
								if (x != name) {
									_results.push(x);
								}
							}

							return _results;

						}

					},
					WindowCollection : {
						scrollbar : null,
						totalGroup : 0,
						getAllAnchors : function() {
							that = this;

							var textinput = $('<span style="position:relative;top:5px;left:0px;width:200px;height:19px;font-weight:bold;text-align:left;" />');
							textinput.append(TWT.LANG.collection.select);

							var anchors = new west.gui.Selectbox();

							anchors.setWidth(200);
							$(anchors.elContent).css("max-height", "270px");
							$(anchors.elContent).css("width", "250px");

							anchors.addItem(TWT.LANG.collection.allOpt,
									TWT.LANG.collection.allOpt);

							$.each(TWT.MetaCol.groupSorted,
									function(ind2, val) {

										anchors.addItem(val[0], val[0]);

									});

							anchors.addItem("99999", " ");

							anchors.addListener(function(e) {

								var str = "";

								var arrtmp = {};

								if (e == TWT.LANG.collection.allOpt) {
									arrtmp = TWT.MetaCol.groupSorted;
								} else {
									arrtmp[0] = [ e, TWT.MetaCol.group[e] ];
								}
								TWT.WindowCollection.scrollbar.scrollToTop();
								var opt = that.getDiv(eval(arrtmp));

								$('#showbox').html(opt);

								return true;
							});

							var guibutton = new west.gui.Iconbutton(
									'/images/icons/achv_points.png', (function(
											e) {
										anchors.show(e);
									}), this, this, 'Sélectionner...');
							$(guibutton.getMainDiv()).hover(function(e) {

								anchors.show(e);

							});

							return textinput.append(guibutton.getMainDiv());
							;
						},
						getDiv : function(what) {
							that = this;
							var total = 0;

							var divMain = $("<br /><table width='100%' cellpading=10 cellspacing=10  style='font-style: bold; -webkit-user-select: text !important; -khtml-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important;' />");
							var th = $('<th id="thliste" />');
							divMain.append(th);
							$
									.each(
											what,
											function(ind2, valGroup) {
												var imod = 0;
												//	
												var bigTR = $('<tr/>');
												bigTR.attr('class',
														'questlog_entrie');
												bigTR.css({
													'color' : '#113355'
												});
												bigTR.attr('id', $
														.trim(valGroup[0]));
												bigTR
														.append($('<td />')
																.append(
																		$
																				.trim(valGroup[0]))

														);

												divMain.append(bigTR);

												$
														.each(
																valGroup[1],
																function(ind3,
																		val) {

																	var tr = $('<tr style="font-weight:bold;font-style:italic;"></tr>');
																	var td = $('<td />');

																	td
																			.append(val);
																	var item = TWT.MetaCol.marketEC[$
																			.trim(val)];
																	if (isDefined(item)) {
																		var imsell = '';

																		if (!isNaN(parseInt(item.max_price))
																				&& item.current_bid == parseInt(item.max_price)) {

																			imsell = $('&nbsp;<span '
																					+ 'title="'
																					+ TWT.LANG.collection.thFetch
																							.replace(
																									'%1',
																									item.market_town_name)
																					+ '" '
																					+ 'style="background: url(\'/images/market/fetch.png\') '
																					+ 'repeat-x scroll 0 0 transparent;cursor: pointer;'
																					+ 'height: 12px; display: inline-block;width: 12px;"> </span>');
																			item.isFinished = true;
																		}
																		var sp = $('&nbsp;<span '
																				+ 'title="'
																				+ TWT.LANG.collection.thEncours
																				+ '" '
																				+ 'style="background: url(\'/images/window/market/market_icons2.png\') '
																				+ 'repeat-x scroll 0 0 transparent;cursor: pointer;'
																				+ 'height: 16px; background-position: -16px 0;display: inline-block;width: 16px;"> </span>');

																		td
																				.append(
																						'&nbsp;')
																				.append(
																						sp)
																				.append(
																						'&nbsp;')
																				.append(
																						imsell)
																				.click(
																						function() {
																							MarketWindow
																									.open(
																											Character.homeTown.town_id,
																											'offer');
																							MarketWindow
																									.showTab('offer');
																						});
																	}
																	td
																			.appendTo(tr);

																	divMain
																			.append(tr);

																	imod++;

																});

												total += imod;

											}

									);

							var s = (total > 1) ? 's' : '';

							$('#thliste', divMain).append(
									TWT.LANG.collection.thText.replace('%2', s)
											.replace('%3', s).replace('%1',
													total));

							return divMain;
						},
						open : function(window) {

							if (!TWT.MetaCol.ready) {
								TWT.MetaCol.init();
								this.interval = setInterval(function() {
									if (TWT.MetaCol.ready)
										clearInterval(this.interval);
								}, 200);
							} else {
								TWT.MetaCol.getMarketEC();
							}
							;

							TWT.WindowCollection.Window = wman.open(
									'WindowCollection',
									TWT.LANG.collection.listText).setMiniTitle(
									TWT.LANG.collection.listText).addClass(
									'tw2gui_window_notabs');
							;
							$('<div></div>')
									.attr({
										'id' : 'WindowCollectionBody'
									})
									.css({
										'margin-left' : '20%',
										'margin-right' : '20%'
									})
									.appendTo(
											'.WindowCollection .tw2gui_window_content_pane');
							TWT.WindowCollection.Window.showLoader();

							var divMain = this.getDiv(TWT.MetaCol.groupSorted);

							var showbox = $('<div style="max-height: 380px; overflow: hidden;"></div>');

							TWT.WindowCollection.scrollbar = new west.gui.Scrollpane;
							TWT.WindowCollection.scrollbar.scrollToTop();
							$(TWT.WindowCollection.scrollbar.getMainDiv()).css(
									"height", "380px");

							TWT.WindowCollection.scrollbar
									.appendContent($('<div id="showbox" align="center"></div>'));
							showbox.append(TWT.WindowCollection.scrollbar
									.getMainDiv());

							$('#WindowCollectionBody').append(
									$('<div style="text-align: left; position:absolute; left:25px;"></div>')
											.append(this.getAllAnchors()))
									.append(showbox);

							$('#showbox').html(divMain);

							TWT.WindowCollection.Window.hideLoader();

						}
					},
					Injecteur : {
						divsnif : [],
						methodes : [],

						init : function(id, name, callback) {
							if (!isDefined(this.methodes[id])) {
								this.methodes[id] = {
									attached : false,
									id : id,
									name : name,
									callback : callback,
									original : eval(name)
								};
							}
							;

						},
						divsniffer : function(who, callback) {

							if (isDefined(TWT.Injecteur.divsnif[who])) {
								return false;
							} else {

								$('#windows')
										.on(
												'DOMNodeInserted',
												'.' + who,
												function(e) {
													try {
														var opendiv = e.currentTarget;

														if (opendiv.attributes['class'].nodeValue
																.indexOf(who) > -1) {

															var divBuy = $(
																	'div[class="'
																			+ who
																			+ '"]')
																	.contents();

															callback($(opendiv));

														}
													} catch (e) {
														console.log(e);
													}
												});
								TWT.Injecteur.divsnif[who] = 'true';
							}
						},
						divsnifferoff : function(who) {
							$('#windows').off('DOMNodeInserted', '.' + who);

							TWT.Injecteur.divsnif[who] = undefined;
						},
						inject : function(id) {
							try {
								if (isDefined(this.methodes[id])
										&& !this.methodes[id].attached) {
									this.methodes[id].attached = true;
									return this.methodes[id].callback();
								}
								;
							} catch (e) {

								console.log(e, 'Erreur injection ' + id);
								this.restore(id);
							}

						},
						restore : function(id) {

							try {

								this.methodes[id].attached = false;

								eval("(function ($) {" + this.methodes[id].name
										+ '=' + this.methodes[id].original
										+ "})($);");
								return this.methodes[id].original;
							} catch (e) {

								console.log(e, 'Erreur retauration ' + id);

							}
						},
						injectedMethods : {
							injectSell : function() {

								tw2widget["InventoryItem"].prototype.getMainDiv = function() {
									var newfunction = tw2widget["InventoryItem"].prototype.getMainDiv;

									return function() {

										if (TWT.MetaCol.dirty) {
											TWT.CollectionsHandler.refresh();
										}
										var name = $.trim(this.obj.name);
										this.divMain = newfunction.bind(this)();

										this.divMain.find('.TWTSuccessSell')
												.remove();
										if (!TWT.MetaCol.isFinished(name)) {

											this.divMain
													.append('<img  class="TWTSuccessSell"'
															+ 'style="'
															+ TWT.LANG.collection.patchsell.styleT
															+ '" title="'
															+ TWT.LANG.collection.patchsell.title
															+ TWT.MetaCol
																	.getBuyItems(name)
															+ '"'
															+ ' src="'
															+ TWT.images.cup
															+ '" />');

										}
										if (TWT.MetaCol.dirty) {
											TWT.CollectionsHandler.refresh();
										}
										return this.divMain;
									};
								}();
							},
							injectMarket : function() {

								try {

									MarketWindow.getClearName = function() {
										var newfunction = MarketWindow.getClearName;

										return function(e) {
											if (TWT.MetaCol.dirty) {
												TWT.CollectionsHandler
														.refresh();
											}
											var strD = newfunction.bind(this)
													(e);

											var divMain = '';
											if (TWT.MetaCol.shouldBuy($
													.trim(e.name))) {

												divMain = '<img  class="TWTSuccess" style="'
														+ TWT.LANG.collection.patchsell.style
														+ '" title="'
														+ TWT.LANG.collection.patchsell.title
														+ " "
														+ TWT.MetaCol
																.getBuyItems(e.name)
														+ '"'
														+ ' src="'
														+ TWT.images.cup
														+ '" />';
											}
											;

											return divMain + strD;

										};

									}();
								} catch (e) {

									console.log(e, 'Erreur inject market');
									throw (e);

								}
							},
							injectFilterMarket : function() {

								MarketWindow.Buy.updateCategory = function(
										category, data) {
									// searchbox
									var newfunction = MarketWindow.Buy.updateCategory;

									return function(category, data) {
										try {
											newfunction.bind(this)(category,
													data);

											if ($(
													'#buyFilterIsCollect.tw2gui_checkbox_checked',
													MarketWindow.DOM).length > 0) {

												$(
														'p.accordion_contentRow:not(:has(.TWTSuccess))',
														MarketWindow.DOM).css(
														'display', 'none');
											}

										} catch (e) {
											console.log(e,
													'Erreur update category');
											newfunction.bind(this)(category,
													data);
										}

									};
								}();
							},
							injectBagUpdate : function() {
								try {
									Bag.updateChanges = function(changes, from) {
										var newfunction = Bag.updateChanges;

										return function(changes, from) {

											newfunction.bind(this)(changes,
													from);

											EventHandler
													.signal('inventory_dun_changed');
										};

									}();
								} catch (e) {
									console.log(e,
											'Injection Bag updater error');
								}
							},
							injectItemTrader : function() {

								tw2widget["ItemTraderItem"].prototype.getMainDiv = function() {
									var newfunction = tw2widget["ItemTraderItem"].prototype.getMainDiv;

									return function() {
										if (TWT.MetaCol.dirty) {
											TWT.CollectionsHandler.refresh();
										}
										var name = $.trim(this.obj.name);
										this.divMain = newfunction.bind(this)();

										this.divMain.find(".TWTSuccess")
												.remove();

										if (TWT.MetaCol.shouldBuy(name)) {

											this.divMain
													.append('<img  class="TWTSuccess"'
															+ 'style="'
															+ TWT.LANG.collection.patchsell.styleT
															+ '" title="'
															+ TWT.LANG.collection.patchsell.title
															+ TWT.MetaCol
																	.getBuyItems(name)
															+ '"'
															+ ' src="'
															+ TWT.images.cup
															+ '" />');

										}

										return this.divMain;
									};
								}();

							},
							injectTrader : function() {
								tw2widget["TraderItem"].prototype.getMainDiv = function() {
									var newfunction = tw2widget["TraderItem"].prototype.getMainDiv;
									return function() {
										if (TWT.MetaCol.dirty) {
											TWT.CollectionsHandler.refresh();
										}
										var name = $.trim(this.obj.name);
										this.divMain = newfunction.bind(this)();
										this.divMain.find(".TWTSuccess")
												.remove();
										if (TWT.MetaCol.shouldBuy(name)) {

											this.divMain
													.append('<img  class="TWTSuccess"'
															+ 'style="'
															+ TWT.LANG.collection.patchsell.styleT
															+ '" title="'
															+ TWT.LANG.collection.patchsell.title
															+ TWT.MetaCol
																	.getBuyItems(name)
															+ '"'
															+ ' src="'
															+ TWT.images.cup
															+ '" />');

										}
										return this.divMain;
									};
								}();
							}
						}
					},
					CollectionsHandler : {

						interval : 0,
						erreur : false,
						ready : false,
						saveFunction : {},
						attachFilter : function() {
							// this.detachFilter();

							TWT.CollectionsHandler.init();

						},

						callRefresh : function(e) {

							TWT.MetaCol.dirty = true;
							window.setTimeout(function() {
								TWT.CollectionsHandler.refresh();
							}, 500);
						},
						hasOneChecked : function() {
							var boolC = TWT.Settings
									.isChecked('collection.filterMarket')
									|| TWT.Settings
											.isChecked('collection.patchtrader')
									|| TWT.Settings
											.isChecked('collection.patchsell')
									|| TWT.Settings
											.isChecked('collection.patchmarket')
									|| TWT.Settings
											.isChecked('collection.showmiss')
									|| TWT.Settings
											.isChecked('collection.listNeeded');
							return boolC;
						},
						initListener : function() {

							try {

								EventHandler
										.listen(
												'collection.filterMarket',
												function() {

													if (TWT.Settings
															.isChecked('collection.filterMarket')) {
														if (!TWT.MetaCol.ready)
															TWT.MetaCol.init();

														TWT.Injecteur
																.divsniffer(
																		'marketplace-buy',
																		TWT.CollectionsHandler.addCheckBoxMarket);

														TWT.Injecteur
																.inject('collection.filterMarket');

													} else {
														MarketWindow.Buy.updateCategory = TWT.Injecteur
																.restore('collection.filterMarket');
														TWT.Injecteur
																.divsnifferoff('marketplace-buy');

													}
												});

								EventHandler
										.listen(
												'collection.bagupdate',
												function() {

													if (TWT.CollectionsHandler
															.hasOneChecked()) {

														TWT.Injecteur
																.init(
																		'collection.patchtbagupdate',
																		'Bag.updateChanges',
																		TWT.Injecteur.injectedMethods.injectBagUpdate);

														TWT.Injecteur
																.inject('collection.patchtbagupdate');

														EventHandler
																.listen(
																		'inventory_dun_changed',
																		TWT.CollectionsHandler.callRefresh);

													} else {
														Bag.updateChanges = TWT.Injecteur
																.restore('collection.patchtbagupdate');

														EventHandler
																.unlisten(
																		'inventory_dun_changed',
																		TWT.CollectionsHandler.callRefresh);

													}
												});

								EventHandler
										.listen(
												'collection.patchtrader',
												function() {

													if (TWT.Settings
															.isChecked('collection.patchtrader')) {
														if (!TWT.MetaCol.ready)
															TWT.MetaCol.init();

														TWT.Injecteur
																.inject('collection.patchitemtrader');

														TWT.Injecteur
																.inject('collection.patchtrader');

													} else {

														TWT.Injecteur
																.restore('collection.patchitemtrader');
														TWT.Injecteur
																.restore('collection.patchtrader');

													}
												});
								EventHandler
										.listen(
												'collection.patchsell',
												function() {

													if (TWT.Settings
															.isChecked('collection.patchsell')) {

														if (!TWT.MetaCol.ready)
															TWT.MetaCol.init();

														document.styleSheets[0]
																.deleteRule(999);

														TWT.Injecteur
																.inject('collection.patchsell');

													} else {

														TWT.Injecteur
																.restore('collection.patchsell');

														$('.TWTSuccessSell')
																.css('display',
																		'none');

														document.styleSheets[0]
																.insertRule(
																		".TWTSuccessSell { display:none; }",
																		999);
													}
												});
								EventHandler
										.listen(
												'collection.patchmarket',
												function() {
													if (TWT.Settings
															.isChecked('collection.patchmarket')) {
														if (!TWT.MetaCol.ready)
															TWT.MetaCol.init();

														TWT.Injecteur
																.inject('collection.patchmarket');

													} else {

														TWT.Injecteur
																.restore('collection.patchmarket');

													}
												});
							} catch (e) {
								console.log(e, 'Erreur listener');
								throw e;
							}

						},
						addCheckBoxMarket : function(div) {

							if ($('#buyFilterIsCollect').length == 0) {

								var insertedCB = new west.gui.Checkbox(
										'<img src="'
												+ TWT.images.cup
												+ '" />'
												+ TWT.LANG.collection.collectionFilterLabel,
										false,
										function() {
											if (this.isSelected()) {
												$(
														'p.accordion_contentRow:not(:has(.TWTSuccess))',
														MarketWindow.DOM).css(
														'display', 'none');
											} else {
												$(
														'p.accordion_contentRow:not(:has(.TWTSuccess))',
														MarketWindow.DOM).css(
														'display', '');
											}
										});
								insertedCB.setSelected(false);
								insertedCB.setId('buyFilterIsCollect');
								insertedCB
										.setTooltip(TWT.LANG.collection.collectionFilterTip);

								$('.searchbox').css('margin-top', '-5px');
								$('.searchbox').css('margin-bottom', '10px');
								$('.searchbox', div).append(
										insertedCB.getMainDiv());
							}
						},

						init : function() {

							TWT.Injecteur.init('collection.patchmarket',
									'MarketWindow.getClearName',
									TWT.Injecteur.injectedMethods.injectMarket);
							TWT.Injecteur
									.init(
											'collection.filterMarket',
											'MarketWindow.Buy.updateCategory',
											TWT.Injecteur.injectedMethods.injectFilterMarket);
							TWT.Injecteur
									.init(
											'collection.patchsell',
											'tw2widget["InventoryItem"].prototype.getMainDiv',
											TWT.Injecteur.injectedMethods.injectSell);
							TWT.Injecteur
									.init(
											'collection.patchtbagupdate',
											'Bag.updateChanges',
											TWT.Injecteur.injectedMethods.injectBagUpdate);

							TWT.Injecteur.inject('collection.patchtbagupdate');

							TWT.Injecteur
									.init(
											'collection.patchitemtrader',
											'tw2widget["ItemTraderItem"].prototype.getMainDiv',
											TWT.Injecteur.injectedMethods.injectItemTrader);

							TWT.Injecteur
									.init(
											'collection.patchtrader',
											'tw2widget["TraderItem"].prototype.getMainDiv',
											TWT.Injecteur.injectedMethods.injectTrader);

						},
						refresh : function() {

							var items = Bag.items;
							$
									.each(
											items,

											function(ind, val) {

												$
														.each(
																val,

																function(ind2,
																		val2) {

																	if (val2) {
																		var name = $
																				.trim(val2.obj.name);
																		var item = TWT.MetaCol.inProgress[name];

																		if (isDefined(item)) {

																			item.shouldBuy = false;

																			var manquants = TWT.MetaCol.group[item.group];

																			TWT.MetaCol.group[item.group] = TWT.MetaCol
																					.remove(
																							manquants,
																							name);

																			if (TWT.MetaCol.group[item.group].length == 0) {

																				TWT.MetaCol.group[item.group][0] = true;

																			}

																		}
																	}
																});
											});
							TWT.MetaCol.dirty = false;
						},
						inject : function() {

							try {

								TWT.MetaCol.init();

								if (TWT.MetaCol.ready) {

									if (TWT.Settings
											.isChecked('collection.patchtrader')) {

										TWT.Injecteur
												.inject('collection.patchtrader');

										TWT.Injecteur
												.inject('collection.patchitemtrader');
									}

									if (TWT.Settings
											.isChecked('collection.patchsell')) {
										TWT.Injecteur
												.inject('collection.patchsell');
									}
									if (TWT.Settings
											.isChecked('collection.patchmarket')) {
										TWT.Injecteur
												.inject('collection.patchmarket');
									}
									if (TWT.Settings
											.isChecked('collection.filterMarket')) {
										TWT.Injecteur
												.divsniffer(
														'marketplace-buy',
														TWT.CollectionsHandler.addCheckBoxMarket);
										TWT.Injecteur
												.inject('collection.filterMarket');
									}

								}

								return true;

							} catch (e) {
								console.log(e,
										"Erreur Injection des meacute;thodes ");
								this.erreur = e;

							}

						}
					},
					Logout : {
						initListener : function() {
							EventHandler
									.listen(
											'miscellaneous.logout',
											function() {

												$('#TWTOOL_Logout').remove();
												if (TWT.Settings
														.isChecked('miscellaneous.logout')) {
													TWT.Logout.create();
												}
												;
											});
						},
						create : function() {

							var a = $('<div></div>').attr({
								'class' : 'menulink',
								'title' : TWT.LANG.Logout.title
							}).css(
									{
										'background-image' : 'url('
												+ TWT.images.logout + ')'
									}).mouseenter(
									function() {
										$(this).css("background-position",
												"-25px 0px");
									}).mouseleave(function() {
								$(this).css("background-position", "0px 0px");
							}).click(function() {
								TWT.Logout.logout();
							});
							var b = $('<div></div>').attr({
								'class' : 'menucontainer_bottom'
							});
							$('<div></div>').attr({
								'class' : 'ui_menucontainer',
								'id' : 'TWTOOL_Logout'
							}).append(a).append(b).appendTo('#ui_menubar');
						},
						logout : function() {

							$(window.location).attr(
									'href',
									'game.php?window=logout&action=logout&h='
											+ Player.h);

						}
					},
					BankFees : {
						attach : function() {
							TWT.Injecteur.divsniffer('wood-footer',
									TWT.BankFees.init);
						},
						detach : function() {
							TWT.Injecteur.divsnifferoff('wood-footer');

						},
						initListener : function() {

							EventHandler
									.listen(
											'miscellaneous.showFees',
											function() {

												if (TWT.Settings
														.isChecked('miscellaneous.showFees')) {
													TWT.BankFees.attach();
												} else {
													TWT.BankFees.detach();
												}
											});
						},
						calcFrais : function(montant, taux) {
							tauxPourc = Number(taux.replace(/% ?/g, ""));
							var fraisArrondi = Math
									.ceil((montant * tauxPourc) / 100);
							var txtFrais = TWT.LANG.fees.tipText.replace('%1',
									tauxPourc).replace('%2', fraisArrondi);//

							return txtFrais;

						},
						init : function(e) {

							var depotLink = $('.wood-footer:first .deposit');

							if (depotLink && (!depotLink.attr('id'))) {

								var frais = $(
										'div.town_data_value div.bank-fee')
										.text();
								var numFrais = 1 + 0.01 * Number(frais.replace(
										/% ?/g, ""));

								depotLink.attr('id', 'depo_changed');
								var balance = $('.wood-footer:first #tb_balance_input_'
										+ BankWindow.townid);
								var that = this;
								balance.mouseover(function() {

									var fraisArrondi = Math
											.ceil((balance.val() - balance
													.val()
													/ numFrais));
									var txtFrais = TWT.BankFees.calcFrais(
											balance.val(), frais); //

									balance.attr('title', txtFrais);
								});
								var amount = $('#amount');

								if (amount) {

									amount.mouseover(function() {

										var txtFrais = TWT.BankFees.calcFrais(
												amount.val(),
												BankWindow.Transfer.fee
														.toString());

										amount.attr('title', txtFrais);
									});
								}
							}

						}
					},
					AllReportsDelete : {
						addStyle : function() {
							var css = ".window_AllReportsDelete .window_inside { width:540px; position:absolute; left:5px; top:2px; }"
									+ ".window_AllReportsDelete .cell_what { width:170px; } "
									+ ".window_AllReportsDelete .tbody .cell_what { padding-left:6px; } .window_AllReportsDelete .tbody .row { left:0px; }"
									+ ".window_AllReportsDelete .cell_progress { text-align:center; width:330px; } "
									+ "div#ui_menubar { z-index: 100000;}";

							$(
									'<style id="TWTOOL_CSS" type="text/css" >'
											+ css + '</style>')
									.appendTo('head');
						},
						saveFunction : MessagesWindow.Report._initContent,
						attachedFunction : '',
						attach : function() {

							MessagesWindow.Report._initContent = function(data) {
								var newfunction = MessagesWindow.Report._initContent;

								return function(data) {

									newfunction.bind(this)(data);
									$('.actionprompt',
											MessagesWindow.Report.DOM)
											.append(
													"<a href='javascript:TWT.AllReportsDelete.init();'>"
															+ TWT.LANG.AllReportsDelete.button
															+ "</a>");

								};

							}();

							TWT.AllReportsDelete.attachedFunction = MessagesWindow.Report._initContent
									.toString();

							EventHandler.listen('report.dom.created', function(
									data) {

								TWT.AllReportsDelete.addButton();

							});

						},
						detach : function() {
							MessagesWindow.Report._initContent = TWT.AllReportsDelete.saveFunction;
							EventHandler.unlisten('report.dom.created',
									function(data) {

										TWT.AllReportsDelete.addButton();

									});

						},
						initListener : function() {

							EventHandler
									.listen(
											'miscellaneous.deleteAllReports',
											function() {

												if (TWT.Settings
														.isChecked('miscellaneous.deleteAllReports')) {
													TWT.AllReportsDelete
															.attach();

												} else {

													TWT.AllReportsDelete
															.detach();

												}
											});

						},

						init : function() {
							TWT.AllReportsDelete.window = wman.open(
									'window_AllReportsDelete',
									TWT.LANG.AllReportsDelete.title).setSize(
									600, 300);
							(table_window = new west.gui.Table(true))
									.appendTo(
											$(
													'<div class="window_inside"></div>')
													.appendTo(
															TWT.AllReportsDelete.window
																	.getContentPane()))
									.addColumns(
											[ 'cell_what', 'cell_progress' ])
									.appendToCell('head', 'cell_what',
											TWT.LANG.AllReportsDelete.work)
									.appendToCell('head', 'cell_progress',
											TWT.LANG.AllReportsDelete.progress)
									.appendRow()
									.appendToCell(
											-1,
											'cell_what',
											TWT.LANG.AllReportsDelete.userConfirm)
									.appendToCell(
											-1,
											'cell_progress',
											'<div style="text-align:center;font-weight:800;color:#8A0000;text-shadow:1px 0 0 white;">Wait</div>')
									.appendRow()
									.appendToCell(-1, 'cell_what',
											TWT.LANG.AllReportsDelete.loadPage)
									.appendToCell(
											-1,
											'cell_progress',
											((this.progress_page = new west.gui.Progressbar(
													0,
													MessagesWindow.Report.pageCount))
													.getMainDiv()))
									.appendRow()
									.appendToCell(
											-1,
											'cell_what',
											TWT.LANG.AllReportsDelete.deleteReports)
									.appendToCell(-1, 'cell_progress', '')
									.appendRow()
									.appendToCell(
											-1,
											'cell_what',
											TWT.LANG.AllReportsDelete.status.title)
									.appendToCell(
											-1,
											'cell_progress',
											'<div style="text-align:center;font-weight:800;color:#8A0000;text-shadow:1px 0 0 white;">'
													+ TWT.LANG.AllReportsDelete.status.wait
													+ '</div>');
							new west.gui.Dialog(
									TWT.LANG.AllReportsDelete.userConfirm,
									TWT.LANG.AllReportsDelete.confirmText, "ok")
									.setModal(true, false, {
										bg : "../images/curtain_bg.png",
										opacity : 0.4
									})
									.addButton(
											TWT.LANG.AllReportsDelete.deleteYes,

											function() {
												$(
														'.window_AllReportsDelete .row_0 .cell_progress')
														.html(
																'<div style="text-align:center;font-weight:800;color:#070;text-shadow:1px 0 0 white;">'
																		+ TWT.LANG.AllReportsDelete.status.successful
																		+ '</div>');
												TWT.AllReportsDelete.status_close = true;
												TWT.AllReportsDelete
														.delete_all();
											})
									.addButton(
											TWT.LANG.AllReportsDelete.deleteNo,

											function() {
												$(
														'.window_AllReportsDelete .row_0 .cell_progress')
														.html(
																'<div style="text-align:center;font-weight:800;color:#8A0000;text-shadow:1px 0 0 white;">'
																		+ TWT.LANG.AllReportsDelete.status.fail
																		+ '</div>');
												TWT.AllReportsDelete.status_close = false;
											}).show();
						},
						reports_id : [],
						delete_all : function() {
							var that = this;
							for ( var i = 0; i < MessagesWindow.Report.pageCount; i++) {
								$
										.ajax({
											url : 'game.php?window=reports&action=get_reports&h='
													+ Player.h,
											type : 'POST',
											data : {
												'folder' : 'all',
												'page' : that.progress_page
														.getValue() + 1
											},
											dataType : 'json',
											async : false,
											success : function(data_return) {
												for ( var j = 0; j < data_return['reports'].length; j++) {
													that.reports_id
															.push(data_return['reports'][j]['report_id']);
												}
												that.progress_page
														.setValue(that.progress_page
																.getValue() + 1);
											}
										});
							}
							$('.window_AllReportsDelete .row_2 .cell_progress')
									.append(
											((this.progress_reports = new west.gui.Progressbar(
													0, 1)).getMainDiv()));
							var that = this;
							$
									.ajax({
										url : 'game.php?window=reports&action=delete_reports&h='
												+ Player.h,
										type : 'POST',
										data : {
											'deleted' : 'false',
											'reports' : TWT.AllReportsDelete.reports_id
													.join(", ")
										},
										dataType : 'json',
										async : false,
										success : function(data_return) {
											that.progress_reports.setValue(1);
											$(
													'.window_AllReportsDelete .row_3 .cell_progress')
													.html(
															'<div style="text-align:center;font-weight:800;color:'
																	+ ((!data_return['error']) ? '#070'
																			: '#8A0000')
																	+ ';text-shadow:1px 0 0 white;">'
																	+ ((!data_return['error']) ? TWT.LANG.AllReportsDelete.status.successful
																			: TWT.LANG.AllReportsDelete.status.error)
																	+ '</div>');
											if (data_return['error'])
												that.status_close = false;
										}
									});
							MessagesWindow.showTab('report');
							if (this.status_close)
								wman.onWindowClose('WINDOW_CLOSE',
										TWT.AllReportsDelete.window,
										'window_AllReportsDelete');
						}
					},
					api : function() {

						var TWApi = TheWestApi.register('The_West_Tool_reborn',
								'The West Tools Reborn',
								TWT.info.min_gameversion,
								TWT.info.max_gameversion, 'Dun', '');

						TWApi.setGui(TWT.LANG.description);

					}
				};
				ScriptUpdater = {
					id : null, // : TWT.info.idscript,
					version : null, // : TWT.info.version,
					scriptId : null,
					scriptCurrentVersion : null,
					scriptCallbackFunction : null,
					scriptUseNotice : null,
					scriptForceNotice : null,
					scriptMetaTags : null,
					scriptStorage : null,
					icons : {
						install : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
						close : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
						uso : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D"
					},

					$ : function(id) {
						return document.getElementById(id);
					},
					initialize : function(scriptId, scriptCurrentVersion,
							scriptCallbackFunction, scriptUseNotice,
							scriptForceNotice) {
						ScriptUpdater.scriptId = scriptId;
						ScriptUpdater.scriptCurrentVersion = scriptCurrentVersion;
						ScriptUpdater.scriptCallbackFunction = typeof (scriptCallbackFunction) == "function" ? scriptCallbackFunction
								: false;
						ScriptUpdater.scriptUseNotice = scriptUseNotice;
						ScriptUpdater.scriptForceNotice = scriptForceNotice;
						if (ScriptUpdater.scriptStorage == null) {
							ScriptUpdater.scriptStorage = new Storage("local",
									"ScriptUpdater." + scriptId);
						}
					},
					setValue : function(key, value) {
						if (ScriptUpdater.scriptStorage != null) {
							ScriptUpdater.scriptStorage.setItem(key, value);
						}
					},
					getValue : function(key, defaultValue) {
						if (ScriptUpdater.scriptStorage != null) {
							return ScriptUpdater.scriptStorage.getItem(key,
									defaultValue);
						} else {
							return defaultValue;
						}
					},
					getOffers : function() {
						var offers = ScriptUpdater.getValue("offers", "");
						return (typeof (offers) == "undefined"
								|| typeof (offers.length) == "undefined" || typeof (offers.push) == "undefined") ? new Array()
								: offers;
					},
					addOffer : function(version) {
						var offers = ScriptUpdater.getOffers();
						offers.push(version);
						ScriptUpdater.setValue("offers", offers);
					},
					alreadyOffered : function(version) {
						var offers = ScriptUpdater.getOffers();
						for ( var indDun = 0; indDun < offers.length; indDun++) {
							if (version.toString() == offers[indDun].toString())
								return true;
						}
						return false;
					},
					addStyle : function(css) {
						var head = document.getElementsByTagName("head")[0];
						if (!head)
							return;
						var style = document.createElement("style");
						style.type = "text/css";
						style.textContent = css;
						head.appendChild(style);
					},
					parseMetaTags : function(metaTags) {
						function find_meta(element, index, array) {
							return (element.indexOf("// @") != -1);
						}

						var headers = {};
						var name, prefix, header, key, value;
						var lines = metaTags.split(/\n/).filter(find_meta);

						for ( var indDun in lines) {

							if (typeof (lines[indDun]) == "string") {
								name = lines[indDun].match(/\/\/ @(\S+)\s*.*/)[1];
								value = lines[indDun].match(/\/\/ @\S+\s*(.*)/)[1];
								key = name.split(/:/).reverse()[0];
								prefix = name.split(/:/).reverse()[1];

								if (prefix) {
									if (!headers[prefix]) {
										headers[prefix] = new Object;
									}
									header = headers[prefix];
								} else {
									header = headers;
								}

								if (header[key]
										&& !(header[key] instanceof Array)) {
									header[key] = new Array(header[key]);
								}

								if (header[key] instanceof Array) {
									header[key].push(value);
								} else {
									header[key] = value;
								}
							}
						}
						return headers;
					},
					checkRemoteScript : function() {

						if (ScriptUpdater.scriptCurrentVersion
								&& !ScriptUpdater
										.alreadyOffered(ScriptUpdater.scriptCurrentVersion)) {
							ScriptUpdater
									.addOffer(ScriptUpdater.scriptCurrentVersion);
						}

						var date = new Date();
						ScriptUpdater.setValue("lastCheck", parseInt(date
								.getTime()));

						var su_script = document.createElement('iframe');
						su_script.setAttribute('id', 'updater_'
								+ ScriptUpdater.scriptId);
						su_script.setAttribute('style', 'display:none;');

						// su_script.setAttribute('style','display:inline;position:absolute;
						// width:500px;height:600px;');

						su_script.src = "http://userscripts.org/scripts/source/"
								+ ScriptUpdater.scriptId + ".meta.js";

						document.body.appendChild(su_script);

						window.addEventListener('message', onMessage, true);

						function onMessage(e) {
							if (e.origin != "http://userscripts.org")
								return;
							myversion = unescape(e.data);
							if (myversion.substring(0, myversion.indexOf("/")) == ScriptUpdater.scriptId)
								gonextstep();
						}

						function gonextstep() {
							ScriptUpdater.scriptMetaTags = ScriptUpdater
									.parseMetaTags(myversion);
							ScriptUpdater.setValue("versionAvailable",
									ScriptUpdater.scriptMetaTags.version);
							if (ScriptUpdater.scriptForceNotice
									|| (!ScriptUpdater
											.alreadyOffered(ScriptUpdater.scriptMetaTags.version) && ScriptUpdater.scriptUseNotice)) {
								if (!ScriptUpdater
										.alreadyOffered(ScriptUpdater.scriptMetaTags.version)) {
									ScriptUpdater
											.addOffer(ScriptUpdater.scriptMetaTags.version);
								}
								ScriptUpdater.showNotice();
							}
							if (typeof (ScriptUpdater.scriptCallbackFunction) == "function") {
								ScriptUpdater
										.scriptCallbackFunction(ScriptUpdater.scriptMetaTags.version);
							}
						}

					},
					getLastCheck : function() {
						return ScriptUpdater.getValue("lastCheck", 0);
					},
					getInterval : function() {
						var interval = ScriptUpdater.getValue("interval",
								86400000);
						return (typeof (interval) == "undefined" || !interval
								.toString().match(/^\d+$/)) ? 86400000
								: parseInt(interval.toString());
					},
					setInterval : function(interval) {
						ScriptUpdater.setValue("interval", parseInt(interval));
					},
					check : function(scriptId, scriptVersion,
							scriptCallbackFunction) {
						ScriptUpdater.initialize(scriptId, scriptVersion,
								scriptCallbackFunction, true, false);
						var date = new Date();
						if ((date.getTime() - ScriptUpdater.getLastCheck()) > ScriptUpdater
								.getInterval()) {
							ScriptUpdater.checkRemoteScript();
						}
					},
					forceCheck : function(scriptId, scriptVersion,
							scriptCallbackFunction) {
						ScriptUpdater.initialize(scriptId, scriptVersion,
								scriptCallbackFunction, true, false);
						ScriptUpdater.checkRemoteScript();
					},
					forceNotice : function(scriptId, scriptVersion,
							scriptCallbackFunction) {
						ScriptUpdater.initialize(scriptId, scriptVersion,
								scriptCallbackFunction, true, true);
						ScriptUpdater.checkRemoteScript();
					},
					showNotice : function() {
						if (ScriptUpdater.scriptMetaTags.name
								&& ScriptUpdater.scriptMetaTags.version) {
							ScriptUpdater
									.addStyle([
											[
													"#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Mask { position:fixed; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; }" ]
													.join(""),
											[
													"#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body * { border:none; font-size:12px; color:#333; font-weight:normal; margin:0; padding:0; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; }" ]
													.join(""),
											[
													"#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body { width:500px; margin:auto; top:125px; position:fixed; left:35%; text-align:left; background:#DED7C5; border:1px outset #333; padding:0; font-family:Arial; font-size:14px; -moz-border-radius:5px; cursor:default; z-index:9010; color:#333; padding-bottom:1em ; }" ]
													.join(""),
											[
													"#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body a { margin:0 .5em; text-decoration:underline; color:#000099; font-weight:bold; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body strong { font-weight:bold; }" ]
													.join(""),
											[
													"#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body h1 { font-size:13px; font-weight:bold; padding:.5em; border-bottom:1px solid #333; background-color:#999; margin-bottom:.75em; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body h2 { font-weight:bold; margin:.5em 1em; }" ]
													.join(""),
											[
													"#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body h1 a { font-size:13px; font-weight:bold; color:#fff; text-decoration:none; cursor:help; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body h1 a:hover { text-decoration:underline; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body table { width:auto; margin:0 1em; }" ]
													.join(""),
											[
													"#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body table tr th { padding-left:2em; text-align:right; padding-right:.5em; line-height:2em; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body table tr td { line-height:2em; font-weight:bold; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body li { list-style-type:circle; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Body p { font-size:12px; font-weight:normal; margin:1em; }" ]
													.join(""),
											[
													"#ScriptUpdater",
													ScriptUpdater.scriptId,
													"History { margin:0 1em 1em 1em; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em; width:448px; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"History ul { margin-left:2em; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Close { float:right; cursor:pointer; height:14px; opacity:.5; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Close:hover { opacity:.9; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Footer { margin:.75em 1em; }" ]
													.join(""),
											[
													"#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Footer input { border:1px outset #666; padding:3px 5px 5px 20px; background:no-repeat 4px center #eee; -moz-border-radius:3px; cursor:pointer; width:70px; float:right; margin-left:.5em; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Footer input:hover { background-color:#f9f9f9; }" ]
													.join(""),
											[ "#ScriptUpdater",
													ScriptUpdater.scriptId,
													"Footer select { border:1px inset #666; }" ]
													.join(""), "" ].join("\n"));

							var html = new Array();
							html
									.push([
											"<h2><a href=\"http://userscripts.org/scripts/show/",
											ScriptUpdater.scriptId,
											"\" target=\"_blank\" title=\"About the Userscripts.org Script Updater\"><img src=\"",
											ScriptUpdater.icons.uso,
											"\" align=\"absmiddle\" style=\"margin-top:-2px;\"/></a><img id=\"ScriptUpdater",
											ScriptUpdater.scriptId,
											"Close\" src=\"",
											ScriptUpdater.icons.close,
											"\" title=\"Close\"/>Userscripts.org Updater</h2>" ]
											.join(""));

							if (!ScriptUpdater.scriptForceNotice) {
								html
										.push([
												"<p>There is a new version of <strong><a href=\"http://userscripts.org/scripts/show/",
												ScriptUpdater.scriptId,
												"\" target=\"_blank\" title=\"Go to script page\">",
												ScriptUpdater.scriptMetaTags.name,
												"</a></strong> available for installation.</p>" ]
												.join(""));
							} else {
								html
										.push([
												"<p><strong><a href=\"http://userscripts.org/scripts/show/",
												ScriptUpdater.scriptId,
												"\" target=\"_blank\" title=\"Go to script page\" style=\"margin:0; padding:0;\">",
												ScriptUpdater.scriptMetaTags.name,
												"</a></strong></p>" ].join(""));
							}

							if (ScriptUpdater.scriptCurrentVersion) {
								html
										.push([
												"<p>You currently have version <strong>",
												ScriptUpdater.scriptCurrentVersion,
												"</strong> installed. The latest version is <strong>",
												ScriptUpdater.scriptMetaTags.version,
												"</strong></p>" ].join(""));
							}

							if (ScriptUpdater.scriptMetaTags.history) {
								html
										.push([
												"<h2>Version History:</h2><div id=\"ScriptUpdater",
												ScriptUpdater.scriptId,
												"History\">" ].join(""));

								var history = new Array();
								var version, desc;
								if (typeof (ScriptUpdater.scriptMetaTags.history) != "string") {
									for ( var indDun = 0; indDun < ScriptUpdater.scriptMetaTags.history.length; indDun++) {
										version = ScriptUpdater.scriptMetaTags.history[indDun]
												.match(/(\S+)\s+.*$/)[1];
										change = ScriptUpdater.scriptMetaTags.history[indDun]
												.match(/\S+\s+(.*)$/)[1];

										history[version] = typeof (history[version]) == "undefined" ? new Array()
												: history[version];
										history[version].push(change);
									}
								} else {
									version = ScriptUpdater.scriptMetaTags.history
											.match(/(\S+)\s+.*$/)[1];
									change = ScriptUpdater.scriptMetaTags.history
											.match(/\S+\s+(.*)$/)[1];
									history[version] = typeof (history[version]) == "undefined" ? new Array()
											: history[version];
									history[version].push(change);
								}

								for ( var v in history) {

									if (typeof (v) == "string"
											&& v.match(/v?[0-9.]+[a-z]?/)
											|| typeof (v) == "number") {
										html
												.push([
														"<div style=\"margin-top:.75em;\"><strong>v",
														v,
														"</strong></div><ul>" ]
														.join(""));
										for ( var indDun = 0; indDun < history[v].length; indDun++) {
											html
													.push([ "<li>",
															history[v][indDun],
															"</li>" ].join(""));
										}
										html.push("</ul>");
									}
								}

								html.push("</div>");
							}

							html
									.push([
											"<div id=\"ScriptUpdater"
													+ ScriptUpdater.scriptId
													+ "Footer\">",
											"<input type=\"button\" id=\"ScriptUpdater",
											ScriptUpdater.scriptId,
											"CloseButton\" value=\"Close\" style=\"background-image:url(",
											ScriptUpdater.icons.close,
											")\"/><input type=\"button\" id=\"ScriptUpdater"
													+ ScriptUpdater.scriptId
													+ "BodyInstall\" value=\"Install\" style=\"background-image:url(",
											ScriptUpdater.icons.install,
											");\"/>",
											"Check this script for updates " ]
											.join(""));
							html
									.push([
											"<select id=\"ScriptUpdater",
											ScriptUpdater.scriptId,
											"Interval\">",
											"<option value=\"3600000\">every hour</option>",
											"<option value=\"21600000\">every 6 hours</option>",
											"<option value=\"86400000\">every day</option>",
											"<option value=\"604800000\">every week</option>",
											"<option value=\"0\">never</option>",
											"</select>" ].join(""));
							html.push("</div>");

							var noticeBackground = document
									.createElement("div");
							noticeBackground.id = [ "ScriptUpdater",
									ScriptUpdater.scriptId, "Mask" ].join("");
							document.body.appendChild(noticeBackground);

							var noticeWrapper = document.createElement("div");
							noticeWrapper
									.setAttribute(
											"style",
											"position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;");
							noticeWrapper.id = [ "ScriptUpdater",
									ScriptUpdater.scriptId, "BodyWrapper" ]
									.join("");

							var notice = document.createElement("div");
							notice.id = [ "ScriptUpdater",
									ScriptUpdater.scriptId, "Body" ].join("");
							notice.innerHTML = html.join("");

							noticeWrapper.appendChild(notice);

							document.body.appendChild(noticeWrapper);

							ScriptUpdater.$(
									[ "ScriptUpdater", ScriptUpdater.scriptId,
											"Close" ].join(""))
									.addEventListener("click",
											ScriptUpdater.closeNotice, true);
							ScriptUpdater.$(
									[ "ScriptUpdater", ScriptUpdater.scriptId,
											"CloseButton" ].join(""))
									.addEventListener("click",
											ScriptUpdater.closeNotice, true);
							ScriptUpdater
									.$(
											[ "ScriptUpdater",
													ScriptUpdater.scriptId,
													"BodyInstall" ].join(""))
									.addEventListener(
											"click",

											function() {
												setTimeout(
														ScriptUpdater.closeNotice,
														500);
												document.location = [
														"http://userscripts.org/scripts/source/",
														ScriptUpdater.scriptId,
														".user.js" ].join("");
											}, true);
							var selector = ScriptUpdater.$([ "ScriptUpdater",
									ScriptUpdater.scriptId, "Interval" ]
									.join(""));
							for ( var indDun = 0; indDun < selector.options.length; indDun++) {
								if (selector.options[indDun].value.toString() == ScriptUpdater
										.getInterval().toString())
									selector.options[indDun].selected = true;
							}

							ScriptUpdater.setInterval(selector.value);
							selector.addEventListener("change", function() {
								ScriptUpdater.setInterval(selector.value);
							}, true);
							window.addEventListener("keyup",
									ScriptUpdater.keyUpHandler, true);
						}
					},
					closeNotice : function() {
						document.body.removeChild(ScriptUpdater.$([
								'ScriptUpdater', ScriptUpdater.scriptId,
								'BodyWrapper' ].join("")));
						document.body.removeChild(ScriptUpdater
								.$([ 'ScriptUpdater', ScriptUpdater.scriptId,
										'Mask' ].join("")));
						window.removeEventListener("keyup",
								ScriptUpdater.keyUpHandler, true);
					},
					keyUpHandler : function(event) {
						switch (event.keyCode) {
						case 27:
							ScriptUpdater.closeNotice();
							break;
						}
					}
				};
				/***************************************************************
				 * DOM Storage Wrapper Class
				 * 
				 * Public members: ctor({"session"|"local"}[, <namespace>])
				 * setItem(<key>, <value>) getItem(<key>, <default value>)
				 * removeItem(<key>) keys()
				 **************************************************************/
				function Storage(type, namespace) {
					var object = this;

					if (typeof (type) != "string")
						type = "session";

					switch (type) {
					case "local": {
						object.storage = localStorage;
					}
						break;

					case "session": {
						object.storage = sessionStorage;
					}
						break;

					default: {
						object.storage = sessionStorage;
					}
						break;
					}

					if (!namespace
							|| (typeof (namespace) != "string" && typeof (namespace) != "number"))
						namespace = "ScriptStorage";

					object.namespace = [ namespace, "." ].join("");

					object.setItem = function(key, value) {
						try {
							object.storage.setItem(escape([ object.namespace,
									key ].join("")), JSON.stringify(value));
						} catch (e) {
						}
					};
					object.getItem = function(key, defaultValue) {
						try {
							var value = object.storage.getItem(escape([
									object.namespace, key ].join("")));
							if (value)
								return eval(value);
							else
								return defaultValue;
						} catch (e) {
							return defaultValue;
						}
					};
					object.removeItem = function(key) {
						try {
							object.storage.removeItem(escape([
									object.namespace, key ].join("")));
						} catch (e) {
						}
					};
					object.keys = function() {
						var array = [];
						var indDun = 0;
						do {
							try {
								var key = unescape(object.storage.key(indDun++));
								if (key.indexOf(object.namespace) == 0
										&& object.storage.getItem(key))
									array.push(key
											.slice(object.namespace.length));
							} catch (e) {
								break;
							}
						} while (true);
						return array;
					};
				}
				;
				 
					TWT.init();
				 
			}
		});