// ==UserScript==
// @name            TW-Collections-IT Translation
// @description     English Translation - TW-Collections - see below 
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/178773*
// @version         1.0.5
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
	t.parentNode.removeChild(t);
})
		(function() {
			if (window.location.href.indexOf(".the-west.") > 0) {

				TWT_ADDLANG = {
					translator : 'tw81',
					idscript : '178773',
					version : '1.0.5',
					short_name : 'it',
					name : 'Italian',
					translation : {
						description : "<center><BR /><b>TW Collections</b><br><b>Italian Traduction - Tips and reporting missing items collections <br>list of collection needed items<BR> Bank fees on mouseover <br> Various shortcuts"
								+ "<br>All reports deletion<br> <Bank Fees <BR>Duplicates in Inventory<BR>etc ...</b>",
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
								collection : {
									title : 'Collezioni',
									options : {
										patchsell : 'Segnalazione di elementi mancanti alle collezioni nell\'inventario',
										patchtrader : 'Segnalazione di elementi necessari per le collezioni dal mercante',
										patchmarket : 'Segnalazione di elementi necessari per le collezioni nel mercato',
										showmiss : 'Filtrare nel mercato gli elementi mancanti',
										filterMarket : 'Filtro di mercato: mostrare solo gli elementi mancanti (Collezioni)'
									}
								},
								inventory : {
									title : 'Pulsanti nell\'inventario',
									doublons : 'Ulteriori pulsanti in inventario (duplicati, consumabili, ricette, set)',
									options : {
										doublons : 'Aggiungi pulsante per la ricerca dei duplicati',
										useables : 'Aggiungi pulsante per la ricerca dei consumabili',
										recipe : 'Aggiungi pulsante per la ricerca delle ricette',
										sets : 'Aggiungi pulsante per la ricerca dei set',
										sum : "Mostra la somma di vendita della ricerca basata sui prezzi mercantili"

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
								twdbadds : {
									title : 'Clothcalc Add-on',
									options : {
										filterBuyMarket : 'Filtro di mercato: mostrare solo gli elementi mancanti (twdb add)'
									}
								}
							},
							message : {
								title : 'Informazioni',
								message : 'Impostazioni cambiate con successo',
								reloadButton : 'Ricarica questa pagina',
								gameButton : 'Vai al gioco',
								indispo : 'Setting unavailable (Collections completed or script not available)'
							},
							update : {
								title : ' Aggiornare',
								upddaily : 'Ogni giorno',
								updweek : 'Ogni settimana',
								updnever : 'Mai',
								checknow : 'Aggiornare ora?'
							},
							saveButton : 'Salva'
						},
						ToolBox : {
							title : 'Funzioni',
							list : {
								openOptions : 'Impostazioni'
							}
						},
						Doublons : {
							tip : 'Mostra solo i duplicati',
							tipuse : 'Mostra solo i consumabili',
							tiprecipe : 'Mostra solo ricette',
							tipsets : 'Mostra solo i set di oggetti',
							sellGain : '$ dai mercanti'
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
						twdbadds : {
							buyFilterTip : 'Mostrare solo gli elementi mancanti',
							buyFilterLabel : 'Solo mancanti'
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
					// DO NOT CHANGE BELOW THIS LIGNE
					init : function() {
						var that = this;
						if (typeof window.TWT == 'undefined'
								|| window.TWT == null) {
							EventHandler.listen('twt.init', function() {
								TWT.addPatchLang(that);
								return EventHandler.ONE_TIME_EVENT; // Unique
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