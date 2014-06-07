// ==UserScript==
// @name            TW-Collections-CZ Translation
// @description     Czech Translation - TW-Collections - see below 
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/179395*
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
			if(window.location.href.indexOf(".the-west.")>0){
	
				TWT_ADDLANG = {
					translator : 'Dr.Keeper',
					idscript : '179395',
					version : '1.0.7',
					short_name : 'cz',
					name : 'Čeština',
					translation : {
		// ZAČÁTEK PŘEKLADU


				description : "<center><BR /><b>TW-Collections</b><br><b>Tips and reporting missing items collections <br>list of collection needed items<BR> Bank fees on mouseover <br> Various shortcuts"
						+ "<br>All reports deletion<br> Fees in bank <br> Additional buttons in inventory (duplicates,useables, recipes, sets) <br>etc ...</b>",
				Options : {
					tab : {
						setting : 'Nastavení'
					},
					checkbox_text : {
						box : {
							title : 'Funkce / Menu',
							options : {
								goHome : 'Jít do svého města',
								goToDaily1 : 'Město Duchů',
								goToDaily2 : 'Indiánská rezervace',
								ownSaloon : 'Otevřít salón',
								openMarket : 'Otevřít trh',
								forum: 'Otevřít fórum',
								mobileTrader : 'Otevřít podomního obchodníka',
								listNeeded : 'Potřebné předměty do kolekcí'
							}
						},
						collection : {
							title : 'Kolekce',
							options : {
								gereNewItems:'Spravovat nové předměty na základě hotových úspěchů',
								patchsell : 'Zobrazovat chybějící předměty v Inventáři',
								patchtrader : 'Zobrazovat chybějící předměty v Obchodech',
								patchmarket : 'Zobrazovat chybějící předměty na Trhu',
								showmiss : 'Seznam chybějících předmětů v tipu',
								filterMarket : 'Filtr na Trhu: Zobrazit pouze chybějící předměty (kolekce)'
							
							}
						},
						inventory : {
							title : 'Tlačítka v inventáři',
							doublons : 'Další tlačítka v inventáři (duplicitní a použitelné věci, recepty, sady)',
							options : {
								doublons : 'Přidat tlačítko pro vyhledání duplicitních věcí',
								useables : 'Přidat tlačítko pro vyhledání použitelných produktů',
								recipe  : 'Přidat tlačítko pro vyhledání receptů',
								sets : 'Přidat tlačítko pro seznam sad',
								sum : "Při vyhledávání zobrazovat součet prodejní hodnoty předmětů"
								
							}
						},
						miscellaneous : {
							title : 'Ostatní',
							options : {
								lang : 'Jazyk',
								logout : 'Přidat tlačítko pro odhlášení',
								deleteAllReports : 'Přidat tlačítko na smazání reportů',
								showFees : 'Přidat poplatky banky při najetí myši',
								popupTWT:'Otevřít menu TW kolekcí po najetí myší'
	
							}
						},
						twdbadds : {
							title : 'Přídavek Cloth-calc',
							options : {
								filterBuyMarket : 'Filtr trhu: Ukaž pouze chybějící předměty (twdb skript)',
								addNewToShop : 'Ukaž nové předměty v obchodě'
							}
						}
					},
					message : {
						title : 'Informace',
						message : 'Nastavní bylo uloženo',
						reloadButton : 'Aktualizujte si okno',
						gameButton : 'Návrat do hry',
						indispo : 'Nastavení není k dispozici (Kolekce jsou zkompletovány, nebo není dostupný skript)',
						more : 'Jiné?',
						moreTip : 'Otevřít stránku s tipy k překladu'
					},
					update:{
				            	title :' Aktualizace TW Collections',
						upddaily :'Každý den', 
						updweek :'Každý týden',
						updnever :'Nikdy',
						checknow:'Zkontrolovat hned?',
						updok : "TW Collections skript je aktuální",
						updlangmaj : 'Je dostupná jedna nebo více aktualizací pro balíčky jazyků.<BR>Klikni na odkazy níže pro aktualizaci.',
						updscript : 'Je dostupná aktualizace pro skript TW Collections<br/>Aktualizovat?',
						upderror : 'Nepodařilo se provézt aktualizaci, měl by jsi aktualizovat jazyky ručně.' 
					},
					saveButton : 'Uložit'

				},
				ToolBox : {
					title : 'Funkce',
					list : {
						openOptions : 'Nastavení',
					}
				},
				Doublons : {
					tip : 'Ukázat pouze duplicitní věci',
					current:'Aktuální výběr',
					noset:'Bez setových předmětů',
					sellable:'Prodejné',
					auctionable:'Dražitelné',
					tipuse : 'Ukázat pouze použitelné věci',
					tiprecipe : 'Ukázat pouze recepty',
					tipsets : 'Ukázat pouze setové věci',
					sellGain : '$ od obchodníka'
				},
				Logout : {
					title : 'Odhlásit se'
				},
				AllReportsDelete : {
					button : 'Odstranit vše',
					title : 'Odstranit všechny oznámení',
					work : 'Práce',
					progress : 'Postup',
					userConfirm : 'Potvrzení uživatele',
					loadPage : 'Načíst stránku',
					deleteReports : 'Smazat oznámení',
					confirmText : 'Smazat všechny oznámení - Jste si jistí?',
					deleteYes : 'Ano, smazat',
					deleteNo : 'Ne, nemazat!',
					status : {
						title : 'Status',
						wait : 'Načítání',
						successful : 'Dokončeno',
						fail : 'Chyba',
						error : 'Chyba'
					}
				},
				fees : {
					tipText : '%1 % Poplatky : $%2'

				},
				twdbadds :{
					buyFilterTip : 'Ukaž pouze chybějící předměty',
					buyFilterLabel : 'Chybějící předměty'
				},
				collection : {
					miss : "Schází : ",
					thText : '%1 Chybějících předmětů',
					thEncours : 'O tento předmět se již ucházíš',
					thFetch : 'Můžeš si tento předmět vyzvednout na trhu v %1',
					allOpt : 'Vše',
					collectionFilterTip : 'Ukaž pouze předměty z kolekcí',
					collectionFilterLabel : 'Pouze kolekce',
					select : 'Zvol >>',
					listText : 'Předměty potřebné do kolekcí',
					filters : 'Filtry',
					atTrader : 'Prodejné podomním obchodníkem',
					atBid : 'Stávající příhozy',
					atCurBid : 'Ukončené příhozy',
					atTraderTitle : 'Ukaž předměty, které prodává podomní obchodník',
					atBidTitle : 'Ukaž aktuální příhozy',
					atCurBidTitle : 'Ukaž předměty připravené k vyzvednutí',
					searchMarket : 'Prohledej trh',
					patchsell : {
						title : "Potřebné předměty pro již započatou kolekci",
					}
			 	 }	// KONEC PŘEKLADU
			},
			// NEUPRAVOVAT NÍŽE
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