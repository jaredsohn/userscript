// ==UserScript==
// @name            TW-Collections-HU Translation
// @description     English Translation - TW-Collections - see below 
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/180784*
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

(function(e){var t=document.createElement("script");t.type="application/javascript";t.textContent="("+e+")();";document.body.appendChild(t);t.parentNode.removeChild(t)})(function(){
if(window.location.href.indexOf(".the-west.")>0){ 
	
	TWT_ADDLANG = {
			translator : 'Zoltan80',
			idscript : '180784',
			version : '1.0.5',
			short_name : 'hu',
			name : 'Magyar',
			translation : {
				description : "<center><BR /><b>TW-Collections</b><br><b>Tips and reporting missing items collections <br>list of collection needed items<BR> Bank fees on mouseover <br> Various shortcuts"
					+ "<br>All reports deletion<br> Fees in bank <br> Additional buttons in inventory (duplicates,useables, recipes, sets) <br>etc ...</b>",
			Options : {
				tab : {
					setting : 'Beállítások'
				},
				checkbox_text : {
					box : {
						title : 'Funkciók / Menük',
						options : {
							goHome : 'Menj a városhoz',
							goToDaily1 : 'Szellemváros',
							goToDaily2 : 'Waupee Indián faluja ',
							ownSaloon : 'Saját kocsma megnyitása',
							openMarket : 'Piac megnyitása',
							mobileTrader : 'Utazó kereskedő megnyitása',
							listNeeded : 'Gyűjtőkhöz hiányzó felszerelés'
						}
					},
					collection : {
						title : 'Gyűjtemények',
						options : {
							patchsell : 'Jelzések a felszerelésben',
							patchtrader : 'Hiányzó felszerelés jelzése a kereskedőnél',
							patchmarket : 'Hiányzó felszerelés jelzése a piacon',
							showmiss : 'Hiányzó elemek listája',
							filterMarket : 'Piac Szűrő : Gyűjtők szettjéhez hiányzó tárgyak mutatása'

						}
					},
					inventory : {
						title : 'Felszerelés gomb',
						doublons : 'További gombok a felszerelésedben (duplicates,felhasználható, recept, szett)',
						options : {
							doublons : 'Többször szereplő tárgyak keresése gomb hozzáadása',
							useables : 'Felhasználható tárgyak keresése gomb hozzáadása',
							recipe : 'Receptek keresése gomb hozzáadása',
							sets : 'Szett lista gomb hozzáadása',
							sum : 'A többször szereplő tárgyak eladási ára (keresés után látható)'

						}
					},
					miscellaneous : {
						title : 'Egyébb beállítások',
						options : {
							lang : 'Nyelv',
							logout : 'Kijelentkezés gomb hozzáadása',
							deleteAllReports : 'Összes jelentés törlése gomb hozáadása',
							showFees : 'Banki díjak kijelzése, ha az egér fölötte van'

						}
					},
					twdbadds : {
						title : 'Clothcalc bővítmény',
						options : {
							filterBuyMarket : 'Piac szűrő : Felszerelésedben nem található tárgyak mutatása (twdb bővítmény)'
						}
					}
				},
				message : {
					title : 'Információ',
					message : 'Beállítások alkalmazva.',
					reloadButton : 'Oldal frissítése',
					gameButton : 'Vissza a játékhoz',
					indispo : 'Beállítás kikapcsolva (neked megvan a gyűjtők szettje, ezért erre a kiegészítőre nincs szükséged)',
					more : 'Továbbiak ',
					moreTip : 'További fordítások oldala'
				},
				update : {
					title : 'TW Collections frissítés',
					upddaily : 'Minden nap',
					updweek : 'Minden héten',
					updnever : 'Soha',
					checknow : 'Frissítés ellenőrzése most ?',
					updok : "A TW Collection's script naprakész",
					updlangmaj : 'Nyelvi frissítés található. Kattints a linkre és telepítsd a nyelvi kiegészítőt újra.',
					updscript : 'Frissítés található<br/>Frissítesz ?',
					upderror : 'Nem lehet automatikusan frissíteni. Neked kell kézzel telepítened. '
				},
				saveButton : 'Mentés'

			},
			ToolBox : {
				title : 'Funkciók',
				list : {
					openOptions : 'Beállítások',
				    errorLog:"Konzol hiba"
				}
			},
			Doublons : {
				tip : 'Mutasd az összes töbször szereplő tárgyat',
				tipuse : 'Mutasd az összes felhasználható tágyat',
				tiprecipe : 'Mutasd az összes receptet',
				tipsets : 'Mutasd az összes szettet',
				sellGain : '$ áron adhatod el'
			},
			Logout : {
				title : 'Kijelentkezés'
			},
			AllReportsDelete : {
				button : 'Összes törlése',
				title : 'Összes jelentés törlése',
				work : 'Munka',
				progress : 'Progress',
				userConfirm : 'Felhasználói megerősítés',
				loadPage : 'Oldal betöltése',
				deleteReports : 'Jelentések törlése',
				confirmText : 'Összes jelentés törlése - Biztos vagy benne ?',
				deleteYes : 'Igen, törlés',
				deleteNo : 'Nem , ne törölj',
				status : {
					title : 'Állapot',
					wait : 'Várj',
					successful : 'Sikeres',
					fail : 'Hiba',
					error : 'Hiba'
				}
			},
			fees : {
				tipText : '%1 % Költség : $%2'

			},
			twdbadds : {
				buyFilterTip : 'Azon tárgyak, melyek nem találhatóak a felszerelésemben',
				buyFilterLabel : 'Hiányzó tágyak'
			},
			collection : {
				miss : "Hiányzik : ",
				thText : '%1 tárgy hiányzik ',
				thEncours : 'You have a bid for this item',
				thFetch : 'You may retrieve this item at %1\'s market ',
				allOpt : 'Összes',
				collectionFilterTip : 'Gyűjtők szettjéhez hiányzó felszerelés',
				collectionFilterLabel : 'Gyűjtők szettjéhez',
				select : 'Kiválasztás >>',
				listText : 'Gyűjteményekhez szükséges felszerelés',
				patchsell : {
					title : "Gyűjteményekhez hogy teljes legyen",
					style : "position:relative;top:0px;left:0px;width:12px;height:12px;padding:0px;border:0px;margin:0px;",
					styleT : "position:absolute;top:4px;left:3px;width:15px;height:15px;padding:0px;border:0px;margin:0px;"
				}
			}
		  },
			// DO NOT CHANGE BELOW THIS LIGNE
			init : function() {
				var that = this;
				if (typeof window.TWT == 'undefined' || window.TWT == null) {
					EventHandler.listen('twt.init', function() {
						TWT.addPatchLang(that);
						return EventHandler.ONE_TIME_EVENT; // Unique
					});
				} else {
					EventHandler.signal('twt_lang_started_' + that.short_name);
					TWT.addPatchLang(that);

				}
			}

		}.init();
	}	
});          