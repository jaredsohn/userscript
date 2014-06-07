// ==UserScript==
// @name            TW-Collections-DE Translation
// @description     Deutsh Translation - TW-Collections - thanks Hanya
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/179298*
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
	t.parentNode.removeChild(t);
})
		(function() {
			if (window.location.href.indexOf(".the-west.") > 0) {

				TWT_ADDLANG = {
					translator : 'Hanya',
					idscript : '179298',
					version : '1.0.7',
					short_name : 'de',
					name : 'German',
					translation : {
						description : "<center><BR /><b>TW-Collections</b><br><b>Tips and reporting missing items collections <br>list of collection needed items<BR> Bank fees on mouseover <br> Various shortcuts"
								+ "<br>All reports deletion<br> Fees in bank <br> Additional buttons in inventory (duplicates,useables, recipes, sets)br>etc ...</b>",
						Options : {
							tab : {
								setting : 'Einstellungen'
							},
							checkbox_text : {
								box : {
									title : 'Funktionen / Menüs',
									options : {
										goHome : 'Zur eigenen Stadt gehen',
										goToDaily1 : 'Geisterstadt',
										goToDaily2 : 'Waupee´s Indianerdorf ',
										ownSaloon : 'Saloon öffnen',
										openMarket : 'Markt öffnen',
										mobileTrader : 'Fahrender Händler öffnen',
										forum : 'Forum öffnen',
										listNeeded : 'Fehlende Sammelitems'
									}
								},
								collection : {
									title : 'Sammlungen',
									options : {
										gereNewItems : 'Verwalten neuer Items - Sammelerfolg bereits erfolgreich',
										patchsell : 'Hinweis für fehlende Items im Inventar',
										patchtrader : 'Hinweis für fehlende Items beim fahrenden Händler',
										patchmarket : 'Hinweis für fehlende Items auf dem  Markt',
										showmiss : 'Liste für fehlende Items',
										filterMarket : 'Marktfilter : Zeige nur fehlende Items (Sammlungen)'

									}
								},
								inventory : {
									title : 'Buttons im Inventar',
									doublons : 'Zusätzliche Buttons im Inventar (Dublikate, Nutzbares, Rezepte, Sets)',
									options : {
										doublons : 'Hinzufügen-Button für Duplikate suchen',
										useables : 'Hinzufügen-Button für nutzbare Items suchen',
										recipe : 'Hinzufügen-Button für Rezepte suchen',
										sets : 'Hinzufügen-Button für Sets',
										sum : 'Zeige Verkaufssumme, basierend auf der Suche nach Marktpreisen'

									}
								},
								miscellaneous : {
									title : 'Sonstiges',
									options : {
										lang : 'Sprache',
										logout : 'Logout-Button hinzufügen',
										deleteAllReports : 'Alle aktiven Berichte löschen',
										showFees : 'Bankgebühren bei Mousover anzeigen',
										popupTWT : 'Menü der TW-Sammlungen bei Mouseover anzeigen'
									}
								},
								twdbadds : {
									title : 'Clothcalc Add-on',
									options : {
										filterBuyMarket : 'Marktfilter : Zeige nur markierte fehlende Items (twdb Add)',
										addNewToShop : 'Neue Produkte im Shop anzeigen'
									}
								}
							},
							message : {
								title : 'Information',
								message : 'Einstellungen wurden übernommen.',
								reloadButton : 'Seite neu laden',
								gameButton : 'Zurück zum Spiel',
								indispo : 'Einstellung nicht möglich (Sammlungen abgeschlossen oder Skript nicht verfügbar)',
								more : 'Mehr?',
								moreTip : 'Übersetzungs und Tipps-Seite öffnen'
							},
							update : {
								title : 'TW Collections Update',
								upddaily : 'Jeden Tag',
								updweek : 'Jede Woche',
								updnever : 'Niemals',
								checknow : 'Jetzt nach Updates suchen?',
								updok : "Das TW Collection's script ist auf dem neuesten Stand",
								updlangmaj : 'Ein Update ist für eine oder mehrere Sprachen des Skripts TW Collections verfügbar.<BR>Klick auf die Links um zu aktualisieren.',
								updscript : 'Es ist ein Update von TW Collections verfügbar.<br/>Aktualisieren?',
								upderror : 'Kann nicht aktualisiert werden. Installiere das Skript oder die Sprache bitte manuell.'
							},
							saveButton : 'Speichern'

						},
						ToolBox : {
							title : 'Eigenschaften',
							list : {
								openOptions : 'Einstellungen',
								errorLog : "Konsolenfehler"
							}
						},
						Doublons : {
							tip : 'Nur Duplikate anzeigen',
							tipuse : 'Nur nutzbare anzeigen',
							tiprecipe : 'Nur Rezepte anzeigen',
							tipsets : 'Nur Set-Items anzeigen',
							sellGain : 'Geld vom fahrenden Händler'
						},
						Logout : {
							title : 'Logout'
						},
						AllReportsDelete : {
							button : 'Alles löschen',
							title : 'Alle Berichte löschen',
							work : 'Arbeit',
							progress : 'Fortschritt',
							userConfirm : 'Benutzer bestätigen',
							loadPage : 'Seite laden',
							deleteReports : 'Berichte löschen',
							confirmText : 'Alle Berichte löschen - Bist du sicher?',
							deleteYes : 'Ja, löschen',
							deleteNo : 'Nein, nicht löschen',
							status : {
								title : 'Status',
								wait : 'Warten',
								successful : 'Erfolgreich',
								fail : 'Fehlgeschlagen',
								error : 'Fehler'
							}
						},
						fees : {
							tipText : 'Gebühren:'

						},
						twdbadds : {
							buyFilterTip : 'Nur fehlende Items anzeigen',
							buyFilterLabel : 'Fehlende Items'
						},
						collection : {
							miss : "Fehlt: ",
							thText : 'Fehlende Sammel-Items',
							thEncours : 'Du hast ein Gebot für dieses Item abgegeben',
							thFetch : 'Du kannst dieses Item auf dem Markt abholen',
							allOpt : 'Alles',
							collectionFilterTip : 'Nur Sammel-Items anzeigen',
							collectionFilterLabel : 'Nur Sammlungen',
							select : 'Wähle >>',
							listText : 'Items, die noch für eine Sammlung benötigt werden',
							filters : 'Filter',
							atTrader : 'Momentan verfügbare Itmes beim fahrenden Händler',
							atBid : 'Laufende Gebote',
							atCurBid : 'Beendete Gebote',
							atTraderTitle : 'Verkäufliche Items beim fahrenden Händler anzeigen',
							atBidTitle : 'Laufende Gebote anzeigen',
							atCurBidTitle : 'Abholbare Items auf dem Markt anzeigen',
							searchMarket : 'Auf dem Markt suchen',
							patchsell : {
								title : "Item wird noch für eine Sammlung benötigt"
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