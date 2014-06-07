// ==UserScript==
// @name            TW-Collections-SK Translation
// @description     Slovak translation - TW-Collections 
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/178803*
// @version         1.0.7.1
// @grant       none 
// ==/UserScript==
//
//Slovenčina do scriptu TW-Collections
//Pridáva množstvo filtrov do inventára, trhu a ikonku na rýchleší presun k zadávateľom a iné 
//Vďaka tomuto scriptu môžete tiež sledovať aké predmety vám chýbajú do zbierok a ľahšie hľadať predmety v inventári. 
//Oficiálny ENG preklad tu: http://userscripts.org/scripts/show/178803
//script TW-Collections tu: http://userscripts.org/scripts/show/159370
//

(function(e){var t=document.createElement("script");t.type="application/javascript";t.textContent="("+e+")();";document.body.appendChild(t);t.parentNode.removeChild(t)})(function(){
if(window.location.href.indexOf(".the-west.")>0){ 
	
	TWT_ADDLANG = {
			translator : '.Surge.',
			idscript : '182959',
			version : '1.0.7.1',
			short_name : 'sk',
			name : 'Slovenčina',
			translation : {
				description : "<center><BR /><b>TW-Collections</b><br><b>Tipy a hlásenie chýbajúcich predmetov do zbierok <br>Zoznam vecí potrebných do zbierok<BR> Poplatky v banke <br> Rôzne skratky"
					+ "<br>Možnosť vymazať všetky oznámenia <br>Doplnkové filtre v inventári (duplicitné, použitelné, recepty, súpravy) <br>a omnoho viac...</b>",
			Options : {
				tab : {
					setting : 'Nastavenia'
				},
				checkbox_text : {
					box : {
						title : 'Funkcie / Skratky',
						options : {
							goHome : 'Ísť do mesta',
							goToDaily1 : 'Mesto duchov',
							goToDaily2 : 'Waupeeho indiánska dedina',
							ownSaloon : 'Otvoriť Salón',
							openMarket : 'Otvoriť Trh',
							mobileTrader : 'Otvoriť Obchodníka',
							forum : 'Otvoriť fórum',
							listNeeded : 'Potrebné veci do zbierok'
							
						}
					},
					collection : {
						title : 'Zbierky',
						options : {
							gereNewItems:'Spravovať nové predmety na základe hotových úspechov',
							patchsell : 'Označiť v inventári chýbajúce predmety',
							patchtrader : 'Označiť u Obchodníka chýbajúce predmety',
							patchmarket : 'Označiť na trhu chýbajúce predmety',
							showmiss : 'Okno so zoznamom chýbajúcich predmetov',
							filterMarket : 'Filter trhu: zobraziť iba chýbajúce predmety (do zbierok)'

						}
					},
					inventory : {
						title : 'Filtre v inventári',
						doublons : 'Doplnkové filtre v inventári (duplicitné, použitelné, recepty, súpravy)',
						options : {
							doublons : 'Pridať tlačítka na hľadanie duplicitných predmetov',
							useables : 'Pridať tlačítko na hľadanie použiteľných produktov',
							recipe : 'Pridať tlačítko na hľadanie receptov',
							sets : 'Pridať tlačítko so zoznamom súprav',
							sum : 'Zobraziť pri hľadaní predajnú cenu na základe cien v obchode'

						}
					},
					miscellaneous : {
						title : 'Rôzne',
						options : {
							lang : 'Jazyk',
							logout : 'Pridať tlačítko na odhlásenie',
							deleteAllReports : 'Pridať možnosť zmazania všetkých oznámení',
							showFees : 'Zobrazovať v banke poplatky po prejdení myšou'

						}
					},
					twdbadds : {
						title : 'Clothcalc doplnok',
						options : {
							filterBuyMarket : 'Filter trhu: zobraziť iba chýbajúce predmety (doplnok tw-db scriptu - ClothCalc)'
							addNewToShop : 'Označiť u obchodníka nové predmety'
						}
					}
				},
				message : {
					title : 'Informácie',
					message : 'Nastavenia boli zmenené.',
					reloadButton : 'Znovu načítaj túto stránku',
					gameButton : 'Späť do hry',
					indispo : 'Nastavenie je nedostupné (Zbierky už sú dokončené alebo nastala chyba scriptu)',
					more : 'Viac ?',
					moreTip : 'Otvoriť poďakovania prekladateľom'
				},
				update : {
					title : 'Aktualizácia TW Collections',
					upddaily : 'Každý deň',
					updweek : 'Každý týždeň',
					updnever : 'Nikdy',
					checknow : 'Skontrolovať dostupnosť aktualizácie',
					updok : "Script TW-Collections je aktuálny",
					updlangmaj : 'Je k dispozícii aktualizácia jedného alebo viacerých jazykov pre TW Collections script.<BR>Otvor adresu nižšie pre aktualizáciu.',
					updscript : 'Je k dispozícii aktualizácia pre TW Collections<br/>Aktualizovať teraz?',
					upderror : 'Pri aktualizácii nastala chyba, skús nainštalovať script alebo jazyk manuálne'
				},
				saveButton : 'Uložiť'

			},
			ToolBox : {
				title : 'Funkcie',
				list : {
					openOptions : 'Nastavenia',
				}
			},
			Doublons : {
				tip : 'Zobraziť iba duplicitné',
				current : 'Aktuálny výber',
				noset : 'Okrem predmetov zo súprav',
				sellable : 'Predajné',
				auctionable : 'Vydražiteľné',
				tipuse : 'Zobraziť iba použiteľné',
				tiprecipe : 'Zobraziť iba recepty',
				tipsets : 'Zobraziť predmety súprav',
				sellGain : '$ od obchodníka'
			},
			Logout : {
				title : 'Odhlásiť sa'
			},
			AllReportsDelete : {
				button : 'Zmazať všetko',
				title : 'Zmazať všetky oznámenia',
				work : 'Práca',
				progress : 'Priebeh',
				userConfirm : 'Potvrdenie používateľa',
				loadPage : 'Načítať stránku',
				deleteReports : 'Zmazať oznámenia',
				confirmText : 'Zmazať všetky oznámenia, si si istý?',
				deleteYes : 'Áno, zmazať',
				deleteNo : 'Nie, zrušiť',
				status : {
					title : 'Status',
					wait : 'Čakaj',
					successful : 'Úspešné',
					fail : 'Chyba',
					error : 'Chyba'
				}
			},
			fees : {
				tipText : '%1 % Poplatky : $%2'

			},
			twdbadds : {
				buyFilterTip : 'Zobraziť iba chýbajúce predmety',
				buyFilterLabel : 'Chýbajúce predmety'
			},
			collection : {
				miss : "Chýba: ",
				thText : '%1 chýbajúcich predmetov',
				thEncours : 'Na tento predmet máš ponuku',
				thFetch : 'Tento predmet si môžeš vyzdvihnúť v meste %1',
				allOpt : 'Všetko',
				collectionFilterTip : 'Zobraziť iba veci do zbierok',
				collectionFilterLabel : 'Iba zbierky',
				select : 'Zvoliť >>',
				listText : 'Predmety potrebné do zbierok',
				patchsell : {
					title : "Začaté zbierky",
				}
			}
		  },
			// DO NOT CHANGE BELOW THIS LIGNE
			init : function() {
				var that = this;
				if (typeof window.TWT == 'undefined' || window.TWT == null) {
					EventHandler.listen('twt.init', function() {
						TWT.addPatchLang(that);
						return EventHandler.ONE_TIME_EVENT;
					});
				} else {
					EventHandler.signal('twt_lang_started_' + that.short_name);
					TWT.addPatchLang(that);

				}
			}

		}.init();
	}	
});          