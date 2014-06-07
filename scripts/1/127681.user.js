// ==UserScript==
// @name                Castle
// @description 	Castle Forever :)
// @namespace 		Firat Can
// @include 		http://prodgame*.lordofultima.com/*/index.aspx*
// @version 		0.1.5
// @require 		http://sizzlemctwizzle.com/updater.php?id=127681&days=1
// ==/UserScript==

(function () {
    var main = function () {
        this.initialized = false;

        function CastleDebug(e) {
            if (window.console && typeof console.log == "function") {
                console.log(e);
            }
        }

		function LoUCastleMap() {
			try {

				const bossKill = [50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000];
				const dungeonKill = [10, 100, 450, 1500, 3500, 6000, 13000, 20000, 35000, 60000];
				const bossKillHydraZerk = [34, 200, 1360, 2640, 6640, 10000, 13600, 20000, 30000, 40000];
				const bossKillDragKnight = [19, 112, 756, 1467, 3689, 5556, 7556, 11112, 16667, 22223];
				const bossKillDragPala = [28, 167, 1134, 2200, 5534, 8334, 11334, 16667, 25000, 33334];
				const bossKillMolocWl = [14, 84, 567, 1100, 2767, 4167, 5667, 8334, 12500, 16667];
				const bossKillKnight = [28, 167, 1112, 2223, 5556, 8334, 11112, 16667, 25000, 33334];
				const bossKillPala = [42, 250, 1667, 3334, 8334, 12500, 16667, 25000, 37500, 50000];
				const bossKillWarlock = [21, 125, 834, 1667, 4167, 6250, 8334, 12500, 18750, 25000];
				const bossKillMage = [36, 215, 1429, 2858, 7143, 10715, 14286, 21429, 32143, 42858];
				const bossKillMolocMage = [24, 143, 972, 1886, 4743, 7143, 9715, 14286, 21429, 28572];


				var l = qx.locale.Manager.getInstance().getLocale();
				if(l != "en" || l != "de" || l != "pl")
					l = "en";
				const tr = {
					"en" : {
						"weak" : "Weakness",
					},
					"de" : {
						"weak" : "SchwÃ¤che",
                    },
					"pl" : {
						"weak" : "Ñ?Ğ»Ğ°Ğ±Ğ¾Ñ?Ñ‚ÑŒ",
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
				const zergT7 = r.units["7"].dn + ':' + sRow;
				const zergT10 = r.units["10"].dn + ':' + sRow;
				const zergT11 = r.units["11"].dn + ':' + sRow;
				const zergT12 = r.units["12"].dn + ':' + sRow;

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
				var zergs = (bossKill[(level) - 1]);
				var zerkhyrdra = (bossKillHydraZerk[(level) - 1]);
				var knightdragon = (bossKillDragKnight[(level) - 1]);
				var paladragon = (bossKillDragPala[(level) - 1]);
				var warlockmoloch = (bossKillMolocWl[(level) - 1]);
				var knight = (bossKillKnight[(level) - 1]);
				var pala = (bossKillPala[(level) - 1]);
				var warlock = (bossKillWarlock[(level) - 1]);
				var mage = (bossKillMage[(level) - 1]);
				var molochmage = (bossKillMolocMage[(level) - 1]);



	var research6 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 6);
	var shrine6 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 6);
		var bonus6 = ( 1 + ((shrine6 + research6) / 100 ));
	var research10 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 10);
	var shrine10 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 10);
		var bonus10 = ( 1 + ((shrine10 + research10) / 100 ));
	var research11 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 11);
	var shrine11 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 11);
		var bonus11 = ( 1 + ((shrine11 + research11) / 100 ));
	var research12 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 12);
	var shrine12 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 12);
		var bonus12 = ( 1 + ((shrine12 + research12) / 100 ));		
	var research7 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 7);
	var shrine7 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 7);
		var bonus7 = ( 1 + ((shrine7 + research7) / 100 ));	



                var sb = new qx.util.StringBuilder(2048);
               
				
				
				if (weak == "Piyade")
                	{
				var zergs6 = (zerkhyrdra / bonus6);
				var zergs7 = (mage / bonus7);
                var zergs10 = (pala / bonus10);
                var zergs11 = (knight / bonus11);
                var zergs12 = (warlock / bonus12);
                	}
				else if (weak == "Süvari")
			{
				var zergs6 = (zergs / bonus6);
				var zergs7 = (mage / bonus7);
				var zergs10 = (paladragon / bonus10);
                var zergs11 = (knightdragon / bonus11);
				var zergs12 = (warlock / bonus12);
			}
				else if (weak == "Büyü")
			{
				var zergs6 = (zergs / bonus6);
				var zergs7 = (molochmage / bonus7);
				var zergs10 = (pala / bonus10);
                var zergs11 = (knight / bonus11);
                var zergs12 = (warlockmoloch / bonus12);
                	}
                else if (weak == "Topçu")
                	{
				var zergs6 = (zergs / bonus6);
				var zergs7 = (mage / bonus7);
				var zergs10 = (pala / bonus10);
                var zergs11 = (knight / bonus11);
				var zergs12 = (warlock / bonus12);
			}
				



sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT6, Math.ceil(zergs6), "</td></tr></td></tr><tr><td>", zergT11, Math.ceil(zergs11), "</td></tr></td></tr><tr><td>", zergT12, Math.ceil(zergs12), "</td></tr><tr><td>", zergT7, Math.ceil(zergs7), "</td></tr></td></tr><tr><td>", zergT10, Math.ceil(zergs10), "</td></tr></table>");
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
            var LoUCastleversion = "0.1.5";

            qx.Class.define("CastleTweak.main", {
                // let's create a new instance for LoUCastle
                type:"singleton",
                extend:qx.core.Object,
                members:{
                    initialize:function () {
                        CastleDebug("LoUCastle initialize");

                        this.app = qx.core.Init.getApplication();
                        this.cInfoView = this.app.getCityInfoView();
                        this.chat = this.app.chat;
                        this.bQc = this.cInfoView.buildingQueue;
                        this.bQh = this.bQc.header;
                        this.tweakCastle();
                    },
                    tweakCastle:function () {
                        // Create a toolbar in the main area on the left below existing forms.
                        var toolbar = new CastleTweak.extraTools();
                        this.bQc.getLayoutParent().addBefore(toolbar.LoUCastleToolContainer, this.bQc);
                    }
                }
            });

            qx.Class.define("CastleTweak.extraTools", {
                // create a new instance
                extend:qx.core.Object,
                construct:function () {
                    var btn, fn_click;
                    this.LoUCastleToolContainer = new qx.ui.container.Composite(new qx.ui.layout.Canvas());

                    this.LoUCastleToolContainerBgr = new qx.ui.basic.Image('http://prodcdngame.lordofultima.com/cdn/335296/resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_end.png');
                    this.LoUCastleToolContainerBgr.setWidth(338);
                    this.LoUCastleToolContainerBgr.setHeight(35);
                    this.LoUCastleToolContainer.add(this.LoUCastleToolContainerBgr, {left:0, top:0});

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
											var bonus6 = ((shrine6 + research6) / 100 );
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
                        this.LoUCastleToolContainer.add(btn, { top:8, left:8});
                    }


                    // Fill the build queue
                    if (true) {
                        btn = new qx.ui.form.Button("+");
                        btn.set({width:20, appearance:"button-text-small", toolTipText:'Click to Fill build queue'});
                        fn_click = function () {
                            webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueueFill", {cityid:cgi.getId()});
                        };
                        btn.addListener("click", fn_click, this);
                        this.LoUCastleToolContainer.add(btn, { top:8, left:30});
                    }

                    // Pay up the resource for all queued buildings
                    if (true) {
                        btn = new qx.ui.form.Button("#");
                        btn.set({width:20, appearance:"button-text-small", toolTipText:"Click to Convert all builds"});
                        fn_click = function () {
                            webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueuePayAll", {cityid:cgi.getId()})
                        };
                        btn.addListener("click", fn_click, this);
                        this.LoUCastleToolContainer.add(btn, { top:8, left:52});
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
                        this.LoUCastleToolContainer.add(btn, { top:8, left:81});
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
                                CastleTweakVersion:LoUCastleversion,
                                bosTool:1,
                                cities:[] };
                            if (bos != undefined && bos.Server != undefined) {
                                var bServer = bos.Server.getInstance();
                                for (var cityId in bServer.cities) {
                                    var coords = CastleTweak.CombatTools.cityIdToCoords(cityId);
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
                        this.LoUCastleToolContainer.add(btn, { top:8, left:135});
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
                                CastleTweakVersion:LoUCastleversion,
                                bosTool:1,
                                cities:[] };
                            if (bos != undefined && bos.Server != undefined) {
                                var bServer = bos.Server.getInstance();
                                for (var cityId in bServer.cities) {
                                    var coords = CastleTweak.CombatTools.cityIdToCoords(cityId);
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
                        this.LoUCastleToolContainer.add(btn, { top:8, left:194});
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
                        LoUCastleMap();
                        CastleTweak.main.getInstance().initialize();
                    }
                } else {
                    window.setTimeout(startup, 1000);
                }
            }
        };

        window.setTimeout(startup, 1000);
    };

    function CastleDebug(e) {
        if (window.console && typeof console.log == "function") {
            console.log(e);
        }
    }

    /* inject this script into the website */
    function inject() {
        CastleDebug('Injecting LoUCastle script');
        var script = document.createElement("script");
        txt = main.toString();
        if (window.opera != undefined) txt = txt.replace(/</g, "&lt;");
        script.innerHTML = "(" + txt + ")();";
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    if (/lordofultima\.com/i.test(document.domain)) inject();

})();