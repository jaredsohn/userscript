// ==UserScript==
// @name           basharking		
// @description    
// @namespace      AmpliDude
// @include        
// @version        1.3.6
// @require        bb@.
// ==/UserScript==

(function(){

	var LT_mainFunction = function() {

		var louTweak = {};
		var LT = {};
		
		LT_strings = {
			"en": {
				"options_btn_tt": "Click to show LoU Tweak Options",
				"layout_btn_tt": "Click to generate layout Sharestring for current city",
				"chat_btn_city": "City",
				"chat_btn_player": "Player",
				"chat_btn_alliance": "Alliance",
				"chat_btn_url": "Link",
				"copy_coords_btn": "Copy coordinates to chat",
				"up_cout_tt": "Buildings available for upgrade:",
				"opts_max_chatlines": "Maximum lines of chat:",
				"opts_chat_opacity": "Chat background transparency:",
				"opts_switch_to_ally_tab": "Switch to Alliance Tab at start",
				"opts_show_queue_win": "Show queue info window",
				"opts_limit_req_res": "Limit requested resources to city free space",
				"opts_inc_res": {
					"lab": "Incoming resources label:",
					"disabled": "Disabled",
					"always": "Always on",
					"context": "Contextual"
				},
				"opts_separator": {
					"lab": "Thousands separator:",
					"period": "'.' (period)",
					"comma": "',' (comma)",
					"space": "' ' (space)",
					"none": "none"
				},
				"opts_city_tag": {
					"lab": "[city] tag shows:",
					"info": "City info",
					"region": "Region view"
				},
				"opts_lowest_lvl": {
					"lab1": "Select buildings that you want to upgrade with 'L (upgrade any lowest level)' shortcut",
					"lab2": "Define Max levels of every group type at which shortcut 'L' will stop upgrading",
					"towers": "Towers:",
					"military": "Military:",
					"resource": "Resource:",
					"cottage": "Cottage:",
					"barracks": "Barracks:",
					"utilities": "Utilities:"
				},
				"opts_set_hotkeys": "Click on one of the following buttons and then press a key to define shortcut",
				"opts_hotkey_labels": {
					"lab1": "Build hotkeys:",
					"lab2": "Upgrade hotkeys:",
					"lab3": "Moonstone creation hotkeys:",
					"lab4": "Global hotkeys:",
					"upgrade": "Upgrade building",
					"downgrade": "Downgrade / Demolish (Shift+)",
					"minister": "Assign to Minister",
					"prev_city": "Previous city",
					"next_city": "Next city"
				},
				"opts_clr_inc_res": "Incoming resources label font colors:",
				"opts_clr_chat": {
					"lab": "Chat font colors:",
					"all": "All:",
					"alliance": "Alliance:",
					"whisper": "Whisper:",
					"background": "Background:"
				},
				"opts": {
					"save": "Save",
					"export": "Export",
					"import": "Import",
					"export_lab": "You can save this string in a text file and import it later when needed.",
					"import_lab": "Insert saved LoU Tweak Options into text field and press OK.",
					"import_invalid": "Inserted string is invalid"
				},
				"layout": {
					"city": "City layout",
					"overlay": "Overlay layout",
					"apply": "Apply layout",
					"remove": "Remove layout"
				},
				"opts_lang": {
					"lab": "Game language:",
					"english": "English (Englisch)",
					"german": "German (Deutsch)"
				},
				"purify_btn_tt": "Click to open 'Purify resources' window",
				"opts_tagless_coords": "Make tagless coords clickable"
			},
			"de": {
				"options_btn_tt": "LoU Tweak Optionen anzeigen",
				"layout_btn_tt": "Für die aktuelle Stadt einen LoU City Planner Sharestring erzeugen",
				"chat_btn_city": "Stadt",
				"chat_btn_player": "Spieler",
				"chat_btn_alliance": "Allianz",
				"chat_btn_url": "Link",
				"copy_coords_btn": "Kopiere Koordinaten in den Chat",
				"up_cout_tt": "Zum Aufwerten verfügbare Gebäude:",
				"opts_max_chatlines": "Maximale Zeilen im Chat:",
				"opts_chat_opacity": "Chat Hintergrundtransparenz:",
				"opts_switch_to_ally_tab": "Beim Start zum  Allianz-Tab wechseln",
				"opts_show_queue_win": "Info-Fenster für Aufträge anzeigen",
				"opts_limit_req_res": "Begrenze bestellte Rohstoffe auf die freie Lagerkapazität der Stadt",
				"opts_inc_res": {
					"lab": "Label für ankommende Waren:",
					"disabled": "deaktiviert",
					"always": "Immer an",
					"context": "Kontextabhängig"
				},
				"opts_separator": {
					"lab": "Tausendertrennung:",
					"period": "'.' (Punkt)",
					"comma": "',' (Komma)",
					"space": "' ' (Leerzeichen)",
					"none": "ohne"
				},
				"opts_city_tag": {
					"lab": "[stadt] Tag zeigt:",
					"info": "Stadt Info",
					"region": "Regionsansicht"
				},
				"opts_lowest_lvl": {
					"lab1": "Wähle die Gebäude zur Aufwertung durch den 'L (niedrigste Stufe aufwerten)' Tastenkürzel aus",
					"lab2": "Die maximale Stufe für jede Gruppe festlegen, bei der das Tastenkürzel 'L' das Aufwerten beendet",
					"towers": "Türme:",
					"military": "Militär:",
					"resource": "Waren:",
					"cottage": "Wohnhaus:",
					"barracks": "Kaserne:",
					"utilities": "Versorger:"
				},
				"opts_set_hotkeys": "Zum Festlegen eines Tastenkürzels zuerst den Button anklicken und dann eine Taste drücken",
				"opts_hotkey_labels": {
					"lab1": "Aufbau-Hotkeys:",
					"lab2": "Aufwertungs-Hotkeys:",
					"lab3": "Mondsteinerzeugungs-Hotkeys:",
					"lab4": "Allgemeine Hotkeys:",
					"upgrade": "Gebäude aufwerten",
					"downgrade": "Abwerten / Abriss (Umschalt+)",
					"minister": "Dem Minister zuweisen",
					"prev_city": "Vorherige Stadt",
					"next_city": "Nächste Stadt"
				},
				"opts_clr_inc_res": "Font Farbe für Ankommende Waren Label:",
				"opts_clr_chat": {
					"lab": "Font Farben für Chat:",
					"all": "Alle:",
					"alliance": "Allianz:",
					"whisper": "Flüstern:",
					"background": "Hintergrund:"
				},
				"opts": {
					"save": "Speichern",
					"export": "Exportieren",
					"import": "Importieren",
					"export_lab": "Diese Zeichenkette in einer Textdatei speichern und später bei Bedarf importieren.",
					"import_lab": "Gespeicherte LoU Tweak Optionen in das Textfeld einfügen und OK drücken.",
					"import_invalid": "Die eingefügte Zeichenkette ist ungültig"
				},
				"layout": {
					"city": "Stadtplan",
					"overlay": "Übersichtsplan einblenden",
					"apply": "Übersichtsplan anwenden",
					"remove": "Übersichtsplan entfernen"
				},
				"opts_lang": {
					"lab": "Sprache des Spiels:",
					"english": "Englisch (English)",
					"german": "Deutsch (German)"
				},
				"purify_btn_tt": "Click to open 'Purify resources' window",
				"opts_tagless_coords": "Make tagless coordinatess clickable" 
			}
		};
		function L(str) {
			return LT_strings[window.louTweak.main.getInstance().getLang()][str];
		}
		
		qx.Class.define("louTweak.main", {
			type: "singleton",
			extend: qx.core.Object,
			statics: {
				lou_building_id: {
					"woodcutter": 47, "quarry": 48, "farm": 50, "cottage": 4, "market": 5, "ironmine": 49, "sawmill": 7, "mill": 8, "hideout": 9, "stonemason": 10, "foundry": 11, "townhouse": 13, "barracks": 14, "cityguardhouse": 15, "trainingground": 16, "stable": 17, "workshop": 18, "shipyard": 19, "warehouse": 20, "castle": 21, "harbor": 22, "moonglowtower": 36, "trinsictemple": 37, "lookouttower": 38, "ballistatower": 39, "guardiantower": 40, "rangertower": 41, "templartower": 42, "pitfalltrap": 43, "barricade": 44, "arcanetrap": 45, "camouflagetrap": 46
				}
			},
			members: {
				app: null,
				chat: null,
				chatTab0: null,
				chatTab1: null,
				titleW: null,
				cBar: null,
				srvBar: null,
				cInfoView: null,
				cDetView: null,
				dDetView: null,
				ncView: null,
				bDetView: null,
				bPlaceDetView: null,
				bQc: null,
				bQcSpdLab: null,
				bQh: null,
				uQc: null,
				uQh: null,
				city: null,
				cityId: null,
				cityMoonTowerId: null,
				originalConvertBBCode: null,
				createdTopBottomButtons: null,
				topBottomButtonsListener: null,
				tradeButtonsListener: null,
				lang: null,
				options: null,
				optionsPage: null,
				layoutWindow: null,
				timer: null,
				lastSendCommand: null,
				sendCommandBuffer: null,
				sendCommandBusy: null,
				initialize: function() {
					this.app = qx.core.Init.getApplication();

					this.cInfoView = this.app.cityInfoView;
					
					this.chat = this.app.chat;
					this.chatTab0 = this.chat.chatViewComposite[0]; // 'All' tab
					this.chatTab1 = this.chat.chatViewComposite[1]; // 'Alliance' tab
					
					this.bQc = this.cInfoView.buildingQueue;
					this.bQh = this.bQc.header;
					this.bQcSpdLab = this.bQc.constructionSpeedLabel;
					
					this.bDetView = this.app.buildingDetailView;
					this.bPlaceDetView = this.app.buildingPlaceDetailView;
					
					this.cDetView = this.app.cityDetailView;
					this.dDetView = this.app.dungeonDetailView;
					this.ncView = this.app.newCityView;
					
					this.titleW = this.app.title;
					this.cBar = this.app.cityBar;
					this.srvBar = this.app.serverBar;
					
					this.lang = qx.locale.Manager.getInstance().getLocale();
					
					this.createdTopBottomButtons = 0;
					
					this.timer = qx.util.TimerManager.getInstance();
					this.lastSendCommand = 0;
					this.sendCommandBuffer = new Array();
					this.sendCommandBusy = false;
					
					this.tweakLoU();
				},
				tweakLoU: function() {
					_LT = LT;
					this.loadOptions();
					if (this.options.userLang == "") this.options.userLang = this.lang;
					else this.setLang(this.options.userLang);
					LT.options = this.options;
					LT.srvTime = webfrontend.data.ServerTime.getInstance().refTime; // reference time (server start date in milisec?)
					LT.debug = this.debug;
					LT.thSep = this.thSep;
					LT.a = this.app;
					LT.main = this;
					
					// ***** Options button ***** //
					btn = new qx.ui.form.Button("O");
					btn.set({width: 30, appearance: "button-text-small", toolTipText: L("options_btn_tt")});
					btn.addListener("click", this.showOptionsPage, this);
					this.srvBar.add(btn, {top: 2, left: 390});
					
					// ***** City layout button ***** //
					btn = new qx.ui.form.Button("L");
					btn.set({width: 25, appearance: "button-text-small", toolTipText: L("layout_btn_tt")});
					btn.addListener("click", function(){this.layoutWindow.generateSharestring(); this.layoutWindow.open();}, this);
					this.bQh.add(btn, {top: 31, left: 305});
					// make the button disabled if in region view
					this.app.visMain.addListener("changeMapLoaded", function() { this.setEnabled(LT.a.visMain.mapmode == "c" ? true : false); }, btn);
					
					// ***** Purify resources window button ***** //
					btn = new qx.ui.form.Button("P");
					btn.set({width: 25, appearance: "button-text-small", toolTipText: L("purify_btn_tt")});
					btn.addListener("click", this.showPurifyWindow, this);
					this.bQh.add(btn, {top: 31, left: 275});
					// make the button disabled if in region view
					this.app.visMain.addListener("changeMapLoaded", function() { this.setEnabled(LT.a.visMain.mapmode == "c" ? true : false); }, btn);
					
					// ***** BBCode buttons in chat window ***** //
					cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());

					btns = [
						{lab: L("chat_btn_city"), func: this.parseCoords},
						{lab: L("chat_btn_player"), func: function() {this.parseText("player")}},
						{lab: L("chat_btn_alliance"), func: function() {this.parseText("alliance")}},
						{lab: L("chat_btn_url"), func: function() {this.parseText("url")}}
					];
					for (i=0; i<btns.length; i++) {
						btn = new qx.ui.form.Button(btns[i].lab).set({appearance: "button-text-small"});
						btn.addListener("click", btns[i].func, this);
						cont.add(btn);
					}
					this.chat.add(cont, {top: 7, left: 210});
					
					// ***** Copy City Coords To Chat buttons ***** //
					btn = new qx.ui.form.Button(L("copy_coords_btn")).set({width:160, height: 32});
						btn.addListener("click", function() {this.copyCoordsToChat("c")}, this);
					this.cDetView.actionArea.add(btn, {left:86, top: 130});
					btn = new qx.ui.form.Button(L("copy_coords_btn")).set({width:160, height: 32});
						btn.addListener("click", function() {this.copyCoordsToChat("d")}, this);
					this.dDetView.actionArea.add(btn, {left:86, top: 110});
					btn = new qx.ui.form.Button(L("copy_coords_btn")).set({maxWidth:160, height: 32, alignX: "center"});
						btn.addListener("click", function() {this.copyCoordsToChat("n")}, this);
					this.ncView.container.add(new qx.ui.core.Spacer(0,30));
					this.ncView.container.add(btn);

					// ***** Queue times label ***** //
					lab = new window.louTweak.queueTimesLabel();
					this.app.desktop.add(lab.queueTimeCont, {left: 405, top: 95});

					// ***** Incoming resources label ***** //
					lab = new window.louTweak.incomingResourcesLabel();
					this.bQc.getLayoutParent().addBefore(lab.incResCont, this.bQc);

					// ***** Switch to ally tab on start ***** //
					if (this.options.switchToAllyTab)
						this.chat.tabView.setSelection([this.chat.tabView.getChildren()[1]]);

					// ***** Listeners ***** //
					// app keyboard
					this.app.mainContainer.addListener("keypress", this.appPerformAction, this);
					// scene keyboard
					this.app.visMain.scene.getOutputWidget().addListener("keypress", this.scenePerformAction, this);
			
					webfrontend.data.City.getInstance().addListener("changeVersion", this.countUpgradeable, this);
					this.topBottomButtonsListener = webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateTopBottomButtons, this);
					this.tradeButtonsListener = webfrontend.base.Timer.getInstance().addListener("uiTick", this.createTradeButtons, this);
					
					// ***** Chat colors ***** //
					chatIns = webfrontend.config.Config.getInstance().getChat();
					chatIns.channelColors.global = this.options.chatColors[0];
					chatIns.channelColors._a = this.options.chatColors[1];
					chatIns.channelColors.privatein = this.options.chatColors[3];
					chatIns.channelColors.privateout = this.options.chatColors[4];
					chatIns.setMaxLines(this.options.chatMaxLines);
					
					this.chat.BgrLabel.setBackgroundColor(this.options.chatColors[2]);
					this.chat.BgrLabel.setOpacity((100-parseInt(this.options.chatOpacity))/100);
					
					
					this.addThousandsSeparatorListeners();

					this.optionsPage = new window.louTweak.optionsPage();
					this.layoutWindow = new window.louTweak.layoutWindow();

					this.app.visMain.addListener("changeMapLoaded", function(){this.tabView.setSelection([this.tabView.getChildren()[0]]); this.win.close(); this.showOverlayLayout();}, this.layoutWindow);
					this.getCity();
					//
					
					this.originalConvertBBCode = webfrontend.gui.Util.convertBBCode;
					webfrontend.gui.Util.convertBBCode = this.newConvertBBCode;
				},
				appPerformAction: function(e) {
					if (this.app.visMain.mapmode != "c" || !this.app.allowHotKey || this.bDetView.visBuilding != null || this.bPlaceDetView.active) {
						return;
					}
					key = e.getKeyIdentifier();
					if (key == "") return;
					shft = e.isShiftPressed();
					ctrl = e.isCtrlPressed();

					switch (key) {
						case this.options.hotkeys.global.prevcity:
							this.cBar.prevButton.execute();
							break;
						case this.options.hotkeys.global.nextcity:
							this.cBar.nextButton.execute();
							break;
						case 'T':
							this.upgradeLowestLevelBuilding("T", shft);
							break;
						case 'M':
							this.upgradeLowestLevelBuilding("M", shft);
							break;
						case 'B':
							this.upgradeLowestLevelBuilding("B", shft);
							break;
						case 'C':
							this.upgradeLowestLevelBuilding("C", shft);
							break;
						case 'L':
							this.upgradeLowestLevelBuilding("A", shft);
							break;
						case 'E':
							if (shft && !ctrl)
								this.upgradeLowestLevelBuilding("R", true);
							else if (!shft && !ctrl)
								this.upgradeLowestLevelBuilding("R", false);
							break;
						case 'U':
							this.upgradeLowestLevelBuilding("U", shft);
							break;
						case 'Q':
							if (shft)
								this.upgradeLowestLevelBuilding("F", false);
							break;
						case 'A':
							if (shft)
								this.upgradeLowestLevelBuilding("F", true);
							break;
						case this.options.hotkeys.global.onemax:
							if (this.options.moonTweak[0]) {
								if (!shft) {
									if (this.cityCanBuyMoonstones()[0]) this.buyMoonstones(1);
								} else
									this.buyMaxMoonstonesWarning("h", "max");
							}
							break;
						case this.options.hotkeys.global.max_1:
							if (this.options.moonTweak[0])
								this.buyMaxMoonstonesWarning("h", "max-1");
							break;
						default:
							return;
					}
				},
				scenePerformAction: function(e) {
					if (this.app.visMain.mapmode != "c") return;
					
					key = e.getKeyIdentifier();
					shft = e.isShiftPressed();

					if (!this.bDetView.visBuilding) {
						if (this.bPlaceDetView.active) {
							if (/\b(27|28|29|30)\b/.test(this.bPlaceDetView.buildingType) && key == 'D') {
								this.bPlaceDetView.downgradeButton.execute(); // destroy resource
								return;
							} else {
								for (var i in this.options.hotkeys.build) {
									if (this.options.hotkeys.build[i] == key) {
										_bid = this.self(arguments).lou_building_id[i];
										if (this.bPlaceDetView.buildingInfo[_bid].canBuild) {
											this.cityObject("Build", this.bPlaceDetView.placeId, _bid, 1, false);
											return;
										}
									}
								}
							}
						}
					}
					if (this.bDetView.visBuilding) {
					try {
						_bid = this.bDetView.visBuilding.getId();
						_ind = this.getIndex(_bid);
						if (_ind == -1) return;
						_btype = this.city[_ind][2];
						_blvl = this.city[_ind][1];
						if (_blvl < 0) return;
						if (/\b(1|2|3|4|5|6|7|8|9)\b/.test(key)) {
							if (RegExp.$1 == "1") _ups = 10 - _blvl;
							else _ups = parseInt(RegExp.$1) - _blvl;
							//LT.debug("_blvl: " + _blvl + ", _ups: " + _ups);
							this.city[_ind][1] += (_ups<0) ? 0 : _ups;
							this.cityObject("UpgradeBuilding", _bid, _btype, _ups, false);
							return;
						}
						_ups = shft ? 10 - _blvl : 1;
						switch (key) {
							case this.options.hotkeys.upgrades.upgrade:
								this.city[_ind][1] += _ups;
								this.cityObject("UpgradeBuilding", _bid, _btype, _ups, false);
								break;
							case this.options.hotkeys.upgrades.downgrade:
								_ups = shft ? 10 : 1;
								this.city[_ind][1] = -1;
								this.cityObject("DowngradeBuilding", _bid, _btype, _ups, false);
								break;
							case this.options.hotkeys.upgrades.minister:
								this.city[_ind][1] += _ups;
								this.cityObject("UpgradeBuilding", _bid, _btype, _ups, true);
								break;
							default:
								return;
						}
					} catch (e) { LT.debug(e); }
					}
				},
				cityObject: function(_action, _buildingId, _buildingType, _upgrades, _minister) {
					if (_upgrades <= 0) return;

					bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
					bqcur = webfrontend.data.City.getInstance().buildQueue;
					bqcur = (bqcur != null) ? bqcur.length : 0;
					freeSlots = bqmax - bqcur;
					if (freeSlots == 0) return;
					if (freeSlots < _upgrades && _action != "DowngradeBuilding") _upgrades = freeSlots;
					
					if (_action == "Build") {
						if (_buildingType == 21 && this.bPlaceDetView.active) {
							this.bPlaceDetView.buildingType = 21;
							this.bPlaceDetView._onClickBuild();
							return;
						}
						_action = "UpgradeBuilding";
					}
					
					if (_action == "DowngradeBuilding" && _upgrades == 10) {
						_action = "DemolishBuilding";
						_upgrades = 1;
					}
					_cid = webfrontend.data.City.getInstance().getId()
					for (i=0; i<_upgrades; i++) {
						this.sendCommandBuffer.push({a:_action, p:{cityid: _cid, buildingid: _buildingId, buildingType: _buildingType, isPaid: !_minister}});
					}
					if (!this.sendcommandBusy) {
						this.sendCommandBusy = true;
						this.sendCmd();
					}
				},
				sendCmd: function() {
					if (this.sendCommandBuffer.length == 0) {
						this.sendCommandBusy = false;
						return;
					}
					currentTime = new Date().getTime();
					if (currentTime > this.lastSendCommand+500) {
						cmd = this.sendCommandBuffer.shift();
						//LT.debug(cmd.a + " " + (currentTime-this.lastSendCommand));
						webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p);
						this.lastSendCommand = currentTime;
					}
					this.timer.start(this.sendCmd, null, this, null, 250);
				},
				upgradeLowestLevelBuilding: function(_type, _minis) {
					if (this.app.visMain.mapmode != "c") return;

					bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
					bqcur = webfrontend.data.City.getInstance().buildQueue;
					bqcur = (bqcur != null) ? bqcur.length : 0;
					freeS = bqmax - bqcur;
					if (freeS == 0) return;
					
					buildingTypes = {
						"T":"|38|39|40|41|42|43|44|45|46|",
						"M":"|15|16|17|18|19|21|36|37|",
						"R":"|1|2|3|6|47|48|49|50|",
						"C":"|4|",
						"B":"|14|",
						"U":"|5|7|8|9|10|11|12|13|20|22|",
						"A":"|"+this.options.lowestLevelUpgradeIDs.join("|")+(this.options.lowestLevelUpgradeIDs[0] != "" ? "|1|" : "")+(this.options.lowestLevelUpgradeIDs[1] != "" ? "|2|" : "")+(this.options.lowestLevelUpgradeIDs[2] != "" ? "|3|" : "")+(this.options.lowestLevelUpgradeIDs[5] != "" ? "|6|" : "")+"|"
					};
					maxLvls = {
						"T":this.options.lowestLevelMax[0],
						"M":this.options.lowestLevelMax[1],
						"R":this.options.lowestLevelMax[2],
						"C":this.options.lowestLevelMax[3],
						"B":this.options.lowestLevelMax[4],
						"U":this.options.lowestLevelMax[5]
					}
					if (_type != "F") freeS = 1;
					if (_type == "F") _type = "A";
					_bTable = this.getValidBuildings(buildingTypes[_type]);

					for (j=0; j<freeS; j++) {
						_bTable.sort(function(a,b){return a[1]-b[1];});
						_bType = "";
						for (i=0; i<_bTable.length; i++) {
							if (_type == "A") {
								for (var b in buildingTypes) {
									if (b == "A") continue;
									if (buildingTypes[b].indexOf("|" + _bTable[i][2] + "|") != -1) _bType = b;
								}
								if (buildingTypes["A"].indexOf("|" + _bTable[0][2] + "|") != -1 && _bTable[i][1] >= maxLvls[_bType])
									continue;
							}
							if (buildingTypes[_type].indexOf("|" + _bTable[0][2] + "|") != -1) {
								_bTable[i][1] += 1;
								this.cityObject("UpgradeBuilding", _bTable[i][0], _bTable[i][2], 1, _minis);
								break;
							}
						}
					}
				},
				getValidBuildings: function(_ids) {
					this.getCity();
					_arr = new Array();
					_wallIn = false;
					for (k=0; k<this.city.length; k++) {
						if (_ids.indexOf("|" + this.city[k][2] + "|") != -1 && this.city[k][1] < 10 && this.city[k][1] > -1) {
							if (!_wallIn)
								_arr.push(this.city[k]);
							if (this.city[k][2] == 23)
								_wallIn = true;
						}
					}
					return _arr;
				},
				getCity: function() {
					if (LT.a.visMain.mapmode != "c") return;
					_cells = LT.a.visMain.cells;
					if (!_cells[0]) {
						window.setTimeout(function(){LT.main.getCity()}, 250);
						return;
					}
					_cgi = webfrontend.data.City.getInstance();
					waterCity = _cgi.getOnWater();
					
					_se = new Array();
					for (var _c in _cells) {
						_cell = _cells[_c].entities;
						for (var d in _cell) {
							if (_cell[d].basename != "CityWallLevel" && _cell[d].basename != "CityObject") {
								if (_cell[d].selectNode2 != null && _cell[d].selectNode3 != null) {
									if (_cell[d].selectNode.getY() < 880) {
										_se.push([_cell[d], _cell[d].selectNode2.getY()*256+_cell[d].selectNode2.getX()+1]);
									} else {
										_se.push([_cell[d], _cell[d].selectNode3.getY()*256+_cell[d].selectNode3.getX()+1]);
									}
									_se.push([_cell[d], _cell[d].selectNode.getY()*256+_cell[d].selectNode.getX()]);
									_se.push([_cell[d], _cell[d].selectNode.getY()*256+_cell[d].selectNode.getX()+1]);
									_se.push([_cell[d], _cell[d].selectNode2.getY()*256+_cell[d].selectNode2.getX()]);
									_se.push([_cell[d], _cell[d].selectNode3.getY()*256+_cell[d].selectNode3.getX()]);
								} else {
									_se.push([_cell[d], _cell[d].selectNode.getY()*256+_cell[d].selectNode.getX()]);
								}
							}
						}
					}

					_se.sort(function(a,b){return a[1]-b[1];});

					this.city = new Array(441);
					_empty = [0, 1, 19, 20, 21, 41, 399, 419, 420, 421, 439, 440];
					_water = [352, 353, 373, 374, 375, 395, 396, 397, 398, 417, 418, 438];

					for (i=0; i<this.city.length; i++) this.city[i] = null;

					for (i=0; i<_empty.length; i++)	this.city[_empty[i]] = [-1, -1, -1]; // [buildingID/placeID, buildingLvl, buildingType]

					if (waterCity) {
						for (i=0; i<_water.length; i++) this.city[_water[i]] = [-1, -1, -2];
					}

					try {
						for (i=0, c=0; i<_se.length; i++) {
							while(this.city[c] != null) c++;
							if (_se[i][0].getResType != undefined)
								this.city[c] = [_se[i][0].getId(), 0, _se[i][0].getResType()+90]; // resource node
							else if (_se[i][0].getType != undefined) {
								if (_se[i][0].getLevel != undefined) // building
									this.city[c] = [_se[i][0].getId(), _se[i][0].getLevel()+LT.main.checkBuilding(_se[i][0].getId()), _se[i][0].getType()];
								else
									this.city[c] = [_se[i][0].getId(), _cgi.getWallLevel()+LT.main.checkBuilding("wall"), _se[i][0].getType()]; // wall
							} else if (_se[i][0].getPlaceId != undefined) {
								if (_se[i][0].drawNode != null) {
									if (_se[i][0].drawNode.image != undefined) {
										if (_se[i][0].drawNode.image.indexOf("tower") != -1) {
											this.city[c] = [_se[i][0].getPlaceId(), 0, 99]; // tower place
										} else {
											this.city[c] = [_se[i][0].getPlaceId(), 0, 98]; // empty, can be corn field
										}
									} else if (_se[i][0].drawNode.basename == "EffectNode") {
										this.city[c] = [_se[i][0].getPlaceId(), 0, 99]; // ??? bottom left tower in water city
									}
								} else {
									if (waterCity && /\b(331|332|351|354|372|376|394|416)\b/.test(c)) {
										this.city[c] = [_se[i][0].getPlaceId(), 0, 97]; // water building place
									} else {
										this.city[c] = [_se[i][0].getPlaceId(), 0, 98]; // empty
									}
								}
							}
						}
					for (i=0; i<this.city.length; i++) {
						if (this.city[i] == null) {
							this.city = new Array(441);
							window.setTimeout(function(){LT.main.getCity()}, 100);
							return;
						}
					}
					LT.main.cityId = _cgi.getId();
					LT.city = this.city;
					} catch (e) { LT.debug(e); }
				},
				checkBuilding: function(_buildingId) {
					try {
						cBuildQueue = webfrontend.data.City.getInstance().getBuildQueue();
						d = 0;
						if (cBuildQueue != null) {
							for (j=0; j<cBuildQueue.length; j++) {
								if (cBuildQueue[j].building == _buildingId && (cBuildQueue[j].state == 2 || cBuildQueue[j].state == 5)) return -11; // single downgrade / full demolish
								if (cBuildQueue[j].building == _buildingId) d++;
								if (cBuildQueue[j].type == 23 && _buildingId == "wall") d++; // is city wall on queue?
							}
						}
					} catch(e) { LT.debug(e); }
					return d;
				},
				getIndex: function(_buildingId) {
					this.getCity();
					for (i=0; i<this.city.length; i++) {
						if (this.city[i][0] == _buildingId) return i;
					}
					return -1;
				},
				countUpgradeable: function() {
					if (this.app.visMain.getBuildings().length == 0) {
						window.setTimeout(function(){LT.main.countUpgradeable()}, 1500);
						return;
					}
					this.getCity();

					_upCount = 0;
					_wallLvl = 0;
					for (i=0; i<this.city.length; i++) {
						if (this.city[i] == null) {
							this.getCity();
							window.setTimeout(function(){LT.main.countUpgradeable()}, 250);
							return;
						}
						if (this.city[i][1] > -1 && this.city[i][1] < 10 && !/\b(-1|-2|23|27|28|29|30|90|91|92|93|97|98|99)\b/.test(this.city[i][2])) _upCount++;
						else if (this.city[i][2] == 23) _wallLvl = this.city[i][1];
					}
					if (_wallLvl < 10) _upCount++;
					_cba = _cgi.getBuildingLimit() - _cgi.getBuildingCount();
					if (this.bQc.buildingSlotsTooltip.getLabel().indexOf("LT_cUp") == -1) {
						this.bQc.buildingSlotsValue.setValue(_cba + " (" + _upCount + ")");
						_ctxt = '</tr><tr><td id="LT_cUp">' + L("up_cout_tt") + '</td><td>' + _upCount + '</td></tr></table>';
						_ttxt = LT.main.bQc.buildingSlotsTooltip.getLabel().replace("</tr></table>", _ctxt);
						this.bQc.buildingSlotsTooltip.setLabel(_ttxt);
					}
				},
				parseCoords: function() {
					tag = (this.lang == "en") ? "city" : "stadt";
					if (this.chat.chatLine.getValue() == null) this.chat.chatLine.setValue("");
					re = new RegExp("\\b(\\d{1,3}\\:\\d{1,3})(?!\\[\\\/" + tag + "\\])\\b", "g");
					if (this.chat.chatLine.getValue().match(re)) {
						this.chat.chatLine.setValue(this.chat.chatLine.getValue().replace(re, "[" + tag + "]$1[/" + tag + "]"));
						this.chat.chatLine.focus();
					} else {
						pos = this.chat.chatLine.getValue().length + tag.length + 3;
						this.chat.chatLine.setValue(this.chat.chatLine.getValue() + " " + "[" + tag + "][/" + tag + "]");
						this.chat.chatLine.focus();
						this.chat.chatLine.setTextSelection(pos, pos);
					}
				},
				parseText: function(txt) {
					if (this.lang == "de") {
						if (txt == "player") txt = "spieler";
						if (txt == "alliance") txt = "allianz";
					}
					
					if (this.chat.chatLine.getValue() == null) this.chat.chatLine.setValue("");
					cs = this.chat.chatLine.getTextSelection();
					ss = this.chat.chatLine.getTextSelectionStart();
					se = this.chat.chatLine.getTextSelectionEnd();
					if (cs != "") {
						this.chat.chatLine.setValue(this.chat.chatLine.getValue().substring(0, ss) + "[" + txt + "]" + cs + "[/" + txt + "]" + this.chat.chatLine.getValue().substring(se));
						this.chat.chatLine.focus();
					} else {
						pos = this.chat.chatLine.getValue().length + txt.length + 3;
						this.chat.chatLine.setValue(this.chat.chatLine.getValue() + " " + "[" + txt + "][/" + txt + "]");
						this.chat.chatLine.focus();
						this.chat.chatLine.setTextSelection(pos, pos);
					}
				},
				newConvertBBCode: function (D,E,F) {
					//D = D.replace(/\[w=(\d+);(\d+)\](.*)\[\/w\]/g, "$3").replace(/\[wb\]/, "");
					if (LT.options.taglessCoords) D = D.replace(/\b((\d{1,3})(\:)(\d{1,3}))(?!\[\/(city|stadt)\])\b/g, '<a href=# style="color: #1d79ff" onClick="qx.core.Init.getApplication().setMainView(\'r\', 0, $2*128, $4*80)">$2:$4</a>');
					if (LT.options.cityTag == 1) {
						if (LT.main.getLang() == "en")
							D = D.replace(/\[city\]([0-9]*?)\:([0-9]*?)\[\/city\]/g, '<a href=# style="color: #1d79ff" onClick="qx.core.Init.getApplication().setMainView(\'r\', 0, $1*128, $2*80)">$1:$2</a>');
						if (LT.main.getLang() == "de")
							D = D.replace(/\[stadt\]([0-9]*?)\:([0-9]*?)\[\/stadt\]/g, '<a href=# style="color: #1d79ff" onClick="qx.core.Init.getApplication().setMainView(\'r\', 0, $1*128, $2*80)">$1:$2</a>');
					}
					D = LT.main.originalConvertBBCode(D,E,F);
					return D;
				},
				addThousandsSeparatorListeners: function() {
					this.titleW.pointsLabel.setWidth(40);
					this.titleW.manaLabel.setLayoutProperties({left: 630});
					this.titleW.manaIcon.setLayoutProperties({left: 607})
					this.titleW.goldLabel.setWidth(110);

					for (i=1; i<5; i++) {
						this.cBar.resValueLabels[i].addListener("changeValue", function() { this.l.setValue(LT.thSep(this.l.getValue())); }, {l:this.cBar.resValueLabels[i]});
						this.cBar.resGrowLabels[i].addListener("changeValue", function() { this.l.setValue(LT.thSep(this.l.getValue())); }, {l:this.cBar.resGrowLabels[i]});
					}
					this.titleW.pointsLabel.addListener("changeValue", function() { this.l.setValue(LT.thSep(this.l.getValue())); }, {l:this.titleW.pointsLabel});
					this.titleW.goldLabel.addListener("changeValue", function() { this.l.setValue(LT.thSep(this.l.getValue())); }, {l:this.titleW.goldLabel});
					this.titleW.manaLabel.addListener("changeValue", function() { this.l.setValue(LT.thSep(this.l.getValue())); }, {l:this.titleW.manaLabel});
				},
				copyCoordsToChat: function(v) {
					posX = posY = 0;
					if (v == "c") { posX = this.cDetView.city.getPosX(); posY = this.cDetView.city.getPosY(); }
					else if (v == "d") { posX = this.dDetView.city.getPosX(); posY = this.dDetView.city.getPosY(); }
					else if (v == "n") { posX = this.ncView.cityPosX; posY = this.ncView.cityPosY; }
					ctag = (this.lang == "en") ? "city" : "stadt";
					ccl = this.chat.chatLine.getValue();
					if (ccl == null) { this.chat.chatLine.setValue(""); ccl = ""; }
					this.chat.chatLine.setValue(ccl + " " + "[" + ctag + "]" + posX + ":" + posY + "[/" + ctag + "]");
				},
				showPurifyWindow: function() {
					cityB = this.app.visMain.getBuildings();
					for (i=0; i<cityB.length; i++) {
						if (cityB[i].getType() == 36 && cityB[i].level == 10) {
							var g = this.app.getTradeWidget();
							g.setTab(5);
							this.app.switchOverlay(g);
							return;
						}
					}
				},
				updateTopBottomButtons: function() {
					_mxbqs = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
					_j = this.bQc.getJobs();
					if (this.createdTopBottomButtons < _mxbqs) {
						for (i=this.createdTopBottomButtons + 1; i<_j.length; i++) {
							if (_j[i].getUserData("Warnings") == 0) {
								if (i > 2) {
									topB = _j[i].getUserData("top");
									topB.set({width: 25});
									topB.setLabel("T");
									_j[i].getLayout()._getLayoutChildren()[0]._add(topB, {left: 153, top: 26});
								}
								if (i > 1 && i < 17) {
									bottB = _j[i].getUserData("bottom");
									bottB.set({width: 25});
									bottB.setLabel("B");
									_j[i].getLayout()._getLayoutChildren()[0]._add(bottB, {left: 238, top: 26});
								}
								_j[i].getUserData("payButton").setLayoutProperties({left: 89, width: 16});
								this.createdTopBottomButtons++;
							} else
								break;
						}
					} else {
						webfrontend.base.Timer.getInstance().removeListenerById(this.topBottomButtonsListener);
					}
				},
				createTradeButtons: function() {
					if (this.app.tradeWidget) {
						_pageSend = null;
						for (var o in LT.a.tradeWidget) {
							if (LT.a.tradeWidget[o] != null && LT.a.tradeWidget[o].basename == "TradeSendResourcesPage")
							_pageSend = LT.a.tradeWidget[o];
						}
						if (_pageSend == null) return;
						_pageSendCont = _pageSend.aResValueSpinner[0].getLayoutParent(); // spinners container
						_tbd = [
							["1k", 1], ["5k", 5], ["10k", 10], ["25k", 25],
							["50k", 50], ["100k", 100], ["250k", 250], ["500k", 500]
						];
						_pageSendCont.getLayout().setSpacingX(5);
						for (i=0; i<4; i++) {
							for (j=0; j<8; j++) {
								tb = new qx.ui.form.Button(_tbd[j][0]).set({appearance: "button-recruiting", font: "bold"});
									tb.addListener("click", this.increaseResAmount, {am:_tbd[j][1], r:i, p:_pageSend});
								_pageSendCont.add(tb, {column: j+3, row: i+1});
							}
						}

						// add listeners to spinners in request resources page
						for (var o in LT.a.tradeWidget) {
							if (LT.a.tradeWidget[o] != null && LT.a.tradeWidget[o].basename == "TradeRequestResourcesPage")
							_prr = LT.a.tradeWidget[o];
						}
						_prrTable = null;
						_spObj = null;
						for (var p in _prr) {
							if (_prr[p] != null) {
								if (_prr[p].toString().indexOf("SpinnerInt") != -1 && _prr[p].toString().indexOf("9999999") != -1) {
									re = /([_a-zA-z]+)(?=\s*=\s*\(?new\s*\(?webfrontend\.gui\.SpinnerInt)/g;
									_spObj = _prr[p].toString().match(re);
								}
								if (_prr[p].toString().indexOf("SimpleColFormattingDataModel") != -1) {
									_prrTable = _prr[p];
								}
							}
						}

						_prr[_spObj[0]].addListener("changeValue", this.limitResources, {t:_prrTable, s:_prr[_spObj[0]], b:0});
						_prr[_spObj[1]].addListener("changeValue", this.limitResources, {t:_prrTable, s:_prr[_spObj[1]], b:1});

						webfrontend.base.Timer.getInstance().removeListenerById(this.tradeButtonsListener);
					}
				},
				increaseResAmount: function() {
					curVal = this.p.aResValueSpinner[this.r].getValue();
					this.p.aResValueSpinner[this.r].setValue(curVal + this.am*1000);
				},
				limitResources: function() {
					if (!LT.options.resLimit) return;
					c = webfrontend.data.City.getInstance();
					_it = c.tradeIncoming;
					if (_it == null || _it == undefined) _it = [];
					_data = this.t.getData();
					for (i=0; i<_data.length; i++) {
						if (_data[i][0] == true) {
							_res = _data[i].originalData.resType; // resource type
							_inc = 0;
							// incoming trade
							for (k=0; k<_it.length; k++) {
								for (j=0; j<_it[k].resources.length; j++) {
									if (_it[k].resources[j].type == _res) 
										_inc += _it[k].resources[j].count;
								}
							}
					
							_timeSpan = (this.b == 0) ? _data[i].originalData.tl : _data[i].originalData.ts;
							if (_res == 4) {
								_fc = Math.round(c.getFoodConsumption() * 3600);
								_fcs = Math.round(c.getFoodConsumptionSupporter() * 3600);
								_ft = c.getResourceGrowPerHour(4) - _fc - _fcs;
							}
							curVal = c.getResourceCount(_res);
							curDel = c.resources[_res].delta;
							curMax = c.getResourceMaxStorage(_res);

							_val = Math.floor(curMax - (curVal + ((_res == 4) ? _ft*_timeSpan/3600 : _timeSpan * curDel)) - _inc);
							if (_val < 0) _val = 0;

							if (this.s.getValue() > _val) {
								this.s.setValue(_val);
							}
						}
					}
				},
				showOptionsPage: function() {
					this.app.switchOverlay(this.optionsPage);
				},
				loadOptions: function() {
					_str = localStorage.getItem("LT_options");
					if (_str)
						this.options = qx.util.Json.parse(_str);
					else {
						this.options = {
							"thousandsSeparator": 0,
							"hotkeys": {
								"build": {
									"woodcutter": "W",
									"quarry": "Q",
									"farm": "F",
									"cottage": "C",
									"market": "P",
									"ironmine": "I",
									"sawmill": "L",
									"mill": "M",
									"hideout": "H",
									"stonemason": "A",
									"foundry": "D",
									"townhouse": "U",
									"barracks": "B",
									"cityguardhouse": "K",
									"trainingground": "G",
									"stable": "E",
									"workshop": "Y",
									"shipyard": "V",
									"warehouse": "S",
									"castle": "X",
									"harbor": "R",
									"moonglowtower": "J",
									"trinsictemple": "Z",
									"lookouttower": "1",
									"ballistatower": "2",
									"guardiantower": "3",
									"rangertower": "4",
									"templartower": "5",
									"pitfalltrap": "6",
									"barricade": "7",
									"arcanetrap": "8",
									"camouflagetrap": "9"
								},
								"upgrades": {
									"upgrade": "U",
									"downgrade": "D",
									"minister": "A"
								},
								"global": {
									"prevcity": "[",
									"nextcity": "]"
								}
							},
							"lowestLevelUpgradeIDs": [47,48,50,4,5,49,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,36,37,38,39,40,41,42,43,44,45,46,12,23],
							"lowestLevelMax": [10,10,10,10,10,10],
							"switchToAllyTab": false,
							"showIncResCont": 1,
							"showQueueTimes": true,
							"incResClrs": ["#FF0000","#F7941D","#FFE400","#40C849"],
							"chatColors": ["#fcbf8f", "#78b042", "#000000", "#ff4076", "#fa9bb6"],
							"chatMaxLines": 100,
							"chatOpacity": 55,
							"cityTag": 0,
							"resLimit": true,
							"userLang": "",
							"taglessCoords": true
						};
					}
					//1.3.2
					if (this.options.lowestLevelUpgradeIDs[0] == 1) this.options.lowestLevelUpgradeIDs[0] = 47;
					if (this.options.lowestLevelUpgradeIDs[1] == 2) this.options.lowestLevelUpgradeIDs[1] = 48;
					if (this.options.lowestLevelUpgradeIDs[2] == 3) this.options.lowestLevelUpgradeIDs[2] = 50;
					if (this.options.lowestLevelUpgradeIDs[5] == 6) this.options.lowestLevelUpgradeIDs[5] = 49;
					if (!this.options.hasOwnProperty("taglessCoords")) this.options.taglessCoords = true;
					//
					//
					this.app.setUserData("LT_options", this.options);
				},
				getLang: function() {
					return this.lang;
				},
				setLang: function(l) {
					this.lang = l;
					qx.locale.Manager.getInstance().setLocale(l);
				},
				thSep: function(val) {
					if (val == undefined) return "";
					separators = [".", ",", " ", ""];
					return val.toString().replace(/\d(?=(\d{3})+(\D|$))/g, "$&" + separators[LT.options.thousandsSeparator]);
				},
				debug: function(s) {
					if (typeof console != 'undefined') console.log(s);
					else if (window.opera) opera.postError(s);
					else GM_log(s);
				}
			}
		});
		
		qx.Class.define("louTweak.queueTimesLabel", {
			extend: qx.core.Object,
			construct: function () {
				this.queueTimeCont = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.queueTimeContBgr = new qx.ui.basic.Image("data:image/png;base64,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");
				this.queueTimeContBgr.setWidth(280);
				this.queueTimeContBgr.setHeight(50);
				this.queueTimeCont.add(this.queueTimeContBgr, {left: 0, top: 0});
				gr = new qx.ui.layout.Grid(3, 4);
				gr.setColumnMaxWidth(0, 20);
				gr.setColumnMinWidth(1, 200);
				gr.setColumnMaxWidth(2, 40);
				this.queueTimeGrid = new qx.ui.container.Composite(gr);
				this.queueTimeCont.add(this.queueTimeGrid, {left: 8, top: 8});
				this.queueTimeGrid.add(new qx.ui.basic.Label("BQ:").set({textColor: "text-gold", font: "bold"}), {column:0, row:0});
				this.queueTimeGrid.add(new qx.ui.basic.Label("UQ:").set({textColor: "text-gold", font: "bold"}), {column:0, row:1});
				this.buildQueueTimeLabel = new qx.ui.basic.Label("").set({textColor: "text-gold", font: "bold"});
				this.buildQueueSlotsLabel = new qx.ui.basic.Label("").set({textColor: "text-gold", font: "bold"});
				this.unitQueueTimeLabel = new qx.ui.basic.Label("").set({textColor: "text-gold", font: "bold"});
				this.unitQueueSlotsLabel = new qx.ui.basic.Label("").set({textColor: "text-gold", font: "bold"});
				this.queueTimeGrid.add(this.buildQueueTimeLabel, {column:1, row:0});
				this.queueTimeGrid.add(this.buildQueueSlotsLabel, {column:2, row:0});
				this.queueTimeGrid.add(this.unitQueueTimeLabel, {column:1, row:1});
				this.queueTimeGrid.add(this.unitQueueSlotsLabel, {column:2, row:1});
				
				webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateQueueTimes, this);
			},
			members: {
				queueTimeCont: null,
				queueTimeContBgr: null,
				queueTimeGrid: null,
				buildQueueTimeLabel: null,
				buildQueueSlotsLabel: null,
				unitQueueTimeLabel: null,
				unitQueueSlotsLabel: null,
				updateQueueTimes: function() {
					if (LT.options.showQueueTimes)
						this.queueTimeCont.setVisibility("visible");
					else
						this.queueTimeCont.setVisibility("excluded");
						
					p = webfrontend.data.Player.getInstance();
					b = webfrontend.data.City.getInstance().buildQueue;
					u = webfrontend.data.City.getInstance().unitQueue;
					if (b != null) {
						timeSpan = (LT.srvTime + b[b.length-1].end*1000 - new Date().getTime())/1000;
						endTime = webfrontend.Util.getDateTimeString(new Date(LT.srvTime + b[b.length-1].end*1000));
						this.buildQueueTimeLabel.setValue(endTime + " (" + webfrontend.Util.getTimespanString(webfrontend.data.ServerTime.getInstance().getTimeSpan(timeSpan)) + ")");
						this.buildQueueSlotsLabel.setValue(b.length + " / " + p.getMaxBuildQueueSize());
					} else {
						this.buildQueueTimeLabel.setValue("0:00");
						this.buildQueueSlotsLabel.setValue("0" + " / " + p.getMaxBuildQueueSize());
					}
					if (u != null) {
						timeSpan = (LT.srvTime + u[u.length-1].end*1000 - new Date().getTime())/1000;
						endTime = webfrontend.Util.getDateTimeString(new Date(LT.srvTime + u[u.length-1].end*1000));
						this.unitQueueTimeLabel.setValue(endTime + " (" + webfrontend.Util.getTimespanString(webfrontend.data.ServerTime.getInstance().getTimeSpan(timeSpan)) + ")");
						this.unitQueueSlotsLabel.setValue(u.length + " / " + p.getMaxUnitQueueSize());
					} else {
						this.unitQueueTimeLabel.setValue("0:00");
						this.unitQueueSlotsLabel.setValue("0" + " / " + p.getMaxUnitQueueSize());
					}
				}
			}
		});
		qx.Class.define("louTweak.incomingResourcesLabel", {
			extend: qx.core.Object,
			construct: function () {
				m = webfrontend.res.Main.getInstance();
				this.incResCont = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.incResContBgr = new qx.ui.basic.Image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVIAAABFCAMAAAAvr55KAAABX1BMVEVtSytsSiubjXRpRytqSCtbVUdoTz/Bm36jfGOie2OifGOajHSajXSFe2VwZ1VtYlGlfWSYdV6KajJmRCuhk3mYinGYcFl2VSuunoJtU0J3XUqngWe+rY5+c2BdUkN+XkvAmn18ZVLOvJuomX5lVkammH3dyabGtJWvn4PZxqNjXU2gknjFtJSZi3J0UythPiuThWyXclqYc1uUhW2ShGyfeGDl0Kt3VitfPCuac1qcdl1eOyuShGtgPStjQSuhkXeUhm2ohmuAXytVMSt5WCvSv5yThGzEqYmed19vTSt9XCtwTiuXcVrl0ayWcFpyUStdOiuYiXCWcVp7Wiu7nH+wnoJxUCtrSSvBr5CXc1vm0azdyaWZc1uShWyBYSuThG3kz6qVhm6wj3Z8WyuhemJ1VCuadFxuTCvjzanJsJCSczygeWGajHOie2JkQiueeF9XMyuIaDBiPyuVh26XiHAEM5p5AAACG0lEQVR4XuzW1W0FQRiD0b+imWXey8zMzBBO+lfSQ/zoU8InWbIsvN3IfYcgd7TzFuK1q6ECobDa9uR2Dx8fIPQI7zdZ5g/FNxAqHvJLKUc9nYKQ7kVlma2QSZl0NZOxldEwlLHGkjU1EJlZ6ZspEJl9sVspELVscToaiDqOJNCk1EnEgA6fWgY+KZM6Aw1EA0cSaFIaJGJAfymZhhjzWKcgpOO5IWtLxV8gFCtrLZXLZhoEMQAFwXRzqcg2KhUyIFQoRVuxa/6wNCwA0F9Iv2bL3lX+sfEJQI2jr9y95J5dpc4NADor1X3m5PvUnHRBaNI8vcjP6/Var9eb/0a/7NnBbcQwDETRCU+S7IPtRcpIIapEF9L9H4OtIWNggfxXgA4DkYSoOedaFfqu9Tb/DOutdn+kRPrTlxF6KpuM0ELRvozQQnuTEVr4C59Io2SESsWQEcZmHk9ooXRHSqRbyYxeWjIj0i4j9Pz0Xsp4Qgtz4aOnP1IizZIRyj2e8Mi+lEiHjDA2bUNeRJolMx6kTR+P7zwmvozQwtxLUfnvJj5/T7yeYO+lqFR2GaHnE4XP2mR92WCNUB73lAnmfaTivF7TBK/rDP22AydXDIJAAEDniUlO4IXHvuOurdB/O2lijvNlVZohIVpVCWZxns0oCPNuMRB4yuWHgpSceIDWxWq/KIhdRW+wH1u8PyjIHbdjh3G95zOhIM/5XuMPR3QydajAz8UAAAAASUVORK5CYII=");
				this.incResContBgr.setWidth(338);
				this.incResContBgr.setHeight(69);
				this.incResCont.add(this.incResContBgr, {left: 0, top: 0});
				this.incResLab = new qx.ui.basic.Label("Incoming resources").set({font: "bold", textColor: "#ffCC82"});
				this.incResCont.add(this.incResLab, {left: 8, top: 3});
				this.incResLabNext = new qx.ui.basic.Label("Next arrival in:").set({font: "bold", width: 150, textAlign: "right", textColor: "#ffCC82"});
				this.incResCont.add(this.incResLabNext, {left: 180, top: 3});
				this.incResLabTr = new qx.ui.basic.Label("TR:").set({font: "bold", textColor: "#ffCC82"});
				this.incResCont.add(this.incResLabTr, {left: 6, top: 38});
				this.incResLabFs = new qx.ui.basic.Label("FS:").set({font: "bold", textColor: "#ffCC82"});
				this.incResCont.add(this.incResLabFs, {left: 7, top: 50});
				for (i=0; i<4; i++) {
					imgo = m.getFileInfo(m.resources[i+1].i);
					incResImg = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(imgo.url));
					incResImg.setHeight(22);
					incResImg.setWidth(20);
					incResImg.setScale(true);
					this.incResCont.add(incResImg, {top: 17, left: 5 + 83*i});
					incResLab = new qx.ui.basic.Label("").set({width: 62, textAlign: "center", font: "bold"});
					this.incResCont.setUserData("incResLab" + (i+1), incResLab);
					this.incResCont.add(incResLab, {top: 21, left: 27 + 82*i});
					incResLab = new qx.ui.basic.Label("").set({width: 62, textAlign: "center", font: "bold"});
					this.incResCont.setUserData("incResLabTot" + (i+1), incResLab);
					this.incResCont.add(incResLab, {top: 38, left: 27 + 82*i});
					incResLab = new qx.ui.basic.Label("").set({width: 62, textAlign: "center", font: "bold"});
					this.incResCont.setUserData("incResLabFree" + (i+1), incResLab);
					this.incResCont.add(incResLab, {top: 50, left: 27 + 82*i});
				}
				
				webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateIncResCont, this);
			},
			members: {
				incResCont: null,
				incResContBgr: null,
				incResLab: null,
				incResLabNext: null,
				incResLabTr: null,
				incResLabFs: null,
				updateIncResCont: function() {
					if (LT.options.showIncResCont == 0) {
						this.incResCont.setVisibility("excluded");
						return;
					}
					var c = webfrontend.data.City.getInstance();
					var it = c.tradeIncoming;
					if (it == null || it == undefined) {
						if (LT.options.showIncResCont == 2) {
							this.incResCont.setVisibility("excluded");
							return;
						}
						this.incResCont.setVisibility("visible");
						it = [];
					}
					this.incResCont.setVisibility("visible");
					var resVal = [0,0,0,0,0,-1]; // 0 - last trader, 1-4 res, 5 - first trader
					for (i=0; i<it.length; i++) {
						for (j=0; j<it[i].resources.length; j++) {
							resVal[it[i].resources[j].type] += it[i].resources[j].count;
						}
						if (it[i].end > resVal[0])
							resVal[0] = it[i].end;
						if (resVal[5] == -1 || it[i].end < resVal[5])
							resVal[5] = it[i].end;
					}

					for (i=1; i<5; i++) {
						freeSpc = 0;
						curVal = c.getResourceCount(i);
						curDel = c.resources[i].delta;
						curMax = c.getResourceMaxStorage(i);
						dateNow = new Date().getTime();
						this.incResCont.getUserData("incResLab" + i).setTextColor("#FFCC82");
						this.incResCont.getUserData("incResLab" + i).setValue(LT.thSep(resVal[i]));
						ft = 0;
						if (i == 4) {
							fc = Math.round(c.getFoodConsumption() * 3600);
							fcs = Math.round(c.getFoodConsumptionSupporter() * 3600);
							ft = c.getResourceGrowPerHour(i) - fc - fcs;
						}
						if (it.length > 0) {
							timeSpan = (LT.srvTime + resVal[0]*1000 - dateNow)/1000;
							resAtArrival = Math.floor(curVal + ((i == 4) ? ft*timeSpan/3600 : timeSpan * curDel) + resVal[i]);
							
							if (curVal == curMax)
								freeSpc = -resVal[i];
							else
								freeSpc = curMax - resAtArrival;
								
							if (resAtArrival > curMax) resAtArrival = curMax;
						} else {
							resAtArrival = Math.floor(curVal);
							freeSpc = curMax - curVal;
						}
						this.incResCont.getUserData("incResLabTot" + i).setValue(LT.thSep(resAtArrival));
						this.incResCont.getUserData("incResLabFree" + i).setValue(LT.thSep(Math.floor(freeSpc)));
						
						if (freeSpc < 0) {
							clr = LT.options.incResClrs[0];
						} else {
							clr = "#FFCC82";
						}
						this.incResCont.getUserData("incResLabFree" + i).setTextColor(clr);
						
						r = resAtArrival/curMax;
						clr = LT.options.incResClrs[3];
						if (r > 0) {
							if (r >= 1.0) {
								clr = LT.options.incResClrs[0];
							} else if (r >= 0.9) {
								clr = LT.options.incResClrs[1];
							} else if (r >= 0.75) {
								clr = LT.options.incResClrs[2];
							} else {
								clr = LT.options.incResClrs[3];
							}
						}
						this.incResCont.getUserData("incResLabTot" + i).setTextColor(clr);
					}
					
					if (it.length > 0) {
						timeSpan = (LT.srvTime + resVal[5]*1000 - dateNow)/1000;
						this.incResLabNext.setValue("Next arrival in: " + webfrontend.Util.getTimespanString(webfrontend.data.ServerTime.getInstance().getTimeSpan(timeSpan)));
					} else
						this.incResLabNext.setValue("");
				}
			}
		});
		qx.Class.define("louTweak.optionsPage", {
			extend: webfrontend.gui.OverlayWidget,
			construct: function() {
				webfrontend.gui.OverlayWidget.call(this);

				this.clientArea.setLayout(new qx.ui.layout.VBox(10));
				this.setTitle("LoU Tweak Options");
				this.tabView = new qx.ui.tabview.TabView().set({minHeight: 390, contentPaddingLeft: 15, contentPaddingRight: 10, contentPaddingTop: 10, contentPaddingBottom: 10});
				this.tabPages = [ {name:"General", page:null, vbox:null}, {name:"Hotkeys", page:null, vbox:null}, {name:"Colors", page:null, vbox:null} ];
				for (i=0; i<this.tabPages.length; i++) {
					page = new qx.ui.tabview.Page(this.tabPages[i].name);
					page.setLayout(new qx.ui.layout.Canvas());
					vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
					scroll = new qx.ui.container.Scroll(vbox);
					page.add(scroll, {top: 0, left: 0, right: 0, bottom: 0});
					this.tabPages[i].vbox = vbox;
					this.tabPages[i].page = page;
				}
				
				// Page1
				// ----- Switch to alliance tab
				cb = new qx.ui.form.CheckBox(L("opts_switch_to_ally_tab"));
				if (LT.options.switchToAllyTab)
					cb.setValue(true);
				cb.addListener("click", function() { LT.options.switchToAllyTab = this.getValue() ? true : false; }, cb);
				this.tabPages[0].vbox.add(cb);

				// ----- Tagless coords
				cb = new qx.ui.form.CheckBox(L("opts_tagless_coords"));
				if (LT.options.taglessCoords)
					cb.setValue(true);
				cb.addListener("click", function() { LT.options.taglessCoords = this.getValue() ? true : false; }, cb);
				this.tabPages[0].vbox.add(cb);

				// ----- Chat max lines / transparency
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("opts_max_chatlines"));
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				sp = new webfrontend.gui.SpinnerInt(10, LT.options.chatMaxLines, 100);
				sp.getChildControl("textfield").setLiveUpdate(true);
				sp.getChildControl("textfield").addListener("changeValue", function() { _val = parseInt(this.getValue()); LT.options.chatMaxLines = _val; webfrontend.config.Config.getInstance().getChat().setMaxLines(_val); }, sp);
				LT.a.setElementModalInput(sp);
				cont.add(sp);

				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("opts_chat_opacity"));
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				sp = new webfrontend.gui.SpinnerInt(0, (100-parseInt(LT.options.chatOpacity)), 100);
				sp.getChildControl("textfield").setLiveUpdate(true);
				sp.getChildControl("textfield").addListener("changeValue", function() { _val = parseInt(this.getValue()); LT.options.chatOpacity = 100 - _val; LT.a.chat.BgrLabel.setOpacity((100-_val)/100); }, sp);
				LT.a.setElementModalInput(sp);
				cont.add(sp);
				this.tabPages[0].vbox.add(cont);
				this.tabPages[0].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				// ----- -----
				
				// ----- Show queue info window
				cb = new qx.ui.form.CheckBox(L("opts_show_queue_win"));
				if (LT.options.showQueueTimes)
					cb.setValue(true);
				cb.addListener("click", function() { LT.options.showQueueTimes = this.getValue() ? true : false; }, cb);
				this.tabPages[0].vbox.add(cb);
				
				// ----- Requested resources limit
				cb = new qx.ui.form.CheckBox(L("opts_limit_req_res"));
				if (LT.options.resLimit)
					cb.setValue(true);
				cb.addListener("click", function() { LT.options.resLimit = this.getValue() ? true : false; }, cb);
				this.tabPages[0].vbox.add(cb);
				this.tabPages[0].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				// ----- -----
				
				// ----- Incoming resources label
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("opts_inc_res").lab);
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				rg = new qx.ui.form.RadioGroup();
				
				rbs = [ L("opts_inc_res").disabled, L("opts_inc_res").always, L("opts_inc_res").context ];
				for (i=0; i<rbs.length; i++) {
					rb = new qx.ui.form.RadioButton(rbs[i]);
					rb.setUserData("id", i);
					rb.setGroup(rg);
					cont.add(rb);
					cont.add(new qx.ui.core.Spacer(10));
				}
				
				rg.setSelection([rg.getChildren()[LT.options.showIncResCont]]);
				rg.addListener("changeSelection", function() { LT.options.showIncResCont = this.getSelection()[0].getUserData("id"); }, rg);
				this.tabPages[0].vbox.add(cont);
				
				// ----- Thousands separator
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("opts_separator").lab);
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				rg = new qx.ui.form.RadioGroup();
				
				rbs = [ L("opts_separator").period, L("opts_separator").comma, L("opts_separator").space, L("opts_separator").none ];
				for (i=0; i<rbs.length; i++) {
					rb = new qx.ui.form.RadioButton(rbs[i]);
					rb.setUserData("id", i);
					rb.setGroup(rg);
					cont.add(rb);
					cont.add(new qx.ui.core.Spacer(10));				
				}
			
				rg.setSelection([rg.getChildren()[LT.options.thousandsSeparator]]);
				rg.addListener("changeSelection", function() { LT.options.thousandsSeparator = this.getSelection()[0].getUserData("id"); }, rg);
				this.tabPages[0].vbox.add(cont);

				// ----- City tag
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("opts_city_tag").lab);
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				rg = new qx.ui.form.RadioGroup();
				
				rbs = [ L("opts_city_tag").info, L("opts_city_tag").region ];
				for (i=0; i<rbs.length; i++) {
					rb = new qx.ui.form.RadioButton(rbs[i]);
					rb.setUserData("id", i);
					rb.setGroup(rg);
					cont.add(rb);
					cont.add(new qx.ui.core.Spacer(10));				
				}

				rg.setSelection([rg.getChildren()[LT.options.cityTag]]);
				rg.addListener("changeSelection", function() { LT.options.cityTag = this.getSelection()[0].getUserData("id"); }, rg);
				this.tabPages[0].vbox.add(cont);

				// ----- Game language
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("opts_lang").lab);
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				rg = new qx.ui.form.RadioGroup();
				
				rbs = [ L("opts_lang").english, L("opts_lang").german ];
				for (i=0; i<rbs.length; i++) {
					rb = new qx.ui.form.RadioButton(rbs[i]);
					rb.setUserData("id", i);
					rb.setGroup(rg);
					cont.add(rb);
					cont.add(new qx.ui.core.Spacer(10));				
				}

				rg.setSelection([rg.getChildren()[(LT.options.userLang=="en"?0:1)]]);
				rg.addListener("changeSelection", function() { LT.options.userLang = (this.getSelection()[0].getUserData("id")==0?"en":"de"); }, rg);
				this.tabPages[0].vbox.add(cont);
				this.tabPages[0].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				// ----- -----

				// ----- Lowest level upgrades
				gr = new qx.ui.layout.Grid(0, 9);
				gr.setColumnMinWidth(0, 130);
				gr.setColumnMinWidth(1, 130);
				gr.setColumnMinWidth(2, 130);
				gr.setColumnMinWidth(3, 130);
				cont = new qx.ui.container.Composite(gr);
				
				lab = new qx.ui.basic.Label(L("opts_lowest_lvl").lab1);
				this.tabPages[0].vbox.add(lab);
				
				_bids = [47,48,50,4,5,49,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,36,37,38,39,40,41,42,43,44,45,46,12,23];
				mb = webfrontend.res.Main.getInstance().buildings;
				for (i=0; i<34; i++) {
					cb = new qx.ui.form.CheckBox(mb[_bids[i]].dn);
					if (LT.options.lowestLevelUpgradeIDs[i] != "")
						cb.setValue(true);
					cb.addListener("click", function() { LT.options.lowestLevelUpgradeIDs[this.i] = this.c.getValue() ? this.b : ""; }, {c:cb, b:_bids[i], i:i});
					cont.add(cb, {column: i%4, row: Math.floor(i/4)});
				}			
				this.tabPages[0].vbox.add(cont);				
				
				// ----- Level limits
				lab = new qx.ui.basic.Label(L("opts_lowest_lvl").lab2);
				this.tabPages[0].vbox.add(lab);
				
				gr = new qx.ui.layout.Grid(4, 4);
				gr.setColumnMinWidth(0, 60);
				gr.setColumnMinWidth(2, 60);
				gr.setColumnAlign(0, "right", "middle");
				gr.setColumnAlign(2, "right", "middle");
				cont = new qx.ui.container.Composite(gr);
				bTypesLabels = [ L("opts_lowest_lvl").towers, L("opts_lowest_lvl").military, L("opts_lowest_lvl").resource, L("opts_lowest_lvl").cottage, L("opts_lowest_lvl").barracks, L("opts_lowest_lvl").utilities ];
				for (i=0; i<6; i++) {
					lab = new qx.ui.basic.Label(bTypesLabels[i]);
					cont.add(lab, {row: Math.floor(i/2), column: ((i%2 == 0) ? 0 : 2)});
					sp = new webfrontend.gui.SpinnerInt(0, LT.options.lowestLevelMax[i], 10);
					sp.getChildControl("textfield").setLiveUpdate(true);
					sp.getChildControl("textfield").addListener("changeValue", function() { LT.options.lowestLevelMax[this.i] = parseInt(this.c.getValue()); }, {c:sp, i:i});
					LT.a.setElementModalInput(sp);
					cont.add(sp, {row: Math.floor(i/2), column: ((i%2 == 0) ? 1 : 3)});
				}
				this.tabPages[0].vbox.add(cont);
				this.tabPages[0].vbox.add(new qx.ui.core.Spacer(0, 10));
		
				// Page 2
				lab = new qx.ui.basic.Label(L("opts_set_hotkeys"));
				this.tabPages[1].vbox.add(lab);
				
				gr = new qx.ui.layout.Grid(5, 5);
				gr.setColumnMinWidth(0, 50);
				gr.setColumnMinWidth(1, 150);
				gr.setColumnMinWidth(2, 50);
				gr.setColumnMinWidth(3, 50);
				gr.setColumnMinWidth(4, 150);
				cont = new qx.ui.container.Composite(gr);
				
				btn_arr = [];

				// ----- Build hotkeys
				lab = new qx.ui.basic.Label(L("opts_hotkey_labels").lab1).set({font: "bold"});
				cont.add(lab, {column: 0, row: 0, colSpan: 2});

				cnt = 1;
				for (var i in window.louTweak.main.lou_building_id) {
					name = mb[window.louTweak.main.lou_building_id[i]].dn;
					hk = LT.options.hotkeys.build[i];
					
					lab  = new qx.ui.basic.Label(name);
					cont.add(lab, {column: 1, row: cnt});
					
					btn = new qx.ui.form.Button(hk).set({appearance: "button-recruiting", font: "bold"});
					btn.addListener("click", function() { LT.a.allowHotKey = false; this.o.btn.setLabel("..."); LT.a.mainContainer.addListenerOnce("keypress", function(e) { this.o.t.setKey(e, this.o); }, {o:this.o}); }, {o:{btn:btn, t:this, prop:i, group:"build"}});
					btn_arr.push({"btn":btn, "group":"build", "prop":i, "hk":hk});
					cont.add(btn, {column: 0, row: cnt});
					cnt++;
				}
				
				// ----- Other hotkeys
				oh = [
					[L("opts_hotkey_labels").lab2, -1, "upgrades"],
					[L("opts_hotkey_labels").upgrade, "upgrade", "upgrades"],
					[L("opts_hotkey_labels").downgrade, "downgrade", "upgrades"],
					[L("opts_hotkey_labels").minister, "minister", "upgrades"],
					[L("opts_hotkey_labels").lab4, -1, "global"],
					[L("opts_hotkey_labels").prev_city, "prevcity", "global"],
					[L("opts_hotkey_labels").next_city, "nextcity", "global"]
				];
				
				for (i=0; i<oh.length; i++) {
					if (oh[i][1] == -1) {
						lab = new qx.ui.basic.Label(oh[i][0]).set({font: "bold"});
						cont.add(lab, {column: 3, row: i, colSpan: 2});
					} else {
						name = oh[i][0];
						hk = LT.options.hotkeys[oh[i][2]][oh[i][1]];
						
						lab  = new qx.ui.basic.Label(name);
						cont.add(lab, {column: 4, row: i});
						
						btn = new qx.ui.form.Button(hk).set({appearance: "button-recruiting", font: "bold"});
						btn.addListener("click", function() { LT.a.allowHotKey = false; this.o.btn.setLabel("..."); LT.a.mainContainer.addListenerOnce("keypress", function(e) { this.o.t.setKey(e, this.o); }, {o:this.o}); }, {o:{btn:btn, t:this, prop:oh[i][1], group:oh[i][2]}});
						btn_arr.push({"btn":btn, "group":oh[i][2], "prop":oh[i][1], "hk":hk});
						cont.add(btn, {column: 3, row: i});
					}
				}
				LT.a.setUserData("btn_arr", btn_arr);
				this.tabPages[1].vbox.add(cont);
				// ----- -----
				
				// Page 3
				
				// Color selector
				this.clrSel = new qx.ui.control.ColorPopup();
				this.clrSel.exclude();
				this.clrSel._createColorSelector();
				for (var G in this.clrSel) {
					if (this.clrSel[G] instanceof qx.ui.window.Window) {
						this.clrSel[G].set({ showMaximize: false, showMinimize: false, allowMaximize: false });
						break;
					}
				}
				this.clrSel.addListener("changeValue", function(e) {
					co = e.getData();
					if (co == null) return;

					co = '#' + qx.util.ColorUtil.rgbToHexString(qx.util.ColorUtil.stringToRgb(co));
					t = this.clrSel.getUserData("_type");
					id = this.clrSel.getUserData("_id");
					if (t == "incres")
						LT.options.incResClrs[id] = co;
					else if (t == "chat") {
						LT.options.chatColors[id] = co;
						chat = webfrontend.config.Config.getInstance().getChat();
						prop = ["global", "_a", "not_used", "privatein", "privateout"];
						if (id != 2)
							chat.channelColors[prop[id]] = co;
						else
							LT.a.chat.BgrLabel.setBackgroundColor(co);
					}
					this.clrSel.getUserData("_btn").setBackgroundColor(co);
				}, this);
				
				this.tabPages[2].page.add(this.clrSel);
				
				// ----- Incres colors
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox(3));
				lab = new qx.ui.basic.Label(L("opts_clr_inc_res")).set({marginRight: 10});
				cont.add(lab);
				
				cl = [ "Full:", "High:", "Med:", "Low:" ];
				for (i=0; i<cl.length; i++) {
					lab = new qx.ui.basic.Label(cl[i]);
					cont.add(lab);

					btn = new qx.ui.form.Button().set({width: 20, backgroundColor: LT.options.incResClrs[i], padding: [5,15,5,15], decorator: new qx.ui.decoration.Single(1, "solid", "#b2956e"), cursor: "pointer"});
					btn.addListener("click", this.setColor, {b:btn, id:i, t:this, type:"incres"});
					cont.add(btn);
					cont.add(new qx.ui.core.Spacer(10));
				}

				this.tabPages[2].vbox.add(cont);
				this.tabPages[2].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));

				// ----- Chat colors
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox(3));
				lab = new qx.ui.basic.Label(L("opts_clr_chat").lab);
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				cl = [
					L("opts_clr_chat").all,
					L("opts_clr_chat").alliance,
					L("opts_clr_chat").background,
					L("opts_clr_chat").whisper
				];
				for (i=0; i<cl.length; i++) {
					lab = new qx.ui.basic.Label(cl[i]);
					cont.add(lab);

					btn = new qx.ui.form.Button().set({width: 20, backgroundColor: LT.options.chatColors[i], padding: [5,15,5,15], decorator: new qx.ui.decoration.Single(1, "solid", "#b2956e"), cursor: "pointer"});
					btn.addListener("click", this.setColor, {b:btn, id:i, t:this, type:"chat"});
					cont.add(btn);
					cont.add(new qx.ui.core.Spacer(10));
					if (i == 3) {
						btn = new qx.ui.form.Button().set({width: 20, backgroundColor: LT.options.chatColors[i+1], padding: [5,15,5,15], decorator: new qx.ui.decoration.Single(1, "solid", "#b2956e"), cursor: "pointer"});
						btn.addListener("click", this.setColor, {b:btn, id:i+1, t:this, type:"chat"});
						cont.add(btn);
					}
				}
				this.tabPages[2].vbox.add(cont);
				// ----- -----
				
				// ----- Save Button
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				btn = new qx.ui.form.Button(L("opts").save).set({width: 90, marginLeft: 30});
				btn.addListener("click", this.saveOptions, this);
				cont.add(btn);

				this.expImpWin = this.createExpImpWindow();
				// ----- Export button
				btn = new qx.ui.form.Button(L("opts")['export']).set({appearance: "button-text-small", marginLeft: 300});
				btn.addListener("click", function(){
					this.expImpWin.setCaption(L("opts")['export']);
					this.expImpWin.setUserData("id", 2);
					this.expImpWin.getUserData("lab").setValue(L("opts").export_lab);
					this.expImpWin.getUserData("ta").setValue(qx.util.Json.stringify(LT.options));
					this.expImpWin.open();
				}, this);
				cont.add(btn);
				
				// ----- Import button
				btn = new qx.ui.form.Button(L("opts")['import']).set({appearance: "button-text-small"});
				btn.addListener("click", function(){
					this.expImpWin.setCaption(L("opts")['import']);
					this.expImpWin.setUserData("id", 1);
					this.expImpWin.getUserData("lab").setValue(L("opts").import_lab);
					this.expImpWin.getUserData("ta").setValue("");
					this.expImpWin.open();
				}, this);
				cont.add(btn);
				// ----- -----
				this.tabView.add(this.tabPages[0].page);
				this.tabView.add(this.tabPages[1].page);
				this.tabView.add(this.tabPages[2].page);
				
				this.clientArea.add(this.tabView);
				this.clientArea.add(cont);

			},
			members: {
				tabView: null,
				tabPages: null,
				clrSel: null,
				expImpWin: null,
				setKey: function(e, o) {
					if (LT.a.getCurrentOverlay() != o.t) {
						LT.a.allowHotKey = true;
						return;
					}
					key = e.getKeyIdentifier();
					ch = null;
					cb = null;
					ba = LT.a.getUserData("btn_arr");
					for (i=0; i<ba.length; i++) {
						if (ba[i].group == o.group && ba[i].hk == key)
							ch = ba[i];
						if (ba[i].btn == o.btn)
							cb = ba[i];
					}
					
					if (!/,/.test(key)) {
						if (key != "Delete") {
							if (o.group == "global" && /[BCMEUL]/.test(key)) {// global hotkeys B,C,M,R,U,L,(S,X,[,]), E prior to asscession
								o.btn.setLabel(LT.options.hotkeys[o.group][o.prop]);
								LT.a.allowHotKey = true;
								return;
							}
							if (ch) {
								LT.options.hotkeys[o.group][ch.prop] = "";
								ch.btn.setLabel("");
								ch.hk = "";
							}
							LT.options.hotkeys[o.group][o.prop] = key;
							cb.btn.setLabel(key);
							cb.hk = key;
						} else {
							LT.options.hotkeys[o.group][o.prop] = "";
							cb.btn.setLabel("");
							cb.hk = "";
						}
					}
					LT.a.allowHotKey = true;
				},
				setColor: function() {
					cs = this.t.clrSel;
					cs.setUserData("_id", this.id);
					cs.setUserData("_btn", this.b);
					cs.setUserData("_type", this.type);
					cs.moveTo(100, 50);
					if (this.type == "incres")
						cs.setValue(LT.options.incResClrs[this.id]);
					else if (this.type == "chat")
						cs.setValue(LT.options.chatColors[this.id]);
					cs.show();
				},
				saveOptions: function() {
					str = qx.util.Json.stringify(LT.options);
					localStorage.setItem("LT_options", str);
					LT.a.switchOverlay(null);
				},
				createExpImpWindow: function() {
					win = new qx.ui.window.Window("");
					win.setLayout(new qx.ui.layout.VBox(10));
					win.set({showMaximize: false, showMinimize: false, allowMaximize: false});
					win.setWidth(450);
					win.setHeight(200);
					//win.open();
					LT.a.getRoot().add(win, {left:250, top:200});

					lab = new qx.ui.basic.Label("");
					win.add(lab);
					win.setUserData("lab", lab);
					
					ta = new qx.ui.form.TextArea(qx.util.Json.stringify(LT.options));
					win.add(ta, {height: 65});
					win.setUserData("ta", ta);
					btn = new qx.ui.form.Button("OK").set({maxWidth: 50, alignX: "center"});
					btn.addListener("click", function(){
						id = this.getUserData("id");
						if (id == 1) {
							txt = this.getUserData("ta").getValue();
							try {
								obj = qx.util.Json.parse(txt);
							} catch(e) { obj = "error"; }
							if (typeof obj == "object" && obj != null) {
								LT.options = qx.util.Json.parse(txt);
								localStorage.setItem("LT_options", txt);
								this.close();
							} else {
								alert(L("opts").import_invalid);
							}
						} else if (id == 2) {
							this.close();
						}
					}, win);
					win.add(btn);
					return win;
				}
			}
		});
		qx.Class.define("louTweak.overlayObject", {
			extend: webfrontend.vis.Entity,
			statics: {
				img: {
					"0": "data:image/png;base64,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",
					"47": "data:image/png;base64,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",
					"48": "data:image/png;base64,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",
					"50": "data:image/png;base64,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",
					"4": "data:image/png;base64,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",
					"5": "data:image/png;base64,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",
					"49": "data:image/png;base64,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",
					"7": "data:image/png;base64,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",
					"8": "data:image/png;base64,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",
					"9": "data:image/png;base64,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",
					"10": "data:image/png;base64,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",
					"11": "data:image/png;base64,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",
					"13": "data:image/png;base64,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",
					"14": "data:image/png;base64,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",
					"15": "data:image/png;base64,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",
					"16": "data:image/png;base64,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",
					"17": "data:image/png;base64,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",
					"18": "data:image/png;base64,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",
					"19": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAT60lEQVR4Xs15d5Ac9bV193Tunp7pyXl3Ns3moF2tpFXOWmWSTLJsMEkYMEnCPD8wDzB2GcokJ3jYmGBsAy5sgwATJBkBiqtdrTavNszuhJ2cp6en42uHesGFefb7jD/3Pz3VNbd+p86999zbp4HP+tJoQK/L4nG7aZrRaDTAP8+1tLlqz96Hbrr1wfrmJYxeD/4zYAJBoKl94/aL79t58Z3X33TPxp172xav91TWfHrUZ85qd88ab00PXwpiOB1aKC3p7PD5GhlnS11zJwyB/39g2Wy21kWXikI2m+NAjVgqFY+fGCkVpMaaCspYVVnbhKHIPxqWSsW2C241m/UogtgsRrvdhGEQV+JRkgEleFFTI2mo7lqzQ622fyis9q5NrsrG+UC4qrq2o6tjeHhSq2cYI03T2nS+HAotrF66VFHwyqZlRoPhz2KhzwiTlkK3X7i/0sMU8tlMuohROouJ5kUgm8qYzTotpR0+N47gNKMzVVdXFso8haO5bFJRPvsedLk89z307LcefenJH7524N5nr7z2m7d/9Xtrem/fefH+a2/6Zu+umxYvv2Jd7w17rrjjossObN5zc2vXcook/tC8n6WGwDCwrKXyhlsfeeGXH93zjaevv/XxBx9+ef99P7n/2y9dtPf+f7n38d2fu2PZmqsX91yy/96X6n0tvraVy7dcyRitf0jiZ1nzO7asiA6/338+pTNWSaJoMuvZIusPZEkcRyENgihGk91sdcyc/7BN62+t0x/54ERDa0cyHv9M8FC01uOt61yya8/uSx69afvwqTfrvA1X7nvsxju/+53vvXL71569+8FXL736vi9e98CVX3rglv2PqCGL7Ngz91xy8OmvfO2W3QiK/J070eZwuysbqnxrndVbezbsiWXKbx4+kxr5cPMiw7ZlGI4hE7OpzjY3BpcIwoyQ1o7utb947rFlTc6brlyVyrI/fvrVdZ0NlU7z3w0WBAHuyiYUszoqu2vr28siqYi8okEHo+L3n31lSYNr54bug9/fh8LcbCgDKILVQtb5fD9+9pENzfilS60/P9j31MGxszPJH/3oNQQQ/w6ASIL4Q9/VLll10YV779n1hW9dcsP3duz97gMPvbh1x7UM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",
					"20": "data:image/png;base64,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",
					"21": "data:image/png;base64,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",
					"22": "data:image/png;base64,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",
					"36": "data:image/png;base64,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",
					"37": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAASbElEQVR4Xu2YaXgU15lGa+3aele31JJa3a19RxLCErKRBQLssNlgGxswxDuxnbEJGZIYx9mfOBlP7NixgyeJJ06IExITjMJijAEDwWCMWYUQWkBLq9Wt3vfal7mSbZjHD/bM5JlM/GO+H61SVd17T333/d5bt6D/q/j/qGtsXLf+6587rLvvfeiZ51763GHN7FjVNneJ0VL6OWJyuluf+O6Oiro7bY7WzxHW9Lb7vv30roaW+xpb7tGbXP+7nSN/Y6o8rTZ7sUFPqRBCMhZX6WxoKkwmE/QPDFfF8iV3/vDZnx+as+CJm2/9zg3zntCRtn9wtmhDaaGzuK66jCAIHMeybJbQoSjh+exWBfmOxunNf0esitpOnQ72+kLRaAJH8VQy6XQWuksaIQj+tCbgwuMbNsoq8vfCIgmD3pBnMVtmXd+MIBrHswYDMzx02WqxFlcsumaT2fNv/rc//Pls/2Amo/w3R8H+p1iCkBbSAaJw+vCo3+120gxDUjR4vCJ31cRA1yduLquoWrb6HlWDn3/6XyIhjZU06G8N+LMv4zj65MPL5y/9zmvbJ7bsDK57YuejG7bfsfpZZ35xfUX+ldssVsu3fvDjp1/8RX1zOyhQZ8nsfFdHed1Kgsj9W6CAipGPJ/aRNXe8v+t3C2d9Uqe/+cHi60ptQO4NNe62hianU28xEEvnuDvbmjGcIHTk41/b+MzLv5678DaKzjPZZjiKbsjJnV5Wc+v1c79izGn5L7IyFciH+Wlvqv74vAbD6GThWA2PPfLgpp9vigQDn2jpz1oaWxtW3tF6+3zL7LaGVbdU1tZVEkTB4JD3hU0vv7T5tf7Lwz966nvvvH2qddYymrGJkuIoqrJYi2y2vAJXNYoZPgPoquQpDFrY0UqjEAhJllV1UpicIA0MDFZUVAyFYlda6mnq5vaZFRVtJkmKJJQwy3CJ+EjvuOgbvnjmlLuuZXg8uuFL647uP5WTV19WOR1FSUlhLVanouA6gpjwj8MQ6irr/Aygq1isDG3fucdi0oNjVVE1DUIQkEL18NH3OEGuyDNPojOWPLv95R9u/O7Xvzw8OrTg9tXt9S3b/3hSERKFeY3V1RVB2X38yKkTbx/BaI/FXk6QlCRxVmsOgtAlpdUwwEERu5nJz3eUVTQBkk8AXdsgUNq8/uF77rqpDfxvJ+Cfff8bq5fdnJ9nP/7ukQXzOha01Zntdo2w7Dp4NMMJzXXVhW7nud7+KOR87UDf0VMnz44iERaaWWu00aG8ohZNUxVZymQgWRGrq6b1918gCMo/7vOF4haryWIy0sYK6DMD/Yha4m5orlckbt2jD96zZsWhvW8xev0dy5fTJDF30dJseMwb48LheMA/MhaIhiLRl3/5677hkNFiNxnNgoyPRVNmyFtSmHvsTPeiLyz1hXhJlPILPE3T9XvfPCSraEVFldFk1uEoUDMQidnq8Q4fu5KwT8XK8tJ1deWJWHz7G13Dfb0ToUBBfsHoqBckr/66VrPZYiO0Y70D4VCYFQSe52McImJWk82MYTqeF2kCoXAlmeV1GJZDKybnDcD6SYoqK2NSCZmkzFar6fSpk57iknQ6A0BC4Ziqalw2cIXs2lid19UaGdA5tu3oeW8g4o+kdu7ZJQl8KBo/d/jtSGDU5w10jwYdQBmVFTqz05TvQiGJNhr4bBYlcCEjsCpOahlZg1QuWDNj0YUL/UajSeCJ994/m0pGTGbLtIYmHMddRU5ARuoQGHN8cWkNpKi+idAVtGub55P33vr0b/7y4fGbm18YD0QO7u5aftdtGIrt3Ln3T8f7ysvLymsbNIiyFBacOXzYku+QRTU4NpRMZnBR1aRxSeCqih2+ONPc+UDP+Qutra1dXdtdrhJQSzRNcRwHfBEM6hsPDV04+fMX7r91XouzdhY8ZUvwp62JfYF4Q2kBODAxJKIjCz2enNxJU5ZlWdJUi9WKorD30qDRYi50uSEMg0RRVkWCNjF6Os5LiopyQGgo4cxHLTQmioJez2TTYD5jPM95XC6aMaazEkPjZ3atO7Hv6a9+7dmHH3kcghFtyi8/danu2vvXBbNvWNZRtW7loqfWf7X71Cmr3a7IiiSJiXTWYDYiCJJmYyRBcAJny3fAmorAsNFqTqZSy2+q6WipBMKDMTSZYduKUU7CEAQGtALPgec6cuyUxAYeub1gT9fmS0N9m158bv6NZQlWgDR1ctY+Y6kG18OJ9MKbFsIIcWOnxLJpqy03GokaDXqWlyyGPFVTVEnQEaTEs6gqQTpS4flEPLZqfuMzP/3OwLn+npGoCiGKopUWiXarxWAwKoo0cmlgZsfCvt4Tp7d9VYaoV14lN3zzRxiKaxg5NOq7oqVPzVZJUf7cmTVvHzj6s+efj8VjOfbchunNAf84y2VFSeYFSeIFCoPjYb+iIjTD3L2gdeOauUJk6Hzv4O83/2XN/Y+ODg4cO3WRF1TSnkMTAkgeRenXP3D9pg3ulunVK9Z+547la216SuA48JxGI0XSzJTcr2EQV+POJTc11Nd7x3yyCm3+8+t3L1uJanzdtGnRQGDfiXPDoyN5uZaXn3kKTk688stXpNjYxsfvgaVsMpn1eJzvHDg8cnkQpLPQbg4FxmNpWSCaykpdA5f8uDzS1FR57r03IUXRUWQ8nU0k2YamxrGhgYlwJMuJV2zi2lgrFsxCYHT/X9+HJC4e9IUnvItvW87ywvnus3GN4Xh+dlvTQ/fetXv3WxxwS0fekaMnz/YNsZIaDgYS0bCqqmCM/NycEk9R98WLBmMpydj4dGDgwv6R/n5ZVYOxVDAY8wbDo8GYIqsrV684ffZCIpm+ujRecxKzbOroiVNDly/NmNHkqa6naOOlgf6+i319o149jRcXFZpIZuDiEIVAr7z4zLq1dzfVV5YVWkgpOzjsxQiSpClRQ1hBAn4xvb525OSLJ4/9wD/yx1qPPZJmJ+JsMJ4KxhKz22etWLagobbi9a07ykpKv/zFpR+JS5uMa2B90DO6/rG1yxZ1Zljx4P4DCIrs6Np5592rMUVNBEMjYz6Pu8DjcZscrkQsuuX1HR6Pa7i/V5Eyfn8ox2JRNUgGtanJ7bNaH3tw1WMP32PVW+bMvtEXzoxNJC5eGqFx3W0L25um1VdWVbo9JUsWzK2vr+npuwyyhGI4imIfsn2EhUwFOMBlnofoaCxTUFRYVV31wEMPNTTWnz3fazCZMIoOhmMmEu/pOVPscf9l155/37IdhfHqpjZbYQlOkIloZNgbsBto0MRis7W0z7aYzL4h77vvHDNZLSKXMhuppqY6d0VDVtJkjjPo8eMfnN3z1r5IPFFUaCQJQAXc5qM0gSMYEH5ovllB/ubGJzZ87/tPfu/JMx+8H4tGB0aDZj3lKXAYjDSBoUVlFTIoLpjFUUyHodl0nDEYU4kUx2b7h8Yap9Wf+eDA8juWnTx7YfX9X3nl9b0awodDMWeuce2D9y25+cbSqmneMa9eJ436Alvf2DXuG29pbrDZrASls+cwpA7W68mPsDAURTCM53mAl+Kl5bfc9N7e3auWroRg8p19+6dNqxz0jhe53AoPHF2JxDOkwRrn0Wg8KUqqPxCe8Afefe9EU2O9AmOzbrhOlJSde94pqaqKJ2KSJIiihlHK5UujVhpqbJrReePkZqlrz8EPTp/FdZTHU5RNRIFdg7wA46VpgqFws4nRgScmdDpFlTEUU1WtzOWIhWPLbl8sS+rZ0yddHs8X2mtf/+M2u8VUVll+8PhZq4EiUXhoePTAoaPVDTW1FWVbtu3+7eZX71/ahlNMz4X+X/xmy0Q0BqSmSCJwvtIyuz8QbWxsPnLywvx58y/2D/3+D1udBQ4FQtksq8NRhqLGxv2cyIG5AvlRZQVGYIAIHFlhKJogdRiOKYpsteU89/wvMrzwkxde+Kf1j+8/2j335gV/3rGXobCGfOq+tWtXrFlFErpIOLhj158eWncfBzzsV7/auvNwT/+wyWolSZ2qwMFAkDESJqMhm+UYmujtHRzzTdTWVhoYIs9qgGU5nUglEnGgplQqjaCQDscIAoyPQFNMGIYioCMR5FpTQdqkbBpILRJLxZPpl17apML4zFmdu7r2LFy21GGzgXwEBk4HxrxDQ5dVRdjx2tZ92/fesmxZqccdFyCKInv7BgcGLmkQrDfqJQGCNTgFXFWSgTMRBP7q5i1GYDO0QcV0vCAgKK6pck6OmcQJZErfwPbApMmygiA4ajbpdTqc1umaGiuFdLq0pFRDUIFLq4iup6d3Zq1rya1LeAix5Jc+8PCj7pJyoMXOm+Ytv+suRVEvjXgzGfbtA4cFQSQx6EJPD20wGRhKEDiLyZTOJGUtGwhnEZQ0mfSKDDVUF588fV6VZZbjIUg1Gg1jXj9ITCqVUlQNdJhMcemMOEkGKM1GMpZi+/pHOU7MZNmA37dicUcwOOH1+SAc3bZj98lj717qPvHSsz86vGfH88/+60jP+S2/fuXF537y/vET739wZs6cWb29vbwkaZoyPOLDYDCAwvI8+JPIyC4HDTBQHJbBSCiRTcXAdRWCgYokUSNogs5PQriSSHL+AJhSAWROUzVElqVAMAEqMTARLCsrAR6TSaf9CWlm8/TH771Lr7fE09KMpvrh8fDc2bPLaxqyAsRL3KGjR+e0z+B4yeVy23NsRpPJkZeHoBiMIqIMA/niOIYhJENQZC6WW2iI87GAPwjuMZFoNsuaGGNpmYODxngyEE9xgfF0PMFrk3YFKao6qXrQdSbLl5Zai+sMoZTfTDG8AkkCH0nE9hw5ASaF0dOiIDM0vf7bPzbRiCvfprfYonFOR5lPnDxz8MgRnk1JkhgOBXU4rqoQrachVWGzmUAsbi8wTASyOMY/tuLB6XW1b3Z1TYSSDIGZCjLx7IiCS73nkt1HIooBAjGpdBSFAZmiIlXFdnDqlrmtDGYOqYncQiqZTBsp3ZuvbwW4sVji0sUem0nnLCwYD8VEDdcxRr2BseXkAOtDMdAVZnfkUSRDM3oEwxVRjEWCoVAkL9dpMtCKAujJrKT87q1NIO8yltLnIxPixMAIqCvx4vkEDmmTQBwKilGSQKZUBEE1TcNGxmNmG7p133s1RQUDIb8mIeXlFXqaFBDcbjZikMhnQOICnJIDOsizAsOD/N5xWZEvD14WJQlMkySKksCCAElFCcxoMLsqNbOboiLJkmnY5W0ySRNJTnz51T01VQWXR2KSDBsYhNTjMqtoyFRomKyJEAhNm1x+VAgTJFXm4HQyMWt6nTQGvXvxODBnnhckRb40PMRq7YTJQVk86VgW3J9ihUQK7FzYTCbDcSysKpLAsdmUhqKKLPvG/bNbGtk0n86kwr3REa8QSIrBCCdJwCBQUYA0lE/HFDA6nwI/kxx6hgL1AQpZVScJQbZkSZlcD/PtRiB+h02/Ymnd3PaqWZ2ufJf5iQeWgzZP//ND3Ye23dLRvHJxZ0OZG5z51Y83fmXNstP736h35mxYs0AHTcbK225paar9xpfurHAzi+fUze0sbW63zmwrdZUzOAZ/2lcQ4Ol6hrTlmK1mPZhBUCIAC58MDFzFgtEUzRjsZtztKBSyoUg867Doth84lGtGB7yDqNShp4gHVy2WcasscWPhtEbRg72nKQoz5uR1/fanaU72Xe6JhiiGJOIxSbguHfVnUjE5FvMlQsLHEFMK0iAUnaRhKAKcAkoiQZN4CkVRWVZRBAF3gJBleRJa0yCQufYZxfkOvU2vFhfmSLyMwKqexLtHJ1pqp+3ed1CGEzo4W1ZUbNASGEbVVJZ3d18oLbQlVXHwxF+92fC5C16nwzYaHgHjeftS42Msn1WuMn2817KYGEKHS7LK8yK4IkoiRZKSJKkQhOtQGEJUbTKufi3JMdP33d7Y3los8tBYMHH43YsiJA/E4xWmqhPdPZ4GykgRTYVulKXP+SKL57VufWMP7lDtuDPMjnrjYibFkhAVCCYhBUZwlEvL4NE/3s9MQhU4LDwn8qI09Q1CRdHJjAiiiKOAUoI0GNwrTxaico29P6mD1ywqe+mped96+PqfPrlw1dKWtibnvI6GGztqqppypzWWVjUz+SXMvJamjs5CWyk5e3FuVbMpN5+0FRC2PN2V9FwJBAYYME3pwBxZzQYdgQEgXAeqlTabTEYjzdAUgsAURQLH+qj5Nb8toQhc7DQ31TqB8qLJbDDEWnOswHW9kVA8wlqt1MREiuUEs50EJcOzik6HpBISBE92p6n/qR8UAb9APaosAzKgpyzLqxqkTSURUAqiDFSOAatTVI7nP4HxHxCBBa1u6/EAAAAAAElFTkSuQmCC",
					"bg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAfpJREFUaENjTE9X+8+ABGQFuRmk+DkZmJkYGVAkkBUNYvb3X38Ybr/6zPAVSKMAkEdBuLFM///Fpb7/v++JHhZ400RHsL9gmAHEaC43QPHcvAqr/7NKLf9PKTAbcnhLpxPcL7unuqJ69NIySEwurLb+z8LMCEqxQxo7GIrDPTu7xRLsWYbmCkRsDgdPwiIpxk0J7NnzC3wgHp3bbgUWACXXoR6TyO7n5mAB++vTzkiIRxd0WoMFQPlxOHkU5BdYwTrq0eESs6MxOlxiEuaP0RgdjdEh2lIaTbqjSXc06Q7uXs5oHh3No6N5dDSPDoq+7WhhNFoYjRZGo4XRaGFEz3JgtNSlZ2jTw67RGKVHKNPTjtEYpWdo08Ou0RilRyjT047RGKVnaNPDrtEYpUco09OO0RilZ2jTw67RGKVHKNPTjtEYpWdo08Ou0RilRyjT047RGKVnaNPDLpQYXdQ1QhY9Tm82B6+C3NDmMCgGnakV08rSvGB/Pd8YClnGWpSnBV/uCVq5TC2LBtqcCbmmkAjsdIB4FERsmYxYhx7rrvSfh5NlyHpYVYb3P8yTII/mJGggPAry7M5JLsNidwTyLo/ccIgn4TEK47QXGP0/MtXj/8ftEUPW04/WBP+fU275P9BV7n9ysgp2j4I8nJqq+j8+XnnIY+Q9LyA2AAW4vKIVZy2TAAAAAElFTkSuQmCC"
				}
			},
			construct: function (vis, x, y, img_id) {
				webfrontend.vis.Entity.call(this);
				this.drawNode = new webfrontend.draw.ImageNode.create(vis.scene, x+4, y+4, 50, 50, this.self(arguments).img[img_id]);
				this.drawNode.setSortOrder(100000);
				this.backgroundNode = new webfrontend.draw.BackgroundTextNode(vis.scene, x, y, 58, 58, this.self(arguments).img["bg"], "");
				this.backgroundNode.setSortOrder(99999);
			},
			destruct: function() {
				if (this.drawNode) {
					this.drawNode.release();
					this.drawNode = null;
				}
				this._disposeObjects("backgroundNode");
			},
			members: {
				drawNode: null,
				backgroundNode: null
			}
		});
		qx.Class.define("louTweak.layoutWindow", {
			extend: qx.core.Object,
			statics: {
				node: {
					"28":0,	"90":0,	"29":1,	"91":1,	"27":2,	"92":2,	"30":3,	"93":3,	"23":4,	"1":5,	"2":6,	"3":7,	"4":8,
					"5":9,	"6":10,	"7":11,	"8":12,	"9":13,	"10":14,"11":15,"12":16,"13":17,"14":18,"15":19,"16":20,"17":21,
					"18":22,"19":23,"20":24,"21":25,"22":26,"36":27,"37":28,"38":29,"39":30,"40":31,"41":32,"42":33,"43":34,
					"44":35,"45":36,"46":37,"98":38,"99":39,"-2":40,"-1":41,"97":46, "47":42, "48":43, "49":45, "50":44
				},
				louCityP: [
					":",".",",",";","#","W","Q","F","C","P","I","L","M","H","A","D","T","U","B","K","G", //20
					"E","Y","V","S","X","R","J","Z","#","#","#","#","#","#","#","#","#","-","#","#","#", //41
					"2","3","1","4","_" //42-45, 46
				],
				louFCityP: [
					"B","A","C","D", "","F","G","I","O","J","H","K","N","1","L","M","0","E","P","S","Q",
					"U","V","Y","Z","X","T","R","W", "", "", "", "", "", "", "", "", "","0", "","0", "",
					"2","3","5","4","0"
				],
				fcpToSs: {
					"B":":", "A":".", "C":",", "D":";", "E":"U", "F":"W", "G":"Q", "H":"I",
					"I":"F", "J":"P", "K":"L", "L":"A", "M":"D", "N":"M", "O":"C", "P":"B",
					"Q":"G", "R":"J", "S":"K", "T":"R", "U":"E", "V":"Y", "W":"Z", "X":"X",
					"Y":"V", "Z":"S", "1":"H", "0":"-", "2":"2", "3":"3", "4":"4", "5":"1"
				},
				ssToId: {
					"2":47, "3":48, "1":50, "C": 4, "P": 5, "4":49, "L": 7, "M": 8,
					"H": 9, "A":10, "D":11, "T":12, "U":13, "B":14, "K":15, "G":16,
					"E":17, "Y":18, "V":19, "S":20, "X":21, "R":22, "J":36, "Z":37
				},
				land: "########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######---------#######----#---------#----##----#---------#----##----##-------##----##-----##-----##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################",
				water: "########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######---------#######----#---------#----##----#---------#----##----##-------##----##-----##-----##-----##------#######--__--##---------#----_##_-##---------#----_###_###--------#-----_#######-------#------_########################",
				error: {
					"resource": "invalid resource node position",
					"castle": "invalid building position (Castle)",
					"water": "invalid building position (Harbor/Shipyard)",
					"type": "invalid Sharestring type (${stype} => ${ctype})",
					"hash": "invalid Sharestring"
				}
			},
			construct: function() {
				this.win = new qx.ui.window.Window(L("layout").city);
				this.win.setLayout(new qx.ui.layout.Canvas());
				this.win.set({showMaximize: false, showMinimize: false, allowMaximize: false});
				this.win.setWidth(350);
				this.win.setHeight(230);

				this.tabView = new qx.ui.tabview.TabView().set({contentPadding: 5});
				page1 = new qx.ui.tabview.Page("Sharestring");
				page1.setLayout(new qx.ui.layout.VBox(5));
				page2 = new qx.ui.tabview.Page(L("layout").overlay);
				page2.setLayout(new qx.ui.layout.VBox(5));
				
				// Page 1
				this.ssTa = new qx.ui.form.TextArea("").set({height: 85});
				this.ssTa.addListener("appear", function(){this.selectAllText();});
				page1.add(this.ssTa);

				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
				btn = new qx.ui.form.Button("LoU City Planner").set({maxWidth: 125, appearance: "button-text-small"});
				btn.addListener("click", function(){this.showSharestring("s")}, this);
				cont.add(btn);

				btn = new qx.ui.form.Button("LoU Flash City Planner").set({maxWidth: 125, appearance: "button-text-small"});
				btn.addListener("click", function(){this.showSharestring("u")}, this);
				cont.add(btn);

				this.louFCPlink = new qx.ui.basic.Label("Open in Flash City Planner").set({
					textColor: "#105510",
					rich: true,
					appearance: "clickable-link",
					cursor: "pointer",
					marginLeft: 200
				});
				this.louFCPlink.addListener("click", function(){LT.a.showExternal(this.cityLayout.u);}, this);
				this.louFCPlink.setVisibility("hidden");
				cont.add(this.louFCPlink);
				page1.add(cont);

				// Page 2
				this.olTa = new qx.ui.form.TextArea("").set({height: 85});
				page2.add(this.olTa);

				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
				btn = new qx.ui.form.Button(L("layout").apply).set({maxWidth: 150, appearance: "button-text-small"});
				btn.addListener("click", this.applyLayout, this);
				cont.add(btn);

				btn = new qx.ui.form.Button(L("layout").remove).set({maxWidth: 150, appearance: "button-text-small"});
				btn.addListener("click", this.removeLayout, this);
				cont.add(btn);
				
				this.errorLabel = new qx.ui.basic.Label("").set({ textColor: "#FF0000", marginLeft: 20, font: "bold"});
				cont.add(this.errorLabel);
				page2.add(cont);
				


				this.tabView.add(page1);
				this.tabView.add(page2);
				this.win.add(this.tabView, {top: 0, right: 3, bottom: 30, left: 3});
				
				btn = new qx.ui.form.Button("OK").set({width: 75});
				btn.addListener("click", function(){this.louFCPlink.setVisibility("hidden");this.tabView.setSelection([this.tabView.getChildren()[0]]); this.win.close()}, this);
				this.win.add(btn, {bottom: 0, right: 20});
				
				LT.a.getRoot().add(this.win, {left:250, top:200});
				this.srvName = webfrontend.data.Server.getInstance().getName();
				this.loadCityLayouts();
			},
			members: {
				cityLayout: null,
				cityLayouts: null,
				olTa: null,
				ssTa: null,
				louFCPlink: null,
				errorLabel: null,
				tabView: null,
				win: null,
				oObjs: null,
				srvName: null,
				open: function() {
					this.win.open();
					this.ssTa.setValue(this.cityLayout.s);
					this.olTa.setValue("");
					this.errorLabel.setValue("");
				},
				loadCityLayouts: function() {
					_str = localStorage.getItem("LT_cityLayouts");
					if (_str)
						this.cityLayouts = qx.util.Json.parse(_str);
					else {
						this.cityLayouts = {};
						this.cityLayouts[this.srvName] = {};
					}
				},
				saveCityLayouts: function() {
					//LT.debug("Saving...");
					_str = qx.util.Json.stringify(this.cityLayouts);
					localStorage.setItem("LT_cityLayouts", _str);
				},
				removeObjects: function() {
					if (this.oObjs != null) {
						for (i=0; i<this.oObjs.length; i++) {
							this.oObjs[i].release();
						}
						this.oObjs = null;
					}
				},
				showOverlayLayout: function(ss) {
				this.removeObjects();
				try {
					c = LT.city;
					if (c == null || c == undefined) {
						window.setTimeout(function(){LT.main.layoutWindow.showOverlayLayout();}, 1000);
						return;
					}
					for (i=0; i<c.length; i++) {
						if (c[i] == null) {
							window.setTimeout(function(){LT.main.layoutWindow.showOverlayLayout();}, 1000);
							return;
						}
					}
					cId = webfrontend.data.City.getInstance().getId();
					if (LT.main.cityId != cId) {
						window.setTimeout(function(){LT.main.layoutWindow.showOverlayLayout();}, 1000);
						return;
					}
					
					if (this.cityLayouts[this.srvName].hasOwnProperty(cId))
						ss = this.cityLayouts[this.srvName][cId];

					if (!this.validateSharestring(ss) || LT.a.visMain.mapmode != "c") return;

					if (!this.cityLayouts[this.srvName].hasOwnProperty(cId)) {
						this.cityLayouts[this.srvName][cId] = ss;
						this.saveCityLayouts();
					}

					this.oObjs = new Array();
					for (i=0; i<ss.length; i++) {
						if (!/\;|\:|\,|\.|T|#|\-|\_|W|Q|F|I/.test(ss.charAt(i))) {
							id = this.self(arguments).ssToId[ss.charAt(i)];
							if (c[i][2] != id)
								this.oObjs.push(new window.louTweak.overlayObject(LT.a.visMain, 163+128*(i%21), 67+80*Math.floor(i/21), id));
						} else if (/\-/.test(ss.charAt(i))) {
							if (c[i][2] != 98 && c[i][2] != -2)
								this.oObjs.push(new window.louTweak.overlayObject(LT.a.visMain, 163+128*(i%21), 67+80*Math.floor(i/21), 0));
						} else if (/\_/.test(ss.charAt(i))) {
							if (c[i][2] != 97)
								this.oObjs.push(new window.louTweak.overlayObject(LT.a.visMain, 163+128*(i%21), 67+80*Math.floor(i/21), 0));
						}
					}
					} catch(e) {LT.debug(e);}
				},
				generateSharestring: function() {
					try {
						LT.main.getCity();
						this.cityLayout = {"s":"", "u":""};
						waterCity = webfrontend.data.City.getInstance().getOnWater();
						c = LT.city;
						var sharestring = "[ShareString.1.3]" + ((waterCity) ? ";" : ":");
						var url = "http://www.lou-fcp.co.uk/map.php?map=" + ((waterCity) ? "W" : "L");
						for (i=0; i<c.length; i++) {
							sharestring += this.self(arguments).louCityP[this.self(arguments).node[c[i][2]]];
							url += this.self(arguments).louFCityP[this.self(arguments).node[c[i][2]]];
						}
						if (waterCity) url = url.substring(0,317)+url.substring(319,333);
						sharestring += "[/ShareString]";
						this.cityLayout.s = sharestring;
						this.cityLayout.u = url;
					} catch(e) { LT.debug(e); }
				},
				showSharestring: function(t) {
					if (t == "s") {
						this.ssTa.setValue(this.cityLayout.s);
						this.louFCPlink.setVisibility("hidden");
						this.ssTa.selectAllText();
					} else if (t == "u") {
						this.ssTa.setValue(this.cityLayout.u);
						this.louFCPlink.setVisibility("visible");
						this.ssTa.selectAllText();
					}
				},
				applyLayout: function() {
					this.errorLabel.setValue("");
					txt = this.olTa.getValue().replace(/\s/g,"");
					if (txt.indexOf("ShareString") != -1) {
						t = txt.match(/\](\:|\;){1}/)[1];
						txt = txt.replace(/\[[^\]]+\](\:|\;)?/g, "");
						if (txt.length != 441) {
							this.errorLabel.setValue(this.self(arguments).error.hash);
							return;
						}
						if (webfrontend.data.City.getInstance().getOnWater() && t == ":") {
							this.errorLabel.setValue(this.self(arguments).error.type.replace(/(\$\{stype\})/,"Land").replace(/\$\{ctype\}/,"Water"));
							return;
						} else if (!webfrontend.data.City.getInstance().getOnWater() && t == ";") {
							this.errorLabel.setValue(this.self(arguments).error.type.replace(/(\$\{stype\})/,"Water").replace(/\$\{ctype\}/,"Land"));
							return;
						}
						this.showOverlayLayout(txt);
					} else if (txt.indexOf("lou-fcp") != -1) {
						txt = txt.substring(txt.indexOf("=")+1);
						if (txt.length != 294) {
							this.errorLabel.setValue(this.self(arguments).error.hash);
							return;
						}
						if (webfrontend.data.City.getInstance().getOnWater() && txt.charAt(0) == "L") {
							this.errorLabel.setValue(this.self(arguments).error.type.replace(/(\$\{stype\})/,"Land").replace(/\$\{ctype\}/,"Water"));
							return;
						} else if (!webfrontend.data.City.getInstance().getOnWater() && txt.charAt(0) == "W") {
							this.errorLabel.setValue(this.self(arguments).error.type.replace(/(\$\{stype\})/,"Water").replace(/\$\{ctype\}/,"Land"));
							return;
						}
						txt = this.convertToSharestring(txt);
						this.showOverlayLayout(txt);
					}
				},
				removeLayout: function() {
					cId = webfrontend.data.City.getInstance().getId();
					this.errorLabel.setValue("");
					this.removeObjects();
					delete this.cityLayouts[this.srvName][cId];
					this.saveCityLayouts();
				},
				convertToSharestring: function(u) {
					template = this.self(arguments).land;
					if (u.charAt(0) == "W") {
						u = u.substring(0,242) + u.substring(244,260) + u.substring(263,278) + u.substring(280);
						template = this.self(arguments).water;
					}
					u = u.substring(1);
					c = -1;
					u = template.replace(/\-|\_/g, function(){ c++; return window.louTweak.layoutWindow.fcpToSs[u[c]]; });
					u = u.substring(0,220) + "T" + u.substring(221);
					wbp = [331, 332, 351, 354, 372, 376, 394, 416];
					u = u.split("");
					for (i=0; i<wbp.length; i++) {
						if (u[wbp[i]] == "-") u[wbp[i]] = "_";
					}
					u = u.join("");
					return u;
				},
				validateSharestring: function(s) {
					if (s == undefined) return false;
					error = "";
					c = LT.city;
					for (i=0; i<c.length; i++) {
						if (/\;|\:|\,|\./.test(s.charAt(i))) {
							switch(s.charAt(i)) {
								case ";":
									if (c[i][2] != 30 && c[i][2] != 93)
										error = "resource";
									break;
								case ":":
									if (c[i][2] != 28 && c[i][2] != 90)
										error = "resource";
									break;
								case ",":
									if (c[i][2] != 27 && c[i][2] != 92)
										error = "resource";
									break;
								case ".":
									if (c[i][2] != 29 && c[i][2] != 91)
										error = "resource";
									break;
							}
						}
						if (c[i][2] == 21 && s.charAt(i) != "X")
							error = "castle";
						if ((/V|R|\_/.test(s.charAt(i)) && !/\b(19|22|97)\b/.test(c[i][2])) || (/\b(19|22|97)\b/.test(c[i][2]) && !/V|R|\_/.test(s.charAt(i)))) {
							error = "water";
							//LT.debug(i + " " + s.charAt(i) + " " + c[i][2]);
						}
					}
					if (s.replace(/[^X]/g,"").length > 1)
						error = "castle";
					if (error != "") {
						this.errorLabel.setValue(this.self(arguments).error[error]);
						return false;
					} else {
						return true;
					}
				}
			}
		});

		
		function LT_checkIfLoaded() {
			try {
				if (qx.$$domReady == true) {
					a = qx.core.Init.getApplication(); // application
					c = a.cityInfoView;
					ch = a.chat;
					wdst = webfrontend.data.ServerTime.getInstance().refTime;
					if (a && c && ch && wdst)
						window.louTweak.main.getInstance().initialize();
					else
						window.setTimeout(LT_checkIfLoaded, 1000);
				} else {
					window.setTimeout(LT_checkIfLoaded, 1000);
				}
			} catch (e) { console.log(e); }
		}
		if (/lordofultima\.com/i.test(document.domain))
			window.setTimeout(LT_checkIfLoaded, 1000);
	}

	// injecting, because there seem to be problems when creating game interface with unsafeWindow
	var louTweakScript = document.createElement("script");
		txt = LT_mainFunction.toString();
		if (window.opera != undefined)
			txt = txt.replace(/</g,"&lt;"); // rofl Opera
		louTweakScript.innerHTML = "(" + txt + ")();";
		louTweakScript.type = "text/javascript";
	if (/lordofultima\.com/i.test(document.domain))
		document.getElementsByTagName("head")[0].appendChild(louTweakScript);
	
})();