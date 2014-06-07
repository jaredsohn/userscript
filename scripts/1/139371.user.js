// ------------------------------------------------------------------------------------------------------------------------
// Plemiona.pl 5.X Skrypt użytkowy
//
// Nazwa:      Village Preview Enhancer
// Wersja:     1.3.1.5 PL
// Autor:      Nexces (Forum Plemion)
// Dostosował: Lukasz032 (Plemiona Ś7)
//
// Tagi specjakne:
// Licencja:   Creative Commons Uznanie autorstwa - Brak komercyjnego zastosowania - Na tych samych warunkach 2.5 Polska
// Informacje: http://creativecommons.org/licenses/by-nc-sa/2.5/pl
// Support:    lvwnbrz@lykamspam.pl
//
// ------------------------------------------------------------------------------------------------------------------------
// ==UserScript==
// @name           Village Preview Enhancer
// @namespace      http://code.google.com/p/plemiona-skrypty/
// @description    Village Preview Enhancer
// @version        1.3.1.4 PL
// @license        Creative Commons 2.5 BY-NC-SA (http://creativecommons.org/licenses/by-nc-sa/2.5/pl)
// @author         Nexces (Forum Plemion)
// @contributor    Lukasz032 (Plemiona Ś7)
// @include        http://pl*.plemiona.pl/game.php*
// @include        http://pl*.plemiona.pl/staemme.php*
// @exclude        http://pl*.plemiona.pl/sid*.php*
// @exclude        http://pl*.plemiona.pl/login.php*
// ==/UserScript==
// ------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------
//
// Thanks to Zombie74 for inspiration and for very nice color palette function. (:
// Keep up the good work m8!
//
// Poprawka numer 1 (1.3.1 -> 1.3.1.1):
// POPRAWIONO:
// -> Problematyczne komunikaty o końcu sesji.
// -> Kończenie zastępstwa (prawdopodobnie, nie sprawdzane!).
// -> Linki do zastępowanych pałaców odnoszą teraz w pałac konta zastępowanego, a nie lokalnie.
// -> Poparcie zbierane jest także z kont zastępowanych.
// ZAKTUALIZOWANO:
// -> Tekst informacyjny (jak zawsze :P)
//
// Poprawki numer 2 i 3 (1.3.1.1 -> 1.3.1.3):
// DODANO:
// -> Podświetlanie aktywnej wioski.
// POPRAWIONO:
// -> Ponownie (tym razem już finalnie) problemy z końcem sesji.
// -> Wyświetlanie poparcia nie wywietla już wartości powyżej 100.
// -> Kilka błędów roboczych.
// -> Drobne zastrzeżenia Nexcesa co do tekstów wyświetlanych.
// ZAKTUALZOWANO:
// -> Tekst informacyjny (jak zawsze :P) 
//
// Poprawka numer 4 (1.3.1.3 -> 1.3.1.4):
// POPRAWIONO:
// -> Komunikaty w konsoli błędów o braku tabeli wiosek.
// ZAKTUALIZOWANO:
// -> Tekst informacyjny (jak zawsze :P)
//
// Poprawka numer 5 (1.3.1.4 -> 1.3.1.5):
// POPRAWIONO:
// -> Komunikaty w konsoli błędów o braku tabeli wiosek.
// ZAKTUALIZOWANO:
// -> Tekst informacyjny (jak zawsze :P)
//
// ------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------
// Functions listing:
//
// init()
//
// display modification functions:
// loadSettings()
// loadDynamicMenuLink()
// loadHeader()
// headerWoodUpdater()
// headerClayUpdater()
// headerIronUpdater()
// headerWorkers()
// headerSnob()
// loadProduction()
//
// background update functions:
// headerUpdater()
//
// data colectors:
// loyaltyScan()
// getWorld()
// getURL()
// getWood()
// getClay()
// getIron()
// getStorage()
// getWorkers()
// getVillageId()
// getZastepstwoId()
// getOverviewMode()
// isPA() <= stub, idea is to detect and use village navigation arrows as PA determinant
//
// raw cookie parsers:
// setValue()
// getValue()
//
// cookie helpers:
// setLoyalty()
// getLoyalty()
// loadConfigData()
// storeSettings()
//
// helpers:
// configGet()
// calcPack()
// calcSnob()
// configFormWorkersNeutralizationActivator()
//
// those probably could be merged into one...
// fillResourcesAlertColorTable()
// fillResourcesColorTable()
// fillStandardColorTable()
//
// conclusion: huge but effective... and probabaly defective... whatever...
// ------------------------------------------------------------------------------------------------------------------------




if ((typeof unsafeWindow) == "undefined") {
	unsafeWindow = window;
}
String.prototype.htmlentities = function () {
	return this.replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
unsafeWindow.villagePreviewEnhancer = {
	/* user config section */
	resourcePercentColor : '#999999',
	resourcePercentFontSize : '7pt',
	settings : {},

	/* universalConsoleLogger section */
	scriptVerbosity : 0,
	useCallTracing : false,
	useFFConsoleFirst : true,
	forceConsoleLoading : false,
	universalConsoleLoggerURL : null,
	log : function(msg, msgLvl) {if ((typeof msgLvl) == "undefined") { msgLvl = 1; }if (msgLvl <= this.scriptVerbosity) {if (this.useFFConsoleFirst) {if ((typeof console) != "undefined") {if ((typeof console.log) != "undefined") {console.log(msg);return;}}}if ((typeof unsafeWindow.universalConsoleLogger) == "undefined") {if (this.forceConsoleLoading) {if (this.universalConsoleLoggerURL == null) {return void(0);}if (this.consoleLoaderState == 0) {this.consoleLoader();this.consoleLoaderState = 1;}if (this.consoleLoaderState == 1) {this.delayedConsoleMessages.push(msg+'#delim#'+msgLvl);}if (this.consoleLoaderState == 2) {this.forceConsoleLoading = false;}}return;} else {if ((typeof unsafeWindow.universalConsoleLogger.log) == "undefined") {return;} else {if (this.consoleLoaderState == 1) {try {clearInterval(unsafeWindow.universalConsoleLoggerWait);this.delayedConsoleMessages.push(msg+'#delim#'+msgLvl);this.consoleLoaderState = 4;this.dumpDelayedMessages();} catch (e) {alert(e.description);}}unsafeWindow.universalConsoleLogger.log(msg, this.useCallTracing);}}}},
	consoleLoader : function () {try {var universalConsoleLoggerLoader = document.createElement('script');universalConsoleLoggerLoader.setAttribute('type','text/javascript');universalConsoleLoggerLoader.setAttribute('src',this.universalConsoleLoggerURL);universalConsoleLoggerLoader.setAttribute('id','universalConsoleLoggerScriptHolder');document.getElementsByTagName('head')[0].appendChild(universalConsoleLoggerLoader);universalConsoleLoggerLoader = void(0);unsafeWindow.universalConsoleLoggerWait=setInterval(" if ((typeof universalConsoleLogger)!='undefined') { try { clearInterval(unsafeWindow.universalConsoleLoggerWait); universalConsoleLogger.log('clearInterval succesful'); } catch (e) { universalConsoleLogger.log('still trying to clearInterval after loading console: '+e.description); } villagePreviewEnhancer.consoleLoaderState = 3; try { villagePreviewEnhancer.dumpDelayedMessages(); } catch (e) {} } else if (villagePreviewEnhancer.consoleLoaderState == 2) { clearInterval(unsafeWindow.universalConsoleLoggerWait); } ",500);} catch (e) {this.consoleLoaderState = 2;alert('universalConsoleLoader loading failed. (try())'+"\n"+e.description);}},
	dumpDelayedMessages : function () {try {this.log('init: '+this.delayedConsoleMessages.length+' messages pending');for (var i=0; i<this.delayedConsoleMessages.length; i++) {if (this.delayedConsoleMessages[i] != null) {this.log(this.delayedConsoleMessages[i].split('#delim#')[0], this.delayedConsoleMessages[i].split('#delim#')[1]);this.delayedConsoleMessages[i] = null;} else {this.log(i+': dumpDelayedMessages encountered `null` message');}}this.delayedConsoleMessages = new Array();this.consoleLoaderState = 3;} catch (e) {this.log(e.description);}return void(0);},
	delayedConsoleMessages : new Array(),
	consoleLoaderState : 0, // 0 - never launched, 1 - runnig, 2 - finished (console NOT loaded), 3 - finished (console loaded)
	/* endof universalConsoleLogger section */

	init : function () {
		if (!this.initDone) {
			try {
				this.log('VPE::init()', 1);
				if ((typeof document.body.tagName) != "undefined") {
					this.log('VPE::init() => Object.tagName is supported', 2);
				} else {
					this.log('VPE::init() => Object.tagName is NOT supported', 2);
				}
				this.log('VPE::init() => url: '+this.getURL(), 2);
				this.loadHeader();
				this.loadDynamicMenuLink();
				this.initDone = true;
				if (this.getOverviewMode() == 'prod') {
					this.log('VPE::init() => load production via overview mode', 1);
					this.loadProduction(true);
				} else if (document.location.href.match(/screen=overview_villages(?:&|$)/) && !this.getOverviewMode()) {
					this.log('VPE::init() => load production without PA', 1);
					this.loadProduction(false);
				}

				if (document.location.href.match(/screen=settings(?:&|$)/)) {
					this.log('VPE::init() => screen is settings', 2);
					var tables = document.getElementsByTagName('table');
					for (var i=0; i<tables.length; i++) {
						if (tables[i].className == 'vis' && tables[i].innerHTML.match(/mode=ticket/)) {
							settingsMenu = tables[i];
						}
					}
					if (settingsMenu == null) {
						this.log('VPE::init() => Could not find table with settings menu despite settings screen');
					} else {
						var settingsCell = settingsMenu.insertRow(-1).insertCell(0);
						var settingsLink = document.createElement('a');
						settingsLink.id = 'submode=villagePreviewEnhacerSettings';
						settingsLink.href = '/game.php?screen=settings&mode=settings&submode=villagePreviewEnhacerSettings';
						//settingsLink.onclick = this.displaySettingsPanel;
						settingsLink.innerHTML = 'Village Preview Enhancer';
						settingsCell.appendChild(settingsLink);
						if (document.location.href.match(/submode=villagePreviewEnhacerSettings/)) {
							var PA = document.forms.length > 1 ? true : false;
							this.log('VPE::init() => villagePreviewEnhacerSettings :: parentNode is: '+document.forms[0].parentNode.tagName, 2);
							this.log('VPE::init() => villagePreviewEnhacerSettings :: settingsMenu.rows.length is: '+settingsMenu.rows.length, 2);
							for (var i=0; i<settingsMenu.rows.length; i++) {
								if (!settingsMenu.rows[i].cells[0].innerHTML.match(settingsLink.id)) {
									settingsMenu.rows[i].cells[0].className = '';
								} else {
									settingsMenu.rows[i].cells[0].className = 'selected';
								}
							}
							var settingsSpace = document.forms[0].parentNode;
							settingsSpace.innerHTML = '';
							this.loadSettings(settingsSpace, PA);
						}
					}
				}
				if (document.location.href.match(/screen=overview(?:&|$)/)) {
					this.loyaltyScan();
				}
			} catch (e) {
				this.log('VPE::init() :: failed => '+e, 0);
			}
		}
	},

	loyaltyScan : function () {
		try {
			var tables = document.getElementsByTagName('table');
			var villageId = this.getVillageId();
			var scanTime = parseInt(parseInt(parseInt(new Date().getTime()/1000)/60)/60);
			var loyalty = null;
			for (var i=0; i< tables.length; i++) {
				if (tables[i].className == 'vis' && tables[i].rows.length == 1 && tables[i].rows[0].getElementsByTagName('th').length == 2) {
					loyalty = parseInt(tables[i].rows[0].getElementsByTagName('th')[1].innerHTML);
					this.log('VPE::loyaltyScan() => loyalty found: '+villageId+' :: '+(scanTime)+' :: '+loyalty, 1);
					break;
				}
			}
			if (loyalty == null) {
				loyalty = 100;
				this.log('VPE::loyaltyScan() => no loyalty table found, setting to: '+villageId+' :: '+(scanTime)+' :: '+loyalty, 1);
			}

			this.setLoyalty(villageId, loyalty, scanTime);

			return true;
		} catch (e) {
			this.log(e, 0);
		}
	},

	setLoyalty : function (villageId, loyalty, scanTime) {
		var data = this.getValue('VPE_LoyaltyData_'+this.getWorld());
		if (data != null) {
			eval("var reg = /"+villageId+",.*?,.*?(?:[|]|$)/;");
			if (data.match(reg)) {
				this.log('VPE::setLoyalty() => '+villageId+' loyalty was stored :: match is: `'+data.match(reg)+'`', 1);
				data = data.replace(reg,villageId+','+scanTime+','+loyalty+'|');
			} else {
				this.log('VPE::setLoyalty() => '+villageId+' loyalty was NOT stored :: search_patt: `'+reg+'`', 1);
				data = data.replace(/\|$/,'')+'|'+villageId+','+scanTime+','+loyalty;
			}
			this.log('VPE::setLoyalty() => current data: '+data, 2);
		} else {
			this.log('VPE::setLoyalty() => no loyalty data was stored', 1);
			data = villageId+','+scanTime+','+loyalty;
		}
		this.setValue('VPE_LoyaltyData_'+this.getWorld(), data);
	},
	getLoyalty : function (villageId) {
		var data = this.getValue('VPE_LoyaltyData_'+this.getWorld());
		if (data != null) {
			var reg = new RegExp(villageId+",(.*?),(.*?)(?:[|]|$)");
			if (reg.test(data)) {
				this.log('VPE::getLoyalty() => got loyalty for: '+villageId+' :: '+data.match(reg)[1]+','+data.match(reg)[2], 1);
				return data.match(reg)[1]+','+data.match(reg)[2];
			} else {
				this.log('VPE::getLoyalty() => no loyalty stored for: '+villageId, 1);
				return null;
			}
		} else {
			this.log('VPE::getLoyalty() => data read null', 1);
			return null;
		}
		return null;
	},



	/**
	 * Those below are private variables. DO NOT CHANGE THEM!
	 *
	 * Poniżej znajdują się zmienne prywatne. NIE ZMIENAJ ICH!
	 */
	storedHeaderWood : 0,
	storedHeaderClay : 0,
	storedHeaderIron : 0,
	initDone : false,
	configLoaded : false,
	standardColorPalette : new Array(),
	resourcesColorPalette : new Array(),
	resourcesAlertColorPalette : new Array(),
	standardColorPaletteFilled : false,
	resourcesColorPaletteFilled : false,
	resourcesAlertColorPaletteFilled : false,
	versionString : '1.3.1.8 (NXCore) (Poprawki Lukasz032)',
	loyaltyData : new Array(),
	loyaltyDataLoaded : false,
	settingsEmpty : false,
	setValue : function (name, value) {
		try {
			document.cookie = name + '=' + escape(value) + '; expires=' + (new Date(2020, 12, 1)).toGMTString() + ';';
		} catch (e) {
			this.log(e, 0);
		}
	},
	getValue : function (name) {
		eval('var reg = /'+name+'=(.*?)(?:;|$)/;');
		var value = document.cookie.match(reg);
		if (value) {
			var ret;
			switch (unescape(value[1])) {
				case 'true':
					ret = true;
					break;
				case 'false':
					ret = false;
					break;
				default:
					ret = unescape(value[1]);
			}
			return ret;
		}
		return null;
	},
	isPA : function () {
		// shortcut bar is a bad idea for validation...
		return true;
	},
	getWorld : function () {
		return document.URL.match(/pl(\d+)/)[1];
	},
	getURL : function () {
		this.log('VPE::getURL() => '+document.URL.match(/php\?(.*)/)[1], 1);
		return document.URL.match(/php\?(.*)/)[1];
	},
	loadDynamicMenuLink : function () {
		this.log('VPE::loadDynamicMenuLink()', 2);
		try {
			var tables = document.getElementsByTagName('table');
			for (var i=0; i<tables.length; i++) {
				if (tables[i].className == 'menu_column' && tables[i].rows[0].cells[0].innerHTML.match(/mode=profile/)) {
					// we have our table
					tables[i].insertRow(-1).insertCell(0).innerHTML = '<a href="/game.php?screen=settings&mode=settings&submode=villagePreviewEnhacerSettings">Village Preview Enhancer</a>';
					break;
				}
			}
		} catch (e) {
			this.log('VPE::loadDynamicMenuLink() => '+e), 0;
		}
	},
	loadSettings : function (container, PA) {
		if ((typeof container) == "undefined") {
			this.log('VPE::loadSettings() => no Object to attach!', 0);
			return;
		}
		try {

			//container.style.border = '1px red solid';
			container.style.width = '85%';
			var settingsForm = ' \
				<small class="grey" style="float: right">ver: '+this.versionString+'</small> \
				<h3>Ustawienia skryptu: <em>Village Preview Enhancer</em></h3> \
				<form name="villagePreviewEnhancerSettings" onsubmit="return villagePreviewEnhancer.storeSettings()" action="/game.php?screen=settings&amp;mode=settings&amp;submode=villagePreviewEnhacerSettings"> \
					<table class="vis" width="100%"> \
						<tr><th colspan="2">Ustawienia nagłówka</th></tr> \
						<tr> \
							<td><label for="displayHeaderPercentResources"'+(!PA ? 'class="grey"' : '')+'>Procentowe wyświetlanie surowców:</td> \
							<td><input type="checkbox" id="displayHeaderPercentResources" name="displayHeaderPercentResources" value="true" '+(this.configGet('displayHeaderPercentResources') ? 'checked="checked" ' : '')+''+(!PA ? ' disabled="disabled"' : '')+'/> \
						</tr> \
						<tr> \
							<td><label for="displayHeaderPercentWorkers"'+(!PA ? 'class="grey"' : '')+'>Procentowe wyświetlanie zajętości zagrody:</label></td> \
							<td><input type="checkbox" id="displayHeaderPercentWorkers" name="displayHeaderPercentWorkers" value="true" '+(this.configGet('displayHeaderPercentWorkers') ? 'checked="checked" ' : '')+''+(!PA ? ' disabled="disabled"' : '')+'/> \
						</tr> \
						<tr> \
							<td><label for="displayHeaderSnobInfo"'+(!PA ? 'class="grey"' : '')+'>Wyświetlanie informacji o szlachcie:</label></td> \
							<td><input type="checkbox" id="displayHeaderSnobInfo" name="displayHeaderSnobInfo" value="true" '+(this.configGet('displayHeaderSnobInfo') ? 'checked="checked" ' : '')+''+(!PA ? ' disabled="disabled"' : '')+'/></td> \
						</tr> \
						<tr><td colspan="2" style="background-color: transparent">&nbsp;</td></tr> \
						<tr><th colspan="2">Ustawienia przeglądu produkcji</th></tr> \
						<tr> \
							<td><label for="displayPreviewLoyalty" style="cursor: help;" title="Informacje o poparciu są szacunkowe i mogą nie mieć odzwierciedlenia w rzeczywistości. Informacja o poparciu w danej wiosce jest uzyskiwana dopiero w momencie wejścia w przegląd wioski">Informacja o poparciu*:</label></td> \
							<td><input type="checkbox" id="displayPreviewLoyalty" name="displayPreviewLoyalty" value="true" '+(this.configGet('displayPreviewLoyalty') ? 'checked="checked" ' : '')+'/></td> \
						</tr> \
						<tr> \
							<td><label for="displayPreviewPercentResources">Procentowe wyświetlanie surowców:</label></td> \
							<td><input type="checkbox" id="displayPreviewPercentResources" name="displayPreviewPercentResources" value="true" '+(this.configGet('displayPreviewPercentResources') ? 'checked="checked" ' : '')+'/></td> \
						</tr> \
						<tr> \
							<td><label for="displayPreviewPercentWorkers">Procentowe wyświetlanie zajętości zagrody:</label></td> \
							<td><input type="checkbox" id="displayPreviewPercentWorkers" name="displayPreviewPercentWorkers" value="true" '+(this.configGet('displayPreviewPercentWorkers') ? 'checked="checked" ' : '')+'/></td> \
						</tr> \
						<tr> \
							<td><label for="displayPreviewSnobInfo">Wyświetlanie informacji o szlachcie:</label></td> \
							<td><input type="checkbox" id="displayPreviewSnobInfo" name="displayPreviewSnobInfo" value="true" '+(this.configGet('displayPreviewSnobInfo') ? 'checked="checked" ' : '')+'/></td> \
						</tr> \
						<tr><td colspan="2" style="background-color: transparent">&nbsp;</td></tr> \
						<tr><th colspan="2">Opcje dla konta premium</th></tr> \
						<tr> \
							<td><label for="displayPreviewQueueFinish" style="cursor: help;" title="Wymuszenie wyświetlania kolejki budowy w jednej linii może NIE DZIAŁAĆ w każdej przeglądarce. Ustawienie wymuszania może doprowadzić do trudności w odczytaniu informacji."'+(!PA ? 'class="grey"' : '')+'>Format wyświetlania kolejki budowy*:</label></td> \
							<td> \
								<select size="1" id="displayPreviewQueueFinish" name="displayPreviewQueueFinish"'+(!PA ? ' disabled="disabled"' : '')+'> \
									<option value="standard" '+(this.configGet('displayPreviewQueueFinish') == 'standard' ? 'selected="selected"' : '')+'>standardowy</option> \
									<option value="try_inline" '+(this.configGet('displayPreviewQueueFinish') == 'try_inline' ? 'selected="selected"' : '')+'>spróbuj w jednej linii</option> \
									<option value="force_inline" '+(this.configGet('displayPreviewQueueFinish') == 'force_inline' ? 'selected="selected"' : '')+'>wymuś w jednej linii</option> \
									<option value="none" '+(this.configGet('displayPreviewQueueFinish') == 'none' ? 'selected="selected"' : '')+'>ukryj informację o czasie zakończenia</option> \
								</select> \
							</td> \
						</tr> \
						<tr> \
							<td><label for="displayPreviewQueueVisibility"'+(!PA ? 'class="grey"' : '')+'>Widoczność kolumny z kolejką budowy:</label></td> \
							<td> \
								<select size="1" id="displayPreviewQueueVisibility" name="displayPreviewQueueVisibility"'+(!PA ? ' disabled="disabled"' : '')+'> \
									<option value="visible" '+(this.configGet('displayPreviewQueueVisibility') == 'visible' ? 'selected="selected"' : '')+'>zawsze widoczna</option> \
									<option value="auto" '+(this.configGet('displayPreviewQueueVisibility') == 'auto' ? 'selected="selected"' : '')+'>ukryj gdy pusta</option> \
									<option value="hide" '+(this.configGet('displayPreviewQueueVisibility') == 'hide' ? 'selected="selected"' : '')+'>zawsze ukrywaj</option> \
								</select> \
							</td> \
						</tr> \
						<tr> \
							<td><label for="displayPreviewTechVisibility"'+(!PA ? 'class="grey"' : '')+'>Widoczność kolumny z badaniami:</label></td> \
							<td> \
								<select size="1" id="displayPreviewTechVisibility" name="displayPreviewTechVisibility"'+(!PA ? ' disabled="disabled"' : '')+'> \
									<option value="visible" '+(this.configGet('displayPreviewTechVisibility') == 'visible' ? 'selected="selected"' : '')+'>zawsze widoczna</option> \
									<option value="auto" '+(this.configGet('displayPreviewTechVisibility') == 'auto' ? 'selected="selected"' : '')+'>ukryj gdy pusta</option> \
									<option value="hide" '+(this.configGet('displayPreviewTechVisibility') == 'hide' ? 'selected="selected"' : '')+'>zawsze ukrywaj</option> \
								</select> \
							</td> \
						</tr> \
						<tr> \
							<td><label for="displayPreviewRecruitVisibility"'+(!PA ? 'class="grey"' : '')+'>Widoczność kolumny z rekrutacją:</label></td> \
							<td> \
								<select size="1" id="displayPreviewRecruitVisibility" name="displayPreviewRecruitVisibility"'+(!PA ? ' disabled="disabled"' : '')+'> \
									<option value="visible" '+(this.configGet('displayPreviewRecruitVisibility') == 'visible' ? 'selected="selected"' : '')+'>zawsze widoczna</option> \
									<option value="auto" '+(this.configGet('displayPreviewRecruitVisibility') == 'auto' ? 'selected="selected"' : '')+'>ukryj gdy pusta</option> \
									<option value="hide" '+(this.configGet('displayPreviewRecruitVisibility') == 'hide' ? 'selected="selected"' : '')+'>zawsze ukrywaj</option> \
								</select> \
							</td> \
						</tr> \
						<tr><td colspan="2" style="background-color: transparent">&nbsp;</td></tr> \
						<tr><th colspan="2">Ustawienia dodatkowe</th></tr> \
						<tr> \
							<td><label for="useColorBlindPalette" style="cursor: help;" title="Użycie palety kolorów dla daltonistów zmienia przejście podświetlenia z `zielony &raquo; czerowny` na `żółty &raquo; niebieski`">Użyj palety kolorów dla daltonistów*:</label></td> \
							<td><input type="checkbox" id="useColorBlindPalette" name="useColorBlindPalette" value="true" '+(this.configGet('useColorBlindPalette') ? 'checked="checked" ' : '')+'/></td> \
						</tr> \
						<tr> \
							<td><label for="displayPreviewWorkersFlashOnOverfill" style="cursor: help;" title="Powoduje mruganie tła podświetlenia procentowego zagrody gdy w zagrodzie jest więcej ludności niż ta może pomieścić">Mrugaj gdy zagroda przepełniona*:</label></td> \
							<td> \
								<input type="checkbox" id="displayPreviewWorkersFlashOnOverfill" name="displayPreviewWorkersFlashOnOverfill" value="true" '+(this.configGet('displayPreviewWorkersFlashOnOverfill') ? 'checked="checked" ' : '')+'/> \
								<input type="text" id="displayPreviewWorkersFlashOnOverfillDelay" name="displayPreviewWorkersFlashOnOverfillDelay" size="2" maxlength="2" value="'+parseInt(this.configGet('displayPreviewWorkersFlashOnOverfillDelay'))+'" /><small><em>wartość w sekundach pomiędzy zmianami stanu</em></small> \
							</td> \
						</tr> \
						<tr> \
							<td><label for="displayPreviewResourcesAlert" style="cursor: help;" title="Zmienia podświetlenie danego surowca jeżeli jest poniżej podanej granicy procentowej. Podświetlenie zmienia się `zielony &raquo niebieski` im bliżej zerowej wartości surowca. Wartość procentowa powinna znajdować się w przedziale 5-90">Oznaczaj spadek surowców poniżej wartości procentowej*:</label></td> \
							<td> \
								<input type="checkbox" id="displayPreviewResourcesAlert" name="displayPreviewResourcesAlert" value="true" '+(this.configGet('displayPreviewResourcesAlert') ? 'checked="checked" ' : '')+'/> \
								<input type="text" id="displayPreviewResourcesAlertTreshold" name="displayPreviewResourcesAlertTreshold" size="2" maxlength="2" value="'+parseInt(this.configGet('displayPreviewResourcesAlertTreshold'))+'" /> \
							</td> \
						</tr> \
						<tr><td colspan="2" style="background-color: transparent"></td></tr> \
						<tr> \
							<td><label for="displayPreviewFullWorkersNeutralization" style="cursor: help;">Zmień podświetlenie maksymalnie rozbudowanej zagrody:</label></td> \
							<td> \
								<input \
									type="checkbox" \
									id="displayPreviewFullWorkersNeutralization" \
									name="displayPreviewFullWorkersNeutralization" \
									value="true" \
									onchange="villagePreviewEnhancer.configFormWorkersNeutralizationActivator(this.checked);" \
									'+(this.configGet('displayPreviewFullWorkersNeutralization') ? 'checked="checked" ' : '')+' \
								/></td> \
						</tr> \
						<tr> \
							<td><label for="displayPreviewFullWorkersNeutralizationTreshold">Ilość wolnych miejsc poniżej której zmienić podświetlenie:</label></td> \
							<td><input type="text" id="displayPreviewFullWorkersNeutralizationTreshold" name="displayPreviewFullWorkersNeutralizationTreshold" size="5" maxlength="5" value="'+parseInt(this.configGet('displayPreviewFullWorkersNeutralizationTreshold'))+'" /></td> \
						</tr> \
						<tr><td colspan="2"> \
							<input type="radio" id="displayPreviewFullWorkersNeutralizationMarkTypePercent" name="displayPreviewFullWorkersNeutralizationMarkType" value="percent" '+(this.configGet('displayPreviewFullWorkersNeutralizationMarkTypePercent') ? 'checked="checked" ' : '')+'/> \
							<input type="text" id="displayPreviewFullWorkersNeutralizationMarkValuePercent" name="displayPreviewFullWorkersNeutralizationMarkValuePercent" size="6" maxlength="2" value="'+parseInt(this.configGet('displayPreviewFullWorkersNeutralizationMarkValuePercent'))+'" /> \
							<label for="displayPreviewFullWorkersNeutralizationMarkTypePercent">Kolor z palety kolorów z podświetlania zagrody (wartość procentowa koloru 0-100)</label> \
							<br />\
							<input type="radio" id="displayPreviewFullWorkersNeutralizationMarkTypeColor" name="displayPreviewFullWorkersNeutralizationMarkType" value="color" '+(this.configGet('displayPreviewFullWorkersNeutralizationMarkTypeColor') ? 'checked="checked" ' : '')+'/> \
							<input type="text" id="displayPreviewFullWorkersNeutralizationMarkValueColor" name="displayPreviewFullWorkersNeutralizationMarkValueColor" size="6" maxlength="6" value="'+(this.configGet('displayPreviewFullWorkersNeutralizationMarkValueColor'))+'" /> \
							<label for="displayPreviewFullWorkersNeutralizationMarkTypeColor">Kolor w formacie hexadecymalnym (np. FFFFFF to biały)</label> \
						</td></tr> \
						\
						<tr><td colspan="2" style="background-color: transparent"></td></tr> \
						<tr><td colspan="2"><input type="submit" value="Zapisz ustawienia" /></td></tr> \
						<tr><td colspan="2" style="background-color: transparent"</td></tr> \
						<tr><td colspan="2"><em>*) Opcje oznaczone gwiazdką posiadają podpowiedzi.</em></td></tr> \
						<tr> \
							<td><label for=""> </label></td> \
							<td> </td> \
						</tr> \
					</table> \
				</form> \
			';
			container.innerHTML = settingsForm;
			this.configFormWorkersNeutralizationActivator(this.configGet('displayPreviewFullWorkersNeutralization'));
			//return;


		} catch (e) {
			this.log(e, 0);
		}
	},
	storeSettings : function () {
		try {
			var sForm = document.forms[0].elements;
			this.log('VPE::storeSettings() => '+(sForm.length), 2);

			var displayPreviewResourcesAlertTreshold = parseInt(document.getElementById('displayPreviewResourcesAlertTreshold').value);
			if (document.getElementById('displayPreviewResourcesAlert').checked && (displayPreviewResourcesAlertTreshold < 5 || displayPreviewResourcesAlertTreshold > 90)) {
				this.log('VPE::storeSettings() => displayPreviewResourcesAlertTreshold :: validation ERROR', 2)
				alert('Wprowadzono nieprawidłową wartość w polu "Oznaczaj spadek surowców poniżej %".\nWartość powinna znajdować się w przedziale 5-90.');
				return false;
			} else {
				this.log('VPE::storeSettings() => displayPreviewResourcesAlertTreshold :: validation OK', 2)
			}
			if (document.getElementById('displayPreviewFullWorkersNeutralization').checked) {
				if (!document.getElementById('displayPreviewFullWorkersNeutralizationTreshold').value.match(/^\d{1,5}$/)) {
					alert('Wprowadzono nieprawidłową wartość w polu "Ilość wolnych miejsc poniżej której zmienić podświetlenie".');
					return false;
				}
				if (document.getElementById('displayPreviewFullWorkersNeutralizationMarkTypeColor').checked && !document.getElementById('displayPreviewFullWorkersNeutralizationMarkValueColor').value.match(/^[0-9ABCDEF]{6}$/)) {
					alert('Wprowadzono nieprawidłową wartość w polu "Kolor w formacie hexadecymalnym".');
					return false;
				} else if (document.getElementById('displayPreviewFullWorkersNeutralizationMarkTypePercent').checked && !document.getElementById('displayPreviewFullWorkersNeutralizationMarkValuePercent').value.match(/^\d{1,3}$/)) {
					alert('Wprowadzono nieprawidłową wartość w polu "Kolor z palety kolorów z podświetlania zagrody".');
					return false;
				}
				if (!document.getElementById('displayPreviewFullWorkersNeutralizationMarkTypeColor').checked && !document.getElementById('displayPreviewFullWorkersNeutralizationMarkTypePercent').checked) {
					alert('Nie wybrano formatu oznaczania zapełnienia zagrody');
					return false;
				}
			}

			if (document.getElementById('displayPreviewWorkersFlashOnOverfill').checked && !document.getElementById('displayPreviewWorkersFlashOnOverfillDelay').value.match(/^\d+$/)) {
				alert('Wprowadzono nieprawidłowy interwał zmiany stanu przy mruganiu przepełnienia zagrody');
				return false;
			}


			var new_settings = new Array();
			for (var i=0; i<sForm.length; i++) {
				this.log('VPE::storeSettings() => formElement['+i+']; name: ('+(typeof sForm[i].name)+')`'+sForm[i].name+'`, id: `'+sForm[i].id+'`, value: `'+sForm[i].value+'`', 3);
				if (sForm[i].name != '') {
					if (sForm[i].value == '') {
						sForm[i].value = '';
					}
					if (sForm[i].value == 'NaN') {
						sForm[i].value = 0;
					}
					if (sForm[i].type == 'checkbox' || sForm[i].type == 'radio') {
						sForm[i].value = sForm[i].checked;
					}
					new_settings.push(sForm[i].id+','+sForm[i].value);
				}
			}
			new_settings = new_settings.join('|');
			this.log('VPE::storeSettings() => new_settings: '+new_settings, 1);
			this.setValue('VPE_Settings_'+this.getWorld(), new_settings);
			document.location.reload();
		} catch (e) {
			this.log('VPE::storeSettings() => '+e, 0);
			return false;
		}
		return false;
	},
	configFormWorkersNeutralizationActivator : function (obj) {
		this.log('VPE::configFormWorkersNeutralizationActivator() => called with: '+obj, 2);
		var active=obj;
		document.getElementById('displayPreviewFullWorkersNeutralizationTreshold').disabled=!active;
		document.getElementById('displayPreviewFullWorkersNeutralizationMarkTypePercent').disabled=!active;
		document.getElementById('displayPreviewFullWorkersNeutralizationMarkValuePercent').disabled=!active;
		document.getElementById('displayPreviewFullWorkersNeutralizationMarkTypeColor').disabled=!active;
		document.getElementById('displayPreviewFullWorkersNeutralizationMarkValueColor').disabled=!active;
	},

	configGet : function (setting) {
		this.loadConfigData();
		if (!this.settingsEmpty) {
			if (setting == 'displayPreviewWorkersFlashOnOverfillDelay' && isNaN(parseInt(this.settings[setting]))) {
				return 1;
			}
			return this.settings[setting];
		} else {
			this.setValue('VPE_Settings_'+this.getWorld(), 'displayHeaderPercentResources,false|displayHeaderPercentWorkers,false|displayHeaderSnobInfo,false|displayPreviewLoyalty,true|displayPreviewPercentResources,false|displayPreviewPercentWorkers,true|displayPreviewSnobInfo,true|displayPreviewQueueFinish,standard|displayPreviewQueueVisibility,visible|displayPreviewTechVisibility,visible|displayPreviewRecruitVisibility,visible|useColorBlindPalette,false|displayPreviewWorkersFlashOnOverfill,false|displayPreviewWorkersFlashOnOverfillDelay,0|displayPreviewResourcesAlert,true|displayPreviewResourcesAlertTreshold,40|displayPreviewFullWorkersNeutralization,false|displayPreviewFullWorkersNeutralizationTreshold,0|displayPreviewFullWorkersNeutralizationMarkTypePercent,false|displayPreviewFullWorkersNeutralizationMarkValuePercent,0|displayPreviewFullWorkersNeutralizationMarkTypeColor,false|displayPreviewFullWorkersNeutralizationMarkValueColor,false');
			this.loadConfigData();
			return this.settings[setting];
		}
	},
	loadConfigData : function () {
		if (!this.configLoaded) {
			var new_settings = this.getValue('VPE_Settings_'+this.getWorld());
			this.log('VPE::loadConfigData() => ('+(typeof new_settings)+') '+new_settings, 1);
			if (new_settings != null) {
				this.log('VPE::loadConfigData() => '+new_settings, 1);
				new_settings = new_settings.split('|');
				for (var i=0; i<new_settings.length; i++) {
					var setting = new_settings[i].split(',');
					switch (setting[1]) {
						case 'true':
							setting[1] = true;
							break;
						case 'false':
							setting[1] = false;
							break;
					}
					this.settings[setting[0]] = setting[1];
				}
				this.settingsEmpty = false;
			} else {
				this.settingsEmpty = true;
			}
			this.configLoaded=true;
		}
	},

	loadHeader : function () {
		try {
			// do we have header?
			if ((typeof document.getElementById('wood')) != 'undefined' && (typeof document.getElementById('stone')) != 'undefined' && (typeof document.getElementById('iron')) != 'undefined') {
				// yes we have (:
				this.log('VPE::loadHeader() => got header', 1);

				if (this.configGet('displayHeaderPercentResources')) {
					this.headerUpdater();
					unsafeWindow.setInterval('villagePreviewEnhancer.headerUpdater()', 500);
				}

				if (this.configGet('displayHeaderPercentWorkers')) {
					this.headerWorkers();
				}
				if (this.configGet('displayHeaderSnobInfo')) {
					this.headerSnob();
				}

			} else {
				this.log('VPE::loadHeader() => no header here :: bailing out', 1);
			}
		} catch (e) {
			this.log(e, 0);
		}
	},

	loadProduction : function (PA) {
		try {
			if (!PA) {
				this.log('VPE::loadProduction() => PA not enabled', 1);
				var vList;
				var tt = document.getElementsByTagName('table');
				vList = tt[(tt.length-1)];
				if (vList.rows.length == 1) {
					vList = tt[(tt.length-2)];
				}
				this.log('VPE::loadProduction() => vList found ('+vList.rows.length+')', 2);
			} else {
				var vList = document.getElementById('overview').parentNode.getElementsByTagName('table');
			}
			for (var i=0; i<vList.length; i++) {
				if (vList[i].rows[0].getElementsByTagName('th').length > 1) {
					vList = vList[i];
					break;
				}
			}
			if (this.getURL().match(/sid/)) {
        return false
      }
      if ((typeof document.getElementsByTagName("h2")[0]) != "undefined") {
        var sid_cont = document.getElementsByTagName("h2")[0].innerHTML
        if (sid_cont.match(/Sesja/)) {
          return false
        }
      }
			if (this.configGet('displayPreviewPercentResources') || this.configGet('displayPreviewPercentWorkers')) {
				// let's do the color table before entering any loops... should save some time (:
				this.fillStandardColorTable();
				this.fillResourcesColorTable();
				if (this.configGet('displayPreviewResourcesAlert')) {
					var treshold = parseInt(this.configGet('displayPreviewResourcesAlertTreshold'));
					this.log('VPE::loadProduction() => alert palette requested :: trehsold is: ('+(typeof treshold)+') `'+treshold+'`', 1);
					if (isNaN(treshold) || treshold < 5 || treshold > 90) {
						treshold = 0;
					} else {
						this.log('VPE::loadProduction() => calling VPE::fillAlertColorTable()', 1);
						this.fillResourcesAlertColorTable();
					}
				} else {
					var treshold = 0;
				}
			}
			vList.style.width = '100%';
			vList.deleteRow(0);
			var sumWood = 0;
			var sumClay = 0;
			var sumIron = 0;
			var sumStorage = 0;
			var sumWorkers = new Array(0,0);
			var sumPacks = 0;
			var sumSnobs = new Array(0,0);
			var colQueueEmpty = true;
			var colTechEmpty = true;
			var colRecruitEmpty = true;


			for (var i=0; i<vList.rows.length; i++) {
				var row = vList.rows[i];
				var storage = parseInt(row.cells[3].innerHTML);
				var villageId = parseInt(row.cells[0].innerHTML.match(/village=(\d+)/i)[1]);
				row.cells[1].style.textAlign = 'right';
				if (this.configGet('displayPreviewLoyalty')) {
					var loyalty = row.insertCell(2);
					loyalty.style.textAlign = 'right';
					var storedLoyalty = this.getLoyalty(villageId);
					if (storedLoyalty != null) {
						storedLoyalty = storedLoyalty.split(',');
						var vLoyaltyT = storedLoyalty[0];
						var vLoyaltyL = storedLoyalty[1];
					} else {
						var vLoyaltyT = null;
						var vLoyaltyL = null;
					}
					if (vLoyaltyT == null || vLoyaltyL == null) {
						loyalty.innerHTML = '<small class="grey" style="cursor:help" title="Wejdź do przeglądu wioski aby uzyskać aktualne informacje o poparciu">???</small>';
					} else {
						var now = parseInt(parseInt(parseInt(new Date().getTime()/1000)/60)/60);
						var diff = now - vLoyaltyT;
						vLoyaltyL = vLoyaltyL > 99 ? 100 : (parseInt(vLoyaltyL)+diff);
						if (vLoyaltyL > 100) {
						  vLoyaltyL = 100
						}
						loyalty.innerHTML = '<small class="grey" style="cursor:help" title="Ostatnie sprawdzanie: '+diff+' godzin temu">'+vLoyaltyL+'</small>';
					}

				}
				var oldResourcesIndex = this.configGet('displayPreviewLoyalty') ? 3 : 2;
				woodCol = row.insertCell(oldResourcesIndex+1);
				clayCol = row.insertCell(oldResourcesIndex+2);
				ironCol = row.insertCell(oldResourcesIndex+3);
				woodCol.style.textAlign = clayCol.style.textAlign = ironCol.style.textAlign = 'right';
				woodCol.innerHTML = row.cells[oldResourcesIndex].innerHTML.match(/holz\.png.*?>(.*?)<img/i)[1];
				var rWood = parseInt(woodCol.innerHTML.replace(/<.*?>/gi,'').replace('.',''));
				sumWood += rWood;
				clayCol.innerHTML = row.cells[oldResourcesIndex].innerHTML.match(/lehm\.png.*?>(.*?)<img/i)[1];
				var rClay = parseInt(clayCol.innerHTML.replace(/<.*?>/gi,'').replace('.',''));
				sumClay += rClay;
				ironCol.innerHTML = row.cells[oldResourcesIndex].innerHTML.match(/eisen\.png.*?>(.*?)$/i)[1];
				var rIron = parseInt(ironCol.innerHTML.replace(/<.*?>/gi,'').replace('.',''));
				sumIron += rIron;
				if (this.configGet('displayPreviewPercentResources')) {
					woodPCol = row.insertCell(oldResourcesIndex+1);
					clayPCol = row.insertCell(oldResourcesIndex+3);
					ironPCol = row.insertCell(oldResourcesIndex+5);
					var woodP = Math.round((parseInt(woodCol.innerHTML.replace(/<.*?>/gi,'').replace('.',''))*100)/storage);
					woodPCol.innerHTML = '<small>'+woodP+'%</small>';
					if (woodP < treshold) {
						this.log('VPE::loadProduction() => '+villageId+'::Wood is using resourcesAlertColorPalette with index: '+(treshold-woodP)+' :: value is: `'+this.resourcesAlertColorPalette[(treshold-woodP)]+'`', 2);
						woodPCol.style.backgroundColor = this.resourcesAlertColorPalette[(treshold-woodP)];
					} else {
						woodPCol.style.backgroundColor = this.resourcesColorPalette[woodP-treshold];
					}
					woodPCol.style.color = '#FFFFFF';

					var clayP = Math.round((parseInt(clayCol.innerHTML.replace(/<.*?>/gi,'').replace('.',''))*100)/storage);
					clayPCol.innerHTML = '<small>'+clayP+'%</small>';
					if (clayP < treshold) {
						this.log('VPE::loadProduction() => '+villageId+'::Clay is using resourcesAlertColorPalette with index: '+(treshold-clayP)+' :: value is: `'+this.resourcesAlertColorPalette[(treshold-clayP)]+'`', 2);
						clayPCol.style.backgroundColor = this.resourcesAlertColorPalette[(treshold-clayP)];
					} else {
						clayPCol.style.backgroundColor = this.resourcesColorPalette[(clayP-treshold)];
					}
					clayPCol.style.color = '#FFFFFF';

					var ironP = Math.round((parseInt(ironCol.innerHTML.replace(/<.*?>/gi,'').replace('.',''))*100)/storage);
					ironPCol.innerHTML = '<small>'+ironP+'%</small>';
					if (ironP < treshold) {
						this.log('VPE::loadProduction() => '+villageId+'::Iron is using resourcesAlertColorPalette with index: '+(treshold-ironP)+' :: value is: `'+this.resourcesAlertColorPalette[(treshold-ironP)]+'`', 2);
						ironPCol.style.backgroundColor = this.resourcesAlertColorPalette[(treshold-ironP)];
					} else {
						ironPCol.style.backgroundColor = this.resourcesColorPalette[ironP-treshold];
					}
					ironPCol.style.color = '#FFFFFF';
					woodPCol.style.textAlign = clayPCol.style.textAlign = ironPCol.style.textAlign = 'right';
				} else {
					woodCol.colSpan = '2';
					clayCol.colSpan = '2';
					ironCol.colSpan = '2';
				}

				var storageIndex = 6;
				if (this.configGet('displayPreviewLoyalty')) {
					storageIndex += 1;
				}
				if (this.configGet('displayPreviewPercentResources')) {
					storageIndex += 3;
				}
				row.cells[storageIndex].colSpan = '2';
				row.cells[storageIndex].style.textAlign = 'right';
				sumStorage += parseInt(row.cells[storageIndex].innerHTML);

				var oldWorkersIndex = 7;
				if (this.configGet('displayPreviewLoyalty')) {
					oldWorkersIndex += 1;
				}
				if (this.configGet('displayPreviewPercentResources')) {
					oldWorkersIndex += 3;
				}
				var workers = row.cells[oldWorkersIndex].innerHTML.match(/(\d+)\/(\d+)/);
				sumWorkers[0] += parseInt(workers[1]);
				sumWorkers[1] += parseInt(workers[2]);
				row.cells[oldWorkersIndex].style.textAlign = 'right';
				row.cells[oldWorkersIndex].innerHTML = workers[1]+'&nbsp;<span class="grey">/</span>&nbsp;'+workers[2];
				row.cells[oldWorkersIndex].style.padding = '0px 5px';
				if (this.configGet('displayPreviewPercentWorkers')) {
					var workersP = Math.round((workers[1]*100)/workers[2]);
					if (workersP > 100) {
						var overfill = true;
					} else {
						var overfill = false;
					}
					workersP = workersP > 100 ? 100 : workersP;
					var workersPCol = row.insertCell(oldWorkersIndex);
					workersPCol.innerHTML = '<small>'+workersP+'%</small>';

					if (!overfill) {
						if (this.configGet('displayPreviewFullWorkersNeutralization') && workers[2] >= 24000) {
							this.log('VPE::loadProduction() => workers hightlight neutralization ('+villageId+')', 2);
							if (this.configGet('displayPreviewFullWorkersNeutralizationTreshold') > (workers[2]-workers[1])) {
								this.log('VPE::loadProduction() => workers highlight neutralization ('+villageId+') => neutralization required', 2);

								if (this.configGet('displayPreviewFullWorkersNeutralizationMarkTypePercent')) {
									this.log('VPE::loadProduction() => workers highlight neutralization ('+villageId+') => neutralizatiing with standardColorPalette('+this.configGet('displayPreviewFullWorkersNeutralizationMarkValuePercent')+')', 2);
									workersPCol.style.backgroundColor = this.standardColorPalette[this.configGet('displayPreviewFullWorkersNeutralizationMarkValuePercent')];
								} else if (this.configGet('displayPreviewFullWorkersNeutralizationMarkTypeColor')) {
									this.log('VPE::loadProduction() => workers highlight neutralization ('+villageId+') => neutralizatiing with user color #'+this.configGet('displayPreviewFullWorkersNeutralizationMarkValueColor')+'', 2);
									workersPCol.style.backgroundColor = '#'+this.configGet('displayPreviewFullWorkersNeutralizationMarkValueColor');
								} else {
									workersPCol.style.backgroundColor = this.standardColorPalette[workersP];
								}
							} else {
								workersPCol.style.backgroundColor = this.standardColorPalette[workersP];
								this.log('VPE::loadProduction() => workers neutralization not required for: '+villageId, 2);
							}
						} else {
							workersPCol.style.backgroundColor = this.standardColorPalette[workersP];
						}
					} else {
						if (this.configGet('displayPreviewWorkersFlashOnOverfill')) {
							workersPCol.id = 'workers_'+villageId;
							unsafeWindow.setInterval('villagePreviewEnhancer.flashWorkersOverfill("'+workersPCol.id+'")', this.configGet('displayPreviewWorkersFlashOnOverfillDelay')*1000);
							workersPCol.style.backgroundColor = this.standardColorPalette[100];
						} else {
							workersPCol.style.backgroundColor = this.standardColorPalette[100];
						}

					}
					workersPCol.style.textAlign = 'right';
					workersPCol.style.color = '#FFFFFF';
				} else {
					row.cells[oldWorkersIndex].colSpan = '2';
				}

				if (PA) {
					if (this.configGet('displayPreviewQueueVisibility') != 'none') {
						if (this.configGet('displayPreviewQueueFinish') != 'standard') {
							var queue = row.cells[(row.cells.length-3)].innerHTML.replace(/\r|\n|\t/g,'');
							if (queue.match(/[<br(..)?>]/im)) {
								switch (this.configGet('displayPreviewQueueFinish')) {
									case 'try_inline':
										row.cells[(row.cells.length-3)].innerHTML = queue.replace(/(.*)<br(..)?>(.*)/i,'<span style="float: right; clear: left;">$1</span> <span style="float: left;">$3</span>');
										break;
									case 'force_inline':
										row.cells[(row.cells.length-3)].innerHTML = queue.replace(/(.*)<br(..)?>(.*)/i,'<span style="float: left;">$3</span>$1');
										row.cells[(row.cells.length-3)].style.textAlign='right';
										row.cells[(row.cells.length-3)].style.whiteSpace='nowrap';
										row.cells[(row.cells.length-3)].style.width='auto';
										break;
									case 'none':
										row.cells[(row.cells.length-3)].innerHTML = queue.replace(/.*?<br(..)?>/i,'');
										break;
									default:
										this.log('VPE::loadProduction() => queue config error!', 0);
								}
							}
						}
					}
					if (row.cells[(row.cells.length-3)].innerHTML.length > 0) {
						colQueueEmpty = false;
					}
					if (row.cells[(row.cells.length-2)].innerHTML.length > 0) {
						colTechEmpty = false;
					}
					if (row.cells[(row.cells.length-1)].innerHTML.length > 0) {
						colRecruitEmpty = false;
					}
				}
				if (this.configGet('displayPreviewSnobInfo')) {
					var snobInfoIndex = PA ? row.cells.length-3 : row.cells.length;
					var packCol = row.insertCell(snobInfoIndex);
					var pack = this.calcPack(rWood, rClay, rIron);
					var zast = this.getZastepstwoId();
					if (zast != false) {
            var zastU = "&amp;t=" + zast;
          } else {
            var zastU = "";
          };
					packCol.innerHTML = '<a href="/game.php?village='+villageId+'&amp;screen=snob'+zastU+'">'+pack+'</a>';
					packCol.style.cursor = 'help';
					packCol.title = 'Ilość możliwych monet do wybicia: '+pack;
					packCol.style.textAlign = 'right';
					packCol.style.padding = '0px 5px';
					sumPacks += pack;
					var snobCol = row.insertCell(snobInfoIndex+1);
					var workersLeft = (workers[2]-workers[1]) < 0 ? 0 : workers[2]-workers[1];
					var snob = this.calcSnob(rWood, rClay, rIron, workersLeft);
					snobCol.innerHTML = '<a href="/game.php?village='+villageId+'&amp;screen=snob'+zastU+'">'+snob[0]+'</a> / <span class="grey" title="Ilość szlachciców do zrekrutowania z surowców: '+snob[1]+'">'+snob[1]+'</span>';
					snobCol.style.cursor = 'help';
					snobCol.title = 'Ilość szlachciców do zrekrutowania: '+snob[0];
					snobCol.style.textAlign = 'right';
					snobCol.style.padding = '0px 5px';
					sumSnobs[0] += snob[0];
					sumSnobs[1] += snob[1];

				}
				//row.cells[(row.cells.length)]
				row.cells[oldResourcesIndex].style.display='none';

			}

			// header (:
			// why that huge? ask IE7 :P
			var header = vList.insertRow(0);
			header.style.height = '25px';
			var vName = document.createElement('th');
			vName.innerHTML = 'Wioska';
			vName.style.backgroundImage = this.CUL;
			vName.style.backgroundPosition = 'left top';
			vName.style.backgroundRepeat = 'no-repeat';
			header.appendChild(vName);
			var vPts = document.createElement('th');
			vPts.innerHTML = 'P.';
			header.appendChild(vPts);
			if (this.configGet('displayPreviewLoyalty')) {
				var vLoyalty = document.createElement('th');
				vLoyalty.innerHTML = '<img src="/graphic/ally_rights/lead.png" />';
				vLoyalty.style.backgroundImage = this.CUR;
				vLoyalty.style.backgroundPosition = 'right top';
				vLoyalty.style.backgroundRepeat = 'no-repeat';
				header.appendChild(vLoyalty);
			} else {
				vPts.style.backgroundImage = this.CUR;
				vPts.style.backgroundPosition = 'right top';
				vPts.style.backgroundRepeat = 'no-repeat';
			}
			var vWoodP = document.createElement('th');
			vWoodP.innerHTML = '<img src="/graphic/holz.png" />';
			vWoodP.style.backgroundImage = this.CUL;
			vWoodP.style.backgroundPosition = 'left top';
			vWoodP.style.backgroundRepeat = 'no-repeat';
			header.appendChild(vWoodP);
			var vWood = document.createElement('th');
			vWood.innerHTML = 'Drewno';
			vWood.style.backgroundImage = this.CUR;
			vWood.style.backgroundPosition = 'right top';
			vWood.style.backgroundRepeat = 'no-repeat';
			header.appendChild(vWood);

			var vClayP = document.createElement('th');
			vClayP.innerHTML = '<img src="/graphic/lehm.png" />';
			vClayP.style.backgroundImage = this.CUL;
			vClayP.style.backgroundPosition = 'left top';
			vClayP.style.backgroundRepeat = 'no-repeat';
			header.appendChild(vClayP);
			var vClay = document.createElement('th');
			vClay.innerHTML = 'Glina';
			vClay.style.backgroundImage = this.CUR;
			vClay.style.backgroundPosition = 'right top';
			vClay.style.backgroundRepeat = 'no-repeat';
			header.appendChild(vClay);

			var vIronP = document.createElement('th');
			vIronP.innerHTML = '<img src="/graphic/eisen.png" />';
			vIronP.style.backgroundImage = this.CUL;
			vIronP.style.backgroundPosition = 'left top';
			vIronP.style.backgroundRepeat = 'no-repeat';
			header.appendChild(vIronP);
			var vIron = document.createElement('th');
			vIron.innerHTML = 'Żelazo';
			vIron.style.backgroundImage = this.CUR;
			vIron.style.backgroundPosition = 'right top';
			vIron.style.backgroundRepeat = 'no-repeat';
			header.appendChild(vIron);

			var vStorageP = document.createElement('th');
			vStorageP.innerHTML = '<img src="/graphic/res.png" />';
			vStorageP.style.backgroundImage = this.CUL;
			vStorageP.style.backgroundPosition = 'left top';
			vStorageP.style.backgroundRepeat = 'no-repeat';
			header.appendChild(vStorageP);
			var vStorage = document.createElement('th');
			vStorage.innerHTML = 'Max.';
			vStorage.style.backgroundImage = this.CUR;
			vStorage.style.backgroundPosition = 'right top';
			vStorage.style.backgroundRepeat = 'no-repeat';
			header.appendChild(vStorage);

			var vWorkersP = document.createElement('th');
			vWorkersP.innerHTML = '<img src="/graphic/face.png" />';
			vWorkersP.style.backgroundImage = this.CUL;
			vWorkersP.style.backgroundPosition = 'left top';
			vWorkersP.style.backgroundRepeat = 'no-repeat';
			header.appendChild(vWorkersP);
			var vWorkers = document.createElement('th');
			vWorkers.innerHTML = 'Zagroda';
			vWorkers.style.backgroundImage = this.CUR;
			vWorkers.style.backgroundPosition = 'right top';
			vWorkers.style.backgroundRepeat = 'no-repeat';
			header.appendChild(vWorkers);

			if (this.configGet('displayPreviewSnobInfo')) {
				var vPack = document.createElement('th');
				vPack.innerHTML = '<img src="/graphic/gold.png" />';
				vPack.style.backgroundImage = this.CUL;
				vPack.style.backgroundPosition = 'left top';
				vPack.style.backgroundRepeat = 'no-repeat';
				header.appendChild(vPack);
				var vSnob = document.createElement('th');
				vSnob.innerHTML = '<img src="/graphic/unit/unit_snob.png" />';
				vSnob.style.backgroundImage = this.CUR;
				vSnob.style.backgroundPosition = 'right top';
				vSnob.style.backgroundRepeat = 'no-repeat';
				header.appendChild(vSnob);
			}

			if (PA) {
				var vQueue = document.createElement('th');
				vQueue.innerHTML = 'Budowa';
				vQueue.style.backgroundImage = this.CUL;
				vQueue.style.backgroundPosition = 'left top';
				vQueue.style.backgroundRepeat = 'no-repeat';
				header.appendChild(vQueue);
				var vTech = document.createElement('th');
				vTech.innerHTML = 'Tech.';
				header.appendChild(vTech);
				var vRecruit = document.createElement('th');
				vRecruit.innerHTML = 'Rekrutacja';
				vRecruit.style.backgroundImage = this.CUR;
				vRecruit.style.backgroundPosition = 'right top';
				vRecruit.style.backgroundRepeat = 'no-repeat';
				header.appendChild(vRecruit);
			}
			for (var i=0; i<header.cells.length; i++) {
				header.cells[i].style.textAlign = 'center';
				header.cells[i].style.padding = '0px 5px';
			}

			// footer (:
			var footer = vList.insertRow(-1);
			footer.style.height = '25px';
			var vGen = document.createElement('th');
			vGen.style.backgroundImage = this.CDL;
			vGen.style.backgroundPosition = 'left bottom';
			vGen.style.backgroundRepeat = 'no-repeat';
			vGen.style.padding = '0';
			vGen.style.lineHeight = '25px';
			if (this.configGet('displayPreviewLoyalty')) {
				vGen.colSpan = '3';
			} else {
				vGen.colSpan = '2';
			}
			var temp = document.createElement('div');
			temp.style.cssFloat = 'right';
			temp.style.height = '26px';
			temp.style.width = '100%';
			temp.style.backgroundImage = this.CDR;
			temp.style.backgroundPosition = 'right bottom';
			temp.style.backgroundRepeat = 'no-repeat';
			temp.style.marginRight = '-5px';
			temp.style.paddingRight = '5px';
			temp.innerHTML = 'Informacje ogółem';

			vGen.appendChild(temp);
			footer.appendChild(vGen);

			var fWoodP = document.createElement('th');
			fWoodP.innerHTML = '<img src="/graphic/holz.png" />';
			fWoodP.style.backgroundImage = this.CDL;
			fWoodP.style.backgroundPosition = 'left bottom';
			fWoodP.style.backgroundRepeat = 'no-repeat';
			footer.appendChild(fWoodP);
			var fWood = document.createElement('th');
			if (sumWood > 1000000) {
				fWood.innerHTML = Math.round(sumWood/10000)/100+'<br /><small class="grey">Mln.</small>';
			} else {
				fWood.innerHTML = '<span style="line-height: 25px;">'+sumWood+'</span>';
			}
			fWood.style.backgroundImage = this.CDR;
			fWood.style.backgroundPosition = 'right bottom';
			fWood.style.backgroundRepeat = 'no-repeat';
			footer.appendChild(fWood);

			var fClayP = document.createElement('th');
			fClayP.innerHTML = '<img src="/graphic/lehm.png" />';
			fClayP.style.backgroundImage = this.CDL;
			fClayP.style.backgroundPosition = 'left bottom';
			fClayP.style.backgroundRepeat = 'no-repeat';
			footer.appendChild(fClayP);
			var fClay = document.createElement('th');
			if (sumClay > 1000000) {
				fClay.innerHTML = Math.round(sumClay/10000)/100+'<br /><small class="grey">Mln.</small>';
			} else {
				fClay.innerHTML = '<span style="line-height: 25px;">'+sumClay+'</span>';
			}
			fClay.style.backgroundImage = this.CDR;
			fClay.style.backgroundPosition = 'right bottom';
			fClay.style.backgroundRepeat = 'no-repeat';
			footer.appendChild(fClay);

			var fIronP = document.createElement('th');
			fIronP.innerHTML = '<img src="/graphic/eisen.png" />';
			fIronP.style.backgroundImage = this.CDL;
			fIronP.style.backgroundPosition = 'left bottom';
			fIronP.style.backgroundRepeat = 'no-repeat';
			footer.appendChild(fIronP);
			var fIron = document.createElement('th');
			if (sumIron > 1000000) {
				fIron.innerHTML = Math.round(sumIron/10000)/100+'<br /><small class="grey">Mln.</small>';
			} else {
				fIron.innerHTML = '<span style="line-height: 25px;">'+sumIron+'</span>';
			}
			fIron.style.backgroundImage = this.CDR;
			fIron.style.backgroundPosition = 'right bottom';
			fIron.style.backgroundRepeat = 'no-repeat';
			footer.appendChild(fIron);

			var fStorage = document.createElement('th');
			fStorage.style.backgroundImage = this.CDL;
			fStorage.style.backgroundPosition = 'left bottom';
			fStorage.style.backgroundRepeat = 'no-repeat';
			fStorage.colSpan = '2';
			var temp = document.createElement('div');
			temp.style.width = '100%';
			temp.style.height = '26px';
			temp.style.backgroundImage = this.CDR;
			temp.style.backgroundPosition = 'right bottom';
			temp.style.backgroundRepeat = 'no-repeat';
			temp.style.marginRight = '-5px';
			temp.style.paddingRight = '5px';
			if (sumStorage > 1000000) {
				temp.innerHTML = Math.round(sumStorage/10000)/100+'<br /><small class="grey">Mln.</small>';
			} else {
				temp.innerHTML = '<span style="line-height: 25px;">'+sumStorage+'</span>';
			}
			fStorage.appendChild(temp);
			footer.appendChild(fStorage);

			var fWorkers = document.createElement('th');
			fWorkers.style.backgroundImage = this.CDL;
			fWorkers.style.backgroundPosition = 'left bottom';
			fWorkers.style.backgroundRepeat = 'no-repeat';
			fWorkers.colSpan = '2';
			var temp = document.createElement('div');
			temp.style.width = '100%';
			temp.style.height = '26px';
			temp.style.lineHeight = '25px';
			temp.style.backgroundImage = this.CDR;
			temp.style.backgroundPosition = 'right bottom';
			temp.style.backgroundRepeat = 'no-repeat';
			temp.style.marginRight = '-5px';
			temp.style.paddingRight = '5px';
			temp.style.whiteSpace = 'nowrap';
			temp.innerHTML = Math.round(sumWorkers[0])+'<span class="grey"> / </span>'+Math.round(sumWorkers[1]);
			fWorkers.appendChild(temp);
			footer.appendChild(fWorkers);

			if (this.configGet('displayPreviewSnobInfo')) {
				var fPacks = document.createElement('th');
				fPacks.innerHTML = sumPacks;
				fPacks.style.backgroundImage = this.CDL;
				fPacks.style.backgroundPosition = 'left bottom';
				fPacks.style.backgroundRepeat = 'no-repeat';
				footer.appendChild(fPacks);
				var fSnobs = document.createElement('th');
				fSnobs.innerHTML = sumSnobs[0]+'<span class="grey">/'+sumSnobs[1]+'</span>';
				fSnobs.style.whiteSpace = 'nowrap';
				fSnobs.style.backgroundImage = this.CDR;
				fSnobs.style.backgroundPosition = 'right bottom';
				fSnobs.style.backgroundRepeat = 'no-repeat';
				footer.appendChild(fSnobs);
			}
			if (PA) {
				if ((this.configGet('displayPreviewQueueVisibility') != 'none' && this.configGet('displayPreviewTechVisibility') != 'none' && this.configGet('displayPreviewRecruitVisibility') != 'none') || (!colQueueEmpty && !colTechEmpty && !colRecruitEmpty)) {
					var fOrders = document.createElement('th');
					fOrders.style.backgroundImage = this.CDL;
					fOrders.style.backgroundPosition = 'left bottom';
					fOrders.style.backgroundRepeat = 'no-repeat';
					fOrders.colSpan = '3';
					var temp = document.createElement('div');
					temp.style.width = '100%';
					temp.style.height = '26px';
					temp.style.lineHeight = '25px';
					temp.style.backgroundImage = this.CDR;
					temp.style.backgroundPosition = 'right bottom';
					temp.style.backgroundRepeat = 'no-repeat';
					temp.style.marginRight = '-5px';
					temp.style.paddingRight = '5px';
					temp.style.whiteSpace = 'nowrap';
					temp.innerHTML ='Zlecenia';
					fOrders.appendChild(temp);
					footer.appendChild(fOrders);
				}
			}
			for (var i=0; i<footer.cells.length; i++) {
				footer.cells[i].style.textAlign = 'right';
				footer.cells[i].style.padding = '0px 5px';
				footer.cells[i].style.height = '25px';
			}
			if (PA) {
				fOrders.style.textAlign = 'center';
			}
			vGen.style.textAlign = 'center';

		} catch (e) {
			this.log(e, 0);
		}
	},

	flashWorkersOverfill : function (cellId) {
		try {
			var cell = document.getElementById(cellId);
			this.log('VPE::flashWorkersOverfill() => flashing: '+cellId+' background is: '+cell.style.backgroundColor, 4);
			if (cell.style.backgroundColor == this.standardColorPalette[100]) {
				cell.style.backgroundColor = 'transparent';
				cell.style.color = '#000000';
			} else {
				cell.style.backgroundColor = this.standardColorPalette[100];
				cell.style.color = '#FFFFFF';
			}
		} catch (e) {
			this.log('VPE::flashWorkersOverfill() => '+e, 1);
		}
	},
	headerUpdater : function () {
		this.headerWoodUpdater();
		this.headerClayUpdater();
		this.headerIronUpdater();
	},
	headerWoodUpdater : function () {
		try {
			var currentHeaderCapacity = parseInt(document.getElementById('storage').innerHTML);
			var currentHeaderWood = parseInt(document.getElementById('wood').innerHTML.match(/\d+/)[0]);
			if (currentHeaderWood != this.storedHeaderWood) {
				this.storedHeaderWood = currentHeaderWood;
				var woodP = Math.round((currentHeaderWood*100)/currentHeaderCapacity);
				if (document.getElementById('wood_percent') == null) {
					var woodPspan = document.createElement('span');
					woodPspan.id = 'wood_percent';
					woodPspan.style.color = this.resourcePercentColor;
					woodPspan.style.fontSize = this.resourcePercentFontSize;
					document.getElementById('wood').parentNode.appendChild(woodPspan);
				} else {
					var woodPspan = document.getElementById('wood_percent');
				}
				woodPspan.innerHTML = '('+woodP+'%)&nbsp;';
			}
		} catch (e) {
			this.log(e, 0);
		}
		return false;
	},
	headerClayUpdater : function () {
		try {
			var currentHeaderCapacity = parseInt(document.getElementById('storage').innerHTML);
			var currentHeaderClay = parseInt(document.getElementById('stone').innerHTML.match(/\d+/)[0]);
			if (currentHeaderClay != this.storedHeaderClay) {
				this.storedHeaderClay = currentHeaderClay;
				var clayP = Math.round((currentHeaderClay*100)/currentHeaderCapacity);
				if (document.getElementById('clay_percent') == null) {
					var clayPspan = document.createElement('span');
					clayPspan.id = 'clay_percent';
					clayPspan.style.color = this.resourcePercentColor;
					clayPspan.style.fontSize = this.resourcePercentFontSize;
					document.getElementById('stone').parentNode.appendChild(clayPspan);
				} else {
					var clayPspan = document.getElementById('clay_percent');
				}
				clayPspan.innerHTML = '('+clayP+'%)&nbsp;';
			}
		} catch (e) {
			this.log(e, 0);
		}
		return false;
	},
	headerIronUpdater : function () {
		try {
			var currentHeaderCapacity = parseInt(document.getElementById('storage').innerHTML);
			var currentHeaderIron = parseInt(document.getElementById('iron').innerHTML.match(/\d+/)[0]);
			if (currentHeaderIron != this.storedHeaderIron) {
				this.storedHeaderIron = currentHeaderIron;
				var ironP = Math.round((currentHeaderIron*100)/currentHeaderCapacity);
				if (document.getElementById('iron_percent') == null) {
					var ironPspan = document.createElement('span');
					ironPspan.id = 'iron_percent';
					ironPspan.style.color = this.resourcePercentColor;
					ironPspan.style.fontSize = this.resourcePercentFontSize;
					document.getElementById('iron').parentNode.appendChild(ironPspan);
				} else {
					var ironPspan = document.getElementById('iron_percent');
				}
				ironPspan.innerHTML = '('+ironP+'%)&nbsp;';
			}
		} catch (e) {
			this.log(e, 0);
		}
		return false;
	},
	headerWorkers : function () {
		try {
			var tables = document.getElementsByTagName('table');
			for (var i=0; i<tables.length; i++) {
				if (tables[i].className == 'navi-border' && tables[i].rows.length == 1 && tables[i].innerHTML.match(/face\.png/)) {
					workers = tables[i].rows[0].cells[0].getElementsByTagName('table')[0].rows[0].cells[1].innerHTML.match(/(\d+)\/(\d+)/);
					workersP = Math.round((parseInt(workers[1])*100)/parseInt(workers[2]));
					var workersPspan = document.createElement('span');
					workersPspan.style.color = this.resourcePercentColor;
					workersPspan.style.fontSize = this.resourcePercentFontSize;
					workersPspan.innerHTML = ' ('+workersP+'%)';
					tables[i].rows[0].cells[0].getElementsByTagName('table')[0].rows[0].cells[1].appendChild(workersPspan);
					break;
				}
			}
		} catch(e) {
			this.log(e, 0);
		}
	},
	headerSnob : function () {
		try {
			var headerBar = document.getElementById('storage').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			var wood = document.getElementById
			var newCell = headerBar.insertCell(-1);
			var pack = this.calcPack(this.getWood(), this.getClay(), this.getIron());
			var workersLeft = (this.getWorkers().limit-this.getWorkers().current);
			workersLeft = workersLeft < 0 ? 0 : workersLeft;
			var snob = this.calcSnob(this.getWood(), this.getClay(), this.getIron(), workersLeft);
			var snob_data = '<td align="center"><img src="/graphic/gold.png" style="cursor:help;" title="Ilość możliwych monet do wybicia: '+pack+'"></td><td align="center"><a href="/game.php?village='+this.getVillageId()+'&amp;screen=snob">&nbsp;'+pack+'&nbsp;</a></td><td align="center"><img src="/graphic/unit/unit_snob.png" style="cursor:help;" title="Ilość możliwych szlachciów do zrekrutowania: '+snob[0]+'"></td><td align="center"><a href="/game.php?village='+this.getVillageId()+'&amp;screen=snob">&nbsp;'+snob[0]+'</a><span class="grey" title="Ilość możliwych szlachciów do zrekrutowania z surowców: '+snob[1]+'" style="cursor: help"> / '+snob[1]+'</span></td>';
			newCell.innerHTML = '<table class="navi-border" style="border-collapse: collapse;"><tr><td><table class="box" cellspacing="0"><tr height="20">'+snob_data+'</tr></table></td></tr></table>';
		} catch (e) {
			this.log(e, 0);
		}
	},


	/* helpers */
	calcPack : function (wood, clay, iron) {
		switch (this.getWorld()) {
			case 1:
			case 2:
			case 10:
			case 15:
			case 21:
			case 23:
			case 24:
				/* pack price: 20000, 30000, 25000 */
				var pack = Math.floor(Math.min(wood/20000, (Math.min(clay/30000, iron/25000))));
				break;
			default:
				/* coin price: 28000, 30000, 25000 */
				var pack = Math.floor(Math.min(wood/28000, (Math.min(clay/30000, iron/25000))));
		}
		return pack;
	},
	calcSnob : function (wood, clay, iron, workers) {
		var snob = new Array();
		switch (this.getWorld()) {
			case 1:
			case 2:
			case 10:
			case 15:
			case 21:
			case 23:
				/* snob price: 28000, 30000, 25000 */
				snob[0] = Math.floor(Math.min((workers)/100, Math.min(wood/28000, (Math.min(clay/30000, iron/25000)))));
				snob[1] = Math.floor(Math.min(wood/28000, (Math.min(clay/30000, iron/25000))));
				break;
			case 24:
				/* snob price: 20000, 30000, 25000 */
				snob[0] = Math.floor(Math.min((workers)/100, Math.min(wood/20000, (Math.min(clay/30000, iron/25000)))));
				snob[1] = Math.floor(Math.min(wood/20000, (Math.min(clay/30000, iron/25000))));
				break;
			default:
				/* snob price: 40000, 50000, 50000 */
				snob[0] = Math.floor(Math.min((workers)/100, Math.min(wood/40000, (Math.min(clay/50000, iron/50000)))));
				snob[1] = Math.floor(Math.min(wood/40000, (Math.min(clay/50000, iron/50000))));
		}
		return snob;
	},
	getWood : function () {
		return parseInt(document.getElementById('wood').innerHTML);
	},
	getClay : function () {
		return parseInt(document.getElementById('stone').innerHTML);
	},
	getIron : function () {
		return parseInt(document.getElementById('iron').innerHTML);
	},
	getStorage : function () {
		return parseInt(document.getElementById('storage').innerHTML);
	},
	getWorkers : function () {
		var tables = document.getElementsByTagName('table');
		for (var i=0; i<tables.length; i++) {
			if (tables[i].className == 'navi-border' && tables[i].rows.length == 1 && tables[i].innerHTML.match(/face\.png/)) {
				workers = tables[i].rows[0].cells[0].getElementsByTagName('table')[0].rows[0].cells[1].innerHTML.match(/(\d+)\/(\d+)/);
				return { current : workers[1], limit : workers[2] };
			}
		}
	},
	getVillageId : function () {
		//return this.getURL().match(/village=(\d+)/)[1];
		var tables = document.getElementsByTagName('table');
		for (var i=0; i<tables.length; i++) {
			if (tables[i].innerHTML.match(/village=(\d+)&amp;screen=overview_villages/)) {
				return tables[i].innerHTML.match(/village=(\d+)&amp;screen=overview_villages/)[1];
			}
		}
	},
	getOverviewMode : function () {
		if (document.getElementById('overview') == null) {
			return false;
		} else {
			return document.getElementById('overview').value;
		}
	},
	getZastepstwoId : function () {
    if (this.getURL().match(/t=(\d+)/)) {
      return this.getURL().match(/t=(\d+)/)[1]
    } else {
      return false
    }
  },
	fillResourcesAlertColorTable : function () {
		if (!this.resourcesAlertColorPaletteFilled) {
			this.log('VPE::fillResourcesAlertColorTable()', 1);
			try {
				var treshold = parseInt(this.configGet('displayPreviewResourcesAlertTreshold'));
				if (isNaN(treshold) || treshold < 5 || treshold > 90) {
					treshold = 0;
					return;
				}
				var steps = treshold+1;
				if (this.configGet("useColorBlindPalette")) {
					var step = Math.round(255/steps)-1;
					var colorR = 255;
					var colorG = 255;
					var colorB = 0;

					for(var c=0; c<=steps; c++) {
						var farbeR = (colorR - step * c).toString(16);
						var farbeG = (colorG - step * c).toString(16);
						var farbeB = (colorB + step * c).toString(16);

						if(farbeR.length == 1) {
							farbeR = "0" + farbeR;
						}
						if(farbeG.length == 1) {
							farbeG = "0" + farbeG;
						}
						if(farbeB.length == 1) {
							farbeB = "0" + farbeB;
						}

						this.resourcesAlertColorPalette[c] = "#" + farbeR + farbeG + farbeB;
					}
				} else {
					var step = Math.round(255/steps)-1;
					var colorR = 0;
					var colorG = 255;
					var colorB = 0;

					for(c=0; c<=steps; c++) {
						var farbeR = "00"
						var farbeG = (colorG - step * c).toString(16);
						var farbeB = (colorR + step * c).toString(16);

						if(farbeR.length == 1) {
							farbeR = "0" + farbeR;
						}
						if(farbeG.length == 1) {
							farbeG = "0" + farbeG;
						}
						if(farbeB.length == 1) {
							farbeB = "0" + farbeB;
						}

						this.resourcesAlertColorPalette[c] = "#" + farbeR + farbeG + farbeB;
					}
				}
				this.resourcesAlertColorPaletteFilled = true;
			} catch (e) {
				this.log(e, 0);
			}
		}
	},

	fillResourcesColorTable : function () {
		if (!this.resourcesColorPaletteFilled) {
			this.log('VPE::fillResourcesColorTable()', 1);
			try {
				if (this.configGet('displayPreviewResourcesAlert')) {
					var treshold = parseInt(this.configGet('displayPreviewResourcesAlertTreshold'));
					if (isNaN(treshold) || treshold < 5 || treshold > 90) {
						treshold = 0;
					}
				} else {
					var treshold = 0;
				}
				var steps = 100-treshold;
				var step = Math.round(255/steps)-1;
				if (this.configGet("useColorBlindPalette")) {
					var colorR = 255;
					var colorG = 255;
					var colorB = 0;

					for(var c=0; c<=steps; c++) {
						var farbeR = (colorR - step * c).toString(16);
						var farbeG = (colorG - step * c).toString(16);
						var farbeB = (colorB + step * c).toString(16);

						if(farbeR.length == 1) {
							farbeR = "0" + farbeR;
						}
						if(farbeG.length == 1) {
							farbeG = "0" + farbeG;
						}
						if(farbeB.length == 1) {
							farbeB = "0" + farbeB;
						}

						this.resourcesColorPalette[c] = "#" + farbeR + farbeG + farbeB;
					}
				} else {
					var colorR = 0;
					var colorG = 255;
					var colorB = 255;

					for(c=0; c<=steps; c++) {
						var farbeR = (colorR + step * c).toString(16);
						var farbeG = (colorG - step * c).toString(16);
						var farbeB = "00"

						if(farbeR.length == 1) {
							farbeR = "0" + farbeR;
						}
						if(farbeG.length == 1) {
							farbeG = "0" + farbeG;
						}

						this.resourcesColorPalette[c] = "#" + farbeR + farbeG + farbeB;
					}
				}
				this.resourcesColorPaletteFilled = true;
			} catch (e) {
				this.log(e, 0);
			}
		}
	},

	fillStandardColorTable : function () {
		if (!this.standardColorPaletteFilled) {
			this.log('VPE::fillStandardColorTable()', 1);
			try {
				var steps = 100;
				if (this.configGet("useColorBlindPalette")) {
					var step = Math.round(255/steps)-1;
					var colorR = 255;
					var colorG = 255;
					var colorB = 0;

					for(var c=0; c<=steps; c++) {
						var farbeR = (colorR - step * c).toString(16);
						var farbeG = (colorG - step * c).toString(16);
						var farbeB = (colorB + step * c).toString(16);

						if(farbeR.length == 1) {
							farbeR = "0" + farbeR;
						}
						if(farbeG.length == 1) {
							farbeG = "0" + farbeG;
						}
						if(farbeB.length == 1) {
							farbeB = "0" + farbeB;
						}

						this.standardColorPalette[c] = "#" + farbeR + farbeG + farbeB;
					}
				} else {
					var step = Math.round(255/steps)-1;
					var colorR = 0;
					var colorG = 255;
					var colorB = 255;


					for(c=0; c<=steps; c++) {
						var farbeR = (colorR + step * c).toString(16);
						var farbeG = (colorG - step * c).toString(16);
						var farbeB = "00"

						if(farbeR.length == 1) {
							farbeR = "0" + farbeR;
						}
						if(farbeG.length == 1) {
							farbeG = "0" + farbeG;
						}

						this.standardColorPalette[c] = "#" + farbeR + farbeG + farbeB;
					}
				}
				this.standardColorPaletteFilled = true;
			} catch (e) {
				this.log(e, 0);
			}
		}
	},
	/* images (: */
	CUL : 'url(data:image/gif;base64,R0lGODlhDAAMAPciAPXnxPboxfPlwvPlwezcuObUr+LQq+DNp9/MpvfpxvTmw/HjwOnYtODOqPLkwe/gveLQqvDiv+HPqePRq+vbt/Xmw+zbt+XUr+PQquHOqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGwAAABj3pLQVAJx3NwAY9wAAAeHUAAB1hgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACFAPWXSAAABrwAAAAY99EABKU3ABhSOnWG4oMqEAAgdeAAGwb1kgAAAZdAAOAG9QAY9zbf7t9wdwB3NgAAAAAAAAAAAGQAAAAY+ISYH/hkdXkAGHWEmAAAAP//ABwAmACZn5mfHAAYAAAAAAAAABj4PABAAAAAAAAAABj4KAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAgEBAA8AGHauMgAAAAAAAGAAhQb5pwAAAAACABIAAABPAAAAg5dIAAAG9QAAAAAFqKJ4AAEG+QAAAPmnWPiEBu4AGHc23wAFqPvaAAV3NXWDngAFqPi4AMAAGAAY+AAACAAOABAAAACZjAAAAAWoAGAAAAb5p5j///jAAJcAGHauXhj4uJ8cAAAAmQAAAAAAAAAAAAAAAAAAADX72p0Cd6h1gwAABRj47CwAAAAADAAMAAAIRAABAAgAQICAAQQKGDiAAEACBQIWMGiAoGJFBQEcPIBgsaPBCBI6doQ4QWTHABRMdqxAUWVFCy4tXohZEQNNBBlu6gwIADs=)',
	CUR : 'url(data:image/gif;base64,R0lGODlhDAAMAPceAN/Mpt/Np+LQq+bUsOzbufHjv+7gvfTmw/nryPjqx/XnxODNqOjWsu3eu/HjwOPQq+/hvvLkweLPqfLkwPPlwuTSrOrZtfboxeDOp/Xmw+zct+XTsOPQquHOqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGwAAABj3pLQVAJx3NwAY9wAAAeHUAAB1hgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACFAPWXSAAABrwAAAAY99EAA6W+ABhSOnWG4oMqEAAgdeAAGwb1kgAAAZdAAOAG9QAY9zbf7t9wdwB3NgAAAAAAAAAAAGQAAAAY+ISYH/hkdXkAGHWEmAAAAP//ANQEbgRtY21j1AAYBAAAAAAAABj4PABAAAAAAAAAABj4KAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAgEBAA8AGHauMgAAAAAAAAgAhQCPQAAAAAACAAcAAAEuAAAA25dIAAAG9QAAAAACIDewAAEAjwAAAI9AAPiEAO4AGHc23wACIPvaAAV3NXWDngACIPi4AMAAGAAY+AAACAAOABgAAACX6QAAAAIgAAgAAACPQG7///jABJcAGHauXhj4uGPUAAAEbQAAAAAAAAAAAAAAAAAAADX72p0CdyB1gwAAAhj47CwAAAAADAAMAAAIRwABBBAwgEABAwYOIEigAIBDhwsYNHBw4EDDhw8fQIgQ4QBGjBImUKDwEWMFCh5LPrRwQeVDDBlcPtQg0+GGmgA44OyAE0BAADs=)',
	CDL : 'url(data:image/gif;base64,R0lGODlhDAAMAPcbAN/MpuHOqOLQquXUruvbtfHivuDNp/PlwuratfXnxOTSrPLkwfLkwOLPqe/hvvHjwPTmw+vbt+DOqPvtyvboxfTmwu7euebUr+HPquDNqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGwAAABj3pLQVAJx3NwAY9wAAAeHUAAB1hgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACFAPWXSAAABrwAAAAY99EAA6ZXABhSOnWG4oMqEAAgdeAAGwb1kgAAAZdAAOAG9QAY9zbf7t9wdwB3NgAAAAAAAAAAAGQAAAAY+ISYH/hkdXkAGHWEmAAAAP//AAAEcwXA6cDpAAAYBQAAAAAAABj4PABAAAAAAAAAABj4KAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAgEBAA8AGHauMgAAAAAAAAgAhQCPQAAAAAACAAgAAAEuAAABr5dIAAAG9QAAAAAGwDewAAEAjwAAAI9AAPiEAO4AGHc23wAGwPvaAAV3NXWDngAGwPi4AMAAGAAY+AAACAAOAEAAAACX6AAAAAbAAAgAAACPQHP///jABJcAGHauXhj4uOkAAAAFwAAAAAAAAAAAAAAAAAAAADX72p0Cd8B1gwAABhj47CwAAAAADAAMAAAIRAABCBxIUGCAgggFICw4YCFBAg4HFjAQEcABBBUTJFAQMcECBg0cLnDwgAFHhAsOpIQQQULBBRMoQFiwoIKFCxgyAAgIADs=)',
	CDR : 'url(data:image/gif;base64,R0lGODlhDAAMAPcjAN/MpuDOqOPRqubUsOzbuODNqPXlwuratfXnxOTSrPboxeLPqfPlwfLkwfTlwu/hvvHjwOfWs/Plwt/Np+LQq+bUr+7eue/hvezeu/vtygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGwAAABj3pLQVAJx3NwAY9wAAAeHUAAB1hgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACFAPWXSAAABrwAAAAY99EAA6YLABhSOnWG4oMqEAAgdeAAGwb1kgAAAZdAAOAG9QAY9zbf7t9wdwB3NgAAAAAAAAAAAGQAAAAY+ISYH/hkdXkAGHWEmAAAAP//ADgAogXH+8f7OAAYBQAAAAAAABj4PABAAAAAAAAAABj4KAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAgEBAA8AGHauMgAAAAAAAAgAhQCPQAAAAAACAAYAAAEuAAABJpdIAAAG9QAAAAAG6DewAAEAjwAAAI9AAPiEAO4AGHc23wAG6PvaAAV3NXWDngAG6Pi4AMAAGAAY+AAACAAOAFwAAACaWQAAAAboAAgAAACPQKL///jAAJcAGHauXhj4uPs4AAAFxwAAAAAAAAAAAAAAAAAAADX72p0Cd+h1gwAABhj47CwAAAAADAAMAAAIQgABCBxIsKBBgQEOEhSgcOCAhgIJQCxgAOIBBA0TIFCgcAGDBhgNJnDQ4AGEggUigGwgoQGACRQqWLiAoYHNDAoCAgA7)'
};

// Uruchamiamy skrypt....
unsafeWindow.villagePreviewEnhancer.init();
