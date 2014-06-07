// ==UserScript==
// @name 		LoUPak tools
// @description 	Adds extra functionality to Lord of Ultima
// @namespace 		MousePak
// @include 		http://prodgame*.lordofultima.com/*/index.aspx*
// @version 		0.2.2
// @require 		http://sizzlemctwizzle.com/updater.php?id=125367&days=7
// ==/UserScript==

(function () {
    /*
     * Changelog
     * 25/01/2012
     * 0.1   - initial fork from PA tool v0.5.2
     * 0.1.1 - changed loading point to fix Chrome naming problem
     * 0.1.2 - fixed the pct maths section for troops bonus for suggested boss atk numbers
     *
     * 26/01/2012
     * 0.2   - Experimental progress TS for dungeons
     *         removed all functions that break LoU 3rd party tool rules
     *
     * 13/02/2012
     * 0.2.1 - Included an auto greasemonkey updater (userscripts.org/guides/45)
     *
     *
     * 30/04/2012
     * 0.2.2 - Altered dungeon TS base numbers to improve low level raid suggestions
     *
     */
    var main = function () {
        this.initialized = false;

        function PakDebug(e) {
            if (window.console && typeof console.log == "function") {
                console.log(e);
            }
        }

		function LoUPakMap() {
			try {

				const bossKill = [50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000];
				const dungeonKill = [15, 100, 340, 1400, 3000, 5500, 12500, 20000, 35000, 60000];

				var l = qx.locale.Manager.getInstance().getLocale();
				if(l != "en" || l != "de" || l != "pl")
					l = "en";
				const tr = {
					"en" : {
						"weak" : "Weakness",
					},
					"de" : {
						"weak" : "Schwäche",
					},
					"pl" : {
						"weak" : "слабость",
					},
				}

				var a = qx.core.Init.getApplication();
				var r = webfrontend.res.Main.getInstance();
						
				const nameC = a.tr("tnf:name:").charAt(0);
				const typeC = a.tr("tnf:type:").charAt(0);
				const levelT = a.tr("tnf:level:");
				const progressP = a.tr("tnf:progress:");

				//<table cellspacing="0"><tr><td width="75">Name:</td><td>Dragon</td></tr><tr><td>Since:</td><td>Yesterday 22:04:43</td></tr><tr><td>Level:</td><td>7</td></tr>
				//<table cellspacing="0"><tr><td width="75">Type:</td><td>Mountain Dungeon</td></tr><tr><td>Since:</td><td>31.07. 01:15:18</td></tr><tr><td>Level:</td><td>9</td></tr><tr><td>Progress:</td><td>94%</td></tr>

				const sHdr = '<table cellspacing="0"><tr><td width="75">';
				const sRow = "</td><td>";
				const pId = sHdr.length;
				const pRow = sRow.length;
				const weakT = tr[l]["weak"] + ':' + sRow;
				const progressT = 'TS + pct:' + sRow;
				// const zergT = r.units["6"].dn + ':' + sRow;
				const zergT = 'Unit TS:' + sRow;
				const zergT6 = r.units["6"].dn + ':' + sRow;
				const zergT10 = r.units["10"].dn + ':' + sRow;
				const zergT11 = r.units["11"].dn + ':' + sRow;

				// "Name" or "Type", Boss or Dungeon
				// Desc offset
				const pBName = pId + pRow + a.tr("tnf:name:").length;
				const pDName = pId + pRow + a.tr("tnf:type:").length;
				// Progress offset
                        // x
				// Level offset
				const pLevel = pRow + a.tr("tnf:level:").length;

				// Forest		Dragon		Cavalry		Wood
				// Mountain		Hydra		Infantry	Iron
				// Hill			Moloch		Magic		Stone
				// Sea			Octopus		Artillery 	Food

				var cavT = r.attackTypes["2"].dn;
				var infT = r.attackTypes["1"].dn;
				var magT = r.attackTypes["4"].dn;
				var artT = r.attackTypes["3"].dn;

				var dragC = r.dungeons["6"].dn.charAt(0);
				var hydrC = r.dungeons["8"].dn.charAt(0);
				var moloC = r.dungeons["7"].dn.charAt(0);
				var octyC = r.dungeons["12"].dn.charAt(0);

				var forstC = r.dungeons["5"].dn.charAt(0);
				var mountC = r.dungeons["4"].dn.charAt(0);
				var hillC = r.dungeons["3"].dn.charAt(0);
				var seaC = r.dungeons["2"].dn.charAt(0);

				function getBossWeakness(name) {
					if(name == dragC)
						return cavT;
					else if(name == hydrC)
						return infT;
					else if(name == moloC)
						return magT;
					else if(name == octyC)
						return artT;
					else
						return "";
				}

				function getDungeonWeakness(name) {
					if(name == forstC)
						return cavT;
					else if(name == mountC)
						return infT;
					else if(name == hillC)
						return magT;
					else if(name == seaC)
						return artT;
					else
						return "";
				}

				function toolTipAppear() {
					try {
						var tip = a.worldViewToolTip;
						var mode = tip.getMode();
						if(mode == 'c' || mode == 'd') {
							// if(tip.contextObject)
						} else {
							var text = tip.getLabel();
							if(text != null || text.length > pId) {
								var type = text.charAt(pId);
								if(type == nameC) { // Name:
									//Boss
									var weak = getBossWeakness(text.charAt(pBName));
									var lPos = text.indexOf(levelT, pBName) + pLevel;
									var level = text.charAt(lPos);
									if(level == '1') {
										if(text.charAt(lPos + 1) == '0')
											level = '10';
									}
									var zergs = webfrontend.gui.Util.formatNumbers(bossKill[ parseInt(level) - 1]);
									var sb = new qx.util.StringBuilder(2048);
									var research6 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 6);
									var shrine6 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 6);
									var bonus6 = (100 - shrine6) / 100 * ((100 - research6) / 100);
									var research10 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 10);
									var shrine10 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 10);
									var bonus10 = (100 - shrine10) / 100 * ((100 - research10) / 100);
									var research11 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 11);
									var shrine11 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 11);
									var bonus11 = (100 - shrine11) / 100 * ((100 - research11) / 100);
									var zergs6 = webfrontend.gui.Util.formatNumbers(parseInt(bossKill[ parseInt(level) - 1] * bonus6));
									if (weak == "Infantry")
										var zergs6 = webfrontend.gui.Util.formatNumbers(parseInt(bossKill[ parseInt(level) - 1] * bonus6 * 0.67));
									var zergs10 = webfrontend.gui.Util.formatNumbers(parseInt(bossKill[ parseInt(level) - 1] * bonus10 * 0.83));
									if (weak == "Cavalry")
										var zergs10 = webfrontend.gui.Util.formatNumbers(parseInt(bossKill[ parseInt(level) - 1] * bonus10 * 0.67 * 0.83));
									var zergs11 = webfrontend.gui.Util.formatNumbers(parseInt(bossKill[ parseInt(level) - 1] * bonus11 * 0.55));
									if (weak == "Cavalry")
										var zergs11 = webfrontend.gui.Util.formatNumbers(parseInt(bossKill[ parseInt(level) - 1] * bonus11 * 0.67 * 0.55));
									sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT6, zergs6, "</td></tr></td></tr><tr><td>", zergT10, zergs10, "</td></tr></td></tr><tr><td>", zergT11, zergs11, "</td></tr></table>");
									tip.setLabel(sb.get());

								} else if(type == typeC) { // Type:
									//Dungeon
									var weak = getDungeonWeakness(text.charAt(pDName));
									var lPos = text.indexOf(levelT, pDName) + pLevel;
									var level = text.charAt(lPos);
									if(level == '1') {
										if(text.charAt(lPos + 1) == '0')
											level = '10';
									}
									var progress = text.substr(text.indexOf("Progress") + 18,2);
									if(progress.substr(1,1) == '%') {
										var progress = progress.substr(0,1);
									}
									var progress = webfrontend.gui.Util.formatNumbers(parseInt((progress * 0.0175 + 1.0875) * dungeonKill[ parseInt(level) - 1]));
									var zergs6 = webfrontend.gui.Util.formatNumbers(dungeonKill[ parseInt(level) - 1]);

									var sb = new qx.util.StringBuilder(2048);
									sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT, zergs6, "</td></tr><tr><td>", progressT, progress, "</td></tr></table>");
									tip.setLabel(sb.get());
								}
							}
						}

					} catch (e) {
						console.error(e);
					}
				}

				a.worldViewToolTip.addListener("appear", toolTipAppear, this);

			} catch (e) {
				console.error(e);
			}

		} // -- inner shell, ttt_script





        /* main script that defines the plugin bar */
        var createTweak = function () {
            var LoUPakversion = "0.2.2";

            qx.Class.define("PakTweak.main", {
                // let's create a new instance for LoUPak
                type:"singleton",
                extend:qx.core.Object,
                members:{
                    initialize:function () {
                        PakDebug("LoUPak initialize");

                        this.app = qx.core.Init.getApplication();
                        this.cInfoView = this.app.getCityInfoView();
                        this.chat = this.app.chat;
                        this.bQc = this.cInfoView.buildingQueue;
                        this.bQh = this.bQc.header;
                        this.tweakPak();
                    },
                    tweakPak:function () {
                        // Create a toolbar in the main area on the left below existing forms.
                        var toolbar = new PakTweak.extraTools();
                        this.bQc.getLayoutParent().addBefore(toolbar.LoUPakToolContainer, this.bQc);
                    }
                }
            });

            qx.Class.define("PakTweak.extraTools", {
                // create a new instance
                extend:qx.core.Object,
                construct:function () {
                    var btn, fn_click;
                    this.LoUPakToolContainer = new qx.ui.container.Composite(new qx.ui.layout.Canvas());

                    this.LoUPakToolContainerBgr = new qx.ui.basic.Image('http://prodcdngame.lordofultima.com/cdn/335296/resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_end.png');
                    this.LoUPakToolContainerBgr.setWidth(338);
                    this.LoUPakToolContainerBgr.setHeight(35);
                    this.LoUPakToolContainer.add(this.LoUPakToolContainerBgr, {left:0, top:0});

                    // Display City ID
                    if (true) {
                        btn = new qx.ui.form.Button("~");
                        btn.set({width:20, appearance:"button-text-small", toolTipText:'Click to display developer info'});
                        fn_click = function () {
                            var output = 'Session ID: ' + webfrontend.net.CommandManager.getInstance().getInstanceGuid() + '\n';
                            output += 'City ID: ' + webfrontend.data.City.getInstance().getId() + '\n';
                            output += 'Zerk Research Bonus: ' + webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 6) + '\n';
                            output += 'Zerk Shrine Bonus: ' + webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 6) + '\n';
											var research6 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 6);
											var shrine6 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 6);
											var bonus6 = (100 - shrine6) / 100 * ((100 - research6) / 100);
                            output += 'Zerk total Bonus: ' + bonus6 + '\n';
                            var dialog = new webfrontend.gui.ConfirmationWidget();
                            dialog.showGenericNotice('Developer Info', '', '', 'webfrontend/ui/bgr_popup_survey.gif');
                            var shrStr = new qx.ui.form.TextArea(output).set({allowGrowY:true, tabIndex:303});
                            dialog.dialogBackground._add(shrStr, {left:30, top:50, width:90, height:45});
                            shrStr.selectAllText();
                            qx.core.Init.getApplication().getDesktop().add(dialog, {left:0, right:0, top:0, bottom:0});
                            dialog.show();
                        };
                        btn.addListener("click", fn_click, this);
                        this.LoUPakToolContainer.add(btn, { top:8, left:8});
                    }


                    // Fill the build queue
                    if (true) {
                        btn = new qx.ui.form.Button("+");
                        btn.set({width:20, appearance:"button-text-small", toolTipText:'Click to Fill build queue'});
                        fn_click = function () {
                            webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueueFill", {cityid:cgi.getId()});
                        };
                        btn.addListener("click", fn_click, this);
                        this.LoUPakToolContainer.add(btn, { top:8, left:30});
                    }

                    // Pay up the resource for all queued buildings
                    if (true) {
                        btn = new qx.ui.form.Button("#");
                        btn.set({width:20, appearance:"button-text-small", toolTipText:"Click to Convert all builds"});
                        fn_click = function () {
                            webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueuePayAll", {cityid:cgi.getId()})
                        };
                        btn.addListener("click", fn_click, this);
                        this.LoUPakToolContainer.add(btn, { top:8, left:52});
                    }

                    // Gather information
                    if (true) {
                        btn = new qx.ui.form.Button("Gather");
                        btn.set({width:52, appearance:"button-text-small", toolTipText:"Click to get all city info"});
                        fn_click = function () {
                            var server = bos.Server.getInstance();
                            server.cities = {};
                            var player = webfrontend.data.Player.getInstance();
                            var _collection = { cityIds:[] };
                            for (var cityId in player.cities) {
                                var reference = player.cities[cityId].reference;
                                var ref_temp = reference.substr(reference.indexOf('*') + 1);
                                ref_temp = ref_temp.substr(0, ref_temp.indexOf('*'));
                                if ((ref_temp.indexOf('X') > -1) || reference.indexOf('!') > -1) _collection.cityIds.push(cityId);
                            }
                            if (_collection.cityIds.length > 0) {
                                server.pollCities(_collection.cityIds);
                            } else {
                                var dialog = new webfrontend.gui.ConfirmationWidget();
                                dialog.showGenericNotice("No Information Gathered", "You have not flagged any cities to be included in the data miner.",
                                    "Please add *X* or ! to any other options in your city's reference. eg \"City Name *MTX*\", \"City Name *X*\", \"City Name !\"", "webfrontend/ui/bgr_popup_survey.gif");
                                qx.core.Init.getApplication().getDesktop().add(dialog, {left:0, right:0, top:0, bottom:0});
                                dialog.show();
                            }
                        };
                        btn.addListener("click", fn_click, this);
                        this.LoUPakToolContainer.add(btn, { top:8, left:81});
                    }

                    // Format the info from Gather Info to a readable output one line per castle/city
                    if (true) {
                        btn = new qx.ui.form.Button("Overview");
                        btn.set({width:57, appearance:"button-text-small", toolTipText:"display overview troop info"});

                        fn_click = function () {
                            // TODO this code is duplicated, move it to one place
                            var player = webfrontend.data.Player.getInstance();
                            var server = webfrontend.data.Server.getInstance();
                            var _player = {
                                id:player.getId(),
                                name:player.getName(),
                                PakTweakVersion:LoUPakversion,
                                bosTool:1,
                                cities:[] };
                            if (bos != undefined && bos.Server != undefined) {
                                var bServer = bos.Server.getInstance();
                                for (var cityId in bServer.cities) {
                                    var coords = PakTweak.CombatTools.cityIdToCoords(cityId);
                                    var temp = {
                                        id:cityId,
                                        name:bServer.cities[cityId].getName(),
                                        coordinates:{ x:coords[0], y:coords[1] },
                                        continent:server.getContinentFromCoords(coords[0], coords[1]),
                                        command:this.getCityCommandOverview(bServer.cities[cityId], cityId),
                                        canRecruitBarons:bServer.cities[cityId].getCanRecruit(19)
                                    };
                                    _player.cities.push(temp);
                                }
                            } else {
                                _player.bosTool = 0;
                            }

                            if (_player.cities.length > 0) {
                                var output = this.formatCityCommandOverview(_player);
                                var dialog = new webfrontend.gui.ConfirmationWidget();
                                dialog.showGenericNotice('Offensive overview', '', '', 'webfrontend/ui/bgr_popup_survey.gif');
                                var shrStr = new qx.ui.form.TextArea(output).set({allowGrowY:true, tabIndex:303});
                                dialog.dialogBackground._add(shrStr, {left:30, top:50, width:90, height:45});
                                shrStr.selectAllText();
                                qx.core.Init.getApplication().getDesktop().add(dialog, {left:0, right:0, top:0, bottom:0});
                                dialog.show();

                            } else {
                                var dialog = new webfrontend.gui.ConfirmationWidget();
                                dialog.showGenericNotice("No Information Gathered", "No information has been gathered.", "Please Click \"Gather Info\" First.", "webfrontend/ui/bgr_popup_survey.gif");
                                qx.core.Init.getApplication().getDesktop().add(dialog, {left:0, right:0, top:0, bottom:0});
                                dialog.show();
                            }
                        };

                        btn.addListener("click", fn_click, this);
                        this.LoUPakToolContainer.add(btn, { top:8, left:135});
                    }

                    // Format the info from Gather Info to a readable output one line per trooptype
                    if (true) {
                        btn = new qx.ui.form.Button("Detailed");
                        btn.set({width:55, appearance:"button-text-small", toolTipText:"display detailed troop info"});

                        fn_click = function () {
                            // TODO this code is duplicated, move it to one place
                            var player = webfrontend.data.Player.getInstance();
                            var server = webfrontend.data.Server.getInstance();
                            var _player = {
                                id:player.getId(),
                                name:player.getName(),
                                PakTweakVersion:LoUPakversion,
                                bosTool:1,
                                cities:[] };
                            if (bos != undefined && bos.Server != undefined) {
                                var bServer = bos.Server.getInstance();
                                for (var cityId in bServer.cities) {
                                    var coords = PakTweak.CombatTools.cityIdToCoords(cityId);
                                    var temp = {
                                        id:cityId,
                                        name:bServer.cities[cityId].getName(),
                                        coordinates:{ x:coords[0], y:coords[1] },
                                        continent:server.getContinentFromCoords(coords[0], coords[1]),
                                        command:this.getCityCommandOverview(bServer.cities[cityId], cityId),
                                        canRecruitBarons:bServer.cities[cityId].getCanRecruit(19)
                                    };
                                    _player.cities.push(temp);
                                }
                            } else {
                                _player.bosTool = 0;
                            }

                            if (_player.cities.length > 0) {
                                var output = this.formatCityCommandDetailed(_player);
                                var dialog = new webfrontend.gui.ConfirmationWidget();
                                dialog.showGenericNotice('Offensive Details', '', '', 'webfrontend/ui/bgr_popup_survey.gif');
                                var shrStr = new qx.ui.form.TextArea(output).set({allowGrowY:true, tabIndex:303});
                                dialog.dialogBackground._add(shrStr, {left:30, top:50, width:90, height:45});
                                shrStr.selectAllText();
                                qx.core.Init.getApplication().getDesktop().add(dialog, {left:0, right:0, top:0, bottom:0});
                                dialog.show();

                            } else {
                                var dialog = new webfrontend.gui.ConfirmationWidget();
                                dialog.showGenericNotice("No Information Gathered", "No information has been gathered.", "Please Click \"Gather Info\" First.", "webfrontend/ui/bgr_popup_survey.gif");
                                qx.core.Init.getApplication().getDesktop().add(dialog, {left:0, right:0, top:0, bottom:0});
                                dialog.show();
                            }
                        };

                        btn.addListener("click", fn_click, this);
                        this.LoUPakToolContainer.add(btn, { top:8, left:194});
                    }
                },
                members:{
                    getCityCommandOverview:function (city, cityId) {
                        var server = webfrontend.data.Server.getInstance();
                        var res = webfrontend.res.Main.getInstance();
                        var _units = [];
                        if (city.getUnitCount() > 0) {
                            var units = city.getUnits();

                            for (var unitId in units) {
                                var unit = {
                                    id:unitId,
                                    name:res.units[unitId].dn,
                                    space:parseInt(res.units[unitId].uc),
                                    amount:parseInt(units[unitId].total)
                                };
                                _units.push(unit);
                            }
                        }
                        return _units;
                    },

                    formatCityCommandOverview:function (overview) {
                        var result = [];
                        result.push('"player";"continent";"coords";"city name";"units";"TS (K)";"can recruit barons"');
                        var player = webfrontend.data.Player.getInstance();
                        player = player.getName();
                        for (var i = 0; i < overview.cities.length; i++) {
                            var city = overview.cities[i];
                            info = {
                                player:player,
                                coords:('000' + city.coordinates.x).substr(-3) + ':' + ('000' + city.coordinates.y).substr(-3),
                                name:city.name,
                                continent:('00' + city.continent).substr(-2),
                                ts:0,
                                units:[]
                            };
                            for (var j = 0; j < city.command.length; j++) {
                                var cmd = city.command[j];
                                info.ts = info.ts + (cmd.space * cmd.amount);
                                info.units.push(cmd.name);
                            }
                            info.units.join('/');

                            result.push('"' + info.player + '";"' + info.continent + '";"' + info.coords + '";"' + info.name + '";"' + info.units + '";"' + Math.floor(info.ts / 1000) + '";"' + ((city.canRecruitBarons) ? 'yes' : 'no') + '"');
                        }
                        return result.join('\n');
                    },

                    formatCityCommandDetailed:function (details) {
                        var result = [];
                        result.push('"player";"coords";"continent";"troop type";"TS";"can recruit barons"');
                        var player = webfrontend.data.Player.getInstance();
                        player = player.getName();
                        for (var i = 0; i < details.cities.length; i++) {
                            var city = details.cities[i];
                            info = {
                                //Format: "player";"coords";"continent";"troop type";"TS"
                                player:player,
                                coords:('000' + city.coordinates.x).substr(-3) + ':' + ('000' + city.coordinates.y).substr(-3),
                                continent:('00' + city.continent).substr(-2),
                                unitType:'',
                                ts:0,
                                canRecruitBarons:(city.canRecruitBarons) ? 'yes' : 'no'
                            };
                            for (var j = 0; j < city.command.length; j++) {
                                var cmd = city.command[j];
                                info.unitType = cmd.name;
                                info.ts = (cmd.space * cmd.amount);
                                result.push('"' + info.player + '";"' + info.coords + '";"' + info.continent + '";"' + info.unitType + '";"' + info.ts + '";"' + info.canRecruitBarons + '"');
                            }
                        }
                        return result.join('\n');
                    }
                }
            });
        };

        /* startup script to launch the tweak */
        var startup = function () {
            if (typeof qx == 'undefined') {
                window.setTimeout(startup, 1000);
            } else {
                if (typeof window.bos != 'undefined') {
                    if (!startup.initialized) {
                        startup.initialized = true;
                        createTweak();
                        LoUPakMap();
                        PakTweak.main.getInstance().initialize();
                    }
                } else {
                    window.setTimeout(startup, 1000);
                }
            }
        };

        window.setTimeout(startup, 1000);
    };

    function PakDebug(e) {
        if (window.console && typeof console.log == "function") {
            console.log(e);
        }
    }

    /* inject this script into the website */
    function inject() {
        PakDebug('Injecting LoUPak script');
        var script = document.createElement("script");
        txt = main.toString();
        if (window.opera != undefined) txt = txt.replace(/</g, "&lt;");
        script.innerHTML = "(" + txt + ")();";
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    if (/lordofultima\.com/i.test(document.domain)) inject();

})();

