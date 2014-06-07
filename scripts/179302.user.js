// ==UserScript==
// @name            TW-Collections-PL Translation
// @description     Polish Translation - TW-Collections - Dun from Darius II mod
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/179302*
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
					translator : 'Dun / Darius II',
					idscript : '179302',
					version : '1.0.7',
					short_name : 'pl',
					name : 'Polish',
					translation : {
						"description" : "<center><BR /><b>TW Tools RB + Collections</b><br><b>Porady i raportowanie brakujących elementów kolekcji <br/> lista kolekcji potrzebnych przedmiotów, <br/> opłaty bankowe po najechaniu myszą, <br/> zbiór różnych skrótów.<br>notatnik<br>Usuwanie wszystkich raportów<br> itp ...</b>",
						"Options" : {
							"tab" : {
								"setting" : "Ustawienia"
							},
							"lang" : "Język :",
							"checkbox_text" : {
								"box" : {
									"title" : "Właściwości / Menu",
									"options" : {
										"goHome" : "Idź do miasta",
										"goToDaily1" : "Idź do Miasta Widma",
										"goToDaily2" : "Idź do Wioski Idiańskiej ",
										"ownSaloon" : "Otwórz saloon",
										"openMarket" : "Otwórz targ",
										"mobileTrader" : "Otwórz handlarza",
										"listNeeded" : "Brakujące przedmioty do kolekcji"
									}
								},
								"collection" : {
									"title" : "Kolekcje",
									"options" : {
										"patchsell" : "Oznaczyć brakujące przedmioty w ekwipunku",
										"patchtrader" : "Oznaczyć brakujące przedmioty u Handlarza",
										"patchmarket" : "Oznaczyć brakujące przedmioty na Targu",
										"showmiss" : "Lista brakujących przedmiotów",
										"filterMarket" : "Filtr Targu : pokaż tylko brakujące przedmiotów"
									}
								},
								"inventory" : {
									"title" : "Przyciski w zapasach",
									"doublons" : " Dodaj przycisk do wyszukiwania duplikatów",
									"options" : {
										"doublons" : " Dodaj przycisk do wyszukiwania duplikatów",
										"useables" : "Dodaj przycisk do wyszukiwania materiałów eksploatacyjnych",
										"recipe" : " Dodaj przycisk do wyszukiwania receptur",
										"sets" : "Przycisk Dodaj do listy sets",
										"sum" : " Pokaż sprzedać sumy na wyszukiwanie na podstawie cen handlowych"
									}
								},
								"miscellaneous" : {
									"title" : "Różne",
									"options" : {
										"lang" : "Język :",
										"logout" : "Włącz przycisk \"Wyloguj się\"",
										"deleteAllReports" : "Dodaj usuwanie wszystkich raportów",
										"showFees" : "Pokaż opłaty w Banku po najechaniu myszką na kwotę"
									}
								},
								"twdbadds" : {
									"title" : "Clothcalc Add-on",
									"options" : {
										"filterBuyMarket" : "Rynek filtr: pokaż tylko zaznaczone brakujące elementy (twdb dodatek)"
									}
								}
							},
							"message" : {
								"title" : "Informacje",
								"message" : "Ustawienia został zapisane.",
								"reloadButton" : "Odswież tą stronę",
								"gameButton" : "Powrót do gry",
								"more" : "Więcej?",
								"moreTip" : " Otwórz przysięgłe stronie Porady",
								"indispo" : "Ustawienie niedostępne (Kolekcje zakończona lub skrypt nie jest dostępny)"
							},
							"update" : {
								"updok" : "TW Collection skrypt jest na bieżąco",
								"updlangmaj" : "Aktualizacja jest dostępna dla jednego lub większej liczby języków skryptu Kolekcje TW. <BR> Numeru Clic na linki, aby zaktualizować.",
								"updscript" : " Aktualizacja jest dostępna dla skryptu Kolekcje TW <br/> Upgrade?",
								"upderror" : "Nie można uaktualnić, należy zainstalować ręcznie skrypt lub język",
								"title" : "Przyciski w zapasach",
								"upddaily" : "Codziennie",
								"updweek" : "Tygodniowo",
								"updnever" : "Nigdy",
								"checknow" : "Sprawdź aktualizację teraz?"
							},
							"saveButton" : "Zapisz"
						},
						"ToolBox" : {
							"title" : "Funkcje TWTools",
							"list" : {
								"openOptions" : "Ustawienia",
								"errorLog" : "Console error"
							}
						},
						"Logout" : {
							"title" : "Wyloguj się"
						},
						"AllReportsDelete" : {
							"button" : "Usuwanie wszystkich raportów",
							"title" : "Usuwanie raportów",
							"work" : "Praca",
							"progress" : "Postęp",
							"userConfirm" : "Potwierdzenie użytkownika",
							"loadPage" : "Ładowana strona",
							"deleteReports" : "Usunięte raporty",
							"confirmText" : "Usuwanie raportów - Jesteś pewien ?",
							"deleteYes" : "Tak, usuń",
							"deleteNo" : "Nie, nie usuwaj",
							"status" : {
								"title" : "Status",
								"wait" : "Czekaj",
								"successful" : "Pomyślnie",
								"fail" : "Błąd",
								"error" : "Błąd"
							}
						},
						"fees" : {
							"tipText" : "%1 % Prowizja : $%2"
						},
						"twdbadds" : {
							"buyFilterTip" : "Pokaż brakujące elementy tylko",
							"buyFilterLabel" : "Brakujących pozycji"
						},
						"collection" : {
							"miss" : "Brakuje : ",
							"thText" : "Liczba brakujących przedmiotów: %1",
							"thEncours" : "Bierzesz udział w licytacji tego produktu",
							"thFetch" : "Możesz odebrać ten przedmiot z targu w mieście %1' ",
							"allOpt" : "Wszystko",
							"collectionFilterTip" : "Pokaż tylko przedmioty do kolekcji",
							"collectionFilterLabel" : "Tylko kolekcje",
							"select" : "Wybierz >>",
							"listText" : "Brakujące przedmioty do kolecji",
							"patchsell" : {
								"title" : "Lista brakujących przedmiotów"
							}
						},
						"Doublons" : {
							"tip" : " Pokaż tylko duplikaty",
							"tipuse" : "Pokaż tylko materiały eksploatacyjne",
							"tiprecipe" : "Pokaż tylko receptur",
							"tipsets" : " Pokaż tylko elementy sets",
							current:'Ta wyszukiwarka',
							noset:'Bez set item',
							sellable:'Chodliwy',
							auctionable:'Chodliwy na aukcji',
							"sellGain" : "$ Od handlowca"
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