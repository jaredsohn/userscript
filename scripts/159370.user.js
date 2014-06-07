// ==UserScript==
// @name            TW-Collections
// @description     TW-Collections - see history
// @include     http://*.the-west.*/game.php*
// @version     1.3.3.7
// @history 	1.3.3.7 maj for 2.09
// @history 	1.3.3.6 correcting tips in mobile trader
// @history 	1.3.3.5 add vertical scrollbar in set & collection selectboxs
// @history 	1.3.3.4 maj 2.08 & optimisation chargement items de collections
// @history 	1.3.3.3 Fix ended bids  
// @history 	1.3.3.2 correct End bids on collector list, add setting for deactivate menu mouse hover  
// @history 	1.3.3 Mod. listcolector: recherche dans le marché   add direct link to market / mobile trader, add filters 
// @history     1.3.2.1 Fix inventory bug 
// @history     1.3.2  fix for the the mobile trader link, add the new TW items of the achieved collections, add pictures on collections list
// @history     1.3.1.3  fix for the shop display
// @history     1.3.1.2  corrections
// @history     1.3.1.1  corrections
// @history     1.3.1 correction pour le nouveau marchand ambulant + patch TWDB new
// @history     1.3.0 correction trad en + ajout lien forum
// @history     1.2.9 correction trad en et logout sans confirmation + ajout trad Slovak
// @history     1.2.7 correction trad en et logout sans confirmation 
// @history     1.2.7 ajout filtres inventaires, correction 
// @history     1.2.7 modification du systeme de langue et de l'updater, simplification suppression rapport, etc...
// @history     1.2.6.1 correction affichage TW api
// @history     1.2.6 correction lang et changement de nom
// @history     1.2.5 corrections ... or not :)
// @history     1.2.4 Création d'une barre d'outils dans l'inventaire (recettes, sets, consommables,doublons)
// @history     1.2.3 ajout d'un bouton doublon dans l'inventaire et correction bug lang
// @history     1.2.2 passage 2.0.6
// @history     1.2.1 passage 2.0.5
// @history     1.2.0 correction bugs maj + Traduction italienne (grazie tw81)
// @history     1.1.9 correction attente TWDB....
// @nocompat Chrome
// @grant       none 
// ==/UserScript==
//
(function(e) {
	var t = document.createElement("script");
	t.type = "application/javascript";
	t.textContent = "(" + e + ")();";
	document.body.appendChild(t);
	t.parentNode.removeChild(t);
})
		(function() {
			if (/http:\/\/.+\.the-west\..*\/game\.php.*/
					.test(window.location.href)) {

				TWT = {
					DEBUG : false,
					LANG : {},
					info : {
						lang : 'en',
						version : '1.3.3.7',
						min_gameversion : '2.05',
						max_gameversion : '2.09',
						idscript : '159370'
					},
					languages : [ {
						short_name : 'fr',
						name : 'Francais',
						translator : 'Dun',
						version : '1.3.3'
					}, {
						short_name : 'en',
						name : 'English',
						translator : 'Dun',
						version : '1.3.3'
					} ],
					images : {
						cup : "/images/icons/achv_points.png",
						logout : "data:image/jpg;base64,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",
						twdb_iconNew : "data:image/png;base64,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",
						traderImg : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAgGBAf/xAAoEAACAQMEAgEDBQAAAAAAAAABAgMEBQYABxESEyIhCBRBMTIzQkP/xAAXAQEBAQEAAAAAAAAAAAAAAAAFAwQH/8QAJREBAAIBAwQBBQEAAAAAAAAAAQIRAwAEURITITFhIjJBkaGx/9oADAMBAAIRAxEAPwCzsr3ZqcwrZ446eojpYzykVNTuY2JcIZZCrKSo/cQG9V9jyCNZbNZd1dvJhd7NFEQ0qSwLJP4lVPcPCrop5Kle3aRf7AN0AZxg9uMvXHN0qy03ZJqWakeOZZJPGfNG0aq0kRZgU6NCyOAOP4jyew45MUxHJtsIb/kWZbwPlEF9t1PLRQxUJhWCKPvKKmY9zxKxk95OVAABJYk64jk3O7nMg3RJtFOktDgugWxG3jzty5p9yeVmEgOmKfcvsvzVfCJ/lGbOfUfie5O3tBmFROszVSc+V06s3Hx7KRyrA8gr+CCNNTz9PuN33IcBlym3xVTU94vVdcKX7qDxyeGadpI2dQB1ZkZXK8AgvwfkHTT+HsyxRcmSpUWeqdIY9/vSAGDqOb9/PrXoO82DYxJFBf5rYGqFk7xOsjRtFIVA7o6FXRuPUlWHK/B5HxrB2/aDF83ySltuZVtzutGKtpoqGuuLyQRuSf8AM+sgHYhVkDhQfUDTTRnZwu5hLpLTjhK1XeqbiUT19P8ATz+/zzqobJYLVZLelut1KEiT9Ofkk/kk/knTTTV4gxF0urFo8Gv/2Q=="

					},
					menu_callback : {
						goHome : "TaskQueue.add(new TaskWalk(Character.homeTown.town_id,'town'))",
						goToDaily1 : 'Map.center(1920, 2176);',
						goToDaily2 : 'Map.center(28288,16768);',
						ownSaloon : 'SaloonWindow.open(Character.homeTown.town_id);',
						openMarket : 'MarketWindow.open(Character.homeTown.town_id);',
						mobileTrader : "west.window.shop.open().showCategory('trader');",
						forum : "ForumWindow.open();",
						listNeeded : 'TWT.WindowCollection.open();',
						openOptions : "TWT.Options.open('setting')"

					},
					css : {
						style : "position:relative;top:0px;left:0px;width:12px;height:12px;padding:0px;border:0px;margin:0px;",
						styleT : "position:absolute;top:4px;left:3px;width:15px;height:15px;padding:0px;border:0px;margin:0px;",
						styleN : "position:absolute;top:120px;left:25px;padding:0px;border:0px;margin:0px;",
						styleDB : "position:absolute;top:0px;left:0px;padding:0px;border:0px;margin:0px;"

					},
					langs : {
						fr : {
							description : "<center><BR /><b>TW Collections</b><br><b>Astuces et signalement des items manquants des collections<br>Liste des items manquants des collections<br>Frais bancaires en survol avant dépot<br>Divers raccourcis et fonctions<br> Suppressions des rapports<br> Frais bancaires<br>Doublons dans l'inventaire<br>etc...</b></center>",
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
											forum : 'Ouvrir le forum',
											listNeeded : 'Items manquants des collections'

										}
									},
									collection : {
										title : 'Collections',
										options : {
											gereNewItems : 'Gérer les nouveaux items des succés déjà obtenus',
											patchsell : 'Signalement des items manquants aux collections dans l\'inventaire',
											patchtrader : 'Signalement des items n&eacute;cessaires aux collections chez les marchands',
											patchmarket : 'Signalement des items n&eacute;cessaires aux collections dans le march&eacute;',
											filterMarket : 'Filtre dans le march&eacute; pour n\'afficher que les items manquants des collections',
											showmiss : 'Items manquants des collections sur survol'
										}
									},
									inventory : {
										title : 'Boutons supplémentaires dans l\'inventaire',
										options : {
											doublons : 'Bouton de recherche des doublons',
											useables : 'Bouton de recherche des consommables',
											recipe : 'Bouton de recherche des recettes',
											sets : 'Liste de recherche des sets',
											sum : "Cumul des prix de vente marchand sur recherche"

										}
									},
									miscellaneous : {
										title : 'Divers',
										options : {
											lang : 'Language',
											logout : 'Bouton d&eacute;connexion directe',
											deleteAllReports : 'Action pour supprimer tous les rapports',
											showFees : 'Frais bancaire en survol',
											popupTWT : 'Ouverture du menu du script Collections au survol'
										}
									},
									twdbadds : {
										title : 'Add-on Clothcalc',
										options : {
											filterBuyMarket : 'Filtre dans le march&eacute; pour n\'afficher que les items manquants (twdb add)'
											//addNewToShop : 'Afficher les items non possédés dans le shop'
										}
									}

								},
								message : {
									title : 'Information',
									message : 'Préférences appliquées',
									reloadButton : 'Recharger cette page',
									gameButton : 'Aller sur le jeu',
									indispo : 'Option indisponible (Collections terminées ou script non diponible)',
									more : 'Autres ?',
									moreTip : 'Ouvrir la page des traductions'
								},
								update : {
									title : ' Mise à jour',
									updok : 'Le script TW Collection est à jour',
									updscript : 'Une nouvelle version du script TW Collections est disponible<br/>Mettre à jour ?',
									updlangmaj : 'Une mise à jour est disponible pour une ou plusieurs langues utilisées avec le script TW Collections.<br/>Cliquez sur les liens ci dessous pour mettre à jour ?',
									upddaily : 'Journalières',
									updweek : 'Hebdomadaires',
									updnever : 'Jamais',
									checknow : 'Verifier les mises à jour ?',
									upderror : 'Impossible de mettre le script  TW Collections à jour, vous devez installer le script ou la langue manuellement'
								},
								saveButton : 'Sauvegarder'

							},
							ToolBox : {
								title : 'Fonctionnalit&eacute;s',
								list : {
									openOptions : 'Param&egrave;tres de l&acute;outil'
								}
							},
							Doublons : {
								tip : 'Afficher uniquement les doublons',
								current : 'Recherche courante',
								noset : 'Sans items de sets',
								sellable : 'Vendables',
								auctionable : 'Commercialisables',
								tipuse : 'Afficher uniquement les consommables',
								tiprecipe : 'Afficher uniquement les recettes',
								tipsets : 'Afficher uniquement les items de sets',
								sellGain : '$ prix marchand '
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
							twdbadds : {
								buyFilterTip : 'Montrer seulement les items manquants',
								buyFilterLabel : 'Items manquants'
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
								select : 'Sélectionner ...',
								filters : 'Filtres',
								atTrader : 'Vendu par le marchand ambulant',
								atBid : 'Enchères en cours',
								atCurBid : 'Enchères terminées',
								searchMarket : 'Rechercher dans le marché',
								atTraderTitle : 'Affichez les items en vente chez le marchand ambulant',
								atBidTitle : 'Affichez les items en cours d\'enchère',
								atCurBidTitle : 'Affichez les items récupèrables aux enchères',
								patchsell : {
									title : "Cet item est n&eacute;cessaire pour une collection en cours"
								}
							}
						},
						en : {
							description : "<center><BR /><b>TW-Collections</b><br><b>Tips and reporting missing items collections <br>list of collection needed items<BR> Bank fees on mouseover <br> Various shortcuts"
									+ "<br>All reports deletion<br> Fees in bank <br> Additional buttons in inventory (duplicates,useables, recipes, sets) <br>etc ...</b>",
							Options : {
								tab : {
									setting : 'Settings'
								},
								checkbox_text : {
									box : {
										title : 'Features / Menus',
										options : {
											goHome : 'Travel to town',
											goToDaily1 : 'Ghost Town',
											goToDaily2 : 'Waupee Indian Camp ',
											ownSaloon : 'Open saloon',
											openMarket : 'Open Market',
											mobileTrader : 'Open Mobile Trader',
											forum : 'Open forum',
											listNeeded : 'Collector\'s items needed'

										}
									},
									collection : {
										title : 'Collections',
										options : {
											gereNewItems : 'Manage the new items added on succeeded achievements',
											patchsell : 'Signal missing items in inventory',
											patchtrader : 'Signal missing items on Traders',
											patchmarket : 'Signal missing items on Market',
											showmiss : 'List for missing items on tip',
											filterMarket : 'Market filter : show only missing items (collections)'

										}
									},
									inventory : {
										title : 'Buttons in inventory',
										doublons : 'Additional buttons in inventory (duplicates,useables, recipes, sets)',
										options : {
											doublons : 'Add button for duplicates search',
											useables : 'Add button for useables search',
											recipe : 'Add button for recipes search',
											sets : 'Add button for sets list',
											sum : 'Show sell sum on search based on merchant prices'

										}
									},
									miscellaneous : {
										title : 'Miscellaneous',
										options : {
											lang : 'Language',
											logout : 'Add Logout button',
											deleteAllReports : 'Add suppress all reports action',
											showFees : 'Add Bank Fees on Mouseover',
											popupTWT : 'Open menu of TW Collections on mouse hover'
										}
									},
									twdbadds : {
										title : 'Clothcalc Add-on',
										options : {
											filterBuyMarket : 'Market filter : show only marked missing items (twdb add)'
											//addNewToShop : 'Show new items in the shop'
										}
									}
								},
								message : {
									title : 'Information',
									message : 'Preferences have been applied.',
									reloadButton : 'Reload this page',
									gameButton : 'Return to the game',
									indispo : 'Setting unavailable (Collections completed or script not available)',
									more : 'More ?',
									moreTip : 'Open the translations tips page'
								},
								update : {
									title : 'TW Collections Update',
									upddaily : 'Every day',
									updweek : 'Every week',
									updnever : 'Never',
									checknow : 'Check update now ?',
									updok : "The TW Collection's script is up to date",
									updlangmaj : 'An update is available for one or more languages ​​of the TW Collections script.<BR>Clic on the links bellow to upgrade.',
									updscript : 'An update is available for the script TW Collections<br/>Upgrade ?',
									upderror : 'Unable to upgrade, you should install the script or language manually'
								},
								saveButton : 'Save'

							},
							ToolBox : {
								title : 'Features',
								list : {
									openOptions : 'Settings'
								}
							},
							Doublons : {
								tip : 'Show only duplicates',
								current : 'Current search',
								noset : 'Without set items',
								sellable : 'Sellables',
								auctionable : 'Auctionables',
								tipuse : 'Show only useables',
								tiprecipe : 'Show only recipes',
								tipsets : 'Show only set items',
								sellGain : '$ from the merchant'
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
							twdbadds : {
								buyFilterTip : 'Show only missing items',
								buyFilterLabel : 'Missing items'
							},
							collection : {
								miss : "Missing : ",
								thText : '%1 missing item%2',
								thEncours : 'You have a bid for this item',
								thFetch : 'You may retrieve this item at %1\'s market ',
								allOpt : 'All',
								collectionFilterTip : 'Show only collections items',
								collectionFilterLabel : 'Collections only',
								select : 'Select ...',
								listText : 'Collector\'s items needed',
								filters : 'Filters',
								atTrader : 'Sold by mobile trader',
								atBid : 'Current bids',
								atCurBid : 'Ended bids',
								atTraderTitle : 'Show items on sale at the mobile trader',
								atBidTitle : 'Show currents bids',
								atCurBidTitle : 'Show  items retrievable at market',
								searchMarket : 'Search in the market',
								patchsell : {
									title : "Items needed to complete collections"
								}
							}
						}
					},
					getLanguage : function() {
						var detected_lang;
						try {
							detected_lang = TWT.scriptStorage
									.getItem('TWT.Cache.miscellaneous.lang');

							if (!isDefined(detected_lang)) {
								detected_lang = Game.locale.match(/(\S*)_/)[1]; // basé
								// sur
								// la
								// langue
								// du
								// serveur
							}
							if (!isDefined(detected_lang)) {
								detected_lang = TWT.info.lang; // Nouveau
							}

						} catch (ex) {
							detected_lang = TWT.info.lang; // béta (w1/w2) ...
						} finally {

							var langue = TWT.langs[detected_lang];

							if (!isDefined(langue)) { // langue non connue ou
								// chargement des patchs
								// lang non fait
								langue = TWT.langs[TWT.info.lang];
								var saved_descr = localStorage
										.getItem('TWT.Cache.description');
								if (isDefined(saved_descr)) {
									langue.description = saved_descr; // permet
									// d'initialiser
									// l'api
									// avec
									// la
									// traductin
								}

								EventHandler.listen('twt_lang_started_'
										+ detected_lang, function() {

									TWT.getLanguage();
									return EventHandler.ONE_TIME_EVENT; // Unique
								});
							} else {
								TWT.info.lang = detected_lang;
							}
							return langue;
						}
					},
					addMissedTrad : function(enTrObj, langTrObj) {
						if (!isDefined(langTrObj)) {
							langTrObj = {};
						}
						$
								.each(
										enTrObj,
										function(ind, item) {

											if (jQuery.type(item) == "object") {

												TWT.addMissedTrad(item,
														langTrObj[ind]);
											} else {
												if (jQuery.type(langTrObj[ind]) == "undefined") {
													langTrObj[ind] = enTrObj[ind];

												}
											}
										});

					},
					addPatchLang : function(lang) {
						try {
							TWT.langs[lang.short_name] = lang.translation;
							TWT.languages.push({
								'short_name' : lang.short_name,
								'name' : lang.name,
								'translator' : lang.translator,
								'version' : lang.version,
								'script' : lang.idscript
							});
							// console.log("Ajout manquants sur "+lang.name);

							TWT.addMissedTrad(TWT.langs["en"],
									TWT.langs[lang.short_name]);

							EventHandler.signal('twt_lang_started_'
									+ lang.short_name);
						} catch (e) {
							ErrorLog.log(e);
						}
					},
					checkIsValidLang : function() {
						var selLang = TWT.langs[TWT.Settings.checked.miscellaneous.lang]
								|| undefined;
						if (!isDefined(selLang)) {
							TWT.Options.open('translate');
							TWT.Settings.checked.miscellaneous.lang = TWT.info.lang;
							TWT.scriptStorage.setItem(
									'TWT.Cache.miscellaneous.lang',
									TWT.info.lang);
						}
					},
					init : function() {
						try {

							EventHandler.signal("twt.init"); // Signalement
							// pour les
							// patchs de
							// langues
							var that = this;
							var timeout = 0;
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

											if (!window.TWDB.ClothCalc.ready) { // Attente
												// des
												// injections
												// TWDB
												loading = false;
												// si TWDB se plante on arrete
												// au bout de 20 secondes
												timeout++;
												if (timeout > 20) {
													ErrorLog
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

											TWT.LANG = TWT.getLanguage();
											TWT.isTWDBHere = isDefined(window.TWDB)
													&& window.TWDB.ClothCalc.ready;
											TWT.Settings.init();
											TWT.checkIsValidLang();

											EventHandler.signal('twt.ready');

											if (!TWT.DEBUG) {
												// Update
												ScriptUpdater.check(
														TWT.info.idscript,
														TWT.info.version);

												// Register
												TWT.api();
												// TWT.news();

											} else {
												window.DEBUG = true;
											}
											TWT.ready = true;
										}

									}, 500);

						} catch (e) {
							ErrorLog.log("Erreur d'initialisation", e);
							TWT.ready = false;
						}
					},
					Settings : {
						checked : {},
						shouldRefresh : {},
						init : function() {

							if (!isDefined(TWT.scriptStorage
									.getItem('TWT.Cache.Metacol.finished'))) {
								// Recuperation des collections restantes
								// TWT.MetaCol.init();
							} else {
								TWT.MetaCol.finished = TWT.scriptStorage
										.getItem('TWT.Cache.Metacol.finished');
							}

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

																	var attended;

																	if (TWT.MetaCol.finished
																			&& (ind1 == 'collection' || ind2 == 'listNeeded')) {
																		// Desactivation
																		// des
																		// options
																		// de
																		// collections
																		// si
																		// elles
																		// sont
																		// terminées

																		attended = '0';
																	} else {

																		attended = TWT.scriptStorage
																				.getItem('TWT.Cache.'
																						+ ind1
																						+ '.'
																						+ ind2);

																	}
																	if (!isDefined(attended)) {

																		if (ind2 == 'lang') {
																			attended = TWT.info.lang;
																		} else {
																			attended = '1';

																		}
																		;
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
										|| TWT.langs["en"];
								EventHandler.signal('collection.bagupdate');
							} catch (e) {
								ErrorLog.log('Erreur refresh ', e);
							}
							return refreshed;
						},
						apply : function() {

							TWT.LANG = TWT.langs[TWT.Settings
									.getValue('miscellaneous.lang')]
									|| TWT.langs[TWT.info.lang];

							TWT.MenuBox.initListener();
							TWT.MenuBox.create();
							TWT.Injecteur.startListen();
							TWT.Logout.initListener();

							if (TWT.Settings.isChecked('inventory.doublons')
									|| TWT.Settings
											.isChecked('inventory.useables')
									|| TWT.Settings
											.isChecked('inventory.recipe')
									|| TWT.Settings.isChecked('inventory.sets')

							) {
								TWT.Inventaire.create();

							} else {
								TWT.Inventaire.detach();
							}
							;

							TWT.BankFees.initListener();
							TWT.AllReportsDelete.initListener();

							if (TWT.Settings.isChecked('miscellaneous.logout'))
								TWT.Logout.create();

							if ((!TWT.MetaCol.finished) || TWT.isTWDBHere) {
								// ErrorLog.log('test log');

								TWT.Market.initListener();
								if (TWT.Settings
										.isChecked("twdbadds.filterBuyMarket")
										|| TWT.Settings
												.isChecked('collection.filterMarket')) {
									TWT.Market.init();
									TWT.Market.inject();
								}
							}
							if (!TWT.MetaCol.finished) {
								TWT.CollectionsHandler.initListener();

								if (TWT.Settings
										.isChecked('collection.patchsell')
										|| TWT.Settings
												.isChecked('collection.patchmarket')
										|| TWT.Settings
												.isChecked('collection.showmiss')) {
									// EventHandler.signal('collection.bagupdate');
									TWT.CollectionsHandler.init();
									TWT.CollectionsHandler.inject();
									TWT.CollectionsHandler.attachFilter();
								}
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
							// TWT.AltoFlood.init();

						}
					},
					Options : {

						open : function(window) {
							TWT.Options.Windows = wman.open('TWTToolWindow')
									.addClass('noreload').setMiniTitle(
											TWT.LANG.Options.tab.setting)
									.addTab(TWT.LANG.Options.tab.setting,
											'TabSetting',
											TWT.Options.setting.open)
									.addTab(
											'Translations', 'TabTranslate',
											TWT.Options.translate.open);
//								  .addTab(
//											'Ventes', 'TabSold',
//											TWT.Options.sold.open)
//											;

							$('<div></div>')
									.attr({
										'id' : 'ToolWindowBody'
									})
									.css({
										'margin-left' : '20px',
										'margin-right' : '20px'
									})
									.appendTo(
											'.TWTToolWindow .tw2gui_window_content_pane');

							if (window == 'setting') {
								TWT.Options.setting.open();
							} else {
								TWT.Options.translate.open();
							}

						},
//						sold : {
//							open : function() {
//								TWT.Options.Windows.activateTab('TabSold')
//										.$("div.tw2gui_window_content_pane")
//										.empty();
//								TWT.Options.Windows
//										.setTitle("Vente");
//
//								var txtArea = '<div style="width:650px;margin-left:15px;margin-top:20px;height:250px;font-size:16px;text-align:justify;padding-bottom:50px;">'
//										+ '<h4 style="margin-bottom:20px;"><center>The translation\'s system of the TW Collections script has changed</center></h4>'
//										+ "TW Collections script contains just the french and english languages, if you need a different translation you must install one of the script below and reload the TW page<BR><BR>"
//										+ "<center>"
//										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/179395'>Čeština - Dr.Keeper </a><br>"
//										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/179358'>Español - pepe100 </a><br>"
//										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/179298'>German - Hanya </a><br>"
//										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/178773'>Italian - tw81 </a><br>"
//										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/180784'>Magyar - Zoltan80 </a><br>"
//										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/182959'>Slovak - Surge</a><br>"
//										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/179302'>Polish - Dun (from Darius II Mod))</a><br>"
//										+ "</center><br><br>If you want to create your own translation, you can go to <a target=\'_blanck\' href=\'http://userscripts.org/scripts/show/159370\'> the home page of the script</a> for more explanations"
//										+ '</div>';
//
//								TWT.Options.Windows
//										.appendToContentPane(txtArea);
//								TWT.Options.Windows.appendToContentPane(TWT
//										.getDunMp());
//
//							}
//						 
//						},
						translate : {
							open : function() {
								TWT.Options.Windows.activateTab('TabTranslate')
										.$("div.tw2gui_window_content_pane")
										.empty();
								TWT.Options.Windows
										.setTitle("Translations for TW Collections");

								var txtArea = '<div style="width:650px;margin-left:15px;margin-top:20px;height:250px;font-size:16px;text-align:justify;padding-bottom:50px;">'
										+ '<h4 style="margin-bottom:20px;"><center>The translation\'s system of the TW Collections script has changed</center></h4>'
										+ "TW Collections script contains just the french and english languages, if you need a different translation you must install one of the script below and reload the TW page<BR><BR>"
										+ "<center>"
										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/179395'>Čeština - Dr.Keeper </a><br>"
										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/179358'>Español - pepe100 </a><br>"
										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/179298'>German - Hanya </a><br>"
										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/178773'>Italian - tw81 </a><br>"
										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/180784'>Magyar - Zoltan80 </a><br>"
										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/182959'>Slovak - Surge</a><br>"
										+ "<a target='_blanck' href='http://userscripts.org/scripts/show/179302'>Polish - Dun (from Darius II Mod))</a><br>"
										+ "</center><br><br>If you want to create your own translation, you can go to <a target=\'_blanck\' href=\'http://userscripts.org/scripts/show/159370\'> the home page of the script</a> for more explanations"
										+ '</div>';

								TWT.Options.Windows
										.appendToContentPane(txtArea);
								TWT.Options.Windows.appendToContentPane(TWT
										.getDunMp());

							}
						},
						setting : {
							open : function() {
								TWT.Options.Windows.activateTab('TabSetting')
										.$("div.tw2gui_window_content_pane")
										.empty();
								TWT.Options.Windows
										.setTitle(TWT.LANG.Options.tab.setting);

								var save_button = new west.gui.Button(
										TWT.LANG.Options.saveButton,
										TWT.Options.save);

								var l0 = TWT.Options.createLanguage();
								var l01 = TWT.Options.createMAJ();
								var l1 = TWT.Options.getContent();

								var l2 = $('<div style="text-align:center;"/>')
										.append(save_button.getMainDiv());

								TWT.Options.Windows
										.appendToContentPane($(
												'<div id="divopts" style="font-weight: bolder;width: 683px;left:10px;" class="daily_activity-list"/>')
												.append(l0).append(l01).append(
														l1).append(l2));
								$("#divopts", TWT.Options.Windows.getMainDiv())
										.css("width: 674px;");
								TWT.Options.Windows.appendToContentPane(TWT
										.getDunMp());

							}
						},
						getContent : function() {

							var scrollbar = new west.gui.Scrollpane;
							$
									.each(
											TWT.LANG.Options.checkbox_text,
											function(key) {

												var table = new west.gui.Table(
														true)
														.setId(
																'paramtwt_table_'
																		+ key)
														.createEmptyMessage(
																'! No Parameters !')
														.addColumn(
																"settings_"
																		+ key)
														.appendToThCell(
																"head",
																"settings_"
																		+ key,
																TWT.LANG.Options.checkbox_text[key]['title'],
																"<span style='font-size:12pt;padding-left:25px;'>"
																		+ TWT.LANG.Options.checkbox_text[key]['title']
																		+ "</span>");

												$
														.each(
																TWT.LANG.Options.checkbox_text[key]['options'],
																function(i) {

																	if (i != 'lang') {

																		var checkB;

																		if ((TWT.MetaCol.finished && (key == 'collection' || i == 'listNeeded'))
																				|| ((key == 'twdbadds') && !TWT.isTWDBHere)) {
																			checkB = $(
																					"<span title='"
																							+ TWT.LANG.Options.message.indispo
																							+ "' style='color: #808080;font-style: italic;font-size:11pt;padding-left:10px;' />")
																					.append(
																							TWT.LANG.Options.checkbox_text[key]['options'][i]);

																		} else {

																			checkB = new west.gui.Checkbox()
																					.setTitle(
																							TWT.LANG.Options.checkbox_text[key]['options'][i])
																					.setLabel(
																							"<span style='font-size:11pt;padding-left:10px;'>"
																									+ TWT.LANG.Options.checkbox_text[key]['options'][i]
																									+ "</span>")
																					.setSelected(
																							TWT.Settings
																									.isChecked(key
																											+ '.'
																											+ i))
																					.setId(
																							'setting_'
																									+ key
																									+ '_'
																									+ i)
																					.getMainDiv();

																		}

																		table
																				.appendRow(
																						checkB,
																						'');

																	}

																});
												scrollbar.appendContent(table
														.getMainDiv());
											});

							$(scrollbar.getMainDiv()).css({
								"height" : "300px",
								"margin-top" : "5px;",
								"font-weight" : "normal"
							});

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

							var more_button = new west.gui.Button(
									TWT.LANG.Options.message.more,
									TWT.Options.translate.open, this, this,
									TWT.LANG.Options.message.moreTip);

							return $("<span />")
									.append(
											TWT.LANG.Options.checkbox_text.miscellaneous.options.lang
													+ " : ").append(
											TWT.Options.lang_box.getMainDiv())
									.append(more_button.getMainDiv());

						},
						createMAJ : function() {

							TWT.Options.maj_box = new west.gui.Combobox;

							TWT.Options.maj_box.addItem(0,
									TWT.LANG.Options.update.updnever);
							// TWT.Options.maj_box.addItem(3600000,"every
							// hour");
							// TWT.Options.maj_box.addItem(21600000,"every 6
							// hours");
							TWT.Options.maj_box.addItem(86400000,
									TWT.LANG.Options.update.upddaily);
							TWT.Options.maj_box.addItem(604800000,
									TWT.LANG.Options.update.updweek);

							TWT.Options.maj_box.select(ScriptUpdater
									.getInterval());

							var maj_button = $('<span title="'
									+ TWT.LANG.Options.update.checknow
									+ '" style="background-color: transparent; background-attachment: scroll; background-clip: border-box;'
									+ 'background-image: url(./images/interface/character/menuicons.jpg); background-position: 0px -250px; '
									+ 'cursor: pointer;  position: absolute; height: 25px; width: 25px; margin: 4px;" />');
							maj_button.click(function(e) {
								TWT.Options.Windows.showLoader();
								EventHandler.listen("scriptmaj.ok", function() {
									new UserMessage(
											TWT.LANG.Options.update.updok,
											UserMessage.TYPE_SUCCESS).show();
									return EventHandler.ONE_TIME_EVENT;
								});

								ScriptUpdater.forceCheck(TWT.info.idscript,
										TWT.info.version);
								TWT.Options.Windows.hideLoader();

							});

							TWT.Options.maj_box.select(ScriptUpdater
									.getInterval());

							return $("<span style='text-align:left;'/>")
									.append(
											"&nbsp;"
													+ TWT.LANG.Options.update.title
													+ " :  ").append(
											TWT.Options.maj_box.getMainDiv())
									.append(maj_button);

						},
						save : function() {
							TWT.Options.Windows.showLoader();
							var tblSave = new Array();

							$
									.each(
											TWT.LANG.Options.checkbox_text,
											function(key) {
												$
														.each(
																TWT.LANG.Options.checkbox_text[key]['options'],
																function(i) {

																	if (i != 'lang') {

																		tblSave[key
																				+ '.'
																				+ i] = $(
																				'#setting_'
																						+ key
																						+ '_'
																						+ i)
																				.hasClass(
																						"tw2gui_checkbox_checked");

																	}
																});
											});

							tblSave['miscellaneous.lang'] = TWT.Options.lang_box
									.getValue();

							ScriptUpdater.setInterval(TWT.Options.maj_box
									.getValue());

							TWT.Settings.refresh(tblSave);
							TWT.Options.Windows.hideLoader();
							new UserMessage(TWT.LANG.Options.message.message,
									UserMessage.TYPE_SUCCESS).show();

							wman.close('TWTToolWindow');

						}
					},
					MenuBox : {
						selectbox : null,
						initListener : function() {
							EventHandler.listen('miscellaneous.popupTWT',
									function() {
										$('#TWT_Icon').remove();
										TWT.MenuBox.create();
									});
						},
						create : function() {

							$('#TWT_Icon').remove();
							var a = $('<div></div>').attr({
								'class' : 'menulink',
								'title' : TWT.LANG.ToolBox.title
							}).css({
								'background-position' : '0px -100px'
							}).mouseleave(
									function() {
										$(this).css("background-position",
												"0px -100px");
									}).click(function(e) {
								TWT.MenuBox.open(e);
							});

							if (TWT.Settings
									.isChecked('miscellaneous.popupTWT')) {
								a.mouseenter(function(e) {
									$(this).css("background-position",
											"-25px -100px");
									TWT.MenuBox.open(e);
								});
							}
							var b = $('<div></div>').attr({
								'class' : 'menucontainer_bottom'
							});

							$('#ui_menubar .ui_menucontainer :first').after(
									$('<div></div>').attr({
										'class' : 'ui_menucontainer',
										'id' : 'TWT_Icon'
									}).append(a).append(b));

						},
						open : function(e) {

							if (isDefined(this.selectbox)) {

								this.selectbox.items = [];

							} else {

								this.selectbox = new west.gui.Selectbox(true);

								this.selectbox.setWidth(250).addListener(

								function(key) {

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
								var tmpArr = all["achievements"]["progress"];

								if (TWT.Settings
										.isChecked('collection.gereNewItems')) {
									$.merge(tmpArr,
											all["achievements"]["finished"]);
								}

								$
										.each(
												tmpArr,
												function(index, value) {

													var itemsImg = [];

													var rex = /<span.*?([\s\S]*?)<\/span>/gm;
													var match;
													while (match = rex
															.exec(value.meta)) {

														var val = match[1];

														var srcI = /<img.*?src="(.*?)"/
																.exec(val)[1];

														var ident = $
																.trim(value.title);

														var strManquant = "";

														var name = /<img.*?alt="(.*?)"/
																.exec(val)[1];

														var shoudBuy = (val
																.indexOf("locked") > -1);

														TWT.MetaCol.inProgress[name] = {
															shouldBuy : (val
																	.indexOf("locked") > -1),
															src : srcI,
															img : srcI
																	.match(/\S*.\/(\S*png)/)[1],
															group : ident

														};
														if (shoudBuy) {
															if (!isDefined(TWT.MetaCol.group[ident])) {
																TWT.MetaCol.group[ident] = [];

															}
															TWT.MetaCol.group[ident]
																	.push(name);
														}

													}
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
								this.erreur = "Initialisation des Collections impossible";
								ErrorLog.log(e, this.erreur);
								ErrorLog.showLog();
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

								TWT.MetaCol.inProgress = {};
								var that = this;

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
												var all = eval(data_return);
												if (all["achievements"]["progress"].length > 0
														|| TWT.Settings
																.isChecked('collection.gereNewItems')) {
													TWT.MetaCol.all = all;
													TWT.MetaCol.getMarketEC();
													TWT.MetaCol
															.populateInProgress(eval(data_return));
													TWT.MetaCol.ready = true;
												} else {
													EventHandler
															.signal('collections_finished');
													TWT.MetaCol.finished = true;
													TWT.scriptStorage
															.setItem(
																	'TWT.Cache.Metacol.finished',
																	true);

												}
											}
										});

							}
						},
						isFinished : function(name) {
							if (TWT.MetaCol.finished)
								return true;

							var item = TWT.MetaCol.inProgress[$.trim(name)];
							if (!isDefined(item)) {

								return true;
							} else if (isDefined(TWT.MetaCol.group[item.group])
									&& TWT.MetaCol.group[item.group][0] == true) {

								return true;

							} else if (!isDefined(TWT.MetaCol.group[item.group])) {
								return true;
							} else
								return false;
						},
						shouldBuy : function(name) {
							var item = TWT.MetaCol.inProgress[$.trim(name)];
							var marketed = TWT.MetaCol.marketEC[$.trim(name)];
							if (isDefined(item) && !isDefined(marketed)) {

								return item.shouldBuy;
							} else {

								return false;
							}
						},
						getBuyItems : function(name, withbr) {
							try {

								if (TWT.Settings
										.isChecked('collection.showmiss')) {
									var br = (withbr) ? "<BR>" : " - ";

									var item = TWT.MetaCol.inProgress[$
											.trim(name)];

									if (isDefined(item)) {
										var manquants = TWT.MetaCol.group[item.group];

										if (isDefined(manquants)
												&& manquants.length > 0) {
											var strManq = br;
											$.each(manquants,
													function(inD, val) {
														strManq += "[ " + val
																+ " ]" + br;
													});
											return strManq += " ";
										} else {
											return "";
										}
									}
								}
							} catch (e) {
								this.erreur = "Impossible de recenser les items manquants pour "
										+ name;
								ErrorLog.log(e, this.erreur);
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
						cbTrader : null,
						cbBid : null,
						cbCurBid : null,
						getAllAnchors : function() {
							var that = this;

							var textinput = new west.gui.Textfield().maxlength(
									12).setPlaceholder(
									TWT.LANG.collection.select).setWidth(165);

							var anchors = new west.gui.Selectbox();

							anchors.setWidth(200);
							$(anchors.elContent).css({"max-height": "270px", "width": "250px"
							, "overflow-y":'auto'});
							anchors.addItem(TWT.LANG.collection.allOpt,
									TWT.LANG.collection.allOpt);

							$.each(TWT.MetaCol.groupSorted,
									function(ind2, val) {

										anchors.addItem(val[0], val[0]);

									});

							anchors.addItem("99999", " ");

							anchors.addListener(function(e) {

								var str = "";
								textinput.setValue(e);
								var arrtmp = {};

								if (e == TWT.LANG.collection.allOpt) {
									arrtmp = TWT.MetaCol.groupSorted;
								} else {
									arrtmp[0] = [ e, TWT.MetaCol.group[e] ];
								}
								that.scrollbar.scrollToTop();
								var opt = that.getDiv(arrtmp);

								$('#showbox').html(opt);
								that.switchOff();
								return true;
							});

							textinput.click(function(e) {
								anchors.show(e);

							});

							return textinput.getMainDiv();

						},
						initTrader : function() {

							var check = west.window.shop.model
									.getTraderTimeout()
									- Math.round(new Date() / 1000);
							;

							var traderInv = west.window.shop.model._data.inventory.trader;

							if (check < 0) {

								$
										.ajax({
											url : 'game.php?window=shop_trader&mode=index',
											type : 'POST',
											dataType : 'json',
											async : false,
											success : function(data_return) {
												var all = eval(data_return);
												traderInv = all["inventory"]["trader"];
												west.window.shop.model._data.inventory.trader = all["inventory"]["trader"];
												west.window.shop.model._data.trader_timeout = all["traderTime"];
											}
										});
							}

							var traderItems = [];

							$.each(traderInv, function(i, item) {

								var obj = item.item_data;
								if (!isDefined(obj)) {
									obj = ItemManager.get(item.item_id);
								}
								traderItems[obj.name.trim()] = item;
							});
							return traderItems;

						},
						getDiv : function(what) {

							var goSearch = function(what) {
								MarketWindow.open(Character.homeTown.town_id);
								MarketWindow.showTab('buy');
								$("div.market-buy .iSearchbox input",
										MarketWindow.DOM).val(what);
								$('span.iconBut_mpb_refresh', MarketWindow.DOM)
										.click();
							};

							var traderItems = this.initTrader();

							var that = this;
							var total = 0;

							var divMain = $("<br /><table width='100%' cellpading=10 cellspacing=10  style='font-style: bold; -webkit-user-select: text !important; -khtml-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important;' />");

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
																	var td = $('<td class="achieve_list"/>');
																	var span = $("<span />");

																	var img = $("<img class='resizedImage' />");
																	img
																			.attr(
																					'src',
																					TWT.MetaCol.inProgress[val].src);

																	img
																			.attr(
																					"title",
																					TWT.LANG.collection.searchMarket);
																	img
																			.css(
																					"cursor",
																					"pointer");
																	img
																			.click(function() {
																				goSearch(val);
																			});

																	span
																			.append(
																					img)
																			.append(
																					"&nbsp;")
																			.append(
																					val);

																	if (isDefined(traderItems[val
																			.trim()])) {
																		tr
																				.addClass('hasTrader');
																		var divTrader = $('<img src="'
																				+ TWT.images.traderImg
																				+ '" style="cursor: pointer;display: inline-block;" '
																				+ 'title="'
																				+ TWT.LANG.collection.atTrader
																				+ '" />');

																		divTrader
																				.click(function() {
																					west.window.shop
																							.open()
																							.showCategory(
																									"trader");

																				});
																		span
																				.append(
																						"&nbsp;&nbsp;&nbsp;")
																				.append(
																						divTrader);

																	}
																	var item = TWT.MetaCol.marketEC[$
																			.trim(val)];
																	if (isDefined(item)) {
																		var imsell = '';
																		var sp = '';

																		if (item.auction_ends_in < 0) {
																			tr
																					.addClass('hasCurrentBid');
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
																		} else {
																			tr
																					.addClass('hasBid');
																			sp = $('&nbsp;<span '
																					+ 'title="'
																					+ TWT.LANG.collection.thEncours
																					+ '" '
																					+ 'style="background: url(\'/images/window/market/market_icons2.png\') '
																					+ 'repeat-x scroll 0 0 transparent;cursor: pointer;'
																					+ 'height: 16px; background-position: -16px 0;display: inline-block;width: 16px;"> </span>');

																		}

																		span
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
																			.append(span);
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

							$('#thliste').text(
									TWT.LANG.collection.thText.replace('%2', s)
											.replace('%3', s).replace('%1',
													total));

							return divMain;
						},
						switchOff : function() {
							var that = TWT.WindowCollection;

							if (that.cbTrader.isSelected()
									|| that.cbBid.isSelected()
									|| that.cbCurBid.isSelected()) {

								$('tr', $('#rightPane')).css('display', 'none');

								if (that.cbTrader.isSelected()) {
									$('.hasTrader', $('#rightPane')).css(
											'display', '');
								}
								if (that.cbBid.isSelected()) {
									$('.hasBid', $('#rightPane')).css(
											'display', '');
								}
								if (that.cbCurBid.isSelected()) {
									$('.hasCurrentBid', $('#rightPane')).css(
											'display', '');
								}
							} else {
								$('tr', $('#rightPane')).css('display', '');
							}

						},
						getFiltres : function() {

							this.cbTrader = new west.gui.Checkbox(
									TWT.LANG.collection.atTrader, '',
									this.switchOff)
									.setTitle(TWT.LANG.collection.atTraderTitle);
							this.cbBid = new west.gui.Checkbox(
									TWT.LANG.collection.atBid, '',
									this.switchOff)
									.setTitle(TWT.LANG.collection.atBidTitle);
							this.cbCurBid = new west.gui.Checkbox(
									TWT.LANG.collection.atCurBid, '',
									this.switchOff)
									.setTitle(TWT.LANG.collection.atCurBidTitle);

							var cbox = $('<div class="jobs_basisbox"><h3>'
									+ TWT.LANG.collection.filters
									+ '</h3></div>');

							cbox.append(this.cbTrader.getMainDiv(), '<br />',
									'<div class="jobs_divider_checkbox" />');
							cbox.append(this.cbBid.getMainDiv(), '<br />',
									'<div class="jobs_divider_checkbox" />');
							cbox.append(this.cbCurBid.getMainDiv(), '<br />');
							return cbox;

						},
						open : function() {
							this.Window = wman.open('WindowCollection',
									TWT.LANG.collection.listText).setMiniTitle(
									TWT.LANG.collection.listText).addClass(
									'tw2gui_window_notabs');

							var rightPane = $('<div id="rightPane"/>').css({
								'height' : '100%',
								'left' : '199px',
								'position' : 'absolute',
								'top' : '0px',
								'width' : '450px'
							});
							var leftPane = $('<div id="leftPane" />').css({
								'height' : '380px',
								'width' : '190px'
							});

							$('<div id="WindowCollectionBody" />')
									.append(leftPane)
									.append('<div class="jobs_divider" />')
									.append(rightPane)
									.appendTo(
											'.WindowCollection .tw2gui_window_content_pane');
							TWT.WindowCollection.Window.showLoader();

							if (!TWT.MetaCol.ready) {
								TWT.MetaCol.init();
								this.interval = setInterval(function() {
									if (TWT.MetaCol.ready)
										clearInterval(this.interval);
								}, 200);
							}

							TWT.MetaCol.getMarketEC();

							var showbox = $('<div style="max-height: 370px;"></div>');

							this.scrollbar = new west.gui.Scrollpane;
							this.scrollbar.scrollToTop();
							$(this.scrollbar.getMainDiv()).css({
								'height' : '350px',
								'top' : '5px'
							});

							this.scrollbar
									.appendContent($('<div id="showbox" align="center"></div>'));

							showbox.append(this.scrollbar.getMainDiv());

							var th = $('<div id="thliste" />');
							th.css({
								'text-align' : 'center',
								'font-weight' : 'bolder'
							});

							$('#leftPane').append(this.getAllAnchors());

							$('#leftPane').append(this.getFiltres());

							// $('<div style="text-align: left;"></div>')
							// .append(this.getAllAnchors())) ;
							$('#rightPane').append(th);
							$('#rightPane').append(showbox);

							var divMain = this.getDiv(TWT.MetaCol.groupSorted);

							$('#showbox').html(divMain);

							this.Window.hideLoader();

						}
					},
					Injecteur : {
						divsnif : [],
						methodes : [],
						winTabInjected : [],
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
						addWinTabListen : function(who, callback, tab) {
							if (!isDefined(TWT.Injecteur.winTabInjected[who
									+ '_' + tab])) {
								TWT.Injecteur.winTabInjected[who] = {
									who : who,
									tab : tab,
									callback : callback
								};
							}
						},
						startListen : function() {
							EventHandler
									.listen(
											'WINDOW_OPENED',
											function(e) {

												if (isDefined(TWT.Injecteur.winTabInjected[e])) {

													var inj = TWT.Injecteur.winTabInjected[e];
													TWT.Injecteur.detecteWin(
															inj.who,
															inj.callback,
															inj.tab);
												}

											});
						},
						detecteWin : function(who, callback, tab) {

							var u = wman.getById(who);

							if (isDefined(u)) {

								u.addEventListener(TWE('WINDOW_CLOSE'),
										function(e) {

											u.removeEventListener(
													TWE('WINDOW_TAB_CLICK'),
													callback(u));
											u.removeEventListener(
													TWE('WINDOW_CLOSE'),
													callback);
										}, u, who);
								if (isDefined(tab)) {
									u
											.addEventListener(
													TWE('WINDOW_TAB_CLICK'),
													function(e) {
														if (u.currentActiveTabId == tab) {

															callback(u);
														}
													}, u, who);
								} else {
									callback(u);
								}
							}

						},
						detecteWinOff : function(who) {

							TWT.Injecteur.winTabInjected[who] = null;

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
														ErrorLog.log(e);
													}
												});
								TWT.Injecteur.divsnif[who] = 'true';
							}
						},
						divsnifferoff : function(who) {

							$('#windows').off('DOMNodeInserted', '.' + who);
							// console.log('div sniffer off');
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

								ErrorLog.log(e, 'Erreur injection ' + id);
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

								ErrorLog.log(e, 'Erreur retauration ' + id);

							}
						},
						injectedMethods : {

							injectItemTrader : function() {
								west.window.shop.factory.createItemElement = function(
										item) {

									var newfunction = west.window.shop.factory.createItemElement;

									return function(item) {
										if (TWT.MetaCol.dirty) {
											TWT.CollectionsHandler.refresh();
										}
										var obj = item.item_data;
										var name = $.trim(obj.name);

										var divMain = newfunction.bind(this)(
												item);

										divMain.find(".TWTSuccess").remove();

										if (TWT.MetaCol.shouldBuy(name)) {
											var titre = TWT.MetaCol
													.getBuyItems(name, true);

											divMain
													.append('<img  class="TWTSuccess"'
															+ 'style="'
															+ TWT.css.styleN
															+ '" title="'
															+ TWT.LANG.collection.patchsell.title
															+ titre
															+ '" src="'
															+ TWT.images.cup
															+ '" />');

										}

										if (TWT.Settings
												.isChecked('twdbadds.addNewToShop')) {
											var inBag = Bag
													.getItemByItemId(obj.item_id);
											if (!isDefined(inBag)) {
												divMain
														.append('<img  class="TWDBcollector"'
																+ 'style="'
																+ TWT.css.styleDB
																+ '" src="'
																+ TWT.images.twdb_iconNew
																+ '" />');
											}
										}

										return divMain;
									};
								}();
							},
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
															+ TWT.css.styleT
															+ '" title="'
															+ TWT.LANG.collection.patchsell.title
															+ TWT.MetaCol
																	.getBuyItems(
																			name,
																			true)
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
														+ TWT.css.style
														+ '" title="'
														+ TWT.LANG.collection.patchsell.title
														+ " "
														+ TWT.MetaCol
																.getBuyItems(
																		e.name,
																		false)
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

									ErrorLog.log(e, 'Erreur inject market');
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
											if (!TWT.MetaCol.finished) {
												if ($(
														'#buyFilterIsCollect.tw2gui_checkbox_checked',
														MarketWindow.DOM).length > 0) {

													$(
															'p.accordion_contentRow:not(:has(.TWTSuccess))',
															MarketWindow.DOM)
															.css('display',
																	'none');
												}
											}
											// TWDB add
											if (TWT.isTWDBHere
													&& TWT.Settings
															.isChecked("twdbadds.filterBuyMarket")) {
												if ($(
														'#buyFilterIsCollect2.tw2gui_checkbox_checked',
														MarketWindow.DOM).length > 0) {

													$(
															'p.accordion_contentRow:not(:has(.TWDBcollector)):not(:has(.TWDBbuyTip))',
															MarketWindow.DOM)
															.css('display',
																	'none');
												}
											}

										} catch (e) {
											ErrorLog.log(e,
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
									ErrorLog.log('Injection Bag updater error',
											e);
								}
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
															+ TWT.css.styleT
															+ '" title="'
															+ TWT.LANG.collection.patchsell.title
															+ TWT.MetaCol
																	.getBuyItems(
																			name,
																			true)
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
					Market : {
						inject : function() {

							try {

								if (TWT.Settings
										.isChecked('collection.filterMarket')
										|| TWT.Settings
												.isChecked('twdbadds.filterBuyMarket')) {
									// TWT.Injecteur.divsniffer('marketplace-buy',
									// TWT.Market.addCheckBoxMarket);
									TWT.Injecteur
											.addWinTabListen(
													'marketplace',
													TWT.Market.addCheckBoxMarket,
													'buy');
									TWT.Injecteur
											.inject('collection.filterMarket');
								}

								return true;

							} catch (e) {
								ErrorLog.log(
										"Erreur Injection des meacute;thodes ",
										e);
								this.erreur = e;

							}

						},
						initListener : function() {

							EventHandler
									.listen(
											'collection.filterMarket',
											function() {

												if (TWT.Settings
														.isChecked('collection.filterMarket')
														|| TWT.Settings
																.isChecked('twdbadds.filterBuyMarket')) {

													TWT.Injecteur
															.addWinTabListen(
																	'marketplace',
																	TWT.Market.addCheckBoxMarket,
																	'buy'); // TWT.Injecteur.divsniffer('marketplace-buy',
													// TWT.Market.addCheckBoxMarket);

													TWT.Injecteur
															.inject('collection.filterMarket');

												} else {
													MarketWindow.Buy.updateCategory = TWT.Injecteur
															.restore('collection.filterMarket');
													// '
													// TWT.Injecteur.divsnifferoff('marketplace-buy');'

													// TWT.Injecteur.detecteWinOff('marketplace');

												}
											});
							EventHandler
									.listen(
											'twdbadds.filterBuyMarket',
											function() {

												if (TWT.Settings
														.isChecked('collection.filterMarket')
														|| TWT.Settings
																.isChecked('twdbadds.filterBuyMarket')) {
													TWT.Injecteur
															.addWinTabListen(
																	'marketplace',
																	TWT.Market.addCheckBoxMarket,
																	'buy');

													// TWT.Injecteur.divsniffer('marketplace-buy',
													// TWT.Market.addCheckBoxMarket);

													TWT.Injecteur
															.inject('collection.filterMarket');

												} else {
													MarketWindow.Buy.updateCategory = TWT.Injecteur
															.restore('collection.filterMarket');
													// TWT.Injecteur.divsnifferoff('marketplace-buy');

												}
											});

						},
						init : function() {
							TWT.Injecteur
									.init(
											'collection.filterMarket',
											'MarketWindow.Buy.updateCategory',
											TWT.Injecteur.injectedMethods.injectFilterMarket);

						},
						addCheckBoxMarket : function(div) {

							if ($('#buyFilterIsCollect').length == 0) {
								if ((!TWT.MetaCol.finished)
										&& TWT.Settings
												.isChecked("collection.filterMarket")) {
									$('.searchbox').css('margin-top', '-5px');

									TWT.Market.insertedCB = new west.gui.Checkbox(
											'<img src="'
													+ TWT.images.cup
													+ '" /> '
													+ TWT.LANG.collection.collectionFilterLabel,
											false,
											function() {
												if (this.isSelected()) {
													if (isDefined(TWT.Market.insertedCB2))
														TWT.Market.insertedCB2
																.setSelected(false);
													$(
															'p.accordion_contentRow:not(:has(.TWTSuccess))',
															MarketWindow.DOM)
															.css('display',
																	'none');
												} else {
													$(
															'p.accordion_contentRow:not(:has(.TWTSuccess))',
															MarketWindow.DOM)
															.css('display', '');
												}
											});
									TWT.Market.insertedCB.setSelected(false);
									TWT.Market.insertedCB
											.setId('buyFilterIsCollect');
									TWT.Market.insertedCB
											.setTooltip(TWT.LANG.collection.collectionFilterTip);

									$('.searchbox').append(
											TWT.Market.insertedCB.getMainDiv());
								}
							}
							if (TWT.isTWDBHere
									&& TWT.Settings
											.isChecked("twdbadds.filterBuyMarket")) { // TWDB
								// add
								if ($('#buyFilterIsCollect2').length == 0) {

									$('.searchbox').css('margin-bottom', '5px');

									TWT.Market.insertedCB2 = new west.gui.Checkbox(
											'<img src="data:image/png;base64,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"'
													+ ' style="width:18px;height:18px"/>'
													+ TWT.LANG.twdbadds.buyFilterLabel,
											false,
											function() {
												if (this.isSelected()) {
													if (isDefined(TWT.Market.insertedCB))
														TWT.Market.insertedCB
																.setSelected(false);
													$(
															'p.accordion_contentRow:not(:has(.TWDBcollector)):not(:has(.TWDBbuyTip))',
															MarketWindow.DOM)
															.css('display',
																	'none');

												} else {
													$(
															'p.accordion_contentRow:not(:has(.TWDBcollector)):not(:has(.TWDBbuyTip))',
															MarketWindow.DOM)
															.css('display', '');

												}
											});
									TWT.Market.insertedCB2.setSelected(false);
									TWT.Market.insertedCB2
											.setId('buyFilterIsCollect2');
									TWT.Market.insertedCB2
											.setTooltip(TWT.LANG.twdbadds.buyFilterTip);

									$('.searchbox')
											.append(
													TWT.Market.insertedCB2
															.getMainDiv());
								}

							}
							$('.searchbox').css('margin-bottom', '10px');

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
												'collection.gereNewItems',
												function() {
													TWT.MetaCol.ready = false;
													TWT.MetaCol.init();
													this.interval = setInterval(
															function() {
																if (TWT.MetaCol.ready)
																	clearInterval(this.interval);
															}, 200);

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
								ErrorLog.log(
										'Erreur listener CollectionHandler', e);
								throw e;
							}

						},
						init : function() {

							EventHandler.listen('inventory_dun_changed',
									TWT.CollectionsHandler.callRefresh);

							TWT.Injecteur.init('collection.patchmarket',
									'MarketWindow.getClearName',
									TWT.Injecteur.injectedMethods.injectMarket);

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

							/*
							 * TWT.Injecteur.init('collection.patchitemtrader',
							 * 'tw2widget["ItemTraderItem"].prototype.getMainDiv',
							 * TWT.Injecteur.injectedMethods.injectItemTrader);
							 */
							TWT.Injecteur
									.init(
											'collection.patchitemtrader',
											'west.window.shop.factory.createItemElement',
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
																			if (isDefined(manquants)) {
																				TWT.MetaCol.group[item.group] = TWT.MetaCol
																						.remove(
																								manquants,
																								name);

																				if (TWT.MetaCol.group[item.group].length == 0) {

																					TWT.MetaCol.group[item.group][0] = true;

																				}
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
								if (!TWT.MetaCol.finished) {

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

									}
								}
								return true;

							} catch (e) {
								ErrorLog.log(
										"Erreur Injection des meacute;thodes ",
										e);
								this.erreur = e;

							}

						}
					},
					Inventaire : {
						create : function() {
							TWT.Inventaire.attach();
						},
						attach : function() {

							EventHandler.listen("inventory_ready",
									TWT.Inventaire.addCheckBoxBag, "dblbag");

						},
						detach : function() {
							EventHandler.unlisten("inventory_ready",
									TWT.Inventaire.addCheckBoxBag, "dblbag");
							$('#bagFilterIsCollect', Inventory.DOM).remove();

						},
						searchDoublons : function(filtre) {

							var searchTxt = "";
							var searchVal = $('#inventory_search',
									Inventory.DOM).val();

							if (searchVal.lenght == 0
									|| Inventory.category != 'set') {

								searchVal = ".*";
							} else {

								searchTxt = (searchVal.lenght == 0) ? "" : " ("
										+ searchVal + ")";
							}

							var res = Bag.search(searchVal);
							$('#inventory_search', Inventory.DOM).val("");
							var doubles = [];
							var sell = 0;
							$
									.each(
											res,
											function(ind1, item) {

												if (item.obj.type != 'yield'
														&& ($
																.inArray(
																		item
																				.getType(),
																		Inventory
																				.getCategoryTypes(Inventory.category)) > -1
																|| Inventory.category == 'set' || Inventory.category == 'new')) {

													var count = item.getCount();
													if (count > 1) {

														switch (filtre) {
														case 'nosets':
															if (item.obj.set != null) {
																item = null;
															}
															break;
														case 'sellable':
															if (!item.obj.sellable) {
																item = null;
															}
															break;
														case 'auctionable':
															if (!item.obj.auctionable) {
																item = null;
															}
															break;
														default:
															break;
														}
														if (isDefined(item)) {
															doubles.push(item);
															sell += (item
																	.getSellPrice())
																	* (count - 1);
														}

													}
												} else {

												}
											});
							var lastCat = Inventory.category;

							Inventory.showSearchResult(doubles || []);

							if (TWT.Settings.isChecked('inventory.sum')) {
								$('#sumsearch', Inventory.DOM).remove();
								$('#bagFilterIsCollect', Inventory.DOM)
										.after(
												"<div  title='"
														+ sell
														+ TWT.LANG.Doublons.sellGain
														+ searchTxt
														+ "' id='sumsearch' style='text-align: center; position: inherit; z-index: 4;"
														+ "font-weight: bold; color: white; font-size: 11px; width:"
														+ "100%;top:16px; '>"
														+ sell
														+ TWT.LANG.Doublons.sellGain
														+ "</div>");
							}

						},
						searchSpeciales : function(what) {
							$('#inventory_search', Inventory.DOM).val(what);
							var res = Bag.search(what);

							Inventory.showSearchResult(res || []);
							return res;
						},
						searchbaio : function() {
							var sr = 'coton|cuir|marteau|pierre|barres de fer|bois';
							var ids = [ 704, 711, 712, 716, 747, 790 ];

							var res = Bag.search(sr);
							var baio = [];
							$.each(res, function(ind1, item) {

								if (item.obj.type == 'yield') {
									// console.log(item.obj.name);
									// console.log(item.obj.item_id);
									if ($.inArray(item.obj.item_id, ids) > -1) {
										baio.push(item);
									}

								}

							});

							Inventory.showSearchResult(baio || []);
						},
						getDetSearchBox : function() {

							if (isDefined(west.storage.ItemSetManager)) {

								var selSets = new west.gui.Selectbox();
								selSets.setWidth(200);

								$(selSets.elContent).css({"max-height": "270px",
									"width": "250px"
								, "overflow-y":'auto'});
								TWT.selAdded = [];

								selSets.addItem('all',
										TWT.LANG.collection.allOpt);
								selSets.addItem('current',
										TWT.LANG.Doublons.current);
								selSets.addItem('nosets',
										TWT.LANG.Doublons.noset);
								selSets.addItem('sellable',
										TWT.LANG.Doublons.sellable);
								selSets.addItem('auctionable',
										TWT.LANG.Doublons.auctionable);

								selSets.addListener(function(e) {
									switch (e) {
									case 'all':
										$('#inventory_search', Inventory.DOM)
												.val("");

										break;
									default:

										break;
									}
									TWT.Inventaire.searchDoublons(e);

									return true;
								});

								return selSets;

							}
							return selSets;
						},
						getSetNamesBox : function(setsCache) {

							if (isDefined(west.storage.ItemSetManager)) {

								var selSets = new west.gui.Selectbox();
								selSets.setWidth(200);

								$(selSets.elContent).css({"max-height": "270px","width": "250px"
									, "overflow-y":'auto'});
								
								TWT.selAdded = [];

								selSets.addItem('setitems',
										TWT.LANG.collection.allOpt);

								$
										.each(
												setsCache,
												function(ind2, item) {

													var itemsSet = west.storage.ItemSetManager
															.get(item.obj.set);
													if (!isDefined(TWT.selAdded[itemsSet.name])) {
														TWT.selAdded[itemsSet.name] = true;
														selSets.addItem(
																itemsSet.name,
																itemsSet.name);
													}

												});

								selSets.addListener(function(e) {

									TWT.Inventaire.searchSpeciales(e);

									return true;
								});

								return selSets;

							}
							return selSets;
						},
						addCheckBoxBag : function(div) {

							if ($('#bagFilterIsCollect', Inventory.DOM).length == 0) {

								var setsCache = Bag.search('setitems');

								setsCache.sort(function(a, b) {
									var x = west.storage.ItemSetManager
											.get(a.obj.set).name;
									var y = west.storage.ItemSetManager
											.get(b.obj.set).name;

									if (typeof x === 'string'
											&& typeof x === 'string') {

										return x.localeCompare(y);
									}
									return ((x < y) ? -1 : ((x > y) ? 1 : 0));
								});

								var selBox = TWT.Inventaire
										.getSetNamesBox(setsCache);

								var spanD = $('<div id="bagFilterIsCollect"  '
										+ 'style="display: flex; position: inherit;"/>');
								if (TWT.Settings
										.isChecked('inventory.doublons')) {

									var insertedCB = $(
											"<span title='"
													+ TWT.LANG.Doublons.tip
													+ "' id='inventory_doublons'"
													+ '" style="cursor: pointer; position: relative; margin-right: 4px;" />')
											.append(
													"<img  class='tw2gui-iconset tw2gui-icon-dollar' "
															+ " src='./images/tw2gui/pixel-vfl3z5WfW.gif' alt='' title=''>");
									insertedCB.click(function(e) {
										$('#sumsearch').remove();
										TWT.Inventaire.getDetSearchBox()
												.show(e);

									});
									// insertedCB.click(TWT.Inventaire.searchDoublons);
									spanD.append(insertedCB);
								}
								if (TWT.Settings
										.isChecked('inventory.useables')) {
									var insertedCB2 = $('<span title="'
											+ TWT.LANG.Doublons.tipuse
											+ '" id="inventory_useables"'
											+ '" style="cursor: pointer; position: relative; margin-right: 4px;">'
											+ "<img class='tw2gui-iconset tw2gui-icon-consumable' "
											+ " src='./images/tw2gui/pixel-vfl3z5WfW.gif' alt='' title=''></span>");
									insertedCB2.click(function() {
										$('#sumsearch').remove();
										TWT.Inventaire
												.searchSpeciales('useable');
									});
									spanD.append(insertedCB2);
								}

								if (TWT.Settings.isChecked('inventory.recipe')) {
									var insertedCB3 = $('<span title="'
											+ TWT.LANG.Doublons.tiprecipe
											+ '" id="inventory_recipe"'
											+ '" style="position: relative;background-color: transparent; background-attachment: scroll; background-clip: border-box; cursor: pointer; bottom: inherit; " >'
											+ '<img  src="./images/items/recipe/recipe_smith.png" width="20px" height="20px" /></span>');
									insertedCB3.click(function() {
										$('#sumsearch').remove();
										TWT.Inventaire
												.searchSpeciales('recipe');

									});
									spanD.append(insertedCB3);
								}

								if (TWT.Settings.isChecked('inventory.sets')) {

									var insertedCB4 = $('<span title="'
											+ TWT.LANG.Doublons.tipsets
											+ '" id="inventory_sets"'
											+ '" style="cursor: pointer; position: relative; margin-right: 4px;" >'
											+ "<img  style='cursor: pointer;' class='tw2gui-iconset tw2gui-icon-shirt' "
											+ " src='./images/tw2gui/pixel-vfl3z5WfW.gif' alt='' title=''></span>");

									insertedCB4.click(function(e) {
										$('#sumsearch').remove();
										selBox.show(e);

									});
									spanD.append(insertedCB4);
								}
//								var insertedCB5 = $('<span title="BAIO" id="inventory_bayo"'
//										+ '" style="cursor: pointer; position: relative; margin-right: 4px;" >'
//										+ "<img  style='cursor: pointer;' class='tw2gui-iconset tw2gui-icon-shirt' "
//										+ " src='./images/tw2gui/pixel-vfl3z5WfW.gif' alt='' title=''></span>");
//
//								insertedCB5.click(function() {
//									$('#sumsearch').remove();
//									TWT.Inventaire
//											.searchbaio();
//
//								});
//								spanD.append(insertedCB5);
								$('#bag', Inventory.DOM).after(spanD);

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
							// Player.logout();
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
							// TWT.Injecteur.addWinTabListen(/^bank-\d+/,TWT.BankFees.init,'balance');
						},
						detach : function() {
							TWT.Injecteur.divsnifferoff('wood-footer');
							// TWT.Injecteur.detecteWinOff(/^bank-\d+/);
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

							EventHandler.listen('report.dom.created',
									TWT.AllReportsDelete.addButton);

						},
						detach : function() {
							MessagesWindow.Report._initContent = TWT.AllReportsDelete.saveFunction;
							EventHandler.unlisten('report.dom.created',
									TWT.AllReportsDelete.addButton);

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

												TWT.AllReportsDelete.status_close = true;
												$('div.tw2gui_dialog_text')
														.html(
																'<p>Suppression en cours.....<br /></p><span id="sppage" />');
												$('div.tw2gui_dialog_actions')
														.css({
															'display' : 'none'
														});
												TWT.AllReportsDelete
														.delete_all();
											})
									.addButton(
											TWT.LANG.AllReportsDelete.deleteNo,

											function() {
												TWT.AllReportsDelete.status_close = false;
											}).show();
						},
						reports_id : [],
						progress_page : 1,
						delete_all : function() {
							var that = this;
							for ( var i = 0; i < MessagesWindow.Report.pageCount; i++) {
								$('#sppage')
										.html(
												'<p>Page '
														+ that.progress_page
														+ '/'
														+ MessagesWindow.Report.pageCount
														+ '</p>');

								$
										.ajax({
											url : 'game.php?window=reports&action=get_reports&h='
													+ Player.h,
											type : 'POST',
											data : {
												'folder' :MessagesWindow.Report.currentFolder,
												'page' : that.progress_page
											},
											dataType : 'json',
											async : false,
											success : function(data_return) {

												for ( var j = 0; j < data_return['reports'].length; j++) {

													that.reports_id
															.push(data_return['reports'][j]['report_id']);
												}

												that.progress_page += 1;

											}
										});

							}

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

											if (data_return['error'])
												that.status_close = false;
										}
									});

							MessagesWindow.showTab('report');

						}
					},
					getDunMp : function() {

						if (Game.worldName == 'Monde 1'
								|| Game.worldName == 'Monde 3'
								|| Game.worldName == 'Alamogordo'
								|| Game.worldName == 'Death Valley') {
							return "<div style='text-align:right;padding-right: 5px; padding-top: 15px;'><a href=\"javascript:MessagesWindow.open(\'telegram\', {insert_to: \'Dun\'})\">by Dun</a></div>";
						} else {
							if (Game.worldName == 'World 1') {
								return "<div style='text-align:right;padding-right: 5px; padding-top: 15px;'><a href=\"javascript:MessagesWindow.open(\'telegram\', {insert_to: \'Duncol\'})\">by Dun</a></div>";

							}
							return "";
						}
						;
					},
					api : function() {

						var TWApi = TheWestApi.register('TW_Collections',
								'TW Collections', TWT.info.min_gameversion,
								TWT.info.max_gameversion, 'Dun - v'
										+ TWT.info.version,
								'http://userscripts.org/scripts/show/159370');

						var set_button = new west.gui.Button(
								TWT.LANG.Options.tab.setting, function() {
									TWT.Options.open('setting');
								}, this, this, "Open the Settings page");
						var more_button = new west.gui.Button(
								TWT.LANG.Options.checkbox_text.miscellaneous.options.lang,
								function() {
									TWT.Options.open('translate');
								}, this, this, "Open the Translation tips page");

						TWApi
								.setGui($(
										"<div id='twtApiContent' style=' font-family: comic sans ms;font-size: 12pt;padding-top: 10px;text-align: right;'>"
												+ TWT.LANG.description
												+ "</div>").append(
										set_button.getMainDiv()).append(
										more_button.getMainDiv()).after(
										TWT.getDunMp()));

					}
				};
				ScriptUpdater = {
					id : null, // : TWT.info.idscript,
					version : null, // : TWT.info.version,
					scriptId : null,
					scriptCurrentVersion : null,
					scriptUpdUrl : "http://userscripts.org/scripts/source/179255.user.js",
					scriptCallbackFunction : null,
					scriptStorage : null,
					initialize : function(scriptId, scriptCurrentVersion,
							scriptCallbackFunction, scriptUseNotice,
							scriptForceNotice) {
						ScriptUpdater.scriptId = scriptId;
						ScriptUpdater.scriptCurrentVersion = scriptCurrentVersion;
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
					checkLanguages : function() {

						// Update languages
						try {

							var strLang = "";

							$
									.each(
											TWT.languages,
											function(ind, language) {

												if (isDefined(language.script)) {
													if (language.version < ScriptUpdater.scrnv[language.script]) {
														strLang += "<br><a href='http://userscripts.org/scripts/source/"
																+ language.script
																+ ".user.js'>"
																+ language.name
																+ "</a>";

													}
												}
											});

							if (strLang.length > 0) {
								ScriptUpdater.scrnv.isAJ = false;
								var parent = new west.gui.Dialog(
										TWT.LANG.Options.update.title,
										"<div><br>"
												+ TWT.LANG.Options.update.updlangmaj
												+ "<br><center>" + strLang
												+ "</center></div>")
										.setIcon(
												west.gui.Dialog.SYS_INFORMATION)
										.setModal(
												true,
												false,
												{
													bg : "http://www.the-west.fr/images/curtain_bg.png",
													opacity : 0.7
												})
										.addButton(
												'TW Collection page',
												function() {
													parent.hide();
													window
															.open(
																	"http://userscripts.org/scripts/show/"
																			+ ScriptUpdater.scriptId,
																	'_blanck');

												}).addButton('Close');

								parent.show();

							} else {
								// ScriptUpdater.scrnv.isAJ=true;

							}

						} catch (e) {
							new UserMessage(TWT.LANG.Options.update.upderror,
									UserMessage.TYPE_ERROR).show();
							ErrorLog.log('Update error', e);
						}

					},
					checkRemoteScript : function() {

						// Update
						try {

							if (TWT.DEBUG) {
								ScriptUpdater.scrnv = {
									159370 : '1.9.9', // twt
									178773 : '1.2.5', // it
									179298 : '1.0.3', // de
									179358 : '1.0.5', // es
									179302 : '1.0.7', // pl
									179395 : '1.0.5', // cz
									180784 : '1.0.5', // hu
									news : '<h4 style="margin-bottom:20px;">News : </h4>'
											+ "Added 4 new filters for duplicates in inventory:<BR>"
											+ "- <b>All</b>: Displays all duplicate from inventory<BR>"
											+ "- <b>Current search</b>: Displays duplicates from current research or current page<BR>"
											+ "- <b>Without set item</b>: Don't display items set in duplicate<BR>"
											+ "- <b>Sellable</b> : Displays only duplicate items salable<BR>"
											+ "- <b>Auctionable</b> : Displays only duplicates items salable in auction<BR><BR>"

								};
								/*
								 * ScriptUpdater.scrnv=[];
								 * ScriptUpdater.scrnv[TWT.info.idscript]='9.9.9';
								 * ScriptUpdater.scrnv[179395]='9.9.9';
								 * ScriptUpdater.scrnv['news']='' + '<h4 style="margin-bottom:20px;">News :
								 * </h4>' + "Added 4 new filters for duplicates
								 * in inventory:<BR>" + "- <b>All</b>:
								 * Displays all duplicate from inventory<BR>" + "-
								 * <b>Current search</b>: Displays duplicates
								 * from current research or current page<BR>" + "-
								 * <b>Without set item</b>: Don't display items
								 * set in duplicate<BR>" + "- <b>Sellable</b> :
								 * Displays only duplicate items salable<BR>" + "-
								 * <b>Auctionable</b> : Displays only
								 * duplicates items salable in auction<BR><BR>" ;
								 */
							}

							var gocheck = function() {

								ScriptUpdater.scrnv.isAJ = false;
								if (ScriptUpdater.scriptCurrentVersion < ScriptUpdater.scrnv[ScriptUpdater.scriptId]) {
									// ScriptUpdater.scrnv.isAJ=false;
									var strNew = ScriptUpdater.scrnv['news']
											|| '';
									var parent = new west.gui.Dialog(
											TWT.LANG.Options.update.title,
											"<div style='"
													+ ((strNew.length > 0) ? "width:650px;height:250px;"
															: "")
													+ "font-size:16px;text-align:justify;'><BR>"
													+ TWT.LANG.Options.update.updscript
													// +
													// ScriptUpdater.scrnv[ScriptUpdater.scriptId]
													+ "<div id='boxnews' style='margin-top:20px;font-size:14px;font-style: italic;'>"
													+ strNew + "</div></div>")
											.setIcon(
													west.gui.Dialog.SYS_QUESTION)
											.setModal(
													true,
													false,
													{
														bg : "http://www.the-west.fr/images/curtain_bg.png",
														opacity : 0.7
													})
											.addButton(
													'yes',
													function() {

														parent.hide();
														window
																.open(
																		"http://userscripts.org/scripts/source/"
																				+ ScriptUpdater.scriptId
																				+ ".user.js",
																		'_self');

													})
											.addButton('no', function() {

												parent.hide();

											})
											.addButton(
													'Script page',
													function() {
														parent.hide();
														window
																.open(
																		"http://userscripts.org/scripts/show/"
																				+ ScriptUpdater.scriptId,
																		'_blanck');

													});
									parent.show();

								} else {
									ScriptUpdater.scrnv.isAJ = true;
								}

								ScriptUpdater.checkLanguages();

								var date = new Date();

								ScriptUpdater.setValue("lastCheck",
										parseInt(date.getTime()));

								if (ScriptUpdater.scrnv.isAJ) {

									EventHandler.signal("scriptmaj.ok");
								}
							};

							if (TWT.DEBUG) {
								gocheck();
							} else {
								ScriptUpdater.scrnv = [];
								$
										.getScript(ScriptUpdater.scriptUpdUrl,
												gocheck);
							}

						} catch (e) {
							new UserMessage(TWT.LANG.Options.update.upderror,
									UserMessage.TYPE_ERROR).show();
							ErrorLog.log('Update error', e);
						}

					},
					getLastCheck : function() {
						return ScriptUpdater.getValue("lastCheck", 0);
					},
					getInterval : function() {
						var interval = ScriptUpdater.getValue("interval",
								604800000);
						return (typeof (interval) == "undefined" || !interval
								.toString().match(/^\d+$/)) ? 604800000
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
						if (ScriptUpdater.getInterval() > 1) {
							if ((date.getTime() - ScriptUpdater.getLastCheck()) > ScriptUpdater
									.getInterval()) {
								ScriptUpdater.checkRemoteScript();
							}
						}
					},
					forceCheck : function(scriptId, scriptVersion,
							scriptCallbackFunction) {
						ScriptUpdater.initialize(scriptId, scriptVersion,
								scriptCallbackFunction, true, false);
						ScriptUpdater.checkRemoteScript();
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
