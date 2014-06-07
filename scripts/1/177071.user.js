// ==UserScript==
// @name           MERC Bot
// @description    Adds MercBot integration
// @namespace      Uldrich
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.3
// ==/UserScript==
/*
 * Changelog

 * 0.1  initial release
 * 0.2  fixed hide options label
 * 0.3  added option to hide notice.
 */
(function() {
	var main = function() {
		function MBDebug(e) {
			if (window.console && typeof console.log == "function") {
				console.log(e);
			}
		}

		var createMercBotTools = function() {

			var chat = webfrontend.data.Chat.getInstance();
			function snd(m, t) {
				chat.addMsg("/whisper MercBot !LoU." + t + "," + m);
			}


			qx.Class.define("MercBot.Version", {
				type : "static",
				statics : {
					version : "0.3",
					build : "Tuesday September 3 17:51:26 MT 2013",
					authors : "Uldrich",
					contrib : "",
					License : "END USER LICENSE AGREEMENT\r\n\r\nThis copy of the MercBot script (\"the Software Product\") and accompanying documentation and access to MercBot is licensed and not sold.  This Software Product is protected by copyright laws and treaties, as well as laws and treaties related to other forms of intellectual property.  Uldrich owns intellectual property rights in the Software Product.  The Licensee's (\"you\" or \"your\") license to download, use, copy, or change the Software Product is subject to these rights and to all the terms and conditions of this End User License Agreement (\"Agreement\").\r\n\r\nAcceptance\r\n\r\nYOU ACCEPT AND AGREE TO BE BOUND BY THE TERMS OF THIS AGREEMENT BY DOWNLOADING THE SOFTWARE PRODUCT OR BY INSTALLING, USING, OR COPYING THE SOFTWARE PRODUCT.  YOU MUST AGREE TO ALL OF THE TERMS OF THIS AGREEMENT BEFORE INSTALLING AND USING THE SOFTWARE PRODUCT.  IF YOU DO NOT AGREE TO ALL OF THE TERMS OF THIS AGREEMENT, YOU MUST NOT INSTALL, USE, OR COPY THE SOFTWARE PRODUCT.\r\n\r\nLicense Grant\r\n\r\nThis Agreement entitles you to install and use the Software Product provided you are a member of MERC or a recognized affiliate alliance.  Providing data from this product to those outside of MERC or a recognized affiliate alliance constitutes a breach of this agreement.\r\n\r\nRestrictions on Transfer\r\n\r\nWithout first obtaining the express written consent of Uldrich, you may not assign your rights and obligations under this Agreement, or redistribute, encumber, sell, rent, lease, sublicense, or otherwise transfer your rights to the Software Product.\r\n\r\nRestrictions on Use\r\n\r\nYou may use, copy, or install the Software Product only if you are a member of the MERC alliance or a member of a recognized affiliate of the MERC alliance.\r\n\r\nYou may not decomplie, \"reverse-engineer\", disassemble, or otherwise attempt to derive the source code for the Software Product.\r\n\r\nYou may not use the database portion of the Software Product in connection with any software other than the Software Product.\r\n\r\nRestrictions on Alteration\r\n\r\nYou may not modify the Software Product or create any derivative work of the Software Product or its accompanying documentation.  Derivative works include but are not limited to translations.  You may not alter any files or libraries in any portion of the Software Product.  You may not reproduce the database portion or create any tables or reports relating to the database portion.\r\n\r\nRestrictions on Copying\r\n\r\nYou may not copy any part of the Software Product except to the extent that licensed use inherantly demands for the creation of a temporary copy stored in computer memory and not permanently affixed on storage medium.\r\n\r\nDisclaimer of Warranties and Limitation of Liability\r\n\r\nUNLESS OTHERWISE EXPLICITLY AGREED TO IN WRITING BY ULDRICH, ULDRICH MAKES NO OTHER WARRANTIES, EXPRESS OR IMPLIED, IN FACT OR IN LAW, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OTHER THAN AS SET FORTH IN THIS AGREEMENT.\r\n\r\nUldrich makes no warranty that the Software Product will meet your requirements or operate under your specific conditions of use.  Uldrich makes no warranty that the operation of the Software Product will be secure, error free, or free from interruption.  YOU MUST DETERMINE WHETHER THE SOFTWARE PRODUCT SUFFICIENTLY MEETS YOUR REQUIREMENTS FOR SECURITY AND UNINTERUPTABILITY.  YOU BEAR SOLE RESPONSIBILITY AND ALL LIABILITY FOR ANY LOSS INCURRED DUE TO FAILURE OF THE SOFTWARE PRODUCT TO MEET YOUR REQUIREMENTS.  ULDRICH WILL NOT, UNDER ANY CIRCUMSTANCES, BE RESPONSIBLE OR LIABLE FOR THE LOSS OF DATA ON ANY COMPUTER OR INFORMATION STORAGE DEVICE.\r\n\r\nUNDER NO CIRCUMSTANCES SHALL ULDRICH, BE LIABLE TO YOU OR ANY OTHER PARTY FOR INDIRECT, CONSEQUENTIAL, SPECIAL, INCIDENTAL, PUNITIVE, OR EXEMPLARY DAMAGES OF ANY KIND (INCLUDING LOST REVENUES OR PROFITS OR LOSS OF BUSINESS) RESULTING FROM THIS AGREEMENT, OR FROM THE FURNISHING, PERFORMANCE, INSTALLATION, OR USE OF THE SOFTWARE PRODUCT, WHETHER DUE TO A BREACH OF CONTRACT, BREACH OF WARRANTY, OR THE NEGLIGENCE OF ULDRICH OR ANY OTHER PARTY, EVEN IF ULDRICH IS ADVISED BEFOREHAND OF THE POSSIBLITY OF SUCH DAMAGES.  TO THE EXTENT THAT THE APPLICABLE JURISTICTION LIMITS ULDRICH'S ABILITY TO DISCLAIM ANY IMPLIED WARRANTIES, THIS DISCLAIMER SHALL BE EFFECTIVE TO THE MAXIMUM EXTENT PERMITTED.\r\n\r\nLimitation of Remedies and Damages\r\n\r\nNo warranty is provided for the Software Product.  You agree to hold Uldrich harmless from all claims, judgements, liabilities, expenses, or costs arising from your breach of this Agreement and/or acts or omissions.\r\n\r\nSeverability\r\n\r\nIf any provision of this Agreement shall be held to be invalid or unenforceable, the remainder of this Agreement shall remain in full force and effect.  To the extent any express or implied restrictions are not permitted by applicable laws, these express or implied restrictions shall remain in force and effect to the maximum extent permitted by such applicable laws."
				}
			});

			qx.Class.define("MercBot.Main", {
				type : "singleton",
				extend : qx.core.Object,
				members : {
					_extraRow : null,
					_extraRow2 : null,
					_extraRow3 : null,
					options : null,
					panel : null,
					playerName : null,
					initialize : function() {
						MBDebug("MercBot initialize");
						var app = qx.core.Init.getApplication();
						this.app = app;
						this.cInfoView = this.app.getCityInfoView();
						this.chat = this.app.chat;
						this.bQc = this.cInfoView.buildingQueue;
						this.bQh = this.bQc.header;
						this.playerName = webfrontend.data.Player.getInstance().getName();
						this.loadOptions();

						// Create a toolbar in the main area on the left below existing forms.
						this.panel = new MercBot.ui.Main("MercBot v" + MercBot.Version.version);
						this.addPanel(this.panel);
						this._extraRow = this.panel._extraRow;
						this._extraRow2 = this.panel._extraRow2;
						this._extraRow3 = this.panel._extraRow3;
						try {
							var targetContainer = (this.app.cityDetailView || this.app.getCityDetailView()).actionArea;
							// Ask MercBot
							var row = new qx.ui.container.Composite();
							row.setLayout(new qx.ui.layout.HBox(2));
							targetContainer.add(row);

							var askBotxHistoryBtn = new qx.ui.form.Button("Player history");
							askBotxHistoryBtn.setToolTipText("Get player history from MercBot");
							row.add(askBotxHistoryBtn, {
								flex : 1
							});
							askBotxHistoryBtn.addListener("execute", function() {
								var selectedCity = (this.app.cityDetailView || this.app.getCityDetailView()).city;
								var cityPlayerName = selectedCity.get_PlayerName();
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot !history," + cityPlayerName);
							}, this);
							var askBotxAllianceBtn = new qx.ui.form.Button("Alliance history");
							askBotxAllianceBtn.setToolTipText("Get alliance history from MercBot");
							row.add(askBotxAllianceBtn, {
								flex : 1
							});
							askBotxAllianceBtn.addListener("execute", function() {
								var selectedCity = (this.app.cityDetailView || this.app.getCityDetailView()).city;
								var cityAllianceName = selectedCity.get_AllianceName();
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot !alliance," + cityAllianceName);
							}, this);
							var askBotxCityBtn = new qx.ui.form.Button("City history");
							askBotxCityBtn.setToolTipText("Get city history from MercBot");
							row.add(askBotxCityBtn, {
								flex : 1
							});
							askBotxCityBtn.addListener("execute", function() {
								var selectedCity = (this.app.cityDetailView || this.app.getCityDetailView()).city;
								var citycoords = this.cityIdToCoords(selectedCity.get_Coordinates());
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot !city," + citycoords[0] + ":" + citycoords[1]);
							}, this);

							row = new qx.ui.container.Composite();
							row.setLayout(new qx.ui.layout.HBox(2));
							targetContainer.add(row);

							var askBotxHistoryBtn = new qx.ui.form.Button("Scout reports");
							askBotxHistoryBtn.setToolTipText("Get scouting reports for this city from MercBot");
							row.add(askBotxHistoryBtn, {
								flex : 1
							});
							askBotxHistoryBtn.addListener("execute", function() {
								var selectedCity = (this.app.cityDetailView || this.app.getCityDetailView()).city;
								var citycoords = this.cityIdToCoords(selectedCity.get_Coordinates());
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot !report," + citycoords[0] + ":" + citycoords[1] + ",scout,8");
							}, this);
							var askBotxAllianceBtn = new qx.ui.form.Button("Offense reports");
							askBotxAllianceBtn.setToolTipText("Get offense reports for this city from MercBot");
							row.add(askBotxAllianceBtn, {
								flex : 1
							});
							askBotxAllianceBtn.addListener("execute", function() {
								var selectedCity = (this.app.cityDetailView || this.app.getCityDetailView()).city;
								var citycoords = this.cityIdToCoords(selectedCity.get_Coordinates());
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot !report," + citycoords[0] + ":" + citycoords[1] + ",offense,8");
							}, this);
							var askBotxCityBtn = new qx.ui.form.Button("Defense reports");
							askBotxCityBtn.setToolTipText("Get defense reports for this city history from MercBot");
							row.add(askBotxCityBtn, {
								flex : 1
							});
							askBotxCityBtn.addListener("execute", function() {
								var selectedCity = (this.app.cityDetailView || this.app.getCityDetailView()).city;
								var citycoords = this.cityIdToCoords(selectedCity.get_Coordinates());
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot !report," + citycoords[0] + ":" + citycoords[1] + ",defense,8");
							}, this);
							row = new qx.ui.container.Composite();
							row.setLayout(new qx.ui.layout.HBox(2));
							targetContainer.add(row);

							var askBotxAllianceBtn = new qx.ui.form.Button("Offense reports no fakes");
							askBotxAllianceBtn.setToolTipText("Get offense reports excluding fakes for this city from MercBot");
							row.add(askBotxAllianceBtn, {
								flex : 1
							});
							askBotxAllianceBtn.addListener("execute", function() {
								var selectedCity = (this.app.cityDetailView || this.app.getCityDetailView()).city;
								var citycoords = this.cityIdToCoords(selectedCity.get_Coordinates());
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot !report," + citycoords[0] + ":" + citycoords[1] + ",offense,8,f");
							}, this);
							var askBotxCityBtn = new qx.ui.form.Button("Defense reports no fakes");
							askBotxCityBtn.setToolTipText("Get defense reports for this city history from MercBot");
							row.add(askBotxCityBtn, {
								flex : 1
							});
							askBotxCityBtn.addListener("execute", function() {
								var selectedCity = (this.app.cityDetailView || this.app.getCityDetailView()).city;
								var citycoords = this.cityIdToCoords(selectedCity.get_Coordinates());
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot !report," + citycoords[0] + ":" + citycoords[1] + ",defense,8,f");
							}, this);
						} catch(e) {
							MBDebug(e);
						}
						try {
							var app = qx.core.Init.getApplication();
							var aip = app.getAllianceInfoPage();
							var row = new qx.ui.container.Composite();
							row.setLayout(new qx.ui.layout.HBox(2));
							var btn = new qx.ui.form.Button("Inactives");
							row.add(btn);
							btn.setToolTipText("Ask MercBot to find members with no updates in the last 3 days");
							btn.addListener("click", function() {
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot !ai," + qx.core.Init.getApplication().getAllianceInfoPage().getAllianceId() + ",3");
							}, false);

							var allianceBtn = new qx.ui.form.Button("Alliance history");
							allianceBtn.setToolTipText("Get alliance history from MercBot");
							row.add(allianceBtn, {
								flex : 1
							});
							allianceBtn.addListener("execute", function() {
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot !alliance," + qx.core.Init.getApplication().getAllianceInfoPage().getData().sName);
							});
							var rM = qx.core.Init.getApplication();
							rM.showAllianceInfo(webfrontend.gui.Alliance.Info.MainWindow.tabs.info, {
								name : ""
							});

							aip._tabView.getChildren()[0]._btnEditDiplomacy.$$parent.addAfter(row, aip._btnEditDiplomacy)
							app.getInfoNavigatorWidget().hide();
							//var cip = app.getCityInfoPage();
							var pip = app.getPlayerInfoPage();
							var row = new qx.ui.container.Composite();
							row.setLayout(new qx.ui.layout.HBox(2));
							var btn = new qx.ui.form.Button("History");
							row.add(btn);
							btn.setToolTipText("Get player history from MercBot");
							btn.addListener("click", function() {
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot !history," + qx.core.Init.getApplication().getPlayerInfoPage().getData().sName);
							}, false);

							btn = new qx.ui.form.Button("Alliances");
							row.add(btn);
							btn.setToolTipText("Get player alliance history from MercBot");
							btn.addListener("click", function() {
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot !pah," + qx.core.Init.getApplication().getPlayerInfoPage().getData().sName);
							}, false);

							app.showInfoPage(qx.core.Init.getApplication().getPlayerInfoPage(), {
								"name" : webfrontend.data.Player.getInstance().getName()
							});
							var brp = pip.getChildren()[0].getChildren()[0]._btnReportPlayer;
							brp.$$parent.addAfter(row, brp)
							app.getInfoNavigatorWidget().hide();
							var crl = pip.getChildren()[0].getChildren()[0]._contPlundering;
							var row = new qx.ui.container.Composite();
							row.setLayout(new qx.ui.layout.HBox(2));
							var rl = new qx.ui.basic.Label("KARRS Score:");
							row.add(rl);
							crl.getLayoutParent().addAfter(row, crl);
							pip.crRow = row;
							crl.addListener("appear", function() {
								try {
									var cr = this.getChildren()[0].getChildren()[0]._contPlundering.getChildren()[3].getValue();
									cr = parseInt(cr.replace(',', ''));
									var ur = this.getChildren()[0].getChildren()[0]._contUnits.getChildren()[3].getValue()
									ur = parseInt(ur.replace(',', ''));
									var fr = this.getChildren()[0].getChildren()[0]._contFame.getChildren()[3].getValue();
									fr = parseInt(fr.replace(',', ''));
									var sr = this.getChildren()[0].getChildren()[0]._contScore.getChildren()[3].getValue();
									sr = parseInt(sr.replace(',', ''));
									this.crRow.removeAll();
									var rl = new qx.ui.basic.Label("KARRS Score:");
									this.crRow.add(rl);
									rl = new qx.ui.basic.Label(((cr + ur + fr + sr) / 4).toString());
									rl.set({
										font : "bold"
									});
									this.crRow.add(rl);
								} catch(e) {
									MBDebug(e);
								}
							}, pip);
						} catch(e) {
							MBDebug(e);
						}
						try {
							webfrontend.data.City.getInstance().addListener("changeCity", this.updateStats, this);
						} catch(e) {
							MBDebug(e);
						}

						try {
							var rep = app.getReportPage();
							rep.MB_origOnReport = rep._onReport;
							rep._onReport = this.interceptOnReport;
						} catch(e) {
							MBDebug(e);
						}

						try {
							this._outputMsg = qx.core.Init.getApplication().chat._outputMsg;
							qx.core.Init.getApplication().chat._outputMsg = this.outputMsgIntercept;
							var alerts = paTweak.ui.alerts.getInstance();
							var chat = webfrontend.data.Chat.getInstance();
							if (chat.removeListener("newMessage", paTweak.ui.alerts.prototype.onNewMessage, alerts)) {
								chat.addListener('newMessage', this.onNewMessage, alerts);
							} else {
								MBDebug("Failed to remove newMessage alert listener");
							}
						} catch(e) {
							MBDebug(e);
						}

						try {
							var srb = gsc(4);
							if (srb != null) {
								srb.addListener("click", function() {
									window.setTimeout(function() {
										var serverTime = webfrontend.data.ServerTime.getInstance();
										var s = webfrontend.data.Substitution.getInstance().getOutgoing();
										var mMain = MercBot.Main.getInstance();
										if (s != null) {
											snd(_mtPid + "," + _mtV + "," + s.n + "," + s.p1 + "," + mMain.formatDate(new Date(s.t)), "sb");
										} else {
											snd(_mtPid + "," + _mtV + ",,,", "sb");
										}
									}, 1000);
								}, srb);
							}
						} catch(e) {
							MBDebug(e);
						}
						snd(_mtV, "li");

						try {
							var paPanel = paTweak.Main.getInstance().panel;
							if (paPanel.showAllianceInfoBtn.removeListener("execute", paPanel.showAllianceInfo, paPanel)) {
								paPanel.showAllianceInfoBtn.addListener("execute", this.showAllianceInfo, this);
							} else {
								MBDebug("Failed to remove alliance button listener");
							}
							if (paPanel.reportsButton.removeListener("execute", paPanel.showAllianceInfo, paPanel)) {
								paPanel.reportsButton.addListener("execute", this.showAllianceInfo, this);
							} else {
								MBDebug("Failed to remove alliance button listener");
							}
						} catch(e) {
							MBDebug(e);
						}

						window.setTimeout(function() {
							var serverTime = webfrontend.data.ServerTime.getInstance();
							var s = webfrontend.data.Substitution.getInstance().getOutgoing();
							var mMain = MercBot.Main.getInstance();
							if (s != null) {
								snd(_mtPid + "," + _mtV + "," + s.n + "," + s.p1 + "," + mMain.formatDate(new Date(s.t)), "sb");
							} else {
								snd(_mtPid + "," + _mtV + ",,,", "sb");
							}
						}, 1000);

						if (this.options.hideMercBotNotice) {
							this.panel.noticeLabel.setVisibility("excluded");
							this.panel.noticeTextLabel.setVisibility("excluded");
						}
						if (this.options.hideMercBot) {
							this.panel.toggleMercBotTools();
						}
					},
					showAllianceInfo : function() {
						var dialog = MercBot.ui.LastLogin.getInstance();
						dialog.center();
						dialog.show();
					},
					loadOptions : function() {
						_str = localStorage.getItem("MercBot_options");
						if (_str)
							this.options = JSON.parse(_str);
						else {
							this.options = {
								"hideMercBot" : false,
								"hideMercBotNotice" : false,
								"MercBotVersion" : MercBot.Version.version
							};
						}
						if (!this.options.hasOwnProperty("hideMercBot"))
							this.options.hideMercBot = false;
						if (!this.options.hasOwnProperty("hideMercBotNotice"))
							this.options.hideMercBotNotice = false;
						this.options.MercBotVersion = MercBot.Version.version;
						this.app.setUserData("MercBot_options", this.options);
						str = JSON.stringify(this.options);
						localStorage.setItem("MercBot_options", str);
					},
					onNewMessage : function(e) {
						var eu = e.getData(), commandParts, pq;
						if (eu.c != 'privateout') {
							if (this.cMain.options.showWhisperAlert || this.cMain.options.showChatAlert || this.cMain.options.showChatAlertPhrases) {
								var eO = webfrontend.data.ServerTime.getInstance();
								var eU = eO.getServerStep();
								if (eU) {
									var oldPhrases = "";
									var newPhrases = "";
									var send = false;
									var eN = this.removeBBcode(eu.m);
									if (this.cMain.options.showChatAlert && eu.m.toLowerCase().indexOf(this.playerName) >= 0) {
										oldPhrases += this.playerName;
										newPhrases += this.playerNameOrig;
										send = true;
									}
									if (eu.c == 'privatein' && this.cMain.options.showWhisperAlert) {
										send = true;
									}
									if (this.cMain.options.showChatAlertPhrases) {
										var phrases = this.cMain.options.chatAlertPhrases.split(',');
										for (var ii = 0; ii < phrases.length; ++ii) {
											var phrase = phrases[ii].toLowerCase().trim();
											var phraseOrig = phrases[ii].trim();
											if (phrase.length > 0 && (eN.toLowerCase().indexOf(phrase) >= 0 || eN.toLowerCase().indexOf(phraseOrig) >= 0)) {
												oldPhrases += (oldPhrases.length > 0 ? "|" : "") + phrase;
												newPhrases += (newPhrases.length > 0 ? "|" : "") + phraseOrig;
												send = true;
											}
										}
									}
									if (send && eu.s.toLowerCase() != "mercbot") {
										var re = new RegExp(oldPhrases, 'g');
										var oldStr = oldPhrases.split('|');
										var newStr = newPhrases.split('|');
										eN = eN.replace(re, function(w) {
											for (var ii = 0; ii < oldStr.length; ++ii) {
												if (!oldStr[ii].iCompare(w)) {
													return "<span style='font-weight: bold;'>" + newStr[ii] + "</span>";
												}
											}
										});
										if (eu.c == 'privatein') {
											eN = "[" + eu.s + "] whispers to you: " + eN;
										} else if (eu.c == "_a") {
											eN = "[Alliance][" + eu.s + "]: " + eN;
										} else {
											eN = "[Continent][" + eu.s + "]: " + eN;
										}
										var ts = webfrontend.Util.getDateTimeString(eO.getStepTime(eU), false, true) + ' ' + eN;
										this.addChatAlertMessage(ts);
									}
								}
							}
						}
					},
					outputMsgIntercept : function(eY, fa, fb) {
						try {
							var t = /!LoU\.[a-zA-Z]*/i, p = '__proto__';
							if (t.test(eY)) {
								// hide custom output from chat
								return;
							}
							this[p]._outputMsg.call(this, eY, fa, fb);
						} catch(e) {
							MBDebug(e);
						}
					},

					/**
					 * Normalizes format of coordinations to xxx:yyy form.
					 *
					 * @param value Coords in x:y format, may be wrapped in BB code.
					 * @return String in xxx:yyy format.
					 */
					normalizeCoords : function(value) {
						if (value == null)
							return null;

						// Remove potential BB code
						value = this.removeBBcode(value).trim();

						// Parse value
						var m = value.match(/^(\d{1,3}):(\d{1,3})$/);
						if (m == null)
							return null;

						// Pad zeroes
						var x = m[1], y = m[2];
						return qx.lang.String.pad(x, 3, "0") + ":" + qx.lang.String.pad(y, 3, "0");
					},
					/**
					 * Parses the coordinates in format xxx:yyy.
					 *
					 * @param value Coordinates in string.
					 * @return [x, y]
					 */
					parseCoords : function(value) {
						var m = value.match(/^0*(\d{1,3}):0*(\d{1,3})$/);
						if (m == null)
							return null;

						return [parseInt(m[1]), parseInt(m[2])];
					},
					/**
					 * Converts city ID to coordinates.
					 *
					 * @param id City ID.
					 * @return [x, y]
					 */
					cityIdToCoords : function(id) {
						var x = id & 0xFFFF;
						var y = (id >> 16) & 0xFFFF;
						return [x, y];
					},
					cityIdToCont : function(id) {
						var sourceCoords = this.cityIdToCoords(id);
						return webfrontend.data.Server.getInstance().getContinentFromCoords(sourceCoords[0], sourceCoords[1]);
					},
					addPanel : function(panel) {
						this.bQc.getLayoutParent().addBefore(panel, this.bQc);
					},
					interceptOnReport : function(r, fm, fn) {
						var app = qx.core.Init.getApplication();
						var rep = app.getReportPage();
						rep.MB_origOnReport(r, fm, fn);
						var bS = webfrontend.res.Main.getInstance();
						if (fm != null) {
							var t = (fm.hasOwnProperty("h") && fm.h.hasOwnProperty("t")) ? fm.h.t : "00000000000";
							var tt = t.substring(t.length - 3, t.length - 2);
							if (fm.hasOwnProperty("a") && fm.a.length > 1 && fm.a[0].u != null && ("1" == tt || "2" == tt || "3" == tt || "5" == tt)) {
								var cnt = 0;
								for (var ii = 0; fm.a[0].u != null && ii < fm.a[0].u.length; ++ii) {
									cnt += (fm.a[0].u[ii].o * bS.units[fm.a[0].u[ii].t].uc);
								}
								var mMain = MercBot.Main.getInstance();
								snd(mMain.formatReportId(fm.sid) + "," + mMain.formatDate(fm.h.d) + "," + mMain.convertIdToCoordinates(fm.a[0].c[0].i) + "," + mMain.convertIdToCoordinates(fm.a[1].c[0].i) + "," + (fm.hasOwnProperty("s") && fm.s != null) + "," + (cnt < 5000) + "," + fm.a[0].ai + "," + fm.a[1].ai + "," + (fm.o == fm.a[0].p ? fm.a[0].ai : fm.a[1].ai), "rpt");
							}
						}
					},
					uploadUnreadReports : function() {
						webfrontend.net.CommandManager.getInstance().sendCommand("ReportGetHeader", {
							"folder" : 0,
							"city" : -1,
							"start" : 0,
							"end" : 99,
							"sort" : 1,
							"ascending" : false,
							"mask" : 199247
						}, this, function(ok, response) {
							if (ok && response != null) {
								for (var ii = 0; ii < response.length; ++ii) {
									webfrontend.net.CommandManager.getInstance().sendCommand("GetReport", {
										"id" : response[ii].i
									}, this, function(ok, response) {
										if (ok && response != null) {
											var app = qx.core.Init.getApplication();
											var bS = webfrontend.res.Main.getInstance();
											var fm = response;
											var t = (fm.hasOwnProperty("h") && fm.h.hasOwnProperty("t")) ? fm.h.t : "00000000000";
											var tt = t.substring(t.length - 3, t.length - 2);
											if (fm.hasOwnProperty("a") && fm.a.length > 1 && fm.a[0].u != null && ("1" == tt || "2" == tt || "3" == tt || "5" == tt)) {
												var cnt = 0;
												for (var ii = 0; fm.a[0].u != null && ii < fm.a[0].u.length; ++ii) {
													cnt += (fm.a[0].u[ii].o * bS.units[fm.a[0].u[ii].t].uc);
												}
												snd(this.formatReportId(fm.sid) + "," + this.formatDate(fm.h.d) + "," + this.convertIdToCoordinates(fm.a[0].c[0].i) + "," + this.convertIdToCoordinates(fm.a[1].c[0].i) + "," + (fm.hasOwnProperty("s") && fm.s != null) + "," + (cnt < 5000) + "," + fm.a[0].ai + "," + fm.a[1].ai + "," + (fm.o == fm.a[0].p ? fm.a[0].ai : fm.a[1].ai), "rpt");
											}
										}
									});
								}
							}
						});
					},
					sendCityData : function() {
						var CI = webfrontend.data.City.getInstance();
						var bS = webfrontend.res.Main.getInstance();
						var hc = CI.getStrongHold();
						var wl = CI.getWallLevel();
						var ow = CI.getOnWater();
						var id = CI.getId();
						var cn = CI.getName();
						var bl = CI.getBarracksLevel();
						var bc = CI.getBuildingCount();
						var th = CI.getTownhallLevel();
						var lt = CI.getTowerBuildingCounts()[38];
						lt = lt ? lt : "0";
						var cx = id & 0xFFFF;
						var cy = id >> 16;
						var units = "";
						var u = CI.getUnits();
						var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
						for (var key in u ) {
							units += (units.length > 0 ? "|" : "") + bS.units[key].dn.replace(' ', '').toLowerCase() + ":" + (u[key].total * bS.units[key].uc);
						}
						snd(cn + "," + id + "," + cont + "," + (cx + ":" + cy) + "," + units + "," + lt + "," + wl + "," + bl + "," + bc + "," + th + "," + hc + "," + ow + "," + _mtV, "upl");
					},
					updateStats : function() {
						var CI = webfrontend.data.City.getInstance();
						var bS = webfrontend.res.Main.getInstance();
						var hc = CI.getStrongHold();
						var wl = CI.getWallLevel();
						var ow = CI.getOnWater();
						var id = CI.getId();
						var cn = CI.getName();
						var bl = CI.getBarracksLevel();
						var bc = CI.getBuildingCount();
						var th = CI.getTownhallLevel();
						var lt = CI.getTowerBuildingCounts()[38];
						lt = lt ? lt : "0";
						var cx = id & 0xFFFF;
						var cy = id >> 16;
						var units = "";
						var u = CI.getUnits();
						var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
						for (var key in u ) {
							units += (units.length > 0 ? "|" : "") + bS.units[key].dn.replace(' ', '').toLowerCase() + ":" + (u[key].total * bS.units[key].uc);
						}
						snd(cn + "," + id + "," + cont + "," + (cx + ":" + cy) + "," + units + "," + lt + "," + wl + "," + bl + "," + bc + "," + th + "," + hc + "," + ow + "," + _mtV, "ci");
					},
					formatReportId : function(reportId) {
						var retVal = "";
						if (reportId.length == 16) {
							var seg1 = reportId.substring(0, 4);
							var seg2 = reportId.substring(4, 8);
							var seg3 = reportId.substring(8, 12);
							var seg4 = reportId.substring(12);
							retVal = seg1 + "-" + seg2 + "-" + seg3 + "-" + seg4;
						}
						return retVal;
					},
					checkTime : function(i) {
						if (i < 10) {
							i = "0" + i;
						}
						return i;
					},
					formatDate : function(tme) {
						var serverTime = webfrontend.data.ServerTime.getInstance();
						var dte = new Date();
						dte.setTime(tme);
						var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();
						var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();
						var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
						var localOffset = -new Date().getTimezoneOffset() * 60000;
						dte.setTime(dte.getTime() + serverOffset - localOffset);
						var h = dte.getHours();
						var m = dte.getMinutes();
						var s = dte.getSeconds();
						h = this.checkTime(h);
						m = this.checkTime(m);
						s = this.checkTime(s);
						return dte.getFullYear() + '/' + (dte.getMonth() + 1) + '/' + dte.getDate() + ' ' + h + ':' + m + ':' + s;
					},
					leftPad : function(num, minsize, padstring) {
						var str = num.toString();
						while (str.length < minsize)
						str = padstring + str;
						return str;
					},
					convertCoordinatesToId : function(x, y) {
						var id = parseInt(x, 10) | (parseInt(y, 10) << 16);
						return id;
					},
					convertIdToCoordinatesObject : function(id) {
						var o = {
							xPos : (id & 0xFFFF),
							yPos : (id >> 16)
						}
						o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
						return o;
					},
					convertIdToCoordinates : function(id) {
						var o = this.convertIdToCoordinatesObject(id);
						return o.xPos + ":" + o.yPos;
					}
				}
			});
			qx.Class.define("MercBot.ui.LastLogin", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function() {
					this.base(arguments, 'Alliance Info');
					this.buildUI();
				},
				members : {
					donations : null,
					mDataArray : null,
					mDataRank : null,
					buildUI : function() {
						var app = qx.core.Init.getApplication();

						this.setLayout(new qx.ui.layout.VBox(2));
						this.set({
							allowMaximize : false,
							allowMinimize : false,
							showMaximize : false,
							showMinimize : false,
							showStatusbar : false,
							showClose : false,
							contentPadding : 5,
							useMoveFrame : true,
							resizable : false
						});
						this.setWidth(992);
						webfrontend.gui.Util.formatWinClose(this);

						var wcLabel = new qx.ui.basic.Label("Alliance Members Info");
						wcLabel.set({
							font : "bold"
						});
						this.add(wcLabel);

						var tableModel = new qx.ui.table.model.Simple();
						var columnNames = ["id", "KARRS", "KARRS Score", "status", "name", "title", "score", "cities", "role", "lastLogin", "Donations", "Donations Rank", "World Rank", "UD Rank", "Fame Rank", "Plundering Rank"];

						tableModel.setColumns(columnNames);
						tableModel.setCaseSensitiveSorting(false);
						tableModel.sortByColumn(1, true);
						this.loginTable = new qx.ui.table.Table(tableModel);
						this.loginTable.onCellClick = function(event) {
							var spl = this.getTableModel().getValue(event.getColumn(), event.getRow());
							switch( event.getColumn() ) {
								case 4:
									{
										var rf = qx.core.Init.getApplication();
										rf.showInfoPage(rf.getPlayerInfoPage(), {
											name : spl
										});
									}
									break;
							}
						};
						this.loginTable.addListener("cellClick", this.loginTable.onCellClick, this.loginTable);

						var columnModel = this.loginTable.getTableColumnModel();
						columnModel.setColumnVisible(0, false);
						columnModel.setColumnWidth(1, 60);
						columnModel.setColumnVisible(2, false);
						columnModel.setColumnWidth(3, 64);
						columnModel.setColumnWidth(4, 120);
						columnModel.setColumnVisible(5, false);
						columnModel.setColumnWidth(6, 80);
						columnModel.setColumnWidth(7, 44);
						columnModel.setColumnWidth(8, 100);
						columnModel.setColumnWidth(9, 110);
						columnModel.setColumnWidth(10, 90);
						columnModel.setColumnWidth(11, 90);
						columnModel.setColumnWidth(12, 50);
						columnModel.setColumnWidth(13, 50);
						columnModel.setColumnWidth(14, 50);
						columnModel.setColumnWidth(15, 50);
						var linkStyle = new qx.ui.table.cellrenderer.Default();
						linkStyle.setDefaultCellStyle("text-decoration:underline;color:blue;cursor:pointer");
						columnModel.setDataCellRenderer(4, linkStyle);

						this.add(this.loginTable, {
							flex : 1
						});
						this.addListener("appear", this.onOpen, this);
					},
					onOpen : function() {
						var m = this.loginTable.getTableModel();
						m.removeRows(0, m.getRowCount());
						m.addRows([[0, "Loading..."]]);

						var ai = webfrontend.data.Alliance.getInstance();
						var md = ai.getMemberData();
						this.mDataRank = new Object();
						this.mDataArray = new Array();
						for (var ii = 0; ii < md.length; ++ii) {
							webfrontend.net.CommandManager.getInstance().sendCommand("GetPublicPlayerInfo", {
								id : md[ii].i
							}, this.mDataRank, function(ok, response) {
								if (ok) {
									this[response.i] = new Object();
									this[response.i].r = response.r;
									this[response.i].ftr = response.fup.ftr;
									this[response.i].pr = response.fup.pr;
									this[response.i].udr = response.fup.udr;
									this[response.i].k = (response.r + response.fup.ftr + response.fup.pr + response.fup.udr);
								}
							});
						}
						webfrontend.net.CommandManager.getInstance().sendCommand("AllianceResourceStatistic", {
							sortColumnIndex : -1,
							ascending : true,
							start : 0,
							end : 500
						}, this, this.gotDonations);
					},
					gotDonations : function(ok, response) {
						this.donations = [];
						if (ok && response != null) {
							var items = response;
							for (var ii = 0; ii < items.length; ++ii) {
								var item = items[ii];
								this.donations[item.pn] = [item.r, item.ra];
							}
						}
						webfrontend.net.CommandManager.getInstance().sendCommand("AllianceGetMemberInfos", {}, this, this.fillLoginTable);
					},
					fillLoginTable : function(isOk, result) {
						var m = this.loginTable.getTableModel();
						if (isOk == false || result == null) {
							if (rowData.length == 0) {
								m.setData([["No data."]]);
							}
							return;
						}
						var rowData = [];

						var ai = webfrontend.data.Alliance.getInstance();
						var md = ai.getMemberData();
						this.mDataArray = new Array();
						for (var ii = 0; ii < md.length; ++ii) {
							if (this.mDataArray.indexOf(this.mDataRank[md[ii].i].k) < 0)
								this.mDataArray.push(this.mDataRank[md[ii].i].k);
						}
						this.mDataArray.sort(function(a, b) {
							return a - b
						});
						var roles = webfrontend.data.Alliance.getInstance().getRoles();
						var statuses = ["offline", "online", "afk", "hidden"];
						var dateFormat = new qx.util.format.DateFormat("yyyy.MM.dd HH:mm");
						var titles = webfrontend.res.Main.getInstance().playerTitles;
						for (var i = 0; i < result.length; i++) {
							var item = result[i];
							var loginDate = new Date(item.l);
							loginDate.setHours(loginDate.getHours() + (webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60));
							rowData.push([item.i, (1 + this.mDataArray.indexOf(this.mDataRank[item.i].k)), (this.mDataRank[item.i].k / 4), (statuses.hasOwnProperty(item.o) ? statuses[item.o] : item.o), item.n, titles[item.t].dn, item.p, item.c, (roles != null ? roles[item.r].Name : item.r), dateFormat.format(loginDate), (this.donations.hasOwnProperty(item.n) ? this.donations[item.n][0] : ""), (this.donations.hasOwnProperty(item.n) ? this.donations[item.n][1] : ""), item.ra, this.mDataRank[item.i].udr, this.mDataRank[item.i].ftr, this.mDataRank[item.i].pr]);
						}
						if (rowData.length == 0) {
							m.setData([["No data."]]);
						} else {
							m.setData(rowData);
							m.sortByColumn(1, true);
						}
					}
				}
			});
			qx.Class.define("MercBot.MercBotOptionsPage", {
				extend : webfrontend.gui.OverlayWidget,
				type : "singleton",
				construct : function() {
					webfrontend.gui.OverlayWidget.call(this);

					var app = qx.core.Init.getApplication();
					var cMain = MercBot.Main.getInstance();

					this.clientArea.setLayout(new qx.ui.layout.Canvas());
					this.setTitle("MercBot Options");
					this.tabView = new qx.ui.tabview.TabView().set({
						contentPaddingLeft : 15,
						contentPaddingRight : 10,
						contentPaddingTop : 10,
						contentPaddingBottom : 10
					});
					this.tabPages = [{
						name : "General",
						page : null,
						vbox : null
					}];
					for ( i = 0; i < this.tabPages.length; i++) {
						page = new qx.ui.tabview.Page(this.tabPages[i].name);
						page.setLayout(new qx.ui.layout.Canvas());
						vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
						scroll = new qx.ui.container.Scroll(vbox);
						page.add(scroll, {
							top : 0,
							left : 0,
							right : 0,
							bottom : 0
						});
						this.tabPages[i].vbox = vbox;
						this.tabPages[i].page = page;
					}

					// ----- Page 1

					var noticeRow = new qx.ui.container.Composite(new qx.ui.layout.HBox(3));

					this.noticeLabel = new qx.ui.basic.Label(" ");
					this.noticeLabel.setTextColor("red");
					this.noticeLabel.setWidth(42);
					this.noticeLabel.setValue('NOTICE:');
					noticeRow.add(this.noticeLabel);
					this.noticeTextLabel = new qx.ui.basic.Label(" ");
					this.noticeTextLabel.setWidth(450);
					this.noticeTextLabel.setHeight(50);
					this.noticeTextLabel.setRich(true);
					this.noticeTextLabel.setValue("This script uploads data from your game to MERC.  If you do not want your data uploaded uninstall it NOW! <a href='http://userscripts.org/scripts/show/177071' target='_blank'>http://userscripts.org/scripts/show/177071</a>");
					noticeRow.add(this.noticeTextLabel);

					this.tabPages[0].vbox.add(noticeRow);

					cb = new qx.ui.form.CheckBox("Hide MercBot upload notice in panel.");
					cb.cMain = cMain;
					if (cMain.options.hideMercBotNotice)
						cb.setValue(true);
					cb.addListener("click", function() {
						this.cMain.options.hideMercBotNotice = this.getValue() ? true : false;
						var panel = MercBot.Main.getInstance().panel;
						panel.noticeLabel.setVisibility(this.cMain.options.hideMercBotNotice ? "excluded" : "visible");
						panel.noticeTextLabel.setVisibility(this.cMain.options.hideMercBotNotice ? "excluded" : "visible");
						var maxHeight = panel.getMaxHeight();
						if (maxHeight < 100) {
							panel.setMaxHeight(this.cMain.options.hideMercBotNotice ? 32 : 84);
						}
					}, cb);
					this.tabPages[0].vbox.add(cb);

					cb = new qx.ui.form.CheckBox("Hide MercBot panel at load");
					cb.cMain = cMain;
					if (cMain.options.hideMercBot)
						cb.setValue(true);
					cb.addListener("click", function() {
						this.cMain.options.hideMercBot = this.getValue() ? true : false;
					}, cb);
					this.tabPages[0].vbox.add(cb);

					this.tabPages[0].vbox.add(new qx.ui.core.Spacer(0, 10));

					// ----- Save Button
					cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					btn = new qx.ui.form.Button("Save").set({
						width : 90,
						marginLeft : 30
					});
					btn.addListener("click", this.saveOptions, this);
					cont.add(btn);

					this.expImpWin = this.createExpImpWindow();

					// ----- Export button
					btn = new qx.ui.form.Button("Export").set({
						appearance : "button-text-small",
						marginLeft : 280
					});
					btn.addListener("click", function() {
						var options = MercBot.Main.getInstance().options;
						this.expImpWin.setCaption("Export");
						this.expImpWin.setUserData("id", 2);
						this.expImpWin.getUserData("lab").setValue("You can save this string in a text file and import it later when needed.");
						this.expImpWin.getUserData("ta").setValue(JSON.stringify(options));
						this.expImpWin.open();
					}, this);
					cont.add(btn);

					// ----- Import button
					btn = new qx.ui.form.Button("Import").set({
						appearance : "button-text-small"
					});
					btn.addListener("click", function() {
						this.expImpWin.setCaption("Import");
						this.expImpWin.setUserData("id", 1);
						this.expImpWin.getUserData("lab").setValue("Insert saved Options into text field and press OK.");
						this.expImpWin.getUserData("ta").setValue("");
						this.expImpWin.open();
					}, this);
					cont.add(btn);
					// ----- -----

					// ----- Add pages to tabview
					for ( i = 0; i < this.tabPages.length; i++) {
						this.tabView.add(this.tabPages[i].page);
					}
					this.clientArea.add(this.tabView, {
						top : 0,
						right : 3,
						bottom : 30,
						left : 3
					});
					this.clientArea.add(cont, {
						right : 3,
						bottom : 3,
						left : 3
					});
					this.tabView.setSelection([this.tabView.getChildren()[0]]);
				},
				members : {
					tabView : null,
					tabPages : null,
					clrSel : null,
					expImpWin : null,
					createExpImpWindow : function() {
						win = new qx.ui.window.Window("");
						win.setLayout(new qx.ui.layout.VBox(10));
						win.set({
							showMaximize : false,
							showMinimize : false,
							allowMaximize : false
						});
						win.setWidth(450);
						win.setHeight(200);
						//win.open();
						var app = qx.core.Init.getApplication();
						app.getRoot().add(win, {
							left : 250,
							top : 200
						});

						lab = new qx.ui.basic.Label("");
						win.add(lab);
						win.setUserData("lab", lab);

						var options = MercBot.Main.getInstance().options;
						ta = new qx.ui.form.TextArea(JSON.stringify(options));
						ta.addListener("click", function() {
							this.selectAllText();
						});
						win.add(ta, {
							height : 65
						});
						win.setUserData("ta", ta);
						btn = new qx.ui.form.Button("OK").set({
							maxWidth : 50,
							alignX : "center"
						});
						btn.addListener("click", function() {
							id = this.getUserData("id");
							if (id == 1) {
								txt = this.getUserData("ta").getValue();
								try {
									obj = JSON.parse(txt);
								} catch(e) {
									obj = "error";
								}
								if ( typeof obj == "object" && obj != null) {
									MercBot.Main.getInstance().options = JSON.parse(txt);
									localStorage.setItem("MercBot_options", txt);
									this.close();
								} else {
									alert("Inserted string is invalid");
								}
							} else if (id == 2) {
								this.close();
							}
						}, win);
						win.add(btn);
						return win;
					},
					saveOptions : function() {
						var options = MercBot.Main.getInstance().options;
						str = JSON.stringify(options);
						localStorage.setItem("MercBot_options", str);
						qx.core.Init.getApplication().switchOverlay(null);
					}
				}
			});
			qx.Class.define("MercBot.ui.AboutWindow", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function() {
					this.base(arguments, 'MercBot v' + MercBot.Version.version);
					this.buildUI();
				},
				members : {
					buildUI : function() {
						var app = qx.core.Init.getApplication();

						this.setLayout(new qx.ui.layout.VBox(10));
						this.set({
							allowMaximize : false,
							allowMinimize : false,
							showMaximize : false,
							showMinimize : false,
							showStatusbar : false,
							showClose : false,
							contentPadding : 5,
							useMoveFrame : true,
							resizable : true
						});
						this.setWidth(400);
						webfrontend.gui.Util.formatWinClose(this);

						// Licensing
						var licenseLabel = new qx.ui.basic.Label("License").set({
							font : "bold"
						});
						this.add(licenseLabel);

						var license = "MercBot - script for Lord of Ultima(tm)";
						license += "\nCopyright (c) 2013 " + MercBot.Version.authors;
						if (MercBot.Version.contrib.length > 0)
							license += "\n\nPortions copyright " + MercBot.Version.contrib;
						license += "\nThe MercBot script uploads portions of your game data to MERC.  If you are not a member of MERC or an affiliate alliance you should uninstall this tool immediately.";
						license += "\n\n" + MercBot.Version.License;
						license += "\n\n";

						var licenseText = new qx.ui.form.TextArea();
						licenseText.set({
							readOnly : true,
							wrap : true,
							//autoSize : true,
							tabIndex : 303,
							minHeight : 280
						});
						licenseText.setValue(license);
						this.add(licenseText);

						// Close button
						var closeButton = new qx.ui.form.Button("Close");
						closeButton.addListener("execute", this.hide, this);
						this.add(closeButton);
					}
				}
			});
			qx.Class.define("MercBot.ui.components.LeftPanel", {
				extend : qx.ui.container.Composite,
				construct : function(label) {
					this.base(arguments);
					this.buildPanelUI(label);
				},
				members : {
					content : null,
					closeMercToolsBtn : null,
					titleRow : null,
					buildPanelUI : function(labelText) {
						this.setLayout(new qx.ui.layout.Canvas());
						this.set({
							marginTop : 3,
							marginBottom : 3
						});

						var background = new qx.ui.basic.Image('resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_scaler.png');
						background.set({
							width : 338,
							scale : true,
							allowGrowY : true
						});
						this.add(background, {
							left : 0,
							top : 27,
							bottom : 34
						});

						background = new qx.ui.basic.Image('resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_end.png');
						background.set({
							width : 338,
							height : 35
						});
						this.add(background, {
							left : 0,
							bottom : 0
						});

						background = new qx.ui.basic.Image("resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_wide.png");
						background.set({
							width : 338,
							height : 32
						});
						this.add(background, {
							left : 0,
							top : 0
						});

						this.titleRow = new qx.ui.container.Composite();
						this.titleRow.setLayout(new qx.ui.layout.HBox(2));
						this.titleRow.set({
							width : 320
						});
						this.add(this.titleRow, {
							left : 8,
							top : 6
						});

						var label = new qx.ui.basic.Label(labelText);
						label.set({
							font : "bold",
							textColor : "#ffCC82",
							paddingTop : 2
						});
						this.titleRow.add(label);

						this.aboutMercToolsBtn = new qx.ui.form.Button("?");
						this.aboutMercToolsBtn.set({
							appearance : "button-text-small",
							toolTipText : "About MercBot Tools"
						});
						this.aboutMercToolsBtn.addListener("execute", this.showHelp, this);
						this.titleRow.add(this.aboutMercToolsBtn);

						this.optionsBtn = new qx.ui.form.Button("O");
						this.optionsBtn.set({
							appearance : "button-text-small",
							toolTipText : "MercBot Options"
						});
						this.optionsBtn.addListener("click", this.showOptionsPage, this);
						this.titleRow.add(this.optionsBtn);
						this.optionsBtn.setVisibility("excluded");

						this.uploadBtn = new qx.ui.form.Button("U");
						this.uploadBtn.set({
							appearance : "button-text-small",
							toolTipText : "Send military info for the current city"
						});
						var mMain = MercBot.Main.getInstance();
						this.uploadBtn.addListener("click", mMain.sendCityData, mMain);
						this.titleRow.add(this.uploadBtn);
						this.uploadBtn.setVisibility("excluded");

						this.uploadUnreadReportsBtn = new qx.ui.form.Button("R");
						this.uploadUnreadReportsBtn.set({
							appearance : "button-text-small",
							toolTipText : "Upload unread reports"
						});
						this.uploadUnreadReportsBtn.addListener("click", mMain.uploadUnreadReports, mMain);
						this.titleRow.add(this.uploadUnreadReportsBtn);
						this.titleRow.add(new qx.ui.core.Widget().set({
							height : 0
						}), {
							flex : 2
						});
						this.uploadUnreadReportsBtn.setVisibility("excluded");

						this.closeImage = new qx.ui.basic.Image("webfrontend/ui/icons/icon_chat_resize_smaller.png");
						this.closeImage.setWidth(16);
						this.closeImage.setHeight(16);
						this.closeImage.setScale(true);
						this.closeImage.setAlignY("middle");
						this.closeMercToolsBtn = new qx.ui.form.Button();
						this.closeMercToolsBtn.set({
							width : 16,
							appearance : "button-text-small",
							toolTipText : "Hide MercBot Tools"
						});
						this.closeMercToolsBtn.addListener("click", this.toggleMercBotTools, this);
						this.closeMercToolsBtn._add(this.closeImage);
						this.titleRow.add(this.closeMercToolsBtn);

						this.content = new qx.ui.container.Composite();
						this.content.setLayout(new qx.ui.layout.VBox(5));
						this.content.set({
							width : 322,
							marginBottom : 8
						});
						this.add(this.content, {
							top : 35,
							left : 8
						});
					},
					showHelp : function() {
						var dialog = MercBot.ui.AboutWindow.getInstance();
						dialog.center();
						dialog.show();
					},
					showOptionsPage : function() {
						var currentOverlay = qx.core.Init.getApplication().getCurrentOverlay();
						var curOverlayName = currentOverlay != null ? currentOverlay.basename : "";
						qx.core.Init.getApplication().switchOverlay((curOverlayName == "MercBotOptionsPage") ? null : this.optionsPage);
					},
					getContent : function() {
						return this.content;
					},
					toggleMercBotTools : function() {
						var options = MercBot.Main.getInstance().options;
						var minHeight = options.hideMercBotNotice ? 32 : 84;
						if (this.getMaxHeight() != minHeight) {
							this.optionsBtn.setVisibility("visible");
							this.uploadBtn.setVisibility("visible");
							this.uploadUnreadReportsBtn.setVisibility("visible");
							this.closeImage.setSource("webfrontend/ui/icons/icon_chat_resize.png");
							this.closeMercToolsBtn.setToolTipText("Show MercBot Tools");
							this.setMaxHeight(minHeight);
						} else {
							this.optionsBtn.setVisibility("excluded");
							this.uploadBtn.setVisibility("excluded");
							this.uploadUnreadReportsBtn.setVisibility("excluded");
							this.closeImage.setSource("webfrontend/ui/icons/icon_chat_resize_smaller.png");
							this.setMaxHeight(245);
							this.closeMercToolsBtn.setToolTipText("Hide MercBot Tools");
						}
					},
					addContent : function(widget, args) {
						this.content.add(widget, args);
					}
				}
			});
			qx.Class.define("MercBot.ui.Main", {
				extend : MercBot.ui.components.LeftPanel,
				construct : function(title) {
					this.base(arguments, title);
					this.buildUI();
				},
				members : {
					commandRow : null,
					_donateRow : null,
					_extraRow : null,
					_extraRow2 : null,
					_extraRow3 : null,
					cityInfoImg : null,
					city : null,
					optionsPage : null,
					options : null,
					noticeLabel : null,
					noticeTextLabel : null,
					goBtn : null,
					uploadUnreadReportsButton : null,
					buildUI : function() {
						var app = qx.core.Init.getApplication();
						var cInfoView = app.getCityInfoView();
						var bQc = cInfoView.buildingQueue;
						var bQh = bQc.header;

						var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(3));

						this.optionsPage = new MercBot.MercBotOptionsPage();

						this.noticeLabel = new qx.ui.basic.Label(" ");
						this.noticeLabel.setTextColor("red");
						this.noticeLabel.setWidth(42);
						this.noticeLabel.setValue('NOTICE:');
						row.add(this.noticeLabel);
						this.noticeTextLabel = new qx.ui.basic.Label(" ");
						this.noticeTextLabel.setWidth(275);
						this.noticeTextLabel.setHeight(50);
						this.noticeTextLabel.setRich(true);
						this.noticeTextLabel.setValue("This script uploads data from your game to MERC.  If you do not want your data uploaded uninstall it NOW! <a href='http://userscripts.org/scripts/show/177071' target='_blank'>http://userscripts.org/scripts/show/177071</a>");
						row.add(this.noticeTextLabel);

						this.addContent(row);

						var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));

						// ***** Options button ***** //
						var optionsBtn = new qx.ui.form.Button("Options");
						optionsBtn.set({
							width : 50,
							appearance : "button-text-small",
							toolTipText : "MercBot Options"
						});
						optionsBtn.addListener("click", this.showOptionsPage, this);
						row.add(optionsBtn);

						var cityDataButton = new qx.ui.form.Button("Upload");
						cityDataButton.set({
							width : 50,
							appearance : "button-text-small",
							toolTipText : "Send military info for the current city"
						});
						var mMain = MercBot.Main.getInstance();
						cityDataButton.addListener("execute", mMain.sendCityData, mMain);
						row.add(cityDataButton);

						this.uploadUnreadReportsButton = new qx.ui.form.Button("Upload unread reports");
						this.uploadUnreadReportsButton.set({
							width : 125,
							appearance : "button-text-small",
							toolTipText : "Upload data from unread reports."
						});
						var mMain = MercBot.Main.getInstance();
						this.uploadUnreadReportsButton.addListener("execute", mMain.uploadUnreadReports, mMain);
						row.add(this.uploadUnreadReportsButton);

						// Spacer
						row.add(new qx.ui.core.Widget().set({
							height : 0
						}), {
							flex : 1
						});
						this.addContent(row);

						var row = new qx.ui.container.Composite();
						row.setLayout(new qx.ui.layout.HBox(2));
						this.mercBotCommands = new qx.ui.form.SelectBox().set({
							width : 150,
							alignY : "middle",
							tabIndex : 1
						});
						var commands = [{
							cmd : "",
							text : "Select a command",
							parameters : []
						}, {
							cmd : "report",
							text : "City reports",
							parameters : [{
								type : "text",
								label : "Coord",
								tooltip : "Enter coords of the city get get reports for.",
								defVal : ""
							}, {
								type : "dropdown",
								label : "",
								defVal : "",
								width : 75,
								tooltip : "Select the type of reports you want to see.",
								items : [{
									id : "scout",
									label : "Scout"
								}, {
									id : "offense",
									label : "Offense"
								}, {
									id : "defense",
									label : "Defense"
								}]
							}, {
								type : "text",
								label : "Num",
								defVal : "8",
								width : 25,
								tooltip : "Number of reports to include."
							}, {
								type : "checkbox",
								label : "Exclude fakes",
								defVal : "false",
								tooltip : "Exclude fake attacks."
							}]
						}, {
							cmd : "pc",
							text : "Player castle count",
							parameters : [{
								type : "continents",
								label : "Cont",
								defVal : "",
								tooltip : "Continent to check, or blank for all."
							}, {
								type : "text",
								label : "Player name",
								defVal : "",
								tooltip : "Player name you want results for."
							}, {
								type : "checkbox",
								label : "On water",
								defVal : "false",
								tooltip : "Checked if you are only interested in water castles."
							}]
						}, {
							cmd : "ac",
							text : "Alliance castle count",
							parameters : [{
								type : "continents",
								label : "Cont",
								defVal : "",
								tooltip : "Continent to check, or blank for all."
							}, {
								type : "text",
								label : "Alliance name",
								defVal : "",
								tooltip : "Long name of the alliance name you want results for or blank for all."
							}, {
								type : "checkbox",
								label : "On water",
								defVal : "false",
								tooltip : "Checked if you are only interested in water castles."
							}]
						}, {
							cmd : "ps",
							text : "Player Sub",
							parameters : [{
								type : "text",
								label : "Player name",
								defVal : "",
								tooltip : "Player you want to see the last sub for."
							}]
						}, {
							cmd : "ai",
							text : "Alliance inactive",
							parameters : [{
								type : "text",
								label : "Alliance name",
								defVal : "",
								tooltip : "Long name of the alliance to look for inactive players in."
							}, {
								type : "text",
								label : "Num days",
								defVal : "3",
								tooltip : "Number days inactivity."
							}]
						}, {
							cmd : "alliance",
							text : "Alliance history",
							parameters : [{
								type : "text",
								label : "Alliance name",
								defVal : "",
								tooltip : "Long name of the alliance to get history of."
							}]
						}, {
							cmd : "history",
							text : "Player History",
							parameters : [{
								type : "text",
								label : "Player name",
								defVal : "",
								tooltip : "Player name you want history of."
							}]
						}, {
							cmd : "pah",
							text : "Player Alliance History",
							parameters : [{
								type : "text",
								label : "Player name",
								defVal : "",
								tooltip : "Player name you want history of alliances for."
							}]
						}, {
							cmd : "pdh",
							text : "Player Defensive Fame History",
							parameters : [{
								type : "text",
								label : "Player name",
								defVal : "",
								tooltip : "Player name you want defensive fame history for."
							}, {
								type : "text",
								label : "Num",
								defVal : "3",
								width : 25,
								tooltip : "Number of entries to include."
							}]
						}, {
							cmd : "poh",
							text : "Player Offensive Fame History",
							parameters : [{
								type : "text",
								label : "Player name",
								defVal : "",
								tooltip : "Player name you want offensive fame history for."
							}, {
								type : "text",
								label : "Num",
								defVal : "3",
								width : 25,
								tooltip : "Number of entries to include."
							}]
						}, {
							cmd : "pph",
							text : "Player Plundering History",
							parameters : [{
								type : "text",
								label : "Player name",
								defVal : "",
								tooltip : "Player name you want plundering history for."
							}, {
								type : "text",
								label : "Num",
								defVal : "3",
								width : 25,
								tooltip : "Number of entries to include."
							}]
						}, {
							cmd : "psch",
							text : "Player Score History",
							parameters : [{
								type : "text",
								label : "Player name",
								defVal : "",
								tooltip : "Player name you want score history for."
							}, {
								type : "text",
								label : "Num",
								defVal : "3",
								width : 25,
								tooltip : "Number of entries to include."
							}]
						}, {
							cmd : "pudh",
							text : "Player Units Defeated History",
							parameters : [{
								type : "text",
								label : "Player name",
								defVal : "",
								tooltip : "Player name you want units defeated history for."
							}, {
								type : "text",
								label : "Num",
								defVal : "3",
								width : 25,
								tooltip : "Number of entries to include."
							}]
						}, {
							cmd : "city",
							text : "Coords History",
							parameters : [{
								type : "text",
								label : "Coords",
								defVal : "",
								tooltip : "Coords you want history of."
							}]
						}, {
							cmd : "chat",
							text : "Chat with MercBot",
							parameters : [{
								type : "text",
								label : "Message",
								defVal : "",
								width : 260,
								tooltip : "Message to send MercBot."
							}]
						}, {
							cmd : "sm",
							text : "Set status message",
							parameters : [{
								type : "text",
								label : "Message",
								defVal : "",
								width : 260,
								tooltip : "The text you wish to set as your player status message.  Use caution if including personal information."
							}]
						}, {
							cmd : "gm",
							text : "Get player status message",
							parameters : [{
								type : "text",
								label : "Player Name",
								defVal : "",
								width : 150,
								tooltip : "Player who's status message you wish to retrieve."
							}]
						}, {
							cmd : "random",
							text : "Random",
							parameters : []
						}];
						this.addContent(row);

						this.commandRow = new qx.ui.container.Composite();
						this.commandRow.setLayout(new qx.ui.layout.HBox(2));
						this.addContent(this.commandRow);

						for (var ii = 0; ii < commands.length; ++ii) {
							li = new qx.ui.form.ListItem(commands[ii].text, null, commands[ii].cmd);
							li.params = commands[ii].parameters;
							li.commandRow = this.commandRow;
							this.mercBotCommands.add(li);
						}
						row.add(this.mercBotCommands);
						this.mercBotCommands.addListener("changeSelection", function(e) {
							var app = qx.core.Init.getApplication();
							var li = e.getData()[0];
							var params = li.params;
							var row = li.commandRow;
							row.removeAll();
							var csb = (new webfrontend.gui.MapSelectorBarWidget()).continentNavSelBox
							var csel = csb.getSelectables();
							for (var ii = 0; ii < params.length; ++ii) {
								var param = params[ii];
								switch(param.type) {
									case "continents":
										var selBox = new qx.ui.form.SelectBox().set({
											alignY : "middle",
											tabIndex : 1,
											width : param.hasOwnProperty("width") ? param.width : 60
										});
										selBox.setAlignY("middle");
										row.add(selBox);
										var li = new qx.ui.form.ListItem("World", null, "");
										selBox.add(li);
										for (var x = 0; x < csel.length; ++x) {
											var item = csel[x];
											var cnt = item.getModel();
											cnt = ((cnt < 10) ? "0" : "") + cnt.toString();
											li = new qx.ui.form.ListItem(item.getLabel(), null, cnt);
											selBox.add(li);
										}
										break;
									case "text":
										var label = new qx.ui.basic.Label(param.label);
										label.setAlignY("middle");
										label.set({
											marginLeft : 5
										});
										row.add(label);
										var tf = new qx.ui.form.TextField();
										tf.set({
											toolTipText : param.tooltip,
											width : param.hasOwnProperty("width") ? param.width : 55
										});
										tf.setAlignY("middle");
										app.setElementModalInput(tf);
										tf.setValue(param.defVal);
										row.add(tf);
										break;
									case "checkbox":
										var cb = new qx.ui.form.CheckBox(param.label);
										cb.set({
											marginLeft : 5
										});
										cb.setAlignY("middle");
										cb.set({
											toolTipText : param.tooltip
										});
										cb.setValue(param.defVal == "true");
										row.add(cb);
										break;
									case "dropdown":
										var label = new qx.ui.basic.Label(param.label);
										label.setAlignY("middle");
										row.add(label);
										var selBox = new qx.ui.form.SelectBox().set({
											alignY : "middle",
											tabIndex : 1,
											width : param.hasOwnProperty("width") ? param.width : 60
										});
										for (var x = 0; x < param.items.length; ++x) {
											var item = param.items[x];
											li = new qx.ui.form.ListItem(item.label, null, item.id);
											selBox.add(li);
										}
										selBox.setAlignY("middle");
										row.add(selBox);
										break;
								}
							}
						});
						this.goBtn = new qx.ui.form.Button("Go").set({
							marginLeft : 10,
							paddingLeft : 8,
							paddingRight : 8,
							paddingTop : 2,
							paddingBottom : 2,
							alignY : "center",
							enabled : true
						});
						this.goBtn.cmdSel = this.mercBotCommands;
						this.goBtn.cmdRow = this.commandRow;
						row.add(this.goBtn);
						this.goBtn.addListener("click", function() {
							var cmd = this.cmdSel.getSelection()[0].getModel();
							if (cmd.length > 0) {
								var isChat = cmd == "chat";
								cmd = isChat ? "" : ("!" + cmd);
								var children = this.cmdRow.getChildren();
								for (var ii = 0; ii < children.length; ++ii) {
									var child = children[ii];
									switch (child.basename.toLowerCase()) {
										case "textfield":
											cmd += ( isChat ? "" : ",") + child.getValue();
											break;
										case "continent":
										case "selectbox":
											cmd += "," + child.getSelection()[0].getModel();
											break;
										case "checkbox":
											cmd += "," + (child.getValue() ? "1" : "");
											break;
									}
								}
								webfrontend.data.Chat.getInstance().addMsg("/whisper MercBot " + cmd);
							}
						}, this.goBtn);

						this._donateRow = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));

						var donate = new qx.ui.basic.Label(" ");
						this._donateRow.add(donate);
						this._donateRow.set({
							height : 20
						});
						flattr = new qx.ui.basic.Label(" ");
						flattr.setRich(true);
						flattr.setValue('<a href="http://flattr.com/thing/1559985/MercTools" target="_blank"><img src="http://api.flattr.com/button/flattr-badge-large.png" alt="Flattr Merc Tools" title="Flattr Merc Tools" border="0" /></a>');
						this._donateRow.add(flattr);

						this.addContent(this._donateRow);
						this._extraRow = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
						this.addContent(this._extraRow);
						this._extraRow2 = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
						this.addContent(this._extraRow2);
						this._extraRow3 = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
						this.addContent(this._extraRow3);
					}
				}
			});

			var player = webfrontend.data.Player.getInstance();
			var aco = webfrontend.data.Alliance.getInstance();
			var _mtPn = player.getName();
			var _mtAn = aco.getName();
			var _mtPid = player.getId();
			var _mtWld = webfrontend.data.Server.getInstance().getName();
			try {
				_mtWld = _mtWld.match(/\d/g).join("");
			} catch (e) {
				_mtWld = webfrontend.data.Server.getInstance().getName();
			}
			var _mtD = "&pid=" + _mtPid + "&wld=" + _mtWld;
			var _mtV = MercBot.Version.version;

			function gsc(index) {
				var ca = qx.core.Init.getApplication().getOptionsPage().clientArea;
				return ca.getChildren()[0]     // tabstrip
				.getChildren()[3]    // tab
				.getChildren()[0]    // scrollarea
				.getChildren()[0]    // page
				.getChildren()[0]    // Sub Request section
				.getChildren()[7]    // Send Request composite
				.getChildren()[index];
				// send button
			}

		}
		function MBinitialize() {
			if (!MBstartup.initialized) {
				MBstartup.initialized = true;
				createMercBotTools();
				MercBot.Main.getInstance().initialize();
			}
		}

		var MBstartup = function() {
			try {
				if ( typeof qx == 'undefined') {
					window.setTimeout(MBstartup, 2000);
				} else if ( typeof paTweak == 'undefined') {
					window.setTimeout(MBstartup, 2000);
				} else if ( typeof paTweak.Main == 'undefined') {
					window.setTimeout(MBstartup, 2000);
				} else if ( typeof paTweak.ui.alerts == 'undefined') {
					window.setTimeout(MBstartup, 2000);
				} else if ( typeof paTweak.Main.getInstance().panel == 'undefined') {
					window.setTimeout(MBstartup, 2000);
				} else if (!webfrontend.config.Config.getInstance().getChat()) {
					window.setTimeout(MBstartup, 2000);
				} else if (!webfrontend.data.Chat.getInstance()) {
					window.setTimeout(MBstartup, 2000);
				} else if (!qx.core.Init.getApplication().chat) {
					window.setTimeout(MBstartup, 2000);
				} else {
					window.setTimeout(MBinitialize, 2000);
				}
			} catch (e) {
				window.setTimeout(MBstartup, 2000);
			}
		};
		window.setTimeout(MBstartup, 2000);
	};

	function MBDebug(e) {
		if (window.console && typeof console.log == "function") {
			console.log(e);
		}
	}

	function inject() {
		MBDebug('Injecting MercBot script');
		var script = document.createElement("script");
		txt = main.toString();
		if (window.opera != undefined)
			txt = txt.replace(/</g, "&lt;");
		script.innerHTML = "(" + txt + ")();";
		script.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(script);
		MBDebug('Injected');
		//main();
	}

	if (/lordofultima\.com/i.test(document.domain))
		inject();
})();

