// ==UserScript==
// @name            TW-Collections-EN Translation
// @description     English Translation - TW-Collections - see below 
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/178803*
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
					translator : 'Dun',
					idscript : '178803',
					version : '1.0.7',
					short_name : 'en',
					name : 'English',
					translation : {
					   // START OF LANGUAGE VARS
						
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
											popupTWT:'Open menu of TW Collections on mouse hover'
										}
									},
									twdbadds : {
										title : 'Clothcalc Add-on',
										options : {
											filterBuyMarket : 'Market filter : show only marked missing items (twdb add)',
											addNewToShop : 'Show new items in the shop'
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
						
						// END OF LANGUAGE VARS
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