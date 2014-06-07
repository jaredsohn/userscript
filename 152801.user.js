// ==UserScript==
// @name			C&C: Tiberium Alliances Map
// @description		Shows you the region map
// @namespace		https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include			https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version			1.6.9
// @icon        	https://sites.google.com/site/titlemod/home/favicon.png
// @contributor		Nolana Kane | KSX | 777lexa777
// @grant			none

// ==/UserScript==

// based on Tiberium Alliances Map (Nolana Kane) v1.8
// https://userscripts.org/scripts/show/135955
// contributors:
// KSX https://userscripts.org/scripts/show/149093
// 777lexa777 https://userscripts.org/scripts/show/149350

(function () {
	var TAMap_mainFunction = function () {
		function createMapTweak() {
			var TAMap = {};
			qx.Class.define("TAMap", {
				type : "singleton",
				extend : qx.core.Object,
				members : {
					version : "1.6.9",
					alliances : null,
					alliancesAreLoaded : false,
					buttonMap : null,
					blurInterval : null,
					drawingNow : false,
					initZoom : null,
					isInitialized : false,
					mapBox : null,
					mapCanvas : null,
					canvasElement : null,
					canvasWidth : null,
					canvasHeight : null,
					mapMouseCanvas : null,
					mapMouseWidget : null,
					scroll : null,
					scrollWidget : null,
					settingsWnd : null,
					mapUpdateTimer : null,
					relations : {
						enemies : null,
						enemiesById : null,
						enemyCoords : [],
						allies : null,
						nap : null
					},
					swObj : {
						isLoaded : false,
						refreshIcon : null,
						allianceSelect : null,
						allianceListItem : {},
						poiSelect : null,
						obfSectorName : null,
						obfAllianceList : null,
						obfAllianceId : null,
						obfAllianceName : null,
						settingFields : {},
						labels : {},
						chkBoxFields : {},
						coordButtons : {}
					},
					line : {
						1 : {
							x : null,
							y : null
						},
						2 : {
							x : null,
							y : null
						}
					},
					visOptions : null,
					visOpt_DEFAULTS : {
						selectedAllianceId : -1,
						selectedAllianceName : "<< None >>",
						poi : -2,
						vpWidth : null,
						vpHeight : null,
						showEnemies : true,
						showEnemyRange : true,
						mapBoxBounds : {
							height : 500,
							top : 33,
							left : 129,
							width : 500
						},
						settingsWndBounds : {
							height : 646,
							top : 48,
							left : 615,
							width : 524
						},
						chk : {
							showAlliancePois : false,
							showOwnCities : true,
							showSectionFrame : true,
							showBorderLine1 : false,
							showBorderLine2 : false,
							fadeMap : true
						},
						settingsPanel : {
							playerColor : "#7F0", // type = 1
							baseColor : "#550", // type = 2
							campColor : "midnightblue", // type = 3, CampType=2
							outpostColor : "royalblue", // type = 3, CampType=3
							poiColor : "orange", // type = 4, POIType != 0
							tunnelColor : "forestgreen", // type = 4, POIType = 0
							enemyBaseColor : "red",
							allianceTerrainColor : "rgba(255,255,255,0.5)",
							ownBaseColor : "rgba(0,255,0,0.5)",
							highlightColor : "rgba(200,255,200,1)",
							line1start : "800:796",
							line1end : "1387:921",
							line1color : "rgba(0,255,0,0.3)",
							line2start : "800:796",
							line2end : "1410:830",
							line2color : "rgba(255,255,0,0.3)",
							zoomFactor : 3
						}
					},

					initialize : function () {
						console.log("\nTAMap v" + this.version + ": Loaded");
						this.init_vars();
						this.init_menuButton();
						this.init_mapBox();
						this.init_scroll();
						this.init_settingsWnd();
						this.init_settingsButton();
						this.init_mapBox_listeners();
						this.isInitialized = true;
					},

					init_vars : function () {
						// cloning
						var vTemp = JSON.parse(JSON.stringify(this.visOpt_DEFAULTS));
						if (localStorage) {
							var sto = localStorage.getItem("TAMapStorage");
							if (sto != null) {
								// check visOptions integrity against DEFAULTS
								this.visOptions = JSON.parse(sto);
								for (var i in vTemp) {
									if (typeof this.visOptions[i] == "object") {
										for (var j in vTemp[i]) {
											if (typeof this.visOptions[i][j] == "undefined") {
												console.log("\nSolving inconsistency with visOptions." + i + "." + j + "\n");
												this.visOptions[i][j] = vTemp[i][j];
											}
										}
									} else if (typeof this.visOptions[i] == "undefined") {
										console.log("Solving inconsistency with visOptions." + i);
										this.visOptions[i] = vTemp[i];
									}
								}
							} else {
								this.visOptions = vTemp;
							}
						}
						this.initZoom = this.visOptions.settingsPanel.zoomFactor;
						this.worldHeight = ClientLib.Data.MainData.GetInstance().get_World().get_WorldHeight();
						this.worldWidth = ClientLib.Data.MainData.GetInstance().get_World().get_WorldWidth();
						this.canvasHeight = this.worldHeight * this.initZoom;
						this.canvasWidth = this.worldWidth * this.initZoom;
					},

					init_menuButton : function () {
						this.buttonMap = new qx.ui.form.Button("Map");
						this.buttonMap.set({
							width : 80,
							appearance : "button-bar-center",
							toolTipText : ""
						});
						this.buttonMap.addListener("click", this.toggleMap, this);
						var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU);
						mainBar.getChildren()[1].addAt(this.buttonMap, 8, {
							top : 0,
							right : 0
						});
					},

					init_mapBox : function () {
						// The Map window
						this.mapBox = new qx.ui.window.Window("Mini-Map  [v" + this.version + "]");
						this.mapBox.setPadding(1);
						this.mapBox.setLayout(new qx.ui.layout.Grow());
						// this.mapBox.setLayout(new qx.ui.layout.VBox());
						this.mapBox.setShowMaximize(false);
						this.mapBox.setShowMinimize(false);
						this.mapBox.moveTo(this.visOptions.mapBoxBounds.left, this.visOptions.mapBoxBounds.top);
						this.mapBox.setHeight(this.visOptions.mapBoxBounds.height);
						this.mapBox.setWidth(this.visOptions.mapBoxBounds.width);
						this.mapBox.setMinWidth(10);
						this.mapBox.setMinHeight(10);
						this.mapBox.setBackgroundColor("black");
					},

					init_scroll : function () {
						var cw = this.canvasWidth;
						var ch = this.canvasHeight;
						this.scroll = new qx.ui.container.Scroll();

						//this.scroll.removeListener("mousewheel", this.scroll._onMouseWheel, this.scroll);
						this.scroll.addListener("mousewheel", function (evt) {
							console.log(evt.getWheelDelta());
						}, this);

						this.mapBox.add(this.scroll);

						this.scrollWidget = new qx.ui.core.Widget();
						this.scrollWidget.setMinHeight(ch);
						this.scrollWidget.setMinWidth(cw);
						this.scrollWidget.setHeight(ch);
						this.scrollWidget.setWidth(cw);
						this.scroll.add(this.scrollWidget);

						this.canvasElement = new qx.html.Element("canvas", null, {
								id : "map",
								width : cw,
								height : ch
							});
						this.canvasElement.addListener("appear", function () {
							//console.log("appeared:" + this.canvasElement.getDomElement());
							this.createMapCanvas();
						}, this);
						this.scrollWidget.getContentElement().add(this.canvasElement);
					},

					init_settingsWnd : function () {
						try {
							/* select box for alliances */
							var selectBox = new qx.ui.form.SelectBox();
							var _this = this;
							selectBox.addListener("changeSelection", function (e) {
								try {
									if (e != null && e.getData() && e.getData().length > 0) {
										var mod = e.getData()[0].getModel();
										console.log("Alliance selected: ");
										console.log(mod);
										console.log("e.getData()[0]: ");
										console.log(e.getData()[0]);

										this.visOptions.selectedAllianceId = mod; // alliance ID or -1 for none
										console.log("saved: " + mod);
										this.visOptions.selectedAllianceName = this.swObj.allianceListItem[mod].getLabel();
										if (this.visOptions.selectedAllianceId != -1) {
											this.swObj.chkBoxFields.showAlliancePois.setEnabled(true);
										}

										this.saveOptions();
										this.updateMap();
									}
								} catch (err) {
									console.log("alliance changeSelection error:");
									console.log(err);
								}
							}, this);
							this.swObj.allianceSelect = selectBox;

							// this.mapBox.add(selectBox);

							/* Select box for POI Type */
							selectBox = new qx.ui.form.SelectBox();

							var currentSelection = this.visOptions.poi || -2;
							var makePoiItem = function (model, name) {
								var item = new qx.ui.form.ListItem(name, null, model);
								selectBox.add(item);
								if (currentSelection == model) {
									selectBox.setSelection([item]);
								}
							}

							FPOI = ClientLib.Data.WorldSector.WorldObjectPointOfInterest.EPOIType;
							makePoiItem(-2, "<< All >>");
							makePoiItem(-1, "<< None >>");
							makePoiItem(FPOI.TiberiumMine, "Tiberium");
							makePoiItem(FPOI.CrystalMine, "Crystal");
							makePoiItem(FPOI.PowerVortex, "Reactor");
							makePoiItem(FPOI.Infantery, "Tungsten INF");
							makePoiItem(FPOI.Vehicle, "Uranium VEH");
							makePoiItem(FPOI.Air, "Aircraft");
							makePoiItem(FPOI.Defense, "Resonator DEF");
							//makePoiItem(FPOI.TunnelExit,"Tunnel Exit");

							/* ClientLib.Base.EPOIType is not consistent with ClientLib.Data.WorldSector.WorldObjectPointOfInterest.EPOIType
							makePoiItem(ClientLib.Base.EPOIType.AirBonus, "Aircraft GNT (Off Air)");
							makePoiItem(ClientLib.Base.EPOIType.CrystalBonus, "Crystal CNH");
							makePoiItem(ClientLib.Base.EPOIType.DefenseBonus, "Resonator NT (Def)");
							makePoiItem(ClientLib.Base.EPOIType.InfanteryBonus, "Tungsten C (Off Inf)");
							makePoiItem(ClientLib.Base.EPOIType.PowerBonus, "Reactor (Power Bonus)");
							makePoiItem(ClientLib.Base.EPOIType.TiberiumBonus, "Tiberium CN");
							makePoiItem(ClientLib.Base.EPOIType.VehicleBonus, "Uranium C (Off Vehicles)");
							 */

							selectBox.addListener("changeSelection", function (e) {
								try {
									if (e != null && e.getData() && e.getData().length > 0) {
										console.log("POI selected " + e.getData()[0].getModel());
										_this.visOptions.poi = e.getData()[0].getModel(); // POI ID or -2 for all
										this.saveOptions();
										this.updateMap();
									}
								} catch (err) {
									console.log(err);
								}
							}, this);
							this.swObj.poiSelect = selectBox;


							/* Settings Window */
							this.settingsWnd = new qx.ui.window.Window("Map Settings");
							this.settingsWnd.setPadding(10);
							//this.mapBox.setLayout(new qx.ui.layout.Grow());

							var layout = new qx.ui.layout.Grid();
							layout.setSpacing(5);
							layout.setColumnAlign(0, "right", "center");
							layout.setColumnAlign(1, "left", "center");
							layout.setColumnAlign(2, "left", "center");
							layout.setColumnAlign(3, "right", "center");
							layout.setColumnAlign(4, "left", "center");
							this.settingsWnd.setLayout(layout);
							this.settingsWnd.setShowMaximize(false);
							this.settingsWnd.setShowMinimize(false);
							this.settingsWnd.moveTo(this.visOptions.settingsWndBounds.left, this.visOptions.settingsWndBounds.top);
							this.settingsWnd.setHeight(this.visOptions.settingsWndBounds.height);
							this.settingsWnd.setWidth(this.visOptions.settingsWndBounds.width);
							this.settingsWnd.setMinWidth(10);
							this.settingsWnd.setMinHeight(10);
							this.settingsWnd.addListener("close", function () {
								this.visOptions.settingsWndBounds = this.settingsWnd.getBounds();
								this.saveOptions();
							}, this);

							/* Reset Button */
							var resetAllOptions = new qx.ui.form.Button("Full Reset");
							resetAllOptions.set({
								appearance : "button-text-small",
								toolTipText : '<div style="color:#F22">Reset All options to default</div>',
							});

							resetAllOptions.addListener("click", function () {
								if (confirm("Are you sure? This will return all settings to default.")) {
									this.visOptions = JSON.parse(JSON.stringify(this.visOpt_DEFAULTS));
									this.saveOptions();
									for (var option in this.visOptions.chk) {
										//console.log("this.visOptions.chk." + option + " == " + this.visOptions.chk[option]);
										if (this.swObj.chkBoxFields[option]) {
											this.swObj.chkBoxFields[option].setValue(this.visOptions.chk[option]);
										} else {
											console.log(option + " ::: chkBoxFields does not exist.")
										}
									}
									for (var option in this.visOptions.settingsPanel) {
										if (option == "chk") {
											//do nothing
										} else if (this.swObj.settingFields[option]) {
											this.swObj.settingFields[option].setValue(String(this.visOptions.settingsPanel[option]));
										} else {
											console.log(option + " :: settingFields does not exist.")
										}
									}
									this.updateMap();
									this.scrollMapBox(false);
								}
							}, this);
							this.settingsWnd.add(resetAllOptions, {
								row : 14,
								column : 4
							});

							this.makeLbl("- Highlight -", 0, 0);
							this.makeLbl("Alliance POIs:", 1, 0);
							this.settingsWnd.add(this.swObj.allianceSelect, { row : 1, column : 1 });

							this.refreshIcon = new qx.ui.basic.Image("FactionUI/icons/icon_refresh_funds.png");
							this.settingsWnd.add(this.refreshIcon, { row : 1,column : 2 });

							this.refreshIcon.addListener("click", function () {
								this.populateAllianceSelect();
							}, this);

							this.makeLbl("POIs:", 2, 0);
							this.settingsWnd.add(this.swObj.poiSelect, {
								row : 2,
								column : 1
							});
							this.makeLbl("Alliance POIs:", 3, 0);
							/* Checkbox for alliance POIs */
							this.makeCheckbox("showAlliancePois",3,1);
							if (this.visOptions.selectedAllianceId == -1) {
								this.swObj.chkBoxFields.showAlliancePois.setEnabled(false);
							}
							this.makeLbl("Own Cities:", 4, 0);
							/* Checkbox for own bases */
							this.makeCheckbox("showOwnCities",4,1);
							this.makeLbl("Viewport Frame:", 5, 0);
							/* Checkbox for showSectionFrame */
							this.makeCheckbox("showSectionFrame",5,1);

							bt = new qx.ui.basic.Label("- Colors -").set({
									value : '<a href="http://www.w3schools.com/html/html_colornames.asp" style="font-size:16px;font-weight:bold;color:orange" target="_blank">- Colors -</a>',
									rich : true,
									selectable : true
								});
							this.settingsWnd.add(bt, {
								row : 6,
								column : 1,
							});
							// bt.addListener("click", function() { window.open("http://www.w3schools.com/html/html_colornames.asp") });


							this.makeLbl("Alliance Terrain:", 7, 0);
							this.makeTxt("allianceTerrainColor", 7, 1);

							this.makeLbl("Forg. Base:", 8, 0);
							this.makeTxt("baseColor", 8, 1);

							this.makeLbl("Camp:", 9, 0);
							this.makeTxt("campColor", 9, 1);

							this.makeLbl("Player:", 10, 0);
							this.makeTxt("playerColor", 10, 1);

							this.makeLbl("Enemy:", 11, 0);
							this.makeTxt("enemyBaseColor", 11, 1);
							//this.swObj.settingFields.enemyBaseColor.setEnabled(false);

							this.makeLbl("Outpost:", 12, 0);
							this.makeTxt("outpostColor", 12, 1);

							this.makeLbl("POI:", 13, 0);
							this.makeTxt("poiColor", 13, 1);

							this.makeLbl("Tunnel:", 14, 0);
							this.makeTxt("tunnelColor", 14, 1);

							this.makeLbl("Own Base:", 15, 0);
							this.makeTxt("ownBaseColor", 15, 1);
							//this.swObj.settingFields.ownBaseColor.setEnabled(false);

							this.makeLbl("Highlight:", 16, 0);
							this.makeTxt("highlightColor", 16, 1);
							//this.swObj.settingFields.highlightColor.setEnabled(false);

							/* Line Options */
							this.makeLbl(",.-^-.,", 0, 2, "'-.,.-'", "green");

							this.makeLbl("- Line -", 0, 3);


							this.makeLbl("Show Line", 1, 3);
							/* Checkbox for showBorderLine1 */
							this.makeCheckbox("showBorderLine1",1,4);

							this.makeLbl("Line Start:", 2, 3);
							this.makeTxt("line1start", 2, 4);
							this.makeCoordsSelectionButton("line1start", 2, 5, "\u2607");

							this.makeLbl("Line End:", 3, 3);
							this.makeTxt("line1end", 3, 4);
							this.makeCoordsSelectionButton("line1end", 3, 5, "\u2613");

							this.makeLbl("Line 1 Color:", 4, 3);
							this.makeTxt("line1color", 4, 4);

							this.makeLbl("Show Line 2", 5, 3);
							/* Checkbox for showBorderLine2 */
							this.makeCheckbox("showBorderLine2",5,4);

							this.makeLbl("Line Start:", 6, 3);
							this.makeTxt("line2start", 6, 4);
							this.makeCoordsSelectionButton("line2start", 6, 5, "\u2607");

							this.makeLbl("Line End:", 7, 3);
							this.makeTxt("line2end", 7, 4);
							this.makeCoordsSelectionButton("line2end", 7, 5, "\u2613");

							this.makeLbl("Line 2 Color:", 8, 3);
							this.makeTxt("line2color", 8, 4);
							
							this.makeLbl("Fade Map ?", 9, 3);
							this.makeCheckbox("fadeMap",9, 4);
							

							/* Zoom Buttons */
							this.makeLbl("Zoom Experimental!", 11, 4, null, "red");
							this.makeLbl("Zoom Factor:", 12, 3);
							this.makeTxt("zoomFactor", 12, 4);
							this.swObj.settingFields.zoomFactor.setValue(String(this.initZoom));
							this.swObj.settingFields.zoomFactor.setTextAlign("right");
							this.swObj.settingFields.zoomFactor.setEnabled(false);
							var btnZoomIn = new qx.ui.form.Button("Zoom In");
							btnZoomIn.set({
								appearance : "button-text-small",
								toolTipText : '<div style="color:#FFAAAA">!!!</div>you might need to reload after zooming in',
							});
							btnZoomIn.addListener("click", function () {
								//increment +0.2
								this.visOptions.settingsPanel.zoomFactor = Math.round((this.visOptions.settingsPanel.zoomFactor + 0.2) * 10) / 10;
								this.swObj.settingFields.zoomFactor.setValue(String(this.visOptions.settingsPanel.zoomFactor));
								this.saveOptions();
								//this.fixScrollBounds();
								this.updateMapDelayed();
								this.scrollMapBox(true); // re-center
							}, this);
							this.settingsWnd.add(btnZoomIn, {
								row : 13,
								column : 3,
							});

							var btnZoomOut = new qx.ui.form.Button("Zoom Out");
							btnZoomOut.set({
								appearance : "button-text-small",
								//toolTipText : "tuO mooZ"
							});
							this.settingsWnd.add(btnZoomOut, {
								row : 13,
								column : 4
							});
							btnZoomOut.addListener("click", function () {
								this.visOptions.settingsPanel.zoomFactor = Math.round((this.visOptions.settingsPanel.zoomFactor - 0.2) * 10) / 10;
								this.swObj.settingFields.zoomFactor.setValue(String(this.visOptions.settingsPanel.zoomFactor));
								this.saveOptions();
								this.updateMap();
								this.scrollMapBox(false); // re-center
							}, this);

							/* "Apply" button */
							var applyOptions = new qx.ui.form.Button("\u2611");
							applyOptions.set({
								appearance : "button-text-small",
								toolTipText : "Save and apply changes to lines colors"
							});
							applyOptions.addListener("click", function () {
								this.saveOptions();
								this.updateMap();
								this.scrollMapBox(false);
							}, this);
							this.settingsWnd.add(applyOptions, {
								row : 16,
								column : 5
							});

							/* this.settingsWnd.addListener("appear", function () {
							console.log("settingsWnd appear event fired");
							// this.populateAllianceSelect();
							}, this);
							 */

							this.swObj.isLoaded = true;
						} catch (err) {
							console.log(err);
						}
					},

					setMapUpdateTimer : function () {
						var _this = this;
						clearTimeout(this.mapUpdateTimer); 
						if (this.mapBox.isVisible()){
							this.mapUpdateTimer = setTimeout(function (){
								_this.updateMap();
								_this.scrollMapBox();
							}, 1000);
						}
					},
					
					init_mapBox_listeners : function () {
						// Gets called A LOT while "scrolling"
						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.setMapUpdateTimer);
						
						this.mapBox.addListener("close", function () {
							if (this.settingsWnd.isVisible()) {
								this.visOptions.settingsWndBounds = this.settingsWnd.getBounds();
								this.settingsWnd.close();
							}

							this.visOptions.mapBoxBounds = this.mapBox.getBounds();
							this.saveOptions();
						}, this);

						this.mapBox.addListener("blur", function () {
							var _this = this;
							this.blurInterval = setInterval(function () {
									if (!_this.settingsWnd.isVisible() && _this.visOptions.chk.fadeMap) {
										_this.mapBox.setOpacity(0.5);
										clearInterval(this.blurInterval);
									}
								}, 1000)
						}, this);
						this.mapBox.addListener("focus", function () {
							//console.log("focus");
							clearInterval(this.blurInterval);
							this.mapBox.setOpacity(1);
						}, this);
						this.mapBox.addListener("mouseover", function () {
							this.mapBox.focus();
						}, this);

						this.mapBox.addListener("resize", function () {
							var _this = this;
							setTimeout(function (e) {
								_this.scrollMapBox(false);
							}, 1000);
							//console.log("resized");
							//this.updateMap();
						}, this);
					},

					init_settingsButton : function () {
						/* Settings Button */
						var bt = new qx.ui.form.Button("Settings");
						bt.set({
							appearance : "button-text-small",
							toolTipText : "Set filters for the map"
						});
						bt.addListener("click", function () {
							if (this.settingsWnd.isVisible()) {
								this.settingsWnd.close();
							} else {
								this.settingsWnd.moveTo(this.visOptions.settingsWndBounds.left, this.visOptions.settingsWndBounds.top);
								this.settingsWnd.open();
							}
						}, this);
						this.mapBox.getChildControl("captionbar").add(bt, {
							row : 0,
							column : 5
						});
					},

					init_mapMouse : function () {
						var cw = this.canvasWidth;
						var ch = this.canvasHeight;
						
						//this.mapMouseWidget.removeAll();
						//this.scrollWidget.removeAll();
						var vW = this.visOptions.vpWidth;
						var vH = this.visOptions.vpHeight;
						this.mapMouseWidget = new qx.html.Element("canvas", null, {
								id : "mapCursor",
								width : cw,
								height : ch
							});
						var cnv = this.mapMouseWidget.getDomElement();
						this.mapMouseCanvas = cnv;
						var ctx = this.mapMouseCanvas.getContext('2d');
						ctx.strokeStyle = "rgb(200,0,0)";
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(vW / 2, vH / 2);
						ctx.lineTo(cw, ch);
						ctx.stroke();
					},

					createMapCanvas : function () {
						try {
							var canvas = this.canvasElement.getDomElement();
							if (this.mapCanvas == null) {
								this.mapCanvas = canvas;
								var _this = this;
								/*
								this.mapCanvas.addEventListener("mousedown", function (evt) {
								//start drag tracking
								},this);
								 */
								this.mapCanvas.addEventListener("mousedown", function (evt) {
									try {
										var cnv = _this.mapCanvas.getBoundingClientRect();
										var mouseX = evt.clientX - cnv.left;
										var mouseY = evt.clientY - cnv.top;
										var zf = _this.visOptions.settingsPanel.zoomFactor;
										//console.log("clientX:Y:" + evt.clientX + ":" + evt.clientY);
										//console.log("offsets:" + cnv.left + "," + cnv.top);
										//console.log("M:" + mouseX + "," + mouseY);

										var vm = ClientLib.Vis.VisMain.GetInstance();
										vm.CenterGridPosition(mouseX / zf, mouseY / zf);

										_this.scrollMapBox(true);

										setTimeout(function () {
											_this.updateMap();
										}, 500);
									} catch (err) {
										console.log(err);
									}
								}, false);

							}
							this.updateMap();
							this.scrollMapBox(false);
						} catch (err) {
							console.log("createMapCanvas error:");
							console.log(err);
						}
					},

					fixScrollBounds : function () {
						try {
							var cw = this.canvasWidth;
							var ch = this.canvasHeight;
							/*
							this.scrollWidget.setMinHeight(ch);
							this.scrollWidget.setMinWidth(cw);
							this.scrollWidget.setHeight(ch);
							this.scrollWidget.setWidth(cw);
							 */
							this.canvasElement.removeAll();
							this.canvasElement = new qx.html.Element("canvas", null, {
									id : "map",
									width : cw,
									height : ch
								});
							//this.mapCanvas = this.canvasElement.getDomElement();
							this.createMapCanvas();
							/*
							var ctx = this.mapCanvas.getContext('2d');
							ctx.clearRect(0, 0, canvas.width, canvas.height);
							ctx.canvas.height = ch;
							ctx.canvas.width = cw;
							 */
						} catch (e) {
							console.log("foooooooooooooook: ");
							console.log(e);
						}
					},

					scrollMapBox : function (preFrameFlag) {
						// ScrollTo
						try {
							var vm = ClientLib.Vis.VisMain.GetInstance();
							var zf = parseFloat(this.visOptions.settingsPanel.zoomFactor);

							var viewTopLeftX = vm.get_Region().get_PosX() / vm.get_Region().get_GridWidth() * zf;
							var viewTopLeftY = vm.get_Region().get_PosY() / vm.get_Region().get_GridHeight() * zf;
							var viewWidth = vm.get_Region().get_ViewWidth() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridWidth() * zf;
							var viewHeight = vm.get_Region().get_ViewHeight() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridHeight() * zf;

							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							var cx = ownCity.get_PosX();
							var cy = ownCity.get_PosY();
							//console.log("city: "+cx*zf+","+cy*zf);
							//console.log("view: "+viewTopLeftX+","+viewTopLeftY);
							//console.log("vh: "+viewHeight);
							//console.log("vw: "+viewWidth);

							var mb = this.mapBox.getBounds();
							this.scroll.setWidth(mb.width - 37);
							this.scroll.setHeight(mb.height - 70);
							var wd = Math.round((mb.width - 37) / 2);
							var ht = Math.round((mb.height - 70) / 2);
							this.visOptions.vpWidth = wd;
							this.visOptions.vpHeight = ht;
							//console.log("wd: "+wd);
							//console.log("ht: "+ht);

							var sx = this.scroll.getScrollX();
							var sy = this.scroll.getScrollY();
							var stx = Math.round((viewTopLeftX + (viewWidth / 2)) - wd);
							this.scroll.scrollToX(stx);
							var sty = Math.round((viewTopLeftY + (viewHeight / 2)) - ht);
							this.scroll.scrollToY(sty);

							if (this.visOptions.chk.showSectionFrame && preFrameFlag) {
								var ctx = this.mapCanvas.getContext('2d');
								ctx.strokeStyle = "rgba(255,0,0,0.5)";
								ctx.lineWidth = 1;
								ctx.strokeRect(viewTopLeftX, viewTopLeftY, viewWidth, viewHeight);
							}
						} catch (err) {
							console.log("scrollMapBox error:");
							console.log(err);
						}
					},

					makeLbl : function (name, r, c, tooltiptxt, color) {
						var lbl = this.swObj.labels["r"+r+"c"+c] = new qx.ui.basic.Label(name);
						lbl.setTextColor(color || "white");
						lbl.setToolTipText(tooltiptxt || "");
						lbl.setHeight(28);
						this.settingsWnd.add(lbl, {
							row : r,
							column : c
						});
					},

					makeTxt : function (option, r, c, color) {
						var value = this.visOptions.settingsPanel[option];
						var txtField = new qx.ui.form.TextField(String(value));
						txtField.setTextColor(color || "white");
						this.swObj.settingFields[option] = txtField;
						this.settingsWnd.add(txtField, {
							row : r,
							column : c
						});
					},

					makeCheckbox : function (option, r, c) {
						var o = this.swObj.chkBoxFields[option] = new qx.ui.form.CheckBox();
						o.setValue(this.visOptions.chk[option]);
						o.addListener("changeValue", function () {
							this.visOptions.chk[option] = o.getValue();
							this.saveOptions();
							this.updateMap();
						},this);
						this.settingsWnd.add(o, {
							row : r,
							column : c
						});
					},
							
					makeCoordsSelectionButton : function (option, row, col, text) {
						this.swObj.coordButtons[option] = new qx.ui.form.Button(text).set({
								appearance : "button-text-small",
								toolTipText : "Select a target or your own base on the map then click this to get the coords"
							});
						this.settingsWnd.add(this.swObj.coordButtons[option], {
							row : row,
							column : col
						});
						this.swObj.coordButtons[option].setWidth(30);
						this.swObj.coordButtons[option].addListener("click", function () {
							var x,
							y;
							var selObj = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
							//console.log(selObj);
							var notSelObj = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() || ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							//console.log(notSelObj);
							if (selObj != null) {
								x = selObj.get_RawX();
								y = selObj.get_RawY();
							} else if (notSelObj != null) {
								x = notSelObj.get_PosX();
								y = notSelObj.get_PosY();
							}
							var str = x + ":" + y;

							this.swObj.settingFields[option].setValue(str);
							this.saveOptions();
							this.updateMap();

						}, this);
					},

					updateMapDelayed : function () {
						var _this = this;
						setTimeout(function(){
							_this.updateMap();
						},1000);
					},
					
					updateMap : function () {
						this.drawingNow = true;
						var md = ClientLib.Data.MainData.GetInstance();
						var w = ClientLib.Data.MainData.GetInstance().get_World();
						var vm = ClientLib.Vis.VisMain.GetInstance(); //get_Region().get_ViewWidth()
						var rg = ClientLib.Vis.VisMain.GetInstance().get_Region(); // GetObjectFromPosition(oporcamp,coords).get_CampType()
						var canvas = this.mapCanvas;
						var ctx = canvas.getContext('2d');
						var zf = parseFloat(this.visOptions.settingsPanel.zoomFactor);
						var alliance = md.get_Alliance();
						var cx = 0;
						var cy = 0;
						var gw = rg.get_GridWidth();
						var gh = rg.get_GridHeight();
						var hilitePois = [];
						var sectors = this.getSectors(w);


						ctx.clearRect(0, 0, canvas.width, canvas.height);

						/* ERelationType
						// Ally Enemy NAP Neutral None
						// 1 3 2 4 0
						// ClientLib.Data.MainData.GetInstance().get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy).l
						 */
						this.relations.enemies = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy, true).l;
						this.relations.allies = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeAlly, true).l;
						this.relations.nap = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeNAP, true).l;

						this.relations.enemiesById = this.makeHash(this.relations.enemies, "OtherAllianceId");
						//console.log(this.relations.enemiesById);

						/* for (var i in this.relations.enemies){
						console.log(this.relations.enemies[i]);
						this.relations.enemies[i].Id;
						this.relations.enemies[i].OtherAllianceName;
						this.relations.enemies[i].OtherAllianceId;
						} */

						if (!this.swObj.obfAllianceId)
							this.swObj.obfAllianceId = this.getMemberNameByType(alliance, "number", 0);
						if (!this.swObj.obfAllianceName)
							this.swObj.obfAllianceName = this.getMemberNameByType(alliance, "string", 0);

						var allianceName = alliance[this.swObj.obfAllianceName];

						var sCount = 0;
						// Main Drawing Loop
						for (var i in sectors) {
							var s = sectors[i];
							sCount++;
							for (var x = 0; x < 32; x++) {
								for (var y = 0; y < 32; y++) {
									cx = s.ConvertToWorldX(x);
									cy = s.ConvertToWorldY(y);
									var wObj = w.GetObjectFromPosition(cx, cy);
									var rgObj = rg.GetObjectFromPosition(cx * gw, cy * gh);

									if (wObj != null) {
										switch (wObj.Type) {
										case 1: {
												// player city
												// console.log("sector id: "+s.get_Id());
												var player = s.GetPlayerId(wObj);
												var alliance = s.GetAlliance(player.Alliance);
												if (player)
													console.log("p" + player);
												if (alliance)
													console.log("a" + alliance);
												if (alliance != null && this.visOptions.selectedAllianceId == alliance) {
													// broken
													ctx.fillStyle = this.visOptions.settingsPanel.highlightColor; // color var used below for POI highlighting
													ctx.fillRect(cx * zf, cy * zf, zf, zf);
													/* } else if (this.relations.enemiesById[allianceId]) {
													//} else if (this.isEnemy(enemies, alliance, s)) {
													// broken
													console.log("Enemy found: ");
													console.log(wObj);
													ctx.fillStyle = this.visOptions.settingsPanel.enemyBaseColor;
													ctx.fillRect(cx * zf, cy * zf, zf, zf);
													 */
												} else {
													if (wObj.PlayerId && s.GetPlayerId(wObj).Id == md.get_Player().id) {
														ctx.fillStyle = this.visOptions.settingsPanel.ownBaseColor;
													} else {
														ctx.fillStyle = this.visOptions.settingsPanel.playerColor;
													}
													ctx.fillRect(cx * zf, cy * zf, zf, zf);
												}
												break;
											}
										case 2: {
												// forgotten base
												ctx.fillStyle = this.visOptions.settingsPanel.baseColor;
												ctx.fillRect(cx * zf, cy * zf, zf, zf);
												break;
											}
										case 3: {
												// Camp/Outpost
												// rgObj.get_VisObjectType() 15
												// CampType 2 / 3
												// current obf prop name GIVCUM
												// region might have a better solution

												ctx.fillStyle = (rgObj && rgObj.get_CampType && rgObj.get_CampType() == 3) ? this.visOptions.settingsPanel.outpostColor : this.visOptions.settingsPanel.campColor;
												ctx.fillRect(cx * zf, cy * zf, zf, zf);
												break;
											}
										case 4: {
												// POI or tunnel
												/*
												Type:ClientLib.Data.WorldSector.WorldObjectPointOfInterest
												System.Int32 Id
												ClientLib.Data.WorldSector.WorldObjectPointOfInterest.EPOIType POIType
												System.Int32 Level
												System.Int64 OwnerAllianceId
												System.String OwnerAllianceName
												System.Void .ctor (ClientLib.Data.WorldSector.ObjectType type ,ClientLib.Data.World world ,System.String details ,System.Int32 pos)
												wObj: {} -->
												wObj.Type: 4
												wObj.SequenceId: 6805
												wObj.BNDYIS: 39
												wObj.MYTWLL: 1
												wObj.ADKRPM: 8527
												wObj.YQTUPE: 123
												wObj.HIFKIQ: "Alliance Name"
												wObj.LSVKAD: {} -->
												 */

												//console.log("POI/Tunnel ("+cx+":"+cy+" POIType:"+wObj[this.getNameByIdx(wObj,3)]+"):\n"+this.dump(wObj,"wObj",1,true));

												if (!this.obfPOIType) {
													this.obfPOIType = this.getNameByIdx(wObj, 3);
												}
												if (!this.obfWorldObjectPointOfInterestAllianceName) {
													this.obfWorldObjectPointOfInterestAllianceName = this.getMemberNameByType(wObj, "string", 0);
												}
												if (!this.obfWorldObjPOIAllyId) {
													this.obfWorldObjPOIAllyId = this.getNameByIdx(wObj, 5);
												}

												if (wObj[this.obfPOIType] == 0) {
													// Tunnel
													ctx.fillStyle = this.visOptions.settingsPanel.tunnelColor;
												} else {
													// POI
													ctx.fillStyle = this.visOptions.settingsPanel.poiColor;

													// if not checked
													if (!this.visOptions.chk.showAlliancePois) {
														if (this.visOptions.poi == -2) {
															// Selected POI = << All >>
															hilitePois.push([cx, cy]);
														} else if (this.visOptions.poi && this.visOptions.poi == wObj[this.obfPOIType]) {
															// for some reasons, the constants in ClientLib are off by 1 [offset corrected]
															hilitePois.push([cx, cy]);
														}
														// if checked & current POI is from selected Alliance
													} else if (wObj[this.obfWorldObjPOIAllyId] == this.visOptions.selectedAllianceId) {
														// if a poi type is selected & current POI is selected type
														if (this.visOptions.poi >= 0 && this.visOptions.poi == wObj[this.obfPOIType]) {
															// Selected Alliance POI
															hilitePois.push([cx, cy]);
															//if show all POIs selected
														} else if (this.visOptions.poi == -2) {
															// Selected POI = << All >>
															hilitePois.push([cx, cy]);
														} else {
															console.log("perhaps visOptions.poi is empty?!");
														}
													}

												}
												ctx.fillRect(cx * zf, cy * zf, zf, zf);
												break;
											}
										}
									} else {
										var terr = w.GetTerritoryTypeByCoordinates(cx, cy);

										/* ClientLib.Data.ETerritoryType
										// 0 1 2 3 4 5
										// Own, Alliance, Neutral, Enemy, SpawnZone, Restricted */
										switch (terr) {
										case 0 /* ClientLib.Data.ETerritoryType.Own */
											:
											{
												ctx.fillStyle = this.visOptions.settingsPanel.ownBaseColor;
												ctx.fillRect(cx * zf, cy * zf, zf, zf);
												break;
											}
										case 1 /* ClientLib.Data.ETerritoryType.Alliance */
											:
											{
												ctx.fillStyle = this.visOptions.settingsPanel.allianceTerrainColor;
												ctx.fillRect(cx * zf, cy * zf, zf, zf);
												break;
											}
										case 2 /* ClientLib.Data.ETerritoryType.Neutral */
											:
											{
												ctx.fillStyle = "rgba(128,128,128,0.1)";
												ctx.fillRect(cx * zf, cy * zf, zf, zf);
												break;
											}
										case 3 /* ClientLib.Data.ETerritoryType.Enemy */
											:
											{
												if (w.GetOwner(cx, cy) != 1610612736) { // lol
													ctx.fillStyle = "rgba(255,128,0,0.1)";
													ctx.fillRect(cx * zf, cy * zf, zf, zf);
												}
												break;
											}
											/*
											case ClientLib.Data.ETerritoryType.SpawnZone: { // 4
											ctx.fillStyle = "rgba(255,255,0,0.5)";
											ctx.fillRect(cx * zf, cy * zf, zf, zf);
											break;
											}
											case ClientLib.Data.ETerritoryType.Restricted: { // 5
											ctx.fillStyle = "rgba(255,0,255,0.5)";
											ctx.fillRect(cx * zf, cy * zf, zf, zf);
											break;
											}
											 */
										}
									}

									if (rgObj != null) {
										switch (rgObj.get_VisObjectType()) {
											/* ClientLib.Vis.VisObject.EObjectType.RegionCityType
											// ClientLib.Vis.VisObject.EObjectType.RegionNPCBase
											// ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp
											// ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest */
										case 4: { // player
												if (rgObj.get_Type() == 2) {
													var allianceId = rgObj.get_AllianceId();
													//console.log(allianceId);
													if (this.relations.enemiesById[allianceId] != null) {
														//console.log("Enemy found: ");
														//console.log(rgObj);
														//save coords and draw later
														if (!this.relations.enemyCoords[cx]) {
															this.relations.enemyCoords[cx] = [];
														}
														this.relations.enemyCoords[cx][cy] = 1;
													}
													//var playerId = rgObj.get_PlayerId();
													//var playerName = rgObj.get_PlayerName();
												} else if (rgObj.get_Type() == 0) { //self
													//if (rgObj.IsOwnBase()) {
												}
												break;
											}
										case 16: { //POI
												if (rgObj.get_Type() == 0) {
													//Tunnel
												}
												//var ownerId = rgObj.get_OwnerAllianceId(); // returns 0 if owner has no alliance
												//var ownerName = rgObj.get_OwnerAllianceName(); // returns "" if owner has no alliance
												break;
											}
										}
									}
								}
							}
						}

						//console.log("Sector objects scanned: " + sCount);
						// paint enemies
						if (this.visOptions.showEnemies) {
							for (cx in this.relations.enemyCoords) {
								for (cy in this.relations.enemyCoords[cx]) {
									ctx.fillStyle = this.visOptions.settingsPanel.enemyBaseColor;
									ctx.fillRect(cx * zf, cy * zf, zf, zf);

									if (this.visOptions.showEnemyRange) {
										ctx.beginPath();
										ctx.arc(cx * zf, cy * zf, zf * 20, 0 * Math.PI, 2 * Math.PI);
										ctx.fillStyle = "rgba(255,0,0,0.02)";
										//ctx.fillStyle = "rgba(255,0,0,0.01)";
										ctx.fill();
									}
								}
							}
						}
						// paint home bases
						if (this.visOptions.chk.showOwnCities) {
							var ownCities = md.get_Cities().get_AllCities().d;
							for (var i in ownCities) {
								var city = ownCities[i];
								var x = city.get_PosX() * zf;
								var y = city.get_PosY() * zf;

								ctx.strokeStyle = this.visOptions.settingsPanel.ownBaseColor;

								ctx.beginPath();
								ctx.arc(x + zf / 2, y + zf / 2, zf * 20, 0 * Math.PI, 2 * Math.PI);
								ctx.stroke();

								ctx.strokeStyle = "rgba(128,128,128,0.2)";
								ctx.beginPath();
								ctx.arc(x + zf / 2, y + zf / 2, zf * 40, 0 * Math.PI, 2 * Math.PI);
								ctx.stroke();

							}
						}

						// paint hilited pois
						ctx.strokeStyle = this.visOptions.settingsPanel.highlightColor; //"rgba(200,255,200,1)";
						ctx.lineWidth = 1;

						hilitePois.forEach(function (poi) {
							ctx.lineWidth = 1;
							ctx.strokeRect(poi[0] * zf - 2, poi[1] * zf - 2, zf + 4, zf + 4);
						});

						// Section Frame
						var topX = Math.floor(vm.get_Region().get_PosX() / vm.get_Region().get_GridWidth());
						var topY = Math.floor(vm.get_Region().get_PosY() / vm.get_Region().get_GridHeight());
						var width = vm.get_Region().get_ViewWidth() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridWidth();
						var height = vm.get_Region().get_ViewHeight() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridHeight();
						//var zfh = Math.round(0.5 * this.visOptions.settingsPanel.zoomFactor);
						var zfh = zf / 2;
						ctx.strokeStyle = "rgba(0,255,0,0.5)";
						ctx.lineWidth = 1;
						//console.log("Selection:" + topX + "," + topY + "w:" + width + "," + height);

						/* broken
						this.init_mapMouse();
						 */

						if (this.visOptions.chk.showSectionFrame) {
							ctx.strokeRect(topX * zf, topY * zf, width * zf, height * zf);
							ctx.fillStyle = "rgba(128,128,128,0.2)";
							ctx.fillRect(topX * zf, topY * zf, width * zf, height * zf);
						}

						//Draw Border line 1
						if (this.visOptions.chk.showBorderLine1) {
							var a = this.visOptions.settingsPanel.line1start.split(":");
							var b = this.visOptions.settingsPanel.line1end.split(":");
							ctx.strokeStyle = this.visOptions.settingsPanel.line1color;
							ctx.lineWidth = zfh;
							ctx.beginPath();
							ctx.moveTo(a[0] * zf + zfh, a[1] * zf + zfh);
							ctx.lineTo(b[0] * zf + zfh, b[1] * zf + zfh);
							ctx.stroke();
							ctx.lineWidth = 1;
						}

						//Draw Border line 2
						if (this.visOptions.chk.showBorderLine2) {
							var a = this.visOptions.settingsPanel.line2start.split(":");
							var b = this.visOptions.settingsPanel.line2end.split(":");
							ctx.strokeStyle = this.visOptions.settingsPanel.line2color;
							ctx.lineWidth = zfh;
							ctx.beginPath();
							ctx.moveTo(a[0] * zf + zfh, a[1] * zf + zfh);
							ctx.lineTo(b[0] * zf + zfh, b[1] * zf + zfh);
							ctx.stroke();
							ctx.lineWidth = 1;
						}

						this.drawingNow = false;
					},

					getSectors : function (w) { // work around  obfuscated variable names
						if (this.swObj.obfSectorName == null) {
							// auto-detect sector name
							Outer :
							for (i in w) {
								if (w[i].d) {
									var maybeSector = w[i].d;
									for (j in maybeSector) {
										if (maybeSector[j].ConvertToWorldX) {
											this.swObj.obfSectorName = i;
											//console.log("Sector field:" + i);
											break Outer;
										}
										break;
									}
								}
							}
						}
						if (this.swObj.obfSectorName == null)
							console.log("ERROR: getSectors(): obfuscated property not found!");
						if (this.swObj.obfSectorName != null)
							return w[this.swObj.obfSectorName].d;

						/* if (w.KIH) { // old june version
						return w.KIH.d;
						} else if (w.RBJXOL) { // july
						return w.RBJXOL.d;
						} else if (w.IWEESP) {
						return w.IWEESP.d; // closed beta 2 world
						} else if (w.HYMYNV) { // mid july release
						return w.HYMYNV.d;
						} else if (w.ONQEIH) { // july 18th
						return w.ONQEIH.d;
						}
						 */
					},

					getAlliances : function (sector) { // work around  obfuscated variable names. sector == current sector
						try {
							if (typeof(sector) == "undefinied" || sector === null) {
								console.log("ERROR: getAlliances(sector): sector is not defined!");
								return null;
							}
							if (this.swObj.obfAllianceList == null) {
								// find alliance list dynamically

								Outer :
								for (i in sector) {
									if (sector[i].d) {
										var maybeAllianceList = sector[i].d;
										for (j in maybeAllianceList) {
											var maybeAlliance = maybeAllianceList[j];
											var propnames = [];
											for (p in maybeAlliance)
												propnames.push(p);
											var stringpropcount = 0;
											var stringpropname = null;
											if (propnames.length == 13) {
												for (k = 0; k < propnames.length; k++) {
													if (typeof(maybeAlliance[propnames[k]]) == "string") {
														stringpropname = propnames[k];
														stringpropcount++;
													}
												}
												if (stringpropcount == 1) {
													this.swObj.obfAllianceId = propnames[1]; //assuming this is allways the case :-)
													this.swObj.obfAllianceName = stringpropname;
													this.swObj.obfAllianceList = i;
													//console.log("Alliances field:" + i);
													break Outer;
												}
											}
											break; // test only the first member
										}
									}
								}

							}
							if (this.swObj.obfAllianceList == null) {
								console.log("ERROR: getAlliances(): obfuscated member not found!");
								return null;
							} else
								return sector[this.swObj.obfAllianceList].d;
							/*
							if (sector.WGH) {// june
							return sector.WGH.d;
							} else if (sector.QEKQND) {//july
							return sector.QEKQND.d;
							} else if (sector.GGUPEV){  // closed beta 2 world
							return sector.GGUPEV.d;
							} else if(sector.UFVPYE) {
							return sector.UFVPYE.d; // July 11, 2012
							} else if(sector.UEQLAO) {
							return sector.UEQLAO.d; // July 18th
							} */
						} catch (err) {
							console.log("getAlliances error:");
							console.log(err);
						}
					},

					makeHash : function (obj, unique) { //original key is written to the property hashKey
						if (obj != null) {
							try {
								var temp = [];
								for (var key in obj) {
									var val = obj[key];
									//console.log(val);
									if (!temp[val[unique]]) {
										temp[val[unique]] = [];
										for (var key2 in obj[key]) {
											if (key2 != unique) {
												temp[val[unique]][key2] = obj[key][key2];
											} else {
												temp[val[unique]]["hashKey"] = key;
											}
										}
									} else {
										console.log("makeHash duplicate entry detected");
									}

								}
								//console.log(temp);
								return temp;
							} catch (err) {
								console.log("makeHash error: ");
								console.log(err);
							}
						} else {
							return false;
						}
					},

					isEnemy : function (enemies, alliance, sector) {
						if (alliance == null)
							return false;
						var enemy = enemies.l.filter(function (ele) {
								return ele.OtherAllianceId == alliance.Id;
							});
						console.log(enemy);
						return enemy.length > 0;
					},

					listAllAlliances : function () {
						var alliances = [];
						var w = ClientLib.Data.MainData.GetInstance().get_World();
						if (!w)
							console.log("ERROR: get_World() failed!");
						var sectors = this.getSectors(w);
						if (!sectors)
							console.log("ERROR: getSectors() failed!");
						for (var i in sectors) { // m_sectors
							var s = sectors[i];
							var all = this.getAlliances(s);
							if (!all)
								console.log("ERROR: getAlliances() failed!");
							for (var j in all) { // m_alliances
								var a = all[j];
								alliances.push({
									id : a[this.swObj.obfAllianceId],
									name : a[this.swObj.obfAllianceName]
								});
							}
						}
						alliances.sort(function (s1, s2) {
							var name1 = s1.name.toLowerCase();
							var name2 = s2.name.toLowerCase();
							if (name1 < name2)
								return -1;
							if (name1 > name2)
								return 1;
							return 0;
						});
						var allianceMap = {};
						alliances.forEach(function (it) {
							allianceMap[it.id] = it;
						});
						return allianceMap;
					},

					populateAllianceSelect : function () {
						console.log("updating Filter");
						var md = ClientLib.Data.MainData.GetInstance();

						this.swObj.allianceSelect.removeAll();

						this.swObj.allianceListItem["-1"] = new qx.ui.form.ListItem("<< None >>", null, -1);
						this.swObj.allianceSelect.add(this.swObj.allianceListItem["-1"]);

						var alliances = this.listAllAlliances(); // expensive operation
						for (i in alliances) {
							var a = alliances[i];
							this.swObj.allianceListItem[a.id] = new qx.ui.form.ListItem(a.name, null, a.id);
							if (a.id == this.visOptions.selectedAllianceId) {
								selectedItem = tempItem;
							}
							this.swObj.allianceSelect.add(this.swObj.allianceListItem[a.id]);
						}
						if (this.visOptions.selectedAllianceId != -1) {
							this.swObj.allianceSelect.setSelection([selectedItem]);
						}
						//this.swObj.allianceSelect.setEnabled(true);
						if (this.visOptions.selectedAllianceId != -1) {
							this.swObj.chkBoxFields.showAlliancePois.setEnabled(true);
						}
						//console.log([selectedItem]);
						this.alliancesAreLoaded = true;
					},

					findAllianceById : function (s, id) {
						var ra = null;
						if (id != 0) {
							for (var x = 1; s.GetAlliance(x) != null; x++) {
								var a = s.GetAlliance(x);
								if (a.FGTNFZ == id) {
									ra = a;
								}
							}
						}
						return ra;
					},

					getMousePos : function (canvas, evt) {
						// get canvas position
						var cnv = canvas;
						var top = 0;
						var left = 0;
						while (cnv && cnv.tagName != 'BODY') {
							top += cnv.offsetTop;
							left += cnv.offsetLeft;
							cnv = cnv.offsetParent;
						}

						// return relative mouse position
						var mouseX = evt.clientX - left + window.pageXOffset;
						var mouseY = evt.clientY - top + window.pageYOffset;
						return {
							x : mouseX,
							y : mouseY
						};
					},

					saveOptions : function () {
						for (var option in this.visOptions.settingsPanel) {
							if (this.swObj.settingFields[option]) {
								this.visOptions.settingsPanel[option] = this.swObj.settingFields[option].getValue();
							} else {
								console.log(option + " : settingFields does not exist. (applyOptions)")
							}
						}
						if (localStorage) {
							var str = JSON.stringify(this.visOptions);
							localStorage.setItem("TAMapStorage", str);
						}
					},

					toggleMap : function () {

						if (this.mapBox.isVisible()) {
							this.visOptions.mapBoxBounds = this.mapBox.getBounds();
							this.saveOptions();
							this.mapBox.close();
						} else {
							this.mapBox.open();
						}
						/*
						//this.mapBox.open();
						//var debugOutput = "";
						//var sector = mainData.get_World().GetWorldSectorByCoords(current_city.get_PosX(), current_city.get_PosY());
						//for (i in sector.m_Objects.d) {
						//	debugOutput += JSON.stringify(sector.m_Objects.d[i]) + "<br>";
						//}
						//console.log(debugOutput);
						// this.canvasElement.setValue(debugOutput);
						//var canvas = this.canvasElement.getDomElement();
						//console.log("Canvas:" + canvas);
						//var ctx = canvas.getContext('2d');
						//console.log(ctx);
						//ctx.fillStyle = "rgb(200,0,0)";
						//ctx.fillRect (10, 10, 55, 50);
						 */
					},

					getNameByIdx : function (object, idx) {
						var i = 0;
						for (var n in object) {
							if (i == idx)
								return n;
							i++;
						}
						return null;
					},

					getMemberNameByType : function (object, type, idx) {
						var i = 0;
						for (var n in object) {
							var valueType = typeof(object[n]);
							//console.log(n+" "+valueType);
							if (type == valueType) {
								if (i == idx)
									return n;
								i++;
							}
						}
						return null;
					},

					dump : function (object, rootName, deep, includeFunction) {
						//console.log("dump "+rootName);
						var dumpInternal = function (obj, path) {
							//console.log("DEBUG: dumpInternal(obj, "+path+") ind:"+ind+", deep:"+deep+", output.length:"+s.length);
							if (obj === null) {
								s += "" + path + ": {null}" + "\n";
								return;
							} else if (obj === undefined) {
								s += "" + path + ": {undefined}" + "\n";
								return;
							}
							var valueType = typeof(obj);
							switch (valueType) {
							case "function":
								return;
								// try{var fr=obj();}catch(ex){var  fr=ex;}
								// s+= "" + path +": "+ "{function} returns: "+fr + "\n";return;
							case "object":
								s += "" + path + ": {} -->" /*+ propValue.toString().substr(0,20)*/
								 + "\n";
								break;
							case "boolean":
								s += "" + path + ": " + obj.toString() + "\n";
								return;
							case "number":
								s += "" + path + ": " + obj.toString() + "\n";
								return;
							case "string":
								s += "" + path + ": \"" + obj.toString() + "\"\n";
								return;
							default:
								s += "" + path + " (" + valueType + "): " + obj.toString() + "\n";
								return;
							}

							for (var o in objs) {
								if (o === obj) {
									s += "{!Recursion stoped!}\n";
									return;
								} else
									objs.push(obj);
							}
							var members = [];
							for (var p in obj)
								members.push(p);
							if (members.length > 1000) {
								console.log("WARNING: dump() Too much members! " + members.length);
								return;
							} //TODO
							if (deep > 0 && ind >= deep)
								return;
							if (/.GHPRYH$/.test())
								return; //TODO
							if (path.length > 30) {
								console.log("WARNING: dump() Path too long!");
								return;
							} //TODO
							ind++;
							for (var propName in obj) {
								dumpInternal(obj[propName], path + "." + propName);
							}
							ind--;
						}
						var objs = [];
						var ind = 0;
						var s = "";
						if (typeof(rootName) == 'undefined')
							rootName = "*";
						if (typeof(deep) == 'undefined')
							deep = 1;
						if (typeof(includeFunction) == 'undefined')
							includeFunction = false;
						try {
							dumpInternal(object, rootName);
						} catch (ex) {
							console.log("ERROR: dump() > " + ex);
						}
						return s;
					}
				}
			});

		}

		function TAMap_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined') {
					var a = qx.core.Init.getApplication();
					// application
					var mb = qx.core.Init.getApplication().getMenuBar();
					if (a && mb) {
						createMapTweak();
						window.TAMap.getInstance().initialize();
					} else
						window.setTimeout(TAMap_checkIfLoaded, 1000);
				} else {
					window.setTimeout(TAMap_checkIfLoaded, 1000);
				}
			} catch (err) {
				if (typeof console != 'undefined')
					console.log(err);
				else if (window.opera)
					opera.postError(err);
				else
					GM_log(err);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(TAMap_checkIfLoaded, 1000);
		}
	}
	// injecting, because there seem to be problems when creating game interface with unsafeWindow
	var TAMapScript = document.createElement("script");
	var txt = TAMap_mainFunction.toString();
	TAMapScript.innerHTML = "(" + txt + ")();";
	TAMapScript.type = "text/javascript";
	if (/commandandconquer\.com/i.test(document.domain)) {
		document.getElementsByTagName("head")[0].appendChild(TAMapScript);
	}

})();
