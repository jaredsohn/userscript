// ==UserScript==
// @name           LoU Suite | 76s Edit | SmileyGirl Edit  | LGG Fix
// @description    Various Helpers for Lord Of Ultima
// @namespace      chiron76
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.1.2
// @require        http://sizzlemctwizzle.com/updater.php?id=149073
// ==/UserScript==

/**
 * http://refresh-sf.com/yui/
 */

(function(){

	var LS_mainFunction = function() {

		function createSuite() {
			var louSuite = {};
			var LT = {};

			qx.Class.define("louSuite.main", {
				type: "singleton",
				extend: qx.core.Object,
				members: {
					_player: null,
					app: null,
					srvBar: null,
					bosses: null,
					dungeons: null,
					city: null,
					cities: null,
					cityId: null,
					boss_raider: null,
					dungeon_raider: null,
					LS_RAID: 8,
					LS_RAID_REPEAT: 1,
					LS_RAID_ONCE: 0,
					options: null,
					optionsPage: null,
					initialize: function() {
						this.app = qx.core.Init.getApplication();
						this.cities = {};
						this.bosses = {};
						this.dungeons = {};
						var t_c = webfrontend.data.Player.getInstance().cities;

						for (var cityId in t_c) {
							var c = t_c[cityId];

							var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
							this.bosses['c' + cont] = {};
							this.dungeons['c' + cont] = {};
						}

						this._player = webfrontend.data.Player.getInstance().getId();

						this.srvBar = this.app.serverBar;

						this.startScript();
					},
					startScript: function() {
						//_LT = LT;
						this.loadOptions();
						LT.options = this.options;
						LT.srvTime = webfrontend.data.ServerTime.getInstance().refTime; // reference time (server start date in milisec?)
						LT.debug = this.debug;
						LT.a = this.app;
						LT.main = this;
						LT.player = webfrontend.data.Player.getInstance();
						LT.curr_city = webfrontend.data.City.getInstance();
						this.scanAllCities();

						// ***** Options button ***** //
						btn = new qx.ui.form.Button("S");
						btn.set({width: 30, appearance: "button-text-small", toolTipText: "LoU Suite Settings"});
						btn.addListener("click", this.showOptionsPage, this);
						this.srvBar.add(btn, {top: 2, left: 450});

						// ***** Listeners ***** //
						this.optionsPage = new window.louSuite.optionsPage();
					},
					sendTroops: function (order_type, city_id, x, y, units, repeat, callbackFunc) {
						var updateManager = webfrontend.net.UpdateManager.getInstance();
						var data = {
							session: updateManager.getInstanceGuid(),
							cityid: city_id,
							units: units,
							targetPlayer: "",
							targetCity: x + ':' + y,
							order: order_type,
							transport: 1,
							createCity: "",
							timeReferenceType: 1,
							referenceTimeUTCMillis: 0,
							raidTimeReferenceType: repeat, // Repeat raid or not
							raidReferenceTimeUTCMillis: 0,
							iUnitOrderOptions: 0,
						};

						var req = new qx.io.remote.Request(updateManager.getUpdateService() + "/Service.svc/ajaxEndpoint/OrderUnits", "POST", "application/json");
						req.setProhibitCaching(false);
						req.setRequestHeader("Content-Type", "application/json");
						req.setData(qx.lang.Json.stringify(data));
						req.setTimeout(10000);
						req.addListener("completed", function(e) {
							callbackFunc(e, {cid: city_id, x: x, y: y, units: units});
						}, this);
						req.send();
					},
					moveToContRegion: function (cont, q) {
						var c = 0;
						for (var x = 1; x < 4; x++) {
							for (var y = 1; y < 4; y++) {
								c += 1;
								if (c == q) {
									var xm = x/4;
									var ym = y/4;
									var col = Math.floor(cont % 10);
									var row = Math.floor(cont / 10);
									var srv = webfrontend.data.Server.getInstance();
									var height = srv.getContinentHeight();
									var width = srv.getContinentWidth();
									var x = Math.floor(col * width + 0.5 * width);
									var y = Math.floor(row * height + 0.5 * height);

									LT.a.setMainView('r', 0, x * LT.a.visMain.getTileWidth(), y * LT.a.visMain.getTileHeight());
								}
							}
						}
					},
					scanRegion: function () {
						if (LT.a.visMain.mapmode == "r") {
							p = webfrontend.data.Player.getInstance().getName();

							clib = ClientLib.Vis.VisMain.GetInstance();
							region_object = clib.get_Region();
							if (region_object == null || region_object == undefined) return;
							for (var o in region_object) {
								if (region_object[o] != null && region_object[o].hasOwnProperty("d"))
									data_object = region_object[o];
							}
							if (data_object == null || data_object == undefined) return;
							d_object = data_object.d;
							if (d_object == null || d_object == undefined) return;
							for (var n in d_object) {
								data_table = null;
								// this is just way too much, but couldn't find better solution to get obfuscated and version changing variables
								try {
									for (var dob in d_object[n]) {
										if (d_object[n][dob] instanceof Array && d_object[n][dob].length == 32) {
											for (e=0; e<d_object[n][dob].length; e++) {
												r = d_object[n][dob][e];
												if (r == null && typeof r == "object") {
													data_table = d_object[n][dob];
													break;
												} else {
													for (f=0; f<r.length; f++) {
														if (r[f] == null && typeof r[f] == "object") {
															data_table = d_object[n][dob];
															break;
														}
													}
												}
											}
										}
										if (data_table != null) break;
									}
								} catch (e) {

								}
								//data_table = d_object[n].SIB;
								if (data_table == null || data_table == undefined) continue;
								for (q=0; q<data_table.length; q++) {
									row = data_table[q];
									for (w=0; w<row.length; w++) {
										if (row[w] != null) {
											crd = row[w].get_Coordinates();
											posX = crd & 0xFFFF;
											posY = crd >> 16;
											uit = row[w].get_UIType();
											//console.log("(" + posX + ":" + posY +"), " + uit);
											// uit - City / LawlessCity / Shrine / Dungeon / Boss / FreeSlot / null (moongate)
											if (uit == "Boss") {
												// Determine what kind of boss we have, and what level
												var b_type = null;
												var b_level = null;
												for (var fg in row[w]) {
													if (row[w][fg] != null && row[w][fg].hasOwnProperty("BossLevel")) {
														b_type = row[w][fg]['BossType'];
														b_level = row[w][fg]['BossLevel'];
														b_state = row[w][fg]['State'];
													}
												}
												switch (b_type) {
													case 6:
														b_name = "Dragon";
														break;
													case 7:
														b_name = "Moloch";
														break;
													case 8:
														b_name = "Hydra";
														break;
													case 5:
														b_name = "Octopus";
														break;
													default:
														b_name = "Boss";
														break;
												}
												//console.log("(" + posX + ":" + posY + ") - " + b_name + " Level " + b_level + " State: " + b_state);
												//console.log(row[w]);
												var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(posX, posY);
												try {
													this.bosses['c' + cont][posX + "-" + posY] = {
														'type': b_name,
														'level': b_level,
														'x': posX,
														'y': posY,
														'state': b_state,
														't': b_type
													};
												}
												catch (e) {
													// The boss was from a different continent. Oh well
												}
											}
											if (uit == "Dungeon") {
												//console.log("Dungeon found ")    ;
												//console.log(row[w]);
												// Determine what kind of dungeon we have, and what level
												var d_type = null;
												var d_level = null;
												var d_state = null;
												var d_progress = null;
												for (var fg in row[w]) {
													if (row[w][fg] != null && row[w][fg].hasOwnProperty("DungeonLevel")) {
														d_type = row[w][fg]['DungeonType'];
														d_level = row[w][fg]['DungeonLevel'];
														d_state = row[w][fg]['State'];
														d_progress = row[w][fg]['Progress'];
													}
												}
												switch (d_type) {
													case 4:
														d_name = "Mountain";
														break;
													case 3:
														d_name = "Hill";
														break;
													case 5:
														d_name = "Forest";
														break;
													default:
														d_name = "Unknown Dungeon";
														break;
												}
												var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(posX, posY);
												try {
													this.dungeons['c' + cont][posX + "-" + posY] = {
														'type': d_name,
														'level': d_level,
														'x': posX,
														'y': posY,
														'progress': d_progress,
														'state': d_state,
														't': d_type
													};
												}
												catch (e) {

												}
											}
										}
									}
								}
							}
						}
					},
					scanAllCities: function() {
						var storage = bos.Storage.getInstance();
						for (var cid in LT.player.cities) {
							var city = storage.loadCity(cid);
							this.cities[cid] = city;
						}
					},
					getAllCityUnits: function() {
						for (var cid in LT.player.cities) {
							this.getCityUnits(cid);
						}
					},
					getCityUnits: function(id) {
						var city = this.cities[id];
						var c_info = LT.player.cities[id];
						c_name = c_info['name'];
						var units = {};
						if (city != null) {
							for (var uid in city['units']) {
								u_name = this.getUnitName(uid);
								u_count = city['units'][uid]['count'];
								u_speed = city['units'][uid]['speed'];
								u_total = city['units'][uid]['total'];
								//console.log(c_name + " : " + u_count + "/" + u_total + " " + u_name + " available.");
								units[uid] = {
									count: u_count,
									name: u_name,
									total: u_total
								};
							}
						}

						return units;
					},
					getUnitName: function(id) {
						switch(id){
							case '1':
								return "City Guard";
							case '2':
								return "Ballista";
							case '3':
								return "Ranger";
							case '4':
								return "Guardian";
							case '5':
								return "Templar";
							case '6':
								return "Berserker";
							case '7':
								return "Mage";
							case '8':
								return "Scout";
							case '9':
								return "Crossbow";
							case '10':
								return "Paladin";
							case '11':
								return "Knight";
							case '12':
								return "Warlock";
							case '13':
								return "Ram";
							case '14':
								return "Catapult";
							case '15':
								return "Frigate";
							case '16':
								return "Sloop";
							case '17':
								return "Galleon";
							case '19':
								return "Baron";
							default:
								return id;
						}
					},
					setMessage: function (message) {
						var dialog = new webfrontend.gui.ConfirmationWidget();
						dialog.showGenericNotice("Error", message, message, "webfrontend/ui/bgr_popup_survey.gif");

						qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
						dialog.show();
					},
					showOptionsPage: function() {
						this.app.switchOverlay(this.optionsPage);
					},
					loadOptions: function() {
						forceSave = false;
						_str = localStorage.getItem("LT_options");
						if (_str)
							this.options = qx.lang.Json.parse(_str);
						else {
							this.options = {
								"lowestLevelMax": [10,10,10,10,10,10]
							};
						}

						this.app.setUserData("LT_options", this.options);
						if (forceSave) {
							str = qx.lang.Json.stringify(this.options);
							localStorage.setItem("LT_options", str);
						}
					},
					debug: function(s) {
						if (typeof console != 'undefined') console.log(s);
						else if (window.opera) opera.postError(s);
						else GM_log(s);
					}
				}
			});
			qx.Class.define("louSuite.optionsPage", {
				extend: webfrontend.gui.OverlayWidget,
				construct: function() {
					webfrontend.gui.OverlayWidget.call(this);
					this.clientArea.setLayout(new qx.ui.layout.Canvas());
					this.setTitle("LoU Suite | 76s Edit");
					this.tabView = new qx.ui.tabview.TabView().set({contentPaddingLeft: 15, contentPaddingRight: 10, contentPaddingTop: 10, contentPaddingBottom: 10});
					this.tabView.add(new lou_suite.gui.BossRaider());
					this.tabView.add(new lou_suite.gui.DungeonRaider());

					this.clientArea.add(this.tabView, {top: 0, right: 3, bottom: 30, left: 3});
				},
				members: {
					tabView: null,
					tabPages: null,
					clrSel: null,
					saveOptions: function() {
						str = qx.lang.Json.stringify(LT.options);
						localStorage.setItem("LT_options", str);
						LT.a.switchOverlay(null);
					},
				}
			});
			qx.Class.define("lou_suite.gui.DungeonRaider", {
				extend: bos.gui.SummaryPage,
				construct: function() {
					var lou_suite = window.louSuite.main.getInstance();
					lou_suite.dungeon_raider = this;
					bos.gui.SummaryPage.call(this);
					this.setLabel("Dungeon Raider");
					this.setLayout(new qx.ui.layout.VBox(10));
					this.add(this._createToolBar());
					this._tableModel = new qx.ui.table.model.Simple();
					var columnNames = [ "Id", "Row Info", "Type", "Level", "Pos", "Progress", "Name", "Distance", "Units"];
					var columnIds = ["id", "row_info", "dungeon_type", "dungeon_level", "position", "dungeon_progress", "name", "distance", "units"];

					this._tableModel.setColumns(columnNames, columnIds);

					this._setupSorting(this._tableModel);
					this._tableModel.sortByColumn(7, true);

					var custom = {
						tableColumnModel : function(obj) {
							return new qx.ui.table.columnmodel.Resize(obj);
						}
					};

					this.table = new bos.ui.table.Table(this._tableModel, custom);
					this.table.addListener("cellClick", this._handleCellClick, this);

					var columnModel = this.table.getTableColumnModel();

					columnModel.setColumnVisible(0, false);
					columnModel.setColumnVisible(1, false);
					columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
					columnModel.setDataCellRenderer(8, new bos.ui.table.cellrenderer.ClickableLook());

					var tcm = this.table.getTableColumnModel();
					var resizeBehavior = tcm.getBehavior();
					resizeBehavior.setWidth(2, 60);
					resizeBehavior.setWidth(3, 20);
					resizeBehavior.setWidth(4, 50);
					resizeBehavior.setWidth(5, 30);
					resizeBehavior.setWidth(6, 70);
					resizeBehavior.setWidth(7, 50);
					resizeBehavior.setWidth(8, "1*");
					resizeBehavior.setMinWidth(8, 100);

					this.add(this.table, {flex: 1});
				},
				members: {
					sbContinents: null,
					btnUpdateView: null,
					sbLevel: null,
					classicView: function() {
						this.btnUpdateView.setEnabled(LT.a.visMain.mapmode == "r");

						var rowData = [];
						var lou_suite = window.louSuite.main.getInstance();
						var selectedContinent = this.sbContinents.getSelection()[0].getModel();
						var min_level = this.sbLevel.getSelection()[0].getModel();

						// Refresh the city list to get new troop counts
						lou_suite.scanAllCities();
						    // console.log("1");
						// First get all the dungeons in the area for the continent we are working with
						var dungeons = lou_suite.dungeons;
						for (var d_key in dungeons['c' + selectedContinent]) {
							var dungeon = dungeons['c' + selectedContinent][d_key];
							if (dungeon['state'] && (dungeon['level'] >= min_level)) {
								// Then get all the cities on that continent that can hit it
								for (var cityId in LT.player.cities) {
									c = LT.player.cities[cityId];

									//console.log("2"+c);
									if (c == null) {
										continue;
									}

									var city_cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);

									//console.log("3"+city_cont);
									// Check that the city is on the right continent
									if (city_cont != selectedContinent) {
										continue;
									}

									var city = lou_suite.cities[cityId];

									//console.log("4");
									//console.log(city);
									if (city == undefined) {
										continue;
									}

									// Check that the city has enough troops
									if (city.getUnitCount() == 0) {
										continue;
									}

									var units = lou_suite.getCityUnits(cityId);
									// Check that there are enough units to send for this dungeon	jwimps76
									var units_to_send = this.getTroopsNeeded(dungeon['type'], dungeon['level'], dungeon['progress'], units);

									//console.log("5");
									//console.log(units_to_send);
									if (typeof(units_to_send)=='object') {
										var row = [];

										var units_string = "";
										for (var u_key in units_to_send) {
											units_string = units_string + " " + units_to_send[u_key] + " " + units[u_key]['name'];
										}

										this._addBlankValuesToRow(row, this._tableModel);
										row["units"] = units_string;
										row["id"] = cityId;
										row["row_info"] = {
											units: units_to_send,
											dungeon: dungeon,
											city: c
										};
										row["name"] = c.name;
										var diffX = Math.abs(c.xPos - dungeon['x']);
										var diffY = Math.abs(c.yPos - dungeon['y']);
										row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);
										row["position"] = dungeon['x'] + ":" + dungeon['y'];
										row["dungeon_type"] = dungeon['type'];
										row["dungeon_level"] = dungeon['level'];
										row["dungeon_progress"] = dungeon['progress'];

										rowData.push(row);
									}
								}
							}
						}

						return rowData;
					},
					createRowData: function() {
						return this.classicView();
					},
					getUnitsPerDungeon: function () {
						var units = {
							//	units_min[dungeon_name][u_key][dungeon_level - 1][dungeon_progress]
							// units_min[dungeon_name][dungeon_level - 1][dungeon_progress]
							Mountain: {
								1: [270, 270, 270, 270, 270, 270, 270, 270, 270, 270],
								2: [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500],
								3: [4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000],
								4: [10000, 20000, 20000, 17600, 20000, 20000, 20000, 20000, 20000, 20000],
								5: [57000, 57000, 57000, 57000, 57000, 57000, 80000, 80000, 80000, 80000],
								6: [122000, 122000, 122000, 122000, 122000, 122000, 159000, 159000, 159000, 159000],
								7: [250000, 250000, 250000, 250000, 250000, 360000, 360000, 360000, 360000, 360000],
								8: [475000, 475000, 475000, 475000, 475000, 565000, 565000, 565000, 565000, 565000],
								9: [796000, 796000, 796000, 796000, 796000, 1100000, 1100000, 1100000, 1100000, 1100000],
								10: [1100000, 1100000, 1100000, 1100000, 1100000, 1180000, 1180000, 1180000, 1180000, 1180000],
								// 6: [27, 150, 400, 2000, 5500, 14000, 28000, 52000, 80000, 110000], // Berserker
								// 3: [30, 160, 400, 2200, 6000, 15000, 30000, 55000, 80000, 110000], // Ranger
								// 5: [30, 160, 400, 2200, 6000, 15000, 30000, 55000, 80000, 100000], // Templar
								// 11: [18, 100, 275, 1500, 3500, 8000, 20000, 32000, 45000, 70000], // Knight
								// 10: [13, 80, 250, 900, 2700, 6500, 13000, 23000, 36000, 55000], // Paladin
							},
							Hill: {
								1: [270, 270, 270, 270, 270, 270, 270, 270, 290, 270],
								2: [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500],
								3: [4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000],
								4: [6000, 6000, 6000, 6000, 6000, 7000, 7000, 7000, 7000, 8000],
								5: [42000, 42000, 42000, 42000, 42000, 65000, 65000, 65000, 65000, 65000],
								6: [103000, 103000, 103000, 103000, 103000, 153000, 153000, 153000, 153000, 153000],
								7: [310000, 310000, 310000, 310000, 310000, 360000, 360000, 360000, 360000, 360000],
								8: [325000, 325000, 325000, 325000, 325000, 560000, 560000, 560000, 560000, 560000],
								9: [550000, 550000, 550000, 550000, 550000, 950000, 950000, 950000, 950000, 950000],
								10: [750000, 750000, 750000, 750000, 750000, 1000000, 1000000, 1000000, 1000000, 1000000],
								// 6: [27, 140, 350, 1700, 5000, 12000, 25000, 46000, 68000, 100000], // Berserker
								// 3: [30, 160, 400, 2200, 6000, 15000, 30000, 55000, 80000, 100000], // Ranger
								// 7: [60, 320, 800, 4500, 10000, 20000, 48000, 80000, 130000, 180000], // Mage
								// 12: [30, 140, 500, 1700, 5000, 10000, 25000, 45000, 65000, 90000], // Warlock
								// 11: [18, 100, 275, 1400, 3500, 8000, 18000, 30000, 45000, 65000], // Knight
							},
							Forest: {
								1: [270, 270, 270, 270, 270, 270, 270, 270, 290, 270],
								2: [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500],
								3: [2500, 2500, 3000, 3300, 3700, 4000, 4500, 5000, 5500, 6000],
								4: [6000, 11000, 13000, 15000, 17000, 20000, 22000, 25000, 27000, 30000],
								5: [43000, 43000, 43000, 43000, 43000, 70000, 70000, 70000, 70000, 70000],
								6: [93000, 93000, 93000, 93000, 93000, 164000, 164000, 164000, 164000, 164000],
								7: [203000, 203000, 203000, 203000, 203000, 305000, 305000, 305000, 305000, 305000],
								8: [400000, 400000, 400000, 400000, 400000, 500000, 500000, 500000, 500000, 500000],
								9: [564000, 564000, 564000, 564000, 564000, 900000, 900000, 900000, 900000, 900000],
								10: [800000, 800000, 800000, 800000, 800000, 1000000, 1000000, 1000000, 1000000, 1000000]
								// 6: [27, 140, 350, 1700, 5000, 12000, 25000, 46000, 68000, 100000], // Berserker
								// 3: [30, 160, 400, 2200, 6000, 15000, 30000, 55000, 80000, 100000], // Ranger
								// 9: [18, 100, 275, 1400, 3500, 8000, 18000, 30000, 45000, 65000], // Crossbow
								// 11: [18, 100, 275, 1400, 3500, 8000, 18000, 30000, 45000, 65000], // Knight
								// 10: [12, 75, 200, 850, 2500, 6000, 12000, 22000, 34000, 50000], // Paladin
							}//,
//            Sea: {
							//          	1: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
							//        	2: [4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000],
							//     		3: [23000, 23000, 23000, 23000, 23000, 23000, 23000, 23000, 23000, 23000],
							//   		4: [8000, 44000, 44000, 44000, 44000, 44000, 44000, 44000, 44000, 44000],
							// 		5: [111000, 111000, 111000, 111000, 111000, 111000, 111000, 111000, 111000, 111000],
							//	6: [61000, 65000, 70000, 70000, 78000, 85000, 90000, 95000, 100000, 106000],
//           		7: [125000, 138000, 145000, 150000, 165000, 176000, 190000, 200000, 210000, 225000],
							//         		8: [228000, 246000, 270000, 288000, 318000, 325000, 350000, 370000, 380000, 390000],
							//       		9: [345000, 392000, 400000, 410000, 420000, 430000, 450000, 460000, 470000, 480000],
							//     		10: [667000, 667000, 667000, 667000, 667000, 667000, 667000, 667000, 667000, 667000],
							// 16: [2, 9, 57, 110, 277, 417, 567, 834, 1250, 1667], // Sloop
							// 15: [1, 4, 23, 44, 111, 167, 227, 334, 500, 667], // Frigate
							// 17: [1, 1, 6, 11, 28, 42, 57, 84, 125, 167], // War Galleon
							//    }
						};

						return units;
					},
					getTroopsNeeded: function (dungeon_name, dungeon_level, dungeon_progress, units) {
						var units_min = this.getUnitsPerDungeon();
						var kill_percent = 0.0;
						var queued_units = {};
						for (var u_key in units) {
							// TODO - Figure out a good way to combine berserkers and/or rangers with guardians
							// if (u_key == 4) {
							// continue;
							// }
							var unit = units[u_key];
							console.log(unit);
							if (unit['count'] > 0) {
								try {
									dungeon_progress = (dungeon_progress - (dungeon_progress % 100) + 10) / 10;
									var loot = units_min[dungeon_name][dungeon_level][dungeon_progress - 1];
									// ranger || templar || zerks || warlox
									if(u_key == 3 || u_key == 5 || u_key == 6 || u_key == 12){
										var units_needed = Math.round(loot / 10);
									}
									// mage
									else if(u_key == 7){
										var units_needed = Math.round(loot / 5);
									}
									// xbows || knights
									else if(u_key == 9 || u_key == 11){
										var units_needed = Math.round(loot / 15);
									}
									// paladins || guardian
									else if(u_key == 10 || u_key == 4){
										var units_needed = Math.round(loot / 20);
									}
									// everything else
									else{
										continue;
									}
									// var units_needed = units_min[dungeon_name][u_key][dungeon_level - 1];
									// jwimps76 ranger/guardian mix
									try{
										if(u_key == 3 && unit['count'] >= Math.ceil(units_needed / 2))
											if(units[4]['count'] >= Math.ceil(units_needed / 4)){
											// if(unit['count'] >= units_needed && u_key == 4){
											queued_units[3] = Math.ceil(units_needed / 2);
											queued_units[4] = Math.ceil(units_needed / 4);
											return queued_units;
											// unit['count'] = Math.ceil(units_needed / 2);
											}
										// jwimps76 zerks/guardian mix
										if(u_key == 4 && unit['count'] >= Math.ceil(units_needed / 2) && units[6]['count'] >= units_needed && kill_percent == 0.0){
											queued_units[4] = Math.ceil(units_needed / 2);
											queued_units[6] = units_needed;
											return queued_units;
										}
									}   catch(e)
									{
										console.log("no combination") ;
										console.log(e);
									}

									var this_kill_percent = unit['count'] / units_needed;
									var total_kill = this_kill_percent + kill_percent;
									if (total_kill >= 1) {
										// We have enough, return the queued units
										var percent_needed = 1 - kill_percent;
										units_needed = Math.ceil(units_needed * percent_needed);
										// if(units_needed <= unit['count']){
										queued_units[u_key] = units_needed;
										return queued_units;
									}
									else {
										// Otherwise, let's add these to the queued units
										queued_units[u_key] = unit['count'];
										kill_percent += this_kill_percent;
									}
								}
								catch (e) {
									    console.log(e);
								}
							}
						}

						// If we got this far, there isn't enough units to hit that dungeon
						return false;
					},
					_shouldBeIncluded: function(city) {
						return true;
					},
					_handleCellClick: function(event) {
						var row = event.getRow();
						var column = event.getColumn();
						var rowData = this._tableModel.getRowDataAsMap(row);
						var cityId = rowData["id"];
						var row_info = rowData["row_info"];
						var selectedContinent = this.sbContinents.getSelection()[0].getModel();
						switch (column) {
							case 5:
								LT.a.setMainView("c", cityId, -1, -1);
								break;
							case 4:
								var dungeon = row_info['dungeon'];
								LT.a.setMainView('r', 0, dungeon['x'] * LT.a.visMain.getTileWidth(), dungeon['y'] * LT.a.visMain.getTileHeight());
								break;
							case 8:
								// Send the proper units from the correct city to the correct boss
								var lou_suite = window.louSuite.main.getInstance();
								var dungeon = row_info['dungeon'];
								var city = row_info['city'];
								var units = row_info['units'];
								var units_to_send = [];

								for (var u_key in units) {
									units_to_send.push({t: u_key, c: units[u_key]});
								}

								this._tableModel.setValue(column, row, "");
								lou_suite.sendTroops(lou_suite.LS_RAID, cityId, dungeon['x'], dungeon['y'], units_to_send, lou_suite.LS_RAID_REPEAT, this.onTroopsSent);
								break;
						}
					},
					onTroopsSent: function (event, v) {
						if (event.getContent() == null) {
							console.log('invalid');
							return;
						}
						var message = "";
						var code = event.getContent();
						console.log("Code Received: ");
						console.log(code);
						console.log("code is");
						console.log(event);
						switch (code.r1) {
							case 0:
								// Success
								var lou_suite = window.louSuite.main.getInstance();
								var selectedContinent = lou_suite.dungeon_raider.sbContinents.getSelection()[0].getModel();

								// Subtract units sent from city
								var city_id = v['cid'];
								var units_sent = v['units'];
								for (var u_key in units_sent) {
									var unit = units_sent[u_key];
									var total = lou_suite.cities[city_id]['units'][unit['t']]['count'];
									total = total - unit['c'];
									lou_suite.cities[city_id]['units'][unit['t']]['count'] = total;
								}

								// Save the city
								bos.Storage.getInstance().saveCity(lou_suite.cities[city_id]);

								// Update the view
								lou_suite.dungeon_raider.updateView();
								return;
								break;
							case 4: // Not enough units
								message = "Not enough units. Try rescanning the city.";
								break;
							case 64: // No more command slots
								message = "No more command slots. Use a different city.";
								break;
							default:
								message= "Unknown Error: " + code;
								break;
						}

						// Failed
						console.log("Failed with status code " + code);

						var lou_suite = window.louSuite.main.getInstance();
						var selectedContinent = lou_suite.dungeon_raider.sbContinents.getSelection()[0].getModel();

						if (message) {
							lou_suite.setMessage(message);
						}

						// Update the view
						lou_suite.dungeon_raider.updateView();
					},
					createCitiesContinentsSelectBox: function() {
						var sb = new qx.ui.form.SelectBox().set({
							width: 60,
							height: 28
						});
						var cities = webfrontend.data.Player.getInstance().cities;

						sb.setToolTipText("Filter by: <b>continents</b>");

						var continents = [];
						for (var cityId in cities) {
							var city = cities[cityId];
							var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(city.xPos, city.yPos);
							continents["c" + cont] = true;
						}

						var list = [];
						for (var key in continents) {
							if (key.substring != undefined && qx.lang.Type.isString(key)) {
								var cont = parseInt(key.substring(1), 10);
								if (!isNaN(cont)) {
									list.push(cont);
								}
							}
						}

						list.sort();

						for (var i = 0; i < list.length; i++) {
							var cont = list[i];
							sb.add(new qx.ui.form.ListItem("C" + cont, null, cont));
						}

						return sb;
					},
					_createToolBar: function() {
						// TODO - Add a selector for repeat or non-repeat
						var toolBar = new qx.ui.groupbox.GroupBox();
						toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

						this.sbContinents = this.createCitiesContinentsSelectBox();
						this.sbContinents.addListener("changeSelection", function(evt) {
							this.updateView();
						}, this);
						toolBar.add(this.sbContinents);

						this.sbLevel = new qx.ui.form.SelectBox().set({
							width: 70,
							height: 28
						});

						this.sbLevel.setToolTipText("Filter by: <b>min level</b>");

						var min_level = localStorage.getItem("lou_suite_min_level");

						if (typeof min_level == 'undefined') {
							min_level = 1;
						}

						var levels_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

						for (var i = 1; i < 10; i++) {
							var item = new qx.ui.form.ListItem("Level " + i, null, i);
							this.sbLevel.add(item);
							if (i == min_level) {
								this.sbLevel.setSelection([item]);
							}
						}

						this.sbLevel.addListener("changeSelection", function(evt) {
							localStorage.setItem("lou_suite_min_level", this.sbLevel.getSelection()[0].getModel());
							this.updateView();
						}, this);
						toolBar.add(this.sbLevel);

						var btnViewRegion = new qx.ui.form.Button("View Region");
						btnViewRegion.setWidth(120);
						toolBar.add(btnViewRegion);
						btnViewRegion.addListener("execute", function(evt) {
							var selectedContinent = this.sbContinents.getSelection()[0].getModel();
							window.louSuite.main.getInstance().moveToContRegion(selectedContinent, 4);
							this.updateView();
						}, this);

						this.btnUpdateView = new qx.ui.form.Button("Scan");
						this.btnUpdateView.setWidth(80);
						toolBar.add(this.btnUpdateView);
						this.btnUpdateView.addListener("execute", function(evt) {
							window.louSuite.main.getInstance().scanRegion();
							this.btnUpdateView.setEnabled(false);
							this.updateView();
						}, this);
						this.btnUpdateView.setEnabled(false);

						var btnRecount = new qx.ui.form.Button("Recount Troops");
						btnRecount.setWidth(120);
						toolBar.add(btnRecount);
						btnRecount.addListener("execute", function(evt) {
							var server = new bos.Server();

							var citiesIds = [];

							var selectedContinent = this.sbContinents.getSelection()[0].getModel();
							// Limit by selected continent
							for (var cityId in LT.player.cities) {
								c = LT.player.cities[cityId];

								if (c == null) {
									continue;
								}

								var city_cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
								// Check that the city is on the right continent
								if (city_cont != selectedContinent) {
									continue;
								}
								citiesIds.push(cityId);
							}
							server.pollCities(citiesIds);

							this.updateView();
						}, this);

						return toolBar;
					}
				}
			});
			qx.Class.define("lou_suite.gui.BossRaider", {
				extend: bos.gui.SummaryPage,
				construct: function() {
					var lou_suite = window.louSuite.main.getInstance();
					lou_suite.boss_raider = this;
					bos.gui.SummaryPage.call(this);
					this.setLabel("Boss Raider");
					this.setLayout(new qx.ui.layout.VBox(10));
					this.add(this._createToolBar());
					this._tableModel = new qx.ui.table.model.Simple();
					var columnNames = [ "Id", "Row Info", "Type", "Level", "Pos", "Name", "Distance", "Units", "Actions"];
					var columnIds = ["id", "row_info", "boss_type", "boss_level", "position", "name", "distance", "units", "actions"];

					this._tableModel.setColumns(columnNames, columnIds);

					this._setupSorting(this._tableModel);
					this._tableModel.sortByColumn(4, true);

					var custom = {
						tableColumnModel : function(obj) {
							return new qx.ui.table.columnmodel.Resize(obj);
						}
					};

					this.table = new bos.ui.table.Table(this._tableModel, custom);
					this.table.addListener("cellClick", this._handleCellClick, this);

					var columnModel = this.table.getTableColumnModel();

					columnModel.setColumnVisible(0, false);
					columnModel.setColumnVisible(1, false);
					columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
					columnModel.setDataCellRenderer(5, new bos.ui.table.cellrenderer.ClickableLook());
					columnModel.setDataCellRenderer(8, new bos.ui.table.cellrenderer.ClickableLook());

					var tcm = this.table.getTableColumnModel();
					var resizeBehavior = tcm.getBehavior();
					resizeBehavior.setWidth(2, 60);
					resizeBehavior.setWidth(3, 20);
					resizeBehavior.setWidth(4, 50);
					resizeBehavior.setWidth(5, 100);
					resizeBehavior.setWidth(6, 70);
					resizeBehavior.setWidth(7, 80);
					resizeBehavior.setWidth(8, "1*");
					resizeBehavior.setMinWidth(8, 100);

					this.add(this.table, {flex: 1});
				},
				members: {
					sbContinents: null,
					btnUpdateView: null,
					sbLevel: null,
					classicView: function() {
						this.btnUpdateView.setEnabled(LT.a.visMain.mapmode == "r");

						var rowData = [];
						var lou_suite = window.louSuite.main.getInstance();
						var selectedContinent = this.sbContinents.getSelection()[0].getModel();
						var min_level = this.sbLevel.getSelection()[0].getModel();

						// Refresh the city list to get new troop counts
						lou_suite.scanAllCities();

						// First get all the bosses in the area for the continent we are working with
						var bosses = lou_suite.bosses;
						for (var b_key in bosses['c' + selectedContinent]) {
							var boss = bosses['c' + selectedContinent][b_key];
							if (boss['state'] && (boss['level'] >= min_level)) {
								// Then get all the cities on that continent that can hit that boss
								// Show the distance for the city to hit the boss

								for (var cityId in LT.player.cities) {
									c = LT.player.cities[cityId];

									if (c == null) {
										continue;
									}

									var city_cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
									// Check that the city is on the right continent
									if (city_cont != selectedContinent) {
										continue;
									}

									var city = lou_suite.cities[cityId];
									if (city == undefined) {
										continue;
									}

									// Check that the city has enough troops to hit the boss
									if (city.getUnitCount() == 0) {
										continue;
									}

									var units = lou_suite.getCityUnits(cityId);
									// Check that there are enough units to send for this boss
									var units_to_send = this.getTroopsNeeded(boss['type'], boss['level'], units);
									if (typeof(units_to_send)=='object') {
										var row = [];

										var units_string = "";
										for (var u_key in units_to_send) {
											units_string = units_string + " " + units_to_send[u_key] + " " + units[u_key]['name'];
										}

										this._addBlankValuesToRow(row, this._tableModel);
										row["units"] = units_string;
										row["id"] = cityId;
										row["row_info"] = {
											units: units_to_send,
											boss: boss,
											city: c
										};
										row["name"] = c.name;
										var diffX = Math.abs(c.xPos - boss['x']);
										var diffY = Math.abs(c.yPos - boss['y']);
										row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);
										row["position"] = boss['x'] + ":" + boss['y'];
										row["boss_type"] = boss['type'];
										row["boss_level"] = boss['level'];
										row["actions"] = "Send";

										rowData.push(row);
									}
								}
							}
						}

						return rowData;
					},
					createRowData: function() {
						return this.classicView();
					},
					getUnitsPerBoss: function () {
						var units = {
							Dragon: {
								6: [50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000], // Berserker
								3: [84, 500, 3334, 6667, 16667, 25000, 33334, 50000, 75000, 100000], // Ranger
								5: [100, 600, 4000, 8000, 20000, 30000, 40000, 60000, 90000, 120000], // Templar
								9: [42, 250, 1700, 3300, 8300, 12500, 17000, 25000, 37500, 50000], // Crossbowmen
								11: [19, 112, 756, 1467, 3689, 5556, 7556, 11112, 16667, 22223], // Knight
								7: [36, 215, 1429, 2858, 7143, 10715, 14286, 21429, 32143, 42858], // Mage
								12: [21, 125, 834, 1667, 4167, 6250, 8334, 12500, 18750, 250000], // Warlock
								10: [28, 167, 1134, 2200, 5534, 8334, 11334, 16667, 25000, 33334], // Paladin
							},
							Moloch: {
								6: [50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000], // Berserker
								3: [84, 500, 3334, 6667, 16667, 25000, 33334, 50000, 75000, 100000], // Ranger
								5: [100, 600, 4000, 8000, 20000, 30000, 40000, 60000, 90000, 120000], // Templar
								9: [63, 375, 2500, 5000, 12500, 18750, 25000, 37500, 56250, 75000], // Crossbowmen
								11: [28, 167, 1112, 2223, 5556, 8334, 11112, 16667, 25000, 33334], // Knight
								7: [24, 143, 972, 1886, 4743, 7143, 9715, 14286, 21429, 28572], // Mage
								12: [14, 84, 567, 1100, 2767, 4167, 5667, 8664, 12500, 16667], // Warlock
								10: [42, 250, 1667, 3334, 8334, 12500, 16667, 25000, 37500, 50000], // Paladin
							},
							Hydra: {
								6: [34, 200, 1360, 2640, 6640, 10000, 13600, 20000, 30000, 40000], // Berserker
								3: [56, 334, 2267, 4400, 11067, 16667, 22667, 33334, 50000, 66667], // Ranger
								5: [68, 400, 2720, 5280, 13280, 20000, 27200, 40000, 60000, 80000], // Templar
								9: [63, 375, 2500, 5000, 12500, 18750, 25000, 37500, 56250, 75000], // Crossbowmen
								11: [28, 167, 1112, 2223, 5556, 8334, 11112, 16667, 25000, 33334], // Knight
								7: [36, 215, 1429, 2858, 7143, 10715, 14286, 21429, 32143, 42858], // Mage
								12: [21, 125, 834, 1667, 4167, 6250, 8334, 12500, 18750, 250000], // Warlock
								10: [42, 250, 1667, 3334, 8334, 12500, 16667, 25000, 37500, 50000], // Paladin
							},
							Octopus: {
								16: [2, 9, 57, 110, 277, 417, 567, 834, 1250, 1667], // Sloop
								15: [1, 4, 23, 44, 111, 167, 227, 334, 500, 667], // Frigate
								17: [1, 1, 6, 11, 28, 42, 57, 84, 125, 167], // War Galleon
							}
						};

						// Apply the research and shrine bonuses
						var tech = webfrontend.data.Tech.getInstance();

						for (var boss_id in units) {
							var unit_counts = units[boss_id];

							for (var unit_id in unit_counts) {
								unit_count = unit_counts[unit_id];
								var bf = tech.getBonus("unitDamage", webfrontend.data.Tech.research, parseInt(unit_id));
								var be = tech.getBonus("unitDamage", webfrontend.data.Tech.shrine, parseInt(unit_id));
								var bonus = bf + be;
								for (var i = 0; i < unit_count.length; i++) {
									var units_needed = units[boss_id][unit_id][i];
									var new_units_needed = Math.ceil(units_needed / (1 + (bonus / 100)));
									units[boss_id][unit_id][i] = new_units_needed;
								}
							}
						}

						return units;
					},
					getTroopsNeeded: function (boss_name, boss_level, units) {
						var units_min = this.getUnitsPerBoss();
						var kill_percent = 0.0;
						var queued_units = {};

						for (var u_key in units) {
							var unit = units[u_key];
							if (unit['count'] > 0) {
								try {
									var units_needed = units_min[boss_name][u_key][boss_level - 1];
									var this_kill_percent = unit['count'] / units_needed;
									var total_kill = this_kill_percent + kill_percent;
									if (total_kill >= 1) {
										// We have enough, return the queued units
										var percent_needed = 1 - kill_percent;
										units_needed = Math.ceil(units_needed * percent_needed);

										queued_units[u_key] = units_needed;
										return queued_units;
									}
									else {
										// Otherwise, let's add these to the queued units
										queued_units[u_key] = unit['count'];
										kill_percent += this_kill_percent;
									}
								}
								catch (e) {

								}
							}
						}

						// If we got this far, there isn't enough units to hit that boss
						return false;
					},
					_shouldBeIncluded: function(city) {
						return true;
					},
					_handleCellClick: function(event) {
						var row = event.getRow();
						var column = event.getColumn();
						var rowData = this._tableModel.getRowDataAsMap(row);
						var cityId = rowData["id"];
						var row_info = rowData["row_info"];
						var selectedContinent = this.sbContinents.getSelection()[0].getModel();
						switch (column) {
							case 5:
								LT.a.setMainView("c", cityId, -1, -1);
								break;
							case 4:
								var boss = row_info['boss'];
								LT.a.setMainView('r', 0, boss['x'] * LT.a.visMain.getTileWidth(), boss['y'] * LT.a.visMain.getTileHeight());
								break;
							case 8:
								// Send the proper units from the correct city to the correct boss
								var lou_suite = window.louSuite.main.getInstance();
								var boss = row_info['boss'];
								var city = row_info['city'];
								var units = row_info['units'];
								var units_to_send = [];

								for (var u_key in units) {
									units_to_send.push({t: u_key, c: units[u_key]});
								}

								// Show some kind of progress thing
								this._tableModel.setValue(column, row, "");
								lou_suite.sendTroops(lou_suite.LS_RAID, cityId, boss['x'], boss['y'], units_to_send, lou_suite.LS_RAID_ONCE, this.onTroopsSent);
								break;
						}
					},
					onTroopsSent: function (event, v) {
						console.log(v);
						if (event.getContent() == null) {
							console.log('invalid');
							return;
						}
						var message = "";
						var removeBoss = true;
						var code = event.getContent();
						//console.log("Code Received: " + code);
						//console.log("Code1 Received: ");
						console.log(code);
						switch (code.r1) {
							case 0:
								// Success
								var lou_suite = window.louSuite.main.getInstance();
								var selectedContinent = lou_suite.boss_raider.sbContinents.getSelection()[0].getModel();

								// Subtract units sent from city
								var city_id = v['cid'];
								var units_sent = v['units'];
								for (var u_key in units_sent) {
									var unit = units_sent[u_key];
									var total = lou_suite.cities[city_id]['units'][unit['t']]['count'];
									total = total - unit['c'];
									lou_suite.cities[city_id]['units'][unit['t']]['count'] = total;
								}

								// Save the city
								bos.Storage.getInstance().saveCity(lou_suite.cities[city_id]);

								if (removeBoss) {
									// Mark the boss as taken
									lou_suite.bosses['c' + selectedContinent][v['x'] + '-' + v['y']]['state'] = false;
								}

								// Update the view
								lou_suite.boss_raider.updateView();
								return;
								break;
							case 33554436: // Already ordered
								message = "Boss was already taken.";
								break;
							case 33554432: // Already ordered from a different castle
								message = "Boss was already taken.";
								break;
							case 16781312: // Dungeon is closed
								message = "Boss was already taken";
								break;
							case 4: // Not enough units
								message = "Not enough units. Try rescanning the city.";
								removeBoss = false;
								break;
							case 64: // No more command slots
								message = "No more command slots. Use a different city.";
								removeBoss = false;
								break;
							default:
								message= "Unknown Error: " + code;
								break;
						}

						// Failed
						console.log("Failed with status code " + code);

						var lou_suite = window.louSuite.main.getInstance();
						var selectedContinent = lou_suite.boss_raider.sbContinents.getSelection()[0].getModel();

						if (message) {
							lou_suite.setMessage(message);
						}

						if (removeBoss) {
							// Mark the boss as taken
							lou_suite.bosses['c' + selectedContinent][v['x'] + '-' + v['y']]['state'] = false;
						}

						// Update the view
						lou_suite.boss_raider.updateView();
					},
					createCitiesContinentsSelectBox: function() {
						var sb = new qx.ui.form.SelectBox().set({
							width: 60,
							height: 28
						});
						var cities = webfrontend.data.Player.getInstance().cities;

						sb.setToolTipText("Filter by: <b>continents</b>");

						var continents = [];
						for (var cityId in cities) {
							var city = cities[cityId];

							var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(city.xPos, city.yPos);
							continents["c" + cont] = true;
						}

						var list = [];
						for (var key in continents) {
							if (key.substring != undefined && qx.lang.Type.isString(key)) {
								var cont = parseInt(key.substring(1), 10);
								if (!isNaN(cont)) {
									list.push(cont);
								}
							}
						}

						list.sort();

						//sb.add(new qx.ui.form.ListItem("All", null, "A"));
						for (var i = 0; i < list.length; i++) {
							var cont = list[i];
							sb.add(new qx.ui.form.ListItem("C" + cont, null, cont));
						}

						return sb;
					},
					_createToolBar: function() {
						var toolBar = new qx.ui.groupbox.GroupBox();
						toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

						this.sbContinents = this.createCitiesContinentsSelectBox();
						this.sbContinents.addListener("changeSelection", function(evt) {
							this.updateView();
						}, this);
						toolBar.add(this.sbContinents);

						this.sbLevel = new qx.ui.form.SelectBox().set({
							width: 70,
							height: 28
						});

						this.sbLevel.setToolTipText("Filter by: <b>min level</b>");

						var min_level = localStorage.getItem("lou_suite_min_level");

						if (typeof min_level == 'undefined') {
							min_level = 1;
						}

						var levels_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

						for (var i = 1; i < 10; i++) {
							var item = new qx.ui.form.ListItem("Level " + i, null, i);
							this.sbLevel.add(item);
							if (i == min_level) {
								this.sbLevel.setSelection([item]);
							}
						}

						this.sbLevel.addListener("changeSelection", function(evt) {
							localStorage.setItem("lou_suite_min_level", this.sbLevel.getSelection()[0].getModel());
							this.updateView();
						}, this);
						toolBar.add(this.sbLevel);

						var btnViewRegion = new qx.ui.form.Button("View Region");
						btnViewRegion.setWidth(120);
						toolBar.add(btnViewRegion);
						btnViewRegion.addListener("execute", function(evt) {
							var selectedContinent = this.sbContinents.getSelection()[0].getModel();
							window.louSuite.main.getInstance().moveToContRegion(selectedContinent, 4);
							this.updateView();
						}, this);

						this.btnUpdateView = new qx.ui.form.Button("Scan");
						this.btnUpdateView.setWidth(80);
						toolBar.add(this.btnUpdateView);
						this.btnUpdateView.addListener("execute", function(evt) {
							window.louSuite.main.getInstance().scanRegion();
							this.btnUpdateView.setEnabled(false);
							this.updateView();
						}, this);
						this.btnUpdateView.setEnabled(false);

						var btnRecount = new qx.ui.form.Button("Recount Troops");
						btnRecount.setWidth(120);
						toolBar.add(btnRecount);
						btnRecount.addListener("execute", function(evt) {
							var server = new bos.Server();

							var citiesIds = [];

							var selectedContinent = this.sbContinents.getSelection()[0].getModel();
							// Limit by selected continent
							for (var cityId in LT.player.cities) {
								c = LT.player.cities[cityId];

								if (c == null) {
									continue;
								}

								var city_cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
								// Check that the city is on the right continent
								if (city_cont != selectedContinent) {
									continue;
								}
								citiesIds.push(cityId);
							}
							server.pollCities(citiesIds);

							this.updateView();
						}, this);

						return toolBar;
					}
				}
			});
		}

		function LT_checkIfLoaded() {
			try {
				if (qx === undefined || bos === undefined) {
					window.setTimeout(LT_checkIfLoaded, 1000);
				}
				else {
					if (typeof qx != 'undefined' && typeof bos != 'undefined') {
						a = qx.core.Init.getApplication(); // application
						c = a.cityInfoView;
						wdst = webfrontend.data.ServerTime.getInstance().refTime;
						if (a && c && wdst) {
							createSuite();
							window.louSuite.main.getInstance().initialize();
						} else
							window.setTimeout(LT_checkIfLoaded, 1000);
					} else {
						window.setTimeout(LT_checkIfLoaded, 1000);
					}
				}
			} catch (e) {
				if (typeof console != 'undefined') console.log(e);
				else if (window.opera) opera.postError(e);
				else GM_log(e);
			}
		}
		if (/lordofultima\.com/i.test(document.domain)) {
			window.setTimeout(LT_checkIfLoaded, 25000);
		}
	}

	// injecting, because there seem to be problems when creating game interface with unsafeWindow
	var louSuiteScript = document.createElement("script");
	txt = LS_mainFunction.toString();
	louSuiteScript.innerHTML = "(" + txt + ")();";
	louSuiteScript.type = "text/javascript";
	if (/lordofultima\.com/i.test(document.domain))
		document.getElementsByTagName("head")[0].appendChild(louSuiteScript);
})();
